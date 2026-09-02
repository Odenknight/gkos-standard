# Call for a public second GKOS implementation

- **Document ID:** GKOS-PSI-CALL-001
- **Status:** informative R21 draft; not a procurement, certification, funding,
  partnership, or endorsement offer
- **Date:** 2026-09-02
- **Current standing:** awaiting a public second implementation

## 1. Purpose

GKOS needs an implementation developed through a publicly reviewable path that
can expose ambiguities, disagreements, hidden assumptions, and portability
problems that a reference implementation may not reveal.

The goal is not to reproduce the reference implementation line for line. The
goal is to implement the same exact Standard and fixture contracts through an
independently inspectable interpretation path, then publish where the results
agree, diverge, or remain indeterminate.

No private repository or unpublished product is named or implied as the second
implementation.

## 2. What may be implemented first

A candidate may begin with one bounded target:

- Viewer/Projection Profile;
- a GCP-1 through GCP-3 evidence and lineage slice;
- GKOS Core;
- GCP-6 Context-Only Extension;
- an implementation-neutral conformance runner or adapter;
- GKOS Conformance Evidence Package 0.1 verifier; or
- a non-consequential MCP, A2A, or ACS binding pilot.

A bounded implementation is valuable even when it cannot claim a complete
profile, provided its exact scope and limitations are reported honestly.

## 3. Minimum public evidence

A candidate should publish:

- repository and license;
- accountable maintainer or organization;
- exact GKOS release and GKX version;
- implementation language and architecture;
- schemas, policies, and canonicalization behavior;
- source and dependency lock or equivalent closure;
- adapter contract;
- fixture catalog and exact commands;
- raw and human-readable results;
- operating-system/runtime/environment evidence;
- known divergences, failures, skips, unsupported and unevaluated behavior;
- security and protected-data assumptions;
- assessment method and independence claims; and
- reproducible evidence-package material where available.

A public repository alone does not establish independence or conformance.

## 4. Independence dimensions

The project will evaluate independence across at least:

| Dimension | Evidence sought |
| --- | --- |
| Source lineage | Public history showing when and from what inputs the implementation was developed |
| Interpretation | Documented reading of Standard clauses rather than copying reference-implementation behavior as authority |
| Code path | Independent implementation logic or clearly disclosed reused components |
| Dependencies | Exact dependency closure and identification of any reference-implementation dependency |
| Ownership and control | Maintainer, organization, hosting, and release authority separate enough for the claimed independence |
| Operations | Independently operated build and test environment |
| Fixtures | Execution of Standard-owned fixtures without relabeling failed expectations |
| Assessment | Reviewer/assessor identity, methods, conflicts, and limitations |

Independence may be partial. It must be described dimension by dimension rather
than asserted as a single unsupported label.

## 5. Reference implementation use

A candidate may read public reference-implementation documentation, compare
outputs, or reuse a standard adapter. It must disclose that use.

A candidate that invokes the reference implementation's deterministic core may
still be a useful product, adapter, or projection, but that shared execution
path normally prevents it from satisfying the independent-implementation gate
for the same behavior.

## 6. Expected process

1. Select an exact GKOS release and bounded profile or requirement slice.
2. Publish the interpretation and architecture before adjusting behavior to
   match the reference implementation.
3. Pin source, dependencies, policies, schemas, fixtures, and environment.
4. Execute positive, negative, boundary, mutation, and adversarial cases.
5. Preserve all failures and disagreements.
6. Exchange an evidence package with a second tool or reviewer where possible.
7. Submit findings through a public issue or pull request.
8. Allow the GKOS project to classify each result as agreement, implementation
   defect, Standard ambiguity, fixture defect, unsupported behavior, or open
   question.

## 7. What the project will not claim

Participation does not make an implementation:

- GKOS certified;
- NIST, ISO, OWASP, IMDA, MCP, or A2A approved;
- secure, legally compliant, scientifically valid, or fit for a regulated use;
- endorsed by the GKOS project; or
- independently verified unless the exact assessment basis supports that term.

## 8. High-value contribution areas

Particularly useful work includes:

- canonical CBOR and hash interoperability;
- identity and revision separation;
- contradiction and supersession semantics;
- deterministic gate diagnostics;
- Decision Record and context binding;
- protected-disclosure failures;
- exact action-time authority evaluation;
- evidence-package verification;
- Viewer/Projection defect visibility;
- MCP `2026-07-28` integration;
- A2A `v1.0.1` task and artifact exchange; and
- ACS `v0.1.1` observation/control evidence.

## 9. Submission contents

A public implementation report should include:

- candidate name and public repository;
- tested commit and release artifact;
- Standard/GKX/profile target;
- fixture and runner versions;
- complete command transcript;
- result summary and raw evidence;
- divergences and proposed Standard clarifications;
- dependency and security evidence;
- assessment standing;
- limitations; and
- contact route for technical review.

## 10. Current disposition

No candidate has been designated through this document. The project remains
**awaiting a public second implementation**.
