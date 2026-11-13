---
title: "Search without a cluster"
description: "Full-text search for a small catalogue, without running a search cluster."
weight: 2
featured: true
year: 2024
stack: [SQLite, Go]
lede: "Full-text search for a small catalogue, without running a search cluster."
cover:
  image: img/cover-search.png
  alt: "A stylised search box with four result rows, the first highlighted in slate."
facts:
  - {label: Role, value: "Staff engineer"}
  - {label: Team, value: "3"}
  - {label: Duration, value: "4 months"}
  - {label: Impact, value: "Zero new servers"}
---

Intro paragraph with *emphasis*, `inline code` and a [link](https://example.org/). The client is fictional, as is every number below.

## Problem

- The old system needed a three-node cluster.
- Operators had no way to see why it returned stale results.
- Every change needed a release train.

{{< figure src="img/diagram-flow.png" alt="Three boxes in a row joined by lines, the middle one filled slate." width="wide" num="Fig. 01" caption="A request path that stays inside one process." >}}

## Approach

1. Measure the current behaviour for two weeks.
2. Replace one stage at a time behind a flag.
3. Delete the old path once traffic reached zero.

```sql
SELECT id FROM jobs
WHERE state = 'ready'
ORDER BY run_at
FOR UPDATE SKIP LOCKED
LIMIT 1;
```

{{< quote who="Sam Placeholder, fictional operations lead" >}}It was the first release where nobody stayed late.{{< /quote >}}

{{< aside label="Note" >}}Numbers here are invented for the example site and do not describe a real system.{{< /aside >}}

{{< figure src="img/screen-dashboard.png" alt="A mock dashboard with an error-rate line that spikes then recovers." width="full" caption="Error rate through the cutover." >}}

## Result

| Metric | Before | After |
| --- | --- | --- |
| p50 | 120 ms | 18 ms |
| p99 | 900 ms | 64 ms |
| Pages per week | 14 | 2 |

The work finished on schedule and the old path was removed in the following quarter.
