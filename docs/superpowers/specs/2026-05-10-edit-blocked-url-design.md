# Edit Blocked URL — Design Document

Edit-in-place for URLs in the blocked sites list. Multiple items can be edited simultaneously.

## State

- `editingUrls: Set<string>` — tracks which URLs are currently being edited

## Edit Flow

1. User clicks Pencil icon on a list item → URL added to `editingUrls`
2. That list item re-renders: URL text → input (pre-filled, same zod validation as add form) + Save/Cancel buttons
3. Save: validate input, check `blockedUrls` for duplicates (excluding original URL), update `chrome.storage.sync`, update local state, show toast, remove URL from `editingUrls`
4. Cancel: remove URL from `editingUrls`, discard any input changes

## Conditional Render

```
if editingUrls.has(url)
  → [favicon] [input] [Save button] [Cancel button]
else
  → [favicon] [display url] [Pencil icon] [Trash icon]
```

## Zod Validation

Reuses the same `blockedUrlSchema` as the add-URL input (valid URL, min 3 chars).

## Duplicate Check

When saving an edit, the new URL is checked against `blockedUrls` but the original URL is excluded from the check — saves that don't actually change the URL aren't falsely rejected.

## Files Changed

| File                           | Change                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `components/blocked-sites.tsx` | Add `editingUrls` state + edit/cancel handlers + conditional render in list items |
