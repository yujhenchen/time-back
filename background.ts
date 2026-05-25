/**
 * background.ts — URL Blocker Background Script
 *
 * Strategy:
 *  1. Prefer declarativeNetRequest (DNR) — Chrome MV3, Edge
 *  2. Fall back to blocking webRequest — Firefox Desktop MV2
 *  3. Graceful no-op on Android Firefox (neither API available)
 *
 * Key improvements over original:
 *  - Single init path, no redundant calls
 *  - Synchronous webRequest listener (Firefox does not support Promise returns)
 *  - Stable rule IDs via hashing (no index-shift bugs)
 *  - Full error handling + logging
 *  - Android Firefox graceful degradation (UA-only, no `browser` global)
 */

import { Storage } from "@plasmohq/storage"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlockedEntry {
  domain: string // e.g. "example.com"
  path: string // e.g. "/bad-path"  or "" for whole domain
  raw: string // original string from storage
}

// ---------------------------------------------------------------------------
// Capability detection
// ---------------------------------------------------------------------------

let supportsDNR = false

const supportsWebRequest =
  typeof chrome?.webRequest?.onBeforeRequest?.addListener === "function"

/**
 * Detect Firefox for Android via UA string only.
 * Firefox Desktop UA never contains "Android", so this is sufficient.
 * Avoids referencing the `browser` global (not typed in Chrome extension projects).
 *
 * Example Android Firefox UA:
 *   Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0
 */
const isAndroidFirefox: boolean = (() => {
  try {
    const ua = navigator.userAgent
    return /Android/.test(ua) && /Firefox\//.test(ua)
  } catch {
    return false
  }
})()

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

const storage = new Storage()

// Parsed, normalised entries derived from raw storage strings.
// The webRequest listener reads this directly on every request — always current.
let blockedEntries: BlockedEntry[] = []

// True once the first storage load has completed.
// The webRequest listener checks this synchronously — no Promise involved.
let initialised = false

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------

/** Normalise a raw "example.com/path" string into a BlockedEntry. */
function parseEntry(raw: string): BlockedEntry {
  const normalised = raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
  const slashIndex = normalised.indexOf("/")
  const domain =
    slashIndex === -1 ? normalised : normalised.slice(0, slashIndex)
  const path = slashIndex === -1 ? "" : normalised.slice(slashIndex)
  return { domain, path, raw }
}

/**
 * Derive a stable 31-bit integer ID from a string (djb2 hash).
 * Keeps DNR rule IDs content-addressed so reordering the block list
 * never causes ID collisions or stale rules.
 */
function stableId(s: string): number {
  let hash = 5381
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) + hash) ^ s.charCodeAt(i)
  }
  // DNR rule IDs must be positive integers in [1, 2^31-1]
  return Math.abs(hash) || 1
}

// ---------------------------------------------------------------------------
// DNR sync (Chrome / Edge)
// ---------------------------------------------------------------------------

async function syncDNRRules(entries: BlockedEntry[]): Promise<void> {
  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules()
    if (!Array.isArray(existingRules)) {
      supportsDNR = false
      console.warn(
        "[blocker] DNR not supported (getDynamicRules did not return an array)"
      )
      return
    }
    supportsDNR = true
    const existingIds = existingRules.map((r) => r.id)

    const newRules: chrome.declarativeNetRequest.Rule[] = entries.map((e) => {
      // "||example.com/path*" — domain + path prefix
      // "||example.com^"      — whole domain
      const filter = e.path ? `||${e.domain}${e.path}*` : `||${e.domain}^`

      return {
        id: stableId(e.raw),
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
          redirect: {
            extensionPath: `/blocked.html?url=${encodeURIComponent(e.raw)}`
          }
        },
        condition: {
          urlFilter: filter,
          resourceTypes: [
            chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
            chrome.declarativeNetRequest.ResourceType.SUB_FRAME
          ]
        }
      }
    })

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingIds,
      addRules: newRules
    })

    console.debug(`[blocker] DNR: synced ${newRules.length} rules`)
  } catch (err) {
    console.error("[blocker] DNR sync failed:", err)
  }
}

// ---------------------------------------------------------------------------
// URL matching (Firefox Desktop webRequest path)
// ---------------------------------------------------------------------------

function isUrlBlocked(requestUrl: string): boolean {
  try {
    const url = new URL(requestUrl)
    const hostname = url.hostname.toLowerCase()
    const fullPath = url.pathname.toLowerCase()

    for (const e of blockedEntries) {
      if (hostname === e.domain || hostname.endsWith("." + e.domain)) {
        if (!e.path || fullPath.startsWith(e.path)) {
          return true
        }
      }
    }
  } catch (err) {
    console.warn("[blocker] Could not parse URL:", requestUrl, err)
  }
  return false
}

// ---------------------------------------------------------------------------
// webRequest listener (Firefox Desktop fallback)
// ---------------------------------------------------------------------------

function setupWebRequestListener(): void {
  if (!supportsWebRequest) return

  chrome.webRequest.onBeforeRequest.addListener(
    (details): chrome.webRequest.BlockingResponse | undefined => {
      // If DNR has been confirmed to work, let it handle the request.
      if (supportsDNR) return undefined

      // Firefox does NOT support returning a Promise from a blocking webRequest
      // listener — the response MUST be synchronous. Storage loads in <50ms so
      // the uninitialised window is tiny; redirect to the blocked page with a
      // loading flag and let it auto-retry rather than silently allowing through.
      if (!initialised) {
        return {
          redirectUrl: chrome.runtime.getURL(
            `blocked.html?loading=1&url=${encodeURIComponent(details.url)}`
          )
        }
      }

      if (isUrlBlocked(details.url)) {
        return {
          redirectUrl: chrome.runtime.getURL(
            `blocked.html?url=${encodeURIComponent(details.url)}`
          )
        }
      }

      return undefined // allow the request through
    },
    { urls: ["<all_urls>"], types: ["main_frame", "sub_frame"] },
    ["blocking"]
  )
}

// ---------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------

let initPromise: Promise<void> | null = null

/**
 * Load blocked URLs from storage and sync rules.
 * Idempotent: concurrent calls share the same Promise; won't double-init.
 * Pass `force = true` (from onInstalled / onStartup) to reset and reload.
 */
async function init(force = false): Promise<void> {
  if (force) initPromise = null
  if (initPromise) return initPromise

  initPromise = (async () => {
    if (isAndroidFirefox) {
      // Neither DNR nor blocking webRequest is available on Android Firefox.
      // The extension loads fine but cannot intercept network requests.
      console.warn(
        "[blocker] Android Firefox detected — network blocking is not supported."
      )
      return
    }

    try {
      const raw: string[] = (await storage.get("blockedUrls")) || []
      blockedEntries = raw.map(parseEntry)
      initialised = true

      await syncDNRRules(blockedEntries)
      // webRequest path: listener already registered; it reads blockedEntries
      // directly and initialised is now true, so normal blocking resumes.

      console.debug(
        `[blocker] Initialised with ${blockedEntries.length} entries`
      )
    } catch (err) {
      console.error("[blocker] Init failed:", err)
      initPromise = null // allow retry on next event
    }
  })()

  return initPromise
}

// ---------------------------------------------------------------------------
// Wire up listeners and kick off init
// ---------------------------------------------------------------------------

// Register webRequest listener before init so no requests are missed.
// The listener guards against acting before initialised = true.
setupWebRequestListener()

// Kick off on script load (service worker wake / background page load)
init()

chrome.runtime.onInstalled.addListener(() => init(true))
chrome.runtime.onStartup.addListener(() => init(true))

// Live-update when the block list changes in storage
storage.watch({
  blockedUrls: async (change) => {
    const raw: string[] = change.newValue || []
    blockedEntries = raw.map(parseEntry)

    await syncDNRRules(blockedEntries)
    // webRequest path reads blockedEntries directly — no extra step needed
  }
})
