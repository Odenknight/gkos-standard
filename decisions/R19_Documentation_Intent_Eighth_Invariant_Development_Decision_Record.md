# R19 — Documentation-intent eighth invariant

**Date:** 2026-09-01

**Status:** Accepted development decision; unpublished amendment

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Publication target:** A separately authorized GKOS release after validation

**Base:** The unmerged Standard R18 integration candidate at
`9f47ecf8fefb87810cd44bd03fa8e82eb321fd4a`

## 1. R19-132 — Supply and adopt the undefined eighth position

R4 requires an eight-invariant documentation-intent gate but does not enumerate
the invariants. Before this decision, GKOS-DOCSTD-001 §4 contained seven
proposed positions. The ten STD-079 r4 controlling invariants and the seven
layer-blocking invariants are separate sets and do not resolve that mismatch.

The previously undefined eighth documentation-intent position is now supplied
and adopted as follows:

| Invariant | Controlling source | Failure condition |
| --- | --- | --- |
| Every committed governed state change is durably receipted | R15-104..R15-105 and applicable receipt requirements (`GKOS-RECEIPT-001` and `GKOS-RECEIPT-003`); directive provenance: STD-079 r4 invariants 3–4 | A governed mutation commits without a durably bound receipt, or receipt-binding failure neither fails closed nor produces verifiable rollback or compensation |

This is a prospective owner adoption on 2026-09-01. It is not a finding that
this wording always occupied R4's missing position, and it does not rewrite the
history of R4 or the seven-position DOCSTD proposal.

## 2. Scope of adoption

R19 adopts the eight-position intent-review table in GKOS-DOCSTD-001 §4 as an
unpublished development procedure. The remainder of GKOS-DOCSTD-001 stays
proposed and non-normative. Passing this gate makes an implementation behavior
eligible for a later decision; it does not amend GKOS, approve the behavior, or
confer authority.

No new requirement identifier is allocated. The eighth position is derived
from the already owner-approved durable-receipt controls in STD-079 r4 and the
active requirements `GKOS-RECEIPT-001` and `GKOS-RECEIPT-003`.

## 3. Evidence considered

The decision considered:

- the R4 requirement for an eight-invariant documentation-intent gate without
  an accompanying enumeration;
- the seven proposed positions previously present in GKOS-DOCSTD-001 §4;
- R15-104 and R15-105 as normative adoption provenance;
- `GKOS-RECEIPT-001` and `GKOS-RECEIPT-003` in the requirement registry;
- STD-079 r4 invariants 3–4 as directive provenance; and
- the distinction between the documentation-intent gate, the ten STD-079 r4
  controlling invariants, and the seven layer-blocking invariants.

The choice closes a semantic gap between authorization and durable
accountability without inventing a new receipt obligation or importing an
unrelated invariant set to satisfy the count.

## 4. Change class, limitations, and release boundary

This is a normative-compatible development-procedure amendment under
`GOVERNANCE.md`. It is an owner decision during v0.x development, not consensus
ratification, independent certification, accreditation, or regulatory
acceptance. The supporting review is advisory and repository validation is
self-attested unless separately identified otherwise.

R19 does not alter, retag, or republish an existing release; allocate a new
GKOS requirement; declare Standard v0.81 or any GCP profile qualified; approve
an implementation behavior; authorize a merge, tag, release, deployment, or
governed mutation; or change the separate STD-079 and layer-blocking invariant
sets. Inclusion in a release requires the separately authorized release path
and all applicable exact-bound validation. Under R18-131, including R19 in a
v0.81 candidate would invalidate prior exact-bound evidence and require a
complete final rerun plus separate publication authority for that changed
candidate.

## 5. Rollback and supersession

Before publication, rollback may remove the R19 candidate changes while
preserving this decision in review evidence. After publication, any change to
the invariant, its provenance, the eight-position cardinality, or the adopted
scope requires a prospective superseding development decision; history must
not be silently rewritten.
