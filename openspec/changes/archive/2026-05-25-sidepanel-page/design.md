## Context

The extension has popup, options, and newtab pages. A side panel provides a docked UI that persists across page navigations. Plasmo v0.90.5 auto-detects `sidepanel.tsx` and registers it for side panel rendering. The `sidePanel` permission must be declared in the manifest.

## Goals / Non-Goals

**Goals:**
- Create `sidepanel.tsx` as a default-export React component
- Reuse the existing `Settings` component for blocked sites and theme
- Add `"sidePanel"` to manifest permissions in `package.json`
- Support light/dark theme via existing CSS variables

**Non-Goals:**
- No new settings or configuration in the side panel
- No changes to popup, options, or newtab behavior

## Decisions

1. **Reuse `<Settings />` directly** — The `Settings` component is modular and works in the side panel context without modification.
2. **Manifest override for `sidePanel` permission** — Add `"sidePanel"` to the existing permissions array in `package.json`.

## Risks / Trade-offs

- The `BlockedSites` component calls DuckDuckGo autocomplete API, which works from the side panel context.
