# License File

## Purpose

TBD — Ensure the extension ships with a standard MIT LICENSE file and declares its license in package.json.

## Requirements

### Requirement: MIT LICENSE file

The repository SHALL include a standard MIT LICENSE file at its root.

#### Scenario: LICENSE exists

- **WHEN** the repository root is inspected
- **THEN** a file named `LICENSE` SHALL exist containing the MIT license text

#### Scenario: LICENSE is valid MIT

- **WHEN** the `LICENSE` file is read
- **THEN** it SHALL contain the standard MIT license grant, copyright notice, and disclaimer of liability

### Requirement: License metadata in package.json

The `package.json` SHALL include a `"license": "MIT"` field.

#### Scenario: package.json has license field

- **WHEN** `package.json` is parsed
- **THEN** the `license` field SHALL equal `"MIT"`
