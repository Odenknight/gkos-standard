# Multi-jurisdiction deployment guidance

- **Document ID:** GKOS-MJDG-0.1
- **Status:** informative R21 draft; not legal advice, normative GKOS text, or a
  universal conflict-of-laws rule
- **Date:** 2026-09-02
- **GKOS baseline:** GKOS-2026-08-20 v0.80 and applicable merged development
  decisions

## 1. Purpose

GKOS permits deployments to supply explicit, versioned policies when correct
behavior depends on law, contract, sector, organizational risk, or local
practice. This guide provides a recording and control pattern for deployments
where more than one jurisdiction or governing-policy source may apply.

GKOS does not decide which law, regulator, contract, court order, retention
schedule, privilege rule, or organizational policy controls a specific matter.
Those determinations require qualified authority.

## 2. Governing rule

When an applicable mandatory hold, retention, erasure, deletion, disclosure,
transfer, access, or disposition policy is missing, expired, conflicting, or
indeterminate, the affected operation must remain on governed hold or fail
closed as required by the controlling Standard and deployment policy.

“Most restrictive always wins” may be used as a temporary deployment safety
posture, but it must not be represented as a universal legal rule. A more
restrictive policy may itself conflict with a lawful erasure, access,
notification, transfer, preservation, or due-process obligation.

## 3. Four statement classes

### Standard requires

The deployment must use explicit, versioned policies and preserve applicable
hold/disposition evidence. Unavailable or indeterminate mandatory evaluation
and detected hold/erasure conflict fail closed and route for authorized human
disposition.

### Guidance recommends

This document recommends fields, status values, and operational sequencing.

### Implementation example

A records-management system, policy engine, data catalog, privacy platform, or
case-management tool may provide policy evidence, but it does not determine the
law merely by returning an automated result.

### Not in the Standard

The jurisdiction categories, conflict statuses, and example workflow below are
informative. They do not create a legal interpretation or new GCP requirement.

## 4. Information model

A deployment should record separate objects for:

1. **Jurisdiction Assertion:** a claim that a jurisdiction, regulator, legal
   instrument, contract, policy, or schedule may apply.
2. **Governing Policy Record:** the exact policy or rule used by a deterministic
   control.
3. **Location Record:** relevant source, subject, controller, processor,
   storage, processing, execution, recipient, or backup locations.
4. **Transfer Record:** a movement or permitted route between declared
   locations or legal boundaries.
5. **Conflict Record:** a detected incompatibility or indeterminate policy
   result.
6. **Disposition Record:** the authorized decision resolving, narrowing,
   deferring, or escalating the conflict.
7. **State-Change Receipt:** evidence of a committed retention, transfer,
   deletion, hold, reclassification, or disclosure change.

These records may be separate GKX objects or fields in a deployment profile,
provided identities, versions, authority, history, and evidence remain
reproducible.

## 5. Jurisdiction Assertion fields

Recommended fields:

- assertion ID and version;
- subject source/object/task/actor reference;
- asserted jurisdiction or governing instrument;
- assertion type: law, regulation, court/agency order, contract, sector rule,
  records schedule, organizational policy, or other;
- asserting actor and authority;
- evidence locator and digest;
- factual basis, such as location, residency, organizational role, contract, or
  service boundary;
- valid-from and valid-until times;
- confidence or uncertainty as an assertion property, not authority;
- challenged or contested status;
- supersedes/superseded-by references; and
- review and expiry requirements.

A geographic tag supplied by a user, IP lookup, cloud region, model, or vendor
is evidence, not conclusive governing-law authority.

## 6. Location dimensions

Where applicable, distinguish:

- source creation or collection location;
- data-subject or affected-person location;
- controller or accountable organization location;
- processor/service provider location;
- primary storage location;
- backup/archive location;
- processing/inference location;
- agent/tool execution location;
- reviewer/decider location;
- effect target location;
- recipient location; and
- cross-border transfer route.

Unknown location must remain unknown. It must not be silently replaced by the
operator's headquarters, the cloud account region, or the system clock zone.

## 7. Governing Policy Record fields

Recommended fields:

- policy ID and version;
- owner and approving authority;
- policy source and evidence digest;
- affected jurisdictions and instruments;
- scope: source, object, actor, purpose, recipient, operation, effect, or data
  class;
- sensitivity and classification inputs;
- valid time and review date;
- deterministic predicate or executable rule identity;
- result vocabulary;
- precedence or conflict-resolution authority, when lawfully established;
- exception process;
- human escalation authority;
- retention, hold, transfer, disclosure, deletion, erasure, access, or
  notification obligations; and
- supersession and withdrawal history.

A deployment must not silently substitute a model inference or vendor default
for a required governing policy.

## 8. Conflict status vocabulary

Recommended statuses:

| Status | Meaning | Operational treatment |
| --- | --- | --- |
| `CLEAR` | Applicable policies are identified and produce compatible results | Continue subject to all other controls |
| `MORE_RESTRICTIVE_COMPATIBLE` | One policy narrows the permitted operation without creating an unresolved legal conflict | Apply the authorized narrower result and record it |
| `CONFLICT` | Two or more identified policies require incompatible outcomes | Hold/fail closed and route for authorized disposition |
| `INDETERMINATE` | Applicability, authority, facts, or interpretation are insufficient | Hold/fail closed |
| `POLICY_UNAVAILABLE` | Required policy or predicate cannot be obtained or executed | Hold/fail closed |
| `AUTHORITY_UNAVAILABLE` | No competent actor can disposition the issue | Governed hold; no timeout substitution |
| `EXCEPTION_PENDING` | A bounded exception is requested but not yet authorized | Continue hold |
| `RESOLVED` | An authorized disposition identifies the controlling treatment | Execute only inside the exact disposition and validity window |
| `SUPERSEDED` | A later policy or disposition replaces the record prospectively | Preserve history; do not rewrite prior decisions |

## 9. Deterministic evaluation sequence

A deployment may use another equivalent design, but it should be able to show:

1. the exact object, purpose, operation, actor, recipient, and locations;
2. all asserted applicable jurisdictions and policies;
3. policy versions and validity at evaluation time;
4. deterministic policy results;
5. any unknown or conflicting fact;
6. whether the operation would disclose, transfer, retain, delete, erase,
   reclassify, or otherwise change governed state;
7. the conflict status;
8. the authorized human disposition where required;
9. the final action-time re-evaluation; and
10. the receipt and actual outcome.

A non-deterministic system may identify candidate policies or increase
restrictiveness, but it cannot silently decide legal applicability or override
a mandatory hold.

## 10. Hold and erasure conflict

A conflict record should identify:

- object/source identity and revision;
- asserted hold basis and authority;
- asserted erasure/deletion basis and authority;
- policy and predicate versions;
- relevant dates and deadlines;
- protected parties and recipients;
- facts that are missing or contested;
- temporary safeguards;
- authorized decider and required competence;
- disposition, rationale, scope, and expiry; and
- appeal, challenge, or later review route.

No automated system may resolve the conflict merely by choosing the longer
retention period.

## 11. Cross-border transfer

Before a transfer, preserve:

- source and destination identities and locations;
- sender, processor, recipient, and accountable owner;
- purpose and data category;
- sensitivity and restrictions;
- transfer mechanism and governing-policy reference;
- onward-transfer limits;
- retention and deletion obligations;
- encryption, access, and audit evidence where required;
- valid authority and review;
- exact transferred revision or package digest; and
- delivery, refusal, partial delivery, or failure outcome.

An API or agent protocol successfully delivering data is not proof that the
transfer was authorized.

## 12. Agent and protocol considerations

MCP, A2A, and ACS integrations may cross jurisdictional and organizational
boundaries. A binding should not assume that:

- client and server share one legal entity;
- an Agent Card or tool registry identifies all processing locations;
- a cloud endpoint reveals the actual inference or storage region;
- an agent's owner and operator are the same party;
- telemetry may lawfully contain the same data as the operative request;
- a remote agent may retain input indefinitely; or
- authorization to perform a task authorizes every intermediate transfer.

Record the actual known boundary and refuse or escalate where required facts are
unavailable.

## 13. Multi-tenant and mixed-purpose systems

Each purpose, tenant, matter, study, customer, or regulated workflow should
have its own applicable policy and authority references. Shared storage or a
shared agent runtime does not permit cross-purpose reuse.

Derived counts, embeddings, graph edges, caches, logs, and evaluation data may
remain protected even when the original content is not reproduced verbatim.

## 14. Policy change and re-evaluation

When a jurisdiction, instrument, contract, schedule, or deployment policy
changes:

- create a new policy version;
- preserve prior versions;
- record effective and review times;
- identify affected objects, contexts, grants, decisions, and actions;
- re-evaluate only where the adopted policy requires it;
- do not rewrite the facts or decisions that controlled earlier actions; and
- use Layer-1 re-entry when prior outcomes become new evidence.

## 15. Initial fixture plan

| Fixture ID | Scenario | Expected result |
| --- | --- | --- |
| MJ-B01 | One identified applicable retention policy | PASS with policy and receipt evidence |
| MJ-B02 | Compatible policies with a narrower authorized treatment | PASS using exact narrower result |
| MJ-N01 | Required jurisdiction assertion missing | INDETERMINATE; hold |
| MJ-N02 | Required policy unavailable | POLICY_UNAVAILABLE; hold |
| MJ-N03 | Hold and erasure conflict | CONFLICT; human disposition required |
| MJ-N04 | Automated “most restrictive wins” without authority | Refusal |
| MJ-N05 | Transfer destination unknown | Hold/refusal |
| MJ-N06 | Policy expired before action | Refusal |
| MJ-N07 | Model-selected law used without governed policy | Refusal |
| MJ-N08 | Policy change silently rewrites prior disposition | History/lineage failure |
| MJ-N09 | Cross-tenant policy reused | Scope failure |
| MJ-N10 | Telemetry discloses protected payload to another region | Disclosure/transfer failure |
| MJ-A01 | Conflicting location signals | INDETERMINATE; no invented location |
| MJ-A02 | Valid credential but unauthorized cross-border recipient | Refusal |

Fixture IDs are informative and do not allocate permanent GKOS diagnostics.

## 16. Evidence package

A multi-jurisdiction pilot should include:

- exact policies and versions;
- jurisdiction and location assertions;
- source evidence and digests;
- deterministic results;
- conflicts and authorized dispositions;
- identity and authority evidence;
- executed fixture results;
- actual transfer/retention/deletion outcomes;
- limitations, unknowns, and exceptions; and
- qualified legal or domain review standing where claimed.

## 17. Claim boundary

This guide does not determine legal compliance, governing law, privilege,
records obligations, data localization, transfer legality, or regulator
acceptance. It authorizes no deletion, transfer, disclosure, retention,
production use, or legal disposition.
