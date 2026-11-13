# Customisation

## Change colours, sizes and spacing

`design-system/tokens.json` is the source of truth. `design-system/css/tokens.css` is generated from it and committed. Never hard-code a colour, size or spacing value in CSS.

This is a **contributor-side** step and needs Node (site owners who only configure and write content never do):

```sh
git clone https://github.com/joshaustintech/raster && cd raster
npm install
# edit design-system/tokens.json
npm run tokens          # regenerates design-system/css/tokens.css
npm run tokens:check    # fails if the committed CSS is stale
```

To use your fork in a site, point your module replacement or submodule at it. Without Node, you can override a single token in your own CSS by redefining the custom property after the theme CSS (see "Add your own CSS" below), but changes that do not go through `tokens.json` will not stay in sync with the design system.

Check colour pairs in both themes after any change (they are tuned to at least 4.5:1).

## Override a partial or layout

Hugo looks in your site before the theme. To change a partial, copy it to the same path in your site and edit:

```text
layouts/_partials/footer.html     # overrides the theme footer
layouts/notes/single.html         # overrides the note page
```

Keep the element structure and `rs-*` class names matching `design-system/reference/<Name>.html`; run the parity script (below) if you can.

## Add your own CSS

The theme CSS is one fingerprinted bundle (fonts, tokens, `raster.css`, then `raster-extensions.css`) built in `layouts/_partials/head/css.html`. To append styles, override `layouts/_partials/head/head.html` (copy it from the theme) and add a `<link>` after `{{ partial "head/css.html" . }}`, or override `head/css.html` to add your resource to the concat list.

## Add a component

1. Add the class rules to `design-system/css/raster.css` (or, for Hugo-only helpers, to `assets/css/raster-extensions.css`), using tokens only.
2. Write a reference file in `design-system/reference/`.
3. Add a partial in `layouts/_partials/` and, if authors need it, a shortcode in `layouts/_shortcodes/`.
4. Add it to the styleguide so the parity script covers it.

## Rules you must not break

These come from the design system and are what keep the site looking like Raster:

- No shadows, gradients, rounded corners or decorative icons.
- At most one `signal` (chartreuse) element per view.
- Flush-left; never centred or justified.
- Font sizes step at 640 and 1024px; no `vw` units and no `clamp()` on font sizes.
- Every line height is a multiple of 8px; no horizontal scroll at 320px or wider.
- No inline styles in markup (the theme uses a few CSS custom properties for focal points only).
- No third-party requests.
- Keep landmarks, heading order, `<time datetime>`, `aria-*` states, labels, alt text, 44px targets and visible focus.

Fix visual bugs in the CSS, not by changing markup.

## Fonts for other scripts

Inter Tight and IBM Plex Mono ship Latin subsets only. For other scripts, add self-hosted `.woff2` files to your site's `static/fonts/` (never a CDN), add `@font-face` rules with `unicode-range` in your own CSS, and extend the font stacks via `tokens.json` (then run `npm run tokens`). The generated Open Graph image falls back to a plain site-title card when a note contains non-ASCII text or emoji, because the bundled OG fonts cover ASCII only.

## Parity testing (contributors)

`npm run parity` builds `exampleSite` and compares each reference component with the styleguide fragment (tag, class, attribute names, tree). See `scripts/README.md`.
