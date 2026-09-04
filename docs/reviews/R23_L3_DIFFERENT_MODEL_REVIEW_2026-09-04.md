# R23 bounded different-model-family technical review — preserved review record

**Review ID:** R23-REV-2026-09-04-CLAUDE-01

**Standing:** Advisory development review evidence only. This is not independent conformance verification, owner approval, normative adoption, profile qualification, interoperability evidence by itself, v0.82 publication, protocol activation, or implementation authority.

**Reviewer provider:** Anthropic

**Reviewer model:** `claude-fable-5-1` (session-configured identifier; serving model not independently verifiable from inside the reviewer session)

**Reviewer family:** Claude (Anthropic)

**Reviewer operator:** Cowork cloud session under the proposal author's account. Operational independence was not established; EAR-AGENT-001 remains open.

**Review started:** 2026-09-04T16:12:24Z

**Review completed:** 2026-09-04T16:16:53Z

**Exact reviewed head:** `792c6355fe8e78955ad829a3455be1e78c0b0a33`

**Verdict:** HOLD

## Sealed inputs

The reviewer reports reviewing these files at the exact head above:

- `decisions/R23_Layer3_Interoperability_Semantics_Proposal.md`
- `docs/v082/V82-01_L3_INTEROPERABILITY_WORK_PACKET.md`
- `schemas/provisional/l3/l3-interoperability-0.1-proposed.json`
- `fixtures/provisional/l3-interoperability/cases.json`
- `conformance/runner/l3-interoperability-compare.mjs`
- `conformance/runner/test/l3-interoperability-provisional.test.mjs`
- `docs/v082/V82-01_L3_MIGRATION_NOTES.md`
- `docs/v082/V82-01_IMPLEMENTATION_EVIDENCE_TEMPLATE.md`
- `docs/ecosystem/AMBIGUITY_REGISTER.md`

The reviewer also consulted the current master standard, permanent requirement registry, layer contracts, R13/R15/R16/R22-related controlling material, shared GKX definitions, governance text, review packet, and runner package as applicable.

## Reviewer summary

The reviewer found the R23 decision direction and claim discipline generally sound but held advancement because the evidence layer was not yet sufficient. The principal blocking issue was that the 18-case fixture file was a catalog rather than an executable portable fixture tranche. Seven major findings identified bounded semantic or comparator gaps that could allow implementations to diverge while remaining apparently R23-consistent.

Counts reported by reviewer:

- BLOCKING: 1 (`R23-REV-001`)
- MAJOR: 7 (`R23-REV-002` through `R23-REV-008`)
- MINOR: 5 (`R23-REV-009` through `R23-REV-013`)
- EDITORIAL: 2 (`R23-REV-014`, `R23-REV-015`)

## Finding register

### R23-REV-001 — BLOCKING — executable fixture tranche

The 18 cases lacked exact input records, expected portable meaning, expected diagnostic/success class, mismatch classification, requirement references, schema validation, and migration/adversarial instances. The reviewer concluded R23 §6 evidence gate items 2–3 were not met.

### R23-REV-002 — MAJOR — core vocabulary distinguishability

The proposal required extensions to remain distinguishable from core relations but did not enumerate the candidate core or reserve a core namespace. Relation properties were carried per record, permitting conflicting declarations for one relation type.

### R23-REV-003 — MAJOR — supersession acyclicity

R23 did not itself state that core supersession is directed and acyclic, while the fixture outline expected prohibited-cycle diagnosis.

### R23-REV-004 — MAJOR — authoritative-head policy carve-out

The deployment-policy carve-out could be read to permit timestamp, UUID, lexical, or path ordering that accepted lineage/identity requirements prohibit as authority selectors.

### R23-REV-005 — MAJOR — resolver fidelity

URI identity status was unsettled; resolution state was optional and record-level; ambiguous versus unresolved was undefined; target-resolution default and live-retrieval behavior were unspecified.

### R23-REV-006 — MAJOR — asserted versus derived inverse

The portable contract lacked a marker distinguishing asserted relationships from derived inverse projections; `inverse_of` was not namespace-qualified; receipt treatment for projection materialization was unclear.

### R23-REV-007 — MAJOR — record identity collision

Exact replay and record identity were under-defined, including the case where one record identifier arrives with different canonical content.

### R23-REV-008 — MAJOR — comparator fail-open behavior

The reviewer verified fail-open paths including one-sided missing portable meaning being treated as equivalent, implementation-self-declared allowed variation, and duplicate result IDs silently overwriting earlier rows.

### R23-REV-009 — MINOR — preserve all distinct lifecycle concepts

R23 named contradiction/correction/supersession but did not explicitly carry rejection, withdrawal, deletion, and governed erasure into the decision/comparator preservation language.

### R23-REV-010 — MINOR — reuse GKX definitions

The provisional schema loosened existing GKX shapes for epistemic state, actors, evidence references, and timestamps and lacked constraints for incompatible relation-property combinations.

### R23-REV-011 — MINOR — migration fail-safety

Migration wording could be narrowed to prohibit synthesized identities, default legacy unresolved references safely, preserve historical record identity, classify wikilinks as locators, and map existing GKX actor/epistemic shapes explicitly.

### R23-REV-012 — MINOR — committee wording

The work packet referred to “committee recommendations” although no formal consensus committee exists under current governance.

### R23-REV-013 — MINOR — comparator execution semantics

The comparator was limited to two result sets and could exit successfully despite incomplete evidence; tests did not cover the fail-open cases.

### R23-REV-014 — EDITORIAL — property vocabulary wording

R23 said the property vocabulary included values “such as” while the candidate schema closed the set.

### R23-REV-015 — EDITORIAL — CLI/heading cleanup

The reviewer noted a fragile CLI URL guard and an inconsistent R23 heading level in the Decision Register.

## Preserved ambiguities from reviewer

1. Whether `uri` is intrinsically identity-bearing or a locator was not resolved by the reviewer.
2. Whether relation properties belong per assertion record or per relation type was not resolved by the reviewer.

Both were intentionally left for owner disposition.

## Overall reviewer verdict

`HOLD`

The reviewer stated that the defects were correctable with bounded edits and did not require wholesale rewrite. The hold was based on the incomplete executable evidence path, semantic gaps that could permit silent divergence, and comparator fail-open behavior.

## Provenance note

This repository record preserves the substantive review findings supplied by the owner from the completed reviewer output. The externally supplied review reported per-file SHA-256 values and exact coordinates; those remain part of the owner-supplied review evidence. This preservation commit does not retroactively make the review operationally independent.