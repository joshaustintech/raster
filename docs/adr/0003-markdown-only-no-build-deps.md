# ADR-0003: Markdown content, first-party JS, no build dependencies for site owners

Status: accepted (2026-11-13)

Site owners need only Hugo (standard edition). Content is Markdown with front matter and page bundles. JavaScript is small, first-party, progressively enhanced (theme toggle, Share/Copy/Embed, embed height, form messages). Search and comments are out of scope.

**Why:** the design system forbids third-party requests and is deliberately build-free. Node is used only for contributor tooling (token build, parity tests) and never required to use the theme.
