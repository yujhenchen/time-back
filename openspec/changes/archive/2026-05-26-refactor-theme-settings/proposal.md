## Why

The `ThemeSettings` component in `components/theme-settings.tsx` was written without applying React performance best practices. It uses inline callbacks, direct DOM manipulation, and barrel imports from `lucide-react`. Refactoring it following Vercel's React Best Practices improves re-render efficiency, bundle size, and code maintainability — with no user-facing behavior changes.

## What Changes

- Replace inline arrow functions in JSX with stable callback references to avoid re-creation on every render
- Consolidate DOM classList add/remove into `classList.toggle` for cleaner conditional styling
- Evaluate barrel import from `lucide-react` for bundle optimization
- Extract the `applyTheme` DOM logic into a helper that can be reused and tested independently
- Apply `rerender-defer-reads` guidance where applicable

## Capabilities

### New Capabilities

- `theme-management`: System for persisting and applying user theme preference (light/dark) across the extension, including storage-backed state and DOM class synchronization

### Modified Capabilities

None — this is an internal refactoring with no spec-level behavior change.

## Impact

- **Modified file**: `components/theme-settings.tsx`
- **No new dependencies** — all changes use existing imports and APIs
- **No breaking changes** — the component's API (no props, no external API) remains identical
- **Zero user-facing impact** — the UI renders identically before and after
