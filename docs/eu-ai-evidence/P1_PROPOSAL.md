# P1 proposal — documentation traceability and review package

**Status:** Draft for owner review and subsequent specification; informative,
non-normative, and non-qualifying.

**Owner:** mariusTalpos  
**Date:** 2026-09-06  
**Plan:** [PHASES.md](PHASES.md), Phase 1.

## Proposed starting point

Build one small, runnable demonstration showing that a reviewer can identify
the documentation for a fictional AI system, follow a revision, inspect its
supporting evidence, and retrieve a package whose contents can be checked.
Deliberately break the example in controlled ways and show the resulting
diagnostics alongside the successful case.

The first useful outcome is an inspectable answer to: **Which system and
document versions am I reviewing, what evidence supports them, and can I tell
when that evidence is missing, conflicting, or changed?**

This proposal supplies context and scope for the next specification. It does
not select a detailed data model, prescribe new Engine APIs, or authorise
implementation. P2 logging and P3 log instructions remain later work.

## Why this slice

P1 groups three related documentation needs into one exercise. The following
support mapping is a proposed interpretation for this demonstration:

| Target | Proposed contribution | Limit of the demonstration |
| --- | --- | --- |
| Article 11(1): technical documentation and updates | Identify the documented system version and make document revisions and their evidence traceable | Does not assess the substantive adequacy or completeness of Annex IV documentation |
| Article 17(1)(k): documentation and information record-keeping | Maintain an explicit example inventory and expose missing or inconsistent records | Does not establish an operating quality-management system or its complete records |
| Article 21(1): provision of requested information and documentation | Retrieve a declared review selection and package the available material | Does not establish actual cooperation with an authority or satisfaction of its request |

Source rechecked for this draft: [Regulation (EU) 2024/1689, consolidated
27 July 2026](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng),
Articles 11(1), 17(1)(k), and 21(1). Real applicability depends on the system
and operator. This example tests supporting mechanisms, not legal compliance.

## The example we should build

Use a fictional application called **Example AI**, with a declared purpose and
one identifiable system build. No functioning AI model or real customer data
is needed: the subject of the test is its documentation.

Keep the authored material small enough to inspect by hand:

- One system description identifying the fictional system, its purpose, owner,
  and build/version.
- Two revisions of a short dossier. Revision 2 explicitly supersedes revision 1
  and explains a documentation update for that same system build. Document
  revision and system version remain separate identities.
- Two small supporting evidence files, such as a fictional evaluation summary
  and a review note, with explicit references from the appropriate dossier
  revision. Their contents are examples, not actual validation results.
- One declared inventory and review request identifying the required records,
  evidence, requested revision, reviewer, and permitted access scope.

The original revision remains available as history. The reviewer should be
able to distinguish an explicitly requested historical revision from the
current revision. A later timestamp alone should not silently decide which
document is current when the references are ambiguous.

Use a local directory as the initial source and package carrier. The host
provides files and storage; the report attributes inspection, selection,
binding, and verification to the component that actually performs each step.

## What the owner should see

Run the valid example first, then reset to that baseline before each mutation.
Each negative case changes one relevant condition so its outcome is explainable.

| Exercise | Expected visible outcome |
| --- | --- |
| Inspect revision 1 | The system build, document identity, and required evidence resolve to the declared example |
| Introduce revision 2 | Supersession is visible; a current-review request selects revision 2 while revision 1 remains identifiable as history |
| Substitute the wrong system-version reference | The mismatch is exposed; material for another build cannot silently satisfy the request |
| Change a referenced evidence file after capturing its binding | Verification against the original binding fails and identifies the changed item |
| Remove a required evidence file | The report identifies the missing item and does not call the requested package complete |
| Introduce an ambiguous or conflicting revision/reference | The conflict is visible; the workflow does not silently choose a convenient interpretation |
| Retrieve the declared selection | The reviewer receives the specified documents and evidence through the chosen access boundary; any required item unavailable within that scope is reported without exposing protected content |
| Verify a captured package, then alter or remove an inventoried file | The intact package verifies; the changed package fails the relevant inventory or content check |

A successfully detected negative case means the check worked; it does not mean
the damaged dossier passed. Missing observations, unsupported capabilities,
and checks that were not run remain visible and cannot become successful
demonstration results.

The inventory is established before retrieval. Completeness means satisfying
that declared inventory, not merely listing whatever files happened to be
returned. Verification uses the captured bindings rather than regenerating
them from the changed inputs.

## Reuse and the minimum new work

Source inspection identified the following reuse candidates. They have not
been executed or qualified for P1 in preparing this proposal.

| Existing material | Proposed use |
| --- | --- |
| Standard projection and paired graph adapter in `conformance/runner/adapters/gkos-engine.mjs` | Reuse applicable identity and relationship checks; its pair-bounded observations do not establish a complete dossier workflow |
| Engine lineage handling and `test/lineage.test.mjs` | Starting point for supersession, historical identity, and unresolved or ambiguous references |
| Engine navigation context and authorised content retrieval | Candidate paths for selecting and obtaining material within a declared scope; the specification should choose one bounded route |
| [Conformance evidence-package draft](../ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md) | Reuse inventory, content-binding, source-coordinate, and limitation-reporting ideas |

The minimum new work is the fictional example, declared expectations, a thin
demonstration workflow connecting existing functions, and package verification
and reporting where reuse is insufficient. Expected outcomes belong to the
Standard; an Engine adapter supplies observations rather than deciding its
own success.

Prefer a simple **P1 review package**. The existing package draft requires a
conformance manifest and more structure to claim its format; borrowing its
ideas does not make this example a valid GKOS-CEP-0.1 package. Likewise, the
Engine navigation context pack explicitly distinguishes itself from a GKOS
context manifest. Preserve those distinctions.

The earlier [Article 9 findings](../proposals/EU_AI_ACT_ARTICLE_9_GKOS_FINDINGS.md)
and [infrastructure proposal](../proposals/EU_AI_ACT_ARTICLE_9_TEST_INFRASTRUCTURE_PROPOSAL.md)
provide background on evidence honesty and repository responsibilities.
Their risk-management model, generic multi-record protocol, and runner
extensions are not P1 prerequisites. If reuse exposes a gap, describe it in
the specification and propose the smallest addition needed for this example.

**Owner clarification (2026-09-07):** All three P1 milestones evaluate existing
GKOS logic without changing it. New fixtures, example adapters, tests, and
reports may live in separate locations within the forked repositories. Do not
modify existing Engine source, Standard rules, or existing tests to make the
demonstration pass. Report capability gaps and defects; any change to original
logic is separate work requiring an explicit owner request. Example helpers
must remain distinguishable from the capabilities under evaluation.

## Build sequence and deliverables

After the specification and implementation scope are agreed, proceed in three
small steps:

1. **Establish the valid path.** Finalise the example inventory and connect the
   existing inspection and revision functions. Produce an initial readable
   output showing the system, documents, relationships, and evidence.
2. **Expose the failures.** Add the controlled mutations and scoped retrieval
   exercise. Preserve the actual diagnostics and distinguish Engine behavior
   from checks added by the demonstration workflow.
3. **Capture and review.** Assemble the selected material, verify the package,
   repeat the declared checks, and write the short findings report and run
   instructions.

The Standard repository owns the support mapping, example expectations, and
shared report/index. The Engine repository owns Engine-specific examples,
adapters, and implementation tests. Keep one authoritative fixture source and
bind any copies to it; the specification should choose its location.
[PHASES.md](PHASES.md) remains the only phase-status tracker.

The finished deliverable should contain the runnable example and instructions,
positive and negative results, captured review material, an inventory with
content bindings, and a short findings report. Record exact Standard and Engine
commits, fixture and adapter revisions, tool/runtime versions, commands, and
raw outputs sufficient to check the reported conclusions.

## Completion and scope boundaries

P1 is complete only when the agreed exercises have observable results and the
owner has reviewed the evidence. The report must separate Standard-reference
results, actual Engine results, and host/integration results, explaining what
already works, what needed additional integration, and what was not demonstrated.
A mandatory failed or unevaluated exercise prevents completion unless the owner
explicitly agrees to a scope change.

Repeatability claims should identify what was repeated: for example, the same
selected records, content bindings, and substantive outcomes. They must not
imply byte-identical archives, independent verification, or reproduction of an
AI model's behavior unless separately tested.

P1 excludes automatic application logging, production persistence, long-term
retention, a complete Annex IV dossier or quality-management system, Article 9
risk-management implementation, new conformance profiles, and regulatory
submission. It also excludes a dashboard, remote service deployment, signatures,
trusted timestamps, and the full evidence-package distribution design.
Matching recorded digests establishes consistency with captured bytes, not
independent authenticity or historical truth.

## Handoff to the specification

The owner subsequently chose three specifications within P1, beginning with
[P1.1 valid dossier and revisions](specs/01-valid-dossier-and-revisions.md),
followed by [P1.2 failure detection and retrieval](specs/02-failure-detection-and-retrieval.md)
and [P1.3 review-package verification](specs/03-review-package-and-verification.md).
Use this proposal with PHASES.md as their shared context. Together, the specs
should settle the exact fixture structure and identity rules, reused
interfaces and access boundary, required observations and negative cases,
minimal package contents and binding rules, repository ownership, and runnable
acceptance checks. They should explain any capability gap without expanding into
P2, P3, or the earlier Article 9 infrastructure program.

Proposal preparation inspected Standard commit
`90d627d4581a95296132a665184838f9e7dbf2cf` and Engine commit
`e5ea87bf5cf2c9a6300814f26d237249d6fb8693` on their respective
`planning/eu-ai-evidence` branches. These are context coordinates, not P1
execution evidence. No P1 implementation or runtime demonstration was performed
while drafting this document.
