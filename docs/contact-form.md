# Contact form

`params.contact.action` sets the form target. Default is `mailto:<params.author.email>` (no server, no third party). Set `params.contact.js = false` to skip `form.js`.

Without JS the browser's native validation (`required`, `type=email`) runs. With `form.js` the form gets `novalidate`, and invalid fields get `aria-invalid="true"` plus an `Error: ...` message (`.rs-error`) linked via `aria-describedby`, and focus moves to the first invalid field.

## Opt-in third-party providers

A hosted endpoint (for example Formspree `https://formspree.io/f/<id>` or Basin `https://usebasin.com/f/<id>`) can be used by setting `params.contact.action` to its URL. This is opt-in and the only third-party contact happens when the visitor submits: the page itself loads no third-party script, font or image, and no request is made on page load. Mention the provider in your privacy note, since the visitor's message goes to them. Do not use provider JavaScript snippets; the plain HTML POST is enough.
