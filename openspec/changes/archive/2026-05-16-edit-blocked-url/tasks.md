## 1. Edit State

- [x] 1.1 Add `editingUrls` state (`Set<string>`) to track which items are being edited, wired to the Pencil button instead of `handleRemoveUrl`

## 2. Edit Mode UI

- [x] 2.1 When a URL is in `editingUrls`, render an input with the current value and Save/Cancel buttons instead of the URL display and icon buttons
- [x] 2.2 Implement Save handler: validate new URL, check duplicates (excluding original), update storage, update local state, show toast, exit edit mode
- [x] 2.3 Implement Cancel handler: revert to display mode without changes
