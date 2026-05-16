# time-guard — Browser extension (Chrome + Firefox)

## Setup

```bash
pnpm install
```

## Commands

| Command      | Action                                                            |
| ------------ | ----------------------------------------------------------------- |
| `pnpm dev`   | Start Plasmo dev server (HMR at `build/chrome-mv3-dev`)           |
| `pnpm build` | Production build → `build/chrome-mv3-prod.zip` via `pnpm package` |
| `pnpm debug` | Dev server with verbose logging                                   |

No lint, typecheck, or test scripts exist.

## Project structure

- **Plasmo v0.90.5** Chrome extension (manifest v3). Popup entry: `popup.tsx` (default export). Settings are inlined in the popup via `<Settings />` — not a separate options page.
- **React 18.2 + TypeScript 5.3**. Path alias `@/*` → `./*` (root).
- **shadcn/ui** (new-york style) in `components/ui/`, CSS variables in `styles/globals.css`, Tailwind v3, PostCSS.
- **Forms**: `react-hook-form` + `@hookform/resolvers` + `zod`.
- **Storage**: `@plasmohq/storage` (`Storage` class + `useStorage` React hook) for cross-browser persistent storage.
- **Prettier** with `@ianvs/prettier-plugin-sort-imports` for import ordering. Run: `pnpm prettier --write .`

## Conventions

- Use `"use client"` directive in interactive components.
- Import via `@/` alias (e.g., `import { cn } from "@/lib/utils"`).
- Theme via `.dark` class on `<html>`, persisted to storage via `@plasmohq/storage`.
