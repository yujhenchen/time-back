## ADDED Requirements

### Requirement: Display blocked URLs list

The system SHALL display all blocked URLs as a scrollable list with favicon, domain name, and action buttons.

#### Scenario: List shows all blocked URLs

- **WHEN** the blocked URLs array has items
- **THEN** the system SHALL render each URL in a row with its favicon, normalized domain, edit button, and delete button
- **THEN** the system SHALL display a count header showing the total number of blocked URLs

#### Scenario: Empty state

- **WHEN** the blocked URLs array is empty
- **THEN** the system SHALL display a message "No blocked sites yet. Add your first URL above."
- **THEN** the system SHALL NOT render the list or count header

### Requirement: Inline edit URL

The system SHALL allow users to edit an existing blocked URL inline.

#### Scenario: Enter edit mode

- **WHEN** user clicks the edit (pencil) button on a URL row
- **THEN** the row SHALL switch to edit mode with a text input pre-filled with the current URL
- **THEN** the row SHALL show Save and Cancel buttons

#### Scenario: Save edited URL

- **WHEN** user clicks Save in edit mode
- **AND** the new value is a valid, non-duplicate URL
- **THEN** the system SHALL update the URL in storage
- **THEN** the system SHALL return the row to view mode
- **THEN** the system SHALL show a success toast notification

#### Scenario: Cancel edit

- **WHEN** user clicks Cancel in edit mode
- **THEN** the system SHALL discard the edit and return the row to view mode with the original URL

#### Scenario: Edit to same value cancels

- **WHEN** user saves an edit with the same value as the original
- **THEN** the system SHALL cancel the edit without updating storage

#### Scenario: Edit to invalid URL shows error

- **WHEN** user saves an edit with an invalid URL
- **THEN** the system SHALL show a validation error toast
- **THEN** the system SHALL stay in edit mode

### Requirement: Remove blocked URL

The system SHALL allow users to remove a URL from the blocked list.

#### Scenario: Remove URL

- **WHEN** user clicks the delete (trash) button on a URL row
- **THEN** the system SHALL remove the URL from the blocked list in storage
- **THEN** the system SHALL show a success toast notification

### Requirement: Favicon display

The system SHALL display a favicon for each URL using Google's favicon service.

#### Scenario: Favicon loads successfully

- **WHEN** a URL is displayed with a favicon
- **THEN** the system SHALL fetch the favicon from `https://www.google.com/s2/favicons?domain=<domain>&sz=16`

#### Scenario: Favicon load failure hidden

- **WHEN** the favicon image fails to load
- **THEN** the system SHALL hide the favicon element without breaking layout
