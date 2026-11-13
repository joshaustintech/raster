---
title: "Rebuilding the job queue"
description: "Moving a job queue off a broker and onto the database it already trusted."
weight: 1
featured: true
year: 2025
stack: [Postgres, Go]
lede: "Moving a job queue off a broker and onto the database it already trusted."
cover:
  image: img/cover-queue.png
  alt: "A flat bar chart in slate and chartreuse blocks showing jobs per second rising."
facts:
  - {label: Role, value: "Lead engineer"}
  - {label: Team, value: "4"}
  - {label: Duration, value: "6 months"}
  - {label: Impact, value: "p99 6 ms"}
---

Intro paragraph with *emphasis*, `inline code` and a [link](https://example.org/). The client is fictional, as is every number below.

## Problem

- The old system dropped jobs under load.
- Operators had no way to see why it stalled.
- Every change needed a release train.

{{< figure src="img/diagram-flow.png" alt="Three boxes in a row joined by lines, the middle one filled slate." width="wide" num="Fig. 01" caption="Client, queue and worker, with workers polling rather than being pushed to." >}}

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

{{< figure src="img/chart-latency.png" alt="A bar chart whose four bars fall from tall to short." width="full" caption="Latency per stage of the rollout." >}}

## Result

| Metric | Before | After |
| --- | --- | --- |
| p50 | 120 ms | 18 ms |
| p99 | 900 ms | 64 ms |
| Pages per week | 14 | 2 |

The work finished on schedule and the old path was removed in the following quarter.
