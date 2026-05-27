# Theme Management

## Purpose

TBD — Theme persistence and application on popup open.

## Requirements

### Requirement: Theme is applied on popup open

The system SHALL apply the stored theme preference to the `html` element when the popup opens.

#### Scenario: Apply stored dark theme on popup open

- **WHEN** user has previously selected dark theme
- **AND** user closes and reopens the popup
- **THEN** the `html` element SHALL have the `dark` class applied on load

#### Scenario: Apply stored light theme on popup open

- **WHEN** user has previously selected light theme (or no preference is stored)
- **AND** user closes and reopens the popup
- **THEN** the `html` element SHALL NOT have the `dark` class on load
