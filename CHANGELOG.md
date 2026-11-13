# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/). Renaming or removing a design token or an `rs-*` class is a major change.

## [Unreleased]

### Changed

- Documentation set added (README, `docs/`, CONTRIBUTING, GLOSSARY).
- `design-system/IMPLEMENTING.md`: filled in the target framework (Hugo, min 0.158.0) and corrected references to `components/bundle.css` to the real file, `css/raster.css`. Small edit to a design-system file; flagged for the design-system owner.

## [1.0.0] - Unreleased

First release of the Raster Hugo theme.

### Added

- Hugo theme (min Hugo 0.158.0) built on the Raster design system: Work, Writing, Notes, About and Contact pages, 404, and a development-only `/styleguide/`.
- All Raster components as partials, with shortcodes `figure`, `quote`, `aside`, `button`, `card`, `spec` and render hooks for images, blockquotes and code.
- Notes with permalinks, embed output (`/notes/<id>/embed/`), Share / Copy / Embed, generated 1200x630 Open Graph images, `h-entry` microformats.
- RSS, Atom (notes) and JSON Feed, sitemap, `robots.txt`, Open Graph, Twitter card, JSON-LD.
- Auto / light / dark theme toggle with `prefers-color-scheme` default.
- Contact form card (mailto by default, optional hosted endpoint).
- Self-hosted Inter Tight and IBM Plex Mono with OFL licences; no third-party requests.
- Example site with fictional content and imagery.
- Contributor tooling: token build, component parity script.
