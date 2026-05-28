# Unit Testing

## Purpose

TBD — Test infrastructure and patterns for the time-guard extension.

## Requirements

### Requirement: Test runner configured

The project SHALL use Jest as its unit test runner, configured for TypeScript and React (TSX) files.

#### Scenario: jest.config.ts exists

- **WHEN** the project root is inspected
- **THEN** a `jest.config.ts` file SHALL be present with TypeScript, JSX, and module alias configuration

#### Scenario: Test script is available

- **WHEN** `pnpm test` is run
- **THEN** Jest SHALL execute all test files and report results

#### Scenario: TypeScript files are transformable

- **WHEN** a test imports a `.ts` or `.tsx` file
- **THEN** ts-jest SHALL successfully transform the file before execution

### Requirement: Chrome API mocks

The test environment SHALL provide mock implementations for Chrome extension APIs used by the project.

#### Scenario: chrome.storage.sync is mocked

- **WHEN** a test accesses `chrome.storage.sync.get` or `chrome.storage.sync.set`
- **THEN** the calls SHALL resolve against an in-memory store without hitting real storage

#### Scenario: chrome.runtime API is mocked

- **WHEN** a test accesses `chrome.runtime.lastError` or other runtime APIs
- **THEN** mock implementations SHALL return safe defaults

### Requirement: @plasmohq/storage is mocked

The `@plasmohq/storage` Storage class SHALL have a mock that works without a real extension context.

#### Scenario: Mock Storage supports get/set

- **WHEN** a test calls `storage.get(key)` or `storage.set(key, value)`
- **THEN** the mock SHALL read/write from an in-memory object

#### Scenario: Mock Storage supports watch

- **WHEN** a test calls `storage.watch(key, callback)`
- **THEN** the mock SHALL invoke the callback when the key's value changes via `set`

### Requirement: Component testing environment

The test environment SHALL support rendering React components with `@testing-library/react`.

#### Scenario: jsdom environment

- **WHEN** a React component is rendered in a test
- **THEN** it SHALL render in a jsdom environment that supports DOM APIs

#### Scenario: User events are simulated

- **WHEN** a test uses `@testing-library/user-event`
- **THEN** user interactions (click, type) SHALL be simulated in jsdom

### Requirement: Initial test coverage

At least utility functions and one component SHALL have unit tests to establish patterns.

#### Scenario: Utility tests exist

- **WHEN** the project is inspected
- **THEN** at least one test file for a utility module SHALL exist under `src/` or `tests/`

#### Scenario: Component smoke test exists

- **WHEN** the project is inspected
- **THEN** at least one test file for a React component SHALL exist
