# 21. Dev tooling: token build and reference parity test

Status: resolved
Blocked by: 07
Spec: ../spec.md

`scripts/build-tokens.mjs` (tokens.json→tokens.css) and Playwright parity script (normalised DOM + screenshot diff at 375/768/1280, light+dark, vs `reference/*.html`).

## Answer

Added `scripts/build-tokens.mjs` (reproduces tokens.css byte-for-byte; `--check` mode), `scripts/parity/parity.mjs` (Playwright normalised-DOM comparison against `/styleguide/`; screenshot diff stubbed with TODO), `package.json` (devDependency playwright) and `scripts/README.md`. Parity currently reports real DOM differences between partials and references; see the commit message / follow-up.
