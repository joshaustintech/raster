# Deployment

Build with:

```sh
hugo --gc --minify
```

The output is the `public/` folder: static files only. Set `baseURL` in `hugo.toml` to the final URL **including** any sub-path (for example `https://you.github.io/repo/`); canonical URLs, Open Graph, feeds, the sitemap and note permalinks all use it. You can also override it per build with `hugo --baseURL "$URL"`.

Production builds (`hugo.IsProduction`, the default for `hugo` without `server`) emit `robots.txt` with `Allow: /`; development servers emit `Disallow: /`. Set `enableRobotsTXT = true`.

Module installs need Go on the build machine; submodule installs need submodules checked out.

## GitHub Pages

`.github/workflows/hugo.yml`:

```yaml
name: Deploy
on:
  push: { branches: [main] }
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    env: { HUGO_VERSION: "0.158.0" }
    steps:
      - uses: actions/checkout@v4
        with: { submodules: recursive, fetch-depth: 0 }
      - uses: actions/setup-go@v5        # only for the Hugo Module route
        with: { go-version: "stable" }
      - name: Install Hugo
        run: |
          curl -fsSL -o hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.deb
          sudo dpkg -i hugo.deb
      - id: pages
        uses: actions/configure-pages@v5
      - run: hugo --gc --minify --baseURL "${{ steps.pages.outputs.base_url }}/"
      - uses: actions/upload-pages-artifact@v3
        with: { path: public }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: "${{ steps.d.outputs.page_url }}" }
    steps:
      - id: d
        uses: actions/deploy-pages@v4
```

In the repository settings, set Pages source to "GitHub Actions". (This workflow is a template.) This repository's own `.github/workflows/pages.yml` deploys `exampleSite` the same way, taking `baseURL` from `actions/configure-pages`; it has not been run yet.

## Netlify

`netlify.toml`:

```toml
[build]
  command = "hugo --gc --minify"
  publish = "public"
[build.environment]
  HUGO_VERSION = "0.158.0"
  GO_VERSION = "1.22"
```

## Cloudflare Pages

Build command `hugo --gc --minify`, output directory `public`, environment variable `HUGO_VERSION=0.158.0`.

## Any static host

Upload `public/`. Notes need no server code.

## Headers for embeds

Note embed pages (`/notes/<id>/embed/`) are meant to load in other sites' iframes, so do not send `X-Frame-Options: DENY` or a `frame-ancestors` restriction for `/notes/*/embed/*`. Keep it for the rest of the site if you like.

Netlify / Cloudflare Pages `_headers` (place in `static/_headers`):

```text
/notes/*/embed/
  Content-Security-Policy: frame-ancestors *
/*
  X-Content-Type-Options: nosniff
```

The theme loads only first-party scripts (external files, no inline script), so a strict CSP such as `default-src 'self'` works, apart from `style-src`, which must allow the few `style` attributes the theme emits (the FullBleed focal point, and the iframe snippet text shown in the Embed panel is only displayed, not applied). A CSP was not tested against a built site; test yours.
