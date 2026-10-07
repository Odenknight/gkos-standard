# GKOS-SPEC-DETAIL-001 — Technical detail gap register

**Status:** Proposed. Informative working register; not normative.

**Date:** 2026-10-07

**Base commit:** `797174485e86cbc250f52ac897d86b226c160622` (`main`)

**Current edition:** GKOS-2026-09-24 v0.82.1 (documentation patch; technical
baseline v0.82; normative population unchanged from v0.81: 62 permanent
requirements, 28 gate codes).

**Prepared by:** worker-claude-F for coordinator Fable-FAC, run
`edit-20261007-v083-consolidation`, packet F. Agent-prepared and self-reviewed;
no independent review has taken place.

**Companion decision record:**
[R26 — Specification detail amendments](../../decisions/R26_Specification_Detail_Amendments_Development_Decision_Record.md)
(Status: Proposed).

## 1. Purpose and method

This register lists places where the current normative surface leaves an
implementer without enough detail to build or test a behavior. Each gap cites
exact `path:line` evidence at the base commit.

The review read the master standard, every file in `standard/annexes/`,
`requirements/REGISTRY.md`, every `requirements/*.json` file,
`requirements/PROFILE_APPLICABILITY.md`, every `schemas/*.json` file,
`conformance/README.md`, `conformance/provisional-requirements/`, and the
reference runner modules that implement canonical, authority, and gate checks.

Rules applied:

- Normative text decides. The reference runner and fixtures are cited as
  evidence of how an implementer read the text, not as an oracle (R12-092, `decisions/R12_Ecosystem_Compatibility_Development_Decision_Record.md:52-61`;
  R13-099, `decisions/R13_Conformance_Honesty_and_Alignment_Proposal.md:30-33`).
- No gap proposes a new permanent requirement ID. Drafted normative text refines
  existing requirements and goes to R26 for owner disposition.
- Layer-3 graph semantics are excluded. They are tracked as `EAR-GRAPH-001..003`
  (`docs/ecosystem/AMBIGUITY_REGISTER.md:19-21`) under R23.
- Other known ambiguities are referenced, not duplicated: agent model-family
  independence (`EAR-AGENT-001`, `docs/ecosystem/AMBIGUITY_REGISTER.md:35`),
  ACS outcome mapping (`EAR-ACS-002`, line 29), and policy conflict across
  jurisdictions (`EAR-JURIS-002`, line 34).
- Fewer, well-evidenced gaps were preferred over a long speculative list.

Resolution classes: `informative-clarification` (drafted here for coordinator
routing), `normative-addition` (drafted in R26 as `R26-Axx`), `schema-change`
(specified in R26 as `R26-Sxx`), `fixture-needed`, and `graphic-needed`. The
class listed at the start of a cell is the primary class.

## 2. Summary

| Measure | Count |
| --- | --- |
| Gaps | 24 |
| Primary class `normative-addition` | 17 |
| Primary class `schema-change` | 3 |
| Primary class `informative-clarification` | 4 |
| Gaps that also need fixtures | 20 |
| Gaps that also need a graphic | 4 |
| Drafted normative amendments in R26 | 18 (`R26-A01..A18`) |
| Specified schema changes in R26 | 7 (`R26-S01..S07`) |

By category: undefined terms 3; requirements without testable criteria 5;
fields not typed or constrained 2; missing state transitions 1; missing error or
refusal semantics 4; missing examples 2; cross-reference gaps 3; schema/prose
mismatches 4.

## 3. Register

| ID | Location | Requirement IDs | Category | Why lacking | Impact on implementers | Resolution class |
| --- | --- | --- | --- | --- | --- | --- |
| GAP-001 | `requirements/REGISTRY.md:65` | GKOS-AUTHUSE-003; GKOS-PROFILE-003; GKOS-DELEGATION-006; GKOS-PROFILE-007 | Undefined terms | "Consequential use", "higher-precedence", "defect-badge-or-refuse" and "materially equivalent" are used but defined solely in the archived v0.76 text. | GCP-7 scope, the Context-Only boundary, and the overdue-exception rule cannot be tested the same way twice. | normative-addition (R26-A01); fixture-needed |
| GAP-002 | `standard/annexes/Authority_and_Refusal_Receipt_Fields.md:98-100` | GKOS-EFFECT-001..003 | Requirements without testable criteria | "Contained within" has no per-dimension rule; sensitivity and reversibility have no declared order. | Two implementations can allow and refuse the same request. | normative-addition (R26-A02); fixture-needed; graphic-needed |
| GAP-003 | `requirements/REGISTRY.md:72` | GKOS-AUTHUSE-003; GKOS-AUTHUSE-007; GKOS-DELEGATION-001 | Undefined terms | Three time windows exist (receipt, effect scope, delegation chain); the requirement does not say which one it tests. | The half-open test can be applied to the wrong interval. | normative-addition (R26-A03); fixture-needed; graphic-needed |
| GAP-004 | `schemas/authority-receipt.schema.json:31-40` | GKOS-AUTHUSE-003 | Missing error or refusal semantics | Revocation status is frozen inside the receipt at `checked_at`; nothing binds a check at action time or bounds its age. | A revoked grant can pass a schema-valid action. | normative-addition (R26-A04); schema-change (R26-S01); fixture-needed |
| GAP-005 | `schemas/README.md:19-22` | GKOS-AUTHUSE-001..007 | Schema/prose mismatches | The active v0.80 Authorized Use Record schema cannot carry GKOS-AUTHUSE-007 evidence; the candidate that can is still labeled unpublished. The Authority Receipt schema omits annex fields. | Implementers cannot tell which Layer-7 schemas a claim against the current edition uses. | schema-change (R26-S01); fixture-needed |
| GAP-006 | `schemas/refusal-receipt.schema.json:6-10` | GKOS-AUTHUSE-005; GKOS-PROFILE-005 | Schema/prose mismatches | The annex requires refusal effect, requested effect scope and escalation route; the schema makes them optional free text and allows one requirement ID per receipt. | Refusal receipts are not comparable across implementations. | normative-addition (R26-A05); schema-change (R26-S02); fixture-needed |
| GAP-007 | `schemas/gkx-common.defs.json:25-34` | GKOS-CANON-007; GKOS-CONTEXT-001; GKOS-AUTHUSE-005 | Fields not typed or constrained | Every digest must claim `GKX-CBOR-1`, so raw source bytes and refused non-canonical input cannot be referenced truthfully. | Digests get mislabeled; verifiers recompute over the wrong bytes. | normative-addition (R26-A06); schema-change (R26-S03); fixture-needed |
| GAP-008 | `standard/annexes/Canonical_Serialization.md:41-48` | GKOS-CANON-001; GKOS-CANON-003; GKOS-CANON-004; GKOS-CONTEXT-003 | Requirements without testable criteria | The JSON Schema data model is encoded as CBOR, but no mapping fixes tags, byte strings, simple values, or how a verifier finds timestamp fields. | Independent encoders can produce different bytes and hashes for the same artifact. | normative-addition (R26-A07); fixture-needed |
| GAP-009 | `standard/annexes/Canonical_Serialization.md:59-66` | GKOS-CANON-001 | Missing error or refusal semantics | No rule covers an unknown `artifact_type` or `schema_version`, and two schemas share one `artifact_type`. | Verifiers may accept, guess, or refuse. | normative-addition (R26-A08); fixture-needed |
| GAP-010 | `standard/annexes/Canonical_Serialization.md:301-314` | GKOS-CANON-001..008 | Missing error or refusal semantics | Twelve refusal conditions map to nine codes without a table; overlapping codes have no precedence rule. The reference verifier emits L6-001 where the registry assigns L6-002. | Gate-code fixtures disagree with real verifiers. | informative-clarification; normative-addition (R26-A09); fixture-needed |
| GAP-011 | `requirements/REGISTRY.md:47` | GKOS-PROFILE-005 and 11 unmapped runtime prohibitions | Requirements without testable criteria | Every normative block must carry "the required registered gate code", but 33 of 62 IDs map to no code, including 11 runtime prohibitions. | Claimants cannot satisfy or test PROFILE-005 for those prohibitions. | normative-addition (R26-A10, owner option); fixture-needed |
| GAP-012 | `schemas/conformance-manifest.schema.json:7` | GKOS-RECEIPT-003; GKOS-CANON-008 | Schema/prose mismatches | Normative text requires the manifest to declare the receipt-binding mechanism and the rendering format and version; the closed schema has no field for either. | A required declaration cannot be made in a schema-valid manifest. | schema-change (R26-S04); fixture-needed |
| GAP-013 | `schemas/decision-record.schema.json:6-16` | GKOS-REVIEW-002; GKOS-REVIEW-004; GKOS-CONTEXT-005 | Schema/prose mismatches | No required proposal or evidence binding, no `escalated` disposition, class-only actor, open properties, loose timestamps and hashes. | GKOS-GATE-L5-004 and L5-006 cannot be evaluated on schema-valid records. | schema-change (R26-S05); fixture-needed |
| GAP-014 | `schemas/gkx-common.defs.json:106-123` | GKOS-REVIEW-003; GKOS-AUTHUSE-004 | Requirements without testable criteria | Two actor models coexist; `actorIdentity` allows the bare value `human`; no rule says when two actors are the same. | Role separation and self-review checks are not decidable. | normative-addition (R26-A11); schema-change (R26-S06); fixture-needed |
| GAP-015 | `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md:9` | GKOS-RECEIPT-001..003 | Fields not typed or constrained | The State-Change Receipt role lists elements in prose; "before/after state binding" and "durability evidence" have no field form. | Whether an existing record satisfies the role is a judgment call. | normative-addition (R26-A12); fixture-needed |
| GAP-016 | `standard/annexes/Authority_and_Refusal_Receipt_Fields.md:12-14` | GKOS-RECEIPT-001; GKOS-AUTHUSE-005 | Requirements without testable criteria | One record may satisfy several roles, but every role schema is closed and fixes its own `artifact_type`. | No single canonical record can validate against two role schemas. | normative-addition (R26-A13); schema-change (R26-S04) |
| GAP-017 | `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md:63` | GKOS-DELEGATION-006 | Missing state transitions | "Overdue" has no deadline field, start event, or evaluation time; the exception is not typed. | GKOS-GATE-L5-001 is tested from a precomputed boolean. | normative-addition (R26-A14); schema-change (R26-S07); fixture-needed; graphic-needed |
| GAP-018 | `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md:25-29` | GKOS-RETENTION-001..003 | Missing error or refusal semantics | The hold-predicate result has no vocabulary; a plain `hold` outcome has no stated behavior or code. | The reference fixture invents `clear`; implementations will differ. | normative-addition (R26-A15); fixture-needed |
| GAP-019 | `standard/annexes/Canonical_Serialization.md:269-272` | GKOS-CONTEXT-004 | Cross-reference gaps | The "governing rule" for required closure is named but no field binds its identity. | GKOS-GATE-L6-009 cannot be reproduced from the manifest alone. | normative-addition (R26-A16); fixture-needed |
| GAP-020 | `schemas/gkx-common.defs.json:39-43` | GKOS-CANON-004 | Missing examples | The schema pattern accepts impossible dates; source-time conversion (offset, precision) has no worked rule or example. | Schema validation passes timestamps the annex prohibits. | informative-clarification; fixture-needed |
| GAP-021 | `requirements/REGISTRY.md:19` | GKOS-IDENTITY-001; GKOS-IDENTITY-002 | Cross-reference gaps | The text scopes to "GKX 2.3" notes, a namespace R14 replaced with GKX 2.0; "newly authored" is not observable in a stored record. | The requirement has no current test subject. | normative-addition (R26-A17); fixture-needed |
| GAP-022 | `standard/annexes/Layer_Interface_Contracts.md:3-5` | All layer-bound IDs | Missing examples | The annex promises ten elements per layer contract and gives two. | Implementers cannot find a layer's obligations and gate codes in one place. | informative-clarification; graphic-needed |
| GAP-023 | `standard/00_GKOS_Master_Standard.md:31-51` | GKOS-DELEGATION-001 | Cross-reference gaps | Two annexes with rule-like text have no status line and are not in the normative surface; DELEGATION-001 depends on one of them. | Implementers cannot tell whether those rules bind a claim. | normative-addition (R26-A18, owner option) |
| GAP-024 | `conformance/README.md:99-101` | GKOS-CONFORMANCE-001; GKOS-CONFORMANCE-002 | Undefined terms | Fixture and report outcome words differ across the registry, README, runner, claims policy and manifest schema. | Reports from different runners are not comparable. | informative-clarification |

## 4. Gap detail

### GAP-001 — Core terms lost from the current surface

- **Evidence.** `requirements/REGISTRY.md:65` (GKOS-AUTHUSE-003 "Consequential
  use"), `requirements/REGISTRY.md:45` (GKOS-PROFILE-003),
  `standard/annexes/Conformance_Profiles.md:12-13`,
  `requirements/REGISTRY.md:42` (GKOS-DELEGATION-006 "higher-precedence"),
  `decisions/R17_Authority_Validity_Interval_Development_Decision_Record.md:51-54`,
  `conformance/provisional-requirements/Viewer-Projection-Profile.md:3`
  ("defect-badge-or-refuse"), `schemas/proposal-envelope.schema.json:30`
  (cites "GKOS v0.76 §7.10").
- **Where the definitions went.** The v0.78 release (commit `b1dcfcc`) moved the
  v0.76 master text to
  `archive/standard/00_GKOS_Master_Standard_pre_gkx2.md`. That text defined
  authority precedence (`archive/standard/00_GKOS_Master_Standard_pre_gkx2.md:50-62`), consequential use
  (`archive/standard/00_GKOS_Master_Standard_pre_gkx2.md:98-105`), materially equivalent proposals
  (`archive/standard/00_GKOS_Master_Standard_pre_gkx2.md:109-114`) and defect-badge-or-refuse
  (`archive/standard/00_GKOS_Master_Standard_pre_gkx2.md:116-129`) as normative (`archive/standard/00_GKOS_Master_Standard_pre_gkx2.md:96`). The archive now says it is not current
  policy or a conformance authority (`archive/README.md:3-5`). The v0.78
  changelog records the namespace change and says nothing about the definitions (`CHANGELOG.md:177-183`). No
  decision withdrew the definitions.
- **Not re-adopted.** The v0.76 "blast radius" definition (`archive/standard/00_GKOS_Master_Standard_pre_gkx2.md:107`)
  measures graph reachability. R16 made "effect scope" normative and "blast
  radius" an explanatory alias
  (`standard/annexes/Authority_and_Refusal_Receipt_Fields.md:84`), so the old
  definition would conflict.
- **Resolution.** R26-A01 re-adopts the four definitions in a definitions annex.
  Fixtures: one GCP-7 refusal case per consequential class, one Viewer case per
  badge, and one materially-equivalent resubmission case.

### GAP-002 — Effect-scope containment

- **Evidence.** `standard/annexes/Authority_and_Refusal_Receipt_Fields.md:82-100`
  lists nine dimensions and says requested scope "must be contained within"
  standing and delegation. `requirements/REGISTRY.md:69-71` (GKOS-EFFECT-001..003).
  The schema types the dimensions (`schemas/gkx-common.defs.json:144-181`) but
  the sensitivity enum (`schemas/gkx-common.defs.json:61-72`) and reversibility enum (`schemas/gkx-common.defs.json:171-174`)
  declare no order. The annex names "maximum affected count or proportion"
  (annex line 96); the schema has a count field and no proportion field (`schemas/gkx-common.defs.json:175-178`). `layer_reach` is
  an integer 1-7 with no stated meaning (`schemas/gkx-common.defs.json:166-170`).
- **Reference behavior.** The gate corpus receives containment as precomputed
  booleans (`conformance/runner/gate-evaluator.mjs:33`) and states it is a
  synthetic predicate interface (lines 8-10). No executable rule exists.
- **Related.** The Authorized Use Record `action_class`
  (`schemas/authorized-use-record.schema.json:20`) and the receipt's
  `permitted_action_classes` (`schemas/authority-receipt.schema.json:23`) have no
  stated membership rule.
- **Resolution.** R26-A02 defines a per-dimension rule, the treatment of absent
  dimensions, and chain-order evaluation. Owner question Q2 covers the
  reversibility order and the meaning of `layer_reach`. Fixtures: one contained
  and one non-contained case per dimension; one incomparable case for sensitivity
  without a declared order (GKOS-GATE-L7-003). Graphic: requested scope inside
  actor standing and each delegation link.

### GAP-003 — Which interval GKOS-AUTHUSE-007 tests

- **Evidence.** `requirements/REGISTRY.md:72` names `valid_from` and
  `valid_until` without saying whose. The Authority Receipt has its own pair
  (`schemas/authority-receipt.schema.json:28-29`); the effect scope has another
  (`schemas/gkx-common.defs.json:164-165`); the annex lists "issue time, validity
  window, and expiry" as three items
  (`standard/annexes/Authority_and_Refusal_Receipt_Fields.md:28`). A delegation
  chain carries one receipt per link
  (`schemas/authorized-use-record.schema.json:30-34`).
- **Reference behavior.** The runner treats `valid_from >= valid_until` as a
  refusal (`conformance/runner/authority-window.mjs:14`); the text does not say
  so.
- **Resolution.** R26-A03: the receipt interval governs; every link must be
  valid; the effective interval is the intersection; the effect-scope window is
  a containment dimension. Fixtures: chain where the leaf is valid and a parent
  has expired; empty interval. Graphic: interval intersection timeline.

### GAP-004 — Revocation status at action time

- **Evidence.** GKOS-AUTHUSE-003 refuses revoked or indeterminate authority at
  action time (`requirements/REGISTRY.md:65`). The receipt embeds
  `revocation.status` and `checked_at`
  (`schemas/authority-receipt.schema.json:31-40`), which describe the time of
  the check, not the time of use. The annex asks for a "revocation locator and
  status-check method" (`standard/annexes/Authority_and_Refusal_Receipt_Fields.md:30`)
  but the schema has no locator. Neither Authorized Use Record schema binds the
  check made at the admission boundary
  (`schemas/authorized-use-record.r17.schema.json:39-41`).
- **Resolution.** R26-A04 requires a check per chain link with a
  policy-declared maximum age; R26-S01 adds the evidence field. Fixtures: stale
  check, missing check, `indeterminate` status, revoked parent link.

### GAP-005 — Current Layer-7 schemas

- **Evidence.** `schemas/README.md:19` lists the v0.80 Authorized Use Record
  schema as active; `schemas/README.md:21-22` label the Authority Receipt schema
  and the R17 Authorized Use Record candidate "accepted unpublished".
  GKOS-AUTHUSE-007 was published in v0.81 (`requirements/REGISTRY.md:72`). The
  v0.80 schema has no evaluation-time field
  (`schemas/authorized-use-record.schema.json:6-13`), although the annex requires
  "authority validity at action time" and "action time as captured input"
  (`standard/annexes/Authority_and_Refusal_Receipt_Fields.md:53-54`). Both
  schemas use `artifact_type` `authorized-use-record`
  (`schemas/authorized-use-record.schema.json:16`,
  `schemas/authorized-use-record.r17.schema.json:18-19`).
- **Annex fields missing from the Authority Receipt schema.** "subject"
  (annex line 21), tenant scope (line 26) and revocation locator (line 30); the
  schema has no `subject` or tenant field and a closed property set
  (`schemas/authority-receipt.schema.json:6-12`, line 45).
- **Resolution.** R26-S01. The status wording in `schemas/README.md` is
  current-state prose that packet E2 may also touch; this gap concerns the
  technical content.

### GAP-006 — Refusal Receipt content

- **Evidence.** The annex requires requested effect scope, refusal effect and
  escalation route (`standard/annexes/Authority_and_Refusal_Receipt_Fields.md:74-76`).
  The schema leaves `requested_effect_scope` and `refusal_effect` optional and
  untyped (`schemas/refusal-receipt.schema.json:6-10`, lines 39-41). The runner
  writes free text into `refusal_effect`
  (`conformance/runner/authority-window.mjs:37`).
- **Cardinality.** The annex requires the "permanent requirement ID" (line 67)
  and the schema allows one (`schemas/refusal-receipt.schema.json:20-23`), but
  `GKOS-GATE-L7-001` and `GKOS-GATE-L5-005` each map to two requirements
  (`standard/annexes/Diagnostic_Code_Registry.md:36`, line 47). R17 asks the
  refusal to cite both "as applicable"
  (`decisions/R17_Authority_Validity_Interval_Development_Decision_Record.md:43-44`);
  the runner keeps one (`conformance/runner/authority-window.mjs:30`).
- **Existing effect vocabulary.** GKOS-PROFILE-005 names block, refusal,
  fail-closed, rollback-before-commit and authority-freeze
  (`requirements/REGISTRY.md:47`); the L4 contract names blocks, refuses, rolls
  back or freezes (`standard/annexes/Layer_Interface_Contracts.md:12`);
  GKOS-RECEIPT-003 adds compensation (`requirements/REGISTRY.md:28`).
- **Resolution.** R26-A05 and R26-S02.

### GAP-007 — Digests over non-canonical bytes

- **Evidence.** `sha256Digest` fixes `canonical_profile` to `GKX-CBOR-1`
  (`schemas/gkx-common.defs.json:25-34`) and `artifactReference` requires it
  (`schemas/gkx-common.defs.json:124-133`). Selection members, closure inputs and refusal inputs all use
  `artifactReference` (`schemas/selection-set.schema.json:34`,
  `schemas/refusal-receipt.schema.json:26-31`). The annex keeps Layer-1 source
  fingerprints separate from canonical hashes
  (`standard/annexes/Canonical_Serialization.md:53-57`, lines 164-166).
- **Reference behavior.** The runner hashes resolved content as UTF-8 text
  (`conformance/runner/canonical.mjs:95`) and labels the result `GKX-CBOR-1`
  (line 86). An input refused under GKOS-GATE-L6-001 has no canonical bytes, yet
  `input_refs` requires at least one canonical digest.
- **Resolution.** R26-A06 and R26-S03 add a `received-bytes` digest basis.

### GAP-008 — Schema data model to CBOR

- **Evidence.** Schemas define the data model encoded as CBOR
  (`schemas/README.md:3-7`). The annex limits encoded values to the data types
  and values the applicable schema permits
  (`standard/annexes/Canonical_Serialization.md:48`) but JSON Schema has no
  notion of CBOR tags, byte strings or simple values. The selection schema
  admits it cannot tell integral floats from integers
  (`schemas/selection-set.schema.json:39-41`).
- **Reference behavior.** The runner decides that a string is a timestamp from
  its key suffix `_at`, `_from` or `_until`
  (`conformance/runner/canonical.mjs:14`) rather than from the schema.
- **Resolution.** R26-A07 fixes the mapping table and requires schema-driven
  field typing. Fixtures: tag-0 timestamp, byte string, `undefined`, integral
  float with `score_type` `float`, timestamp in a field not ending in `_at`.

### GAP-009 — Unknown artifact identity

- **Evidence.** Every payload carries `canonical_profile`, `artifact_type` and
  `schema_version` (`standard/annexes/Canonical_Serialization.md:59-66`), but no
  text says what a verifier does with an unknown pair. Two schemas share
  `authorized-use-record` (GAP-005). Values in use: `authority-receipt`,
  `authorized-use-record`, `refusal-receipt`, `context-manifest`,
  `selection-envelope` (`schemas/selection-set.schema.json:15`); the annex calls
  the last one a "selection-set" reference (`standard/annexes/Canonical_Serialization.md:73`).
- **Resolution.** R26-A08. Informative registry of current pairs (drafted):

  | `artifact_type` | `schema_version` | Schema file |
  | --- | --- | --- |
  | `authority-receipt` | `1.0.0` | `schemas/authority-receipt.schema.json` |
  | `authorized-use-record` | `1.0.0` | `schemas/authorized-use-record.schema.json` |
  | `authorized-use-record` | `1.1.0-development` | `schemas/authorized-use-record.r17.schema.json` |
  | `context-manifest` | `1.0.0` | `schemas/context-manifest.schema.json` |
  | `refusal-receipt` | `1.0.0` | `schemas/refusal-receipt.schema.json` |
  | `selection-envelope` | `1.0.0` | `schemas/selection-set.schema.json` |

### GAP-010 — Canonical refusal condition to gate code

- **Evidence.** The annex lists twelve refusal conditions
  (`standard/annexes/Canonical_Serialization.md:301-314`) and nine L6 codes exist
  (`requirements/DIAGNOSTIC_CODES.json:18-26`). "Non-shortest integer, head, or
  floating-point encoding" could be read as L6-001 ("non-deterministic or
  malformed") or L6-003 ("schema-type encoding")
  (`standard/annexes/Diagnostic_Code_Registry.md:38-40`).
- **Divergence.** The reference verifier decodes with duplicate-key prevention
  and maps any decode error to L6-001, then maps any re-encoding difference,
  including unsorted keys, to L6-001 (`conformance/runner/canonical.mjs:49-55`).
  The registry assigns both conditions to L6-002
  (`standard/annexes/Diagnostic_Code_Registry.md:39`), and the synthetic gate
  corpus returns L6-002 (`conformance/runner/gate-evaluator.mjs:87`).
- **Drafted informative clarification** (proposed for
  `standard/annexes/Canonical_Serialization.md` §12, after line 314):

  > The registered codes for the conditions above are:
  >
  > | Condition | Code |
  > | --- | --- |
  > | Indefinite length; malformed item; non-shortest integer or head; non-preferred float width; prohibited tag, byte string or simple value | GKOS-GATE-L6-001 |
  > | Map keys out of bytewise order; duplicate map key | GKOS-GATE-L6-002 |
  > | Negative zero, NaN or infinity; integer encoded as float; float encoded as integer | GKOS-GATE-L6-003 |
  > | Invalid canonical timestamp | GKOS-GATE-L6-004 |
  > | Invalid UTF-8; non-NFC text | GKOS-GATE-L6-005 |
  > | Absent, null or empty conflated | GKOS-GATE-L6-006 |
  > | Policy, compiler, schema or selection reference mismatch; hash mismatch on replay | GKOS-GATE-L6-007 |
  > | Rendering round-trip failure | GKOS-GATE-L6-008 |

- **Resolution.** Informative table above; R26-A09 adds the specificity rule.
  Fixtures: duplicate-key and unsorted-key byte inputs run through the reference
  verifier, expecting L6-002.

### GAP-011 — Gate-code coverage under GKOS-PROFILE-005

- **Evidence.** GKOS-PROFILE-005 requires executable violation evidence "with
  the required registered gate code" (`requirements/REGISTRY.md:47`). The layer
  annex says every normative block "emits the registered gate code"
  (`standard/annexes/Layer_Interface_Contracts.md:25-27`). The machine registry
  maps 29 of 62 requirement IDs (`requirements/DIAGNOSTIC_CODES.json:5-34`).
  The known-limitations annex already says the 28 gates are not complete
  coverage (`standard/annexes/Known_Limitations_and_Open_Issues.md:10`).
- **Runtime prohibitions with no code.** GKOS-IDENTITY-003 (REGISTRY line 21),
  GKOS-LINEAGE-003 (line 25), GKOS-POLICY-001 (line 29), GKOS-RETENTION-001 and
  -002 (lines 30-31), GKOS-REENTRY-002 and -003 (lines 34-35),
  GKOS-DELEGATION-001 (line 37), GKOS-DELEGATION-005 (line 41),
  GKOS-CONTEXT-002 (line 59), GKOS-AUTHUSE-001 (line 63). Claim-level rules
  (GKOS-CONFORMANCE-*, GKOS-PROFILE-*) are evaluated on claims and are excluded.
- **Resolution.** R26-A10 offers two owner options: allocate codes (changes the
  28-code population) or state the scope rule (keeps it). Fixtures: one
  violation fixture per listed requirement under the chosen option.

### GAP-012 — Conformance manifest declarations

- **Evidence.** GKOS-RECEIPT-003 says "the conformance manifest MUST declare the
  binding mechanism" (`requirements/REGISTRY.md:28`;
  `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md:11`).
  The canonical annex requires the rendering format and version to be declared
  (`standard/annexes/Canonical_Serialization.md:216-218`). The manifest schema
  is closed (`schemas/conformance-manifest.schema.json:136`) and has no field for
  either; `environment` is an untyped object (line 133).
- **Resolution.** R26-S04. Fixture: manifest with and without the declarations.

### GAP-013 — Decision Record schema

- **Evidence.** GKOS-REVIEW-002 binds the disposition to "the proposal and the
  exact evidence reviewed" (`requirements/REGISTRY.md:74`); the schema requires
  neither (`schemas/decision-record.schema.json:6`), and `proposal_hash` is an
  optional loose hash (line 12). GKOS-REVIEW-004 lists an escalation disposition
  (`requirements/REGISTRY.md:76`); the enum has no such value (line 9). `actor`
  accepts the bare class `human` (line 10;
  `schemas/gkx-common.defs.json:106-109`). Times allow offsets (line 11), the
  chain hash is a loose `contentHash` (line 16), and properties are open
  (line 27). The record is not a canonical artifact although GKOS-CONTEXT-005
  binds manifests by canonical hash (`requirements/REGISTRY.md:62`). The runner
  predicate for L5-004 expects proposal and evidence digests the schema lacks
  (`conformance/runner/gate-evaluator.mjs:20`).
- **Ordering.** The annex requires a per-writer sequence number and predecessor
  link for authoritative order
  (`standard/annexes/Canonical_Serialization.md:143-147`); the schema has the
  link (`prev_hash`) but no sequence number.
- **Resolution.** R26-S05.

### GAP-014 — Actor identity and sameness

- **Evidence.** `actorIdentity` is a pattern whose human form is the literal
  `human` (`schemas/gkx-common.defs.json:106-109`); `actorReference` carries
  `actor_id` and a different class list (`schemas/gkx-common.defs.json:110-123`). Proposals, Decision
  Records and assessments use `actorIdentity`
  (`schemas/proposal-envelope.schema.json:20`,
  `schemas/decision-record.schema.json:10`, `schemas/assessment.schema.json:28`);
  Layer-7 records use the second. GKOS-REVIEW-003 and GKOS-AUTHUSE-004 require
  distinct roles (`requirements/REGISTRY.md:75`, line 66). The reference
  predicate compares two opaque strings (`conformance/runner/gate-evaluator.mjs:80`).
- **Not duplicated.** Model-family independence for agent reviewers stays under
  `EAR-AGENT-001`.
- **Resolution.** R26-A11 and R26-S06.

### GAP-015 — State-Change Receipt role elements

- **Evidence.** The role must record "actor, authority, policy, operation,
  before/after state binding, outcome, and durability evidence"
  (`standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md:9`)
  plus actor class and predicate details (line 13). No schema exists
  (`schemas/README.md:9-25`).
- **Resolution.** R26-A12 turns the prose into a field checklist without
  requiring a dedicated object.

### GAP-016 — Satisfying several roles in one record

- **Evidence.** One record "MAY satisfy more than one role"
  (`standard/annexes/Authority_and_Refusal_Receipt_Fields.md:12-14`); a Control
  Receipt, Decision Record or attempted-use record may satisfy the Refusal
  Receipt role (`standard/annexes/Canonical_Serialization.md:316-319`). Each role
  schema fixes its own `artifact_type` and forbids other properties
  (`schemas/refusal-receipt.schema.json:13`, line 44;
  `schemas/authorized-use-record.schema.json:16`, line 57).
- **Resolution.** R26-A13 defines a declared role projection; R26-S04 adds the
  declaration to the manifest.

### GAP-017 — When review becomes overdue

- **Evidence.** `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md:63`;
  R15 says deferred review is "finite and monitored"
  (`decisions/R15_Governed_State_Change_Reentry_and_Bounded_Delegation_Development_Decision_Record.md:52`).
  No schema carries a review deadline. The fixture passes `overdue` as a
  boolean (`fixtures/track-a/cases.json:10`;
  `conformance/runner/gate-evaluator.mjs:17`).
- **Resolution.** R26-A14 defines the deadline rule, start event, evaluation
  time and exception; R26-S07 adds the grant field. Graphic: delegation state
  (active, overdue-frozen, excepted, dispositioned).

### GAP-018 — Hold-predicate results

- **Evidence.** `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md:25-29`;
  "Legal hold overrides routine deletion"
  (`standard/annexes/Security_Privacy_Retention.md:8`). The fixture interface
  uses `clear`, `unavailable`, `indeterminate`
  (`conformance/runner/gate-evaluator.mjs:14`). No text states what happens on a
  plain `hold` result, and GKOS-RETENTION-001 has no code (GAP-011).
- **Not duplicated.** Cross-jurisdiction conflict policy stays under
  `EAR-JURIS-002`.
- **Resolution.** R26-A15.

### GAP-019 — Identity of the closure rule

- **Evidence.** GKOS-CONTEXT-004 refers to "the governing rule against the
  pinned eligible snapshot" (`requirements/REGISTRY.md:61`); the annex calls it
  the deterministic closure rule (`standard/annexes/Canonical_Serialization.md:269-272`).
  The manifest binds `policy_ref` and `compiler_ref`
  (`schemas/context-manifest.schema.json:21-22`) but no field names the rule.
  The runner reads required items from the snapshot itself
  (`conformance/runner/canonical.mjs:76`). The manifest also has a free-text
  `restrictions` list (`schemas/context-manifest.schema.json:57-61`) beside
  `members` of kind `restriction` (`schemas/context-manifest.schema.json:36`).
- **Resolution.** R26-A16.

### GAP-020 — Canonical timestamps: validity and conversion

- **Evidence.** The schema pattern checks digits, not calendar validity
  (`schemas/gkx-common.defs.json:39-43`); `format` is an annotation by default in
  JSON Schema 2020-12. The annex requires valid RFC 3339 values and lineage for
  derived timestamps (`standard/annexes/Canonical_Serialization.md:121-134`). The
  runner adds a calendar check (`conformance/runner/canonical-time.mjs:1-10`).
- **Drafted informative clarification** (proposed for
  `standard/annexes/Canonical_Serialization.md` §6, after line 134):

  > Schema validation of a canonical timestamp checks its shape. A canonical
  > verifier also checks the calendar: `2026-02-29T00:00:00.000000Z` and
  > `2026-04-31T00:00:00.000000Z` are invalid and are refused with
  > GKOS-GATE-L6-004.
  >
  > Converting a received time is a recorded transformation. Converting
  > `2026-10-07T09:30:00.5-04:00` gives `2026-10-07T13:30:00.500000Z`:
  > the offset is applied exactly and the fraction is padded to six digits.
  > A received value with more than six significant fractional digits has no
  > exact canonical form. Truncating it requires a deployment policy with
  > identity and version under GKOS-POLICY-001, and the source value stays
  > preserved as Layer-1 evidence.

- **Resolution.** Informative text above. Fixtures: the two invalid dates, a
  leap-day valid date (`2028-02-29T00:00:00.000000Z`), and the conversion
  example.

### GAP-021 — GKOS-IDENTITY-001 scope

- **Evidence.** `requirements/REGISTRY.md:19` says "newly authored GKX 2.3 note".
  R14 made GKX 2.0 the current machine namespace
  (`decisions/R14_GKX_2_0_Breaking_Machine_Namespace_Development_Decision_Record.md:11-13`);
  R12 had named the continued line GKX 2.3
  (`decisions/R12_Ecosystem_Compatibility_Development_Decision_Record.md:65-70`).
  Frontmatter fixes `gkx_version` to `2.0`
  (`schemas/gkx-frontmatter-2.0.schema.json:8`). `gkx-2.3-validating-projection`
  survives as an Engine profile that must not be inferred from the namespace
  (`conformance/provisional-requirements/version-compatibility.matrix.json:37-41`).
  The UID pattern accepts both v4 and v7 (`schemas/gkx-common.defs.json:6-9`),
  so a stored record cannot show whether it was newly authored.
- **Resolution.** R26-A17 adds a dated interpretation row to the append-only
  registry ledger without changing the original text. Fixture: an authoring
  operation that must emit a UUIDv7.

### GAP-022 — Layer contract contents

- **Evidence.** `standard/annexes/Layer_Interface_Contracts.md:3-5` promises
  purpose, inputs, operations, outputs, invariants, authority boundary,
  prohibited behavior, failure behavior, receipts and re-entry rules per layer;
  the table at lines 7-15 gives two of them: result and blocking invariant.
- **Drafted informative clarification** (proposed as a new section after
  `standard/annexes/Layer_Interface_Contracts.md:15`). It indexes existing
  requirements and codes; it changes no applicability.

  > ### Requirement and gate index by layer (informative)
  >
  > | Layer | Permanent requirements | Registered gate codes |
  > | --- | --- | --- |
  > | L1 | GKOS-REENTRY-001, GKOS-REENTRY-003 | GKOS-GATE-L1-001 |
  > | L2 | GKOS-IDENTITY-001..004 | None registered |
  > | L3 | GKOS-LINEAGE-001..003, GKOS-REENTRY-004 | GKOS-GATE-L3-001 |
  > | L4 | GKOS-POLICY-001, GKOS-RETENTION-001..003, GKOS-DELEGATION-001..003, GKOS-DELEGATION-005 | GKOS-GATE-L4-001..004 |
  > | L5 | GKOS-REVIEW-001..004, GKOS-DELEGATION-006, GKOS-CONTEXT-005 | GKOS-GATE-L5-001..006 |
  > | L6 | GKOS-CANON-001..008, GKOS-CONTEXT-001..004 | GKOS-GATE-L6-001..009 |
  > | L7 | GKOS-AUTHUSE-001..007, GKOS-EFFECT-001..003, GKOS-DISCLOSURE-001, GKOS-RECEIPT-003 | GKOS-GATE-L7-001..007 |
  > | Cross-cutting | GKOS-RECEIPT-001..003, GKOS-REENTRY-002, GKOS-CONFORMANCE-001..003, GKOS-PROFILE-001..007 | Not applicable |
  >
  > Profile attachment is governed by `requirements/PROFILE_APPLICABILITY.md`.
  > GKOS-DISCLOSURE-001 also applies at GCP-4 and above when protected
  > information is processed.

- **Resolution.** Informative text above. Graphic: the seven layers with their
  results, requirement groups and gate codes.

### GAP-023 — Standing of two annexes

- **Evidence.** The master standard's normative surface lists five annexes
  (`standard/00_GKOS_Master_Standard.md:31-51`). `standard/annexes/Security_Privacy_Retention.md:1-11`
  and `standard/annexes/Specialized_Agent_Framework.md:1-7` have no status line
  and are not listed, yet use rule language ("Missing sensitivity fails closed",
  line 3; "MUST identify the layer contract", Specialized Agent Framework
  line 5). GKOS-DELEGATION-001 binds to "the applicable Specialized Agent
  Contract" (`requirements/REGISTRY.md:37`); the term is described solely at
  `standard/annexes/Specialized_Agent_Framework.md:3`. The fixture
  `gcp1-b01-missing-sensitivity` already tests the sensitivity rule
  (`fixtures/corpus/gcp1-b01-missing-sensitivity.md`).
- **Resolution.** R26-A18 offers the owner a standing choice and defines the
  contract term.

### GAP-024 — Outcome vocabulary

- **Evidence.** GKOS-CONFORMANCE-001 uses `UNEVALUATED`
  (`requirements/REGISTRY.md:16`). The conformance README names PASS, FAIL,
  PARTIAL and UNEVALUATED report states and says the runner emits PASS, FAIL,
  KNOWN-DIVERGENCE, SKIP or UNEVALUATED (`conformance/README.md:99-101`). The
  claims policy adds "unsupported" (`conformance/CLAIMS_POLICY.md:32`). The
  manifest schema uses lowercase values without `partial` or `unsupported`
  (`schemas/conformance-manifest.schema.json:103`).
- **Drafted informative clarification** (proposed for `conformance/README.md`
  after line 101):

  > Outcome words have one meaning at each level. A fixture outcome is one of
  > `pass`, `fail`, `skip`, `known-divergence` or `unevaluated`; runner reports
  > print the same words in capitals. PARTIAL is a requirement- or
  > profile-level state: some required fixtures passed and at least one did not.
  > "Unsupported" is a claim-scope statement recorded in the manifest
  > `exceptions` or `limitations`; it is not a fixture outcome and never counts
  > as a pass.

- **Resolution.** Informative text above. No schema change proposed.

## 5. Routing notes for the coordinator

- Drafted informative text in GAP-010, GAP-020 and GAP-022 targets frozen
  annexes. Under D1 it can merge after R25 is accepted and not before, through packet E's
  stacked branch or a later packet.
- GAP-024 text targets `conformance/README.md`, which is not a frozen path.
- Graphic earmarks for GAP-002, GAP-003, GAP-017 and GAP-022 are proposed in
  packet F's `rows.md` for packet D to number.
- All normative and schema items are drafted in R26 and wait for owner
  disposition.
