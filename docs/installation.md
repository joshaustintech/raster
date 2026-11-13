# Installation

## Requirements

- Hugo **0.169.0 or later** (standard edition is enough; the extended edition is not needed). Check with `hugo version`.
- **Git**, for the submodule route.
- **Go**, for the Hugo Module route only (Hugo shells out to `go`). Install from <https://go.dev/dl/>.
- No Node, npm or build step. Node is used only by contributors (see [CONTRIBUTING](../CONTRIBUTING.md)).

## Choose a method

| Method | Needs Go | Upgrades | Use when |
| --- | --- | --- | --- |
| Hugo Module | yes | `hugo mod get -u` | You want versioned, one-command upgrades. |
| Git submodule | no | `git submodule update --remote` | You cannot install Go, or want the source vendored. |
| Download / copy | no | manual | You want a frozen copy. Unpack into `themes/raster`. |

### Hugo Module

```sh
hugo new site mysite && cd mysite
hugo mod init example.org/mysite       # any module path you like
```

Add the import to `hugo.toml` (see the full file below), then:

```sh
hugo mod get github.com/joshaustintech/raster
hugo server
```

To use a local checkout instead of the published module, add a replacement. Paths are resolved **relative to `themesDir`** (default `themes/`), not relative to the site root, so a checkout next to the site is `../../raster`; an absolute path also works:

```toml
[module]
  replacements = "github.com/joshaustintech/raster -> ../../raster"
```

### Git submodule

```sh
hugo new site mysite && cd mysite
git init
git submodule add https://github.com/joshaustintech/raster themes/raster
```

Then set `theme = "raster"` at the top of `hugo.toml` (and omit the `[module]` block). The theme's own `hugo.toml` supplies the mounts for CSS, fonts, JS and layouts.

## Minimal `hugo.toml`

Hugo does **not** merge a theme's configuration into your site, apart from module mounts. The blocks marked required below must be in your own `hugo.toml`; without them images, code blocks, notes embeds or feeds will be wrong. This file was built and tested with Hugo 0.169.

```toml
baseURL = "https://example.org/"      # set this to your real URL
title = "My site"
locale = "en"
enableRobotsTXT = true
disableKinds = ["taxonomy", "term"]   # recommended, see "Taxonomies" below

# Module route. For a submodule, delete this block and add: theme = "raster"
[module]
  [[module.imports]]
    path = "github.com/joshaustintech/raster"

[params]
  description = "What this site is about."
  [params.author]
    name = "Your Name"
    handle = "@you"
    email = "you@example.org"
  [params.nav]
    mark = "Your Name"
  [params.nav.cta]
    label = "Contact"
    url = "/about/"
  [params.footer]
    statement = "One line about you."

[menus]
  [[menus.main]]
    name = "Work"
    url = "/work/"
    weight = 1
  [[menus.main]]
    name = "Writing"
    url = "/writing/"
    weight = 2
  [[menus.main]]
    name = "Notes"
    url = "/notes/"
    weight = 3
  # Footer: a parent entry is a column heading, its children are the links.
  [[menus.footer]]
    name = "Site"
    identifier = "f-site"
    weight = 1
  [[menus.footer]]
    name = "Work"
    parent = "f-site"
    url = "/work/"
    weight = 1
  [[menus.footer]]
    name = "Notes"
    parent = "f-site"
    url = "/notes/"
    weight = 2

# REQUIRED: figures and quotes are render hooks that need block-level images,
# and Chroma must emit classes (not inline styles) so code follows the theme colours.
[markup.goldmark.parser]
  wrapStandAloneImageWithinParagraph = false
[markup.highlight]
  noClasses = false

# REQUIRED for Notes: the embed output format (/notes/<id>/embed/).
[outputFormats.embed]
  mediaType = "text/html"
  baseName = "embed/index"
  notAlternative = true
  isHTML = true

# REQUIRED for feeds: Atom (notes) and JSON Feed (site).
[outputFormats.atom]
  mediaType = "application/atom+xml"
  baseName = "atom"
  isPlainText = true
[outputFormats.jsonfeed]
  mediaType = "application/feed+json"
  baseName = "feed"
[mediaTypes."application/feed+json"]
  suffixes = ["json"]
[mediaTypes."application/atom+xml"]
  suffixes = ["xml"]
[outputs]
  home = ["html", "rss", "jsonfeed"]
  section = ["html", "rss"]
```

Why each required block exists:

- `wrapStandAloneImageWithinParagraph = false`: otherwise Goldmark wraps images in `<p>` and the image render hook cannot emit a `<figure>` on the grid.
- `noClasses = false`: the code block hook outputs Chroma class names; the theme's CSS styles them.
- `embed` format: `baseName = "embed/index"` yields `/notes/<id>/embed/`. Hugo's `path` option would prefix the whole URL instead.
- `atom` needs `isPlainText = true`, otherwise Hugo HTML-escapes the XML declaration.

### Minimum content

```text
content/_index.md                # home: title, hero, facts
content/work/_index.md           # section pages
content/writing/_index.md
content/notes/_index.md          # must contain: outputs: [html, rss, atom]
content/notes/hello/index.md     # must contain: outputs: [html, embed]
content/about/index.md           # optional, renders the contact form
```

Use the archetypes (`hugo new notes/hello/index.md`, see [Content](content.md)) so the per-note `outputs` line is not forgotten. Hugo's `cascade` cannot set `outputs`, which is why each note carries it.

### Taxonomies

The theme shows `tags` as plain text on posts and does not link them. Hugo still generates `/tags/` and `/categories/` pages unless you disable them; the theme ships plain layouts for them (`layouts/taxonomy.html`, `layouts/term.html`), but they are not in the navigation. We recommend `disableKinds = ["taxonomy", "term"]` unless you want those pages. (This differs from the example site, which leaves them generated.)

## Run the example site

```sh
git clone https://github.com/joshaustintech/raster
cd raster/exampleSite
hugo server
```

`exampleSite/hugo.toml` replaces the module with `../..` and is the most complete, commented reference for every key. A development-only styleguide lives at `/styleguide/` (noindex, not in the nav, absent from the sitemap).

## Fonts

Inter Tight (variable) and IBM Plex Mono (400, 500) are bundled as self-hosted `.woff2` under `design-system/fonts/` with their SIL OFL licences, and mounted to `/fonts/`. The theme makes no third-party requests. For Open Graph images the theme uses TTF files in `assets/og/` (the Inter Tight variable TTF renders at its default weight; IBM Plex Mono Medium). If you need other scripts, see [Customisation](customisation.md#fonts-for-other-scripts).

## Next

[Configuration](configuration.md) · [Content](content.md) · [Deployment](deployment.md)
