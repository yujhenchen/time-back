## ADDED Requirements

### Requirement: No innerHTML in blocked.tsx
The blocked page SHALL NOT use `innerHTML` for HTML entity decoding or any other DOM manipulation.

#### Scenario: innerHTML not used
- **WHEN** `blocked.tsx` is scanned for `innerHTML`
- **THEN** no occurrence SHALL be found

### Requirement: Safe HTML entity decoding
The extension SHALL use `DOMParser` to decode HTML entities in API responses.

#### Scenario: Entity decoder uses DOMParser
- **WHEN** the entity-decoding helper in `blocked.tsx` is called with an HTML-encoded string like `"Shrek &amp; Donkey"`
- **THEN** it SHALL return the decoded string `"Shrek & Donkey"` using `DOMParser` rather than `innerHTML`

#### Scenario: Decoded trivia renders correctly
- **WHEN** a trivia question containing `&quot;` or `&#039;` entities is fetched from Open Trivia DB
- **THEN** the blocked page SHALL display the decoded text with proper quotation marks
