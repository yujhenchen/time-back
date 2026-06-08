## 1. File Reorganization

- [x] 1.1 Create `tabs/` directory and move `blocked.tsx` into it
- [x] 1.2 Update `web_accessible_resources` in `package.json` to reference `tabs/blocked.html`

## 2. Redirect Paths

- [x] 2.1 Update DNR redirect path in `background.ts` from `/blocked.html` to `/tabs/blocked.html`
- [x] 2.2 Update webRequest fallback redirect paths in `background.ts` from `blocked.html` to `tabs/blocked.html`

## 3. Verify

- [x] 3.1 Run `pnpm dev` and confirm no build errors
- [x] 3.2 Confirm `tabs/blocked.html` is generated in build output
