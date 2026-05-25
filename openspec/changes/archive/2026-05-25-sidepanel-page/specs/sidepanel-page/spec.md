## ADDED Requirements

### Requirement: Side panel renders Settings component

The side panel SHALL render the existing `Settings` component as its primary content.

#### Scenario: Side panel opens successfully

- **WHEN** the user opens the side panel via the browser UI or `chrome.sidePanel.open()`
- **THEN** the panel SHALL display the theme toggle and blocked sites management UI

#### Scenario: Settings work identically to popup

- **WHEN** the user changes a setting (theme or blocked sites) on the side panel
- **THEN** the change SHALL be persisted via `@plasmohq/storage` and reflected immediately in the UI

### Requirement: Side panel is a Plasmo extension page

The side panel SHALL be implemented as `sidepanel.tsx` with a default React component export.

#### Scenario: Plasmo registers side panel

- **WHEN** Plasmo builds the extension
- **THEN** the side panel SHALL be available in the browser's side panel UI

### Requirement: Manifest includes sidePanel permission

The `sidePanel` permission SHALL be declared in the extension manifest.

#### Scenario: sidePanel permission declared

- **WHEN** the extension is loaded
- **THEN** the manifest SHALL include `"sidePanel"` in the permissions array
