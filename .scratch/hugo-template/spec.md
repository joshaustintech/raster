# Spec: Raster Hugo template

Status: ready-for-human (review, then split into `issues/`)

## 1. Goal

Ship **Raster** as a production-ready, installable Hugo theme with a complete `exampleSite/` and human-readable documentation, in the style of PaperMod / Congo / Hugo Book: install in five minutes, configure from `hugo.toml`, write only Markdown.

Decisions already made (see `docs/adr/`):

| # | Decision |
| --- | --- |
| 1 | Packaged as a **theme + `exampleSite/`** at the repo root, consumable as a Hugo Module or git submodule (ADR-0001) |
| 2 | Note OG images are rendered at build time with Hugo's **`images.Text`** (ADR-0002) |
| 3 | **Markdown only, no Node/Go build deps** for site owners. First-party JS only (ADR-0003) |
| 4 | **Light/dark toggle** with persisted choice, default `prefers-color-scheme` (ADR-0004) |

Non-goals: search, comments, analytics, CMS integration, multilingual content (strings go through `i18n/en.toml` so it is possible later, but only English ships), any icon set, any third-party request at page load.

## 2. Principles for the implementation

1. `design-system/` stays the **vendored upstream**. The theme mounts it instead of copying it (Hugo `module.mounts`: `design-system/css` -> `assets/css`, `design-system/fonts` -> `static/fonts`). One copy, no drift. `fonts.css`'s `../fonts/` URLs keep working because the bundled CSS is served from `/css/`.
2. `reference/<Name>.html` is the markup ground truth. Each partial must produce the same element tree and class names. This is verified mechanically (section 8, "reference parity").
3. Nothing in `raster.css` is edited to add features. Gaps go in a separate **`assets/css/raster-extensions.css`**, token-only, loaded after `raster.css`. Real bugs in `raster.css` are fixed there, upstream-style, and logged in `CHANGELOG.md`.
4. All rules in `CLAUDE.md` -> "Rules that must not be broken" are acceptance criteria, not guidance.

## 3. Gaps found in the design system (need extensions)

`raster.css` has no styles for: skip link, lists inside Article, tables, `hr`, `h3`-`h4` in Article, `:target`/anchor offset under the sticky nav, syntax-highlight token colours, pagination, tag lists, print, `.rs-embed` iframe page shell, copy-confirmation state. All go in `raster-extensions.css` using tokens only. Syntax highlighting uses Chroma **classes** (not inline styles) coloured from tokens (`ink`, `ink-muted`, `fleece`, `olive`, `clay`); no `signal`.

Also note: docs mention `components/bundle.css`; the real file is `css/raster.css`. The theme docs use the real name.

## 4. Repository layout (target)

```
raster/                          <- the theme (module path: github.com/<owner>/raster)
  hugo.toml                      <- theme-level module config (mounts, min version)
  theme.toml  LICENSE  README.md  CHANGELOG.md  CONTRIBUTING.md  GLOSSARY.md
  design-system/                 <- vendored upstream, unchanged (+ fetched fonts)
  assets/
    css/raster-extensions.css
    js/{theme.js,notes.js,embed.js,form.js}
    og/{InterTight-Bold.ttf,IBMPlexMono-Medium.ttf}   <- TTF only for images.Text
  layouts/
    baseof.html  home.html  404.html  list.html  single.html  taxonomy.html  term.html
    work/{list,single}.html  writing/{list,single}.html
    notes/{list,single,single.embed}.html  about/single.html
    _partials/  (components, head, seo, etc.)  _shortcodes/  _markup/
  i18n/en.toml
  archetypes/{work,writing,notes,default}.md
  data/ (none required)
  images/{tn.png,screenshot.png}
  exampleSite/                   <- complete demo, fictional persona
  docs/ (human docs, section 7)  docs/adr/
  scripts/                       <- dev-only (token build, font fetch, parity test)
  .github/workflows/
```

Hugo target: the current template system (`layouts/_partials`, `layouts/_shortcodes`, top-level `baseof.html`). **First task is to `brew install hugo`, record `hugo version`, and verify the lookup order and the minimum version against current Hugo docs** before writing layouts; then set `module.hugoVersion.min` accordingly. Extended edition is not required (plain CSS, Hugo Pipes `resources.Concat | minify | fingerprint` all work on standard).

## 5. Component and page mapping

### 5.1 Partials (one per component, same markup as `reference/`)

| Component | Partial / mechanism | Consumer inputs |
| --- | --- | --- |
| Page shell | `baseof.html`: `<html lang data-theme?>`, head, skip link, `<div class="rs-c">` > Nav, `<main id="main">`, Footer | site params |
| Nav | `nav.html` | `menus.main`, `params.nav.cta`, `.IsMenuCurrent`/section -> `aria-current="page"`; list rendered twice (inline + panel) |
| Hero | `hero.html` | eyebrow, title, lede, <=2 actions, optional image + alt (from `_index.md` front matter) |
| SpecList | `speclist.html` + `spec` shortcode | `facts:` list of `{label, value}` in front matter |
| SectionHeader / Section | `section.html` | numeral, title, intro; `NN / NN` generated from page position |
| FullBleed | `fullbleed.html` | `cover:` image, alt, caption, `focal` (maps to `--focal`) |
| Figure | `figure.html`, image render hook, `figure` shortcode | ratio (`1x1`..`21x9`), width (`wide`/`full`), caption; Hugo image processing for srcset/webp, intrinsic width/height to avoid layout shift |
| Quote | blockquote render hook + `quote` shortcode | text, cite |
| Aside | GitHub-style alert blockquote render hook (`> [!NOTE]`) + `aside` shortcode | text, optional `field` variant |
| Article | `article.html` wrapper; Goldmark output is already flat so direct children land on the grid | content |
| Card (link) | `card-link.html` | kicker `Work · 01 / 04`, title, summary, meta, optional image |
| Card (post) | `card-post.html` (note) | author, handle, avatar, timestamp, text, media+alt, share/embed |
| Card (form) | `card-form.html` | fields from `params.contact`, action URL |
| Footer | `footer.html` | `menus.footer` groups, statement, legal, theme toggle (text button) |
| Button | `button.html` + shortcode | label, href, variant |

Deviation to resolve (default proposed): the Card spec lists reply/like counts. A static site cannot count. **Default: no counts, no like toggle.** Actions are text buttons **Share**, **Embed**, **Copy link**, plus optional **Reply** (a `mailto:`/URL from `params.notes.replyTo`). `aria-pressed` is then used only by the theme toggle. Record as ADR-0005 if confirmed.

### 5.2 Pages (Grid.md section 6.2)

| Page | Source | Layout composition |
| --- | --- | --- |
| Home | `content/_index.md` | Hero · SpecList · Section "Selected work" + 3 link cards (`featured: true`) · Section "Recent notes" + 2-3 post cards |
| Work index | `content/work/_index.md` | Section header · numbered link cards `01 / 0N`, weight-ordered |
| Case study | `content/work/<slug>/index.md` (bundle) | FullBleed · SpecList (role, team, duration, stack, impact) · Article · next-project link card (`.NextInSection`, or `next:` override) |
| Writing index | `content/writing/_index.md` | Section header · link cards grouped by year (`GroupByDate "2006"`) |
| Post | `content/writing/<slug>/index.md` | Article · Aside "Related" with 2 link cards (`.Site.RegularPages.Related`) |
| Notes feed | `content/notes/_index.md` | post cards in `.rs-feed`, paginated |
| Note | `content/notes/<id>/index.md` | single card + Nav/Footer; `h-entry`; og tags |
| Note embed | same page, output format `embed` | card only in `.rs-embed` |
| About / Contact | `content/about/index.md` | Article · form card |
| 404, styleguide | `404.html`, `exampleSite/content/styleguide.md` | |

Taxonomies (tags) are optional: off by default; when enabled they render with `.rs-tag` on cards and a plain term list.

## 6. Cross-cutting features

- **Head partial:** viewport, `<title>`, description, canonical, `color-scheme`, preload of the two above-the-fold fonts, CSS bundle (`resources.Concat` of fonts/tokens/raster/extensions -> minify -> fingerprint + SRI), `theme.js` as a tiny **blocking external** script (no inline script, so strict CSP works), feeds `<link rel=alternate>`.
- **SEO:** Open Graph, Twitter card, JSON-LD (`Person`/`WebSite`, `BlogPosting`), sitemap, robots.txt, `hreflang` hook-ready.
- **Feeds:** RSS for site and per section; **Atom** custom output format for Notes (spec asks for RSS/Atom); optional JSON Feed.
- **Theme toggle:** `theme.js` reads `localStorage` (try/catch), sets `data-theme` before first paint, else leaves it to `prefers-color-scheme`. Footer text button "Theme: auto / light / dark" with `aria-pressed`-style state. Works without JS (OS setting).
- **Notes (the one behavioural area)**
  - Permalink `/notes/<id>/`; embed at `/notes/<id>/embed/` via custom output format (`path: embed`, `baseName: index`, `notAlternative: true`), declared for notes pages only. Trailing slash is a Hugo convention; docs call this out and the embed snippet uses it.
  - `embed.js`: reads `?theme=light|dark`, sets `data-theme`, posts `{type:"rs:embed-height", height}` via `ResizeObserver`; documents a 10-line host snippet that listens and resizes the iframe.
  - `notes.js` (loaded only where notes appear): Share (`navigator.share`, else copy permalink, "Link copied" for 2 s, `aria-live=polite`), Copy link, Embed panel (`aria-expanded`/`aria-controls`, Escape closes) with generated `<iframe title loading=lazy style="max-width:560px">` and the `<blockquote class="rs-embed" cite>` fallback. Without JS, Share/Embed buttons are hidden via `hidden` attribute removal in JS (progressive enhancement); permalink and timestamp link still work.
  - `h-entry` microformats (`p-author h-card`, `e-content`, `dt-published`, `u-url`).
  - **OG image:** `images.Text` on a `paper`-coloured 1200x630 canvas, author, then text. Constraints to handle: needs TTF/OTF (fontsource ships only woff/woff2, so fetch static TTFs from the upstream Inter Tight / IBM Plex GitHub releases, bundled under OFL); `images.Text` does not wrap, so a partial wraps manually by character count per line and overlays one `Text` per line; no variable-font weight selection, so use a static Bold. Unicode/emoji fall back to a default image. Per-note `image:` front matter overrides. Documented as "close to, not identical to, the card".
  - Security headers sample: `/notes/*/embed/` must omit `X-Frame-Options: DENY` and set `frame-ancestors *` (documented for Netlify, Cloudflare Pages, GitHub Pages note that headers are unavailable).
- **Contact form:** static site, so `params.contact.action` is configurable. Default `mailto:`; docs list Formspree/Basin/own endpoint as **opt-in, third-party on submit only** (no page-load request). `form.js` optional: sets `aria-invalid` + "Error: ..." messages linked via `aria-describedby`; works with native validation without it.
- **Accessibility:** skip link, landmarks, heading order enforced by templates, `<time datetime>` everywhere, visible focus, 44 px targets (CSS), alt text required: render hook warns (`warnf`) on missing alt; `hugo --printPathWarnings` style check in CI.
- **Performance:** image processing with `srcset`, `loading=lazy` except hero, `decoding=async`, fonts preloaded, one CSS file, JS <5 KB gzip total, no layout shift.
- **Print stylesheet** (extensions): hide Nav/Footer/toggle, show link URLs in Article.

## 7. Documentation deliverables (human-readable)

Following the PaperMod/Congo pattern: short README, deeper docs in `docs/`, and the example site doubles as live docs.

- `README.md`: what it is, screenshot, features, 5-minute quick start (module + submodule), links to docs.
- `docs/installation.md`: Hugo version, Module vs submodule vs download, minimal `hugo.toml`, running the example site, fonts note.
- `docs/configuration.md`: every `params.*` key with type, default, example (site, nav, hero, footer, notes, contact, theme toggle, SEO, social).
- `docs/content.md`: front matter reference for each content type, archetypes, page bundles, images and alt text, writing in Markdown that lands on the grid (images, figures, quotes, asides, code).
- `docs/components.md`: each shortcode with arguments and a rendered example; links to `design-system/components/*`.
- `docs/notes.md`: writing notes, permalinks, sharing, embed code, `postMessage` host snippet, OG images, feeds, headers.
- `docs/customisation.md`: change tokens (edit `tokens.json`, run script, rebuild), override a partial, add a component, what you must not change (rules), fonts for other scripts.
- `docs/deployment.md`: GitHub Pages (workflow), Netlify, Cloudflare Pages, any static host; baseURL; headers for embed.
- `docs/accessibility-and-performance.md`: what is guaranteed, how to check (acceptance list).
- `docs/architecture.md`: how the theme maps onto the design system, mounts, bundle order, extension CSS, render hooks, output formats. For contributors.
- `docs/upgrading.md` and `CHANGELOG.md` (Keep a Changelog, SemVer; token/class renames = major).
- `CONTRIBUTING.md`, `LICENSE` (MIT for code; OFL licences for fonts included), `theme.toml`, `GLOSSARY.md` (Raster, Field, Band, Note, Embed, Signal, Baseline; created lazily per `docs/agents/domain.md`), `docs/adr/*`.
- Update `design-system/IMPLEMENTING.md`: replace `<FILL IN>` with "Hugo, min version X"; fix `bundle.css` references (in a change flagged to the design-system owner).

## 8. Example site (`exampleSite/`)

Fictional persona (placeholder "Avery Lin" is structure-only; ship clearly fictional and say so in the About page):

- Home with Hero, Facts, 3 featured case studies, recent notes.
- **Work:** 4 case studies with covers, full facts, every Article construct (figure wide/full, quote, aside, code, lists, table).
- **Writing:** 6 posts across 2-3 years (year grouping, related posts, one series numbered `01 / 03`, one long post for measure/reading-time check).
- **Notes:** ~10: text-only, `--large` (<140 chars), with media + alt, with a quoted note, with long URL, with line breaks.
- **About + Contact** form card (with demonstrated error state in styleguide only).
- `/styleguide/`: every component rendered from the real partials, so it can be compared with `reference/*.html` and used for visual tests. Not linked in nav; noindex.
- Imagery: no stock photos. Flat SVG diagrams and screenshots-style images drawn with tokens, honest placeholder portrait (square `fleece` monogram), all with alt text.
- `exampleSite/hugo.toml` demonstrates every config key, with comments.

## 9. Tooling and CI

- `scripts/fetch-fonts.sh`: the `fonts/README.md` npm steps plus TTFs for OG; verifies checksums; one-time, output committed.
- `scripts/build-tokens.mjs` (dev-only, Node): `tokens.json` -> `tokens.css`; CI fails if the committed CSS is stale. Site owners never need Node.
- `scripts/parity` (dev-only, Playwright): renders each `reference/*.html` and the matching `/styleguide/` fragment at 375/768/1280, light + dark, and compares (a) normalised DOM (tag + class + attribute-name tree, ignoring text) and (b) screenshot diff within tolerance.
- GitHub Actions on PR: build exampleSite at min Hugo version and latest (`hugo --gc --minify --panicOnWarning` on theme-owned warnings); HTML validation (vnu); **third-party request check** (Playwright fails on any non-same-origin request); Lighthouse CI (a11y >= 95, no console errors); pa11y/axe on key pages; link check; token-sync check; parity job; deploy exampleSite to GitHub Pages on `main`.
- Release: tag `vX.Y.Z`, GitHub release notes from CHANGELOG, Hugo Modules resolve by tag.

## 10. Phases and acceptance

| Phase | Work | Done when |
| --- | --- | --- |
| 0 Foundation | Install Hugo, record version; `git add` design-system; scaffold theme + `exampleSite`; fetch fonts; mounts; CSS bundle; `baseof` with Nav/Footer placeholders; CI skeleton | `hugo server` serves a page with three self-hosted fonts loading, no third-party requests |
| 1 Components | All partials in 5.1 + extensions CSS + `/styleguide/` | Parity job passes for every `reference/*.html` (DOM exact; screenshots within tolerance) at 3 widths x 2 themes |
| 2 Content engine | Render hooks, shortcodes, Chroma classes, archetypes, image processing | A Markdown file with images/quote/aside/code lands on the grid with no hand-written HTML |
| 3 Pages | Home, Work, Case study, Writing, Post, About, 404, pagination, related, year grouping | Each page matches Grid.md 6.1/6.2 at 375/768/1280 |
| 4 Notes | Permalink, embed format, `notes.js`, `embed.js`, OG images, h-entry, Atom/RSS | Embed works inside a test host page incl. resize and `?theme=`; link unfurl check shows 1200x630 image; feed validates |
| 5 Cross-cutting | Theme toggle, SEO/JSON-LD, sitemap/robots, print, form, a11y pass | Lighthouse a11y >= 95, axe clean, 200% zoom and 320 px OK, keyboard pass on menu/Embed/toggle |
| 6 Example site + docs | Full content, every doc in section 7, screenshots, `theme.toml` | A newcomer follows README to a running customised site in <= 5 minutes (test with a fresh checkout/module install) |
| 7 Release | License audit, version pinning, tag `v1.0.0`, Hugo themes gallery submission | CI green on min + latest Hugo; clean-room install of the tagged module builds |

## 11. Risks

| Risk | Mitigation |
| --- | --- |
| `images.Text` wrapping, font and unicode limits | Manual wrapper partial; default image fallback; document; ADR-0002 allows swapping to Playwright later without changing URLs |
| Hugo template-system changes between versions | Pin `hugoVersion.min`; CI on min and latest; read current docs at phase 0 |
| Mounted `design-system/` not honoured when consumed as a Module | Verify in phase 0 with a throwaway consumer site; fallback is copying into `assets/` + `static/` via a sync script |
| Goldmark output not flat (lists, tables, nested blockquotes) breaks the Article grid | Extensions CSS gives non-listed elements default column spans; test in styleguide; wrap hook output where needed |
| Hugo minify mangles markup/`white-space: pre-line` post text | Test; use `minify` config exclusions if needed |
| Form on a static site | Documented opt-in providers; default `mailto:` |
| Upstream design-system updates | Keep `design-system/` untouched; document sync; parity job catches drift |
| Single `signal` per view rule | Template-level: signal used only in the Hero primary action variant; lint in styleguide test that counts `.rs-btn--signal`, `.rs-tag--signal` per page <= 1 |

## 12. Open questions for the owner

1. Module path / GitHub owner and project name (`raster`?), and licence for code (proposed MIT).
2. Confirm: no reply/like counts on notes (section 5.1).
3. Minimum supported Hugo version (decide after phase 0 check).
4. Persona for the example site: keep fictional "Avery Lin" or something else.
5. Is `design-system/` to be committed as-is (it is currently untracked) before work starts? Proposed first commit: design-system + CLAUDE.md + docs.

## 13. Answers to open questions (adopted proposed defaults)

1. Module path `github.com/joshaustintech/raster` (from git remote); code licence MIT.
2. Confirmed: no reply/like counts on notes (ADR-0005).
3. Minimum Hugo version: decided after issue 02 (`hugo version` check).
4. Persona: fictional "Avery Lin", stated as fictional on the About page.
5. `design-system/` committed as-is in the baseline commit.
