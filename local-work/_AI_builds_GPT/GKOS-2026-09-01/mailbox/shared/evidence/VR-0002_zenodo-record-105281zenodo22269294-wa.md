---
id: VR-0002
from: evidence-verifier
date: 2026-09-08T14:40
claim: Zenodo record 10.5281/zenodo.22269294 was deposited on 2026-09-03 and contains the v0.81 files
result: not verified
---

## Method

- `curl https://zenodo.org/api/records/22269294` three times (with and without User-Agent, 90 s timeout), `/records/22269294`, `/records/22269294/export/json`: all returned HTTP 504 Gateway Time-out from Zenodo on 2026-09-08 between 14:05 and 14:30 local.
- `curl -I https://doi.org/10.5281/zenodo.22269294` returned 302 to https://zenodo.org/doi/10.5281/zenodo.22269294, so the DOI is registered and resolves to Zenodo.
- Raw output saved at: `shared/evidence/VR-0002_zenodo-22269294.json` (contains the 504 HTML body)

## Finding

The DOI resolves. Zenodo itself was unreachable, so the deposit timestamp, file list, checksums, and creator metadata could not be read. CITATION.cff at current main asserts version 0.81, date-released 2026-09-03, doi 10.5281/zenodo.22269294, concept doi 10.5281/zenodo.22269293; those remain project assertions.

## Allowed sentence

Do not use a Zenodo deposit date yet. Permitted: "GKOS v0.81 lists a release date of September 3, 2026, and a DOI of 10.5281/zenodo.22269294 which resolves to Zenodo." Retry this check before S-01 is finalized.
