## Context

The time-guard extension is functionally complete but needs three pre-submission changes for AMO compliance: a LICENSE file (MIT), remediation of a `innerHTML` usage that may trigger manual review, and a privacy disclosure covering the three external services the extension calls (Open Trivia DB for trivia, DuckDuckGo for search suggestions, Google for favicons).

None of these changes affect extension behavior or introduce new capabilities — they are compliance and maintenance tasks.

## Goals / Non-Goals

**Goals:**

- Add an MIT LICENSE file to the repo root so the extension has a clear license for distribution
- Replace the `innerHTML`-based HTML entity decoder in `blocked.tsx` with a `DOMParser`-based alternative that doesn't trigger reviewer scrutiny
- Produce a privacy-disclosure document listing all external services called and stating no personal data is collected or transmitted

**Non-Goals:**

- Re-architecting the entity-decoding logic beyond the targeted fix
- Building an in-app privacy notice UI (a listing-facing doc is sufficient for this change; an in-app notice can be added later if needed)
- Changing any external API calls, permissions, or data flow
- Adding a formal GDPR/Cookie consent banner

## Decisions

### 1. MIT License

- **Decision**: Use the standard MIT license text
- **Rationale**: Permissive, widely used, compatible with the open-source nature of the project. No reason to choose a more restrictive license for a personal utility extension.
- **Alternatives considered**: Apache 2.0 (more boilerplate, no benefit here), GPL (too restrictive for a personal extension)

### 2. `innerHTML` → `DOMParser`

- **Decision**: Replace `const ta = document.createElement("textarea"); ta.innerHTML = str; return ta.value` with `new DOMParser().parseFromString(str, "text/html").body.textContent`
- **Rationale**: Eliminates any `innerHTML` usage entirely, removing a common reviewer flag. `DOMParser` is available in all modern browsers and in extension contexts. Same browser API, no new dependencies.
- **Alternatives considered**: Keeping with `textarea.innerHTML` but adding a code comment (still triggers automated flagging), using a dedicated HTML-entities library (unnecessary dependency)

### 3. Privacy Disclosure Format

- **Decision**: Create `PRIVACY.md` at the repo root listing all three external services and stating no personal data is collected
- **Rationale**: Provides a canonical document that can be referenced from the AMO listing. Simple markdown is version-controlled and reviewable.
- **Alternatives considered**: Only adding text to the AMO listing without a repo file (no version history), adding an in-app dialog (over-engineered for this use case)

## Risks / Trade-offs

- [Risk] Reviewer may still ask about the DuckDuckGo autocomplete call → Mitigation: The `PRIVACY.md` explicitly documents it, showing transparency
- [Risk] Future dev adds a new `innerHTML` elsewhere → Mitigation: This is a focused change; no new linting is being introduced
- [Trade-off] `DOMParser` is slightly more verbose than the current 3-line helper → Acceptable for the reviewer-signal benefit
