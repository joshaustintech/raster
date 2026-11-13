# SectionHeader

A numbered section opener: an oversized `olive` numeral hanging in columns 1–2, with eyebrow, headline and body text on columns 4–9.

- Markup: `section.rs-cols.rs-section` (inside `.rs-wrap`, inside `.rs-c`) > `.rs-section__index` (`.rs-section__num` + `.rs-mono` counter) and `.rs-section__body` (`.rs-eyebrow`, `h2.rs-t-headline.rs-section__title`, `.rs-section__text`). Consumer provides number, total, label, heading and text.
- Numbers are two digits (`01`), counted per page, with the total (`01 / 04`).
- The empty column 3 is intentional — it is the tension in an asymmetric layout. Do not fill it.
- Responsive: numeral 64 → 88 → 120px. ≥1024 index on columns 1–2, body 4–9; 640–1023 index 1–2, body 3–8; below 640 the numeral stacks above the body.
