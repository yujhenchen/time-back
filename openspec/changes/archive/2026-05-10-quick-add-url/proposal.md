## Why

The current flow to block a URL requires two steps: select a suggestion from the dropdown, then click Save. This is friction for a common action. The user should be able to block a URL in one step — just click or press Enter on a suggestion.

## What Changes

- Selecting a URL suggestion (via click or Enter key) immediately adds it to the block list instead of filling the input
- Pressing Enter in the URL input (no suggestion selected) also saves the URL directly
- Show success/failure toast inline with the save result
- Duplicate detection still applies — if the URL is already blocked, show an error toast instead
- The input and dropdown reset after a successful quick-add

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `blocked-sites`: Search suggestion selection changes from "fill input" to "directly add to block list"; pressing Enter in the input also saves directly

## Impact

- `components/blocked-sites.tsx` — `handleSuggestionSelect` changes from `form.setValue()` to a direct save + reset flow; `onSubmit` refactored to use shared save logic
