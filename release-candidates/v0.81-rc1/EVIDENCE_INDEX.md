# v0.81-rc1 evidence index

This index describes the evidence that must be bound to one final candidate
commit before R20 publication approval can be requested.

## Mandatory repository evidence

- `lint` — Markdown lint.
- `links` — link validation.
- `validate` — current-release preservation plus v0.81 RC validation.
- `checksums` — published-release and RC package digest verification.
- `blocking dependency audit / Node 24`.
- `blocking ubuntu-latest / Node 22`.
- `blocking ubuntu-latest / Node 24`.
- `blocking windows-latest / Node 22`.
- `blocking windows-latest / Node 24`.

The Ubuntu/Node 23 lane remains informative.

## Conformance evidence expected

At the frozen candidate:

- registry lint passes;
- permanent requirement count is 62;
- registered gate-code count is 28;
- no stable gate code is uncovered by portable predicate-twin mutation
  evidence;
- Standard-owned graph evaluation and adversarial false-PASS tests pass;
- no qualifying profile is created by partial mechanism evidence;
- no unresolved high or critical release-toolchain dependency finding remains.

## Review and repository-control evidence

- R17, R18, R19, and R20 are present and mutually consistent.
- PR #30 bounded different-model-family review and owner dispositions are
  preserved.
- `main` and `v*` release-tag rulesets are active.
- Issue #31 repository-protection gate is closed as completed.

## External replication

A separately operated clean replication is corroborating evidence under G81-10.
If it is unavailable in the execution environment, that limitation must be
reported explicitly; it must not be silently represented as executed.

## Prohibited inference

Green checks do not by themselves create publication, profile qualification,
certification, regulator approval, legal compliance, protocol activation, or
production authority.
