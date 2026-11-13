# Raster

Raster is the design system for a senior software engineer's professional site: a portfolio of selected work, a long-form blog, and a stream of short notes that can be shared and embedded anywhere. It borrows the composure of Anduril's product pages — one oversized grotesque headline, numbered sections, terse fact lists, a single acid highlight — and disciplines it with the International Typographic Style: an objective grid, flush-left type, and nothing ornamental. The palette is Silicon Valley casual: oat, charcoal, vest-navy, waxed-canvas olive, and one chartreuse note.

The site should read the way good engineering reads: clear, specific, and confident without raising its voice.

*Raster* is the German word Müller-Brockmann used for the grid. Layout and responsive rules live in the **Grid** section of this book.

## Principles

1. **The grid decides.** Every element starts and ends on a column edge and a baseline. If it does not fit the grid, change the content, not the grid.
2. **Objective, not expressive.** Information is ranked by size, weight and position — never by decoration. No shadows, gradients, rounded cards or icons-for-mood.
3. **One loud thing.** Each view gets at most one `signal` element. Everything else is ink, paper and two quiet hues.
4. **Flush left, ragged right.** Never centred, never justified.
5. **Evidence over adjectives.** Metrics, dates, stacks and versions are set in mono at the same weight as prose. "p99 41 ms → 6 ms" says more than "dramatically faster".

## The site

| Area | Purpose | Built from |
| --- | --- | --- |
| **Home** | Who you are and what you do, in one screen | Nav · Hero · SpecList · SectionHeader + Card (link) · Footer |
| **Work** | Selected projects as case studies | SectionHeader + Card (link) index; each case study: FullBleed · SpecList · Article |
| **Writing** | Long-form posts | Card (link) index; each post: Article with Figure, Quote, Aside, code |
| **Notes** | Short posts, sharable and embeddable | Card (post) feed; each note has its own permalink and embed |
| **About / Contact** | Background, résumé, a way to reach you | Article · Card (form) |

## Content fundamentals

- **Voice:** first person, declarative, specific. Lead with the problem and the result; name the trade-offs. No exclamation marks, no "passionate", "rockstar" or "ninja", no superlatives without a number behind them.
- **Case:** Sentence case for headings and buttons (`Read the case study`). UPPERCASE only for `eyebrow` labels.
- **Numbering:** Selected work and post series are numbered `01`–`99` with a total (`01 / 04`) in `mono-label`.
- **Facts:** label (eyebrow, ink) over value (small or mono-data, ink-muted): `Role`, `Team`, `Duration`, `Stack`, `Impact`. Units after a thin space: `6 ms`, `2 B jobs / day`.
- **Dates:** `13 Nov 2026` in full contexts, `Nov 2026` in lists, relative (`3h`) only inside notes, always with a machine-readable `<time datetime>`.
- **Code:** in `mono` on `paper-raised`; inline code at 0.875em. Never screenshots of code.
- **Example:**

  > SELECTED WORK
  > **Rebuilding the job queue**
  > Moved two billion jobs a day off a hand-rolled broker onto Postgres, with no downtime and a sixth of the p99 latency.

## Visual foundations

### Colour

| Token | Role | Rule |
| --- | --- | --- |
| `paper` / `paper-raised` | Ground and secondary field | Fields are separated by tone or a `line` rule, never by shadow. |
| `ink` / `ink-soft` / `ink-muted` | Text hierarchy | Three steps only. All ≥4.5:1 on both grounds in both themes. |
| `fleece` | Brand primary | Primary button, links, avatar ground, light-theme focus. Text on it: `fleece-ink`. |
| `olive` | Secondary hue | Section numerals, tags, chart series 2. |
| `signal` | The highlight | A ground only, with `signal-ink`. One per view. Fails as text on light paper — never use it that way. |
| `clay` | Error / destructive | Always with a word ("Error:") or icon. |
| `line` / `rule` | Hairlines / control borders | `line` is decorative; `rule` (3:1) bounds inputs and controls. |

Distinguishable pairs (`fleece` vs `olive`, `ink` vs `ink-muted`) differ in lightness, not just hue. Proportion on a typical page: ~80% paper, ~15% ink, ~5% fleece/olive, a single signal block.

### Typography

One grotesque family — **Inter Tight**, the free stand-in for the Helvetica Now Display the reference pages use — plus **IBM Plex Mono** for data and code. Both from Google Fonts.

- Sizes follow a stepped scale (11 · 13 · 14 · 16 · 22 · 32 · 56 · 88 · 128), and **every line height is a multiple of 8px** so all type sits on the baseline grid.
- Display sizes track negative (`-0.02em` to `-0.025em`); labels track positive (`+0.04` to `+0.06em`).
- Contrast comes from size jumps, not from many weights: 300 (numerals), 400 (text), 500 (headline), 600 (eyebrow, names), 700 (display).
- Measure: 45–70 characters for `body`; `lede` spans at most 4 of 12 columns.

### Imagery

Diagrams, architecture sketches, real screenshots of shipped work and a single honest portrait. Images are rectangles spanning whole grid fields; their edges align with type edges. No rounded corners, no drop shadows, no duotone, no stock photos of laptops. When text sits on a photograph, it sits on a flat 65% `scrim` or a solid `paper` band — never on the bare image.

### Iconography

Minimal and linear: 1.5px strokes on a 24px box, square caps, drawn in `ink`. Icons label actions; they never decorate. No icon set ships yet — note actions use text labels ("Reply", "Share", "Embed") until one is supplied. No logo ships either; the name is set in `display` type, and the avatar is a square `fleece` monogram or photo.

### Motion

Short (120–200ms), linear or ease-out, opacity and position only. Nothing bounces.

## Using the tokens

- Vertical rhythm: `space-*` (multiples of `grid-baseline`).
- Layout: `grid-columns`, `grid-gutter`, `grid-margin`, `grid-field`.
- Corners: `radius-0` everywhere; `radius-full` only for status dots.
- Text on photographs: `night-ink` over the `scrim`, or the text on a `paper` band. Fixed-dark grounds (footer): `night`, `night-ink`, `night-muted`.
- Component classes (`rs-*`) live in `css/raster.css`; they are plain CSS with no script. Put `.rs-c` on the page root so components can size to their container.

## Building a page

Bands stack top to bottom, each full width with its own ground: **Nav → Hero → SpecList → SectionHeader + Cards → FullBleed → Article → Footer**. Inside each band, content sits in `.rs-wrap.rs-cols` on the grid. Long-form content uses **Article**, which places **Figure**, **Quote**, **Aside** and code automatically. **Card** carries notes, forms and index entries, and sizes itself to whatever column it is placed in — including someone else's page, when a note is embedded. How each band reflows from 4 to 8 to 12 columns is set out in **Grid · Responsive rules**.
