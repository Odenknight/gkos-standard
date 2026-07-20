# GKOS Engine v1.0 — Build Instructions

**Status:** Informative implementation directive  
**Normative authority:** None  
**Data model:** OKF+ 2.3 draft, with OKF+ 2.2 and legacy read compatibility  
**Governance reference:** GKOS-2026-07-20 v0.76

The engine's own `v1.0` identifier is an implementation release number. It does not imply that the GKOS standard has reached v1.0.

## Mission

Build one deterministic knowledge compiler consumed by the Kosmos-Oden Obsidian plugin, a standalone CLI/application, and REST/MCP agent surfaces.

For identical corpus bytes, engine version, policy hash, and configuration, the engine should produce byte-equivalent canonical output. No deterministic engine stage may require an LLM.

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

An implementation based on this document may claim only a validating projection shaped around GKOS Layers 2 and 3, with deterministic Layer 4 diagnostics and optional Layer 5-style proposal/decision recording. It must disclose test coverage, missing requirements, and any single-owner operation.

It must not claim:

- full GKOS conformance;
- Governed Writer conformance;
- independent human-authority verification;
- authorized operational use;
- GCP-1 source preservation unless a revision store is enabled.

## Data surfaces

### Agent-Ready dialect

Human-visible Markdown uses flat scalars and flat string lists. It preserves ordinary editor compatibility and avoids inserting nested governance structures into documents humans routinely edit.

### Machine dialect

Machine-managed stores may use nested blocks for authorship, epistemic state, sensitivity, provenance, typed relationships, evidence, lineage, review, assessment, authorization, and origin-separated labels.

Readers accept both dialects. Conversion is explicit, previewable, hash-bound, and reversible where possible. Fields without a flat representation move to sidecars rather than being discarded.

## Three planes

1. **Authoring plane:** human-visible note and body.
2. **Projection plane:** deterministic in-memory normalized representation.
3. **Governance plane:** explicit `.okf/` sidecars for proposals, decisions, assessments, diagnostics, policy, and optional source revisions.

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

## Proposal and decision loop

Proposal envelopes identify target UID, input hash, authoring-plane patch, proposer identity, rationale, expiry, and required authority. Sensitive reductions and epistemic promotions are admitted only as elevated-authority proposals.

Decision records are immutable individual files. A hash-linked sequence and out-of-corpus head anchor are recommended as corruption-detection measures, while acknowledging that hash chaining alone does not authenticate the writer.

Single-owner actions must be disclosed honestly and must not be described as satisfying separation of duties.

## Agent surfaces

REST and MCP remain read-only by default, bind to localhost by default, require authentication for LAN exposure, apply byte-counted limits, and enforce a sensitivity ceiling on every response.

Optional proposal ingress is separately enabled, separately authorized, writes only to the proposals inbox, treats above-ceiling targets as nonexistent, and enforces queue caps.

## Optional Layer-1 revision store

When enabled, governed writes and explicit ingestion snapshot prior bytes by UID and content hash with an ingestion receipt. Retention and governed erasure apply. Only this mode supports a GCP-1-shaped preservation claim.

## Test and release gates

- Both dialects and legacy forms parse and project consistently.
- Shared fixtures produce identical canonical output through embedded, CLI, REST, and MCP adapters.
- Proposal → decision → apply preserves origin attribution.
- No hidden note-write route exists.
- Policy and schema hashes are embedded in assessments and exports.
- Builds and canonical outputs are reproducible.
- Security, migration, and unsupported-conformance limitations are published.

## Source relationship

This standalone document condenses the implementation directive reviewed for GKOS v0.76. It remains informative and may evolve independently from the normative GKOS standard.
