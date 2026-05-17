## ADDED Requirements

### Requirement: Firefox reliably blocks added URLs
When a URL is added to the block list in the popup, Firefox SHALL intercept and redirect navigations to that URL.

#### Scenario: Blocked URL is intercepted
- **WHEN** a user adds a URL to the block list
- **AND** navigates to that URL in Firefox
- **THEN** the extension SHALL redirect the request to `blocked.html`

#### Scenario: Non-blocked URL is allowed
- **WHEN** a user navigates to a URL not in the block list
- **THEN** Firefox SHALL NOT redirect the request

### Requirement: Blocked URL list stays in sync
The `webRequest` listener in Firefox SHALL always use the latest `blockedUrls` from storage, even if the service worker was restarted.

#### Scenario: Newly added URL is blocked immediately
- **WHEN** a user adds a URL via the popup
- **THEN** the Firefox background listener SHALL block that URL on the next navigation

#### Scenario: Service worker restart doesn't lose block list
- **WHEN** the Firefox service worker is terminated and restarted
- **THEN** the blocked URLs SHALL be reloaded from storage and enforced
