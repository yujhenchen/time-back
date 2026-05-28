## Context

The time-guard extension currently has zero test coverage. The codebase uses React 18.2, TypeScript 5.3, Plasmo v0.90.5 (manifest v3), `@plasmohq/storage` for cross-browser storage, and imports via `@/` aliases. Components render inside a Chrome extension popup context.

Testing is complicated by:
- Chrome extension APIs (`chrome.*`) only available in extension context
- `@plasmohq/storage` wraps `chrome.storage.sync` / `chrome.storage.local`
- `@/` path aliases need mapping for Jest
- Components depend on shadcn/ui which uses CSS variables and `.dark` class theming

## Goals / Non-Goals

**Goals:**
- Install and configure Jest with TypeScript + JSX/TSX support
- Set up DOM environment for React component testing
- Provide mock utilities for Chrome extension APIs and `@plasmohq/storage`
- Write initial tests for existing utility functions and at least one component
- Add `pnpm test` scripts

**Non-Goals:**
- E2E or integration tests with a real browser
- Coverage thresholds or CI integration (deferred)
- Testing every existing component (establish patterns only)

## Decisions

1. **ts-jest over @swc/jest** — The project already uses TypeScript and ts-jest provides reliable type-aware transforms. Simpler setup with fewer config surprises.
2. **jest-environment-jsdom** — Required for React component tests that render to DOM. Standard choice for React unit testing.
3. **Manual chrome.* mocks** — Use `__mocks__/chrome.ts` to stub `storage.sync.get/set`, `tabs.query`, etc. Mocks return fake data matching the real API shape.
4. **Mock @plasmohq/storage** — Create a manual mock that wraps an in-memory object, mimicking the real Storage API (`.get()`, `.set()`, `.watch()`).
5. **Test file convention** — Colocate `*.test.ts` and `*.test.tsx` next to source files (`src/Component.test.tsx`). Keeps tests discoverable and import paths short.
6. **testUtils entry** — A shared `tests/setup.ts` that runs before all tests, setting up chrome mock global, cleanup, and `@testing-library/jest-dom` matchers.

## Risks / Trade-offs

- [Risk] Chrome API mocks may drift from real APIs → Mitigation: Keep mocks minimal, cover only APIs used in tested code
- [Risk] ts-jest is slower than @swc/jest for large suites → Mitigation: Acceptable for current small codebase; revisit if test count exceeds 100
- [Risk] Popup components depend on Plasmo context (Port, Message passing) → Mitigation: Test pure utility functions first; wrap component tests with mock context providers
