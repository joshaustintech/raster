# Contributing

Thanks for helping. Please open an issue before large changes.

## Setup

- Hugo 0.158.0 or later, and Go (for module tests).
- Node and npm for the dev-only tooling: `npm install`, then `npx playwright install chromium` once. Site owners never need Node.

```sh
cd exampleSite && hugo server       # live example site
npm run tokens:check                # tokens.css matches tokens.json
npm run parity                      # markup parity with design-system/reference
hugo --gc --minify --source exampleSite --destination /tmp/out   # production build
```

## Ground rules

Read `design-system/README.md`, `Grid.md` and `IMPLEMENTING.md` first, and [Customisation](docs/customisation.md#rules-you-must-not-break).

- `design-system/tokens.json` is the source of truth. Edit it and run `npm run tokens`; never hand-edit `tokens.css` and never hard-code values.
- Markup and class names match `design-system/reference/<Name>.html`. Fix bugs in CSS, not by changing markup. No new inline styles.
- No third-party requests, no shadows, gradients, rounded corners or decorative icons, at most one `signal` element per view.
- Keep accessibility semantics (see [Accessibility and performance](docs/accessibility-and-performance.md)).
- JavaScript is first-party, small and progressive enhancement; no inline scripts.
- Renaming or removing a token or `rs-*` class is a breaking (major) change.
- Record significant decisions as an ADR in `docs/adr/` and use the terms in [GLOSSARY.md](GLOSSARY.md).
- Add an entry under `[Unreleased]` in [CHANGELOG.md](CHANGELOG.md).

## Pull requests

Keep them focused; describe what and why; include the checks above that apply and screenshots at 375, 768 and 1280px in light and dark for visual changes. Content in `exampleSite/` is fictional and must stay obviously so.

## Licence

By contributing you agree your code is released under the MIT licence in [LICENSE](LICENSE). Fonts keep their SIL OFL licences.
