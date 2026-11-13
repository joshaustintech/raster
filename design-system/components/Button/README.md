# Button

A square, 40px-tall button in four kinds: primary (`fleece`), secondary (`rule` outline), signal (`signal`, one per view) and text link.

- Classes: `rs-btn` plus `rs-btn--primary | --secondary | --signal | --text`. Consumer provides the element (`<button>` or `<a>`) and the label.
- Label in sentence case, verb first, no more than four words. An arrow (`→`, mono) only for actions that navigate to a larger piece (a case study, a post).
- Corners are always `radius-0`. Hover inverts to `ink` on `paper`; focus is a 2px `focus` outline offset 2px.
- Disabled uses `paper-raised` / `ink-muted`; explain why nearby rather than relying on the state alone.
- Width snaps to content or to whole grid columns — never a fixed pixel width.
