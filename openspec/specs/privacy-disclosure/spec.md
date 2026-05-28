# Privacy Disclosure

## Purpose

TBD — Provide a clear privacy disclosure document listing all external services the extension communicates with.

## Requirements

### Requirement: Privacy disclosure document

The repository SHALL contain a `PRIVACY.md` document that discloses all external services the extension communicates with.

#### Scenario: PRIVACY.md exists

- **WHEN** the repository root is inspected
- **THEN** a file named `PRIVACY.md` SHALL exist

### Requirement: External services listed

The privacy disclosure SHALL list every external service the extension calls, the purpose of each call, and what data (if any) is sent.

#### Scenario: Open Trivia DB disclosed

- **WHEN** `PRIVACY.md` is read
- **THEN** it SHALL mention `opentdb.com` as the source of trivia questions on the blocked page, and SHALL note that no personal data is sent

#### Scenario: DuckDuckGo autocomplete disclosed

- **WHEN** `PRIVACY.md` is read
- **THEN** it SHALL mention `duckduckgo.com` as the source of search suggestions in the URL input, and SHALL note that keystrokes typed by the user are sent as search queries

#### Scenario: Google favicons disclosed

- **WHEN** `PRIVACY.md` is read
- **THEN** it SHALL mention `google.com` as the source of favicon images for the blocked-site list display

#### Scenario: No personal data collection

- **WHEN** `PRIVACY.md` is read
- **THEN** it SHALL state that the extension does not collect, store, or transmit any personal data
