## Context

The extension has popup, settings, and options pages but no new tab override. Plasmo v0.90.5 auto-detects `newtab.tsx` at the project root and registers it via `chrome_url_overrides.newtab` in the generated manifest. The new tab page should be simple and not conflict with existing pages.

## Goals / Non-Goals

**Goals:**

- Create `newtab.tsx` as a default-export React component
- Display a live clock showing current time (updates every second)
- Show "time-guard" branding
- Support light/dark theme via existing CSS variables

**Non-Goals:**

- No settings or configuration UI on the new tab
- No blocked sites management on the new tab
- No integration with popup/options pages

## Decisions

1. **Standalone component** — Build a self-contained new tab page with its own clock logic, no dependency on `Settings` or other components.
2. **CSS variables from globals.css** — Reuse existing shadcn theme variables for consistent light/dark appearance.
3. **No external dependencies** — No extra libraries needed; clock uses native JS `setInterval`.

## Risks / Trade-offs

- Overriding the new tab page is a one-per-extension limit — only one extension can control it at a time. Users with other new tab extensions will see a conflict.
