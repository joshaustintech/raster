# Configuration

All theme options live under `[params]` in your `hugo.toml`. Everything is optional unless marked. `exampleSite/hugo.toml` demonstrates each key. Required non-param settings (markup, outputs) are in [Installation](installation.md#minimal-hugotoml).

## Site

| Key | Type | Default | Used for |
| --- | --- | --- | --- |
| `title` (top level) | string | none | Site name: `<title>`, nav mark fallback, Open Graph site name, JSON-LD. |
| `params.description` | string | empty | Meta description and Open Graph description of the home page, and fallback for pages without one. Truncated to 200 characters. |
| `params.author.name` | string | site title | Byline on notes, JSON-LD author, OG image author line. |
| `params.author.handle` | string | none | Shown beside the author on notes, for example `@avery`. |
| `params.author.email` | string | none | Default target of the contact form (`mailto:`). |
| `params.social` | array of `{name, url}` | none | Becomes `sameAs` in the home and post JSON-LD. Not rendered visibly. |

```toml
[[params.social]]
  name = "GitHub"
  url = "https://github.com/you"
```

## Nav

| Key | Type | Default | Notes |
| --- | --- | --- | --- |
| `params.nav.mark` | string | site title | Text of the home link at the left of the nav. |
| `params.nav.cta.label`, `.url` | string | none | Primary button. Omit to hide it. |
| `menus.main` | menu | none | Nav links. `name`, `url`, `weight`. The current section gets `aria-current`. |

The nav list is rendered twice (inline from 1024px, and in the Menu panel below that), by design.

## Hero (front matter, not params)

Pages that use the Hero (home, writing index, term pages; the Work index and case studies use their own `lede`, see Content) read `hero:` in front matter. The title is the page title.

```yaml
hero:
  eyebrow: Staff engineer
  lede: One sentence.
  actions:                      # first two only; first is primary, second secondary
    - {label: Selected work, url: /work/}
    - {label: Writing, url: /writing/, variant: text}
  image: img/me.jpg             # optional; page resource or assets path
  alt: "Describe it"
  ratio: 3x2                    # 1x1 | 4x3 | 3x2 | 16x9 | 21x9
```

## Footer

| Key | Type | Default |
| --- | --- | --- |
| `params.footer.statement` | string | none (not shown) |
| `params.footer.legal` | string | `© <year> <site title>` |
| `params.footer.legalExtra` | string | `Built on Raster · No trackers` (i18n key `legalExtra`) |
| `menus.footer` | menu | none |

Footer menu: top-level entries are column headings, entries with `parent = "<identifier>"` are the links. Entries without children are ignored.

## Theme toggle

There is no param. The footer always contains an auto / light / dark toggle button, hidden until `theme.js` runs; the choice is stored in `localStorage` and applied as `data-theme` before first paint (ADR-0004). Without JavaScript the OS `prefers-color-scheme` applies. Button labels come from `i18n/en.toml` (`theme`, `themeAuto`, `themeLight`, `themeDark`).

## Notes

| Key | Type | Default | Notes |
| --- | --- | --- | --- |
| `params.notes.replyTo` | string (URL) | none | Adds a Reply link to each note card, for example `mailto:you@example.org`. |

Per-note front matter is in [Content](content.md#notes); behaviour in [Notes](notes.md).

## Contact (About page form)

| Key | Type | Default |
| --- | --- | --- |
| `params.contact.action` | string (URL) | `mailto:<author.email>` |
| `params.contact.js` | bool | `true`; `false` skips `form.js` |
| `params.contact.eyebrow` | string | `Contact` |
| `params.contact.title` | string | `Start a conversation` |
| `params.contact.text` | string | none |
| `params.contact.help` | string | built-in help text |
| `params.contact.note` | string | none |
| `params.contact.submit` | string | `Send message` |
| `params.contact.company` | bool | shown; `false` hides the optional Company field |
| `params.contact.newsletter` | string | none; set to show a checkbox with this label |

Details and opt-in providers: [Contact form](contact-form.md).

## SEO

No params beyond `description`, `author`, `social` and the menu. The theme emits canonical, meta description, Open Graph (`og:*`), a Twitter `summary` card, `hreflang` for translations, JSON-LD (`WebSite` + `Person` on the home page, `BlogPosting` on writing and notes), `robots.txt` (allows all in production builds, `Disallow: /` otherwise) and the sitemap. Notes get a generated 1200x630 `og:image`. Per page, use front matter `description:` and `noindex: true`. Configure the sitemap with Hugo's own `[sitemap]` table.

## Taxonomies

Off by default as far as the theme is concerned (tags are shown as text only). Disable Hugo's generated pages with `disableKinds = ["taxonomy", "term"]`; see [Installation](installation.md#taxonomies).

## Language and strings

`locale` and `i18n/en.toml` supply UI strings (skip link, menu, theme labels, footer line). Override any key by adding the same file in your site's `i18n/`. Some labels (for example "Selected work", "Recent notes", "Newer", "Older", "Related") are currently literal English in the templates and need a layout override to change; see [Customisation](customisation.md).
