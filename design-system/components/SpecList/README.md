# SpecList

A row of key facts — on Home (role, experience, focus) or atop a case study (role, team, duration, stack, impact) — uppercase label over a muted value — on a `paper-raised` field, each item topped by a `rule` hairline.

- Markup: `<dl class="rs-specs">` containing `<div class="rs-spec"><dt>Label</dt><dd>Value</dd></div>`. Consumer provides labels and values.
- Responsive inside an `.rs-c` container: four across from 1024px, two across from 480px, one per row below.
- Labels: 1–3 words. Values: `small`, or `mono-data` when the value is a metric with a unit (`p99 6 ms`).
- Never more than eight items; split into two lists with an eyebrow heading each.
