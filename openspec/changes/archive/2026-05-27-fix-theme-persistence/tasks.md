## 1. Fix theme initialization on popup open

- [x] 1.1 Add `useEffect` import to `ThemeSettings` component
- [x] 1.2 Add `useEffect` that calls `setThemeClass(theme)` with `theme` as dependency
- [x] 1.3 Verify `setThemeClass` is called with the stored theme value on initial mount (not just on toggle click)

## 2. Verify

- [x] 2.1 Run `pnpm dev` and confirm theme toggle still works in both directions
- [x] 2.2 Select dark theme, close popup, reopen — confirm `.dark` class is present on `<html>`
- [x] 2.3 Select light theme, close popup, reopen — confirm `.dark` class is absent
- [x] 2.4 Run `pnpm build` and confirm production build succeeds
