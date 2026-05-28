## Why

The project has zero test infrastructure. Without tests, there is no safety net for refactoring or adding features, increasing risk of regressions as the extension grows. Setting up Jest-based unit tests establishes a foundation for reliable development.

## What Changes

- Install Jest and `ts-jest` with React/TSX support
- Add Jest configuration for the project's TypeScript + React setup
- Set up test utilities/mocks for Plasmo extension APIs (`chrome.*`, `browser.*`, Storage)
- Write initial unit tests for existing utility functions and components
- Add `pnpm test` script
- Update `.gitignore` if needed for coverage output

## Capabilities

### New Capabilities
- `unit-testing`: Unit test infrastructure and patterns for the time-guard extension

### Modified Capabilities
<!-- No existing specs are modified — this is purely additive infrastructure -->

## Impact

- New dev dependencies: jest, ts-jest, @types/jest, jest-environment-jsdom, @testing-library/react, @testing-library/jest-dom
- New npm scripts: `test`, `test:watch`, `test:coverage`
- New configuration: `jest.config.ts`
- New test utilities: `tests/setup.ts`, `tests/mocks/`
- No runtime changes to existing code
