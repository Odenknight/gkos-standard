---
id: VR-0003
from: evidence-verifier
date: 2026-09-08T14:40
claim: The Wayback Machine holds a capture of github.com/Odenknight/gkos-standard earlier than 2026-09-03
result: contradicted
---

## Method

- Wayback CDX API queries for github.com/Odenknight/gkos-standard, its wildcard, GKOS-Engine, GKOS-Engine-Lite, Kosmos-Oden, Kosmos-Oden-Lite on 2026-09-08 (HTTP 200, empty result sets).
- Availability API for gkos-standard at timestamp 20260101: `archived_snapshots: {}`.
- Raw output saved at: `shared/evidence/VR-0003_wayback-cdx-gkos-standard.txt`, `VR-0003_wayback-cdx-retry.txt`

## Finding

No Wayback captures exist for any of the five repositories as of 2026-09-08. Therefore July 17, 2026 is only the document's stated date. Absence of a capture is not proof of no public disclosure; it means Wayback cannot supply the independent date. Recommend the owner trigger a Save Page Now capture of each repository now so a dated capture exists from today forward.

## Allowed sentence

"No independent web-archive capture of the repository predating the v0.81 release was located." Do not cite July 17 as an independently supported date.
