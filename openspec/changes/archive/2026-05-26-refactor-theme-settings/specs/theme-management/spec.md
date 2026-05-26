## ADDED Requirements

### Requirement: User can toggle theme

The system SHALL allow the user to switch between light and dark themes via a two-button toggle in the settings panel. The active theme SHALL be visually indicated by a `default` button variant.

#### Scenario: Switch to dark theme

- **WHEN** user clicks the "Dark" button
- **THEN** the `html` element SHALL have the `dark` class applied
- **AND** the "Dark" button SHALL use `default` variant
- **AND** the "Light" button SHALL use `outline` variant

#### Scenario: Switch to light theme

- **WHEN** user clicks the "Light" button
- **THEN** the `html` element SHALL NOT have the `dark` class
- **AND** the "Light" button SHALL use `default` variant
- **AND** the "Dark" button SHALL use `outline` variant

### Requirement: Theme preference is persisted

The system SHALL persist the user's theme preference so that it survives extension popup close/reopen.

#### Scenario: Persist dark preference

- **WHEN** user selects dark theme
- **AND** user closes and reopens the popup
- **THEN** the dark theme SHALL still be active

#### Scenario: Persist light preference

- **WHEN** user selects light theme
- **AND** user closes and reopens the popup
- **THEN** the light theme SHALL still be active
