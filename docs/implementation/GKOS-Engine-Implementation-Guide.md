# GKOS Engine — Implementation Guide

**Status:** Informative implementation directive
**Normative authority:** None
**Data model:** OKF+ 2.3, with OKF+ 2.2 and legacy read compatibility
**Governance reference:** GKOS-2026-07-20 v0.76
**Reflects:** GKOS-Engine v1.1.3 (canonical implementation)

> This document supersedes the earlier `GKOS-Engine-v1.0-Build-Instructions.md`.
> The engine's own version identifier (currently `v1.1.3`) is an implementation
> release number. It does not imply that the GKOS standard has reached any
> particular version — engine version and GKOS standard version are
> independent trains. See the repository root `COMPAT.md` for the current
> cross-repository version matrix.

## Mission

Build one deterministic knowledge compiler consumed by the Kosmos-Oden
Obsidian plugin, a standalone CLI/application, and REST/MCP agent surfaces.

For identical corpus bytes, engine version, policy hash, and configuration,
the engine should produce byte-equivalent canonical output. No deterministic
engine stage may require an LLM.

## Non-negotiable invariants

- Original notes are never silently modified.
- A UID, not a filename, is canonical identity.
- Authored, defaulted, derived, proposed, and approved values remain distinguishable.
- An agent proposal is never represented as approved without a Decision Record.
- Assessment score is documentation-and-support quality, not truth.
- Invalid lineage is diagnosed rather than silently repaired.
- Sensitivity fails closed.
- Epistemic promotion and sensitivity reduction travel as proposals.
- Upper-layer output re-enters the corpus as a new source or proposal.
- Read APIs do not become general write APIs.

## Bounded conformance claim

An implementation based on this document may claim only a validating
projection shaped around GKOS Layers 2 and 3, with deterministic Layer 4
diagnostics and optional Layer 5-style proposal/decision recording. It must
disclose test coverage, missing requirements, and any single-owner operation.

It must not claim:

- full GKOS conformance;
- Governed Writer conformance;
- independent human-authority verification;
- authorized operational use;
- GCP-1 source preservation unless a revision store is enabled.

## Data surfaces

### Agent-Ready dialect

Human-visible Markdown uses flat scalars and flat string lists. It preserves
ordinary editor compatibility and avoids inserting nested governance
structures into documents humans routinely edit.

Sample OKF+ note frontmatter (Agent-Ready dialect):

```yaml
---
uid: okf-01J8Z9K3F7QW2M4N6P8R0T2V4X
title: "Anomalous decay curve in sample batch 7"
epistemic_state: observation
sensitivity: internal
authored_by: "jane.researcher"
created: 2026-07-22T14:03:00Z
relations:
  - type: contradicts
    target: okf-01J8Z8H1D4KP9Q3R5T7V9W1Y3Z
tags: [batch-7, decay-curve, anomaly]
---
```

### Machine dialect

Machine-managed stores may use nested blocks for authorship, epistemic state,
sensitivity, provenance, typed relationships, evidence, lineage, review,
assessment, authorization, and origin-separated labels. Readers accept both
dialects. Conversion is explicit, previewable, hash-bound, and reversible
where possible. Fields without a flat representation move to sidecars rather
than being discarded.

## Three planes

1. **Authoring plane:** human-visible note and body.
2. **Projection plane:** deterministic in-memory normalized representation.
3. **Governance plane:** explicit `.okf/` sidecars for proposals, decisions,
   assessments, diagnostics, policy, and optional source revisions.

## Required subsystems

- OKF+ and legacy parser.
- UID-first identity index with rename history.
- Typed relationship, lineage, contradiction, and temporal projection.
- Deterministic diagnostics and policy-hashed assessment.
- Crash-safe sidecar reader/writer.
- Proposal and Decision Record handling.
- Canonical graph and query API.
- CLI, REST, and MCP adapters sharing the same core.
- Sensitivity-aware output filtering and resource limits.
- Reproducible serialization and fixture-based conformance testing.

## Current CLI (engine v1.1.3)

The engine v1.1.3 `bin` ships four primary subcommands:

```console
$ okf validate ./corpus
✓ 214 notes parsed (OKF+ 2.3: 198, legacy: 16)
✓ 0 lineage errors, 0 dialect conflicts
⚠ 3 notes flagged OKF-TEMPORAL-001 (naive timestamp, see below)
validate: PASS (0 errors, 3 warnings)

$ okf assess ./corpus --policy policy/default.json
assessed 214 notes against policy sha256:9f2c...b71a
documentation-and-support score is not a truth score.
summary: 187 sufficient, 21 partial, 6 insufficient

$ okf graph ./corpus --relation contradicts,contradicted_by
graph: 214 nodes, 37 typed edges (27 relation types available)
contradicts: 9 edges · contradicted_by: 9 edges (paired, bidirectional)

$ okf export graphiti ./corpus --sensitivity-ceiling internal
export: graphiti bundle written to ./out/graphiti-export.json
sensitivity ceiling applied: internal (2 notes above ceiling excluded)
```

`okf validate`, `okf assess`, and `okf graph` are read-only. `okf export
graphiti` produces a projection bundle for the `gkos.intelligence.v1`
sidecar consumer described below; it does not write back into the corpus.

## Fail-closed sensitivity (v1.0.6+)

The engine's default sensitivity is **fail-closed**: any note without an
explicit, in-vocabulary sensitivity label is treated as the most restrictive
lattice level, `secret`, rather than defaulting open. This is controlled by
`FAIL_CLOSED_SENSITIVITY_DEFAULT` internally and is not configurable to a
weaker default.

Consumers may still choose their own *effective* default for notes that omit
a sensitivity label, via `Okf23ProjectionOptions.defaultSensitivity`
(introduced v1.0.7). This does not weaken the engine's own fail-closed
floor — it only lets a trusted consumer declare what unlabeled notes should
project as inside its own bounded scope, while the engine's fail-closed
behavior remains the safety net for anything the consumer does not override.

```ts
const projection = engine.project(corpus, {
  okf23: {
    defaultSensitivity: "internal", // consumer-declared default for unlabeled notes
    // engine still fails closed to "secret" for anything outside
    // this consumer's declared scope or policy
  },
} satisfies Okf23ProjectionOptions);
```

The 7-level sensitivity lattice, from least to most restrictive, is:

```text
public < internal < restricted < confidential < sensitive < classified < secret
```

## Twelve-state epistemic vocabulary

The engine recognizes twelve epistemic states:

```text
unknown, observation, reported, inferred, hypothesis, modeled,
supported, contested, refuted, retracted, accepted, superseded
```

Any note whose `epistemic_state` value is out of this vocabulary (a typo, a
legacy value, or an unrecognized custom state) is defaulted to the
`EPISTEMIC_FALLBACK_STATE`, which is `"unknown"`. When this fallback fires,
the projection sets a marker so downstream consumers can distinguish an
authored `unknown` from a defaulted one:

```json
{
  "epistemic_state": "unknown",
  "effective": {
    "epistemicStateDefaulted": true,
    "rawValue": "speculative"
  }
}
```

Never treat `effective.epistemicStateDefaulted: true` as equivalent to an
author's deliberate `unknown` — it signals the input needs correction.

## OKF-TEMPORAL-001: naive-timestamp warning

Any timestamp field lacking an explicit UTC offset or `Z` suffix triggers
diagnostic `OKF-TEMPORAL-001`. Example input and diagnostic:

```yaml
created: 2026-07-22T14:03:00   # no offset — naive timestamp
```

```json
{
  "code": "OKF-TEMPORAL-001",
  "severity": "warning",
  "field": "created",
  "message": "Naive timestamp lacks UTC offset; interpretation is ambiguous across environments.",
  "note_uid": "okf-01J8Z9K3F7QW2M4N6P8R0T2V4X"
}
```

Fix by supplying an explicit offset or `Z`:

```yaml
created: 2026-07-22T14:03:00Z
```

## Proposal and decision loop

Proposal envelopes identify target UID, input hash, authoring-plane patch,
proposer identity, rationale, expiry, and required authority. Sensitive
reductions and epistemic promotions are admitted only as elevated-authority
proposals.

Decision records are immutable individual files. A hash-linked sequence and
out-of-corpus head anchor are recommended as corruption-detection measures,
while acknowledging that hash chaining alone does not authenticate the
writer.

Single-owner actions must be disclosed honestly and must not be described as
satisfying separation of duties.

## Agent surfaces

REST and MCP remain read-only by default, bind to localhost by default,
require authentication for LAN exposure, apply byte-counted limits, and
enforce a sensitivity ceiling on every response.

Optional proposal ingress is separately enabled, separately authorized,
writes only to the proposals inbox, treats above-ceiling targets as
nonexistent, and enforces queue caps.

## Intelligence-contract surface (optional, proposal-only)

Since v1.1.0 the engine exposes an optional `gkos.intelligence.v1` contract:
a DSPy proposal sidecar that consumes a read-only projection (e.g. the
`okf export graphiti` bundle above) and emits **proposals only** — it is
loopback-only by design and has no direct write path into the corpus.

```console
$ okf export graphiti ./corpus | dspy-sidecar propose --contract gkos.intelligence.v1
proposal envelope written: .okf/proposals/2026-07-27T09-12-00Z-dspy-0001.json
target: okf-01J8Z9K3F7QW2M4N6P8R0T2V4X
proposed_transition: observation -> reported
requires_authority: elevated
```

Enabling this capability does not change the bounded conformance claim above
and does not grant the sidecar decision authority — every emitted proposal
still requires a human or authorized-operator Decision Record before it has
any effect.

## Optional Layer-1 revision store

When enabled, governed writes and explicit ingestion snapshot prior bytes by
UID and content hash with an ingestion receipt. Retention and governed
erasure apply. Only this mode supports a GCP-1-shaped preservation claim.

## Test and release gates

- Both dialects and legacy forms parse and project consistently.
- Shared fixtures produce identical canonical output through embedded, CLI,
  REST, and MCP adapters.
- Proposal → decision → apply preserves origin attribution.
- No hidden note-write route exists.
- Policy and schema hashes are embedded in assessments and exports.
- Builds and canonical outputs are reproducible.
- Security, migration, and unsupported-conformance limitations are
  published.

## Source relationship

This standalone document condenses the implementation directive reviewed
for GKOS v0.76 and refreshed against GKOS-Engine v1.1.3 implementation
reality. It remains informative and may evolve independently from the
normative GKOS standard. See root `COMPAT.md` for the current
cross-repository version state.
