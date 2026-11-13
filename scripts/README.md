# Dev tooling

Dev-only. Site owners never need Node. `npm install` at the repo root, then `npx playwright install chromium` once.

- `npm run tokens` / `node scripts/build-tokens.mjs`: regenerates `design-system/css/tokens.css` from `tokens.json` (byte-identical to the committed file).
- `npm run tokens:check`: exits 1 if the committed CSS is stale (for CI).
- `npm run parity` / `node scripts/parity/parity.mjs [--no-build] [--dest DIR] [--only Nav,Hero]`: builds `exampleSite` with Hugo, then compares each `design-system/reference/*.html` component root (top-level `rs-*` elements) with the same elements in `/styleguide/`. Compared: tag, `rs-*` classes, attribute names, child tree; ignored: text, non-`rs-` demo classes, `style`, `aria-current`, heading level. Exits 1 on any difference. Cover and GridSystem are skipped.

  Intentional or content-driven differences the script normalises away (all in `inPage()`):
  - Heading level (h1-h6 compare as `h`), `aria-current`, `style`, `class` names that do not start with `rs-`, all text.
  - `id`, `data-*` (JS hooks), `href`/`target`/`rel`, `open`, `tabindex` (scrollable code blocks are focusable), form demo/state attributes (`onsubmit`, `action`, `method`, `novalidate`, `enctype`, `name`, `required`, `autocomplete`, `value`, `checked`, `aria-invalid`, `aria-describedby`), `.rs-error`, `.rs-help`.
  - `aria-labelledby` compares equal to `aria-label` (both name the card; the theme points at the visible author name).
  - `a.rs-btn` and `button.rs-btn` compare equal (the Button partial renders links; real `<button>` is only for actions).
  - `img` and the reference `.rs-ph` placeholder compare equal (reference demos use placeholders; the theme renders real images).
  - Inline `em/strong/code/a/span/time/br` without an `rs-` class are skipped (content).
  - Adjacent identical siblings collapse to one (menu items, footer groups, spec rows: content count).
  - Dropped as theme behaviour not in the references: the footer theme toggle (`[data-theme-toggle]`), notes action bar and embed panel (`.rs-post__actions`, `.rs-post__panel`, JS-enhanced), the inline desktop nav list and panel CTA (references show them in separate demo variants), `.rs-count`, text spans inside `.rs-ph`.
  - Known remaining deviation, not normalised: footer group headings are `h2` (reference: `h3`) so heading order never skips after the page `h1`; heading level is ignored by the script, so this passes.
  The component roots are searched anywhere in `/styleguide/`, not only at its top level.
- `npm run a11y` / `node scripts/a11y/check.mjs [--dest DIR] [--no-build] [--pages /a/,/b/]`: builds exampleSite (minified), serves it, and for 12 key pages (home, work index and case study, writing index and post, notes index, note and embed, about, styleguide, tag index, 404) at 375/768/1280 in light and dark runs axe-core (wcag2a/aa, 2.1, 2.2 AA, best-practice), and fails on console errors, any non-same-origin request, horizontal scroll at 320px, more than one signal element, and inline styles other than `--focal`. One documented axe exception: `landmark-unique` for repeated unlabeled `<aside>` (the Aside reference has no label).
- `npm run a11y:keyboard` / `node scripts/a11y/keyboard.mjs [--dest DIR]`: against an already built site, tabs through five pages checking a visible focus ring and 44px target height on every stop, operates the menu, theme toggle and Embed button by keyboard, checks horizontal overflow at 320px and 640px (200% zoom) on every built page, and image `width`/`height`/`decoding`.
- Screenshot diff (375/768/1280, light/dark) is not implemented; see the TODO in `parity.mjs`.
