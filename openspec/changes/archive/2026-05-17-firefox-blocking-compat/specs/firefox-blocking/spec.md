## ADDED Requirements

### Requirement: Firefox blocks URLs via webRequest API

The extension SHALL use `chrome.webRequest.onBeforeRequest` with `"blocking"` to redirect blocked URLs on Firefox, when `chrome.declarativeNetRequest.updateDynamicRules` is unavailable.

#### Scenario: Firefox redirects blocked URL

- **WHEN** a user navigates to a URL whose hostname matches a `blockedUrls` entry
- **AND** the browser is Firefox (DNR dynamic rules unavailable)
- **THEN** the extension SHALL redirect the request to `blocked.html`

#### Scenario: Firefox allows non-blocked URL

- **WHEN** a user navigates to a URL whose hostname does NOT match any `blockedUrls` entry
- **THEN** the extension SHALL allow the request to proceed normally

### Requirement: Runtime browser detection

The extension SHALL detect at runtime which blocking API is available and activate only the appropriate mechanism.

#### Scenario: Chrome uses DNR

- **WHEN** `chrome.declarativeNetRequest?.updateDynamicRules` is defined
- **THEN** the extension SHALL use `declarativeNetRequest` dynamic rules for blocking

#### Scenario: Firefox uses webRequest

- **WHEN** `chrome.declarativeNetRequest?.updateDynamicRules` is undefined
- **THEN** the extension SHALL use `webRequest.onBeforeRequest` for blocking

### Requirement: Shared blocked URL state

Both blocking mechanisms SHALL share the same in-memory `blockedUrls` array, populated from `@plasmohq/storage` and kept in sync via `storage.watch()`.

#### Scenario: Storage changes update blocking state

- **WHEN** `blockedUrls` changes in storage
- **THEN** both DNR and webRequest blocking SHALL use the updated list

### Requirement: Manifest permissions for webRequest

The extension SHALL declare `webRequest` and `webRequestBlocking` permissions in its manifest to enable Firefox compatibility.

#### Scenario: Firefox can register blocking listener

- **WHEN** the extension runs on Firefox
- **THEN** the `webRequest` and `webRequestBlocking` permissions SHALL be present
