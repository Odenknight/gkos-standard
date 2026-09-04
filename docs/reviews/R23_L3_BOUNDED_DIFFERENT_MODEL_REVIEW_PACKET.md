# R23 bounded different-model-family review packet

**Status:** PREPARED-NOT-EXECUTED

**Target:** Proposed R23 Layer-3 interoperability semantics and V82-01 portable evidence artifacts.

A completed review must preserve the reviewer identity, model family, exact input
head, input digest or immutable file coordinates, findings, severity, evidence,
verdict, and owner disposition. Different-model-family review is advisory
development evidence and is not independent conformance verification by itself.

## Sealed inputs

At review launch, bind the exact PR head and include:

- `decisions/R23_Layer3_Interoperability_Semantics_Proposal.md`;
- `docs/v082/V82-01_L3_INTEROPERABILITY_WORK_PACKET.md`;
- `schemas/provisional/l3/l3-interoperability-0.1-proposed.json`;
- `fixtures/provisional/l3-interoperability/cases.json`;
- `conformance/runner/l3-interoperability-compare.mjs`;
- `conformance/runner/test/l3-interoperability-provisional.test.mjs`;
- `docs/v082/V82-01_L3_MIGRATION_NOTES.md`;
- `docs/v082/V82-01_IMPLEMENTATION_EVIDENCE_TEMPLATE.md`;
- `docs/ecosystem/AMBIGUITY_REGISTER.md`;
- accepted R13, R15, R16, R22 decisions and the current permanent requirement registry as applicable.

## Mandatory review questions

1. Does the proposal preserve the existing distinction among contradiction,
   correction, supersession, rejection, withdrawal, deletion, and erasure?
2. Does open extension vocabulary remain domain-neutral without allowing an
   extension relation to masquerade as core GKOS semantics?
3. Can inverse projection accidentally create false evidence, duplicate
   authority, or receipt obligations?
4. Does assertion-identity language preserve independent evidence and actors
   while still permitting true idempotent replay?
5. Can resolver precedence ever choose an ambiguous path, alias, basename, or
   external target silently?
6. Are cycle constraints relation-specific and does supersession remain
   protected from cyclic lineage?
7. Does branch preservation avoid an implementation-private authoritative
   tiebreak?
8. Does the provisional schema accidentally make an implementation-specific
   field or storage choice normative?
9. Do fixtures cover positive, negative, boundary, ambiguity, migration, and
   adversarial failure cases adequately?
10. Does the comparator preserve semantic divergences rather than normalize them
    away?
11. Are migration notes fail-safe where historical data lacks actor/evidence or
    identity facts?
12. Do any files overclaim adoption, interoperability, independence, profile
    qualification, or v0.82 publication?

## Required verdict

Use one of:

- `PASS`;
- `PASS_WITH_CORRECTIONS`;
- `HOLD`; or
- `REFUSE`.

Every blocking or major finding requires owner disposition. Accepted corrections
create a successor exact review head and require affected checks plus corrected-
head verification before R23 may be accepted.
