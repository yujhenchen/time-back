## Why

The Firefox blocking path (`webRequest` API in `background.ts`) doesn't actually block sites after they're added to the block list. The extension works correctly on Chrome but fails to intercept and redirect blocked URLs on Firefox, making it unusable on that browser.

## What Changes

- Identify root cause of Firefox blocking failure (suspect: `storage.watch()` doesn't fire in FF service worker context, or the `webRequest` listener isn't properly intercepting requests)
- Fix the Firefox blocking mechanism so it reliably blocks URLs
- Add console logging for debugging during dev

## Capabilities

### New Capabilities

- `firefox-blocking-fix`: Ensure Firefox's webRequest-based URL blocking actually intercepts and redirects blocked URLs

### Modified Capabilities

_(No existing specs change)_

## Impact

- **Files changed**: `background.ts` (Firefox blocking logic)
- **Root cause candidates**: `storage.watch()` not syncing `blockedUrls` to in-memory array on Firefox; `webRequest` listener not matching correctly; service worker lifecycle issues
