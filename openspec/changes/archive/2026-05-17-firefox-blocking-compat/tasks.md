## 1. Permissions

- [x] 1.1 Add `"webRequest"` and `"webRequestBlocking"` to manifest permissions in `package.json`

## 2. Core Implementation — background.ts

- [x] 2.1 Add runtime browser detection: check if `chrome.declarativeNetRequest?.updateDynamicRules` exists
- [x] 2.2 Implement webRequest blocking listener for Firefox that checks request hostname against `blockedUrls` and redirects to `blocked.html`
- [x] 2.3 Guard existing DNR code path so it only runs when `updateDynamicRules` is available (Chrome)
- [x] 2.4 Ensure `blockedUrls` array is shared — populated from storage on init and kept in sync via `storage.watch()` for both paths
