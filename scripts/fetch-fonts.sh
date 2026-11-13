#!/usr/bin/env bash
# One-time, dev-only. Fetches self-hosted fonts via npm and commits-ready outputs.
# Site owners never run this. Output is committed.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
cd "$TMP" && npm init -y >/dev/null
npm i --silent @fontsource-variable/inter-tight @fontsource/inter-tight @fontsource/ibm-plex-mono
F="$ROOT/design-system/fonts"; O="$ROOT/assets/og"
mkdir -p "$F" "$O"
cp node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2 "$F/"
cp node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2 "$F/"
cp node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2 "$F/"
cp node_modules/@fontsource-variable/inter-tight/LICENSE "$F/LICENSE-Inter-Tight.txt"
cp node_modules/@fontsource/ibm-plex-mono/LICENSE "$F/LICENSE-IBM-Plex-Mono.txt"
# Static TTFs for Hugo images.Text (needs TTF/OTF; fontsource ships woff only).
curl -fsSL -o "$O/IBMPlexMono-Medium.ttf" "https://github.com/IBM/plex/raw/master/packages/plex-mono/fonts/complete/ttf/IBMPlexMono-Medium.ttf"
# Upstream ships only a variable TTF. images.Text renders its default instance;
# pinning to wght=700 (fonttools varLib.instancer) is a possible later refinement.
curl -fsSL -o "$O/InterTight-Variable.ttf" "https://github.com/google/fonts/raw/main/ofl/intertight/InterTight%5Bwght%5D.ttf"
cp "$F/LICENSE-Inter-Tight.txt" "$O/LICENSE-Inter-Tight.txt"; cp "$F/LICENSE-IBM-Plex-Mono.txt" "$O/LICENSE-IBM-Plex-Mono.txt"
cd "$ROOT" && shasum -a 256 design-system/fonts/*.woff2 assets/og/*.ttf > scripts/fonts.sha256
echo "wrote scripts/fonts.sha256"
