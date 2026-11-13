# Footer

The page's closing field on `night` (dark in both themes): a one-line statement, up to four link groups and a mono legal line.

- Markup: `footer.rs-footer` > `.rs-wrap` > `.rs-cols.rs-footer__grid` (`.rs-footer__statement` + up to four `nav.rs-footer__group` with `h3` + `ul`), then `.rs-footer__legal`. Consumer provides statement, groups, links and legal text.
- ≥1024px: statement on columns 1–4, groups two columns each on 5–12.
- 640–1023px: statement on 6 of 8 columns, then four groups across.
- <640px: statement full width, groups two per row.
- Link rows are 44px tall (touch-safe at every size). Group labels in `night-muted`; links in `night-ink`; focus ring `signal`.
