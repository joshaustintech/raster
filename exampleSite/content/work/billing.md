---
title: "Billing ledger"
description: "An append-only ledger that finance could audit without asking engineering."
weight: 3
featured: true
year: 2023
stack: [Postgres, Go]
lede: "An append-only ledger that finance could audit without asking engineering."
cover:
  image: img/cover-billing.png
  alt: "Stacked overlapping sheets in olive, paper and chartreuse, suggesting ledger pages."
facts:
  - {label: Role, value: "Tech lead"}
  - {label: Team, value: "5"}
  - {label: Duration, value: "8 months"}
  - {label: Impact, value: "Close in 1 day"}
---

Intro paragraph with *emphasis*, `inline code` and a [link](https://example.org/). The client is fictional, as is every number below.

## Problem

- The old system mutated rows in place.
- Operators had no way to see why it disagreed with the bank.
- Every change needed a release train.

{{< figure src="img/diagram-flow.png" alt="Three boxes in a row joined by lines, the middle one filled slate." width="wide" num="Fig. 01" caption="Writes append, reads project." >}}

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

{{< figure src="img/screen-ledger.png" alt="A mock invoice table with one row marked in clay red." width="full" caption="The invoice list used by finance." >}}

## Result

| Metric | Before | After |
| --- | --- | --- |
| p50 | 120 ms | 18 ms |
| p99 | 900 ms | 64 ms |
| Pages per week | 14 | 2 |

The work finished on schedule and the old path was removed in the following quarter.
