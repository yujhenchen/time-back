## 1. Setup

- [x] 1.1 Add `declarativeNetRequest` and `storage` permissions to `package.json` manifest
- [x] 1.2 Create `blocked.html` static page shown when a URL is blocked

## 2. Blocked Sites UI

- [x] 2.1 Create `components/blocked-sites.tsx` with URL input form (react-hook-form + zod) that saves to `chrome.storage.sync`
- [x] 2.2 Add blocked URLs list display with delete capability, showing empty state when no URLs are blocked
- [x] 2.3 Add live favicon preview beside the input as user types (debounced ~500ms, Google favicon API)
- [x] 2.4 Add DuckDuckGo autocomplete search showing domain suggestions with favicons (debounced ~300ms, keyboard navigable, deduplicated)

## 3. Navigation Blocking

- [x] 3.1 Create `background.ts` (Plasmo background script) that syncs `chrome.storage.sync` blocked URLs with `declarativeNetRequest` dynamic rules on startup
- [x] 3.2 Add `chrome.storage.onChanged` listener in background to update DNR rules in real-time when the block list changes

## 4. Integration

- [x] 4.1 Add `BlockedSites` component to `settings.tsx` or `popup.tsx`
