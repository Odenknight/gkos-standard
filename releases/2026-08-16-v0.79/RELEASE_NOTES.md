# Release notes — GKOS-2026-08-16 v0.79

## Normative development changes

R15 publishes a domain-neutral governed-state-change contract:

- every committed governed state change is durably bound to a record satisfying
  the State-Change Receipt role;
- deployment policies and predicates are explicit and versioned;
- retention and disposition consult deployment-declared hold predicates and
  fail closed on unavailable, indeterminate, or conflicting mandatory results;
- reintroduced material enters as a new Layer-1 source without inherited
  standing;
- semantic supersession is explicit rather than inferred; and
- supersession delegation is bounded, deterministic, expiring, attenuated,
  receipted, reviewed, and frozen when review becomes overdue.

Seventeen permanent requirement IDs cover receipt, policy, retention, re-entry,
and delegation behavior. Their GCP applicability is assigned per requirement.

## Preserved boundaries

This release does not settle canonical GKX edge direction, inverse vocabulary,
resolver precedence, or serialization determinism. It does not make NAV-001
normative, draft NAV-002, promote SRTP, establish a complete qualifying GCP
profile, authorize general agent writing, or make an implementation the
specification authority.

## Status

This is an owner-authorized developmental v0.x release under the disclosed
Founder/Initial Editor model. It is non-consensus, not independently certified,
and not accreditation, regulatory approval, or proof of implementation
conformance. Prior release packages remain immutable historical evidence.
