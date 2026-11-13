# Dev tooling

Dev-only. Site owners never need Node. `npm install` at the repo root, then `npx playwright install chromium` once.

- `npm run tokens` / `node scripts/build-tokens.mjs`: regenerates `design-system/css/tokens.css` from `tokens.json` (byte-identical to the committed file).
- `npm run tokens:check`: exits 1 if the committed CSS is stale (for CI).
- `npm run parity` / `node scripts/parity/parity.mjs [--no-build] [--dest DIR] [--only Nav,Hero]`: builds `exampleSite` with Hugo, then compares each `design-system/reference/*.html` component root (top-level `rs-*` elements) with the same elements in `/styleguide/`. Compared: tag, `rs-*` classes, attribute names, child tree; ignored: text, non-`rs-` demo classes, `style`, `aria-current`, heading level. Exits 1 on any difference. Cover and GridSystem are skipped.
- Screenshot diff (375/768/1280, light/dark) is not implemented; see the TODO in `parity.mjs`.
