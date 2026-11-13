# 09. Pages: Home, Work index, Case study

Status: resolved
Blocked by: 05, 06, 08
Spec: ../spec.md

Per Grid.md §6.2. `featured` flag, `NN / NN` numbering, `facts` front matter, cover → FullBleed, next-project card (`.NextInSection` or `next:`).

**Done when:** matches §6.1 band spans at 4/8/12 columns.

## Answer

Added `layouts/home.html`, `layouts/work/{list,single}.html` and a `work-cards.html` partial (link-card grid with `NN / NN` numbering from the full weight-ordered list). Home: Hero, facts, "Selected work" (first 3 `featured: true`), "Recent notes" (only if notes exist). Case study: FullBleed cover (h1, `cover: {image, alt, focal}`), SpecList from `facts`, body in `.rs-article__body` (no second h1), next-project card via `next:` override else the next page in section order (wrapping). Minimal fictional content in `exampleSite/content/{_index.md,work/*}`; no cover images yet (FullBleed placeholder), issue 19 adds them. Site builds with no warnings.
