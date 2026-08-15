# GKOS-DIRECTIVE-ENG-210 r4 — Engine 2.1 Navigation build contract

**Status:** Owner-approved implementation directive; informative with respect to GKOS conformance  
**Date:** 2026-08-15  
**Engine baseline:** `ea7c3262a8dcc939b1b0006a2678ae99c1a09e3c` / 2.0.1  
**Target:** GKOS-Engine 2.1.0  
**Controlling standard decision:** R15

## 1. Release contract

Engine 2.1.0 is **source-content read-only**. It adds deterministic Navigation discovery, classification, candidate generation, diff, audit, context packaging, incremental invalidation, re-entry planning, bounded supersession evaluation, and explicit Governance Store interfaces.

It MUST NOT rewrite, delete, replace, archive, or otherwise mutate source vault content. Source-content writing, managed MOC replacement, archive deletion, locks/leases, stale-plan enforcement, rollback execution, and general governed writing are reserved for a later 2.2 write executor.

Append-only governance metadata MAY be committed only through a host-supplied Governance Store and the R15 state-change receipting contract.

## 2. Architecture

Maintain three planes:

- `NavigationCore`: pure/deterministic source analysis and plans; no filesystem mutation primitives.
- `Governance Service`: validates grants, policy, routine/major classification, promotion decisions, receipts, deferred review, revocation, and expiry; no source-content mutation.
- future `2.2 Write Executor`: explicit source mutation and transaction/rollback surface.

An architecture test MUST fail if `src/navigation/**` imports source-filesystem mutation primitives.

## 3. Canonical-five and flag-and-promote

Built-in MOC names are exactly `index`, `_index`, `readme`, `moc`, and `contents` for Navigation contract 1.0.0.

Other MOC-like names are never silently treated as canonical. They produce a reason-coded finding. Promotion is a human-governed configuration state change and requires a State-Change Receipt role record.

This convention is Engine/Navigation contract behavior, not a universal GKOS filename rule.

## 4. Determinism

For identical source snapshot, configuration, policy version, and Engine version, candidate bytes, diffs, classifications, audit findings, and context-pack canonical bytes MUST be identical.

No locale-sensitive sort, wall-clock-dependent candidate content, random identifier, model output, retrieval rank, or filesystem enumeration order may affect deterministic Navigation output unless explicitly supplied as governed input.

## 5. Re-entry

`planReentry()` MUST create a new-source plan. It MUST NOT merge in place or copy predecessor standing. It records predecessor linkage as evidence only.

Semantic supersession is a separate explicit operation. Engine may evaluate whether a proposed delegated supersession satisfies the grant and deterministic predicate, but may not infer supersession.

## 6. Bounded delegation

Implement a grant model bound to actor contract, scope, predecessor/successor, policy/predicate version, expiry, and review terms.

Evaluation order:

1. grant validity and attenuation;
2. deterministic predicate: `routine | major | indeterminate`;
3. optional non-deterministic escalation only;
4. only `routine` may proceed under delegation;
5. successful governed metadata append requires durable State-Change Receipt binding;
6. action enters deferred-review queue where required;
7. overdue review freezes that grant for new mutations except under higher-precedence, bounded, time-limited, receipted exception.

No API may expose a path for a model to downgrade `major` or `indeterminate` to `routine`.

## 7. Governance Store

Provide an explicit interface with append-only semantics, optimistic digest/version preconditions, idempotency keys, and declared binding/atomicity behavior. Failure MUST NOT leave a successful state-change claim.

The default package SHOULD ship interface definitions and test/in-memory adapters, not a hidden vault writer.

## 8. Public API and capability honesty

Add a Navigation export surface. Advertise effect limits explicitly, including:

- discovery/candidate/diff/audit/context/re-entry planning: true;
- bounded supersession evaluation: true;
- Governance Store adapter support: true;
- MOC apply/source-content write/archive delete: false.

Do not advertise a persisted re-entry record unless a Governance Store and valid authority path are actually active.

## 9. Fixtures and evidence

Engine tests are implementation evidence only. They MUST map to permanent GKOS requirement IDs through a non-normative adapter/traceability layer and MUST NOT define requirements.

Required negative coverage includes:

- receipt unavailable => no successful commit;
- non-deterministic checker attempts downgrade => rejected;
- expired/narrower grant violations => rejected;
- overdue review => grant frozen;
- re-entry attempts inherited standing => rejected;
- inferred supersession from similarity/rank/time/UUID => rejected;
- source-content mutation from NavigationCore => architecture-test failure;
- duplicate operation ID => no duplicate governed effect.

Keep SRTP provisional fixture identities stable; link overlapping tests rather than treating SRTP as normative authority.

## 10. Versioning and release

Because 2.1 adds observable capability and projection behavior, it is a MINOR release under the ecosystem versioning policy. Update package version, `ENGINE_VERSION`, changelog, README capability claims, exports, traceability, and downstream pins as required by the one-train policy.

The undefined “Walk Test” is not implemented. It remains deferred until a subject and pass criterion are normatively or contractually defined.

## 11. Stop-the-line conditions

Do not release 2.1 if any of the following is true:

- NavigationCore can mutate source content;
- a state mutation can be reported committed without durable receipt binding;
- a model can downgrade deterministic restriction;
- supersession can be inferred rather than explicitly authorized;
- a delegation can widen authority or continue after overdue-review freeze;
- active/provisional/implementation fixture standing is conflated;
- a conformance claim exceeds the standard catalog’s declared qualification boundary.
