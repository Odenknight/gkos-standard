# v0.82-rc1 evidence index

Evidence that must be bound to one frozen candidate commit before R24
publication approval can be requested.

## Mandatory repository evidence

- `lint` — Markdown lint.
- `links` — link validation.
- `validate` — current-release preservation plus v0.82 RC validation.
- `checksums` — published-release and RC package digest verification.
- `blocking dependency audit / Node 24`.
- `blocking ubuntu-latest / Node 22` and `/ Node 24`.
- `blocking windows-latest / Node 22` and `/ Node 24`.

The Ubuntu/Node 23 lane remains informative.

## Conformance evidence expected

- registry lint passes with strict mutation coverage;
- permanent requirement count is 62; registered gate-code count is 28;
- no stable gate code is uncovered by portable predicate-twin evidence;
- Standard-owned graph evaluation and adversarial false-PASS tests pass;
- provisional L3 and RRET-01 tests pass without creating a profile claim;
- no unresolved high or critical dependency finding remains.

## Review and repository-control evidence

- R24 accepted by the owner on 2026-09-22 with section 3 Option A recorded.
- R17–R24, the register, CHANGELOG and release text are mutually consistent.
- G82-06 machine-readable coordinate consolidation complete.
- `main` and `v*` tag rulesets active.

## External replication

A separately operated clean replication is corroborating evidence. If it is
unavailable, that limitation is reported explicitly.

## Prohibited inference

Green checks do not create publication, profile qualification, certification,
regulator approval, legal compliance, protocol activation or production
authority.
