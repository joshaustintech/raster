# ADR-0001: Ship as a Hugo theme with an `exampleSite/`

Status: accepted (2026-11-13)

Raster is distributed as a theme at the repository root, with `exampleSite/` inside it, installable as a Hugo Module or git submodule. The vendored `design-system/` is mounted into the theme with `module.mounts` rather than copied.

**Why:** matches how users expect to consume popular Hugo templates and keeps upgrades a version bump. A single copy of the CSS and fonts avoids drift from the design system.

**Consequences:** mounts must be verified when consumed as a module (see spec risks). Class and token renames are breaking changes (major version).
