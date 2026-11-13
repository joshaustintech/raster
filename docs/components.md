# Components

Raster has 12 components. Most are used for you by the page layouts; the ones authors use directly are available as shortcodes. Markup for every component is defined by `design-system/reference/<Name>.html` and each component has a README in `design-system/components/<Name>/`.

The example site's `/styleguide/` renders every component from the real partials (run `hugo server` in `exampleSite/` and open `/styleguide/`).

## Shortcodes

### figure

```text
{{< figure src="img/diagram-flow.png" alt="Three boxes joined by lines" caption="A diagram." ratio="16x9" width="wide" num="Fig. 01" >}}
```

| Argument | Notes |
| --- | --- |
| `src` | Required. Page resource or `assets/` path. |
| `alt` | Required (build warning if missing). |
| `ratio` | `1x1`, `4x3`, `3x2` (default), `16x9`, `21x9`. |
| `width` | `wide` or `full`; default is the text column. |
| `caption`, `num` | Caption (inline Markdown) and mono label. |
| `eager` | `true` for above-the-fold images (sets `fetchpriority=high`, skips lazy loading). |

### quote

```text
{{< quote who="Reviewer" source="Fictional, 2026" >}}Short quote text.{{< /quote >}}
```

Also `{{< quote text="..." >}}`. `who` becomes the eyebrow, `source` the small line.

### aside

```text
{{< aside label="Source" >}}Under sixty words, so a margin note never pushes text down.{{< /aside >}}
```

`label` defaults to `Note`. `field="true"` selects the raised `--field` variant (at most one per section).

### button

```text
{{< button label="Read more" href="/work/" variant="secondary" arrow="true" >}}
```

Variants: `primary` (default), `secondary`, `signal`, `text`. Use at most one `signal` element per view.

### card

```text
{{< card path="/work/billing" kicker="Work" index=1 total=4 summary="Optional" >}}
```

A link card to another page. `index`/`total` render `01 / 04`. Logs a warning if the page does not exist.

### spec

```text
{{< spec "Role" "Lead designer" >}}
```

One SpecList row per call. For groups prefer `facts:` front matter.

## Partials (for layout overrides)

| Partial | Inputs |
| --- | --- |
| `nav.html` | page; `menus.main`, `params.nav` |
| `hero.html` | page; `hero:` front matter |
| `speclist.html` | slice of `{label, value}` |
| `section.html` | dict `num`, `total`, `eyebrow`, `title`, `intro` (SectionHeader) |
| `fullbleed.html` | dict `image`, `alt`, `eyebrow`, `title`, `lede`, `action`, `focal`, `band`, `heading` |
| `figure.html`, `quote.html`, `aside.html`, `button.html` | as the shortcodes above |
| `article.html` | page |
| `card-post.html` | dict `page`, `large` (note card) |
| `card-link.html` | dict `page`, `kicker`, `index`, `total`, `summary`, `meta`, `image`, `alt`, `heading` |
| `card-form.html` | page; `params.contact` |
| `footer.html` | `menus.footer`, `params.footer` |
| `pager.html` | a Hugo Pager |

Component READMEs: [Nav](../design-system/components/Nav/README.md), [Hero](../design-system/components/Hero/README.md), [SpecList](../design-system/components/SpecList/README.md), [SectionHeader](../design-system/components/SectionHeader/README.md), [FullBleed](../design-system/components/FullBleed/README.md), [Figure](../design-system/components/Figure/README.md), [Quote](../design-system/components/Quote/README.md), [Aside](../design-system/components/Aside/README.md), [Article](../design-system/components/Article/README.md), [Card](../design-system/components/Card/README.md), [Footer](../design-system/components/Footer/README.md), [Button](../design-system/components/Button/README.md).

Related: [Notes](notes.md), [Contact form](contact-form.md).
