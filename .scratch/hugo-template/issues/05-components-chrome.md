# 05. Partials: Nav, Footer, Button, Hero, SectionHeader/Section, SpecList

Status: resolved
Blocked by: 04
Spec: ../spec.md

Recreate from `reference/` with identical markup/classes. Nav list rendered twice, `aria-current`, `<details>` menu. Inputs per spec §5.1.

**Done when:** each matches its reference in the styleguide (parity test from 12 once available; manual comparison until then).

## Answer

Implemented `layouts/_partials/{nav,navitems,footer,button,hero,section,speclist}.html` matching reference markup. Nav list rendered twice via `navitems.html` with `aria-current`; footer groups come from `menus.footer` parents/children. Theme toggle hook spots marked (issue 15). i18n keys added; sample menus/params in `exampleSite/hugo.toml`. Hugo build clean; nav/footer output verified against references. Hero/section/speclist/button written to spec but not yet rendered by any page.
