# 08. Render hooks, shortcodes, Chroma classes, archetypes

Status: resolved
Blocked by: 06
Spec: ../spec.md

Image→Figure hook (warn on missing alt), blockquote→Quote, alert blockquote→Aside, codeblock with Chroma class output coloured from tokens in extensions CSS (no signal, no inline styles). Shortcodes: figure, quote, aside, spec, button, card. Archetypes for work/writing/notes.

**Done when:** a plain Markdown file with image, quote, `> [!NOTE]`, code, list and table lands correctly on the Article grid.

## Answer

Added `layouts/_markup/` hooks (image to figure partial with warnf on missing alt/src, blockquote to quote, alert blockquote to aside, codeblock emitting `<pre class="chroma">` with Chroma classes), shortcodes figure/quote/aside/spec/button/card, archetypes work/writing/notes, and Chroma token colours in `raster-extensions.css`. Theme-level markup config is not merged from a module, so consuming sites must set `markup.goldmark.parser.wrapStandAloneImageWithinParagraph = false` and `markup.highlight.noClasses = false` (done in `exampleSite/hugo.toml`).
