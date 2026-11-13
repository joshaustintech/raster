# Fonts (self-hosted)

`css/fonts.css` expects these four files in this folder. They are not yet downloaded, because the environment this handoff was prepared in could not reach any font host.

| File | Family | Weights | Package |
| --- | --- | --- | --- |
| `inter-tight-latin-wght-normal.woff2` | Inter Tight (variable) | 100–900 | `@fontsource-variable/inter-tight` |
| `ibm-plex-mono-latin-400-normal.woff2` | IBM Plex Mono | 400 | `@fontsource/ibm-plex-mono` |
| `ibm-plex-mono-latin-500-normal.woff2` | IBM Plex Mono | 500 | `@fontsource/ibm-plex-mono` |

Both families are SIL Open Font License 1.1: free to self-host and redistribute with the license text.

## Fetch them (one time, on a machine with normal network access)

```sh
cd /tmp && mkdir fonts-dl && cd fonts-dl && npm init -y >/dev/null
npm i @fontsource-variable/inter-tight @fontsource/ibm-plex-mono
cp node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2 <repo>/design-system/fonts/
cp node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2      <repo>/design-system/fonts/
cp node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2      <repo>/design-system/fonts/
cp node_modules/@fontsource-variable/inter-tight/LICENSE <repo>/design-system/fonts/LICENSE-Inter-Tight.txt
cp node_modules/@fontsource/ibm-plex-mono/LICENSE        <repo>/design-system/fonts/LICENSE-IBM-Plex-Mono.txt
```

Then confirm the four `.woff2` files load (browser devtools → Network, no 404s). Until they exist, pages fall back to Helvetica Neue / Arial and ui-monospace: still readable, but line breaks and widths will differ slightly.

## Notes

- The `latin` subset covers English and most Western European text. If the site needs other scripts, add the matching `-latin-ext` / `-cyrillic` files and `@font-face` rules with `unicode-range`.
- Preload the two files used above the fold: `<link rel="preload" href="/fonts/inter-tight-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`.
- Serve fonts with `Cache-Control: public, max-age=31536000, immutable` and same-origin (no CORS needed).
