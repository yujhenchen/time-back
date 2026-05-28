## Why

The extension is approaching AMO (Firefox Add-ons) submission readiness, but has three policy-compliance gaps: no LICENSE file (required for distribution), a minor `innerHTML` usage that reviewers may flag, and no privacy disclosure for the external services the extension calls (Open Trivia DB, DuckDuckGo autocomplete, Google favicons).

## What Changes

- Add `LICENSE` file (MIT) to the repository root
- Replace `innerHTML` with `DOMParser` in `blocked.tsx` for HTML entity decoding
- Create a privacy-disclosure asset (for the AMO listing and/or in-app notice) covering external API calls

## Capabilities

### New Capabilities
- `license-file`: Add an MIT LICENSE file to the repo root
- `code-security`: Remediate the `innerHTML` usage in `blocked.tsx` with a safe alternative
- `privacy-disclosure`: Document which external services the extension calls and affirm no personal data is collected

### Modified Capabilities
- *(none — no existing specs are changing)*

## Impact

- **New file**: `LICENSE` at repo root
- **Modified file**: `blocked.tsx` (one line change, entity-decoding helper)
- **New file**: privacy notice (likely a markdown doc for the AMO listing, and optionally a brief in-app notice)
- **No dependency or API changes**
