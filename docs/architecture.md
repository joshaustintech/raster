# Architecture

For contributors. See also the [ADRs](adr/) and `.scratch/hugo-template/spec.md`.

## Mapping onto the design system

`design-system/` is the Raster design system: `tokens.json` (source of truth), generated `css/tokens.css`, hand-written `css/raster.css` (all `rs-*` classes), `css/fonts.css`, `reference/*.html` (ground truth for markup) and per-component READMEs. The theme does not fork it; it mounts it.

## Module mounts (`hugo.toml`)

| Source | Target | Why |
| --- | --- | --- |
| `design-system/css` | `assets/css` | CSS available to Hugo Pipes |
| `design-system/fonts` | `static/fonts` | self-hosted `.woff2`, served at `/fonts/` |
| `assets`, `layouts`, `i18n`, `archetypes` | same | theme-owned files |

`fonts.css` uses relative `../fonts/` URLs; the bundled CSS is emitted at `/css/`, so they resolve to `/fonts/`. Minimum Hugo version (`0.169.0`) is declared in `[module.hugoVersion]`. Mounts work when the theme is consumed as a Module or a theme directory (both tested).

## CSS bundle order

`head/css.html` concatenates `fonts.css`, `tokens.css`, `raster.css`, `raster-extensions.css` into `css/raster.bundle.css`, minifies and fingerprints it. Extensions hold only Hugo-specific glue (placing Markdown output on the Article grid, Chroma syntax colours, the visually hidden live region used by the notes JS); they use tokens only.

The page root is `.rs-c` (a container-query context) wrapping Nav, `<main>`, Footer. See `layouts/baseof.html`.

## Layouts

- `baseof.html`, `home.html`, `list.html`, `single.html` fall back for all sections; `work/`, `writing/`, `notes/`, `about/`, `styleguide/` hold the type-specific layouts (Grid.md section 6.2). Section pages use the section directory name, so content must be in `work/`, `writing/`, `notes/`, `about/`.
- `_partials/` are the components (one per design-system component, plus `head/*`, `pager`, `work-cards`, `og-image`, `notes-js`).
- `_shortcodes/` are `figure`, `quote`, `aside`, `button`, `card`, `spec`.
- `_markup/` render hooks: `render-image` (figure), `render-blockquote` (quote and alerts to Aside), `render-codeblock` (Chroma with a focusable `pre`).

## JavaScript

All first-party, external files, progressively enhanced: `theme.js` (blocking, sets `data-theme`), `notes.js` (Share, Copy, Embed panel), `embed.js` (height and `?theme=` in embeds), `form.js` (validation messages). Each is minified and fingerprinted with SRI; no inline script.

## Output formats

| Format | Where | Output |
| --- | --- | --- |
| `embed` | each note (`outputs: [html, embed]`) | `/notes/<id>/embed/index.html` via `single.embed.html` |
| `atom` | notes section (`outputs: [html, rss, atom]`) | `/notes/atom.xml` via `notes/list.atom.xml` |
| `jsonfeed` | home | `/feed.json` via `home.jsonfeed.json` |
| `rss` | built in | `/index.xml`, `/<section>/index.xml` |

Hugo does not merge theme `outputFormats`, `outputs` or `markup` config into consumers, hence the copy-paste blocks in [Installation](installation.md). `cascade` cannot set `outputs`, hence per-note front matter.

## Open Graph images

Notes get a 1200x630 PNG generated with `images.Text` (ADR-0002), in `partials/og-image.html`, using `assets/og/*.ttf`. Inter Tight is the variable TTF and renders at its default weight. Non-ASCII text falls back to a site-title card.

## Dev tooling

Node, dev-only (ADR-0003): `scripts/build-tokens.mjs`, `scripts/parity/`, `scripts/fetch-fonts.sh`. See `scripts/README.md`.
