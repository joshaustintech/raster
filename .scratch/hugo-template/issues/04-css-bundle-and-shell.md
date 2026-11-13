# 04. CSS bundle, head partial and page shell

Status: resolved
Blocked by: 02, 03
Spec: ../spec.md

`resources.Concat` fonts→tokens→raster→extensions, minify, fingerprint+SRI. `baseof.html` with `<div class=rs-c>`, skip link, `<main id=main>`, head partial (viewport, canonical, color-scheme, font preload). Create `raster-extensions.css` skeleton (skip link, anchor offset, lists, tables, hr, h3–h4, print).

**Done when:** page renders unstyled-content-free; zero third-party requests.

## Answer
Bundle (fonts→tokens→raster→extensions, minified, fingerprinted+SRI), head partials, skip link and shell done. Nav/footer partials are placeholders until issue 05.
