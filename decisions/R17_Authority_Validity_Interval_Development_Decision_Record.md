# R17 — Authority validity interval semantics

**Date:** 2026-08-21

**Status:** Accepted development decision; unpublished amendment

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Publication target:** Next separately authorized GKOS release after v0.80

**Base:** GKOS-2026-08-20 v0.80 plus merged executable-evidence foundation
PR #24 at `9568656d249853695b9b50d9bc756212b92ed4b0`

## 1. R17-126 — Half-open authority interval

Authority validity uses a half-open interval:

```text
valid_from <= evaluation_time < valid_until
```

Authority is valid exactly at `valid_from`. It is expired exactly at
`valid_until`. Evaluation before `valid_from`, at or after `valid_until`, or
with missing, malformed, unavailable, or indeterminate required time evidence
fails closed under `GKOS-GATE-L7-001`.

## 2. Captured evaluation time

The authority decision binds a captured canonical action-evaluation time. A
request timestamp, selection time, compilation time, authorization-draft time,
later audit timestamp, or ambient wall-clock read cannot silently substitute
for it.

The authority gate must be evaluated at the final admission or commit boundary
for the consequential effect. If execution is delayed until the captured
authority window no longer contains that boundary, the implementation must
re-evaluate and refuse unless separately valid authority exists.

## 3. Failure and evidence behavior

A refusal must:

- emit `GKOS-GATE-L7-001`;
- cite `GKOS-AUTHUSE-003` and `GKOS-AUTHUSE-007` as applicable;
- preserve the protected target state;
- emit no external-effect execution receipt;
- leave a record satisfying the Refusal Receipt role; and
- bind the authority basis, evaluated time, actors, policy, and attempted
  effect scope.

Clock rollback, uncertainty, disagreement, or unavailable trusted time cannot
extend authority. A policy-defined uncertainty margin may only make evaluation
more restrictive unless a separate, bounded, expiring authority explicitly
permits otherwise.

## 4. Requirement allocation

R17 allocates `GKOS-AUTHUSE-007` permanently. The existing
`GKOS-GATE-L7-001` remains stable and is mapped additionally to the new
requirement. Neither identifier replaces `GKOS-AUTHUSE-003`.

## 5. Release and claim boundary

This decision does not alter, retag, or republish v0.80. The allocation and
fixtures are unpublished development evidence until a later release is
separately authorized. No GCP-7 or GKOS Advanced claim follows from adoption
or fixture execution alone.
