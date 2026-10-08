---
id: VR-0004
from: evidence-verifier
date: 2026-09-08T14:40
claim: LICENSE.md and NOTICE.md at current main still cite v0.76 and v0.77 in their attribution examples
result: verified
---

## Method

- `grep -n 'v0\.' LICENSE.md NOTICE.md` in the fresh clone at main 765c0815 on 2026-09-08.
- Raw output saved at: clone at main 765c0815; see draft PR body file

## Finding

LICENSE.md line 15 example cites `GKOS-2026-07-20 v0.76`. NOTICE.md line 4 says `Release: GKOS-2026-08-05 v0.77` and line 11 example cites v0.77. Current release is v0.81 (VR-0001). Proposed version-neutral wording is in `shared/evidence/VR-0004_license-notice-pr-body-draft.md`. Not pushed.

## Allowed sentence

Internal only: "LICENSE.md and NOTICE.md attribution examples are two and three releases stale and should cite the release actually used."
