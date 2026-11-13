# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Goal and current state

The goal is a working **Hugo** site template (portfolio "Work", long-form "Writing", short "Notes", About/Contact) built on the Raster design system in `design-system/`. At the time of writing the repo contains only that design system (plain CSS + reference HTML, untracked in git) — no Hugo config, layouts, content, or fonts exist yet. `hugo` is not installed on the dev machine (`brew install hugo`; use the extended edition if Hugo Pipes/Sass is ever needed, though the system needs neither).

`design-system/IMPLEMENTING.md` is the handoff doc and has a `<FILL IN: name + version>` placeholder for the target framework: it is Hugo. Check `hugo version` and read current Hugo docs (templates, `baseof`, partials, page bundles, `static/` vs `assets/`, output formats for RSS and custom outputs) rather than assuming conventions from other static-site generators.

There is no build/lint/test tooling in the repo yet. Once Hugo is scaffolded, the expected commands are `hugo server` (dev) and `hugo --gc --minify` (build). Acceptance is manual, per `IMPLEMENTING.md` → "Acceptance checks" (375/768/1280px, light + dark, Lighthouse a11y ≥ 95, HTML validation, no third-party requests).

## Reading order

Read these before writing templates: `design-system/README.md` (principles, voice, site map) → `design-system/Grid.md` (grid, breakpoints, page templates in §6) → `design-system/IMPLEMENTING.md` (order of work, hard rules) → the relevant `components/<Name>/README.md`.

## Architecture of the design system

- `design-system/tokens.json` is the source of truth; `css/tokens.css` is **generated** from it (CSS custom properties, light + dark). Never hard-code colours/sizes/spacing; add a token to `tokens.json` and regenerate `tokens.css` instead.
- `css/raster.css` holds all `rs-*` component and layout classes. `css/fonts.css` holds self-hosted `@font-face` rules. Load order on every page: `fonts.css` → `tokens.css` → `raster.css`. (Docs mention `components/bundle.css`; the actual file is `css/raster.css`.)
- `reference/<Name>.html` is the **ground truth for markup**. Recreate each as a Hugo partial/shortcode with identical element structure and class names; don't invent classes or inline styles (the `<style>` blocks in references are demo scaffolding). Fix bugs in `raster.css`, not in markup.
- `reference/Cover.html` is the system's own artwork and `GridSystem.html` is a dev-only overlay; neither belongs in production pages.
- Page root must be `<div class="rs-c">` wrapping Nav → content → Footer: components size to their **container** via `@container`, not the viewport. Content bands use `.rs-wrap.rs-cols`.
- Dark mode follows `prefers-color-scheme`, overridden by `data-theme="light|dark"` on `<html>`. No second colour scheme.

## Mapping onto Hugo

Page types and their component composition are specified in `Grid.md` §6.2 (Home, Work index, Case study, Writing index, Post, Notes, About/Contact). Components to implement as partials: Nav, Hero, SpecList, SectionHeader, FullBleed, Figure, Quote, Aside, Article, Card (post / form / link), Footer, Button. Long-form markdown should render through Article so Figure/Quote/Aside/code land on the grid automatically (render hooks/shortcodes).

Notes (microblog) are the only part needing real behaviour beyond markup (spec in `components/Card/README.md` → "Sharing and embedding notes"): permalink `/notes/<id>`, an embed route `/notes/<id>/embed` (custom Hugo output format; `?theme=` and `postMessage({type:"rs:embed-height"})` handled by small progressive-enhancement JS), `og:*` tags with a 1200×630 image, `<blockquote>` fallback, `h-entry` microformats, RSS/Atom feed, and JS for Share / Copy / Embed.

Fonts are not bundled: follow `design-system/fonts/README.md` to fetch three `.woff2` files (Inter Tight variable, IBM Plex Mono 400/500) plus OFL licenses via npm. Keep `fonts.css`'s relative `../fonts/` URLs working when copying into Hugo's `static/`/`assets/`.

## Rules that must not be broken

- Class names and structure match `reference/`; no new inline styles.
- No shadows, gradients, rounded corners (`radius-0`), or decorative icons; at most one `signal` (chartreuse) element per view; flush-left, never centred/justified.
- Type sizes step at 640/1024 (no `vw`, no `clamp()` on font sizes); every line height is a multiple of 8px; no horizontal scroll at ≥320px.
- Keep reference semantics/a11y (landmarks, heading order, `<time datetime>`, `aria-current`, `aria-expanded`/`aria-pressed`, labels, alt text, 44px targets, visible focus).
- No third-party requests: fonts, CSS and scripts are first-party.
- Placeholder content in references ("Avery Lin" etc.) is structure only; real content comes from the site owner. Voice rules (sentence case, UPPERCASE only for eyebrows, `13 Nov 2026` date format, numbering `01 / 04`) are in `design-system/README.md`.

## Agent skills

### Issue tracker

Issues live as local markdown under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded as `Status:` lines. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
