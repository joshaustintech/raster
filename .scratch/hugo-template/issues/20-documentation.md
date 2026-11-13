# 20. Write documentation set

Status: resolved
Blocked by: 19
Spec: ../spec.md

README plus docs/ files listed in spec §7, GLOSSARY.md, CHANGELOG, CONTRIBUTING, LICENSE, screenshots (`images/tn.png`, `screenshot.png`); update `IMPLEMENTING.md` placeholder.

**Done when:** a newcomer reaches a running customised site from the README in ≤ 5 minutes (tested clean).

## Answer

Wrote README.md, docs/{installation,configuration,content,components,customisation,deployment,architecture,upgrading}.md, CHANGELOG.md, CONTRIBUTING.md, GLOSSARY.md; cross-linked docs/notes.md and docs/contact-form.md; filled in design-system/IMPLEMENTING.md and fixed bundle.css in design-system/README.md; fixed archetypes/notes.md to set `outputs: [html, embed]`. Quick start tested with a throwaway consumer (Module with path replacement, and theme-directory/submodule layout) on Hugo 0.169. Not done: `images/tn.png` and `screenshot.png`; LICENSE and theme.toml already existed.
