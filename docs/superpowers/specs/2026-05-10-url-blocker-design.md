# URL Blocker — Design Document

Cross-browser website blocker using declarativeNetRequest dynamic rules, with popup-based URL management and live favicon preview.

## Architecture

```
popup.tsx
  Settings
    ThemeSettings
    BlockedSites ← new component
      URL Input → [Save]
      URL List  → [Delete] per item

BlockedSites reads/writes chrome.storage.sync (key: "blockedUrls": string[])

background.ts (Plasmo background script)
  on startup / onInstalled → read storage → sync DNR dynamic rules
  storage.onChanged("blockedUrls") → re-sync DNR rules

Browser (Firefox / Chrome)
  User navigates → DNR matches rule → redirect to blocked.html
```

## Design Decisions

- **declarativeNetRequest dynamic rules** for blocking — no persistent service worker needed, rules survive browser restarts, works on Firefox 113+ and Chrome
- **chrome.storage.sync** for block list — syncs across devices, no abstraction layer (matches existing project pattern)
- **New BlockedSites component** — follows existing `DomainManager` pattern (self-contained, reads/writes storage directly)
- **Favicon preview** — live favicon from `https://www.google.com/s2/favicons?domain=...` as user types, debounced ~500ms

## BlockedSites Component

- **Input:** URL text field with zod validation (valid URL, min 3 chars, no duplicates)
- **Favicon preview:** shown live beside input as user types (debounced)
- **Save:** normalizes URL (strip protocol, lowercase, strip trailing slash), saves to storage
- **List:** scrollable list of saved URLs with delete per item
- **States:** loading → empty ("No blocked sites yet") → list with items

## URL Normalization

```
Input                    Stored
https://Example.com/  →  example.com
Example.com           →  example.com
example.com/path      →  example.com/path
```

## Navigation Blocking

- DNR dynamic rule per stored URL
- `urlFilter: ||domain^` matches the domain and all subdomains (e.g., `||example.com^` matches `example.com`, `www.example.com`, `sub.example.com`, and any path)
- `action.type: "redirect"` → `blocked.html` with original URL as query param
- Rules rebuilt on storage change and extension startup

## Permissions

- `declarativeNetRequest` — for dynamic blocking rules
- `storage` — for syncing block list
- `host_permissions: ["https://*/*"]` — already present

## Files Changed

| File                           | Change                                              |
| ------------------------------ | --------------------------------------------------- |
| `package.json`                 | Add `declarativeNetRequest` to manifest permissions |
| `components/blocked-sites.tsx` | New — URL management UI with favicon preview        |
| `background.ts`                | New — DNR rule sync on startup and storage change   |
| `blocked.html`                 | New — static blocked page served on redirect        |
| `settings.tsx` or `popup.tsx`  | Wire in BlockedSites component                      |
