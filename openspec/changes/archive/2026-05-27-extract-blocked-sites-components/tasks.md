## 1. Extract Favicon component

- [x] 1.1 Create `components/favicon.tsx` with Favicon component and its imports
- [x] 1.2 Import `Favicon` from `@/components/favicon` in `blocked-sites.tsx` and remove local definition

## 2. Extract SuggestionDropdown component

- [x] 2.1 Create `components/suggestion-dropdown.tsx` with `SuggestionDropdown` and `Favicon` import
- [x] 2.2 Import `SuggestionDropdown` in `blocked-sites.tsx` and remove local definition

## 3. Extract BlockedSiteRow component

- [x] 3.1 Create `components/blocked-site-row.tsx` with `BlockedSiteRow` and its imports
- [x] 3.2 Import `BlockedSiteRow` in `blocked-sites.tsx` and remove local definition

## 4. Extract BlockedSiteList component

- [x] 4.1 Create `components/blocked-site-list.tsx` with `BlockedSiteList`, `blockedUrlSchema`, and its imports
- [x] 4.2 Import `BlockedSiteList` in `blocked-sites.tsx` and remove local definition
- [x] 4.3 Move `blockedUrlSchema` and `listSeparator` into `blocked-site-list.tsx`

## 5. Extract BlockedSiteForm component

- [x] 5.1 Create `components/blocked-site-form.tsx` with `BlockedSiteForm` and its imports
- [x] 5.2 Import `BlockedSiteForm` in `blocked-sites.tsx` and remove local definition

## 6. Verify

- [x] 6.1 Run `pnpm build` and confirm production build succeeds
