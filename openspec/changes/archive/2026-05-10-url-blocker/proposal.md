## Why

Users need a simple way to block distracting websites on Firefox mobile. Existing blocklists are static or require configuration; this gives users full control over their blocklist directly from the extension popup, with no limits on how many URLs they can add.

## What Changes

- Add a "Blocked Sites" management UI in the popup (below existing settings)
- Input field for typing a URL and a "Save" button to add it to the block list
- Scrollable list showing all blocked URLs with a "Delete" button per item
- Store the block list in `chrome.storage.sync`
- Intercept navigation to blocked URLs on Firefox and show a blocked page
- No limit on the number of blocked URLs

## Capabilities

### New Capabilities
- `blocked-sites`: Add, list, and remove blocked URLs via popup UI
- `navigation-blocking`: Intercept Firefox navigation to blocked URLs

### Modified Capabilities
*(none — no existing specs are changing)*

## Impact

- New storage key (`blockedUrls`) in `chrome.storage.sync`
- New popup UI section in `popup.tsx` or a new component
- Requires `webNavigation` or `webRequest` permission for blocking on Firefox
- Requires `storage` permission
- Firefox-specific: uses `browser.webNavigation.onBeforeNavigate` or declarativeNetRequest
