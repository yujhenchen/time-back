## Context

The `BlockedSites` component displays a list of blocked URLs. Currently each item has a Pencil (edit) and Trash (delete) icon, but the edit icon is non-functional. This change implements the edit-in-place feature.

## Goals / Non-Goals

**Goals:**

- Clicking the Pencil icon enters edit mode for that item
- Edit mode shows an input with the current URL and Save/Cancel buttons
- Save validates, checks duplicates (excluding self), updates storage, shows toast
- Cancel discards changes and returns to display mode

**Non-Goals:**

- No changes to the add-new-URL flow
- No changes to the delete flow
- No changes to the search/autocomplete flow

## Decisions

1. **`editingUrls` state** — a `Set<string>` tracking which URLs are currently being edited. When a URL is in the set, that list item renders an input with Save/Cancel instead of the display view. Multiple items can be edited simultaneously.
2. **Each item is self-contained** — edit state lives at the component level. The list re-renders each edited item differently based on whether its URL is in `editingUrls`.
3. **Reuses add-URL zod schema** — the edit input uses the same `blockedUrlSchema` (valid URL, min 3 chars) as the add form.
4. **Duplicate check excludes the original URL** — when saving an edit, the new value is checked against `blockedUrls` but the original URL is excluded from the check so unchanged saves don't trigger false duplicates.

## Risks / Trade-offs

- [No risks — scoped change to a single component, no new dependencies]
