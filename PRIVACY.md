# Privacy Disclosure

**time-guard** does not collect, store, or transmit any personal data. All user data (blocked URL list and theme preference) is stored locally on the user's device via `chrome.storage` and never leaves the browser.

## External Services

The extension communicates with the following external services for functional purposes only:

| Service                                               | Purpose                                                      | Data Sent                                                 |
| ----------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| [Open Trivia DB](https://opentdb.com)                 | Fetches a trivia question to display on the blocked page     | None — a GET request with no parameters beyond `amount=1` |
| [DuckDuckGo Autocomplete](https://duckduckgo.com/ac/) | Provides URL suggestions while typing in the "Add URL" field | The keystrokes typed by the user into the URL input field |
| [Google Favicons](https://www.google.com/s2/favicons) | Loads favicon images next to each blocked site in the list   | The domain extracted from the blocked URL                 |

None of these services receive personal information, browsing history, or any data beyond what is described above.
