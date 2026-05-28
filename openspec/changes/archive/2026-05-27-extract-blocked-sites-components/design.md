## Context

`components/blocked-sites.tsx` (566 lines) bundles 5 distinct React components plus the main `BlockedSites` export. These components have clear boundaries and separate responsibilities, making them ideal candidates for extraction into individual files.

## Goals / Non-Goals

**Goals:**

- Extract each sub-component into its own file under `components/`
- Preserve all existing behavior — zero functional changes
- Maintain the same public API (`BlockedSites` export)

**Non-Goals:**

- No behavioral changes, logic rewrites, or styling updates
- No changes to schemas, validation, or storage patterns
- No new dependencies

## Decisions

- **One component per file**: Each extracted component gets its own file named after the component (kebab-case). This follows the existing convention in the codebase.
- **Props interfaces stay co-located**: Each component file exports its own props interface alongside the component.
- **`blockedUrlSchema` stays in `blocked-sites.tsx`**: The schema is only used by `BlockedSiteForm` but is tightly coupled to the form usage within the main component. Moving it would require importing it back. Keeping it local is simpler for now.
- **Inline constants (`heading`, `listSeparator`, `emptyState`) stay in `blocked-sites.tsx`**: They're simple JSX fragments only used by `BlockedSites`. Extracting them adds negligible benefit.
- **No barrel re-exports**: Each new file is imported directly by `blocked-sites.tsx` rather than adding an index file.

## Risks / Trade-offs

- **Import churn**: Each extracted component needs its imports from the original file duplicated. Mitigation: imports are straightforward (React, shadcn, lucide-react icons, local utils) and easy to replicate.
- **No external behavior change means harder to verify**: No new features to test. Mitigation: `pnpm build` confirms no broken imports.
