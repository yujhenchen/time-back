## Context

`blocked.tsx` is at the project root. Plasmo v0.90.5 only auto-detects well-known root pages (`popup`, `newtab`, `options`, `devtools`, `sidepanel`). Custom pages must live in a `tabs/` directory at the project root. Since `blocked.tsx` was never detected, no `blocked.html` was generated. The DNR rules in `background.ts` redirect to `/blocked.html` which doesn't exist, causing Chrome's "Your file couldn't be accessed" error.

## Goals / Non-Goals

**Goals:**
- Move `blocked.tsx` to `tabs/blocked.tsx` so Plasmo generates the page
- Update all redirect paths to reference `/tabs/blocked.html`
- Fix for both DNR (Chrome) and webRequest (Firefox) paths

**Non-Goals:**
- No behavioral or UI changes to the blocked page
- No changes to how blocking rules work

## Decisions

- **Move to `tabs/` convention.** This is Plasmo's documented approach for custom pages. The file itself needs no code changes.
- **Update all three redirect paths.** DNR uses `extensionPath` (no host prefix), webRequest uses `chrome.runtime.getURL` (absolute). Both need the `/tabs/` prefix.

## Risks / Trade-offs

- None. This is a pure file reorganization + path fix. No behavioral changes.
