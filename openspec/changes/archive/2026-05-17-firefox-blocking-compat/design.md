## Context

`background.ts` currently uses `chrome.declarativeNetRequest.updateDynamicRules` to block URLs. This API is Chrome-only — Firefox does not support dynamic DNR rules (only static rulesets). The `@plasmohq/storage` migration already made storage cross-browser; now the blocking mechanism needs the same treatment.

## Goals / Non-Goals

**Goals:**
- Firefox blocks URLs using the `webRequest` blocking API
- Chrome continues using `declarativeNetRequest` (more performant, no content script needed)
- Runtime browser detection picks the right path automatically
- No duplicate blocking — only one mechanism active per browser

**Non-Goals:**
- No changes to the popup UI or storage layer
- No changes to `blocked.html` display page
- No bundling/per-build targeting — single codebase, runtime detection

## Decisions

1. **Runtime `chrome` API detection** — Check `chrome.declarativeNetRequest?.updateDynamicRules` at startup. If present → Chrome (use DNR). If absent → Firefox (use `webRequest`). No build flags needed.

2. **`webRequest` on Firefox** — Register `chrome.webRequest.onBeforeRequest` with `["blocking"]` and `["main_frame", "sub_frame"]` filter. Compare request hostname against the in-memory `blockedUrls` array and redirect to `blocked.html` if matched.

3. **Shared blocked URL state** — The in-memory `blockedUrls` array is populated from `@plasmohq/storage` on init and updated via `storage.watch()` for both paths.

4. **Permissions** — Add `webRequest` and `webRequestBlocking` to the manifest. These are harmless on Chrome (unused) and required on Firefox.

## Risks / Trade-offs

- **Risk: `webRequest` is heavier than DNR** → Acceptable. Firefox has no DNR dynamic rules alternative. Only affects Firefox users.
- **Risk: `webRequest` blocking requires `host_permissions` match** → Already covered by existing `"https://*/*"` pattern.
- **Risk: Subdomain matching mismatch** → Same normalization logic used for both paths (`domain.includes(blockedUrl)` for webRequest; `||domain^` filter for DNR). Minor differences are acceptable.