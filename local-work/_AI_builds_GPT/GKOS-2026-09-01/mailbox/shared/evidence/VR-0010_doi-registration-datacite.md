---
id: VR-0010
from: evidence-verifier
date: 2026-09-09T03:10
claim: DOI 10.5281/zenodo.22269294 was registered on 2026-09-03 and carries GKOS v0.81 metadata
result: verified
---

## Method

- `curl -H "Accept: application/json" https://api.datacite.org/dois/10.5281/zenodo.22269294` on 2026-09-09, HTTP 200. DataCite is the registration agency for Zenodo DOIs, so this is metadata held by a party other than Zenodo.
- `curl -I https://doi.org/10.5281/zenodo.22269294` returned 302 to `https://zenodo.org/doi/10.5281/zenodo.22269294`, which itself returned 302.
- Zenodo's own record API (`/api/records/22269294`) returned HTTP 504 on every attempt on 2026-09-08 and again on 2026-09-09. Superseding VR-0002 only on the registration date; deposit file contents remain unverified.
- Raw output: `shared/evidence/VR-0002b_datacite-10.5281-zenodo.22269294.json`

## Finding

Observed values:

| Field | Value |
|---|---|
| DOI | 10.5281/zenodo.22269294 |
| created / registered / updated | 2026-09-03T05:31:57.000Z (all three identical) |
| state | findable, isActive true |
| version | 0.81 |
| dates | 2026-09-03, dateType Issued |
| publicationYear | 2026 |
| publisher | Zenodo |
| creators | Marshall, Shaun Allan (Personal); nameIdentifiers empty |
| rights | CC BY 4.0 (SPDX cc-by-4.0) |
| relatedIdentifiers | IsSupplementTo https://github.com/Odenknight/gkos-standard; IsVersionOf 10.5281/zenodo.22269293 |
| resourceType | Technical note (Text) |
| schemaVersion | DataCite kernel-4 |

Timeline consistency: the v0.81 tag was created 2026-09-03T05:27:58Z (VR-0001) and the DOI was registered 2026-09-03T05:31:57Z, about four minutes later. The two independent records agree.

What this does and does not establish. It establishes that a DOI record describing GKOS v0.81 existed at DataCite by 2026-09-03T05:31:57Z, naming Shaun Allan Marshall as creator under CC BY 4.0. It does not establish which files are inside the Zenodo deposit, because Zenodo is unreachable; the Execution Guide Phase 1 step 6 check (download the archive, hash it, confirm the files behind each contribution claim) remains open.

Two metadata defects observed, for the owner to fix in Zenodo when it is reachable:

1. The title is double-encoded: `GKOS v0.81 â€" A Developmental Pre-standard for AI Governance, Accountability and Auditability`. The em dash was stored as UTF-8 bytes read as Latin-1. It will render that way in every citation that harvests DataCite.
2. The creator has no ORCID `nameIdentifier`, though the owner has ORCID 0009-0006-2552-358X. Adding it links the deposit to the identity record.

Also note a name-form inconsistency to settle: DataCite says "Marshall, Shaun Allan"; the S-01 Part F attestation says "Shaun Allan Irving Marshall". Neither is wrong, but one form should be chosen for author fields.

## Allowed sentence

"The version DOI 10.5281/zenodo.22269294 for GKOS v0.81 was registered with DataCite on 2026-09-03T05:31:57Z and is in state findable (DataCite REST API, retrieved 2026-09-09). The DOI record establishes registration metadata; the contents of the Zenodo deposit were not verified, as Zenodo returned HTTP 504 on 2026-09-08 and 2026-09-09."

Do not say the deposit files were confirmed. Do not describe this as proof of authorship or of public accessibility of every file.
