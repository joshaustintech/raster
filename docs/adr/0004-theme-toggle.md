# ADR-0004: Light/dark toggle with persisted choice

Status: accepted (2026-11-13)

The footer offers a text-only toggle (auto / light / dark). A tiny blocking external script (`theme.js`, not inline, so strict CSP works) sets `data-theme` on `<html>` before first paint from `localStorage`; otherwise the OS `prefers-color-scheme` applies. Without JS the OS setting still works.

**Why:** `data-theme` is already supported by the design system, so this adds no second colour scheme. No icon is used, in line with the system's iconography rules.
