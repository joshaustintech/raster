# Card

A square field that holds one self-contained thing — a note (microblog post), a form, or an entry in a work or writing index — and reflows to any width it is given, including someone else's page when a note is embedded.

## Anatomy

`.rs-card` (1px `line` border on `paper`; `--raised` for `paper-raised` with no border) > optional `.rs-card__media` > `.rs-card__body` (24px padding; 16px below 360px). The card is its own container: everything inside responds to the card's width, not the page's.

## Variants

**Post** — `article.rs-card.rs-post`
- `header.rs-post__head`: `.rs-avatar` (40px square, `fleece` monogram or photo), `.rs-post__who` (name + `@handle` in mono), and `a.rs-post__time` wrapping `<time datetime>` — the timestamp IS the permalink.
- `p.rs-post__text`: body 16/24, line breaks kept, long URLs wrap. `.rs-post--large` sets text-only notes under ~140 characters at 24/32.
- Optional `.rs-card__media` (Figure ratios) or a nested quoted note `.rs-card.rs-post__quote`.
- `footer.rs-post__actions`: text buttons, each at least 44px tall, counts in mono. Toggles use `aria-pressed`; Share and Embed sit at the right edge (they wrap under narrow widths rather than hide).
- `.rs-post__panel` (toggled with `aria-expanded` / `aria-controls`): the embed code with "Copy code" and "Copy link".
- Consumer provides: id, author, handle, avatar, ISO timestamp, text, media with alt text, counts, and the share/embed behaviour (see below).

**Form** — `section.rs-card.rs-card--raised` > `.rs-card__head` + `form.rs-form`
- `.rs-field` = `label.rs-label` + `.rs-input` / `.rs-textarea` / `.rs-select` + optional `.rs-help` / `.rs-error`. Inputs are 48px tall at 16px text (no zoom-on-focus on phones), square, bordered in `rule`, focus ring `focus`.
- `.rs-form__row--2` puts two short fields side by side when the card is ≥480px; below that they stack.
- Errors: `aria-invalid="true"`, a `clay` border, and a message starting "Error:" linked by `aria-describedby`. Never colour alone.
- Mark optional fields "(optional)", not required ones with asterisks. `.rs-check` gives checkboxes a 44px row. `.rs-form__foot` holds a reassurance line and the submit button (full width below 360px).

**Link** — `article.rs-card.rs-card--link`
- Index entry for work or writing: optional media, mono kicker (`Work · 01 / 04`), title containing `a.rs-card__link` (stretched over the whole card), one-sentence summary, mono meta (date, stack, reading time).
- Hover darkens the border to `ink` and underlines the title; keyboard focus outlines the whole card.

## Sharing and embedding notes

1. **Permalink.** Every note has a stable URL (`/notes/<id>`) rendering the card alone, inside `.rs-c`, with Nav and Footer.
2. **Share.** The Share button calls `navigator.share({ title, text, url })` where available and otherwise copies the permalink, confirming in place ("Link copied") for two seconds.
3. **Social preview.** The permalink carries `og:title` (author + first 60 characters), `og:description` (the text), and an `og:image` 1200×630 rendered from the card itself on `paper`, so links unfurl in the system's own type.
4. **Embed.** `/notes/<id>/embed` serves only the card with `.rs-embed` (240–560px wide), `data-theme` from `?theme=light|dark` (default: the viewer's `prefers-color-scheme`), and posts its height to the parent (`postMessage({ type: "rs:embed-height", height })`) so the host can resize the iframe. The embed code is an `<iframe>` with `title`, `loading="lazy"` and `max-width:560px`.
5. **Fallback.** Offer a plain alternative too: `<blockquote class="rs-embed" cite="<permalink>">` with the text, author and a dated link — readable with no CSS and no script.
6. **Microformats.** Mark notes up as `h-entry` (`p-author h-card`, `e-content`, `dt-published`, `u-url`) so they syndicate cleanly to the fediverse and feed readers.

## Placement

- Feed: cards on the text column (`.rs-feed`: columns 4–9 at ≥1024, 1–7 at 640–1023, full width below), 24px apart.
- Index: `.rs-cols.rs-card-grid` — three across at ≥1024, two at 640–1023, one below.
- Form: columns 4–9, or 1–6 beside explanatory text on 7–12.
- Cards never nest more than one level (a quoted note inside a note), never carry shadows, and never round their corners.
