## Why

Users need to correct typos or update URLs in their block list. Currently the only option is to delete and re-add, which is inconvenient.

## What Changes

- Clicking the edit (Pencil) icon on a list item replaces the URL text with an input pre-filled with the current URL
- Editing state is per-item (multiple items can be in edit mode simultaneously)
- Save validates the new URL, checks for duplicates (excluding the current URL), updates storage, and shows a success/failure toast
- Cancel discards the edit and reverts to the display view

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `blocked-sites`: Add edit-in-place capability to list items

## Impact

- `components/blocked-sites.tsx` — new state for tracking which items are being edited; new save/cancel handlers per list item
