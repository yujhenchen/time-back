## ADDED Requirements

### Requirement: User can edit a URL in the block list

The extension SHALL allow users to edit existing URLs in the block list directly from the list display.

#### Scenario: Enter edit mode

- **WHEN** user clicks the edit (Pencil) icon on a list item
- **THEN** the URL text is replaced with an input pre-filled with the current URL value
- **AND** Save and Cancel buttons appear in place of the edit/delete buttons
- **AND** the input uses the same zod validation (valid URL, min 3 chars) as the add form

#### Scenario: Save edit with a new valid URL

- **WHEN** user edits the URL and clicks Save
- **THEN** the URL is updated in the block list in chrome.storage.sync
- **AND** the list item reverts to display mode
- **AND** a success toast is shown

#### Scenario: Save edit with a duplicate URL

- **WHEN** user edits the URL to a value that already exists in the block list (different from the original)
- **THEN** the extension SHALL show an error toast and NOT update the URL
- **AND** the edit input remains open

#### Scenario: Save edit fails

- **WHEN** the storage write fails during save
- **THEN** the extension SHALL show an error toast and keep the edit input open

#### Scenario: Cancel edit

- **WHEN** user clicks Cancel while in edit mode
- **THEN** the URL reverts to its original value
- **AND** the list item reverts to display mode
