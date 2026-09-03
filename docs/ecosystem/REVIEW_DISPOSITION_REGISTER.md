# Review disposition register

- **Register ID:** GKOS-RDR-001
- **Revision:** 0.2
- **Date:** 2026-09-02
- **Standing:** informative R21 review control; not independent verification

This register preserves material review claims and their dispositions. It prevents agreement between multiple drafts or models from being mistaken for verification and prevents a corrected review from silently erasing an earlier error.

## Disposition vocabulary

- `ACCEPTED`: supported without material narrowing.
- `ACCEPTED-WITH-NARROWING`: useful finding, but the scope or wording required correction.
- `REJECTED`: contradicted by controlling evidence.
- `SUPERSEDED`: once-relevant statement replaced by later evidence or decision.
- `UNRESOLVED`: insufficient evidence for a governing disposition.
- `WITHDRAWN`: source revision is no longer current but remains historical evidence.

## Reviewed materials

| Review item | Revision standing | Standard baseline | Current disposition |
| --- | --- | --- | --- |
| GKOS-INFRA-001 r2 | WITHDRAWN | `gkos-standard` main at `1f5768fe6b8f847c17030127a3a00e78edf5cd80` | Historical input only; r3 corrected the GKX baseline and signing language |
| GKOS-INFRA-001 r3 | REVIEW INPUT | same baseline | Useful strategic input; superseded as publication candidate by r4 |
| GKOS-INFRA-001 r4 / PR #30 | BOUNDED REVIEW COMPLETED | base `f9e5802cd1cde550cd7a308bf714609cbc8ef3b9`; reviewed head `dde98d34f4c64fead9a7e708e720c706793c0516` | Fable 5.1 verdict `PASS`; six non-blocking findings accepted and corrected on successor head; exact corrected-head verification is preserved in the PR conversation after final CI |
| GKOS Infrastructure Blueprint rev1 | WITHDRAWN | `gkos-standard` main at `1f5768fe6b8f847c17030127a3a00e78edf5cd80` | Historical input only |
| GKOS Infrastructure Blueprint rev2 | REVIEW INPUT | same baseline | Useful practitioner input; corrections incorporated into the current implementation guidance set |
| Kimi infrastructure assessment and critique | REVIEW INPUT WITH MATERIAL ERRORS | same baseline, but review analyzed withdrawn revisions in part | Preserve as evidence; accept only supported findings and reject propagated GKX errors |

## Finding dispositions

### RDR-001 — GKX 2.0 and GKX-CBOR-1 standing

- **Claim reviewed:** GKX 2.0 and canonical CBOR were premature v0.81 or Engine-only behavior.
- **Disposition:** `REJECTED`.
- **Controlling evidence:** the v0.80 master Standard and Canonical Serialization annex identify GKX 2.0 and GKX-CBOR-1 as the published v0.80 contract.
- **Required correction:** infrastructure and practitioner documents must state the v0.80 standing directly and preserve the earlier contrary statement as a review error.

### RDR-002 — universal cryptographic signing

- **Claim reviewed:** validation, decision, authorized-use, or evidence records must universally be cryptographically signed.
- **Disposition:** `ACCEPTED-WITH-NARROWING` as an overclaim finding.
- **Controlling boundary:** GKOS requires the applicable record fields, integrity and authority evidence, and exact binding. It does not mandate one universal signature technology for every record. Authority Receipt proof remains subject to its exact normative fields.

### RDR-003 — content digest as identity

- **Claim reviewed:** content hashes may be used as stable governed object identity.
- **Disposition:** `ACCEPTED-WITH-NARROWING`.
- **Controlling boundary:** a digest may fingerprint or key a received revision. It is not automatically the stable Layer-2 identity across revisions, correction, re-entry, or migration.

### RDR-004 — extraction as source preservation

- **Claim reviewed:** extraction tools satisfy original-source preservation.
- **Disposition:** `REJECTED`.
- **Required correction:** extraction output is derived evidence. Original bytes, provenance, custody, sensitivity, and retention evidence require their own preservation mechanism.

### RDR-005 — Engine behavior as Standard text

- **Claim reviewed:** reference-implementation properties may be presented as GKOS requirements.
- **Disposition:** `ACCEPTED` as a valid implementation-leakage warning.
- **Required correction:** every Engine-specific statement must be labeled as a reference-implementation fact and pinned to an exact release or commit.

### RDR-006 — Layer-3 graph drift

- **Claim reviewed:** current graph implementations may exceed the present clause-stable Standard semantics.
- **Disposition:** `ACCEPTED-WITH-NARROWING`.
- **Required correction:** reference the existing graph-drift review and open topics. Do not use `GKOS-DRIFT-001` as though it were an allocated permanent requirement or diagnostic.

### RDR-007 — MCP deferral

- **Claim reviewed:** all MCP connectors should be deferred until after v1.0.
- **Disposition:** `SUPERSEDED`.
- **Current rule:** bounded, separately versioned, non-normative MCP bindings may be developed before v1.0. Consequential effects remain separately governed and default-off until their authority and receipt path is qualified and activated.

### RDR-008 — role-based adoption paths

- **Claim reviewed:** “Viewer first” and “Core first” are contradictory.
- **Disposition:** `ACCEPTED-WITH-NARROWING`.
- **Current rule:** Viewer/Projection is the low-risk external interoperability on-ramp; Core is the first complete governance tier; Context-Only supports non-acting retrieval; Advanced governs consequential use.

### RDR-009 — agent-governance absence

- **Claim reviewed:** GKOS lacks agent-specific governance.
- **Disposition:** `REJECTED` as stated, while accepting an ecosystem-crosswalk gap.
- **Controlling evidence:** the Specialized Agent Framework and R18 already govern identity, bounded authority, delegation, review independence, escalation, suspension, and revocation.
- **Required work:** publish current mappings to NIST/NCCoE, IMDA, MCP, A2A, ACS, identity systems, and runtime-control mechanisms without adding a new GKOS layer.

### RDR-010 — multi-jurisdiction deployment guidance

- **Claim reviewed:** implementers need guidance for conflicting retention, hold, erasure, transfer, and governing-policy claims.
- **Disposition:** `ACCEPTED-WITH-NARROWING`.
- **Current rule:** publish informative fields and conflict procedures. GKOS does not decide the controlling law and must not impose “most restrictive always wins” as a universal legal rule. Unresolved mandatory conflict fails closed and routes to qualified authorized disposition.

### RDR-011 — evidence-package format

- **Claim reviewed:** evidence semantics and packaging are wholly undefined.
- **Disposition:** `ACCEPTED-WITH-NARROWING`.
- **Controlling evidence:** the conformance-manifest schema already defines the semantic claim root. The missing component is a portable carrier, inventory, extraction, replay, and verification profile.

### RDR-012 — adapter read-only requirement

- **Claim reviewed:** every adapter must be read-only toward the corpus.
- **Disposition:** `REJECTED` as a universal rule.
- **Current rule:** read and proposal adapters have no governed write authority. A writer is permissible only when separately authorized and when all applicable Decision, State-Change Receipt, re-entry, context, authority, and effect contracts are satisfied.

### RDR-013 — fail closed at every seam

- **Claim reviewed:** every optional or unsupported feature must fail closed as though it were a mandatory gate.
- **Disposition:** `REJECTED` as overbroad.
- **Current rule:** applicable mandatory gates fail closed. Optional or unsupported behavior must be explicit, non-silent, and non-qualifying where relevant.

### RDR-014 — public second implementation

- **Claim reviewed:** a current internal or private implementation should be named as the second implementation.
- **Disposition:** `REJECTED`.
- **Current standing:** awaiting a public second implementation. No private repository or unpublished product is named or implied.

## PR #30 bounded different-model-family review

The required bounded documentation review was performed against exact PR #30 head `dde98d34f4c64fead9a7e708e720c706793c0516` and base `f9e5802cd1cde550cd7a308bf714609cbc8ef3b9` by Anthropic Claude Fable 5.1 (`claude-fable-5-1`). The preserved review record is `docs/reviews/PR30_FABLE51_BOUNDED_REVIEW_20260902.md`.

The review returned `PASS` with no BLOCKING or MAJOR findings and six non-blocking findings. The owner/session disposition is:

| Finding | Severity | Disposition | Correction |
| --- | --- | --- | --- |
| PR30-REV-F-001 | OBSERVATION | ACCEPTED | Clarify that the Context-Only path is Core plus GCP-6 |
| PR30-REV-F-002 | MINOR | ACCEPTED | Limit Viewer/Projection wording to a read-only display surface |
| PR30-REV-F-003 | MINOR | ACCEPTED | Remove the unused zero-drafts link-check exclusion |
| PR30-REV-F-004 | OBSERVATION | ACCEPTED | Restore concise licensing and citation guidance |
| PR30-REV-F-005 | OBSERVATION | ACCEPTED | Refer narrowly to informal `GKOS-DRIFT-001` history without implying an identifier family |
| PR30-REV-F-006 | OBSERVATION | ACCEPTED | Record r4, exact review coordinates, findings, and dispositions in this register |

These corrections create a successor PR head. The bounded review remains evidence about the reviewed head; merge requires verification that the accepted corrections were applied and that all required deterministic checks pass on the corrected exact head. To avoid an infinite evidence-write loop, the final corrected-head SHA and CI verification are preserved in the PR conversation rather than added to this branch file after the last deterministic rerun.

## Standing review boundary

The Fable 5.1 review is a bounded different-model-family documentation review. It does not establish organizationally independent conformance verification, profile qualification, certification, accreditation, regulator approval, legal compliance, or production authority.
