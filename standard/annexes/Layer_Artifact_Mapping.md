# Annex — Layer-to-artifact mapping (informative)

This annex illustrates one realization of each governing artifact. Conformance
binds to required properties, not to a storage product or human-readable
serialization.

| Layer | Governing artifact or role | Illustrative realization |
| --- | --- | --- |
| 1 Original Sources | Source Record | Provenance fields, acquisition receipt, content fingerprint, revision store keyed by content hash |
| 2 Structure and Identity | Structured Knowledge Object | Stable UID, type, schema version, canonical representation, metadata |
| 3 Relationships and Lineage | Assertion and lineage records | Typed relationships with field origin, scope, actor, and temporal validity |
| 4 Validation and Control | Diagnostic and Control Receipt roles | Deterministic diagnostics, policy/digest-bound assessment, registered gate code |
| 5 Review and Workflow | Decision Record | Append-only acceptance, rejection, deferral, withdrawal, expiry, supersession, and manifest binding when used |
| 6 Context Presentation | Selection Envelope and Context Manifest | Captured selection plus deterministic GKX-CBOR-1 assembly with contradictions, warnings, omissions, restrictions, recipient, purpose, and expiry |
| 7 Authorized Use | Authorized Use Record or Refusal Receipt role | Manifest identity/hash, authority, proposer/reviewer/authorizer/executor, delegation, effect scope, action, outcome, and recovery route |

A readable rendering is a projection of canonical bytes and never becomes a
parallel authority. A receipt is a semantic role; an existing governed record
may satisfy it when all required fields and distinctions are preserved.

This mapping does not itself satisfy any fixture requirement.
