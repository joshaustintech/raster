# Article

Long-form reading layout for blog posts and case studies: a header (eyebrow, title, lede, meta) and a text column with figures, code, quotes and margin asides placed on the grid.

- Markup: `article.rs-article` > `.rs-wrap` > `header.rs-cols > .rs-article__head` and `.rs-cols.rs-article__body` whose direct children are `p`, `h2`, `pre` (code, 7 columns wide, scrolls sideways inside itself — never the page), `.rs-figure` (`--wide` / `--full`), `.rs-quote` and `.rs-aside`. Consumer provides the content; the layout is automatic from element order.
- ≥1024px: text on columns 4–9 (left 3 columns empty for tension), asides in the margin (10–12), wide figures 4–12, full figures 1–12, quotes 3–10.
- 640–1023px: text on columns 1–7 of 8; figures and quotes full width; asides inline.
- <640px: one 4-column flow; everything full width.
- Measure is capped at 66ch at every size; body never drops below 16px; paragraphs separated by one line (24px), headings by two lines above.
