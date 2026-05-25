## Context

The Firefox blocking path (`if (!supportsDNR) { webRequest listener... }`) was added in the `firefox-blocking-compat` change, but testing shows blocked URLs aren't intercepted on Firefox. Chrome's DNR path works correctly.

Potential root causes:

1. `storage.watch()` doesn't fire in Firefox service worker context — in-memory `blockedUrls` stays `[]`
2. Firefox `webRequest` listener doesn't match URLs correctly (hostname comparison vs stored format mismatch)
3. Firefox service worker lifecycle — `blockedUrls` is empty when first web request fires because `initBlocking()` hasn't resolved yet
4. `webRequest` blocking permissions aren't effective on Firefox MV3

## Goals / Non-Goals

**Goals:**

- Diagnose and fix Firefox URL blocking
- Verify the fix works on both Chrome and Firefox (no regression)

**Non-Goals:**

- No changes to the DNR path
- No changes to storage layer or popup

## Decisions

1. **Add diagnostic logging** — `console.log` in the webRequest listener and `storage.watch()` callback so the service worker console shows what's happening
2. **Fallback: Read storage directly in listener** — Instead of relying solely on the in-memory `blockedUrls`, read from `storage.get("blockedUrls")` in the webRequest handler as a safety net (with a short-lived cache to avoid perf hit)

## Risks / Trade-offs

No significant risks — diagnostic logging is dev-only and the direct-storage-read fallback handles edge cases gracefully.
