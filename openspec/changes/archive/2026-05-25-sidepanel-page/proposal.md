## Why

The extension currently has popup, options, and new tab pages but no side panel. A side panel provides a persistent UI that stays open alongside the user's browsing, offering always-visible access to time-guard features (blocked sites status, clock) without requiring a new tab or popup.

## What Changes

- Create `sidepanel.tsx` as a Plasmo extension page for the side panel UI
- Add `sidePanel` permission to the manifest via `package.json`
- Reuse the existing `Settings` component to display blocked sites and theme info
- No changes to existing popup, options, or newtab logic

## Capabilities

### New Capabilities

- `sidepanel-page`: A browser side panel that renders the existing Settings component, accessible via the browser's side panel UI (Ctrl/Cmd+B or toolbar icon)

### Modified Capabilities

<!-- None -->

## Impact

- `sidepanel.tsx` — new Plasmo extension page entry (default export)
- `package.json` — add `"sidePanel"` to `manifest.permissions`
- No changes to existing components
