# Nav

The sticky top bar: name on the left, up to five text links (Work, Writing, Notes, About) and one primary action; below 1024px the links collapse into a "Menu" disclosure.

- Markup: `nav.rs-nav` > `.rs-wrap` > `.rs-nav__mark`, `ul.rs-nav__links`, `.rs-btn.rs-nav__cta`, and `details.rs-nav__menu` (`summary` + `.rs-nav__panel`). The page root (or an ancestor) carries `.rs-c`. Consumer provides the links (twice: inline list and panel list), the current page (`aria-current="page"`) and the action.
- Height is one field (64px) at every size. Links are `body-sm` in `ink-soft`; the current one is `ink` with a 2px ink underline.
- The disclosure uses native `<details>`, so it works without script and is keyboard accessible. Panel rows are 48px tall with `line` rules; the action becomes full width at the bottom.
- Over a full-bleed image, keep the nav on `paper` — never transparent over a photo.
- More than five destinations: group them; do not shrink the type.
