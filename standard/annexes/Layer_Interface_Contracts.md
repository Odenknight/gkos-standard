# Annex — Layer interface contracts

Each layer contract defines purpose, accepted inputs, required operations,
outputs, preserved invariants, authority boundary, prohibited behavior, failure
behavior, receipts, and re-entry rules.

| Layer | Required result | Blocking invariant |
| --- | --- | --- |
| L1 Original Sources | Source Record | Received revision, provenance, custody, sensitivity, and retention evidence preserved |
| L2 Structure and Identity | Structured Knowledge Object | Stable identity and version; filename and path are not identity |
| L3 Relationships and Lineage | Assertion and lineage records | Typed, sourced, temporal, scoped, attributable relationships |
| L4 Validation and Control | Diagnostics and control receipts | Every mandatory failure blocks, refuses, rolls back, or freezes as specified |
| L5 Review and Workflow | Decision Record | Authorized append-only disposition; Context Manifest identity/hash bound when used for review |
| L6 Context Presentation | Selection Envelope and Context Manifest | Non-deterministic selection captured; assembly deterministic, purpose-bound, restriction-aware, and replayable |
| L7 Authorized Use | Authorized Use Record or Refusal Receipt role | Exact context, valid authority, distinct actors, delegation, effect scope, outcome, and recovery route bound |

Layer processing may be asynchronous, distributed, or re-entrant. The numbered
responsibilities do not require one synchronous implementation pipeline.

When a Context Manifest supports a Layer-5 decision, the Decision Record binds
its stable identity, version, and canonical artifact hash. When it supports a
Layer-7 action, the Authorized Use Record binds the same information and
verifies it again at action time.

Every normative block, refusal, fail-closed, rollback-before-commit, or
authority-freeze condition emits the registered gate code and a record
satisfying the Refusal Receipt role.

Upper-layer results returning to the corpus MUST enter as new Layer-1 sources
without inherited standing.
