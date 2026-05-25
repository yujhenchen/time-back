## ADDED Requirements

### Requirement: Search-as-you-type URL suggestions

The system SHALL display a dropdown of DuckDuckGo autocomplete suggestions as the user types in the URL input field.

#### Scenario: Suggestions appear after 2 characters

- **WHEN** user types at least 2 characters in the URL input
- **THEN** the system SHALL debounce 300ms then fetch suggestions from DuckDuckGo
- **THEN** the system SHALL display up to 10 domain suggestions in a dropdown below the input

#### Scenario: No suggestions for short input

- **WHEN** the input is empty or fewer than 2 characters
- **THEN** the system SHALL NOT show the suggestion dropdown

#### Scenario: Keyboard navigation through suggestions

- **WHEN** the suggestion dropdown is visible
- **AND** user presses ArrowDown
- **THEN** the next suggestion SHALL be highlighted, wrapping to first at end of list
- **AND** pressing ArrowUp SHALL move highlight up, wrapping to last at top

#### Scenario: Enter selects highlighted suggestion

- **WHEN** a suggestion is highlighted via keyboard
- **AND** user presses Enter
- **THEN** the highlighted suggestion SHALL be submitted as the URL to add

#### Scenario: Escape closes dropdown

- **WHEN** the suggestion dropdown is visible
- **AND** user presses Escape
- **THEN** the dropdown SHALL close without selecting

#### Scenario: Click outside closes dropdown

- **WHEN** the suggestion dropdown is visible
- **AND** user clicks outside the dropdown area
- **THEN** the dropdown SHALL close

#### Scenario: Suggestion shows loading indicator

- **WHEN** a fetch is in progress for suggestions
- **THEN** the system SHALL display a spinner in the input field

### Requirement: URL validation

The system SHALL validate the URL before adding it to the blocked list.

#### Scenario: Valid URL accepted

- **WHEN** user submits a string that can form a valid URL (with or without protocol)
- **THEN** the system SHALL normalize it (trim, lowercase, strip protocol and trailing slash)
- **THEN** the system SHALL add the normalized URL to storage

#### Scenario: Invalid URL rejected

- **WHEN** user submits a string that cannot form a valid URL
- **THEN** the system SHALL display a validation error message
- **THEN** the system SHALL NOT add the URL to storage

#### Scenario: Duplicate URL rejected

- **WHEN** user submits a URL already in the blocked list
- **THEN** the system SHALL show a toast notification that the URL already exists
- **THEN** the system SHALL NOT add the duplicate to storage

### Requirement: Add URL to blocked list

The system SHALL persist newly added blocked URLs to storage.

#### Scenario: URL added successfully

- **WHEN** a valid, non-duplicate URL is submitted
- **THEN** the system SHALL save it to the blocked URLs array in storage
- **THEN** the system SHALL clear the input field and suggestions
- **THEN** the system SHALL show a success toast notification
