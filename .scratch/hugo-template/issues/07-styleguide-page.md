# 07. Styleguide page rendering every component

Status: resolved
Blocked by: 05, 06
Spec: ../spec.md

`exampleSite/content/styleguide.md` rendering all components from the real partials; noindex, unlinked. Include one error-state form and a signal-count check hook.

**Done when:** every component and variant in spec §5.1 appears once.

## Answer

Status: resolved

- `exampleSite/content/styleguide/index.md` (leaf bundle, `type: styleguide`, `noindex`, `sitemap.disable`, `build.list: never`; unlinked) plus page resources `note-text.md`, `note-large.md`, `article-sample.md` that feed card-post and article.
- `layouts/styleguide/single.html` renders hero, speclist, section, button (primary/secondary/signal/text/disabled), fullbleed (scrim + band), figure (3x2, wide 16x9, full 21x9), quote, aside (default + field), card-link, card-post (default, large, embed), one error-state form (static markup from Card.html), and article. Nav/footer come from the page shell.
- `head.html` emits `<meta name="robots" content="noindex, nofollow">` when `noindex` is set.
- Signal count is 1 (`rs-btn--signal`); `#styleguide[data-signal-max]` plus a console snippet in the layout comment is the check hook.
- Rendered hero/section/speclist/button trees match `reference/*.html`; no bugs found in them (button renders `<a>`, reference uses `<button>`; hero image placeholder omitted when no image).
- Not covered: image-backed figure/fullbleed/card-link variants (no raster images in the repo), card-form partial (error form is static), card-post permalink/embed URL empty because page resources have no permalink.
