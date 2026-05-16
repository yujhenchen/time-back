## 1. Setup

- [x] 1.1 Install `@plasmohq/storage` package via `pnpm install @plasmohq/storage`

## 2. Background Service Worker

- [x] 2.1 Import `Storage` from `@plasmohq/storage` in `background.ts`, replace `chrome.storage.sync.get` with `storage.get`, and replace `chrome.storage.onChanged` with `storage.watch()`

## 3. React Components — Blocked Sites

- [x] 3.1 Replace `useState` + `useEffect` + `chrome.storage.sync` pattern in `components/blocked-sites.tsx` with `useStorage("blockedUrls", [])` from `@plasmohq/storage/hook`

## 4. React Components — Theme

- [x] 4.1 Replace `useState` + `useEffect` + `chrome.storage.sync` pattern in `components/theme-settings.tsx` with `useStorage("theme", "light")` from `@plasmohq/storage/hook`
- [x] 4.2 Replace `useState` + `useEffect` + `chrome.storage.sync` pattern in `components/theme-toggle.tsx` with `useStorage("theme", "light")` from `@plasmohq/storage/hook`

## 5. Firefox Compatibility

- [x] 5.1 Add `browser_specific_settings.gecko.id` to `package.json` under `manifest` for Firefox addon ID

## 6. Documentation

- [x] 6.1 Update `AGENTS.md` to reflect `@plasmohq/storage` as the storage layer (remove reference to direct `chrome.storage.sync`)
