# GCP-6/GCP-7 executable evidence status

**Baseline:** GKOS-2026-08-20 v0.80 at `d04011e`

## Implemented

- Machine-readable mirror of all 56 registered requirement applicability
  entries, with schema and registry parity lint.
- Machine-readable mirror of all 23 registered gate codes.
- Versioned coverage-status and assessment-type vocabulary.
- Claim eligibility derived from catalog-declared complete requirement sets and
  their passing fixtures; profile names alone cannot create eligibility.
- Progressive CI: registry integrity is required now; complete mutation
  coverage remains a visible deficit and becomes a later claim gate.
- Actual Layer-6 `captureSelection()` / `assembleContext()` boundary.
- Canonical CBOR encode, verify, hash, diagnostic rendering, and paired parser.
- Closed-corpus replay in two clean processes with exact byte/hash equality.
- CI matrix for Node 22 and Node 24.
- Non-normative NAV-002 draft subordinate to the ratified Layer-6 boundary.

## Open evidence deficits

- Twenty gate codes still require active-catalog mutation twins. Initial
  executable twins now cover L6-007, L6-008, and L6-009.
- GCP-4 and GCP-5 have no complete requirement sets.
- GCP-6 negative-space, rendering-tamper, and resolved-content mismatch
  mutations are active mechanism evidence but do not complete GCP-6.
- GCP-7 authority, effect-scope, role-separation, stale-manifest, receipt, and
  recovery-route fixtures remain absent.
- No profile or named tier qualifies.
- Independent execution remains absent.

## Governed decision docket

- Define authority validity intervals, recommended as
  `valid_from <= evaluation_time < valid_until`, before testing the exact
  `valid_until` boundary as normative behavior.
- Keep NAV-001 presentation informative; promote only registered invariant
  behavioral requirements through a governed amendment.
- Keep SRTP provisional until its requirement traceability, fixture,
  compatibility, and profile-placement promotion gates pass.
- Promote NAV-002 only through governed amendment after requirement allocation
  and executable evidence.

## Claim boundary

The replay output reports `mechanism_demonstrated`, empty qualifying profiles,
empty tier claims, and self-attestation. No file in this change declares GCP-6,
Core, Context-Only, Advanced, or independent conformance.
