## MODIFIED Requirements

### Requirement: User can search for sites via autocomplete
The extension SHALL provide DuckDuckGo-powered autocomplete suggestions as the user types, showing matching domain names with favicons.

The following scenarios replace the previous "Suggestion selects the domain" behavior.

#### Scenario: Domain suggestions appear while typing
- **WHEN** user types "redd" in the URL input
- **THEN** a dropdown of matching domain suggestions appears (e.g., "reddit.com")

#### Scenario: Suggestion directly blocks the URL
- **WHEN** user clicks or presses Enter on a suggestion
- **THEN** the domain is immediately added to the block list in chrome.storage.sync
- **AND** the input and dropdown are reset
- **AND** a success toast is shown

#### Scenario: Enter in input saves directly
- **WHEN** user types "example.com" in the input and presses Enter without selecting a suggestion
- **THEN** the URL is added to the block list directly

#### Scenario: Suggestion blocked when duplicate exists
- **WHEN** user clicks or presses Enter on a suggestion and the domain is already in the block list
- **THEN** the extension SHALL show an error toast and NOT add a duplicate

#### Scenario: No suggestions for short input
- **WHEN** user types fewer than 2 characters
- **THEN** no suggestions are shown
