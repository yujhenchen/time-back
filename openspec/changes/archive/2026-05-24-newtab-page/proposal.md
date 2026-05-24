## Why

The extension currently has no new tab page. A new tab page gives the extension a persistent presence in the user's browser, providing daily visibility and a quick way to interact with time management features (e.g., viewing blocked sites stats) each time the user opens a new tab.

## What Changes

- Create `newtab.tsx` as a Plasmo extension page that overrides the browser's default new tab
- Render a simple, clean UI — clock/time display with extension branding
- No changes to existing popup, options, or settings logic

## Capabilities

### New Capabilities
- `newtab-page`: A new tab page that replaces the browser's default new tab, displaying a live clock and basic time-guard branding

### Modified Capabilities
<!-- None -->

## Impact

- `newtab.tsx` — new Plasmo extension page entry (default export)
- `package.json` — no changes (Plasmo handles chrome_url_overrides manifest generation)
- No changes to existing components
