## Context

The extension currently uses `chrome.storage.sync` directly via the Chrome Extensions API. This works in Chrome but blocks Firefox compatibility. There are two storage concerns:

- **blockedUrls** (`string[]`) — managed in `background.ts` (DNR sync) and `components/blocked-sites.tsx` (popup UI)
- **theme** (`"light" | "dark"`) — managed in `components/theme-settings.tsx` and `components/theme-toggle.tsx`

The project uses Plasmo v0.90.5, which ships `@plasmohq/storage` as a companion library providing a cross-browser `Storage` class and `useStorage` React hook.

## Goals / Non-Goals

**Goals:**

- Replace every `chrome.storage.sync.get`/`set` call with `@plasmohq/storage`
- Replace `chrome.storage.onChanged` listener in background with `storage.watch()`
- Use `useStorage()` React hook in popup components to eliminate manual `useState` + `useEffect` + `chrome.storage` boilerplate
- Install `@plasmohq/storage` package
- Add Firefox addon ID in `package.json` manifest config
- Update `AGENTS.md` to document the new storage layer

**Non-Goals:**

- No functional changes to blocked URLs or theme behavior
- No data migration (existing keys and shapes are identical)
- No changes to `declarativeNetRequest` logic in background

## Decisions

1. **`useStorage` hook for React components** — Instead of `useState` + `useEffect` + manual `chrome.storage` calls, use `useStorage("key", initialValue)` which handles loading, watching, and writing in one declarative API. This simplifies `blocked-sites.tsx`, `theme-settings.tsx`, and `theme-toggle.tsx`.

2. **`Storage` class for background** — The background service worker is not a React context, so use the imperative `Storage` class with `storage.watch()` to replace `chrome.storage.onChanged`.

3. **Sync area preserved** — `@plasmohq/storage` defaults to `"sync"` area, matching current behavior.

4. **Firefox addon ID** — Add `browser_specific_settings.gecko.id` via `package.json` `manifest` field as required by `@plasmohq/storage` on Firefox.

## Risks / Trade-offs

- **Risk: Existing data becomes inaccessible if key/shape changes** → Not applicable: keys (`blockedUrls`, `theme`) and shapes are preserved identically.
- **Risk: Firefox ID mismatch** → The dev addon ID may differ from the published one. Document that the `package.json` ID should match the one assigned by Mozilla after publication.
- **Risk: `useStorage` watches all changes, potential re-renders** → Acceptable for this scale; only two storage keys exist.
