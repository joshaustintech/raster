---
title: "Observability on a budget"
description: "Traces and one useful dashboard for a team of six."
weight: 4
featured: false
year: 2022
stack: [OpenTelemetry, Go]
lede: "Traces and one useful dashboard for a team of six."
cover:
  image: img/cover-observability.png
  alt: "A line chart with a clay red marker where the line jumps."
facts:
  - {label: Role, value: "Engineer"}
  - {label: Team, value: "2"}
  - {label: Duration, value: "3 months"}
  - {label: Impact, value: "Pages down 85%"}
---

Intro paragraph with *emphasis*, `inline code` and a [link](https://example.org/). The client is fictional, as is every number below.

## Problem

- The old system was noisy.
- Operators had no way to see why it paged for the wrong things.
- Every change needed a release train.

{{< figure src="img/chart-latency.png" alt="A bar chart whose four bars fall from tall to short." width="wide" num="Fig. 01" caption="Latency before and after sampling changes." >}}

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

{{< figure src="img/screen-dashboard.png" alt="A mock dashboard with an error-rate line that spikes then recovers." width="full" caption="The single dashboard the team kept." >}}

## Result

| Metric | Before | After |
| --- | --- | --- |
| p50 | 120 ms | 18 ms |
| p99 | 900 ms | 64 ms |
| Pages per week | 14 | 2 |

The work finished on schedule and the old path was removed in the following quarter.
