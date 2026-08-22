# Annex — Authority, authorized-use, and refusal receipt fields

**Status:** Normative development annex adopted by R16 for
GKOS-2026-08-20 v0.80

## 1. Semantic roles

An Authority Receipt records a grant or delegation. An Authorized Use Record
records a consequential action under asserted authority. A Refusal Receipt
records a mandatory gate closure.

These are semantic roles. One governed record MAY satisfy more than one role
when it carries every required field without collapsing distinct actor,
authority, decision, action, and outcome semantics.

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
- gate and permanent requirement ID;
- registered diagnostic code;
- evaluated predicate identity and version;
- result;
- digest-bound inputs;
- captured evaluation time;
- proposing, authorizing, or executing actor context as applicable;
- requested effect scope;
- refusal effect;
- escalation route where applicable; and
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
`GKOS-GATE-L7-001`. This section is an accepted unpublished development
amendment and does not retroactively modify the immutable v0.80 release.
