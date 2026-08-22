# Changelog

## GKOS-2026-08-20 v0.80

- **BREAKING:** R16 establishes GKOS Core as GCP-1 through GCP-5 and GKOS
  Advanced as GCP-1 through GCP-7, with a read-only GCP-6 Context-Only
  Extension and an independent Viewer/Projection Profile.
- **BREAKING:** deterministic `GKX-CBOR-1` canonical serialization, SHA-256
  artifact identity, fixed-microsecond UTC timestamps, NFC text, schema-typed
  numbers, and refusal diagnostics become normative.
- GCP-6 now captures non-deterministic selection separately from deterministic
  Context Manifest assembly; GCP-7 binds the exact manifest hash, authority,
  distinct actor roles, typed effect scope, outcome, and recovery route.
- Twenty-nine permanent requirements and initial active schemas are added for
  profiles, canonicalization, context, authorized use, refusal, and effect
  scope.
- Claims against v0.79 and earlier do not carry forward. Historical records and
  immutable release packages remain valid evidence and are not rewritten.
- The active fixture catalog remains non-qualifying; this release defines the
  required contracts but does not certify an implementation or establish
  accredited, consensus, legal, or regulatory standing.

## GKOS-2026-08-16 v0.79

- R15 adopts universal state-change receipting, domain-neutral retention and
  disposition controls, Layer-1 re-entry without inherited standing, explicit
  semantic supersession, and bounded supersession delegation.
- Seventeen permanent requirement IDs are published for receipt, policy,
  retention, re-entry, and delegation behavior, with per-requirement GCP
  applicability.
- Active core, provisional SRTP, and implementation-only fixture populations
  remain separately reported; no complete qualifying GCP profile is created.
- NAV-001 remains informative and non-qualifying, NAV-002 remains undrafted,
  and unresolved GKX serialization questions remain outside this release.
- Zenodo archival metadata and the release-to-DOI binding process are prepared;
  DOI issuance does not imply certification, consensus, or conformance.

## GKOS-2026-08-05 v0.78

- R14 adopts the GKX 2.0 machine namespace: `gkx_version`, `.gkx/`, `GKX-*`,
  and `gkx`.
- Active schemas, fixtures, adapters, and implementation guidance were migrated
  to the GKX 2.0 contract.
- Pre-GKX-2.0 changelog material is preserved in `archive/` as history.
