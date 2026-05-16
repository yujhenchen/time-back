## Why

The extension currently uses `chrome.storage.sync` directly (via the Chrome API), which locks it to Chrome-only. Switching to `@plasmohq/storage` provides a cross-browser abstraction that works in Chrome and Firefox without code changes, and adds a React hook API for cleaner state management.

## What Changes

- Replace all `chrome.storage.sync.get`/`set` calls with `@plasmohq/storage` `Storage` class methods
- Replace manual `chrome.storage.onChanged` listeners with `storage.watch()`
- Replace `useState` + `useEffect` patterns for storage-backed state with `useStorage()` React hooks where applicable
- Install `@plasmohq/storage` package
- Update `AGENTS.md` to reflect the new storage layer

## Capabilities

### New Capabilities

- `storage-layer`: Cross-browser persistent storage abstraction using `@plasmohq/storage` for all extension data (blocked URLs, theme preference)

### Modified Capabilities

_(No existing specs are modified — this is purely an implementation-level change. All existing spec-level behavior is preserved.)_

## Impact

- **Files touched**: `components/blocked-sites.tsx`, `components/theme-settings.tsx`, `components/theme-toggle.tsx`, `background.ts`, `AGENTS.md`
- **Dependency added**: `@plasmohq/storage`
- **Behavior preserved**: All existing storage keys and data shapes remain identical. This is a mechanical swap with no functional changes.
- **Edge case**: Firefox requires an addon ID in manifest — will be added in `package.json` under `manifest.browser_specific_settings`.
