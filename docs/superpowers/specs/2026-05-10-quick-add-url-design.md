# Quick-Add URL — Design Document

One-click URL blocking from autocomplete suggestions and direct Enter-to-save.

## Change

Extract the save logic into a shared `addUrl(rawUrl)` function called by both the Save button (`onSubmit`) and suggestion selection (`handleSuggestionSelect`). Pressing Enter anywhere in the input field triggers the form's submit handler, which also calls `addUrl`.

## Current Flow

```
Type → suggestions appear → click suggestion → fills input → click Save → saves
Type URL → press Enter → fills nothing → click Save → saves
```

## New Flow

```
Type → suggestions appear → click suggestion → saves immediately
Type URL → press Enter (no suggestion) → saves immediately
Type → click Save button → saves (unchanged)
```

## Implementation

- Extract `addUrl(rawUrl: string)` — normalizes URL, checks duplicates, writes storage, updates state, resets form and suggestions, shows toast
- `onSubmit`: replaces inline save with `addUrl(normalizeUrl(data.url))`
- `handleSuggestionSelect`: replaces `form.setValue()` with `addUrl(domain)`

## Files Changed

| File | Change |
|---|---|
| `components/blocked-sites.tsx` | Extract `addUrl()`, update both handlers |

No new files, no new dependencies, no new permissions.
