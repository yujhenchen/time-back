## Context

The current `BlockedSites` component has a two-step flow: select a suggestion → click Save. This change merges those steps: selecting a suggestion saves the URL directly. This is a small, focused change to `BlockedSites.tsx` only.

## Goals / Non-Goals

**Goals:**
- Click or Enter on a suggestion immediately adds the domain to the block list
- Show success or error toast from the quick-add
- Reset input and dropdown after a successful quick-add

**Non-Goals:**
- No changes to the manual "Save" button flow
- No changes to the delete flow
- No changes to storage or background logic

## Decisions

1. **Reuse existing save logic** — the `onSubmit` function already handles validation, storage write, toast, and state reset. `handleSuggestionSelect` will call the same core logic.
2. **Extract shared save logic** — pull the duplicate check + storage write + toast into a shared `addUrl(url)` function used by both `onSubmit` and `handleSuggestionSelect`.

## Risks / Trade-offs

- [No risks — this is a pure UX improvement with no new dependencies or permissions]
