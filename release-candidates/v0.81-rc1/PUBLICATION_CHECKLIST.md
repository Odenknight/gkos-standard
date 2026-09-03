# v0.81 publication checklist

This checklist is preparation-only until R20's post-evidence owner approval.

1. Freeze one final `release/v0.81-rc1` commit.
2. Run every mandatory exact-bound repository and conformance check.
3. Preserve the exact candidate SHA and full evidence/limitation packet.
4. Verify `qualifying_profiles` remains derived from complete evidence; do not
   manually assert a profile.
5. Confirm the public second implementation remains accurately stated.
6. Confirm no protocol or certification activation is implied.
7. Present the final candidate SHA, evidence table, limitations, proposed
   publication date, and proposed `v0.81` tag target to the owner.
8. Obtain a separate explicit **APPROVE v0.81 PUBLICATION** disposition.
9. Only after approval:
   - assign the actual publication date;
   - materialize `releases/YYYY-MM-DD-v0.81/`;
   - update README, master Standard, CHANGELOG, and `CITATION.cff` to the dated
     publication coordinate;
   - generate final release manifest and checksums;
   - create and verify a signed annotated `v0.81` tag at the approved target;
   - run the post-tag validator;
   - create the GitHub Release and archival publication as separately
     authorized.
10. Preserve the RC and final evidence; never rewrite earlier release packages.

No pre-approval commit may claim that v0.81 is published.
