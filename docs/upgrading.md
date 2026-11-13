# Upgrading

Raster follows [Semantic Versioning](https://semver.org/). Renaming or removing a design token or an `rs-*` class is a **major** release. Read [CHANGELOG.md](../CHANGELOG.md) before upgrading.

## Hugo Module

```sh
hugo mod get -u github.com/joshaustintech/raster          # latest
hugo mod get github.com/joshaustintech/raster@v1.0.0      # a specific tag
hugo mod tidy
```

Commit `go.mod` and `go.sum`.

## Git submodule

```sh
git -C themes/raster fetch --tags
git -C themes/raster checkout v1.0.0
git add themes/raster && git commit -m "Update Raster to v1.0.0"
```

## After upgrading

1. Build with `hugo --gc --minify` and read any warnings.
2. Compare your `hugo.toml` against [Installation](installation.md#minimal-hugotoml); new releases may need new copy-paste blocks (output formats, markup), since Hugo does not merge theme config.
3. If you override partials, diff them against the theme's versions; overrides do not receive upstream fixes.
4. Raise your build's Hugo version to at least the theme's `min_version` (`theme.toml`, currently 0.169.0).

## 1.0.0

First release; nothing to migrate.
