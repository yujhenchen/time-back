## 1. Extract theme utility

- [x] 1.1 Create `lib/theme.ts` with `setThemeClass(theme: "light" | "dark"): void` function using `classList.toggle`
- [x] 1.2 Update `ThemeSettings` to import and use `setThemeClass` instead of local `applyTheme`

## 2. Refactor ThemeSettings component

- [x] 2.1 Extract stable `handleLight` and `handleDark` callbacks using `useCallback` to replace inline arrow functions
- [x] 2.2 Remove local `applyTheme` function and verify `classList.toggle` is used via the utility
- [x] 2.3 Verify barrel import `{ Moon, Sun } from "lucide-react"` is retained (no deep imports needed)

## 3. Verify

- [x] 3.1 Run `pnpm dev` and confirm theme toggle works in both directions
- [x] 3.2 Close and reopen popup — confirm theme preference persists
- [x] 3.3 Run `pnpm build` and confirm production build succeeds
