<div align="center">

# ⏳ time-guard

### Block distractions. Learn something when you slip.

Most site blockers just say _"nope"_. time-guard shows you a trivia question instead — turning a moment of distraction into a moment of discovery.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square&color=6366f1)](./LICENSE)
[![Chrome](https://img.shields.io/badge/Chrome-✓-blue?style=flat-square&color=22c55e)](https://chrome.google.com/webstore)
[![Firefox](https://img.shields.io/badge/Firefox-✓-blue?style=flat-square&color=22c55e)](https://addons.mozilla.org)
[![Version](https://img.shields.io/badge/version-0.0.1-blue?style=flat-square&color=6366f1)](./package.json)
[![Privacy](https://img.shields.io/badge/Privacy-first-blue?style=flat-square&color=0284c7)](./PRIVACY.md)

<br>

[![Plasmo](https://img.shields.io/badge/Plasmo-0.90.5-6C5CE7?style=flat-square)](https://docs.plasmo.com)
[![React](https://img.shields.io/badge/React-18-087EA4?style=flat-square&logo=react&logoColor=087EA4)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-New_York-000000?style=flat-square&logo=shadcnui&logoColor=000000)](https://ui.shadcn.com)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=flat-square&logo=zod&logoColor=3E67B1)](https://zod.dev)

</div>

---

## Table of Contents

- [For Users](#for-users)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [FAQ](#faq)
  - [Permissions & Privacy](#permissions--privacy)
- [For Developers](#for-developers)
  - [Quick Start](#quick-start)
  - [Build](#build)
  - [Project Structure](#project-structure)
  - [Tech Stack](#tech-stack)
  - [Architecture](#architecture)
  - [Scripts](#scripts)
  - [Code Conventions](#code-conventions)
  - [Contributing](#contributing)
- [Changelog](#changelog)
- [Roadmap](#roadmap)
- [License](#license)

---

## For Users

### Features

#### 🚫 Block any site

Type a URL or domain, pick from autocomplete suggestions, and the site is blocked instantly across all tabs.

> _"I want to stop going to news sites during work hours."_ — Add `nytimes.com`, done.

#### 🧠 Trivia on blocked pages

When you hit a blocked site, you're redirected to a page with a random trivia question. Show the answer — or hide it and get back to work.

> This is the core idea: instead of a guilt-inducing "blocked" wall, you get a frictionless brain break. A moment to learn, then a moment to choose.

Questions are fetched from [Open Trivia DB](https://opentdb.com) — categories range from science and history to pop culture and video games.

#### 🌗 Dark & light theme

Follows your system preference automatically. Toggle manually from the popup. Both themes respect your OS accessibility settings.

#### 📋 Side panel

Open the browser sidebar to view and manage your block list without losing your current page context. Available in both Chrome and Firefox.

#### 🕐 New tab clock

A clean, minimal clock on every new tab. No distractions, no news feed, no sponsored content — just the time.

---

### Installation

| Browser                                                                                                           | Source                | Guide                                                                         |
| ----------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------- |
| <img src="https://www.google.com/s2/favicons?domain=chrome.google.com&sz=16" width="16" height="16"> **Chrome**   | Chrome Web Store      | _Coming soon_                                                                 |
| <img src="https://www.google.com/s2/favicons?domain=addons.mozilla.org&sz=16" width="16" height="16"> **Firefox** | Firefox Add-ons (AMO) | _Coming soon_                                                                 |
| **Chrome (dev)**                                                                                                  | Load unpacked         | Build → `build/chrome-mv3-prod` → `chrome://extensions` → Load unpacked       |
| **Firefox (dev)**                                                                                                 | Temporary install     | Build → run `web-ext run` or load via `about:debugging#/runtime/this-firefox` |

---

### Usage

```
1. Click the time-guard icon  ──▶  Popup opens
2. Type a URL to block        ──▶  Suggestions appear as you type
3. Press Enter or tap a row   ──▶  Site is added to your block list
4. Visit the blocked site     ──▶  Trivia page loads instead
```

**Pro tips:**

- You can add full URLs (`https://reddit.com/r/all`) or just domains (`reddit.com`)
- Edit or remove sites from the list at any time
- Changes take effect immediately — no refresh needed

---

### FAQ

<details>
<summary><strong>Does it work in incognito/private browsing?</strong></summary>
<br>
Yes, but you need to enable it manually. In Chrome, go to <code>chrome://extensions</code> → time-guard → "Allow in incognito". In Firefox, check the extension's private browsing permission in <code>about:addons</code>.
</details>

<details>
<summary><strong>Does my block list sync across devices?</strong></summary>
<br>
Not yet. Currently everything is stored locally in <code>chrome.storage.local</code>. Cross-device sync via <code>chrome.storage.sync</code> is on the roadmap.
</details>

<details>
<summary><strong>Can I import or export my block list?</strong></summary>
<br>
Not yet — planned for a future release.
</details>

<details>
<summary><strong>Why does it need <code>&lt;all_urls&gt;</code> permission?</strong></summary>
<br>
To block any website you choose to add. Without this permission, the extension can only block a pre-approved list of sites. We believe you should decide what to block, not us. The extension never sends browsing data anywhere.
</details>

<details>
<summary><strong>Why does it need both <code>declarativeNetRequest</code> and <code>webRequest</code>?</strong></summary>
<br>
Chrome's Manifest V3 requires <code>declarativeNetRequest</code> for URL blocking, while Firefox (MV2) uses <code>webRequest</code> + <code>webRequestBlocking</code>. Supporting both means the extension works in both browsers without compromise.
</details>

<details>
<summary><strong>What happens to the trivia questions? Are they tracked?</strong></summary>
<br>
Nothing happens to them. The question is fetched from Open Trivia DB, displayed once, and discarded. No answers, no scores, no tracking — the trivia is purely a momentary friction point to help you refocus.
</details>

---

### Permissions & Privacy

| Permission                          | Scope        | Reason                                      |
| ----------------------------------- | ------------ | ------------------------------------------- |
| `storage`                           | Local device | Stores your block list and theme preference |
| `declarativeNetRequest`             | Chrome       | Blocks URLs before they load (MV3)          |
| `webRequest` + `webRequestBlocking` | Firefox      | Blocks URLs before they load (MV2)          |
| `sidePanel`                         | Browser UI   | Shows the block list in the browser sidebar |
| `<all_urls>`                        | Any domain   | Allows blocking _any_ site you choose       |

**No data collection. No telemetry. No tracking.**

The extension makes three lightweight external requests — none of them send personal data:

| Service                                               | Purpose                         | Data Shared                             |
| ----------------------------------------------------- | ------------------------------- | --------------------------------------- |
| [Open Trivia DB](https://opentdb.com)                 | Fetch trivia for blocked pages  | Nothing                                 |
| [DuckDuckGo Autocomplete](https://duckduckgo.com/ac/) | URL suggestions while typing    | Keystrokes you type (like a search bar) |
| [Google Favicons](https://www.google.com/s2/favicons) | Site icons next to blocked URLs | The domain name                         |

→ Full disclosure at [`PRIVACY.md`](./PRIVACY.md)

---

## For Developers

### Quick Start

```bash
pnpm install
pnpm dev                     # Chrome dev (HMR at build/chrome-mv3-dev)
pnpm dev --target=firefox-mv2  # Firefox dev
```

Load the build directory in your browser:

- **Chrome**: `chrome://extensions` → Developer mode → Load unpacked → select `build/chrome-mv3-dev`
- **Firefox**: `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → select the manifest in the build directory

---

### Build

```bash
pnpm build                  # Chrome production build
pnpm build:firefox-mv2      # Firefox MV2 production build
pnpm build:firefox-mv3      # Firefox MV3 production build
pnpm package                # Build + zip for store submission
```

Output goes to `build/`.

---

### Project Structure

```
time-guard/
├── popup.tsx                 # Popup entry → renders <Settings />
├── sidepanel.tsx             # Side panel entry → renders <Settings />
├── newtab.tsx                # New tab clock
├── blocked.tsx               # Blocked page with trivia
├── background.ts             # Service worker — URL blocking engine
├── settings.tsx              # Shared settings UI
├── components/
│   ├── blocked-sites.tsx     # Block list container with CRUD
│   ├── blocked-site-form.tsx # Add/edit URL with validation
│   ├── blocked-site-row.tsx  # Single URL row (edit/delete)
│   ├── suggestion-dropdown.tsx  # DuckDuckGo-powered autocomplete
│   ├── theme-settings.tsx    # Dark/light toggle
│   ├── favicon.tsx           # Favicon image component
│   └── ui/                   # shadcn/ui primitives
│       ├── button.tsx, card.tsx, input.tsx, label.tsx, ...
├── lib/
│   ├── theme.ts              # Theme state + persistence
│   ├── url-utils.ts          # URL normalization helpers
│   └── utils.ts              # cn() and other utilities
├── styles/
│   └── globals.css           # Tailwind + CSS custom properties
├── assets/
│   └── icon.png              # Extension icon
├── PRIVACY.md                # Privacy disclosure
├── LICENSE                   # MIT license
├── package.json              # Dependencies + manifest config
└── tsconfig.json             # TypeScript configuration
```

---

### Tech Stack

| Layer      | Technology                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| Framework  | [Plasmo](https://docs.plasmo.com/) v0.90.5                                                                |
| UI         | React 18 + TypeScript 5.3                                                                                 |
| Styling    | Tailwind CSS v3 + [shadcn/ui](https://ui.shadcn.com/) (new-york style)                                    |
| Storage    | [`@plasmohq/storage`](https://docs.plasmo.com/framework/storage)                                          |
| Forms      | react-hook-form + zod                                                                                     |
| Validation | [Zod](https://zod.dev/) v4                                                                                |
| Icons      | [lucide-react](https://lucide.dev/icons)                                                                  |
| Build      | Plasmo CLI + PostCSS + esbuild                                                                            |
| Formatting | Prettier + [`@ianvs/prettier-plugin-sort-imports`](https://github.com/IanVS/prettier-plugin-sort-imports) |

---

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        HTML Pages                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────┐  ┌─────────┐ │
│  │ popup.tsx    │  │ sidepanel.tsx│  │newtab│  │blocked  │ │
│  │ (Settings UI)│  │(Settings UI) │  │(clock)│  │(trivia) │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┘  └────┬────┘ │
│         │                 │                          │      │
│         └──────┬──────────┘                          │      │
│                │                                     │      │
│         ┌──────▼──────┐                     ┌────────▼───┐ │
│         │  chrome.    │                     │  Open Trivia│ │
│         │  storage    │                     │  DB API     │ │
│         │  (local)    │                     │  (fetch)    │ │
│         └──────┬──────┘                     └────────────┘ │
│                │                                            │
│         ┌──────▼──────────────────────────┐                 │
│         │       background.ts             │                 │
│         │       (Service Worker)          │                 │
│         │                                 │                 │
│         │  ┌──────────────────────────┐   │                 │
│         │  │  On install: load        │   │                 │
│         │  │  blockedUrls from storage │   │                 │
│         │  └──────────┬───────────────┘   │                 │
│         │             │                   │                 │
│         │  ┌──────────▼───────────────┐   │                 │
│         │  │  URL Blocking Engine     │   │                 │
│         │  │                          │   │                 │
│         │  │  ┌──────────────────┐    │   │                 │
│         │  │  │ Chrome path:     │    │   │                 │
│         │  │  │ declarativeNet-  │    │   │                 │
│         │  │  │ Request (DNR)    │    │   │                 │
│         │  │  └──────────────────┘    │   │                 │
│         │  │  ┌──────────────────┐    │   │                 │
│         │  │  │ Firefox path:    │    │   │                 │
│         │  │  │ webRequest +     │    │   │                 │
│         │  │  │ webRequest-      │    │   │                 │
│         │  │  │ Blocking         │    │   │                 │
│         │  │  └──────────────────┘    │   │                 │
│         │  └──────────────────────────┘   │                 │
│         └─────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

**Data flow:**

```
User action                  System response
─────────────                ────────────────
Add URL ──────────▶  settings.tsx validates + saves to storage
                    ──▶ background.ts detects change via storage.watch
                    ──▶ DNR rules / webRequest listener updated

Visit blocked site ──▶ background.ts intercepts request
                    ──▶ Redirects to blocked.tsx?url=...
                    ──▶ blocked.tsx fetches trivia from opentdb.com
                    ──▶ User sees trivia, clicks "Show Answer" or leaves
```

---

### Scripts

```bash
pnpm dev               # Dev server (HMR) — Chrome
pnpm dev --target=firefox-mv2  # Dev server — Firefox
pnpm build             # Production build — Chrome
pnpm build:firefox-mv2 # Production build — Firefox MV2
pnpm build:firefox-mv3 # Production build — Firefox MV3
pnpm package           # Build + create store-ready zip
pnpm debug             # Dev server with verbose logging
pnpm prettier --write .  # Format all files + sort imports
```

---

### Code Conventions

- Interactive components use `"use client"` directive
- Import via `@/` alias (maps to project root)
- Theme via `.dark` class on `<html>`, persisted via `@plasmohq/storage`
- CSS variables in `styles/globals.css` — avoid inline styles
- Imports are automatically sorted by Prettier plugin — just run `pnpm prettier --write .`
- No lint or typecheck scripts exist — formatting is the only automated check

---

### Contributing

Bug reports, feature suggestions, and pull requests are welcome.

1. **Open an issue** describing the bug or feature
2. **Fork the repo** and create a branch: `git checkout -b feat/my-change`
3. **Make changes** following existing code conventions
4. **Run formatter**: `pnpm prettier --write .`
5. **Open a pull request** linking to the original issue

For Firefox-specific issues, test against `pnpm dev --target=firefox-mv2` before reporting.

---

## Changelog

### v0.0.1 — _In development_

- URL blocking via DNR (Chrome) and webRequest (Firefox)
- Trivia on blocked page (Open Trivia DB)
- Dark/light theme
- Side panel support
- New tab clock
- URL suggestion autocomplete (DuckDuckGo)
- Privacy disclosure and MIT license

---

## Roadmap

In rough priority order:

- [ ] **Store submission** — Chrome Web Store + Firefox Add-ons (AMO)
- [ ] **Import / export** — Backup and restore your block list as JSON
- [ ] **Scheduled blocking** — Only block certain sites during work hours
- [ ] **Cross-device sync** — Sync block list via `chrome.storage.sync`
- [ ] **Custom trivia sources** — Let users choose trivia categories or bring their own API

---

## License

[MIT](./LICENSE) — use it, share it, build on it.

---

<div align="center">
  <small>
    Built by <a href="https://github.com/yujhenchen">Jen C.</a> &middot;
    <a href="https://github.com/yujhenchen/time-guard/issues">Report an issue</a> &middot;
    <a href="./PRIVACY.md">Privacy</a>
  </small>
</div>
