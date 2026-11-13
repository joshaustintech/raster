# 12. Notes JS: Share, Copy, Embed panel, embed height, theme param

Status: resolved
Blocked by: 11
Spec: ../spec.md

`notes.js` (Web Share with copy fallback, 'Link copied' 2 s with aria-live, Embed panel with aria-expanded and Escape), `embed.js` (`?theme=`, `postMessage rs:embed-height` via ResizeObserver). Buttons revealed by JS only. Test host page and docs snippet. < 5 KB gzip total.

**Done when:** embed in a test iframe resizes and themes; keyboard works.

## Answer

Added `assets/js/notes.js` and `assets/js/embed.js` (1.9 KB gzip total), loaded via `layouts/_partials/notes-js.html` (fingerprinted, deferred, no inline script) from the notes list, single and embed layouts only. `.rs-sr` live-region class added to `raster-extensions.css`; host snippet added to `docs/notes.md`. Verified in headless Chromium: buttons unhidden by JS, copy link (clipboard, "Link copied" for 2 s, aria-live), Embed toggles aria-expanded and Escape closes and refocuses, panel shows iframe and blockquote snippets, embed iframe applies `?theme=dark` and posts `rs:embed-height`. Not verified: navigator.share on a real device.
