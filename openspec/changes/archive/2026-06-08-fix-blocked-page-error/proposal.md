## Why

When a user navigates to a blocked site, Chrome shows "Your file couldn't be accessed" instead of the trivia page. This is a critical bug — the core feature (blocking) is broken. The DNR redirect references `/blocked.html` but Plasmo never generates it because `blocked.tsx` is at the project root and is not one of the auto-detected page types.

## What Changes

- Move `blocked.tsx` from project root to `tabs/blocked.tsx` (Plasmo's convention for custom pages)
- Update DNR redirect paths in `background.ts` from `/blocked.html` to `/tabs/blocked.html`
- Update webRequest fallback redirect paths from `blocked.html` to `tabs/blocked.html`
- Update `web_accessible_resources` manifest entry from `"blocked.html"` to `"tabs/blocked.html"`

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None.

## Impact

- `blocked.tsx` — move to `tabs/` directory (no code changes)
- `background.ts` — update 3 redirect paths
- `package.json` — update `web_accessible_resources` path
