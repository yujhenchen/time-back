## ADDED Requirements

### Requirement: User can add a URL to the block list
The extension SHALL allow users to add URLs to a persistent block list via the popup UI.

#### Scenario: Add a valid URL
- **WHEN** user types "https://example.com" in the URL input and clicks "Save"
- **THEN** the URL is added to the block list in chrome.storage.sync

#### Scenario: Add a URL without protocol
- **WHEN** user types "example.com" in the URL input and clicks "Save"
- **THEN** the extension SHALL automatically prepend "https://" and add the URL to the block list

#### Scenario: Add a duplicate URL
- **WHEN** user tries to add a URL that is already in the block list
- **THEN** the extension SHALL show an error message and NOT add a duplicate

#### Scenario: Add an invalid URL
- **WHEN** user types text that is not a valid URL and clicks "Save"
- **THEN** the extension SHALL show a validation error and NOT add the URL

### Requirement: User can view the block list
The extension SHALL display all currently blocked URLs in the popup UI.

#### Scenario: View block list
- **WHEN** user opens the popup
- **THEN** the extension SHALL display the complete list of blocked URLs

#### Scenario: Empty block list
- **WHEN** no URLs have been added to the block list
- **THEN** the extension SHALL display a message indicating the list is empty

### Requirement: User can remove a URL from the block list
The extension SHALL allow users to remove URLs from the block list.

#### Scenario: Remove a URL
- **WHEN** user clicks the "Delete" button next to a blocked URL
- **THEN** the URL is removed from the block list in chrome.storage.sync

#### Scenario: Removal is reflected immediately
- **WHEN** user removes a URL from the block list
- **THEN** the blocked URL count and list UI update immediately

### Requirement: User can search for sites via autocomplete
The extension SHALL provide DuckDuckGo-powered autocomplete suggestions as the user types, showing matching domain names with favicons.

#### Scenario: Domain suggestions appear while typing
- **WHEN** user types "redd" in the URL input
- **THEN** a dropdown of matching domain suggestions appears (e.g., "reddit.com")

#### Scenario: Suggestion selects the domain
- **WHEN** user clicks or presses Enter on a suggestion
- **THEN** the domain (e.g., "reddit.com") is filled into the input

#### Scenario: No suggestions for short input
- **WHEN** user types fewer than 2 characters
- **THEN** no suggestions are shown

### Requirement: Block list persists across sessions
The extension SHALL persist the block list across browser restarts and extension updates.

#### Scenario: Persist block list
- **WHEN** user adds URLs, closes the browser, and reopens it
- **THEN** the previously added URLs SHALL still appear in the block list
