# FullBleed

A section whose photograph runs edge to edge behind the text, with the text held on the grid and made legible by a flat scrim or a solid paper band.

- Markup: `section.rs-bleed` > `img.rs-bleed__img` (with `alt`, `srcset`/`sizes`), `.rs-bleed__scrim`, `.rs-wrap.rs-cols` > `.rs-bleed__content`. Add `.rs-bleed--band` to drop the scrim and set the text on a `paper` field instead. Consumer provides the image, its focal point (`style="--focal: 70% 40%"`), heading, lede and one action.
- Legibility is guaranteed, not hoped for: the `scrim` (65% `night`) keeps `night-ink` text ≥4.5:1 over any pixel. Never lighten it or replace it with a gradient. If the photo matters more than the dimming allows, use the band variant.
- Height: `clamp(30rem, 85svh, 56rem)` — tall enough to read as a picture, never taller than the screen on phones. Text sits at the bottom, flush left: columns 1–8 at ≥1024, 1–7 at 640–1023, full width below.
- Choose crops that survive a 4:5 phone frame; set `--focal` so the subject stays in view.
- Maximum one per screen height; never stack two full-bleed sections.
