# Notes

Notes are page bundles: `content/notes/<id>/index.md`. The body is the note text; optional params `author`, `handle`, `media`.

Theme config is not merged into consuming sites, so the site must declare the embed output format in its `hugo.toml`:

```toml
[outputFormats.embed]
  mediaType = "text/html"
  baseName = "embed/index"
  notAlternative = true
  isHTML = true
```

Hugo's `path` option prefixes the whole URL (`/embed/notes/<id>/`), so `baseName = "embed/index"` is used to get `/notes/<id>/embed/`.

Each note opts in via front matter, because `cascade` cannot set `outputs`:

```yaml
outputs: [html, embed]
```

Routes: `/notes/` (feed, paginated), `/notes/<id>/` (card, Nav, Footer, plain blockquote snippet), `/notes/<id>/embed/` (card only, noindex). `notes.js`/`embed.js` (issue 12) enhance Share/Copy/Embed and resize.
