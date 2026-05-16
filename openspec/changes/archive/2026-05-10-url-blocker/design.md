## Context

This is a cross-browser (Firefox + Chrome) website blocker built on the existing Plasmo Chrome extension project. The current extension has a popup-based UI with inline settings. This change adds URL blocking capabilities using the declarativeNetRequest API, which works in manifest v3 on both Firefox and Chrome.

## Goals / Non-Goals

**Goals:**

- Allow users to add URLs to a block list via the popup
- Show live favicon preview as user types a URL (debounced, from Google favicon API)
- Allow users to view and delete URLs from the block list
- Block navigation to URLs on the block list in Firefox and Chrome
- Store block list in chrome.storage.sync (synced across devices)

**Non-Goals:**

- No scheduling or time-based blocking
- No search/suggestions beyond favicon preview
- No per-device or per-profile block lists
- No analytics or usage tracking

## Decisions

1. **Use declarativeNetRequest for blocking**

   - Firefox supports `declarativeNetRequest` on mobile and it works with static and dynamic rules
   - No persistent background script needed; rules persist across browser sessions
   - Alternative considered: `webNavigation` event — rejected because it requires a background service worker running constantly and is less reliable on mobile

2. **Store blocked URLs as an array of strings in chrome.storage.sync**

   - Simple, no migration needed — just a string array
   - Syncs across Firefox profile automatically
   - Max storage is ~100KB which allows thousands of URLs

3. **New React component for blocked-sites UI**

   - Follows existing pattern of inline settings in the popup
   - Separate component for clean separation: `BlockedSites.tsx`
   - Uses react-hook-form + zod for the URL input form (existing library)

4. **Dynamic declarativeNetRequest rules**

   - Each blocked URL becomes one `Redirect` rule in the dynamic ruleset
   - `requestDomain` condition matches both `example.com` and `*.example.com` (covers subdomains and paths)
   - Rules are added/removed as users add/delete URLs
   - Firefox 113+ and Chrome both support `declarativeNetRequest` dynamic rules
   - Max 5000 dynamic rules (more than sufficient)

5. **Live favicon preview**
   - Fetched from `https://www.google.com/s2/favicons?domain=<domain>` as user types
   - Debounced ~500ms to avoid excessive requests
   - Fallback globe icon if favicon unavailable

## Risks / Trade-offs

- [declarativeNetRequest not supported on older Firefox versions] → Target Firefox 113+ which has full DNR support on mobile
- [Dynamic rules are cleared on extension uninstall, not on update] → Rules are rebuilt from storage on extension startup
- [declarativeNetRequest blocks network requests, not navigation] → Use `redirect` action type to redirect blocked URLs to a local blocking page
- [No ability to show a custom blocked page easily with DNR alone] → Extension redirects to `chrome-extension://<id>/blocked.html` which we create as a simple static page
