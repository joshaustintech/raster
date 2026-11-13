# 10. Pages: Writing index, Post, About/Contact, 404, pagination

Status: resolved
Blocked by: 05, 06, 08
Spec: ../spec.md

Year grouping, related posts Aside with 2 link cards, reading time, About with Article + form card, 404, paginator, optional tag rendering with `.rs-tag`.

**Done when:** each page matches §6.2.

## Answer

Added layouts/writing/{list,single}.html (year groups via GroupByDate, paginated, link cards with date and reading time, Related Aside with up to 2 cards), layouts/about/single.html (Article + card-form), layouts/404.html, layouts/_partials/pager.html, optional taxonomy.html and term.html (.rs-tag, plain list), plus minimal fictional exampleSite writing/about content. Builds with no warnings.
