# Glossary

Terms used in this repository. Use these words in code, docs and issues.

**Raster**
The design system in `design-system/` (tokens, CSS, reference markup, component READMEs) and, by extension, the Hugo theme built on it. The "design system" is the source; the "theme" is the Hugo packaging.

**Field**
A block of grid columns by rows (*Rasterfeld*). Row height is `grid-field` = 64px = 8 baselines, separated by a gutter. Images and cards span whole fields. Also loosely, "secondary field" is the `paper-raised` tone. Say "form field" or "input" for form controls.

**Band**
A full-width horizontal region with its own ground; pages stack bands top to bottom (Nav, Hero, SpecList, SectionHeader + Cards, FullBleed, Article, Footer). Content inside a band sits in `.rs-wrap.rs-cols`.

**Note**
A short microblog entry. A page bundle at `content/notes/<id>/index.md` with a permalink, an embed route and no visible title. Not the Aside ("Note" is also an Aside's default label).

**Embed**
Two related things: the embed route `/notes/<id>/embed/` (a card only, noindex) and the iframe snippet that visitors copy to place it on another site. Sized by `embed.js` via `postMessage` (`rs:embed-height`).

**Signal**
The single chartreuse accent colour. At most one signal element per view.

**Baseline**
The 8px grid unit (`grid-baseline`) from which the grid is derived: every line height is a multiple of 8px and text sits on it.

**Component**
One of the 12 Raster pieces (Nav, Hero, SpecList, SectionHeader, FullBleed, Figure, Quote, Aside, Article, Card, Footer, Button), each a partial in the theme.

**Reference**
`design-system/reference/<Name>.html`: the ground truth for a component's markup.

**Token**
A named design value in `tokens.json`, emitted as a CSS custom property in `tokens.css`.

**Parity**
The check that a styleguide fragment rendered by the theme has the same structure and classes as the matching reference.

**Styleguide**
The development-only `/styleguide/` page in the example site rendering every component.
