## Why

`components/blocked-sites.tsx` (461 lines) is a monolithic component handling search suggestions, form state, inline editing, and list rendering — all in one function. This causes unnecessary re-renders, impairs maintainability, and misses well-established React performance patterns. Refactoring using Vercel's React best practices will improve runtime performance, reduce bundle size, and make the code easier to extend.

## What Changes

- Split monolithic `BlockedSites` into focused sub-components (`BlockedSiteForm`, `SuggestionDropdown`, `BlockedSiteList`, `BlockedSiteRow`)
- Apply memoization (`React.memo`, `useMemo`, `useCallback`) to prevent cascading re-renders on list and suggestion updates
- Hoist static JSX (separator, headings, empty state) outside the component to avoid re-creation on every render
- Replace `&&` conditionals with ternary operators per the conditional-render rule
- Extract repeated logic (favicon image rendering, URL normalization) into shared utilities
- Import directly from leaf modules instead of barrel files where applicable
- Add `displayName` to memoized components for debugging
- No breaking changes — all existing functionality preserved

## Capabilities

### New Capabilities

- `blocked-site-form`: Search-as-you-type input with DuckDuckGo suggestions, URL validation, and add-to-list flow
- `blocked-site-list`: Ordered list of blocked URLs with inline editing, removal, and favicon display

### Modified Capabilities

- None (no existing specs to modify)

## Impact

- **Affected file**: `components/blocked-sites.tsx` (major refactor)
- **No new dependencies** — all patterns use built-in React APIs
- **No API changes** — `useStorage` contract and schema remain identical
- **No behavioral changes** — UI, validation rules, storage format, and user-facing flows are preserved
