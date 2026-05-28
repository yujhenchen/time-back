## Context

The README's tech stack table conveys information but doesn't provide the visual scanability that shields.io badges offer. Popular open-source projects use badges as a quick recognition signal — they're one of the first things a visitor sees.

## Goals / Non-Goals

**Goals:**

- Add shields.io badges for each technology in the tech stack
- Style them consistently (same height, flat-square style, cohesive colors)
- Each badge links to the technology's website or docs

**Non-Goals:**

- Replacing the tech stack table (badges complement it)
- Changing any existing badges (MIT license, Chrome/Firefox, version, privacy)
- Adding animated or dynamic badges (e.g., GitHub stars, download counts)

## Decisions

### 1. Badge style: `flat-square`

- **Decision**: Use `style=flat-square` for all tech stack badges
- **Rationale**: Consistent with the existing badges in the README (MIT, Chrome, Firefox, version, privacy). Flat-square is modern and compact.
- **Alternatives considered**: `for-the-badge` (too large and loud for a badge row), `plastic` (dated look), `flat` (slightly rounded — less cohesive with existing badges)

### 2. Badge colors: branded colors

- **Decision**: Use each technology's official brand color for the badge background
- **Rationale**: Instant recognition — React blue, Tailwind cyan, TypeScript blue, etc.
- **Alternatives considered**: Single color for all (less recognizable), logo-only badges (harder to read for unfamiliar technologies)

### 3. Badge layout: single row in the header

- **Decision**: Place tech stack badges in a single row below the existing badge row, wrapped in a `<div align="center">` block
- **Rationale**: Puts them in the visual header area where badges belong. A single row keeps the header compact.

### 4. Technologies to badge

- **Decision**: Badge Plasmo, React, TypeScript, Tailwind CSS, shadcn/ui, Zod
- **Rationale**: These are the core technologies. Excluded: PostCSS, autoprefixer (build tools, not stack), prettier (not stack), lucide-react (too narrow), react-hook-form (covered by React + Zod combo).

## Risks / Trade-offs

- [Risk] Badge links break if a technology changes its domain → Mitigation: Use well-known stable URLs (e.g., react.dev not the old facebook.github.io/react)
- [Trade-off] More badges mean more HTTP requests when the README is rendered → Acceptable; shields.io is cached and these are static images
