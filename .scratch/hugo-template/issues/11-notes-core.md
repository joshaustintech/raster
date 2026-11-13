# 11. Notes: feed, permalink, embed output format, h-entry

Status: resolved
Blocked by: 06, 08
Spec: ../spec.md

Notes as page bundles. Custom output format `embed` (path `embed`, baseName `index`), `single.embed.html`, `.rs-feed` list, h-entry microformats, blockquote fallback.

**Done when:** `/notes/<id>/` and `/notes/<id>/embed/` build; embed has only the card.

## Answer

Implemented layouts/notes/{list,single,single.embed}.html. Hugo `path` prefixes the whole URL (/embed/notes/id/), so the `embed` format uses `baseName = "embed/index"` to get /notes/id/embed/. `cascade` cannot set `outputs`, so each note has `outputs: [html, embed]`. Config lives in exampleSite/hugo.toml and is documented in docs/notes.md.
