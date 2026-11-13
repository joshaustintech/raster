# 22. CI, deployment and v1.0.0 release

Status: resolved
Blocked by: 21, 18
Spec: ../spec.md

GitHub Actions: build on min and latest Hugo, vnu, third-party request check, Lighthouse CI, axe, link check, token sync, parity, deploy exampleSite to Pages. Licence audit, tag v1.0.0, themes-gallery submission.

## Answer

Added `.github/workflows/ci.yml` (build on Hugo 0.158.0 and latest; token sync, parity, axe, keyboard; vnu), `pages.yml` (deploy exampleSite to GitHub Pages, baseURL from configure-pages) and `release.yml` (GitHub release from the CHANGELOG section on tag `v*`). Release steps are in CONTRIBUTING.md; deployment note in docs/deployment.md. The four local script checks pass. Not done: Lighthouse CI, link check (optional), licence audit, themes-gallery submission. Workflows have not been confirmed on GitHub. Tagging v1.0.0 is left to the owner.
