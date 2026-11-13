# Hero

The page opener: eyebrow, the person's name (or the page name) at `display-xl`, a lede, up to two actions and an optional image field.

- Markup: `header.rs-hero` > `.rs-wrap.rs-cols.rs-hero__grid` with `.rs-hero__eyebrow`, `h1.rs-t-display-xl.rs-hero__title`, `.rs-t-lede.rs-hero__lede`, `.rs-actions.rs-hero__actions`, `figure.rs-figure.rs-hero__media`. Consumer provides name, role eyebrow, lede (≤ 25 words, first person), up to two actions and an image (portrait or shipped work) with alt text.
- ≥1024px: name across all 12 columns; lede and actions on columns 1–4; image on columns 6–12 from the lede's top line.
- 640–1023px: name steps to 80px, lede spans 6 of 8 columns, image full width below.
- <640px: everything stacks on 4 columns, name at 56px; keep names under ~10 characters per line or let them break onto two.
- One hero per page. For an image behind the name, use FullBleed instead.
