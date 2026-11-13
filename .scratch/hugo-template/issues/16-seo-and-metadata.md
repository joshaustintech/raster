# 16. SEO: Open Graph, JSON-LD, sitemap, robots

Status: resolved
Blocked by: 09, 10, 11
Spec: ../spec.md

Person/WebSite/BlogPosting JSON-LD, canonical, sitemap, robots.txt, social params.

## Answer

`layouts/_partials/head/seo.html` (included from head.html in one line) emits description, Open Graph (no og:image; notes get it from og-note.html), Twitter summary card, hreflang alternates for translations, and JSON-LD: WebSite + Person on home, BlogPosting on writing and notes. The dict is passed straight to the template (no jsonify/safeJS) because html/template already JSON-encodes in a ld+json script and jsonify would double-encode. `layouts/robots.txt` (Disallow outside production) plus `enableRobotsTXT`, `[sitemap]` and `params.author/description/social` in exampleSite/hugo.toml. Work pages emit no JSON-LD.
