# Configurable New Tab Page

Date: 2026-06-08

## Overview

Allow users to choose what appears when they open a new tab: the extension's default clock page, or a custom URL of their choice. No "disable" option — the manifest override is always active.

## Approach

**Redirect from newtab page** (Approach A). Keep the `chrome_url_overrides.newtab` manifest declaration. The `newtab.tsx` page reads a storage setting on load and either shows the clock or redirects via `window.location.href`.

## Storage Schema

Two new keys in `@plasmohq/storage`:

| Key | Type | Default | Description |
|---|---|---|---|
| `"newTabSetting"` | `"default" \| "custom"` | `"default"` | Which new tab behavior to use |
| `"customNewTabUrl"` | `string` | `""` | Custom URL when mode is `"custom"` |

## Behavior

### newtab.tsx

On load, read `newTabSetting` from storage:

- **`"default"`** → Show the clock (current behavior, no change)
- **`"custom"`** → `window.location.href = customNewTabUrl` immediately

The redirect happens before React hydrates — no visible flash of the clock.

### Settings UI

New collapsible section in `<Settings />`, between ThemeSettings and BlockedSites.

**Component:** `components/new-tab-settings.tsx`

Layout:
- Collapsible header ("New Tab") — toggles the section open/closed
- Two radio options:
  - "Extension default" — shows the clock
  - "Custom URL" — reveals a text input for the URL
- URL input: visible only when "Custom URL" is selected
- `useStorage` hook for both values (existing pattern)

### Validation

- Empty URL: "Custom URL" option is disabled or shows validation message
- Invalid URL: auto-prepend `https://` if protocol is missing; validate that result is a valid URL
- Validate on blur/change (inline feedback, no form required)

## Cross-browser

- **Chrome MV3**: `chrome_url_overrides.newtab` active. `window.location.href` redirect works.
- **Firefox Desktop**: Same behavior. No Firefox-specific changes.
- **Android Firefox**: `chrome_url_overrides.newtab` not supported. Graceful degradation — extension never loads; browser default shows.

## Files changed

| File | Change |
|---|---|
| `newtab.tsx` | Read storage, conditionally redirect |
| `settings.tsx` | Import and render `<NewTabSettings />` |
| `components/new-tab-settings.tsx` | New file — collapsible section with radios + URL input |

No new permissions. No new dependencies.
