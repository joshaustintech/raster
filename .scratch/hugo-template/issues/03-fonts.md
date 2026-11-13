# 03. Fetch and commit fonts

Status: resolved
Blocked by: 02
Spec: ../spec.md

`scripts/fetch-fonts.sh` per `design-system/fonts/README.md`: three woff2 files + OFL licences, plus static TTFs (Inter Tight Bold, Plex Mono Medium) for `images.Text` under `assets/og/`. Checksums verified.

**Done when:** four woff2/TTF assets and licences committed; network panel shows no 404s.

## Answer
Fonts and OFL licences committed. Inter Tight has no static Bold upstream, so `assets/og/InterTight-Variable.ttf` (variable TTF) is used; images.Text renders its default instance. Checksums in scripts/fonts.sha256.
