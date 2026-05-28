## 1. Create the blocked TSX page

- [x] 1.1 Create `blocked.tsx` — Plasmo page entry that imports `styles/globals.css` and renders a default-exported React component
- [x] 1.2 Implement trivia fetching via `useEffect` (loading → success/error states), replacing the vanilla `fetch().then().catch()` chain
- [x] 1.3 Implement show/hide answer toggle using `useState` instead of DOM class toggling
- [x] 1.4 Style the component with Tailwind utility classes (`bg-card`, `text-card-foreground`, `border`, `rounded-lg`, etc.) matching the current visual appearance
- [x] 1.5 Display the blocked URL from `URLSearchParams` at the bottom of the page
- [x] 1.6 Verify the page renders in the browser via `pnpm dev` and navigating to `chrome-extension://<id>/blocked.html?url=https://example.com`

## 2. Remove old files and update configuration

- [x] 2.1 Delete `blocked.html` and `blocked.js`
- [x] 2.2 Verify `package.json` manifest `web_accessible_resources` entry still resolves to the built output (update path if Plasmo produces a different output path than `/blocked.html`)
- [x] 2.3 Verify `background.ts` redirect URLs (`/blocked.html?url=...`) still work with the built page path — update if Plasmo outputs at a different path
- [x] 2.4 Run `pnpm build` to confirm the extension compiles without errors
- [x] 2.5 Run `pnpm prettier --write .` to format new code

## 3. End-to-end verification

- [ ] 3.1 Load the built extension in Chrome and navigate to a blocked site — confirm the blocked page renders with trivia
- [ ] 3.2 Confirm show/hide answer toggle works
- [ ] 3.3 Confirm the blocked URL is displayed
- [ ] 3.4 Test with `?loading=1` param (Firefox uninitialized path) — confirm page still renders correctly
- [ ] 3.5 Confirm dark mode works (if system preference is dark, or `.dark` class is applied)
