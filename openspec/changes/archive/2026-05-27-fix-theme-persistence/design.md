## Context

The `ThemeSettings` component uses `useStorage` to read/write the theme preference. On mount, `useStorage` correctly retrieves the persisted value, but the DOM class (`document.documentElement.classList`) is never synchronized to match — `setThemeClass` is only called inside click handlers. This causes the UI to render in light mode on popup reopen regardless of the stored preference.

## Goals / Non-Goals

**Goals:**
- Apply the persisted theme class to `<html>` when the popup opens
- Ensure the class stays in sync if the stored value changes externally (e.g., storage sync)

**Non-Goals:**
- No changes to storage schema, data model, or existing APIs
- No changes to the `setThemeClass` utility in `lib/theme.ts`
- No migrating away from `@plasmohq/storage` or `useStorage`

## Decisions

- **Add `useEffect` in `ThemeSettings`** with `theme` as dependency, calling `setThemeClass(theme)` on every render where the value changes. This is the minimal, idiomatic React approach.
- **Use `useEffect` over calling on mount directly** because `useStorage` may hydrate asynchronously. The effect ensures the class is applied after the hook value settles.
- **No separate initialization in `popup.tsx`** — keeping the logic inside `ThemeSettings` follows the existing pattern where the component owns its state.

## Risks / Trade-offs

- **Flash of unstyled content**: The popup may render briefly before the effect fires. Mitigation: the popup is served as a bundled HTML page (Plasmo extension) and the effect runs synchronously in the commit phase — the flash duration is negligible.
- No other risks identified for this scoped change.
