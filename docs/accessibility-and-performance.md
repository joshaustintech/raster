# Accessibility and performance

What the theme guarantees, how to check it, and the results of the issue 18 pass (Hugo 0.169, exampleSite, 2026-11-13).

## What is guaranteed

Markup and CSS from the theme, independent of your content:

- Landmarks: skip link, `nav` (labelled), one `main`, `footer`. Every page has exactly one `h1`; footer group headings are `h2`, so heading order never skips after the `h1`.
- The page canvas follows the theme (`html`/`body` take `--paper`), light and dark, with `color-scheme` set so form controls and scrollbars match. Dark mode follows `prefers-color-scheme`; the footer toggle cycles auto, light, dark and sets `data-theme`.
- Colour pairs come from tokens and pass axe contrast in both themes on all checked pages.
- Targets are at least 44px: buttons, nav mark and links, text buttons, the footer toggle, pager links, note time links (hit area widened by a pseudo-element), checkbox rows. Card links are stretched over the whole card.
- Visible focus on every tab stop; menu (`details`), Embed (`aria-expanded`) and the theme toggle (`aria-pressed`) work from the keyboard.
- No horizontal scroll at 320px (400% zoom) or 640px (200% zoom). Grid children may shrink, code blocks scroll inside a focusable `pre`.
- Images: `width`/`height` always set for raster images (no layout shift), `decoding="async"`, `loading="lazy"` except the hero and full-bleed images, `srcset` with WebP. SVG resources are supported without image processing: they are emitted without intrinsic dimensions and sized by the figure's ratio box (Hugo cannot read SVG dimensions). Missing alt text produces a build warning.
- No third-party requests: fonts, CSS and scripts are first-party. The favicon defaults to an empty data URI so browsers do not request `/favicon.ico` (set `params.favicon` to use a real one).
- Print: Nav, Footer and skip link are hidden; external link URLs are printed after links in articles.
- Budgets measured on the example site: CSS bundle 5.7 KB gzip (one file), JS 2.9 KB gzip in total across `theme`, `notes`, `embed` and `form` (the spec limit is 5 KB), three WOFF2 fonts (76 KB, the first two preloaded).

Rules from `CLAUDE.md` that the checker enforces on every page: at most one `signal` element (`.rs-btn--signal`, `.rs-tag--signal`), and no inline `style` other than `--focal` on full-bleed images.

What you must keep when overriding: do not remove the `h1`, the `main` landmark, `width`/`height` on images, or the 44px rules in `raster-extensions.css`; keep colour pairs token-based.

## How to check

All tools are dev-only (`npm install` at the repo root, `npx playwright install chromium` once). See `scripts/README.md`.

```sh
node scripts/a11y/check.mjs          # build, serve, axe + console + third-party + 320px + signal + inline style, 12 pages x 3 widths x 2 themes
node scripts/a11y/keyboard.mjs       # keyboard pass, 44px targets, 200% and 400% zoom overflow, image attributes (uses the last build)
node scripts/parity/parity.mjs       # DOM parity with design-system/reference
npx lighthouse http://localhost:1313/ --only-categories=accessibility,performance,best-practices,seo --chrome-flags="--headless=new"
npx vnu-jar --skip-non-html --errors-only exampleSite/public   # needs Java
```

Manual checks that the scripts do not cover: a screen reader pass (VoiceOver, NVDA), reduced-motion and forced-colours modes, the embed `postMessage` resize inside a real host page, and a visual review at 375/768/1280.

## Results (this pass)

| Check | Result |
| --- | --- |
| axe-core 4.14, wcag2a/aa/21/22aa + best-practice, 12 pages x 375/768/1280 x light/dark | 0 violations, with one documented exception (below) |
| Console errors, non-same-origin requests, 320px overflow, signal count, inline styles | none |
| Keyboard pass (5 pages, every tab stop), menu, theme toggle, Embed | focus ring on every stop; all three operable |
| Overflow at 320px and 640px on all 44 built pages | none |
| Lighthouse 12 (headless Chrome, localhost, default desktop settings) | First run: accessibility 100 on home, case study, post, about, styleguide and 98 on a note (footer heading order, then fixed); performance 99-100; best-practices 96 (favicon 404, then fixed); SEO 100 (69 on the styleguide, deliberately `noindex`). Re-run after the fixes on home, a note and a term page: 100 in all four categories |
| vnu (Nu Html Checker 26.11.9), whole built site | 0 errors; 49 info-level warnings (note cards are `article` without a heading by design in the reference; `href=#` after minify) |
| Parity against `design-system/reference` | all 12 components match after the changes and ignore rules in `scripts/README.md` |
| Pagination and term pages (built with `HUGO_PAGINATION_PAGERSIZE=2`, screenshots at 375 and 1280) | styled and spaced; not part of the committed example config |

Documented exception: axe `landmark-unique` for two unlabeled `<aside>` elements on the same page (the styleguide). The Aside reference has no accessible name, and adding one would break markup parity. Give asides distinct labels in your own markup if you use several per page.

## What changed in this pass

- Missing page canvas: `html`/`body` had no background, so dark mode rendered light text on a white canvas (axe contrast failures on every dark page). Fixed in `raster-extensions.css`.
- Footer theme toggle: low contrast (fleece on the night band) and under 44px; now `night-ink` and 44px. Buttons, nav links and the nav mark were 40px or 24px; now 44px.
- `figure`, `hero`, `card-link` and `og-image` no longer crash on SVG resources (checked with a temporary SVG cover and figure, then removed).
- Notes: single note page and embed page had no `h1`; the embed page had no `main`; long embed code overflowed at 320px. Work index had no `h1` (the `section` partial takes an optional `tag`).
- Pager: unstyled links on Notes, no spacing, text buttons under 44px, now one shared `pager` partial with `rel="prev|next"`. Tag index and term pages use the Hero and a plain tag list; term cards are `h2`.
- Short pages keep the footer at the bottom of the viewport.
- Parity script ignore rules and the styleguide now show the real media figure, quote card, form card, 16:9 and 1:1 figures and an Article that mirrors the reference.

## Caveats

- Lighthouse and axe were run against a local static server of the minified build, not a deployed site, and only on the pages listed. Lighthouse scores vary between runs; the numbers above are single runs. Mobile throttled performance was not measured.
- Automated tools catch roughly a third of accessibility issues. No screen reader testing, no forced-colours testing, and no real-device touch testing was done.
- The "one `signal` element per view" rule is enforced on elements. The example cover images on the home page contain chartreuse artwork (two of three cards), which a human reviewer may count; this is content, not theme.
- The footer `h2` deviates from the reference's `h3` for heading order; parity ignores heading level.
- Section headers sit flush against the cards above them on the home page (no vertical gap between bands); this is the reference spacing and was left as is.
- The embed page's `main` and `h1` are visually hidden (`rs-sr`) so the card itself looks unchanged inside an iframe.
- 200% zoom was checked as a 640px viewport (equivalent for responsive layout), not with browser zoom UI.
