# 14. Feeds: RSS, Atom for notes, optional JSON Feed

Status: resolved
Blocked by: 11
Spec: ../spec.md

Site and section RSS, Atom output format for notes, alternate links in head.

**Done when:** feeds validate.

## Answer

RSS built in for site and sections; Atom for notes (`layouts/notes/list.atom.xml`); JSON Feed at `/feed.json`; alternates via `layouts/_partials/head/feeds.html`. Output formats in `exampleSite/hugo.toml`; documented in `docs/notes.md`. All XML passes xmllint, JSON parses.
