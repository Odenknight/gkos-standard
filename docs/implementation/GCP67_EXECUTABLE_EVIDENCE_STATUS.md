# GCP-6/GCP-7 executable evidence status

## Current publication summary — 2026-09-06

The [v0.81 publication receipt](../releases/GKOS_2026-09-03_v0.81_PUBLICATION_RECORD.md) reports 101/101 tests, 28/28 mutation gates, zero dependency-audit findings and separate Windows replication for its exact release candidate. The current registry has 62 permanent requirement allocations. These reported release results were not rerun for this editorial summary. Separate execution is not an organizationally independent second implementation. No profile currently qualifies; full semantic coverage remains incomplete.

## Historical v0.80 snapshot

All sections below preserve the earlier baseline and its then-open deficits. They are not the current v0.81 coverage statement. R17 and R18 are included in the published v0.81 edition.

**Historical baseline:** GKOS-2026-08-20 v0.80 at `d04011e`

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

- Nineteen gate codes still require active-catalog mutation twins. Initial
  executable twins now cover L6-007, L6-008, L6-009, and L7-001.
- GCP-4 and GCP-5 have no complete requirement sets.
- GCP-6 negative-space, rendering-tamper, and resolved-content mismatch
  mutations are active mechanism evidence but do not complete GCP-6.
- GCP-7 exact authority-time boundary evidence is present under the unpublished
  R17 amendment. Effect-scope, role-separation, stale-manifest, general receipt,
  and recovery-route fixture coverage remains incomplete.
- No profile or named tier qualifies.
- Independent execution remains absent.

## Governed decision docket

- R17 now adopts `valid_from <= evaluation_time < valid_until`; publish it only
  in a separately authorized post-v0.80 release.
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
