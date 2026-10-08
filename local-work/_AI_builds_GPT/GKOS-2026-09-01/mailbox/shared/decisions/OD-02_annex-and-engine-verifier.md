---
id: OD-02
decided_by: Shaun "Oden" Marshall
date: 2026-09-08
re: MSG-0019
status: recorded-owner-decision
---

# Annex and digest verifier

Source: [owner response](../../owner/outbox/2026-09-08-owner-decisions-and-retrieval-example.md), item 5 accepting both recommendations in the preceding assistant message.

Keep `Supersedes: none` for the S-01 documentation example. Do not manufacture a publication/supersession history.

Build and test the documentation digest verifier in GKOS-Engine first. Compare declared digest with exact artifact bytes; exercise matching and deliberately altered artifacts. If emitting a v0.81 Refusal Receipt, validate it against the pinned actual schema and document its scope. Do not equate a reason code with schema conformance. Keep the failure example proposed until execution evidence exists.

Consider gate/requirement registration as a later v0.82 candidate; this decision does not authorize editing the standard, claiming qualified profile coverage, or changing immutable releases. Coordinate the Engine implementation with ongoing release work so it does not silently alter a qualified candidate.

Filed by Codex from explicit owner text, not a cryptographic signature. Prepare a reviewable implementation and evidence; no external submission authorized.
