# Annex — Provisional authority-receipt field list

This annex is informative and not yet normative. It does not amend §4 Authority and binds no conformance claim. It records a candidate minimum field list so implementations experimenting with a receipt shape converge on a common vocabulary ahead of a future normative mechanism.

A future authority receipt is expected, at minimum, to carry:

`receipt_id`, `issuer`, `subject`, `actor_identity`, `authority_source`, `permitted_actions`, `resource_scope`, `purpose_scope`, `tenant_scope`, `sensitivity_ceiling`, `delegation_allowed`, `issued_at`, `not_before`, `expires_at`, `policy_version`, `revocation_locator`, `nonce_or_replay_binding`, `signature_or_attestation`.

Attenuation, delegation-chain integrity, non-transferability, revocation, proof-of-possession, single-use, and hash-binding requirements are deferred to v0.8. No implementation may claim conformance to this annex.
