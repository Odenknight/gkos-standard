# R26 — Specification detail amendments

Status: Accepted in part

**Date:** 2026-10-07

**Acceptance date:** 2026-10-07, by item (section 7.3). The owner accepted
R26-A02, A03, A05–A16 and R26-S01–S07. R26-A01, A04, A17 and A18 stay
proposed until GKOS-Engine reference evidence exists for them.

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor
(accepted in part 2026-10-07; section 7.3)

**Prepared by:** worker-claude-F, an agent running Claude Opus 5.5, for the
run-scoped coordinator Fable-FAC (run `edit-20261007-v083-consolidation`,
packet F), under owner decision D4 of 2026-10-07.

**Development line:** the v0.83 development line opened by R25 (proposed).
R26 cannot be accepted before R25 is accepted. Under owner decision D1, no
amendment below may merge into a frozen path (`requirements/`, `schemas/`,
`fixtures/`, `conformance/runner/`, `standard/annexes/`) until R25 is accepted.

**Input baseline:** `main` at `797174485e86cbc250f52ac897d86b226c160622`.
Current edition GKOS-2026-09-24 v0.82.1 (documentation patch; technical
baseline v0.82; normative population unchanged from v0.81: 62 permanent
requirements, 28 gate codes).

**Evidence:**
[GKOS-SPEC-DETAIL-001 technical detail gap register](../docs/proposals/GKOS-SPEC-DETAIL-001_Technical_Detail_Gap_Register.md)
(gaps `GAP-001..024`, each with exact `path:line` evidence at the input
baseline).

## 1. Purpose

The current normative surface leaves several behaviors without enough detail
to build or test them the same way twice. R26 proposes exact text to close those
gaps for the v0.83 development line. It refines existing permanent requirements
and the annexes and schemas that carry them.

R26 allocates no permanent requirement ID and no gate code. Option A of
R26-A10 would allocate gate codes, and does so solely if the owner selects it.

## 2. Disclosures required by GOVERNANCE.md

- **Evidence and review considered.** Source inspection of the master standard,
  all eleven annexes, the requirement registry and machine mirrors, all active
  schemas, the conformance README, the provisional requirements, the archived
  v0.76 master text, and the reference runner modules. The runner was read as
  evidence of interpretation, not as an oracle (R12-092; R13-099). Each gap and
  citation is in GKOS-SPEC-DETAIL-001.
- **Change class.** Stated per item in sections 4 and 5. Most items are
  normative-compatible clarifications of existing requirements. Items that
  tighten behavior are marked "breaking (bounded)": an implementation that met
  the looser reading could fail the new text. No published qualifying claim is
  affected, because no profile qualifies in the current catalog.
- **Decision and limitations.** No decision has been made. This is a drafted
  proposal. It has not been tested against a second implementation, and
  several items need owner choices (section 7). Drafted text is untested until
  the fixtures listed per item exist and pass.
- **Material conflicts.** The drafting agent works under the owner's supervision
  in the same repository it proposes to amend. It has no independent standing.
  The reference runner diverges from the registry on one mapping (R26-A09); the
  proposal sides with the registry text.
- **Release or rollback route.** Accepted items enter the v0.83 development line
  through R25's amendment path and ship solely in a later, separately authorized
  edition. Published v0.82.1 and all earlier editions stay unchanged at their
  tags. Rollback before release is by a superseding decision record; after
  release, by a later edition. Historical claims stay bound to their editions.
- **Review type.** Self-reviewed by the drafting agent. No advisory or
  independent review has taken place. Section 8 lists the review the owner may
  require before acceptance.

## 3. Scope boundary

R26 does not:

- amend any published edition, release package, tag or archive;
- change any original requirement text in `requirements/REGISTRY.md` (R26-A17
  adds a dated ledger row, as the registry's append-only rule allows);
- settle Layer-3 graph semantics, which remain under R23 and
  `EAR-GRAPH-001..003`;
- settle agent model-family independence (`EAR-AGENT-001`) or cross-jurisdiction
  policy conflict (`EAR-JURIS-002`);
- qualify any profile or support any conformance, certification or consensus
  claim.

## 4. Proposed normative amendments

Each item names its gap, target, change class, exact proposed wording,
compatibility impact and fixtures. All wording is proposed.

### R26-A01 — Definitions re-adopted from v0.76

- **Gap:** GAP-001.
- **Target:** new annex `standard/annexes/Definitions.md`, added to the
  "Normative surface" list in `standard/00_GKOS_Master_Standard.md`.
- **Change class:** normative-compatible. The definitions were normative in
  v0.76 and were moved to `archive/` in v0.78 without a recorded decision; the
  current requirements still use the terms.
- **Proposed wording:**

  > **File title:** Annex — Definitions
  >
  > **Status:** Normative development annex proposed by R26.
  >
  > These definitions re-adopt GKOS v0.76 §4 and §6.1 for current use. The
  > v0.76 "blast radius" definition is not re-adopted; "effect scope" governs
  > under the Authority and Refusal Receipt Fields annex §5.
  >
  > ## D-1 Consequential use
  >
  > An action is consequential when it performs any of these operation classes:
  >
  > - disclosure outside the governed deployment boundary;
  > - a change of sensitivity label;
  > - promotion to the `accepted` epistemic state; or
  > - deletion, tombstoning, or governed erasure of a governed record.
  >
  > A deployment MAY extend this list through a policy with identity and version
  > under GKOS-POLICY-001. It MUST NOT narrow the list.
  >
  > ## D-2 Authority precedence
  >
  > Authority precedence, from highest to lowest, is: constitution; safety and
  > applicable law; security restrictions; authority receipts; accepted
  > governance; deterministic policy; human assertions; agent proposals;
  > similarity and retrieval. A lower-precedence item MUST NOT widen a
  > higher-precedence restriction. "Higher-precedence" in GKOS requirements and
  > annexes refers to this order.
  >
  > ## D-3 Materially equivalent proposal
  >
  > A resubmitted proposal is materially equivalent to a rejected proposal when
  > its evidence-set hash is identical and its proposed state transition is
  > identical, including target identity, patch shape, and input-hash lineage.
  > A materially equivalent proposal inherits the prior rejection's traceability
  > and MUST NOT be treated as a new proposal until new evidence breaks the
  > equivalence.
  >
  > ## D-4 Defect-badge-or-refuse
  >
  > When a Viewer/Projection implementation lacks information that
  > GKOS-PROFILE-007 requires it to show, it MUST either render a visible defect
  > badge or refuse to render the affected element and disclose why. The minimum
  > badge set is `missing-provenance`, `unresolved-contradiction`,
  > `stale-context`, `unverified-sensitivity`, and `incomplete-lineage`. Silent
  > omission does not conform.

- **Compatibility:** restores v0.76 meaning. A v0.78–v0.82.1 implementation that
  read "consequential" more narrowly must reassess before a GCP-7 or
  Context-Only claim. No published edition changes.
- **Fixtures:** one GCP-7 refusal case per D-1 class without valid authority;
  one Context-Only case attempting each D-1 class; one Viewer case per badge;
  one resubmission case for D-3.

### R26-A02 — Effect-scope containment

- **Gap:** GAP-002.
- **Target:** `standard/annexes/Authority_and_Refusal_Receipt_Fields.md`, new
  §5.1 after §5.
- **Change class:** normative-compatible, except the presence rule, which is
  breaking (bounded).
- **Proposed wording:**

  > ### 5.1 Containment evaluation
  >
  > A requested effect scope R is contained in an authorizing scope A when every
  > applicable dimension passes the presence check and the containment check
  > below. Evaluation is deterministic and uses the two scope records and
  > digest-bound policy inputs.
  >
  > **Applicable dimensions.** A dimension is applicable when the effect-scope
  > schema requires it, when the governing policy declares it required, or when
  > R or A states it. A dimension that neither scope states and that is not
  > required is not applicable and is not evaluated.
  >
  > **Presence check.** The presence check runs first, for every applicable
  > dimension, before any containment comparison. An applicable dimension
  > absent from R or absent from A is unknown, whichever scope omits it. An
  > absent dimension is never read as unlimited in A or as not requested in R.
  >
  > **Containment check.** Each applicable dimension present in both scopes is
  > compared under this table. Where the table gives no order between the two
  > values, the dimension is incomparable.
  >
  > | Field | R is contained in A when |
  > | --- | --- |
  > | `effect_class` | the values are equal, or the governing policy declares, by identity and version, that A's class includes R's class |
  > | `resources` | each member of R equals a member of A, or matches it under a resource-matching predicate bound by identity, version and digest in the governing policy |
  > | `environment` | the values are equal |
  > | `audience` | each member of R is a member of A |
  > | `sensitivity_ceiling` | R is at or below A under a sensitivity order declared by the governing policy; equal labels are contained |
  > | `valid_from`, `valid_until` | A's `valid_from` is at or before R's, and R's `valid_until` is at or before A's |
  > | `layer_reach` | R is less than or equal to A |
  > | `reversibility` | R is at or below A in the order `reversible`, `compensable`, `irreversible` |
  > | `maximum_affected_count` | R is less than or equal to A |
  >
  > GKOS does not define an order over the standard sensitivity labels. Without
  > a declared order, two different labels are incomparable.
  >
  > An unknown or incomparable applicable dimension fails closed with
  > GKOS-GATE-L7-003 (GKOS-EFFECT-003). A comparable dimension that is not
  > contained fails closed with GKOS-GATE-L7-002 (GKOS-EFFECT-002). When both
  > occur in one evaluation, R26-A09's rule for several conditions applies.
  >
  > Containment is evaluated against the actor's standing and against every
  > Authority Receipt in the delegation chain, in chain order. Each derived
  > grant's scope MUST be contained in its predecessor's scope.
  >
  > An Authorized Use Record's `action_class` is permitted when it equals a
  > member of the `permitted_action_classes` of every receipt in the chain.
  > Otherwise the action fails closed with GKOS-GATE-L7-002.

- **Compatibility:** implementations that treated an absent authorizing
  dimension as unlimited, or an absent requested dimension as not requested,
  now refuse. Scopes that state every applicable dimension are unaffected.
- **Fixtures:** for each row, one contained and one non-contained case; one
  incomparable sensitivity case with no declared order (expects
  GKOS-GATE-L7-003). Presence cases, each expecting GKOS-GATE-L7-003:
  - policy requires `audience`; A states `audience`; R omits it (the case
    where the omission is in R);
  - policy requires `audience`; R states it; A omits it;
  - policy requires `audience`; neither scope states it;
  - no policy requirement; A states `maximum_affected_count`; R omits it.

  Positive presence case: no policy requirement; neither scope states
  `audience`; every other dimension is contained (expects admission). Also one
  chain where a derived grant widens its predecessor, and one `action_class`
  outside the grant (each expecting GKOS-GATE-L7-002).

### R26-A03 — Authority interval sources

- **Gap:** GAP-003.
- **Target:** `standard/annexes/Authority_and_Refusal_Receipt_Fields.md` §7.
- **Change class:** normative-compatible.
- **Proposed wording:**

  > The interval in GKOS-AUTHUSE-007 is the Authority Receipt's `valid_from`
  > and `valid_until`. For delegated authority, the evaluation time MUST lie in
  > the half-open interval of every receipt in the delegation chain, from the
  > originating grant to the final grantee. The effective interval is the
  > intersection of those intervals.
  >
  > `issued_at` records issuance. It is not a validity bound. "Expiry" in §2
  > means `valid_until`.
  >
  > The effect-scope `valid_from` and `valid_until` limit when the effect may
  > apply. They are a containment dimension under §5.1 and do not replace the
  > receipt interval.
  >
  > A receipt whose `valid_from` is not earlier than its `valid_until` grants no
  > authority. Evaluation against it fails closed with GKOS-GATE-L7-001.

- **Compatibility:** matches the reference runner's empty-interval refusal.
  Implementations that checked the leaf receipt alone must check each link.
- **Fixtures:** leaf valid and parent expired; leaf valid and parent not yet
  valid; empty interval; evaluation time inside the receipt interval but
  outside the effect-scope window (expects GKOS-GATE-L7-002).

### R26-A04 — Revocation status at action time

- **Gap:** GAP-004.
- **Target:** `standard/annexes/Authority_and_Refusal_Receipt_Fields.md` §7;
  schema change R26-S01.
- **Change class:** breaking (bounded). It requires a declared maximum
  revocation-status age.
- **Proposed wording:**

  > Revocation status is part of authority validity under GKOS-AUTHUSE-003. The
  > `revocation` object inside an Authority Receipt states the status at its
  > `checked_at` time. It does not establish the status at a later evaluation
  > time.
  >
  > At the final admission or commit boundary, the implementation MUST hold a
  > revocation check for every receipt in the delegation chain. Each check's
  > `checked_at` MUST NOT be later than the captured evaluation time and MUST
  > NOT be earlier than the evaluation time minus the maximum revocation-status
  > age declared by the governing policy.
  >
  > A missing age declaration, a missing or older check, a `revoked` status, or
  > an `indeterminate` status fails closed with GKOS-GATE-L7-001. The Authorized
  > Use Record MUST bind the checks it relied on.

- **Compatibility:** deployments must declare the age in policy. Records made
  under v0.80 or the R17 candidate schema remain valid historical evidence.
- **Fixtures:** stale check; missing check; `indeterminate`; revoked parent
  link with valid leaf; missing age declaration.

### R26-A05 — Refusal Receipt content

- **Gap:** GAP-006.
- **Target:** `standard/annexes/Authority_and_Refusal_Receipt_Fields.md` §4;
  schema change R26-S02.
- **Change class:** normative-compatible. It types fields the annex already
  requires.
- **Proposed wording** (replaces the bullets "gate and permanent requirement
  ID", "requested effect scope", "refusal effect" and "escalation route where
  applicable"):

  > - the registered gate code, and every permanent requirement ID that the
  >   active diagnostic-code registry maps to that code and that applies to the
  >   refused operation;
  > - the kind of refused operation: `consequential-action` when the refused
  >   operation is a consequential action (Definitions annex, D-1), whose
  >   effect scope GKOS-EFFECT-001 governs, and `other` for every other
  >   operation. This rule does not depend on the gate code, its layer, or
  >   whether a gate code is present;
  > - for a `consequential-action` refusal, the requested effect scope as
  >   presented. If the action presented no effect scope, or one that is not
  >   schema-valid, the record states that defect (`absent` or `invalid`)
  >   instead, and its digest-bound inputs bind the bytes received (R26-A06).
  >   For an `other` refusal, neither the requested effect scope nor the defect
  >   is present;
  > - the refusal effect, which is one of:
  >   - `block`: the operation was not admitted;
  >   - `refuse`: a request or artifact was rejected;
  >   - `rollback`: a partly applied change was reversed before commit;
  >   - `compensate`: an applied effect was offset by a governed compensating
  >     action before commit was reported; or
  >   - `freeze`: a delegation or authority was suspended from authorizing
  >     further changes;
  > - the escalation route, when the governing requirement routes the case to an
  >   authorized human. This applies to GKOS-GATE-L4-001 and GKOS-GATE-L4-002
  >   (GKOS-RETENTION-003), GKOS-GATE-L4-003 (GKOS-DELEGATION-002), and
  >   GKOS-GATE-L5-005 (GKOS-REVIEW-003).

- **Applicability check.** Schema validation checks the receipt against the
  operation kind it declares (R26-S02). Whether that declaration is correct is
  a semantic check: each fixture states the evaluated operation, and the
  expected receipt carries the matching operation kind. A GKOS-GATE-L7-002 or
  GKOS-GATE-L7-003 refusal is always a `consequential-action` refusal, because
  those codes arise only from effect-scope evaluation.
- **Compatibility:** a new Refusal Receipt schema version (R26-S02).
  Version 1.0.0 receipts remain valid historical evidence.
- **Fixtures:** an L7-001 refusal citing GKOS-AUTHUSE-003 and
  GKOS-AUTHUSE-007; one refusal per effect value; an L4-003 refusal without an
  escalation route (expects the receipt to be rejected as incomplete).
  Operation-kind cases:
  - L7 action refusal: GKOS-GATE-L7-002 for a disclosure outside the
    deployment boundary, with `requested_effect_scope` (valid);
  - non-L7 action refusal: GKOS-GATE-L5-005 for a promotion to `accepted`
    proposed and reviewed by the same actor, with `requested_effect_scope`
    (valid); the same receipt without it (invalid);
  - gateless action refusal under R26-A10 Option B: GKOS-AUTHUSE-001 cited
    with no gate code, for a deletion whose Authorized Use Record lacks the
    manifest binding, with `requested_effect_scope` (valid); the same receipt
    without it (invalid);
  - L7 action with no presented scope: GKOS-GATE-L7-003 with
    `requested_effect_scope_defect` `absent` (valid);
  - non-action refusal: GKOS-GATE-L6-002 for an artifact with a duplicate map
    key, operation kind `other`, no requested scope (valid); the same receipt
    with a `requested_effect_scope` (invalid);
  - a GKOS-GATE-L7-002 receipt declaring operation kind `other` (invalid).

### R26-A06 — Received-bytes digests

- **Gap:** GAP-007.
- **Target:** `standard/annexes/Canonical_Serialization.md` §8, new paragraph;
  schema change R26-S03.
- **Change class:** normative-compatible.
- **Proposed wording:**

  > A digest-bound reference names the bytes it covers. A `GKX-CBOR-1` digest
  > covers the canonical CBOR payload bytes of a GKOS artifact. Bytes that are
  > not a canonical GKOS artifact, such as received Layer-1 source bytes,
  > resolved selection content, or an input refused before canonical decoding,
  > MUST be referenced by a received-bytes digest: algorithm `sha-256`, basis
  > `received-bytes`, and the lowercase hexadecimal SHA-256 of the exact bytes.
  >
  > An implementation MUST NOT label a received-bytes digest as `GKX-CBOR-1`. A
  > verifier recomputes each digest over the bytes its basis names. A mismatch
  > fails closed with GKOS-GATE-L6-007.

- **Compatibility:** existing references to canonical artifacts are unchanged.
  The reference runner's content digests must change basis.
- **Fixtures:** selection member referencing raw source bytes; mislabeled
  digest (expects L6-007); refusal receipt for malformed CBOR citing a
  received-bytes digest.

### R26-A07 — Schema data model to CBOR

- **Gap:** GAP-008.
- **Target:** `standard/annexes/Canonical_Serialization.md`, new §2.1.
- **Change class:** normative-compatible. It removes an ambiguity in
  GKOS-CANON-001.
- **Proposed wording:**

  > ### 2.1 Schema data model to CBOR
  >
  > GKOS schemas describe the canonical data model in JSON Schema 2020-12
  > terms. A schema-valid value is encoded as follows:
  >
  > | Schema type | CBOR encoding |
  > | --- | --- |
  > | object | map (major type 5) with text-string keys |
  > | array | array (major type 4) |
  > | string | text string (major type 3) |
  > | boolean | simple value 20 or 21 |
  > | null | simple value 22 |
  > | integer | major type 0 or 1; values outside the range those types encode are prohibited |
  > | number that is not declared integer | floating point under §5 |
  >
  > Where a schema permits both integer and floating-point values for one field,
  > a sibling field MUST declare the type, as `score_type` does in the selection
  > envelope. The declared type governs the encoding.
  >
  > GKX-CBOR-1 payloads MUST NOT contain tags (major type 6), byte strings
  > (major type 2), the simple value `undefined`, or other simple values.
  > Canonical timestamps are text strings; tags 0 and 1 are not used. A
  > prohibited tag is GKOS-GATE-L6-001 under the most-specific rule of the
  > Diagnostic Code Registry.
  >
  > A verifier MUST identify timestamp, set-ordered, and numeric-type fields
  > from the applicable schema, not from field names.

- **Compatibility:** an implementation that used tags or byte strings now
  fails. No current schema declares a byte-string field.
- **Fixtures:** tag-0 timestamp (expects L6-001); byte string (expects L6-001);
  `undefined` (expects L6-001); integral float with `score_type` `float`
  encoded as an integer (expects L6-003); a timestamp field whose name does not
  end in `_at`.

### R26-A08 — Unknown artifact identity

- **Gap:** GAP-009.
- **Target:** `standard/annexes/Canonical_Serialization.md` §3.
- **Change class:** normative-compatible.
- **Proposed wording:**

  > A canonical verifier MUST declare the (`artifact_type`, `schema_version`)
  > pairs it supports. It MUST refuse, with GKOS-GATE-L6-001
  > (GKOS-CANON-001), a payload whose `canonical_profile`, `artifact_type`, or
  > `schema_version` is absent, is not a text string, or names a pair outside
  > that set. It MUST NOT validate the payload against another schema version
  > or infer the type from field names.
  >
  > Each (`artifact_type`, `schema_version`) pair identifies one schema. Two
  > schemas MUST NOT share a pair.

- **Compatibility:** the supported set is declared in the conformance manifest
  (R26-S04).
- **Fixtures:** unknown `schema_version`; missing `artifact_type`; payload of a
  known type carrying another type's fields.

### R26-A09 — Most specific gate code

- **Gap:** GAP-010.
- **Target:** `standard/annexes/Diagnostic_Code_Registry.md` §1.
- **Change class:** clarification.
- **Proposed wording:**

  > When one detected condition matches more than one registered code, the
  > implementation MUST emit the code whose condition names the defect most
  > specifically. GKOS-GATE-L6-001 applies to an encoding defect that no other
  > L6 code names. A duplicate or out-of-order map key is GKOS-GATE-L6-002 even
  > when it is detected by re-encoding comparison.
  >
  > When an evaluation detects several independent conditions, the record
  > satisfying the Refusal Receipt role MUST report at least one detected code
  > and SHOULD report every detected code. A fixture MAY list several
  > acceptable codes.

- **Compatibility:** the reference verifier
  (`conformance/runner/canonical.mjs`) maps duplicate and unsorted keys to
  L6-001 and must change, through packet E or a later packet after R25.
- **Fixtures:** duplicate-key bytes and unsorted-key bytes through the
  canonical verifier, each expecting L6-002.

### R26-A10 — Gate-code coverage under GKOS-PROFILE-005 (owner option)

- **Gap:** GAP-011.
- **Target:** `standard/annexes/Diagnostic_Code_Registry.md` §1 and
  `requirements/PROFILE_APPLICABILITY.md` §3.
- **Affected requirements:** GKOS-IDENTITY-003, GKOS-LINEAGE-003,
  GKOS-POLICY-001, GKOS-RETENTION-001, GKOS-RETENTION-002, GKOS-REENTRY-002,
  GKOS-REENTRY-003, GKOS-DELEGATION-001, GKOS-DELEGATION-005,
  GKOS-CONTEXT-002, GKOS-AUTHUSE-001.
- **Option A — allocate codes.** Change class: normative-compatible; changes the
  gate-code population from 28. Proposed wording:

  > Each listed requirement receives one registered gate code at the layer
  > where its violation is detected. The conditions are: rewriting a
  > historical note identity (L2); selecting a lineage successor by timestamp,
  > UUID, lexical order or tiebreak (L3); substituting an undeclared policy or
  > predicate (L4); deletion or disposition committed without the hold
  > predicate, or without its bound result (L4); re-entered source inheriting
  > predecessor standing (L1); re-entry mutating or destroying the predecessor
  > (L1); delegation broader or longer-lived than its source (L4); delegation
  > used as general write authority (L4); live retrieval, model call,
  > navigation, randomness, wall-clock read or mutable lookup during
  > deterministic assembly (L6); Authorized Use Record missing the manifest
  > binding (L7).

  Code numbers are assigned on acceptance; none are reserved by this proposal.
- **Option B — state the scope rule.** Change class: clarification; keeps 28
  codes. Proposed wording:

  > GKOS-PROFILE-005 requires a registered gate code for each condition the
  > active registry lists. A mandatory prohibition without a registered code
  > MUST still block, refuse, roll back or freeze as its requirement states, and
  > MUST leave a record satisfying the Refusal Receipt role that cites the
  > requirement ID with no gate code. Such a requirement is verified by
  > requirement-cited fixtures. It does not count toward registry gate
  > coverage.

  Option B also needs `gate_code` to become conditional in R26-S02.
- **Fixtures:** one violation fixture per affected requirement, expecting the
  new code (Option A) or the requirement ID with no code (Option B).

### R26-A11 — Actor identity and sameness

- **Gap:** GAP-014.
- **Target:** `standard/annexes/Authority_and_Refusal_Receipt_Fields.md`, new
  §1.1; schema change R26-S06.
- **Change class:** breaking (bounded) for records that name a human by class
  alone.
- **Proposed wording:**

  > ### 1.1 Actor identity
  >
  > A field that takes part in role separation under GKOS-REVIEW-003 or
  > GKOS-AUTHUSE-004 MUST identify an individual actor with an actor reference:
  > `actor_id`, `actor_class`, and `identity_provider` where the identifier is
  > scoped to a provider. A class-only value such as `human` does not identify
  > an actor.
  >
  > Two actor references denote the same actor when their `actor_id` values are
  > equal and their `identity_provider` values are equal or both absent. A
  > deployment MAY declare, by a versioned policy, that different references
  > denote the same accountable actor. A declaration can merge actors; it cannot
  > separate them.
  >
  > Roles are distinct when their actors are not the same under this rule. If
  > distinctness cannot be determined, the role-separation check fails closed
  > with GKOS-GATE-L5-005.

- **Compatibility:** legacy sidecars that record `actor: human` remain readable
  but cannot support a GCP-5 role-separation result.
- **Fixtures:** same `actor_id` with different providers (distinct); same
  `actor_id` with one provider absent (distinct); alias policy merging two
  references (same; expects L5-005 when one proposes and the other reviews);
  class-only actor (expects L5-005).

### R26-A12 — State-Change Receipt role elements

- **Gap:** GAP-015.
- **Target:**
  `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md`
  §1.
- **Change class:** normative-compatible.
- **Proposed wording:**

  > A record satisfying the State-Change Receipt role MUST carry, under its own
  > field names:
  >
  > - its identity and version;
  > - the actor, as an actor reference with actor class;
  > - the authority basis reference, when the change requires authority;
  > - the governing policy identity, version and digest, when policy took part;
  > - the deterministic predicate identity and version, when consulted, and
  >   whether a non-deterministic checker increased restrictiveness;
  > - the operation, naming the kind of governed change;
  > - a digest-bound reference to the governed state before the change, absent
  >   for creation;
  > - a digest-bound reference to the governed state after the change, or a
  >   tombstone reference for deletion or erasure;
  > - the outcome: `committed`, `rolled-back`, `compensated`, or `refused`;
  > - the binding mechanism declared in the conformance manifest and the
  >   transaction, journal, or compensation identifier that applied; and
  > - the captured commit or refusal time.

- **Compatibility:** existing records that lack before/after bindings do not
  satisfy the role; a dedicated receipt is then required, as §1 already says.
- **Fixtures:** one record per outcome; a creation without a prior state; an
  erasure with a tombstone reference; a record missing the after-state binding
  (does not satisfy the role).

### R26-A13 — Satisfying a role with an existing record

- **Gap:** GAP-016.
- **Target:** `standard/annexes/Authority_and_Refusal_Receipt_Fields.md` §1.
- **Change class:** clarification.
- **Proposed wording:**

  > A record satisfies a semantic role when a declared role projection builds
  > from it a role object that validates against the role's schema. The
  > implementation MUST declare each role projection it relies on in its
  > conformance manifest, with identity, version and digest.
  >
  > A role projection builds the role object in two parts:
  >
  > 1. **Envelope constants.** The projection sets each envelope field that
  >    the role schema fixes as a constant (`canonical_profile`,
  >    `artifact_type` and `schema_version`) to that constant. It never reads
  >    these fields from the source record. No other role element may be set
  >    by a constant.
  > 2. **Field mappings.** Every other role element in the role object comes
  >    from exactly one source field, by one of three operations: copy the
  >    value unchanged; wrap a single value as a one-element set, where the
  >    role element is a set; or translate an enumerated value through a value
  >    table declared in the projection. A source value missing from the table
  >    means the record does not satisfy the role. No other conversion is
  >    permitted. In particular, a timestamp or identifier is not reformatted.
  >
  > The role object is a derived view. It adds no fact that the source record
  > does not state. The role schema validates the role object; the source
  > record's own schema validates the source record. The source record keeps
  > its own `artifact_type`, schema and canonical hash. A reference to the
  > record in its role cites the source record's artifact reference and the
  > projection's identity, version and digest.
  >
  > A record that cannot supply a required role element through a field
  > mapping does not satisfy the role. A dedicated role record is then
  > required.

- **Compatibility:** none for dedicated role records.
- **Positive fixture: Decision Record to Refusal Receipt.** The source is a
  Decision Record valid under the current open sidecar schema
  (`schemas/decision-record.schema.json`, which permits additional
  properties). Besides its own required fields (`decision_id`, `disposition`
  `rejected`, `decided_at` in canonical form `2026-10-01T14:00:00.000000Z`,
  `actor`), it carries `reviewing_actor` (an actor reference) and the refusal
  fields `gate_code` `GKOS-GATE-L5-003`, `requirement_ids`
  [`GKOS-REVIEW-001`], `predicate_ref`, `input_refs` (the digest-bound
  proposal), `policy_ref`, `operation_kind` `other` (the proposal changes tags
  only) and `refusal_effect` `refuse`. The projection, declared in the
  conformance manifest under R26-S04, is:

  | Role element | Built from | Operation |
  | --- | --- | --- |
  | `canonical_profile` | none | constant `GKX-CBOR-1` |
  | `artifact_type` | none | constant `refusal-receipt` |
  | `schema_version` | none | constant: the R26-S02 version |
  | `receipt_id` | `decision_id` | copy |
  | `gate_code` | `gate_code` | copy |
  | `requirement_ids` | `requirement_ids` | copy |
  | `predicate_ref` | `predicate_ref` | copy |
  | `result` | `disposition` | value table: `rejected` to `refused` |
  | `input_refs` | `input_refs` | copy |
  | `evaluated_at` | `decided_at` | copy |
  | `actor_context` | `reviewing_actor` | wrap as a one-element set |
  | `operation_kind` | `operation_kind` | copy |
  | `refusal_effect` | `refusal_effect` | copy |
  | `policy_ref` | `policy_ref` | copy |

  The role object validates against the R26-S02 Refusal Receipt schema, so
  the record satisfies the role. The source record's `artifact_type` and
  hash are unchanged.
- **Negative fixtures**, each against the same source and projection unless
  stated, and each expected not to satisfy the role:
  - the projection omits the `refusal_effect` mapping (the role object fails
    the role schema under both R26-A10 options, because R26-S02 always
    requires `refusal_effect`);
  - the projection omits the `gate_code` mapping (under R26-A10 Option A the
    role object fails the role schema; under Option B, where R26-S02 makes
    `gate_code` optional, the schema check may pass, but the semantic check
    fails because the source's L5-003 condition requires its registered gate
    code);
  - the source `disposition` is `deferred`, which the value table does not
    list;
  - the source `decided_at` is `2026-10-01T14:00:00Z`, which the source schema
    accepts but the role's canonical timestamp does not, and which the
    projection may not reformat;
  - the projection sets `gate_code` by a constant instead of mapping it (an
    invalid projection declaration);
  - the projection reads `artifact_type` from the source record (an invalid
    projection declaration; the role object would also fail the role
    schema's constant).

### R26-A14 — Overdue review and exceptions

- **Gap:** GAP-017.
- **Target:**
  `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md`
  §6; schema change R26-S07.
- **Change class:** breaking (bounded). Delegations without a deadline rule
  freeze.
- **Proposed wording:**

  > A delegation whose actions require review MUST declare a review deadline: a
  > maximum interval between an action's captured commit time and its review
  > disposition. The grant or the policy it binds carries the deadline.
  >
  > Review of an action is overdue when the captured evaluation time is at or
  > after the action's commit time plus that interval and no review disposition
  > is recorded. A missing deadline, or an unavailable or indeterminate commit
  > time or review status, counts as overdue.
  >
  > While any review under the delegation is overdue, the delegation authorizes
  > no further state change. A refused change emits GKOS-GATE-L5-001.
  >
  > A higher-precedence exception is an Authority Receipt from an authority of
  > higher precedence than the delegation under Annex Definitions D-2. It MUST
  > name the delegation and the overdue condition, carry a `valid_until`, and be
  > bound in the State-Change Receipt role record of each change it permits.

- **Compatibility:** depends on R26-A01 D-2.
- **Fixtures:** evaluation one microsecond before and exactly at the deadline;
  missing deadline; exception from an equal-precedence authority (expects
  L5-001); valid exception.

### R26-A15 — Hold-predicate results

- **Gap:** GAP-018.
- **Target:**
  `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md`
  §3.
- **Change class:** normative-compatible.
- **Proposed wording:**

  > A hold-predicate evaluation returns exactly one of `no-hold`, `hold`,
  > `unavailable`, or `indeterminate`. Deletion or disposition commits solely on
  > `no-hold`.
  >
  > On `hold`, the deletion or disposition MUST NOT commit, and a record
  > satisfying the Refusal Receipt role cites GKOS-RETENTION-001 (gate-code
  > treatment under R26-A10). When a governed erasure obligation also applies,
  > the conflict fails closed with GKOS-GATE-L4-002 and is routed for authorized
  > human disposition. `unavailable` and `indeterminate` fail closed with
  > GKOS-GATE-L4-001 and are routed the same way.
  >
  > The deletion or disposition record binds the predicate identity, version and
  > digest, the result, and the captured evaluation time.

- **Compatibility:** the fixture value `clear` maps to `no-hold`.
- **Fixtures:** one case per result; `hold` with an erasure obligation.

### R26-A16 — Closure rule identity

- **Gap:** GAP-019.
- **Target:** `standard/annexes/Canonical_Serialization.md` §10.2.
- **Change class:** normative-compatible.
- **Proposed wording:**

  > The deterministic closure rule that decides required contradictions,
  > warnings, restrictions and lineage items under GKOS-CONTEXT-004 MUST be a
  > digest-bound component. The Context Manifest `policy_ref`, or a component
  > that `policy_ref` digest-binds, identifies it.
  >
  > The rule evaluates the eligible snapshot named by the selection envelope's
  > `eligible_snapshot_ref` and the captured selection envelope, and nothing
  > else. A required item missing from the manifest `members` fails closed with
  > GKOS-GATE-L6-009.
  >
  > The manifest `restrictions` list is display text. A restriction that governs
  > use MUST also appear in `members` with kind `restriction`.

- **Compatibility:** the reference runner reads required items from the
  snapshot; it must also bind the rule identity.
- **Fixtures:** same snapshot under two closure-rule digests giving different
  required sets; restriction present in `restrictions` but missing from
  `members` (expects L6-009).

### R26-A17 — GKOS-IDENTITY-001 interpretation row

- **Gap:** GAP-021.
- **Target:** `requirements/REGISTRY.md`, append-only status and replacement
  ledger.
- **Change class:** clarification. The original requirement text stays
  unchanged.
- **Proposed ledger row** (date set on acceptance):

  > | (acceptance date) | `GKOS-IDENTITY-001` | Interpretation recorded. "GKX 2.3 note" in the original text denotes a note in the current GKX machine namespace, GKX 2.0 under R14. "Newly authored" means a note whose identity the assessed implementation assigns during the assessed operation; it is tested by authoring-operation fixtures, not by inspecting a stored record. Original text unchanged. | R26-A17 | None |

- **Compatibility:** none. Legacy UUIDv4 identities stay valid under
  GKOS-IDENTITY-002.
- **Fixtures:** an authoring operation that must emit a lowercase UUIDv7; an
  import of a legacy UUIDv4 note that must keep its identity.

### R26-A18 — Standing of two annexes (owner option)

- **Gap:** GAP-023.
- **Target:** status lines of `standard/annexes/Security_Privacy_Retention.md`
  and `standard/annexes/Specialized_Agent_Framework.md`; the master standard's
  normative-surface list.
- **Change class:** clarification (Option A) or normative-compatible
  (Option B).
- **Option A — informative orientation.** Proposed status line for both annexes:

  > **Status:** Informative orientation. Its rules bind a claim solely through the
  > permanent requirements and normative annexes they cite.

- **Option B — normative.** Add both annexes to the normative surface. Each
  rule-like line would then need a requirement allocation in a later decision.
  R26 drafts no new requirement text.
- **Either option, definition for GKOS-DELEGATION-001:**

  > A Specialized Agent Contract is a governed record that carries the elements
  > listed in the Specialized Agent Framework annex: stable identity,
  > accountable owner, competency declaration, layers, input permissions,
  > proposal and write scope, prohibited operations, evidence requirements,
  > versioned dependencies, risk and effect-scope limits, delegation and expiry,
  > evaluation criteria, and suspension and revocation procedure. An
  > "equivalent governed actor contract" carries the same elements under other
  > names.

- **Fixtures:** delegation bound to a contract missing the expiry element.

## 5. Proposed schema changes

Each change creates a new schema version. Earlier versions stay valid for
historical artifacts. All targets are frozen paths and wait for R25.

| ID | Gap | Schema | Change |
| --- | --- | --- | --- |
| R26-S01 | GAP-004, GAP-005 | `authorized-use-record`, `authority-receipt` | Publish one current Authorized Use Record schema (`schema_version` `1.1.0`, from the R17 candidate) and add required `revocation_checks` (receipt reference, status, `checked_at`, method). Add `subject`, `tenant_scope` and `revocation.locator` to the Authority Receipt. Set both README rows to the edition that publishes them. |
| R26-S02 | GAP-006, GAP-011 | `refusal-receipt` | Replace `requirement_id` with set-ordered `requirement_ids` (one or more). Make `refusal_effect` required with the R26-A05 values. Add required `operation_kind` (`consequential-action` or `other`) and optional `requested_effect_scope_defect` (`absent` or `invalid`). When `operation_kind` is `consequential-action`, require exactly one of `requested_effect_scope` and `requested_effect_scope_defect`; when it is `other`, forbid both. When `gate_code` is GKOS-GATE-L7-002 or GKOS-GATE-L7-003, require `operation_kind` `consequential-action`. Require `escalation_route` for L4-001, L4-002, L4-003 and L5-005. Allow `input_refs` to use received-bytes digests. Under R26-A10 Option B, make `gate_code` optional. |
| R26-S03 | GAP-007 | `gkx-common.defs` | Add `receivedBytesDigest` (`algorithm` `sha-256`, `basis` `received-bytes`, `value`). Let `artifactReference.digest` be either digest form. |
| R26-S04 | GAP-012, GAP-016, GAP-009 | `conformance-manifest` | Add `receipt_binding` (mechanism and evidence locator), `canonical_rendering` (format, version, verifier locator and SHA-256), `supported_artifact_schemas` (pairs), and `role_projections` (role, role schema version, source schema, projection identity, version and digest; the field mappings and value tables under R26-A13). |
| R26-S05 | GAP-013 | `decision-record` | Add a canonical version with `canonical_profile`, `artifact_type`, `schema_version`; required `proposal_ref` and set-ordered `evidence_refs`; `deciding_actor` as an actor reference; `escalated` disposition; canonical timestamps; `predecessor_ref` and per-writer `sequence`; closed properties. Keep the current sidecar schema for legacy records. |
| R26-S06 | GAP-014 | `proposal-envelope`, `decision-record`, `assessment` | Replace `actorIdentity` with `actorReference` in new versions. Keep `actorIdentity` for legacy sidecars. |
| R26-S07 | GAP-017 | `authority-receipt` | Add optional `review_deadline_seconds` (integer, at least 1), required when the grant permits delegated actions that need review. |

## 6. Informative clarifications routed separately

GKOS-SPEC-DETAIL-001 drafts informative text for GAP-010 (condition-to-code
table), GAP-020 (timestamp validity and conversion example), GAP-022 (layer
index) and GAP-024 (outcome vocabulary). They need no decision record. The
coordinator routes them; those aimed at frozen annexes wait for R25.

## 7. Owner questions

- **Q1 (R26-A01).** Should D-1 add a fifth class for effects on external
  systems through a tool or service? v0.76 did not list one; GCP-7 practice
  implies it.
- **Q2 (R26-A02).** Confirm the reversibility order and the reading of
  `layer_reach` as the highest layer an effect may change. Confirm that the
  sensitivity order stays deployment-declared. Confirm the presence rule: a
  dimension stated in only one scope is unknown and fails closed.
- **Q3 (R26-A04).** Require a policy-declared maximum revocation-status age, or
  allow a check bound to the same admission transaction instead?
- **Q4 (R26-A10).** Option A (allocate codes) or Option B (scope rule)?
- **Q5 (R26-A18).** Option A or Option B? Under Option A, should "Missing
  sensitivity fails closed" move into a normative annex, since a GCP-1 fixture
  already tests it?
- **Q6 (R26-S05).** Introduce the canonical Decision Record in v0.83, or keep it
  for a later edition?

### 7.1 Owner answers (2026-10-07)

The Founder and Initial Editor answered Q1–Q6 on 2026-10-07 in a Claude Code
session with Fable-FAC. These answers choose options. They do not accept R26,
which stays proposed until the section 8 prerequisites are met.

| Question | Owner answer |
| --- | --- |
| Q1 (R26-A01) | Add a fifth D-1 class: effects on external systems through a tool or service. |
| Q2 (R26-A02) | Confirmed: the reversibility order; `layer_reach` as the highest layer an effect may change; sensitivity order stays deployment-declared; the presence rule (a dimension stated in only one scope is unknown and fails closed). |
| Q3 (R26-A04) | Require a policy-declared maximum revocation-status age. |
| Q4 (R26-A10) | Option A: allocate registered gate codes. Under the v0.83 line, the gate-code population grows from 28. |
| Q5 (R26-A18) | Option A: both annexes become informative orientation. Move "Missing sensitivity fails closed" into a normative annex, because GCP-1 fixture B01 already tests it. |
| Q6 (R26-S05) | Introduce the canonical Decision Record in v0.83. Legacy sidecars stay valid. |

The owner also directed that the chosen items be implemented on the v0.83
development line as an evidence package for acceptance. Under accepted R25,
normative changes reach `main` only under an accepted Development Decision
Record. The implementation therefore stays on its own branch until the owner
accepts R26.

### 7.2 Owner answers (2026-10-07, second round)

The Founder and Initial Editor answered the questions the implementation
raised on 2026-10-07, in a Claude Code session with Fable-FAC. Like section
7.1, these answers choose options. They do not accept R26, which stays
proposed until the section 8 prerequisites are met for each item accepted.

| Question | Owner answer |
| --- | --- |
| Acceptance scope (section 8) | R26 will be accepted by item. R26-A01, R26-A04, R26-A17 and R26-A18 stay proposed until GKOS-Engine reference evidence exists for them. Every other chosen item is a candidate for acceptance on reference-runner evidence. |
| Gate code for the R26-A15 refusal on `hold` | Allocate a new, separate L4 code meaning "disposition refused: active hold", distinct from GKOS-GATE-L4-006. It takes the next free L4 number: GKOS-GATE-L4-009, mapped to GKOS-RETENTION-001. It settles "gate-code treatment under R26-A10" in R26-A15. |
| GCP-6 replay fixture under R26-A06 | Keep the published GCP-6 replay fixture and its preserved evidence as historical evidence, unchanged. The additive 1.1.0 selection-set and context-manifest schemas and the v0.83-line replay fixture (`R26-A06-P-ASSEMBLY-004`, assembled on the 1.1.0 path) stand. |
| Diagnostic registry version label | Confirmed: `1.2.0-development`. |
| R26-A13 source schema | Confirmed: the open sidecar Decision Record schema (`decision-record.schema.json`), as drafted. |

The implementation records these answers on the integration branch
`work/v083-r26-implementation`. GKOS-GATE-L4-009 appears in the
Diagnostic-code registry annex, `requirements/DIAGNOSTIC_CODES.json`,
`requirements/PROFILE_APPLICABILITY.md` and the R26-A15 paragraph of the
Governed state change annex, each under an R26-A15 marker. The published
v0.82.1 edition keeps 62 requirements and 28 gate codes.

### 7.3 Owner acceptance by item (2026-10-07)

The Founder and Initial Editor accepted R26 by item on 2026-10-07. The owner
instructed the acceptance in a Claude Code session with Fable-FAC, which
applied this edit by pull request. The section 8 prerequisites held for every
accepted item:

1. R25 was accepted on 2026-10-07.
2. The owner answered the section 7 questions (sections 7.1 and 7.2).
3. A different-model-family advisory review (OpenAI Codex, GPT family) ran
   over this record and the gap register, and over the implementation in
   three rounds. The dispositions are recorded. The third round recommended
   PASS_WITH_CORRECTIONS, and its one remaining finding (r26-REV-013, R26-A16)
   was corrected before acceptance.
4. Every accepted item has fixtures in the development catalog
   (`fixtures/development/r26/`) that fail on `main` at `8c20b05` and pass
   with the reference implementation. The evidence matrix has 264 rows: 233
   pass, 0 fail, and 31 are not modeled, all in the items that stay proposed.
5. The exact-head repository checks passed on branch
   `work/v083-r26-implementation` at `3e07593`: reference runner 417/417,
   development validator 60/60, registry lint with mutation coverage,
   current-release check, markdownlint, links, Ajv and the ICM map check, and
   pull request CI.

| Item | Disposition |
| --- | --- |
| R26-A02 | Accepted 2026-10-07 |
| R26-A03 | Accepted 2026-10-07 |
| R26-A05 | Accepted 2026-10-07 |
| R26-A06 | Accepted 2026-10-07 |
| R26-A07 | Accepted 2026-10-07 |
| R26-A08 | Accepted 2026-10-07 |
| R26-A09 | Accepted 2026-10-07 |
| R26-A10 | Accepted 2026-10-07 |
| R26-A11 | Accepted 2026-10-07 |
| R26-A12 | Accepted 2026-10-07 |
| R26-A13 | Accepted 2026-10-07 |
| R26-A14 | Accepted 2026-10-07 |
| R26-A15 | Accepted 2026-10-07 |
| R26-A16 | Accepted 2026-10-07 |
| R26-S01 | Accepted 2026-10-07 |
| R26-S02 | Accepted 2026-10-07 |
| R26-S03 | Accepted 2026-10-07 |
| R26-S04 | Accepted 2026-10-07 |
| R26-S05 | Accepted 2026-10-07 |
| R26-S06 | Accepted 2026-10-07 |
| R26-S07 | Accepted 2026-10-07 |
| R26-A01 | Proposed; awaits GKOS-Engine reference evidence |
| R26-A04 | Proposed; awaits GKOS-Engine reference evidence |
| R26-A17 | Proposed; awaits GKOS-Engine reference evidence |
| R26-A18 | Proposed; awaits GKOS-Engine reference evidence |

Acceptance authorizes the accepted items on the v0.83 development line. Their
annex text, schemas, fixtures and reference-runner changes reach `main` by
pull request from the integration branch, without the text of the items that
stay proposed. It publishes no edition, qualifies no profile, and supports no
certification, consensus or endorsement claim (section 10). The published
v0.82.1 edition keeps 62 requirements and 28 gate codes.

## 8. Acceptance prerequisites

The owner may accept R26, in whole or by item, after:

1. R25 is accepted;
2. the owner answers the questions in section 7 for the items accepted;
3. a bounded different-model-family advisory review of this record and the gap
   register, with dispositions recorded;
4. fixtures for each accepted item exist in the development catalog and fail
   before, and pass after, the reference implementation change;
5. exact-head repository checks pass.

## 9. Compatibility and migration boundary

R26 is prospective. It changes nothing in v0.82.1 or earlier editions. Records
made under earlier schema versions stay valid historical evidence. Migration
MUST NOT invent actor, authority, digest, deadline or revocation facts absent
from retained evidence. A record that cannot be migrated is declared
unsupported for the affected profile.

## 10. Authority boundary

Acceptance of R26 would not publish an edition, qualify a profile, close an
`EAR-*` ambiguity, or support certification, consensus or endorsement claims.
It would authorize the listed changes on the v0.83 development line.

## 11. Supersession

R26 supersedes no accepted decision. R26-A01 restores definitions from the
archived v0.76 master standard as current text; the archive itself stays
unchanged.
