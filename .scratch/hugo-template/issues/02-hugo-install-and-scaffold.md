# 02. Install Hugo, scaffold theme and exampleSite

Status: ready-for-agent
Blocked by: 01
Spec: ../spec.md

`brew install hugo`, record `hugo version`, read current docs for template lookup, `_partials`/`_shortcodes`, page bundles, output formats. Scaffold spec §4 layout, `theme.toml`, `hugo.toml` with `module.mounts` and `hugoVersion.min`, minimal `exampleSite`. Verify mounts work when consumed as a module from a throwaway site (fallback: sync script).

**Done when:** exampleSite builds with `hugo --gc --minify`; mounted CSS/fonts resolve from a module consumer.
