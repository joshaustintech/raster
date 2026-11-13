# GridSystem

The 12-column field grid with an 8px baseline overlay, for building and checking layouts; the full rules are in the Grid section.

- Layout markup: `.rs-c` on the page root, `.rs-wrap.rs-cols` for each band. `.rs-wrap` sets `--cols` (4 · 8 · 12), `--gutter` (16 · 24) and `--margin` (16 · 24 · 32 · 48) from the container width; `.rs-cols` lays children on that grid, full width by default.
- Overlay markup: `.rs-grid` with one `.rs-grid__col` per column and one `.rs-grid__baseline`, placed absolutely over a `.rs-wrap` in development only.
- Spans: give children `grid-column` per breakpoint with `@container (min-width: 640px | 1024px)`; never with viewport media queries, so a component behaves the same in a sidebar as on a page.
- Blocks and images span whole fields (columns × rows) including the gutters they cross.
- The overlay uses `color-mix()` for its tint; it is a development aid and need not support old browsers.
