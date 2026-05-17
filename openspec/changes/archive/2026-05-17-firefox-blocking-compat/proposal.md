## Why

`background.ts` uses `chrome.declarativeNetRequest` dynamic rules (`updateDynamicRules`) to block URLs, but Firefox does not support dynamic DNR rules. Firefox supports only static rulesets and the `webRequest` blocking API. To make the extension work on Firefox, the blocking mechanism needs a Firefox-compatible fallback using `webRequest`.

## What Changes

- Add a runtime browser detection to use `webRequest` on Firefox and `declarativeNetRequest` on Chrome
- Implement `webRequest` blocking listener in `background.ts`
- Add `webRequest` and `webRequestBlocking` permissions conditionally for Firefox
- The `blockedUrls` list is already cross-browser via `@plasmohq/storage` — no storage changes needed

## Capabilities

### New Capabilities

- `firefox-blocking`: Firefox-compatible URL blocking using `webRequest` API as a fallback when `declarativeNetRequest` dynamic rules are unavailable

### Modified Capabilities

*(No existing specs change — this is a new runtime path)*

## Impact

- **Files changed**: `background.ts`, `package.json` (manifest permissions)
- **Runtime behavior**: Chrome continues using DNR; Firefox uses `webRequest`
- **Permissions added**: `webRequest` + `webRequestBlocking` in manifest (harmless on Chrome, required on Firefox)
