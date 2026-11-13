# Aside

A short note set beside or within the main text: a `rule` hairline, an eyebrow label and `body-sm` text; the `--field` variant sets it on `paper-raised` for a key point.

- Markup: `aside.rs-aside` (or `.rs-aside--field`) > `.rs-eyebrow` label + `p`. Consumer provides label ("Note", "Source", "Key point") and text.
- In an Article at ≥1024px, an aside placed right after a paragraph hangs in the margin (columns 10–12) on that paragraph's line. Below 1024 it falls into the text column where it appears.
- Under 60 words, so a margin note never pushes the next paragraph down.
- At most one `--field` aside per section. It is not a warning box: errors use `clay` with a word.
