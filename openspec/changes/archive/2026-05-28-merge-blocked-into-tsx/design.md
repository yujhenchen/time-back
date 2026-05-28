## Context

The blocked page currently lives as two loose files (`blocked.html` + `blocked.js`) — the only non-React, non-TypeScript code in the extension. The background service worker redirects blocked navigations to `/blocked.html?url=...`, which is registered as a web accessible resource. The page fetches a trivia question from Open Trivia DB via vanilla `fetch` and renders it with string-based DOM manipulation.

By converting to a TSX Plasmo page, we get TypeScript type safety, React's declarative rendering, Tailwind utility classes from the shared design system, and a single-file component (plus extracted sub-components if needed).

## Goals / Non-Goals

**Goals:**

- Replace `blocked.html` and `blocked.js` with a single `blocked.tsx` React component
- Keep identical visual appearance and behavior (trivia question, show/hide answer, blocked URL display)
- Use the project's existing design system (Tailwind + CSS variables) instead of inline CSS
- Ensure the page still works as a redirect target for DNR and webRequest blocking
- Handle loading, success, and error states as React component states

**Non-Goals:**

- Changing the trivia API (still Open Trivia DB)
- Adding new features to the blocked page
- Refactoring the background.ts redirect logic (minimal path updates only)
- Adding tests (no test infrastructure exists in the project)

## Decisions

1. **Root-level `blocked.tsx` file** — Place the Plasmo page entry at the project root, same level as `popup.tsx`. Plasmo v0.90 auto-detects root-level TSX files as page entries and generates corresponding HTML files in the build output. If auto-detection fails, fall back to `pages/blocked.tsx` directory structure or explicit `manifest.pages` config in `package.json`.

2. **Single component, no sub-components** — The blocked page has a trivial UI tree (container → card → question/answer/button). Extracting sub-components adds indirection without benefit. One default-exported function component suffices.

3. **`useEffect` for data fetching** — Fetch trivia on mount inside a `useEffect` with `loading` / `data` / `error` state. This replaces the imperative `fetch().then().catch()` chain in `blocked.js`.

4. **CSS variables via Tailwind** — Use Tailwind classes (`bg-card`, `text-card-foreground`, `border`, `rounded-lg` etc.) instead of the custom CSS. The existing `styles/globals.css` already defines these via `@tailwind base/components/utilities`. The inline `<style>` block in `blocked.html` is removed entirely.

5. **URL read from query string** — Use `new URLSearchParams(window.location.search)` inside the component (same approach as `blocked.js`). No routing library needed.

6. **Manifest `web_accessible_resources` path** — Plasmo outputs custom pages at `/[name].html` relative to the extension root in the build directory. Since the current redirect URL is `/blocked.html`, and Plasmo produces `blocked.html`, the path should remain unchanged. Verified at build time.

## Risks / Trade-offs

- **[Risk] Plasmo page detection fails** → If root-level `blocked.tsx` isn't auto-detected as a page, add a `pages/blocked.tsx` file instead and update the redirect path in `background.ts` if the output path changes.
- **[Risk] Build output path differs** → If Plasmo outputs at `blocked/index.html` instead of `blocked.html`, update both `background.ts` redirect URLs and the `web_accessible_resources` manifest entry.
- **[Trade-off] Bundle size increase** → The blocked page now includes the React runtime. However, since React is already loaded for the popup, it may be shared or cached by the browser. The trade-off is acceptable for eliminating the separate vanilla code path.
