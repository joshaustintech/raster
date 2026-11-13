# Raster

A Hugo theme for a portfolio ("Work"), long-form "Writing", short "Notes" and an About / Contact page. Flush-left, grid-based and quiet: built on the Raster design system (Müller-Brockmann-style baseline grid), with light and dark modes, self-hosted fonts and no third-party requests.

Live example: the `exampleSite/` in this repo (fictional content). Screenshots are not yet included.

## Features

- Work case studies, Writing with year grouping and related posts, Notes (microblog), About with a contact form.
- Notes you can share and embed: permalink, `/notes/<id>/embed/` iframe route, Share / Copy / Embed buttons, generated 1200x630 Open Graph images, RSS, Atom and JSON Feed.
- Auto / light / dark with a footer toggle; no flash on load.
- Markdown lands on the grid: images become figures, quotes and alerts are styled, code is highlighted.
- Responsive from 320px, container-query components, no horizontal scroll.
- Open Graph, Twitter card, JSON-LD, sitemap and robots.txt.
- Inter Tight and IBM Plex Mono self-hosted (OFL). No trackers, no third-party requests, no Node needed.

## Quick start (about 5 minutes)

Needs Hugo 0.169.0 or later, and Go for the module route. Full details in [docs/installation.md](docs/installation.md).

### Hugo Module

```sh
hugo new site mysite && cd mysite
hugo mod init example.org/mysite
```

Copy the [minimal `hugo.toml`](docs/installation.md#minimal-hugotoml) over the generated one (it imports `github.com/joshaustintech/raster`), then:

```sh
hugo mod get github.com/joshaustintech/raster
hugo new notes/hello/index.md
hugo server
```

### Git submodule

```sh
hugo new site mysite && cd mysite && git init
git submodule add https://github.com/joshaustintech/raster themes/raster
```

Copy the same `hugo.toml`, delete its `[module]` block and add `theme = "raster"` as the first line. Then `hugo new notes/hello/index.md` and `hugo server`.

### Important

Hugo does not merge a theme's configuration into your site. The markup, `outputFormats` and `outputs` blocks in the minimal `hugo.toml` are required, and each note needs `outputs: [html, embed]` (the `notes` archetype adds it). Add `content/_index.md`, `content/work/_index.md`, `content/writing/_index.md` and `content/notes/_index.md` (with `outputs: [html, rss, atom]`). Then edit `params` to make it yours.

### Try the example site

```sh
git clone https://github.com/joshaustintech/raster
cd raster/exampleSite && hugo server
```

## Documentation

[Installation](docs/installation.md) · [Configuration](docs/configuration.md) · [Content](docs/content.md) · [Components](docs/components.md) · [Notes](docs/notes.md) · [Contact form](docs/contact-form.md) · [Customisation](docs/customisation.md) · [Deployment](docs/deployment.md) · [Accessibility and performance](docs/accessibility-and-performance.md) · [Architecture](docs/architecture.md) · [Upgrading](docs/upgrading.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md) · [Glossary](GLOSSARY.md) · [Decisions](docs/adr/)

## Licence

MIT for code ([LICENSE](LICENSE)). Fonts are under the SIL Open Font License; licences are in `design-system/fonts/`.
