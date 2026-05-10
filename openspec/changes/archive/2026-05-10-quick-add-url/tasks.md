## 1. Core Implementation

- [x] 1.1 Extract shared `addUrl()` function from `onSubmit` with duplicate check + storage write + toast + state reset, and call it from `onSubmit`
- [x] 1.2 Update `handleSuggestionSelect` to call `addUrl()` instead of `form.setValue()`, adding the URL directly to the block list
