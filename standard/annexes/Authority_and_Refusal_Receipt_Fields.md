# Annex — Authority, authorized-use, and refusal receipt fields

**Status:** Normative development annex adopted by R16 for
GKOS-2026-08-20 v0.80

<!-- R26 (accepted in part 2026-10-07; v0.83 development line) -->
**Development note:** paragraphs marked R26 in this file's source are
amendments accepted under R26 (accepted in part 2026-10-07; section 7.3) for
the v0.83 development line. They are not part of any published edition and
bind no claim until a later authorized edition publishes them.

## 1. Semantic roles

An Authority Receipt records a grant or delegation. An Authorized Use Record
records a consequential action under asserted authority. A Refusal Receipt
records a mandatory gate closure.

These are semantic roles. One governed record MAY satisfy more than one role
when it carries every required field without collapsing distinct actor,
authority, decision, action, and outcome semantics.

<!-- R26-A13 (accepted 2026-10-07; v0.83 development line) -->
A record satisfies a semantic role when a declared role projection builds
from it a role object that validates against the role's schema. The
implementation MUST declare each role projection it relies on in its
conformance manifest, with identity, version and digest.

<!-- R26-A13 (accepted 2026-10-07; v0.83 development line) -->
A role projection builds the role object in two parts:

1. **Envelope constants.** The projection sets each envelope field that
   the role schema fixes as a constant (`canonical_profile`,
   `artifact_type` and `schema_version`) to that constant. It never reads
   these fields from the source record. No other role element may be set
   by a constant.
2. **Field mappings.** Every other role element in the role object comes
   from exactly one source field, by one of three operations: copy the
   value unchanged; wrap a single value as a one-element set, where the
   role element is a set; or translate an enumerated value through a value
   table declared in the projection. A source value missing from the table
   means the record does not satisfy the role. No other conversion is
   permitted. In particular, a timestamp or identifier is not reformatted.

<!-- R26-A13 (accepted 2026-10-07; v0.83 development line) -->
The role object is a derived view. It adds no fact that the source record
does not state. The role schema validates the role object; the source
record's own schema validates the source record. The source record keeps
its own `artifact_type`, schema and canonical hash. A reference to the
record in its role cites the source record's artifact reference and the
projection's identity, version and digest.

<!-- R26-A13 (accepted 2026-10-07; v0.83 development line) -->
A record that cannot supply a required role element through a field
mapping does not satisfy the role. A dedicated role record is then
required.

<!-- R26-A11 (accepted 2026-10-07; v0.83 development line) -->

### 1.1 Actor identity

<!-- R26-A11 (accepted 2026-10-07; v0.83 development line) -->
A field that takes part in role separation under GKOS-REVIEW-003 or
GKOS-AUTHUSE-004 MUST identify an individual actor with an actor reference:
`actor_id`, `actor_class`, and `identity_provider` where the identifier is
scoped to a provider. A class-only value such as `human` does not identify
an actor.

<!-- R26-A11 (accepted 2026-10-07; v0.83 development line) -->
Two actor references denote the same actor when their `actor_id` values are
equal and their `identity_provider` values are equal or both absent. A
deployment MAY declare, by a versioned policy, that different references
denote the same accountable actor. A declaration can merge actors; it cannot
separate them.

<!-- R26-A11 (accepted 2026-10-07; v0.83 development line) -->
Roles are distinct when their actors are not the same under this rule. If
distinctness cannot be determined, the role-separation check fails closed
with GKOS-GATE-L5-005.

## 2. Authority Receipt

An Authority Receipt MUST identify:

- receipt identity and version;
- issuer and subject;
- grantor and grantee;
- authority source and immutable reference where available;
- permitted action classes;
- typed effect scope;
- purpose, tenant, audience, and sensitivity scope where applicable;
- whether delegation is permitted;
- issue time, validity window, and expiry;
- policy identity, version, and digest;
- revocation locator and status-check method;
- nonce or replay binding;
- proof-of-possession or signature/attestation mechanism; and
- predecessor receipt for delegated authority.

Delegation narrows monotonically. A derived grant cannot widen action, effect,
purpose, audience, sensitivity, or time scope beyond its source.

## 3. Authorized Use Record

An Authorized Use Record MUST identify:

- record identity and schema version;
- action class and target;
- purpose;
- Context Manifest identity, version, digest algorithm, and digest;
- policy and compiler digest-bound references;
- proposing actor;
- reviewer or decision-maker where applicable;
- authorizing actor;
- executor or executing service;
- delegation-chain receipts;
- typed requested and authorized effect scope;
- authority validity at action time;
- action time as captured input;
- outcome and external receipt where available; and
- correction, compensation, rollback, or escalation route.

The Context Manifest hash used at authorization MUST equal the manifest hash
used at action time. Mismatch or inability to evaluate the binding fails
closed.

## 4. Refusal Receipt

A record satisfying the Refusal Receipt role MUST identify:

- receipt identity;
- <!-- R26-A05 (accepted 2026-10-07; v0.83 development line) --> the registered gate code, and every permanent requirement ID that the
  active diagnostic-code registry maps to that code and that applies to the
  refused operation;
- registered diagnostic code;
- evaluated predicate identity and version;
- result;
- digest-bound inputs;
- captured evaluation time;
- proposing, authorizing, or executing actor context as applicable;
- <!-- R26-A05 (accepted 2026-10-07; v0.83 development line) --> the kind of refused operation: `consequential-action` when the refused
  operation is a consequential action (Definitions annex, D-1), whose
  effect scope GKOS-EFFECT-001 governs, and `other` for every other
  operation. This rule does not depend on the gate code, its layer, or
  whether a gate code is present;
- <!-- R26-A05 (accepted 2026-10-07; v0.83 development line) --> for a `consequential-action` refusal, the requested effect scope as
  presented. If the action presented no effect scope, or one that is not
  schema-valid, the record states that defect (`absent` or `invalid`)
  instead, and its digest-bound inputs bind the bytes received (R26-A06).
  For an `other` refusal, neither the requested effect scope nor the defect
  is present;
- <!-- R26-A05 (accepted 2026-10-07; v0.83 development line) --> the refusal effect, which is one of:
  - `block`: the operation was not admitted;
  - `refuse`: a request or artifact was rejected;
  - `rollback`: a partly applied change was reversed before commit;
  - `compensate`: an applied effect was offset by a governed compensating
    action before commit was reported; or
  - `freeze`: a delegation or authority was suspended from authorizing
    further changes;
- <!-- R26-A05 (accepted 2026-10-07; v0.83 development line) --> the escalation route, when the governing requirement routes the case to an
  authorized human. This applies to GKOS-GATE-L4-001 and GKOS-GATE-L4-002
  (GKOS-RETENTION-003), GKOS-GATE-L4-003 (GKOS-DELEGATION-002), and
  GKOS-GATE-L5-005 (GKOS-REVIEW-003); and
- governing policy identity, version, and digest.

A quiet refusal without this evidence does not satisfy a required refusal
fixture.

## 5. Effect scope

“Effect scope” is normative; “blast radius” is an explanatory alias.

Effect scope contains, as applicable:

- resource or object set;
- action/effect class;
- environment or deployment;
- audience or external recipient class;
- sensitivity ceiling;
- temporal validity;
- layer reach;
- reversibility class; and
- maximum affected count or proportion where meaningful.

Requested action scope must be contained within both actor standing and
delegated scope. Unknown, indeterminate, or incomparable required dimensions
fail closed.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->

### 5.1 Containment evaluation

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->
A requested effect scope R is contained in an authorizing scope A when every
applicable dimension passes the presence check and the containment check
below. Evaluation is deterministic and uses the two scope records and
digest-bound policy inputs.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->
**Applicable dimensions.** A dimension is applicable when the effect-scope
schema requires it, when the governing policy declares it required, or when
R or A states it. A dimension that neither scope states and that is not
required is not applicable and is not evaluated.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->
**Presence check.** The presence check runs first, for every applicable
dimension, before any containment comparison. An applicable dimension
absent from R or absent from A is unknown, whichever scope omits it. An
absent dimension is never read as unlimited in A or as not requested in R.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->
**Containment check.** Each applicable dimension present in both scopes is
compared under this table. Where the table gives no order between the two
values, the dimension is incomparable.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->

| Field | R is contained in A when |
| --- | --- |
| `effect_class` | the values are equal, or the governing policy declares, by identity and version, that A's class includes R's class |
| `resources` | each member of R equals a member of A, or matches it under a resource-matching predicate bound by identity, version and digest in the governing policy |
| `environment` | the values are equal |
| `audience` | each member of R is a member of A |
| `sensitivity_ceiling` | R is at or below A under a sensitivity order declared by the governing policy; equal labels are contained |
| `valid_from`, `valid_until` | A's `valid_from` is at or before R's, and R's `valid_until` is at or before A's |
| `layer_reach` | R is less than or equal to A |
| `reversibility` | R is at or below A in the order `reversible`, `compensable`, `irreversible` |
| `maximum_affected_count` | R is less than or equal to A |

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line); meaning of layer_reach per R26 owner answer Q2 -->
`layer_reach` is the highest GKOS layer, from 1 to 7, that an effect may
change. In R it is the highest layer the requested effect may change; in A
it is the highest layer the authority permits an effect to change.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->
GKOS does not define an order over the standard sensitivity labels. Without
a declared order, two different labels are incomparable.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->
An unknown or incomparable applicable dimension fails closed with
GKOS-GATE-L7-003 (GKOS-EFFECT-003). A comparable dimension that is not
contained fails closed with GKOS-GATE-L7-002 (GKOS-EFFECT-002). When both
occur in one evaluation, R26-A09's rule for several conditions applies.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->
Containment is evaluated against the actor's standing and against every
Authority Receipt in the delegation chain, in chain order. Each derived
grant's scope MUST be contained in its predecessor's scope.

<!-- R26-A02 (accepted 2026-10-07; v0.83 development line) -->
An Authorized Use Record's `action_class` is permitted when it equals a
member of the `permitted_action_classes` of every receipt in the chain.
Otherwise the action fails closed with GKOS-GATE-L7-002.

## 6. Existing security foundations

GKOS does not prescribe an unreviewed token format. Implementations SHOULD use
established capability, grant, identity, signing, and revocation mechanisms.
Whatever mechanism is selected must preserve the fields and failure behavior
required by this annex.

## 7. Accepted post-v0.80 authority-interval amendment

R17 defines authority validity as the half-open interval
`valid_from <= evaluation_time < valid_until`. Authority is valid exactly at
`valid_from` and expired exactly at `valid_until`.

Evaluation binds a captured canonical action-evaluation time at the final
admission or commit boundary for the consequential effect. Missing, malformed,
unavailable, or indeterminate required time evidence fails closed under
`GKOS-GATE-L7-001`. This section was adopted by R17 and published with
GKOS-2026-09-03 v0.81. It does not retroactively modify the immutable v0.80
release.

<!-- R26-A03 (accepted 2026-10-07; v0.83 development line) -->

### 7.1 Authority interval sources

<!-- R26-A03 (accepted 2026-10-07; v0.83 development line) -->
The interval in GKOS-AUTHUSE-007 is the Authority Receipt's `valid_from`
and `valid_until`. For delegated authority, the evaluation time MUST lie in
the half-open interval of every receipt in the delegation chain, from the
originating grant to the final grantee. The effective interval is the
intersection of those intervals.

<!-- R26-A03 (accepted 2026-10-07; v0.83 development line) -->
`issued_at` records issuance. It is not a validity bound. "Expiry" in §2
means `valid_until`.

<!-- R26-A03 (accepted 2026-10-07; v0.83 development line) -->
The effect-scope `valid_from` and `valid_until` limit when the effect may
apply. They are a containment dimension under §5.1 and do not replace the
receipt interval.

<!-- R26-A03 (accepted 2026-10-07; v0.83 development line) -->
A receipt whose `valid_from` is not earlier than its `valid_until` grants no
authority. Evaluation against it fails closed with GKOS-GATE-L7-001.
