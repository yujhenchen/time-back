## 1. Shared Utilities & Imports

- [x] 1.1 Create `Favicon` component with domain prop, Google favicon URL, and hidden-on-error behavior
- [x] 1.2 Extract `normalizeUrl` and `toDomain` into a shared `lib/url-utils.ts` module
- [x] 1.3 Replace barrel imports with leaf-level imports for shadcn/ui components (Button, Input, Separator)
- [x] 1.4 Hoist static JSX (heading, separator, empty-state message) to module-level `const` declarations

## 2. BlockedSiteForm + SuggestionDropdown

- [x] 2.1 Create `BlockedSiteForm` component owning suggestion state and react-hook-form
- [x] 2.2 Create `SuggestionDropdown` as a `React.memo` presentational component
- [x] 2.3 Wire keyboard navigation (ArrowDown/ArrowUp/Enter/Escape) in the form
- [x] 2.4 Add click-outside-to-close via `useEffect` with `mousedown` listener on the dropdown wrapper
- [x] 2.5 Replace `&&` with ternary operators for all conditional renders in the form
- [x] 2.6 Apply `useCallback` to suggestion select handler and debounced fetch

## 3. BlockedSiteList + BlockedSiteRow

- [x] 3.1 Create `BlockedSiteRow` as a `React.memo` component rendering a single URL row (view/edit modes)
- [x] 3.2 Create `BlockedSiteList` as a `React.memo` component mapping over URLs and rendering `BlockedSiteRow`
- [x] 3.3 Move editing state (`editingUrls`, `editValues`) into `BlockedSiteList`
- [x] 3.4 Replace `&&` with ternary operators for all conditional renders in the list/row
- [x] 3.5 Apply `useCallback` to edit/remove handlers passed as props to rows

## 4. Parent Orchestrator & Integration

- [x] 4.1 Refactor `BlockedSites` parent to own only the `blockedUrls` storage hook and compose children
- [x] 4.2 Wire `BlockedSiteForm` and `BlockedSiteList` into the parent with proper prop passing
- [x] 4.3 Verify all keyboard navigation, focus, and click-outside behavior works in the popup
- [x] 4.4 Run `pnpm dev` and manually test the full flow: add, edit, remove URLs with suggestions
- [x] 4.5 Run `pnpm prettier --write .` to format the refactored code
