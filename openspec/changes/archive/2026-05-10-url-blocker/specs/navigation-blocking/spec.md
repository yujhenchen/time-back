## ADDED Requirements

### Requirement: Block navigation to URLs on the block list
The extension SHALL block Firefox from navigating to any URL that matches the user's block list using declarativeNetRequest.

#### Scenario: Block exact match URL
- **WHEN** user navigates to "https://example.com" and "example.com" is in the block list
- **THEN** Firefox SHALL redirect the navigation to the extension's blocked page

#### Scenario: Block subdomain
- **WHEN** user navigates to "https://www.example.com/page" and "example.com" is in the block list
- **THEN** Firefox SHALL redirect the navigation to the extension's blocked page

#### Scenario: Allow non-blocked URL
- **WHEN** user navigates to "https://allowed-site.com" and "allowed-site.com" is NOT in the block list
- **THEN** Firefox SHALL load the page normally

#### Scenario: Blocking persists across browser restart
- **WHEN** user adds URLs to the block list and restarts Firefox
- **THEN** the rules SHALL still be active after restart

### Requirement: Blocking rules update when block list changes
The extension SHALL update the declarativeNetRequest dynamic rules whenever the block list is modified.

#### Scenario: Rules added when URL is added
- **WHEN** user adds a new URL to the block list
- **THEN** a new declarativeNetRequest dynamic rule is created for that URL

#### Scenario: Rules removed when URL is deleted
- **WHEN** user removes a URL from the block list
- **THEN** the corresponding declarativeNetRequest dynamic rule is removed

### Requirement: Show a blocked page
When navigation is blocked, the extension SHALL redirect to a simple page informing the user the site is blocked.

#### Scenario: Display blocked page
- **WHEN** Firefox blocks navigation to a blocked URL
- **THEN** the user sees a blocked page with a message like "This site is blocked by time-guard"
