# Ecosystem ambiguity register

- **Register ID:** GKOS-EAR-001
- **Revision:** 0.1
- **Date:** 2026-09-02
- **Standing:** informative R21 issue register

Identifiers in this register use the `EAR-*` prefix so they cannot be confused
with permanent `GKOS-<AREA>-<NNN>` requirements, `GKOS-GATE-*` diagnostics, or
GCP profile identifiers.

An ambiguity is not a waiver. When an ambiguity affects an applicable mandatory
control, authority, protected disclosure, or consequential action, the
implementation must fail closed or remain non-qualifying as required by the
controlling Standard text.

| ID | Subject | Current question | Current disposition | Closure evidence |
| --- | --- | --- | --- | --- |
| EAR-GRAPH-001 | Graph edge direction and inverse vocabulary | Which relationship directions and inverses are required for portable L3 interchange? | OPEN; implementation behavior is not yet a substitute Standard clause | Adopted vocabulary, schemas, fixtures, migration rules, and at least two implementation results |
| EAR-GRAPH-002 | Duplicate and cycle treatment | How are duplicate assertions, cycles, unresolved targets, and conflicting temporal relationships represented without silent collapse? | OPEN | Versioned L3 contract and adversarial fixtures |
| EAR-GRAPH-003 | Resolver precedence | What exact order applies to stable UID, explicit URI, local alias, basename, and other references? | OPEN; current runner fixtures test only bounded cases | Normative-compatible decision plus portable fixtures |
| EAR-MCP-001 | MCP version migration | How will a `2025-11-25` implementation migrate to `2026-07-28` without losing identity, capability, or request evidence? | DRAFTING under R21 | Migration matrix, dual-version fixtures, downgrade/refusal behavior, and implementation report |
| EAR-MCP-002 | MCP tasks and GKOS task evidence | Which task lifecycle events are sources, assertions, decisions, state changes, or outcomes? | OPEN | Binding text and fixtures for create, progress, cancellation, failure, retry, and completion |
| EAR-MCP-003 | Consequential tool admission | Which MCP tool metadata and GKOS records are required before a tool may perform an effect? | DRAFTING; effect surfaces remain default-off | Exact L4–L7 binding and synthetic reversible pilot evidence |
| EAR-A2A-001 | Agent Card identity | How should Agent Card identity, signatures, endpoints, versions, and organizational ownership map to stable GKOS actor references? | OPEN | A2A binding, threat analysis, and cross-organization test |
| EAR-A2A-002 | Delegation and task authority | When does an A2A task represent a request, a delegated grant, a proposal, or an authorized action? | OPEN; transport alone creates no authority | Binding rules, attenuation fixtures, and refusal cases |
| EAR-A2A-003 | Message and artifact re-entry | When an A2A artifact or result later becomes governed evidence, what source and re-entry records are required? | DRAFTING | L1 re-entry examples and round-trip evidence |
| EAR-ACS-001 | Hook completeness | How can a deployment prove that every relevant agent operation is observable and cannot bypass ACS hooks? | OPEN; ACS is public preview | Hook inventory, missing-hook failures, and bypass tests |
| EAR-ACS-002 | Allow, deny, and modify semantics | How do ACS outcomes map to Control Receipts, Refusal Receipts, State-Change Receipts, and L7 admission? | OPEN | ACS crosswalk and deterministic examples |
| EAR-ACS-003 | Guardian compromise | What evidence and fail-closed behavior apply when a guardian agent, policy service, or trace exporter is unavailable or compromised? | OPEN | Threat model, liveness/indeterminacy rules, and negative fixtures |
| EAR-EVIDENCE-001 | Portable evidence carrier | Which carriers and canonical inventory rules permit deterministic evidence-package exchange? | DRAFTING | Package 0.1 schema, verifier, and two-tool exchange |
| EAR-EVIDENCE-002 | Optional signatures | How are optional signatures or attestations bound without implying truth, authority, or conformance? | OPEN | Trust-model fields and verification examples |
| EAR-JURIS-001 | Jurisdiction assertion | Which actor may assert or change a jurisdiction or governing-policy reference? | OPEN; deployment authority required | Guidance, role model, and change receipt example |
| EAR-JURIS-002 | Policy conflict | How are hold, erasure, transfer, retention, and sector-policy conflicts represented and dispositioned? | DRAFTING; unresolved mandatory conflict fails closed | Multi-jurisdiction guide and conflict fixtures |
| EAR-AGENT-001 | Model-family independence | What minimum evidence establishes that an automated reviewer uses a different model family and an independent operational path? | OPEN | Public method, sealed-input evidence, and adversarial review tests |
| EAR-AGENT-002 | Multi-agent responsibility chain | How are proposer, delegator, remote agent, reviewer, authorizer, executor, and observer responsibilities preserved across protocols? | DRAFTING | Agent-governance annex and end-to-end pilot |
| EAR-IMPL-001 | Public second implementation | Which publicly reviewable implementation will provide a genuinely independent interpretation path? | OPEN; awaiting a public second implementation | Public source, provenance, dependency, fixture, and evidence package |
| EAR-CERT-001 | Future certification | What governance, assessor competence, surveillance, appeals, and trademark controls are required before “GKOS certified” may be used? | DEFERRED to post-v1.0 governance/certification work | Adopted certification scheme under future governance |

## Maintenance

Every ambiguity closure must identify:

- the controlling decision or adopted text;
- the exact source and implementation coordinates;
- the fixtures and evidence that support closure;
- compatibility and migration consequences; and
- whether prior mappings are superseded, rejected, or remain supported.

Closing an ambiguity in an informative binding does not automatically amend the
normative Standard.