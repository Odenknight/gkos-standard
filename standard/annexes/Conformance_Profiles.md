# Annex — Conformance profiles

GCP profiles are cumulative capabilities aligned with the seven GKOS layer
contracts. A higher profile inherits every applicable lower-profile
requirement.

## Required adoption tiers

| Tier | Required scope | Claim boundary |
| --- | --- | --- |
| GKOS Core | GCP-1 through GCP-5 | Minimum full general GKOS conformance tier |
| GKOS Advanced | GCP-1 through GCP-7 | Context reproduction plus authorized consequential use |
| GCP-6 Context-Only Extension | GKOS Core plus GCP-6 | Read-only context compilation/reproduction; no consequential action authority |
| Viewer/Projection Profile | Independent | Faithful read-only display; not a pipeline tier |

GCP-1 through GCP-4 MAY be assessed and reported precisely, but they do not
constitute a full GKOS Core claim.

## Profiles

- **GCP-1:** Source preservation.
- **GCP-2:** Structure and stable identity.
- **GCP-3:** Typed assertions and lineage.
- **GCP-4:** Validation and deterministic control.
- **GCP-5:** Governed review and Decision Records.
- **GCP-6:** Reproducible Context Manifests.
- **GCP-7:** Authorized Use Records.

An Advanced claim binds GCP-6 and GCP-7 together. The Context-Only Extension is
the sole named exception and grants no authority for consequential action.

The Viewer/Projection Profile is independently claimable. It MUST display
provenance, epistemic state, incompleteness, contradictions, warnings,
restrictions, and conformance limitations without gaining write, promotion,
decision, or authorization authority.

## Claim evidence

Claims MUST identify:

- exact dated GKOS release and GKX version;
- profile or named extension;
- implementation version or immutable commit;
- fixture-suite version and executed fixtures;
- results, exceptions, and unevaluated requirements;
- immutable evidence; and
- self-attested or independently verified assessment type.

Applicable required capabilities cannot be excluded. Mandatory block, refusal,
fail-closed, rollback-before-commit, and authority-freeze gates can never be
excluded.

No profile claim is permitted until the active catalog declares the profile
complete and every required executable expectation passes. v0.79 and earlier
claims do not carry forward to v0.80.
