# GKOS-2026-09-22 v0.82 evidence index

Final exact-bound evidence is bound to the approved commit in the signed
`v0.82` tag annotation, not self-referenced in this file.

## Mandatory checks at the approved commit

- `lint`, `links`, `validate`, `checksums`
- `blocking dependency audit / Node 24`
- `blocking ubuntu-latest / Node 22` and `/ Node 24`
- `blocking windows-latest / Node 22` and `/ Node 24`

## Content checks

- registry lint with strict mutation coverage passes;
- 62 permanent requirements and 28 registered gate codes;
- no uncovered stable gate code;
- `qualifying_profiles` empty in every catalog;
- G82-06 coordinate consolidation recorded;
- earlier release packages, including v0.81 source integrity, preserved.

## Authority

- R24 accepted 2026-09-22 with Option A.
- Owner publication approval bound to the exact commit in the tag annotation.

## Limitations

No separately operated clean replication is recorded for this edition. Green
checks do not create profile qualification, certification or regulator
approval.
