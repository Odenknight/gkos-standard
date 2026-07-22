# GKOS schemas

v0.76 introduced the first machine-readable schema slice (JSON Schema
2020-12). Schemas preserve the master standard's authority, provenance,
temporal, sensitivity, and identity invariants; enumerations (twelve-state
epistemic vocabulary, seven-level sensitivity ladder, four-way origin
separation, typed relation set) are frozen per the v0.76 master standard and
grounded in the reference implementation.

| Schema | Layer | Status |
|---|---|---|
| `okf-common.defs.json` | shared | normative-candidate |
| `sko-frontmatter-notes-2.2.schema.json` | L2 | normative-candidate (ratified 2.2 baseline) |
| `sko-frontmatter-agent-ready-2.3.schema.json` | L2 | normative-candidate (draft 2.3 profile; disclosure per §4.1) |
| `assessment.schema.json` | L4 | normative-candidate |
| `diagnostics-sidecar.schema.json` | L4 | normative-candidate |
| `proposal-envelope.schema.json` | L5 | normative-candidate |
| `decision-record.schema.json` | L5 | normative-candidate |
| `conformance-manifest.schema.json` | claims | normative-candidate |
| `provisional/source-record.draft.schema.json` | L1 | provisional, informative only |
| `provisional/context-manifest.draft.schema.json` | L6 | provisional, informative only |
| `provisional/authorized-use-record.draft.schema.json` | L7 | provisional, informative only |

Deliberately absent, per the v0.76 deferral list: the authority-receipt schema
(v0.8 gate; Annex C carries the provisional field list), the actor-identity
model, and the upward-receipt attestation chain. "Normative-candidate" means
published for review under the development-phase governance in the repository
README; promotion to normative requires a recorded development decision.
Schema proposals must preserve the master standard's authority, provenance,
temporal, sensitivity, and identity invariants.
