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

## Host snippet

Paste on any page; the iframe resizes itself and the optional `theme` query forces light or dark.

```html
<iframe id="note" src="https://example.com/notes/<id>/embed/?theme=dark" title="Note" width="100%" height="240" loading="lazy" style="border:0;max-width:560px"></iframe>
<script>
addEventListener("message", function (e) {
  if (e.data && e.data.type === "rs:embed-height" && e.source === document.getElementById("note").contentWindow)
    document.getElementById("note").height = e.data.height;
});
</script>
```

## Feeds

- RSS is built in: `/index.xml` (site) and `/<section>/index.xml` (each section, including `/notes/index.xml`).
- Notes also publish Atom at `/notes/atom.xml` (`layouts/notes/list.atom.xml`). A note has no title, so its first 80 characters stand in.
- The site publishes an optional JSON Feed 1.1 at `/feed.json` (`layouts/home.jsonfeed.json`, writing and notes, newest 50).
- `head/feeds.html` emits the `<link rel="alternate">` tags (the page's own feeds plus the site feeds).
- Theme config is not merged, so copy the `atom` and `jsonfeed` output formats, the two media types and the `[outputs]` block from `exampleSite/hugo.toml`. The atom format needs `isPlainText = true`, otherwise Hugo HTML-escapes the XML declaration. Opt the notes section in with `outputs: [html, rss, atom]` in `content/notes/_index.md`.

See also: [Installation](installation.md), [Content](content.md), [Configuration](configuration.md), [Deployment](deployment.md#headers-for-embeds).
