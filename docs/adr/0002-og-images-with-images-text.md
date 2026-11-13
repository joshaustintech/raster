# ADR-0002: Note OG images via Hugo `images.Text`

Status: accepted (2026-11-13)

Each note's 1200×630 `og:image` is rendered at build time with Hugo's `images.Text` on a `paper` canvas, with a per-note `image:` front-matter override and a default-image fallback.

**Why:** no Node or headless browser in the site owner's build. Cost: it only approximates the card (no wrapping, TTF/OTF only, static weights, limited Unicode), so lines are wrapped manually and static TTFs are bundled alongside the woff2 files.

**Consequences:** the OG URL contract is stable, so the renderer can later be swapped for a Playwright script without changing note URLs. Contradicts the Card README's "rendered from the card itself" only in fidelity.
