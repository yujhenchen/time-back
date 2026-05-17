## 1. Diagnose the root cause

- [x] 1.1 Add `console.log` to `storage.watch` callback and webRequest listener to trace whether blocked URLs are loaded and matched on Firefox

## 2. Fix the blocking

- [x] 2.1 Ensure `blockedUrls` is populated from storage before the webRequest listener processes any request (guard with an `initialized` promise or read from storage directly in the handler)
- [x] 2.2 Fix URL matching to handle the same formats as the DNR path (hostname comparison should strip protocol, paths, and www. prefix)
