## ADDED Requirements

### Requirement: Cross-browser storage abstraction

The system SHALL use `@plasmohq/storage` for all persistent storage operations, replacing direct `chrome.storage.sync` calls.

#### Scenario: Storage reads and writes work in Chrome

- **WHEN** the extension reads or writes storage keys (`blockedUrls`, `theme`)
- **THEN** the operations SHALL use `@plasmohq/storage` instead of `chrome.storage.sync`

#### Scenario: Storage reads and writes work in Firefox

- **WHEN** the extension runs in Firefox
- **THEN** the same `@plasmohq/storage` API SHALL persist data without code changes

### Requirement: React integration via useStorage hook

React components SHALL use the `useStorage` hook from `@plasmohq/storage/hook` for reading and writing storage-backed state.

#### Scenario: Component reads storage on mount

- **WHEN** a component mounts
- **THEN** it SHALL receive the current storage value via `useStorage` without manual `chrome.storage.sync.get`

#### Scenario: Component writes storage on change

- **WHEN** a component sets a new value via the `useStorage` setter
- **THEN** the value SHALL be persisted to storage

### Requirement: Background storage watching

The background service worker SHALL use `storage.watch()` from `@plasmohq/storage` to react to `blockedUrls` changes.

#### Scenario: Blocked URLs change triggers DNR sync

- **WHEN** the `blockedUrls` value changes in storage
- **THEN** the background worker SHALL call `syncDNRRules` with the new value

### Requirement: Firefox addon ID

The extension SHALL declare a Firefox addon ID in its manifest configuration.

#### Scenario: Storage API works on Firefox

- **WHEN** `@plasmohq/storage` is used on Firefox
- **THEN** the extension SHALL have `browser_specific_settings.gecko.id` set in the manifest
