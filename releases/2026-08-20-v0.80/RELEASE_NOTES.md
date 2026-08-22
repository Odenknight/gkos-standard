# Release notes — GKOS-2026-08-20 v0.80

## Breaking normative development changes

R16 establishes the required claim tiers and enables the Layer-6 and Layer-7
contracts:

- GKOS Core requires GCP-1 through GCP-5;
- GKOS Advanced requires GCP-1 through GCP-7;
- the GCP-6 Context-Only Extension is read-only and grants no action authority;
- the Viewer/Projection Profile is independent;
- every required gate needs executable violation evidence and a registered
  diagnostic code;
- canonical artifact identity uses the `GKX-CBOR-1` deterministic CBOR profile
  and SHA-256;
- Layer 6 captures selection separately from deterministic Context Manifest
  assembly; and
- Layer 7 binds the exact manifest, valid authority, distinct actors, typed
  effect scope, outcome, and recovery route.

Twenty-nine permanent requirement IDs cover profiles, canonicalization,
context, authorized use, refusal, and effect scope. Initial active schemas are
published for Selection Sets, Context Manifests, Authorized Use Records, and
Refusal Receipts.

## Impact and preservation

Claims against v0.79 and earlier do not carry forward because v0.80 adds and
tightens mandatory behavior. Re-evaluation is required for a v0.80 claim.

No historical artifact or release is erased or retroactively rewritten. Prior
tags, release packages, records, hashes, decisions, and claim evidence remain
valid evidence of what existed and was evaluated under their exact release.

## Preserved boundaries

The active fixture catalog still declares no qualifying profile. This release
does not prove implementation conformance, make NAV-001 normative, draft
NAV-002, promote SRTP, grant general agent authority, establish legal or
regulatory compliance, or make an implementation the specification authority.

## Status

This is an owner-authorized developmental v0.x release under the disclosed
Founder/Initial Editor model. It is non-consensus, not independently certified,
and not accreditation, regulatory approval, legal advice, or proof that the
future GKOS v1.0 gates have been met.
