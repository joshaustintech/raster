# 19. Example site content and imagery

Status: resolved
Blocked by: 09, 10, 11
Spec: ../spec.md

Fictional persona; 4 case studies, 6 posts over 2–3 years incl. a series, ~10 notes (large, media, quoted, long URL), About/Contact. Token-coloured SVG diagrams and monogram portrait, all with alt. Commented `exampleSite/hugo.toml` for every key.

## Answer

Example site filled with fictional content: 4 case studies (covers, facts, figure wide/full, quote, aside, code, lists, table), 6 posts 2022-2026 (series 01-03 via eyebrow, one long post), 10 notes (text, large, media with alt, quoted, long URL, line breaks; all with `outputs: [html, embed]`), About stating the persona is fictional, contact/notes/nav/footer params and menus in `exampleSite/hugo.toml`. Images are flat PNGs drawn from token colours (the `figure` partial fails on SVG resources because it calls `.Width`), so they carry no text. `hugo --gc --minify` builds with no warnings.
