# Classifier amendment adoption and Engine handoff

Status: draft work packet, non-qualifying. Date: 2026-09-21.

## What this branch supplies

- A proposed development decision with three explicit owner policy choices.
- Proposed contract text and traceability to existing authority.
- Strict draft preset/evaluation schemas and portable schema boundary fixtures.
- A semantic fixture backlog kept distinct from executed schema checks.
- Navigation links without modifying immutable releases or active allocations.

## Work remaining before normative adoption

1. Resolve Q1–Q3 in the proposed decision and revise exact candidate text.
2. Review the candidate's scope, authority and compatibility. Preserve actual
   findings and reviewer identity; do not label author tests independent review.
3. Complete request, applicability, matrix-result and patch exchange bindings;
   adapt existing Decision Record/effect schemas without duplicate authority.
4. Allocate atomic requirement IDs and failure codes through the owner decision;
   update permanent registry, diagnostic registry and profile applicability.
5. Implement portable semantic fixtures in the Standard runner, including every
   materially distinct mandatory failure. The backlog is not execution evidence.
6. Promote the accepted contract to the normative annex surface and update master,
   layer interfaces and Specialized Agent Framework with exact references.
7. Run repository gates and record adoption, limitations and rollback route.
   Any release remains a separate publication decision.

## Rust and TypeScript implementation handoff

| Sequence | Shared work | Evidence needed |
| --- | --- | --- |
| 1 | Strict envelope validation and pure matrix evaluation | Same captured input and fixed time/IDs yield canonical parity. |
| 2 | Authorized projection and inference worker | Processing boundary, injection, timeout, unsupported-task and isolation tests. |
| 3 | Immutable evaluation store and dependency index | Reuse succeeds only with complete applicable bindings. |
| 4 | Per-record review and decision integration | Qualified independent role, grant/lease and human escalation evidence. |
| 5 | Managed-field writer | CAS, current admission, idempotency, durable receipts and recovery. |
| 6 | Scoped deployment activation | Exact implementation/configuration, task metrics, budgets and rollback. |

In TypeScript, extend the existing proposal-only intelligence boundary with a
new contract; do not add arbitrary tags or disposition authority to v1 silently.
In Rust, use core/canonical/governance/receipt boundaries and the existing fixture
harness; inspect the current workspace before assigning files or build commands.
Neither Engine implementation is changed or qualified by this Standard PR.

Start shadow evaluation and reuse before admitting writes. Test managed tags on
copies before protected originals. Each deployment chooses models and thresholds
from measured task evidence; no named vendor or fleet memory-fit assertion is a
Standard requirement.

## Reproducible checks

From `conformance/runner`:

```sh
npm ci
node --test test/classifier-draft-schema.test.mjs
npm test
```

The first test command checks only the draft wire shape and declared mutation
expectations. It does not evaluate semantic authority, rule execution, model
correctness or live effects. CI remains responsible for its declared platform,
dependency, link and Markdown gates.

## Candidate validation record

Local validation on 2026-09-21, Node v24.19.0, Linux:

- Runner suite: 141 passed, 0 failed, 0 skipped.
- Included classifier draft tests: 18 passed (17 portable schema cases plus
  a fixture-standing/unique-ID check).
- Registry lint: no errors or warnings; active allocations unchanged.
- Markdown lint: seven changed/new Markdown files checked, zero issues.
- Four relative links in the new draft documents resolve locally.
- `git diff --check`: passed.

This is author-executed evidence only. CI platform/dependency gates, semantic
fixture execution, independent review, model benchmarks and Engine parity are
not established by these results.
