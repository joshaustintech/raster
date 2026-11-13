# 13. Notes OG images with images.Text

Status: resolved
Blocked by: 03, 11
Spec: ../spec.md

Partial rendering 1200×630 `paper` canvas with author + manually wrapped text; front-matter `image:` override; fallback default for unsupported glyphs. og:* and twitter tags on notes.

**Done when:** every note has a 1200×630 og:image; ADR-0002 limits documented.

## Answer

`layouts/_partials/og-image.html` renders a 1200x630 paper canvas (1x1 base64 PNG resized) with the author (Plex Mono Medium) and note text wrapped at 36 chars per line, max 6 lines, one `images.Text` per line (Inter Tight variable TTF, default weight). Output: `/og/<note>.png`. `layouts/_partials/head/og-note.html` emits og:image, width, height and twitter:image for notes.

ADR-0002 limits: no true bold (variable TTF, default instance); wrapping is by char count, not metrics; non-ASCII/emoji text falls back to a default card (site title + author); front matter `image:` overrides (page resource or assets path). twitter:card comes from seo.html (currently `summary`; set it to `summary_large_image` for notes there).
