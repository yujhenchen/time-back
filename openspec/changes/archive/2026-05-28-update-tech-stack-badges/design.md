## Context

Current tech stack badges use plain text labels (e.g., `React-18`). Shields.io supports adding SVG logos from Simple Icons via the `logo` query parameter, which makes badges visually recognizable at a glance. Most of our technologies have Simple Icons entries.

## Goals / Non-Goals

**Goals:**

- Add the `logo` parameter to each badge where a Simple Icons slug exists
- Use `logoColor` matching the brand color for logos inside dark badge backgrounds
- For Plasmo (no Simple Icons entry), keep the current plain style with adjusted branding

**Non-Goals:**

- Adding logos to non-tech-stack badges (MIT, Chrome, Firefox, version, privacy)
- Changing badge style, order, or links

## Decisions

### 1. Logo usage by technology

| Technology   | Simple Icons Slug     | Has Logo?                                 |
| ------------ | --------------------- | ----------------------------------------- |
| React        | `react`               | Yes — `logo=react&logoColor=087EA4`       |
| TypeScript   | `typescript`          | Yes — `logo=typescript&logoColor=3178C6`  |
| Tailwind CSS | `tailwindcss`         | Yes — `logo=tailwindcss&logoColor=06B6D4` |
| shadcn/ui    | `shadcnui`            | Yes — `logo=shadcnui&logoColor=000000`    |
| Zod          | `zod`                 | Yes — `logo=zod&logoColor=3E67B1`         |
| Plasmo       | _not in Simple Icons_ | No — keep plain text                      |

### 2. Logo color strategy

- **Decision**: Use `logoColor` set to the same brand color as the badge background
- **Rationale**: The logo appears inside the badge. When the badge background is dark, a white logo (default) looks fine. But to be explicit and consistent, we set `logoColor` to match.

### 3. Badge URL format

- **Decision**: Append `&logo=<slug>&logoColor=<color>` to existing badge URLs
- **Rationale**: Minimal diff from current state, no restructuring needed.

## Risks / Trade-offs

- [Risk] Simple Icons adds/removes/renames slugs over time → Mitigation: Using well-established slugs unlikely to change
- [Trade-off] Additional query params make badge URLs longer → Acceptable; still well within URL length limits
