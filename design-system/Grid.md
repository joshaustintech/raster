# Grid

The layout rules of Raster, codified from Josef Müller-Brockmann's *Grid Systems in Graphic Design* (1981) and translated to the screen. The book's argument holds: a grid is not decoration but a way of ordering information so that it reads with clarity, economy and objectivity. On screen the page has no fixed format, so the grid is defined once per breakpoint and every component follows it.

## 1. The baseline comes first

Müller-Brockmann derives the grid from the type, not the page. Raster's base is the **8px baseline** (`grid-baseline`).

- Every line height in `tokens.json` — and every responsive step below — is a multiple of 8.
- Every vertical space is a `space-*` token, all multiples of 8.
- Body leading (24px) equals the gutter (24px from 640px): one empty line of text separates columns and fields, as the book prescribes.
- Large type may cross baselines, but its baseline lands on one. Captions and text beside an image share the image's top line.

## 2. Columns, gutters, margins

| Container width | Columns | Gutter | Margin | Tokens |
| --- | --- | --- | --- | --- |
| < 480px | 4 | 16px | 16px | `grid-columns-sm`, `grid-gutter-sm`, `grid-margin-xs` |
| 480–639px | 4 | 16px | 24px | `grid-margin-sm` |
| 640–1023px | 8 | 24px | 32px | `grid-columns-md`, `grid-gutter`, `grid-margin-md` |
| 1024–1439px | 12 | 24px | 48px | `grid-columns`, `grid-margin` |
| ≥ 1440px | 12 | 24px | 48px, then grows | content box stops at `grid-max` (1440px); grounds and full-bleed media keep going |

Twelve columns divide into 2, 3, 4 and 6 equal fields; eight into 2 and 4; four into 2. Every layout must be expressible at all three counts.

## 3. Fields

A **field** (the book's *Rasterfeld*) is a block of columns × rows. Its row height is `grid-field` = 64px = 8 baselines, separated by a gutter.

- Standard field counts, after the book's 8 / 20 / 32-field examples: **2 × N** (halves), **3 × N** (thirds), **4 × N** (quarters).
- Images, colour blocks and video occupy **whole fields plus the gutters they span**. An image is never 5.5 columns.
- Image ratios come from the fields: 1:1, 4:3, 3:2, 16:9, 21:9. The width is set by columns; the ratio sets the height.

## 4. Placement

- **Flush left, ragged right.** No centring, no justification.
- **Asymmetry with tension.** Prefer 4 + 8, 3 + 9 and 5 + 7 splits over 6 + 6. Empty columns are part of the composition.
- **Hanging labels.** Eyebrows, numerals and margin notes sit in their own narrow column beside the text they label, so the text edge stays clean.
- **One axis per section.** Everything in a section shares one left edge.

## 5. Responsive rules

The principle: **the grid changes its column count; the system does not change its character.** Type steps down, columns merge, margins shrink — but the baseline, the flush-left axis, the palette and the order of reading stay fixed at every size.

### 5.1 Respond to the container

Components respond to the width of their container (CSS container queries on `.rs-c`), not the viewport. A footer in a 600px sidebar behaves exactly like a footer on a 600px phone. Put `.rs-c` on the page root; `.rs-wrap` then sets `--cols`, `--gutter` and `--margin` for everything inside.

### 5.2 Type steps, never fluid

Sizes jump at 640 and 1024 instead of scaling continuously, so every step stays on the 8px baseline.

| Style | < 640 | 640–1023 | ≥ 1024 |
| --- | --- | --- | --- |
| display-xl | 56 / 56 | 80 / 80 | 128 / 120 |
| display | 40 / 40 | 56 / 56 | 88 / 80 |
| numeral | 64 / 64 | 88 / 80 | 120 / 112 |
| headline | 32 / 32 | 40 / 40 | 56 / 56 |
| quote | 28 / 32 | 32 / 40 | 40 / 48 |
| title | 24 / 32 | 28 / 32 | 32 / 40 |
| lede | 18 / 24 | 20 / 32 | 22 / 32 |
| body | 16 / 24 | 16 / 24 | 16 / 24 |
| body-sm · small · eyebrow · mono | fixed | fixed | fixed |

- Body text never goes below 16px. Nothing goes below 11px.
- Sizes are written in `rem`, so a reader's larger default font scales everything; layouts must survive 200% text zoom without horizontal scroll or clipped text.
- Display type at < 640 should hold roughly 10 characters per line; longer names wrap at spaces (`text-wrap: balance`), and as a last resort break inside a word rather than overflow.

### 5.3 Reflow, in order of priority

1. **Keep reading order.** Columns stack in DOM order, top to bottom; nothing is reordered visually on small screens.
2. **Keep the measure.** Running text stays 45–70 characters (capped at `66ch`) at every width. On wide screens the text column stays narrow and the extra width becomes margin and field — never longer lines.
3. **Merge, don't squeeze.** When a span gets too narrow, it takes the full width at the next count down: 3 + 9 at twelve becomes 8 at eight becomes 4 at four. A column of text is never narrower than 3 of 12, 4 of 8 or 4 of 4.
4. **Margins to inline.** Margin notes (asides) and hanging numerals move into the text flow below 1024px, directly after the paragraph they belong to.
5. **Ratios widen.** 21:9 imagery becomes 16:9 below 640px; full-bleed media keeps its focal point (`--focal`) in view at 4:5.
6. **Navigation collapses** to a disclosure below 1024px; the page name and one action stay visible.

### 5.4 Touch and input

- Interactive targets are at least 44 × 44px (48px for buttons on coarse pointers); link rows in menus and footers are padded to 44–48px.
- Focus is always visible: 2px `focus` outline, 2px offset.
- Hover never carries information that tap can't reach.
- Motion respects `prefers-reduced-motion`.

### 5.5 Never

- Horizontal scrolling of the page at any width ≥ 320px.
- Hiding content on small screens that exists on large ones (shorten it on all screens instead).
- Viewport-unit type (`vw`), or `clamp()` on font sizes — it breaks the baseline.
- Fixed pixel heights on text containers.

## 6. Site templates

### 6.1 Bands

| Band | ≥ 1024 (12) | 640–1023 (8) | < 640 (4) |
| --- | --- | --- | --- |
| Nav | name · 4 links · action | name · action · menu | name · menu |
| Hero | name 1–12; lede 1–4; image 6–12 | name 1–8; lede 1–6; image 1–8 | all 1–4 |
| Facts (SpecList) | 4 across | 2 across | 2 across ≥ 480, else 1 |
| Case-study cover (FullBleed) | text 1–8 at the bottom | text 1–7 | text 1–4 |
| Section | numeral 1–2; text 4–9 | numeral 1–2; text 3–8 | stacked |
| Post / case study (Article) | text 4–9; asides 10–12; figures 4–12 | text 1–7; figures 1–8 | all 1–4 |
| Card index (work, writing) | 3 across, 4 cols each | 2 across, 4 cols each | 1 across |
| Notes feed | cards on 4–9 | cards on 1–7 | 1–4 |
| Form card | 4–9 (or 1–6 beside text on 7–12) | 1–7 | 1–4 |
| Footer | statement 1–4; groups 5–12 | statement 1–6; 4 groups | 2 groups per row |

### 6.2 Pages

- **Home:** Nav · Hero (name, role, one-sentence lede, "Selected work" + "Writing") · Facts (role, years, focus, writing) · Section "Selected work" + 3 link cards · Section "Recent notes" + 2–3 post cards · Footer.
- **Work index:** Nav · Section header · link cards, numbered `01 / 0N`, newest or most significant first · Footer.
- **Case study:** Nav · FullBleed cover · Facts (role, team, duration, stack, impact) · Article (problem → constraints → approach → result → what I'd do differently) · next-project link card · Footer.
- **Writing index:** Nav · Section header · link cards (no images required) grouped by year · Footer.
- **Post:** Nav · Article · Aside "Related" with 2 link cards · Footer.
- **Notes:** Nav · feed of post cards in the text column · each note also lives alone at its permalink and at its embed URL (see Card).
- **About / Contact:** Nav · Article · form card · Footer.

## 7. Checks before shipping

- Check at 320, 375, 768, 1024, 1280 and 1920px, and at 200% text zoom.
- Turn on the grid overlay: every left edge on a column line, every baseline on the 8px rhythm.
- No element's width is a fraction of a column.
- At most one `signal` element per screen.
- Text meets 4.5:1 on its ground in both themes — including text over images (use the `scrim` or a band).
