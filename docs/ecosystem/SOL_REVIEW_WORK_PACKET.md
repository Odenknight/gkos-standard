# Sol review work packet — R20/R21 ecosystem drafts

- **Packet ID:** SOL-GKOS-ECO-REVIEW-001
- **Version:** 1.0
- **Prepared:** 2026-09-02
- **Status:** `PREPARED-NOT-EXECUTED`
- **Authority:** R18 bounded different-model-family review rules, R20 public-
  documentation gate, and R21 drafting/review authority
- **Repository:** `Odenknight/gkos-standard`
- **Branch:** `work/r20-r21-ecosystem-20260902`
- **Exact review-input head before this packet:**
  `a80cd4b988b3a966d9619c0e478cdf33403aec99`
- **Standard baseline:** `main` at
  `1f5768fe6b8f847c17030127a3a00e78edf5cd80`
- **Reviewer state:** no Sol reviewer execution, model identity, findings, or
  independent-verification claim is recorded by this packet

## 1. Purpose

This packet is the fixed input and instruction set for a separately executed
Sol review of the R20/R21 decisions and the first ecosystem drafts. The review
must test factual currency, Standard compatibility, authority boundaries,
protocol mappings, fixture sufficiency, and public/private evidence separation.

The review is advisory development evidence. A different model family does not
by itself make the result organizationally independent or a conformance
verification.

## 2. Required reviewer identity record

Before review begins, the executor must record:

- reviewer instance ID;
- model provider, model family, exact model/version identifier, and service or
  runtime version where available;
- operator or orchestration identity;
- review start time;
- input branch and exact commit;
- input file inventory and digest;
- tool and web-access capabilities;
- unavailable sources or limitations;
- assurance that the reviewer did not author the reviewed text; and
- authority grant and expiry.

If the reviewer uses the same model family or materially the same hidden
working context as the drafting path, the review may still be useful but must be
reported as non-independent and cannot satisfy R18's different-model-family
condition.

## 3. Fixed review inputs

The reviewer must inspect the exact versions of:

### Development decisions

- `decisions/R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md`
- `decisions/R21_Ecosystem_Interoperability_Program_Development_Decision_Record.md`
- `decisions/GKOS_Decision_Register.md`
- the existing R15, R16, R17, R18, and R19 Decision Records

### Public and practitioner architecture

- PR #30 at its exact reviewed head when the review is launched;
- `docs/implementation/GKOS_INFRASTRUCTURE_PRACTITIONER_BLUEPRINT.md`;
- `docs/implementation/GKOS_REFERENCE_INFRASTRUCTURE.md` if present on the
  review branch or supplied from PR #30; and
- `ROADMAP.md`.

### Ecosystem control records

- `docs/ecosystem/EXTERNAL_SOURCE_REGISTER.md`;
- `docs/ecosystem/REVIEW_DISPOSITION_REGISTER.md`;
- `docs/ecosystem/AMBIGUITY_REGISTER.md`; and
- `docs/ecosystem/README.md`.

### Protocol and agent-governance drafts

- `docs/ecosystem/bindings/GKOS-MCP-BINDING-0.1-draft.md`;
- `docs/ecosystem/bindings/GKOS-A2A-BINDING-0.1-draft.md`;
- `docs/ecosystem/bindings/GKOS-ACS-CROSSWALK-0.1-draft.md`; and
- `docs/ecosystem/AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md`.

### Deployment and evidence-package drafts

- `docs/ecosystem/MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md`;
- `docs/ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md`; and
- `schemas/provisional/evidence/gkos-conformance-evidence-package-0.1.draft.schema.json`.

### Controlling Standard surfaces

At minimum:

- `standard/00_GKOS_Master_Standard.md`;
- `standard/annexes/Layer_Interface_Contracts.md`;
- `standard/annexes/Conformance_Profiles.md`;
- `standard/annexes/Canonical_Serialization.md`;
- `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md`;
- `standard/annexes/Specialized_Agent_Framework.md`;
- `requirements/REGISTRY.md`;
- `requirements/PROFILE_APPLICABILITY.md`;
- `requirements/DIAGNOSTIC_CODES.json`;
- `schemas/conformance-manifest.schema.json`;
- active fixture manifests; and
- `GOVERNANCE.md` and `VERSIONING.md`.

## 4. External source verification

The reviewer must independently re-open and verify the current official sources
for:

- MCP specification `2026-07-28` and the predecessor `2025-11-25`;
- MCP release/migration description;
- A2A current protocol release, currently recorded as `v1.0.1`;
- OWASP Agent Control Standard current version, currently recorded as `v0.1.1`;
- NIST AI Agent Standards Initiative;
- NCCoE Software and AI Agent Identity and Authorization;
- NIST AI RMF and NIST AI 300-1 where cited;
- Singapore IMDA agentic-governance materials;
- W3C PROV-O, OpenLineage, SPIFFE, Sigstore, and OCI sources where relied upon.

The reviewer must distinguish protocol specifications, SDK releases, service
implementations, announcements, and product features. A secondary article must
not replace an available primary source.

## 5. Review questions

### 5.1 Standard fidelity

For every normative-sounding sentence, determine whether it is:

1. required by the controlling GKOS release;
2. an architecture recommendation;
3. an implementation example; or
4. outside the Standard.

Flag:

- invented requirements or diagnostics;
- implementation behavior represented as Standard text;
- unpublished development behavior represented as v0.80 behavior;
- v0.80 behavior incorrectly described as future or Engine-only;
- conflation of identity, digest, authentication, authorization, review,
  integrity, truth, conformance, and certification;
- mandatory versus optional fail-closed ambiguity; and
- silent changes to R15–R20 authority or profile boundaries.

### 5.2 MCP review

Verify:

- accuracy of the `2026-07-28` stateless lifecycle description;
- correctness of request-carried protocol version and client metadata;
- discovery, header-routing, extension, task, downgrade, and predecessor
  treatment;
- separation of observe/retrieve/propose/write/effect/admin surfaces;
- exact L4–L7 requirements for consequential tools;
- no implication that OAuth or MCP authentication is sufficient authority;
- migration safety from `2025-11-25`; and
- missing attacks or fixture classes.

### 5.3 A2A review

Verify:

- current `v1.0.1` coordinate and stable v1.0 semantics;
- Agent Card, task, message, artifact, status, streaming, polling, push, and
  transport descriptions;
- delegation and attenuation boundaries;
- distinction between task assignment and authority;
- multi-agent actor/owner/operator/reviewer/authorizer/executor separation;
- cancellation, partial effect, unknown outcome, and re-entry handling; and
- missing attacks or fixture classes.

### 5.4 ACS review

Verify:

- current `v0.1.1` version and public-preview standing;
- Instrument, Trace, Inspect, hook, telemetry, OCSF, and AgBOM descriptions;
- current versus planned allow/deny/modify and MCP/A2A behavior;
- guardian identity, compromise, liveness, and self-approval risks;
- trace completeness, sampling, redaction, ordering, and exporter failure;
- separation of runtime hook results from GKOS authority and disposition; and
- missing attacks or fixture classes.

### 5.5 Agent governance

Determine whether the drafts:

- accurately build on the existing Specialized Agent Framework and R18;
- avoid adding an eighth GKOS layer;
- preserve meaningful human accountability;
- distinguish technical autonomy from authority;
- preserve capability lease, expiry, suspension, revocation, and escalation;
- preserve different-model-family and sealed-evidence review requirements;
- handle multi-agent responsibility chains; and
- avoid claiming external-framework adoption or regulatory compliance.

### 5.6 Multi-jurisdiction guidance

Verify that the guidance:

- remains informative and does not provide legal advice;
- records policy, location, transfer, hold, erasure, and conflict evidence;
- does not adopt “most restrictive always wins” as a universal rule;
- routes unresolved mandatory conflict to qualified authorized disposition;
- handles unknown locations without invention;
- includes agent/protocol and telemetry boundaries; and
- identifies missing record fields or adverse fixtures.

### 5.7 Evidence package

Verify:

- use of the existing conformance manifest as semantic root;
- separation of claim, package-manifest, and carrier identity;
- package path and inventory safety;
- deterministic manifest and archive claims;
- protected/external evidence handling;
- raw evidence and environment closure;
- optional signature boundaries;
- schema correctness and ambiguity;
- negative fixture completeness; and
- multi-implementation adoption gate.

### 5.8 Public/private and second-implementation boundary

Search every reviewed file for:

- private repository names;
- internal product names used as public evidence;
- implied private second-implementation candidates;
- unpublished evidence represented as public; and
- claims of independence unsupported by public source, dependency, ownership,
  operational, and fixture evidence.

The only permitted current standing is: **awaiting a public second
implementation**.

## 6. Required adversarial posture

The reviewer must try to falsify the drafts, not merely summarize them. At
minimum attempt to find:

- a false PASS path;
- an authority bypass;
- a protocol-version conflation;
- a valid-signature-but-no-authority case;
- authenticated-but-unauthorized access;
- stale context used after a registry, policy, card, tool, model, or source
  change;
- an omitted contradiction or restriction;
- hidden subdelegation;
- protected-data leakage through logs, counts, errors, metadata, or telemetry;
- partial action represented as complete success;
- missing or forged receipt evidence;
- invalid evidence-package path or digest handling;
- a reviewer that is not actually independent; and
- a private-evidence reference in a public claim.

## 7. Required outputs

The reviewer must produce:

1. a plain verdict;
2. exact reviewer and input coordinates;
3. finding register with severity, evidence, and affected file/section;
4. accepted strengths;
5. errors and overclaims;
6. ambiguities and missing cases;
7. proposed replacement text for every blocking finding;
8. protocol-by-protocol fixture additions;
9. release impact: block v0.81, block only R21 publication, or non-blocking;
10. assessment limitations;
11. raw source-verification record; and
12. digest of the complete review output.

Use finding IDs `SOL-ECO-F-001` and upward. These are review identifiers, not
permanent GKOS requirements or diagnostics.

## 8. Severity and release effect

| Severity | Meaning | Required disposition |
| --- | --- | --- |
| `BLOCKING-V081` | Could make the v0.81 Standard release false, unsafe, internally inconsistent, or improperly authorized | Correct and rerun affected v0.81 gates before RC freeze or publication |
| `BLOCKING-R21` | Material error in protocol, public/private, legal-boundary, or evidence-package guidance | Correct before treating the affected R21 document as a public reviewed draft |
| `MAJOR` | Significant interoperability, security, or claim-boundary defect | Correct or explicitly defer with owner disposition |
| `MINOR` | Bounded clarity, completeness, or maintenance issue | Correct or record accepted limitation |
| `OBSERVATION` | Useful non-defect evidence | Preserve without implying acceptance |

A protocol-draft defect does not automatically block the non-qualifying v0.81
Standard release unless it changes the Standard, release claims, or R20 gates.

## 9. Prohibited actions

The reviewer and executor must not:

- merge, tag, release, publish, deploy, or activate anything;
- write to `main` or another protected branch;
- change repository rules or credentials;
- access or name a private repository as public evidence;
- use production data or credentials;
- enable a writer or consequential effect;
- approve its own review authority or assignment;
- relabel an unsupported, failed, or unevaluated result as PASS;
- allocate a permanent GKOS requirement or diagnostic; or
- claim independent verification without the required basis.

## 10. Completion condition

This packet becomes `EXECUTED` only when all required reviewer identity,
source-verification, finding, output, and digest records exist and the owner has
recorded dispositions. Until then, its standing remains
`PREPARED-NOT-EXECUTED`.
