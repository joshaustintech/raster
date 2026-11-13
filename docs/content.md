# Content

Everything is Markdown with front matter. Create content with the archetypes so required keys are present:

```sh
hugo new work/my-project.md
hugo new writing/my-post.md
hugo new notes/my-note/index.md     # notes are page bundles
```

Archetypes ship in `archetypes/` (`work`, `writing`, `notes`, `default`) and create drafts (`draft: true`).

## Front matter reference

### Home (`content/_index.md`)

| Key | Notes |
| --- | --- |
| `title` | Hero heading. |
| `description` | Meta description of the page. |
| `hero.eyebrow`, `hero.lede`, `hero.actions[]`, `hero.image`, `hero.alt`, `hero.ratio` | See [Configuration](configuration.md#hero-front-matter-not-params). |
| `facts[]` | `{label, value}` rows shown as a SpecList under the hero. |

The home page lists up to three work pages with `featured: true` and the three newest notes.

### Work (`content/work/*.md`, case studies)

| Key | Type | Notes |
| --- | --- | --- |
| `title` | string | Required. |
| `description` / `lede` | string | Summary on cards and the case-study header (`lede` wins on the page). |
| `weight` | int | Order in the index and in the `01 / 04` numbering. |
| `featured` | bool | Show on the home page (first three). |
| `year` | int | Card meta. |
| `stack` | list | Card meta, joined with ` · `. |
| `eyebrow` | string | Default `Case study`. |
| `cover.image`, `cover.alt`, `cover.focal` | string | Full-bleed header image (page resource or `assets/` path), alt text, CSS focal point such as `50% 30%`. |
| `facts[]` | list | `{label, value}` SpecList (Role, Team, Duration...). |
| `next` | path | Next-project card; default is the next page in order, wrapping. |

`content/work/_index.md` takes `title`, `lede` (or `description`) and `eyebrow` for the index heading.

### Writing (`content/writing/*.md`)

| Key | Notes |
| --- | --- |
| `title`, `date` | Required. The index groups by year, newest first, paginated. |
| `description` | Card summary, meta description. |
| `lede` | Overrides `description` as the standfirst. |
| `eyebrow` | Default is the section name. Use `Series 02 / 03` for series numbering (by hand). |
| `tags` | Shown as text; also used by Hugo's related-content for the "Related" aside (up to two writing posts). |
| `readingTime` | Reading time is always computed by Hugo and shown as `N min read`. |

### Notes (`content/notes/<id>/index.md`)

| Key | Notes |
| --- | --- |
| `title` | Use the id (for example `first-light`); it is not shown as a heading. |
| `outputs` | **Must be `[html, embed]`**. The archetype sets it. |
| `date` | With time and zone, for ordering. |
| `author`, `handle` | Override `params.author`. |
| `media.src`, `media.alt`, `media.ratio` | Optional image (page resource in the bundle, or `assets/`). Alt text is required. Default ratio `16x9`. |
| `image` | Optional custom Open Graph image; otherwise one is generated. |
| `noindex` | Omit from search engines. |

The body is the note text. Notes under 140 characters render large. Details: [Notes](notes.md). `content/notes/_index.md` must have `outputs: [html, rss, atom]`.

### About (`content/about/index.md`)

Uses the Article layout plus the contact card. Keys: `title`, `lede`, `description`, `eyebrow`. Contact settings are in [Configuration](configuration.md#contact-about-page-form).

### Any page

`description`, `noindex: true` (adds `robots` noindex), `sitemap: {disable: true}`, `build: {list: never}` (as used by the styleguide).

## Page bundles and images

Put images next to the page (`content/work/billing/index.md` plus `cover.png`) or in `assets/img/`. Paths in `src`, `cover.image` and Markdown image syntax are looked up first as page resources, then in `assets/`. Raster images are converted to WebP and resized into a `srcset` (480 to 2400px, never upscaled); SVG and GIF are passed through. The example site keeps shared images in `exampleSite/assets/img/` and refers to them as `img/...`.

**Alt text is required.** The theme warns at build time (`figure: missing alt text`) if it is missing. A missing image renders a placeholder block and a warning, not an error. Use an empty `alt=""` only for purely decorative images.

## Writing Markdown that lands on the grid

You do not write grid classes. Render hooks and shortcodes emit the Raster markup:

| You write | You get |
| --- | --- |
| `![Alt text](img/x.png "Caption")` | `figure.rs-figure` with srcset; title becomes the caption; ratio `3x2`. |
| `{{< figure src="..." alt="..." ratio="16x9" width="wide" caption="..." num="Fig. 01" >}}` | Figure with ratio and optional wide/full width. |
| `> A quote` | `figure.rs-quote`. |
| `> [!NOTE]` / `> [!TIP]` ... (GitHub alert) | An Aside; title is the alert title. |
| `{{< quote who="Name" source="Where" >}}text{{< /quote >}}` | Quote with attribution. |
| `{{< aside label="Source" >}}text{{< /aside >}}` | Aside in the margin at 1024px and up. |
| fenced code with a language | Chroma-highlighted `pre.chroma` (focusable). Needs `noClasses = false`. |
| lists, tables, `##` headings | Placed on the text column automatically by the theme's extension CSS. |

Heading order: the page title is the only `h1`; write section headings as `##`.

See [Components](components.md) for all shortcode arguments.
