## Why

The blocked page (`blocked.html` + `blocked.js`) is the only vanilla HTML/CSS/JS holdout in an otherwise all-React/TypeScript/Plasmo extension. This creates tooling friction — no JSX, no TypeScript, no bundler support, no shared components, no CSS variables from the design system. Converting to TSX unlocks the full React ecosystem for the blocked page and eliminates a separate maintainance path.

## What Changes

- **Remove** `blocked.html` (static HTML + inline CSS)
- **Remove** `blocked.js` (vanilla JS, DOM manipulation, fetch-based trivia)
- **Create** `blocked.tsx` — Plasmo page entry that renders the blocked page as a React component with Tailwind/shadcn styling
- **Update** `package.json` manifest to reference the built `blocked.html` output (or adjust `web_accessible_resources` if the path changes)
- **Update** `background.ts` redirect URLs if the output path differs from `/blocked.html`
- **Remove** `blocked.html` from `package.json` `web_accessible_resources` — if the built output path changes

No behavior changes: the page still shows blocked URL, fetches trivia from Open Trivia DB, and provides show/hide answer interaction.

## Capabilities

### New Capabilities

<!-- No new capabilities — this is a pure refactoring/conversion -->

### Modified Capabilities

<!-- No spec-level requirement changes — behavior is identical -->

## Impact

- `blocked.html` — deleted (replaced by `blocked.tsx`)
- `blocked.js` — deleted (logic merged into `blocked.tsx`)
- `blocked.tsx` — new file (Plasmo page entry, React component)
- `background.ts` — verify redirect URL path matches built output
- `package.json` — manifest `web_accessible_resources` entry may need path update
- **No new dependencies** — React, Tailwind, and shadcn are already in the project
