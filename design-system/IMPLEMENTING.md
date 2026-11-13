# Implementing Raster

Handoff for Claude Code (or any developer). Raster is the design system for a senior software engineer's site: portfolio (Work), blog (Writing), short notes (Notes), About/Contact. It is plain CSS plus HTML conventions: no JavaScript, no build step, no framework dependency.

**Target framework:** `<FILL IN: name + version>` — before writing code, read that framework's current docs for: templating/components, layouts, static assets, routing, and how to include global CSS. Do not assume conventions from a more popular framework.

## What is in this folder

| Path | Purpose |
| --- | --- |
| `README.md` | Brand book: principles, voice, colour, type, imagery, site map. **Read first.** |
| `Grid.md` | Layout and responsive rules (Müller-Brockmann grid, breakpoints, type steps, page templates). **Read second.** |
| `tokens.json` | Source of truth for colours (light + dark), type styles, spacing, grid, radius. |
| `css/tokens.css` | Tokens as CSS custom properties. Generated from `tokens.json`. |
| `css/fonts.css` | Self-hosted `@font-face` rules. |
| `css/raster.css` | All component and layout classes (`rs-*`). |
| `components/<Name>/README.md` | Usage rules per component: markup, variants, what the consumer supplies. |
| `reference/<Name>.html` | A working page per component. **The markup in these files is the ground truth.** Open them in a browser. |
| `fonts/` | Font files go here (see `fonts/README.md`; not yet downloaded). |

Components: Nav, Hero, SpecList, SectionHeader, FullBleed, Figure, Quote, Aside, Article, Card (post / form / link), Footer, Button, plus the GridSystem overlay.

## Order of work

1. **Fonts.** Do the steps in `fonts/README.md`. Verify the four files load.
2. **Global CSS.** Load, in this order, on every page: `css/fonts.css`, `css/tokens.css`, `css/raster.css`. Copy them where the framework serves static assets from; keep the relative `../fonts/` path in `fonts.css` working (or edit the URLs once). Add `<meta name="viewport" content="width=device-width, initial-scale=1">`.
3. **Page shell.** One layout containing `<div class="rs-c">` as the root of the body content (every component's responsive behaviour depends on this container), then Nav, page content, Footer. Set `<html lang>`.
4. **Components.** For each component, open `reference/<Name>.html` and its README, then recreate it as a template / partial / component in the framework with the **same element structure and class names**. Parameterise only what the README says the consumer supplies. Do not invent new classes or inline styles; the previews' `<style>` blocks are demo scaffolding, not part of the component.
5. **Pages.** Build the page types listed in `Grid.md` §6.2 from those components.
6. **Notes (microblog).** Implement what `components/Card/README.md` → "Sharing and embedding notes" specifies: permalink route per note, Share (Web Share API with copy-link fallback), `og:*` tags and a 1200×630 preview image, `/notes/<id>/embed` route with `?theme=` and the `postMessage` height message, the `<blockquote>` fallback, `h-entry` microformats, RSS/Atom feed. This is the only part that needs code beyond markup (a few lines of progressive-enhancement JS for Share/Embed/Copy).

## Rules that must not be broken

- **Tokens, not literals.** No hard-coded colours, sizes or spacing in templates or new CSS: use the `--` variables. If something is missing, add it to `tokens.json` and regenerate `css/tokens.css`, don't improvise.
- **Class names and structure stay as in `reference/`.** Bug in the CSS? Fix `css/raster.css`, not the markup.
- **Dark mode:** follows `prefers-color-scheme`; a `data-theme="light|dark"` attribute on `<html>` overrides it. Don't add a second colour scheme.
- **Responsive:** components respond to their *container* (`@container`), so `.rs-c` must wrap the page. Breakpoints are 480 / 640 / 1024 / 1440. No viewport-unit font sizes, no horizontal page scroll at ≥320px.
- **Accessibility:** keep the semantics in the references (landmarks, headings in order, `<time datetime>`, `aria-current`, `aria-expanded`/`aria-pressed` on toggles, labels on every input, `alt` text on images, 44px touch targets, visible focus). Colour pairs are already ≥4.5:1; don't change them without re-checking in both themes.
- **No shadows, gradients, rounded corners or decorative icons** (see principles in `README.md`). One `signal` (chartreuse) element per screen at most.
- **No third-party requests:** fonts, CSS and scripts are all first-party.
- Copy the placeholder content in the references ("Avery Lin" etc.) only as structure; real content comes from the site owner.

## Acceptance checks

For each component and page, at **375, 768 and 1280px**, in **light and dark**:

1. Open the matching `reference/<Name>.html` next to the framework's output; layout, type sizes and spacing should be indistinguishable.
2. No horizontal scroll; no clipped or overlapping text; zoom to 200% still works.
3. Keyboard: Tab order follows reading order, focus ring always visible, menu and Embed panel open/close with keyboard.
4. Fonts: Network panel shows the three self-hosted `.woff2` files, and no request to Google or any other third party.
5. Lighthouse accessibility ≥ 95; no console errors.
6. Validate HTML.

## Known gaps

- Fonts not bundled yet (see `fonts/README.md`).
- No logo and no icon set: the site name is set in `display` type; note actions use text labels.
- `Cover.html` is the system's own cover artwork, for reference only: not a site component.
- `GridSystem.html` is a development overlay; keep it out of production pages.
- Card Share/Embed/Copy behaviours are specified but not implemented.
