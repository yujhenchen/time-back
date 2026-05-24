## ADDED Requirements

### Requirement: New tab page displays a live clock
The new tab page SHALL display the current time, updated every second.

#### Scenario: Clock shows current time on load
- **WHEN** the user opens a new tab
- **THEN** the page SHALL display the current hours and minutes

#### Scenario: Clock updates every second
- **WHEN** one second passes
- **THEN** the displayed time SHALL update to reflect the current time

### Requirement: New tab page shows extension branding
The new tab page SHALL display the extension name "time-guard".

#### Scenario: Branding visible on new tab
- **WHEN** the user opens a new tab
- **THEN** the page SHALL show "time-guard" text

### Requirement: New tab page is a Plasmo extension page
The new tab page SHALL be implemented as `newtab.tsx` with a default React component export.

#### Scenario: Plasmo generates chrome_url_overrides manifest entry
- **WHEN** Plasmo builds the extension
- **THEN** the generated manifest SHALL include a `chrome_url_overrides` entry with `newtab` pointing to the new tab page

### Requirement: New tab page supports light and dark theme
The new tab page SHALL respect the current theme by using CSS variables from `styles/globals.css`.

#### Scenario: Dark mode applied
- **WHEN** the `.dark` class is present on `<html>`
- **THEN** the page background and text SHALL use dark theme colors
