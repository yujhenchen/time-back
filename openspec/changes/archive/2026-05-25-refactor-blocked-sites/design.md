## Context

`components/blocked-sites.tsx` is a monolithic 461-line component in a Plasmo Chrome extension popup. It manages the entire blocked-sites flow: URL input with DuckDuckGo autocomplete suggestions, form validation/ submission, inline editing of existing entries, and list rendering with favicons. The component owns 8 pieces of state and runs a debounced search effect on every keypress. Re-renders cascade across all sub-sections even when only one part changes (e.g., typing in the search input causes the entire list to re-render).

The refactoring follows Vercel React Best Practices (the `vercel-react-best-practices` skill), prioritizing re-render optimization and bundle size.

## Goals / Non-Goals

**Goals:**

- Split into focused sub-components, each responsible for one concern
- Eliminate unnecessary re-renders via `React.memo`, `useMemo`, `useCallback`
- Hoist static JSX nodes to module level
- Replace `&&` with ternary for conditional rendering
- Extract repeated patterns (favicon image, URL normalization) into shared utilities
- Import from leaf modules instead of barrel files
- Preserve all existing behavior, storage schema, and UI

**Non-Goals:**

- No new features or UI changes
- No dependency upgrades
- No migration to a different state management library
- No restructuring of the Plasmo extension entry points

## Decisions

### 1. Component decomposition

Split into 4 sub-components + 1 parent orchestrator:

- **`BlockedSites`** (parent): owns the `blockedUrls` storage hook, renders the heading and composes children. No longer manages editing state directly.
- **`BlockedSiteForm`**: search input, DuckDuckGo suggestions dropdown, add URL submission. Owns suggestion state (`suggestions`, `showSuggestions`, `selectedIndex`, `isSearching`, `searchTimer`) and the form via `react-hook-form`.
- **`SuggestionDropdown`**: pure presentational — receives `suggestions`, `selectedIndex`, `onSelect`, `onHover` props. Memoized with `React.memo`.
- **`BlockedSiteList`**: pure presentational — receives `urls`, `onRemove`, `onEditStart`, `onEditSave`, `onEditCancel`, `editingUrls`, `editValues`. Memoized.
- **`BlockedSiteRow`**: renders a single URL row (view or edit mode). Memoized per URL key.

This scopes state to the smallest possible subtree: editing state lives in `BlockedSiteList`/`BlockedSiteRow`; search/suggestion state lives in `BlockedSiteForm`.

### 2. Memoization strategy

| Pattern       | Where                                                           | Rationale                                                        |
| ------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- |
| `React.memo`  | `SuggestionDropdown`, `BlockedSiteList`, `BlockedSiteRow`       | Props change infrequently (only on list mutation or interaction) |
| `useCallback` | Event handlers passed as props (`onRemove`, `onEditSave`, etc.) | Prevents child re-render when parent re-renders                  |
| `useMemo`     | Favicon URL construction, filtered/phrased domain lists         | Avoid recomputing on every render                                |

Do NOT memoize `BlockedSiteForm` — it re-renders on every keystroke and that's expected.

### 3. Hoist static JSX

The separator, empty-state message, and headings are identical across renders. Extract to module-level `const` JSX fragments to avoid re-creation and diffing overhead.

### 4. Conditional rendering

Replace `{condition && <JSX />}` with `{condition ? <JSX /> : null}` per the `rendering-conditional-render` rule to prevent falsy values (0, empty string) from accidentally rendering.

### 5. Import optimization

- Import `Button` from `@/components/ui/button` (leaf) instead of barrel
- Same for `Input`, `Separator`, field components
- Import individual Lucide icons directly (already doing this — no change needed)

### 6. Favicon component extraction

The `<img>` tag for favicons appears 3 times with identical error handling. Extract to a `Favicon` component (`const Favicon = ({ domain }: { domain: string }) => ...`) to DRY up the code and reduce bundle.

## Risks / Trade-offs

- **[Risk] Over-memoization**: Adding `React.memo` and `useCallback` everywhere adds code and cognitive overhead. → Mitigation: only apply where the parent re-renders frequently (list items, dropdown options). Skip for root-level containers that render once.
- **[Risk] Prop-drilling**: Extracting state upward means more props passed through `BlockedSiteList` to `BlockedSiteRow`. → Mitigation: keep the list + row colocated in one file; don't abstract further unless needed.
- **[Risk] Regression from refactor**: Splitting components can break focus behavior, keyboard navigation, or click-outside-to-close. → Mitigation: manual testing in popup after each change. No automated tests exist.
