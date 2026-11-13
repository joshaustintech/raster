# Figure

An image (or video) cut to a fixed ratio and spanning whole grid columns, with an optional numbered caption beneath.

- Markup: `figure.rs-figure.rs-figure--<ratio>` > `img` + `figcaption` (`.rs-mono` number, then text). Ratios: `1x1`, `4x3`, `3x2` (default), `16x9`, `21x9` (falls back to 16:9 below 640px). `.rs-ph` is the placeholder for missing imagery. Consumer provides `src`, `srcset`/`sizes`, `alt` and caption.
- Width = whole columns plus the gutters between them; the ratio sets the height. Never set a pixel height.
- Corners square, no borders, no shadows. Images and text share top lines.
- Captions are `small` in `ink-muted`, numbered `Fig. 01`. Alt text describes content; captions add context — don't repeat one in the other.
- Always set `width`/`height` attributes (or the ratio) so layout doesn't shift while images load; lazy-load anything below the first screen.
