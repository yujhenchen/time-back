## Why

The theme toggle persists the user's preference (light/dark) to storage, but never applies the stored theme when the popup reopens. This means every time the popup is closed and reopened, the UI renders in light mode regardless of the stored preference — the `.dark` class on `<html>` is never restored on mount.

## What Changes

- Add a `useEffect` in `ThemeSettings` to call `setThemeClass(theme)` on mount and whenever the stored theme value changes
- This ensures the DOM class always matches the persisted preference
- No storage schema changes, no new dependencies

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `theme-management`: Add a new requirement that the persisted theme preference SHALL be applied when the popup opens

## Impact

- `components/theme-settings.tsx` — add `useEffect` import and synchronization logic
- `lib/theme.ts` — no changes needed (utility is correct)
