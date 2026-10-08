# R26-A16 fixtures — closure rule identity

**Status:** Development fixtures proposed under R26 (Status: Proposed) for the
v0.83 development line. Non-qualifying. They support no conformance claim.

**Amendment:** Canonical Serialization annex §10.2 (R26-A16).

**Requirement ID:** GKOS-CONTEXT-004 for every fixture.

Shared inputs:

- `eligible-snapshot.json`: held items `contradiction-b`, `warning-c` and
  `restriction-r`, each with its kind. The snapshot does not say which items
  are required.
- `closure-rule-a.json` (requires kinds `contradiction` and `restriction`) and
  `closure-rule-b.json` (also requires `warning`). Each is a policy component;
  its digest is SHA-256 over its GKX-CBOR-1 encoding. These rule records are
  fixture-local and have no published schema.
- `selection-envelope.json`: valid under selection envelope 1.0.0; binds the
  snapshot by digest and captures `contradiction-b` and `restriction-r` as
  closure inputs.

Each case carries a Context Manifest (valid under context manifest 1.0.0) whose
`policy_ref` digest-binds one closure rule.

| Fixture | `policy_ref` | Members | Expected |
| --- | --- | --- | --- |
| `R26-A16-P-RULEA-001` | rule A | claim, contradiction, restriction | accepted |
| `R26-A16-N-RULEB-002` | rule B | same as 001 | refused, GKOS-GATE-L6-009 (`warning-c` required by rule B, missing from `members`) |
| `R26-A16-N-RESTRICT-003` | rule A | claim, contradiction; `restriction-r` appears in `restrictions` text alone | refused, GKOS-GATE-L6-009 |

Fixtures 001 and 002 apply two closure-rule digests to the same snapshot and
the same members, and give different required sets.

**Before (runner `validateRequiredClosure`, base `e1aa08a`).** All three are
accepted. The runner reads required items from a `required_closure` list
inside the snapshot; it does not bind or evaluate a closure rule, so it cannot
tell rule A from rule B. Fixtures 002 and 003 fail before.

**After.** `NOT_MODELED` in the runner. Runner change proposed to packet R3:
`validateRequiredClosure(selection, snapshot, rule)` resolves the rule from the
manifest `policy_ref`, recomputes its digest, evaluates it over the snapshot
named by `eligible_snapshot_ref` and the captured selection envelope, and
checks each required item against manifest `members` (not `restrictions`). The
packet's proposed-behaviour harness gives the expected result for all three
fixtures.

## Reference runner wave 2 and review corrections

Worker I3 on `work/v083-r26-implementation`. Before is the runner on `main`
`8c20b05`; after is the runner at the I3 head. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

`conformance/runner/closure-rule.mjs` (`evaluateClosureRule`) checks that the
manifest `selection_set_ref` binds the selection envelope and that
`eligible_snapshot_ref` binds the snapshot, resolves the closure rule whose
canonical digest, identity and version the manifest `policy_ref` names, and
checks each required item against `members` (never `restrictions`). An
unresolved rule or an unbound input is GKOS-GATE-L6-007; a missing required
item is GKOS-GATE-L6-009. The runner evaluates the fixture-local rule form
(`required_kinds`) only.

- Before (`validateRequiredClosure`): 1 of 3 (001).
- After: 3 of 3.

## Second-round review correction (r26-REV-012)

Worker I4 on `work/v083-r26-implementation`. Binding a snapshot by digest
does not establish that its contents are evaluable. `evaluateClosureRule`
now requires `held_items` to be an array whose every item has a text `kind`
and an artifact reference with a SHA-256 digest over a named basis. An absent
or null collection, or a malformed item, leaves the required set
undeterminable: GKOS-GATE-L6-009. An explicit empty array is a snapshot that
holds nothing; its required set is empty.

Each fixture has its own snapshot and selection envelope
(`eligible-snapshot-held-*.json`, `selection-envelope-held-*.json`), bound by
digest, and a manifest whose members hold the context claim alone.

| Fixture | Snapshot `held_items` | Expected |
| --- | --- | --- |
| `R26-A16-N-HELD-ABSENT-004` | absent | refused, GKOS-GATE-L6-009 (reviewer mutation) |
| `R26-A16-N-HELD-NULL-005` | `null` | refused, GKOS-GATE-L6-009 |
| `R26-A16-N-HELD-MALFORMED-006` | one bare identifier string | refused, GKOS-GATE-L6-009 |
| `R26-A16-P-HELD-EMPTY-007` | `[]` | accepted |

- Before (runner at `f0f189a`): 004, 005 and 006 accepted (fail); 007
  accepted. Before (`main` `8c20b05`, `validateRequiredClosure`): 007
  accepted; 004 to 006 accepted (fail).
- After: 7 of 7.

## Third-round review correction (r26-REV-013)

Worker I4. A held item's digest must name exactly one basis:
`canonical_profile` `GKX-CBOR-1` with no `basis` field, or `basis`
`received-bytes` with no `canonical_profile` field, as `verifyDigestBinding`
requires. A digest that also carries the other field, whatever its value, is
malformed: the required set cannot be determined, GKOS-GATE-L6-009. Both
fixtures put the malformed contradiction in `members`, so only the digest
check can refuse them.

| Fixture | Held contradiction digest | Expected |
| --- | --- | --- |
| `R26-A16-N-HELD-DIGEST-EXTRA-BASIS-008` | `canonical_profile` `GKX-CBOR-1`, `basis` `unsupported` | refused, GKOS-GATE-L6-009 (reviewer mutation) |
| `R26-A16-N-HELD-DIGEST-EXTRA-PROFILE-009` | `canonical_profile` `unsupported`, `basis` `received-bytes` | refused, GKOS-GATE-L6-009 (reviewer mutation) |

- Before (runner at `60d44a0`): 008 and 009 accepted (fail). Before (`main`
  `8c20b05`): accepted (fail).
- After: 9 of 9.
