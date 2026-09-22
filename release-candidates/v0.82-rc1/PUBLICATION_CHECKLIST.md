# v0.82 publication checklist

Preparation only until the owner approves publication.

1. Done 2026-09-22: owner accepted R24 and selected section 3 Option A.
2. Apply G82-06 coordinate consolidation and Option A on the candidate
   branch.
3. Freeze one final `release/v0.82-rc1` commit.
4. Run every mandatory exact-bound repository and conformance check.
5. Preserve the exact candidate SHA and the evidence and limitation packet.
6. Confirm `qualifying_profiles` remains derived and empty.
7. Present the candidate SHA, evidence table, limitations, proposed
   publication date and proposed `v0.82` tag target to the owner.
8. Obtain a separate explicit **APPROVE v0.82 PUBLICATION** disposition.
9. Only after approval:
   - assign the actual publication date;
   - materialize `releases/YYYY-MM-DD-v0.82/` with manifest, notes, evidence
     index, source and package checksums;
   - update README, master Standard, CHANGELOG, `CITATION.cff`,
     `.zenodo.json` and the release validators to the dated coordinate;
   - create and verify a signed annotated `v0.82` tag at the approved target
     under the `v*` tag ruleset;
   - run post-tag verification;
   - create the GitHub Release, which triggers Zenodo ingestion.
10. Verify the Zenodo record, then record the v0.82 version DOI and a
    publication receipt in a follow-up change.
11. Preserve the RC and final evidence; never rewrite earlier packages.

No pre-approval commit may claim that v0.82 is published.
