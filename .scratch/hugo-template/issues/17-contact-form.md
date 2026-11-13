# 17. Contact form behaviour

Status: ready-for-agent
Blocked by: 06
Spec: ../spec.md

`params.contact.action` (default mailto), optional `form.js` with aria-invalid and 'Error:' messages via aria-describedby; document opt-in third-party providers.

**Done when:** works with and without JS; no page-load third-party request.

## Answer

`layouts/_partials/card-form.html` uses `params.contact.action` (default `mailto:<author.email>`), marks the form `data-rs-form`, and loads `assets/js/form.js` (deferred, fingerprinted, first-party; disable with `params.contact.js = false`). The script adds `novalidate`, `aria-invalid`, and `Error: ...` messages linked by `aria-describedby`; without JS native validation runs. Third-party providers are documented as opt-in, submit-time only, in `docs/contact-form.md`.
