# 18. Accessibility and performance pass

Status: resolved
Blocked by: 09, 10, 11, 15, 17
Spec: ../spec.md

Keyboard pass (menu, Embed, toggle), 200% zoom, 320 px no horizontal scroll, image lazy/decoding, print stylesheet, signal-per-view lint.

**Done when:** Lighthouse a11y ≥ 95, axe clean, no console errors.

## Answer

Done. Details, results and caveats in `docs/accessibility-and-performance.md`.

- Checks added: `scripts/a11y/check.mjs` (axe, console, third-party requests, 320px, signal count, inline styles; 12 pages x 3 widths x 2 themes) and `scripts/a11y/keyboard.mjs` (focus rings, 44px targets, menu/toggle/Embed by keyboard, 200%/400% zoom overflow, image attributes).
- Results: axe 0 violations (one documented `landmark-unique` exception for unlabeled asides), no console errors, no third-party requests, no overflow at 320/640px, Lighthouse a11y 98-100 (100 after fixes), vnu 0 errors, parity matches all 12 references.
- Fixed: missing page canvas (dark mode on white), 44px targets (footer toggle, buttons, nav, pager, note time), SVG-safe figure/hero/card/og-image, notes and embed landmarks/h1, work index h1, footer heading order, favicon 404, pager and term page styling, 320px overflow on a note page.
- Not verified: screen readers, forced-colours, real devices, mobile-throttled Lighthouse, a deployed site.
