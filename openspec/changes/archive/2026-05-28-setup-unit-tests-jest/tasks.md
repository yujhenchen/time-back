## 1. Dependencies and Configuration

- [x] 1.1 Install dev dependencies: jest, ts-jest, @types/jest, jest-environment-jsdom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @types/chrome
- [x] 1.2 Create jest.config.ts with ts-jest preset, jsdom environment, and module name mapper for @/ → ./
- [x] 1.3 Add `test`, `test:watch`, and `test:coverage` scripts to package.json
- [x] 1.4 Add `coverage/` to .gitignore (already present)

## 2. Test Infrastructure

- [x] 2.1 Create `tests/setup.ts` with chrome API mock globals and @testing-library/jest-dom import
- [x] 2.2 Create mock for `@plasmohq/storage` (in-memory Storage class with get/set/watch support)
- [x] 2.3 Verify `pnpm test` runs and exits with zero tests found (infrastructure ready)

## 3. Initial Tests

- [x] 3.1 Write unit tests for existing utility functions in `src/lib/`
- [x] 3.2 Write a smoke test for a React component (e.g., renders without crashing)
- [x] 3.3 Verify all tests pass with `pnpm test`
