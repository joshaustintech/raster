# 02. Install Hugo, scaffold theme and exampleSite

Status: resolved
Blocked by: 01
Spec: ../spec.md

`brew install hugo`, record `hugo version`, read current docs for template lookup, `_partials`/`_shortcodes`, page bundles, output formats. Scaffold spec §4 layout, `theme.toml`, `hugo.toml` with `module.mounts` and `hugoVersion.min`, minimal `exampleSite`. Verify mounts work when consumed as a module from a throwaway site (fallback: sync script).

**Done when:** exampleSite builds with `hugo --gc --minify`; mounted CSS/fonts resolve from a module consumer.

## Answer
Hugo v0.169.0 installed (go 1.27.4 needed for module consumers). Min Hugo set to 0.158.0 (`.Language.Locale`, `_partials`). Replacement paths resolve relative to `themesDir`, hence `-> ../..` in exampleSite. Mounts verified from a module consumer.
