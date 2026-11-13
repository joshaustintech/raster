# 15. Theme toggle (ADR-0004)

Status: resolved
Blocked by: 04, 05
Spec: ../spec.md

`theme.js` blocking external script, localStorage in try/catch, footer text button auto/light/dark, no flash, works without JS.

**Done when:** persists across pages; no CSP-violating inline script.

## Answer

`assets/js/theme.js` is loaded as a blocking, fingerprinted external script via `layouts/_partials/head/theme.html` (no inline script). It reads `rs-theme` from localStorage (try/catch) and sets `data-theme` before paint. The footer button (`data-theme-toggle`, hidden until JS runs) cycles auto/light/dark, updates its text ("Theme: auto") and `aria-pressed`. Strings are in `i18n/en.toml`. Not verified in a browser; the text button has no 44px target extension.
