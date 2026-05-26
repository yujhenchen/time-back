## Context

The `ThemeSettings` component at `components/theme-settings.tsx` is a 50-line React component that toggles between light and dark themes. It uses `@plasmohq/storage/hook` for persistence via `chrome.storage.sync` and directly manipulates `document.documentElement.classList` to apply the theme. The popup entry (`popup.tsx`) renders `<ThemeSettings />` inside the `<Settings />` component.

This refactoring applies Vercel React Best Practices — specifically re-render optimization and bundle size rules — without changing the component's behavior or API (no props, no external interface).

## Goals / Non-Goals

**Goals:**

- Eliminate inline callback re-creation by extracting stable function references
- Simplify DOM class manipulation using `classList.toggle` with a boolean argument
- Extract theme application into a reusable utility for potential use at extension startup
- Verify barrel imports are optimal for the Plasmo build pipeline

**Non-Goals:**

- No user-facing behavior changes — UI renders identically
- No new dependencies or architectural patterns
- No changes to the storage layer or theme data model
- No changes to other components

## Decisions

1. **Stable callbacks via extracted functions**: Extract `handleLight` and `handleDark` as named functions defined outside JSX using `useCallback`. This avoids creating new function objects on every render (applies `rerender-functional-setstate`). Alternative considered: inline arrow functions are simpler but violate the re-render optimization rule for components that may re-render frequently.

2. **classList.toggle over if/else**: Replace `if (newTheme === "dark") root.classList.add("dark") else root.classList.remove("dark")` with `root.classList.toggle("dark", newTheme === "dark")`. This is a single expression, reduces lines, and is the idiomatic DOM API pattern (applies `js-batch-dom-css` guidance on preferring CSS class-based toggling).

3. **Keep barrel import from lucide-react**: The `import { Moon, Sun } from "lucide-react"` is the standard named import path. In a Plasmo/Webpack-based extension, tree-shaking eliminates unused exports during production builds. Direct deep imports (`lucide-react/dist/esm/icons/sun`) lack TypeScript declarations and cause `noImplicitAny` errors. Alternative: deep imports would reduce dev cold-start time but at the cost of type safety — not worth it for two icons.

4. **Extract theme application to `lib/theme.ts`**: Move `applyTheme` logic into a standalone utility function (`setThemeClass(theme: "light" | "dark"): void`). This decouples DOM manipulation from the React component, makes it testable in isolation, and enables the popup to call it on initial load to prevent a flash of unstyled content before React hydrates. Alternative: keep inline — simpler but less reusable and harder to test.

5. **No change for `rerender-defer-reads`**: The `theme` value from `useStorage` is consumed during render (determines button `variant` prop), not just in callbacks. The rule only applies when state is subscribed to solely for callback usage — not the case here.

## Risks / Trade-offs

- [Extraction to lib/theme.ts] Adds a new file that must be maintained, though it's a single pure function with negligible cost
- [Barrel import retained] Dev cold starts may be slightly slower than deep imports, but production bundles are identical due to tree-shaking
- [No testing infrastructure] This project has no test scripts; the refactoring relies on visual verification via `pnpm dev`
