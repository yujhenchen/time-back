## Why

`components/blocked-sites.tsx` is 566 lines — too large for a single component file. It contains multiple distinct UI components (`Favicon`, `SuggestionDropdown`, `BlockedSiteRow`, `BlockedSiteList`, `BlockedSiteForm`) that should be extracted into their own files for maintainability, readability, and separation of concerns.

## What Changes

- Extract `Favicon` into `components/favicon.tsx`
- Extract `SuggestionDropdown` into `components/suggestion-dropdown.tsx`
- Extract `BlockedSiteRow` into `components/blocked-site-row.tsx`
- Extract `BlockedSiteList` into `components/blocked-site-list.tsx`
- Extract `BlockedSiteForm` into `components/blocked-site-form.tsx`
- Update `components/blocked-sites.tsx` to import from the new modules
- No breaking changes — all exports and behavior remain identical

## Capabilities

### New Capabilities

- (none — pure refactor, no new capabilities)

### Modified Capabilities

- (none — no spec-level behavior changes)

## Impact

- `components/blocked-sites.tsx` — reduced to `BlockedSites` main component with imports
- `components/favicon.tsx` — new file
- `components/suggestion-dropdown.tsx` — new file
- `components/blocked-site-row.tsx` — new file
- `components/blocked-site-list.tsx` — new file
- `components/blocked-site-form.tsx` — new file
