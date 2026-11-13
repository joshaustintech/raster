---
title: Sample article
date: 2026-11-13
lede: A long-form post, rendered through the Article partial so Markdown lands on the grid.
eyebrow: Writing
tags: [systems, queues]
---
Body paragraph with *emphasis*, `inline code` and a [link](https://example.org/).

{{< aside label="Note" >}}Latency figures are p99 over 30 days of production traffic.{{< /aside >}}

The replacement had to be dull: something every engineer already knew how to query, back up and page on. Postgres, with `FOR UPDATE SKIP LOCKED`, turned out to be enough.

Another paragraph so the measure and rhythm are visible.

A third paragraph before the code block.

```sql
SELECT id, payload FROM jobs WHERE run_at <= now() AND locked_at IS NULL ORDER BY run_at LIMIT 32 FOR UPDATE SKIP LOCKED;
```

{{< figure src="img/chart-latency.png" alt="A bar chart whose four bars fall from tall to short." ratio="21x9" width="wide" num="Fig. 01" caption="Latency before and after." >}}

## A second heading

Another paragraph under the heading.

{{< quote who="The lesson" >}}A quote inside the Article.{{< /quote >}}

The last paragraph.

Final paragraph.
