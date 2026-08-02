# GKOS ecosystem roadmap

This roadmap governs ecosystem sequencing. It is informative: normative changes
still require the amendment and decision-record process in the GKOS standard.

## Repository responsibilities

| Repository | Lifecycle | Sole roadmap responsibility |
| --- | --- | --- |
| `gkos-standard` | Active, canonical | Normative governance, GKX exchange specification, conformance gates, schemas, fixtures, and ecosystem policy |
| `GKOS-Engine` | Active | Canonical deterministic, platform-neutral implementation of GKX under GKOS |
| `GKOS-Engine-Lite` | Active, thin distribution | CLI and desktop distribution of GKOS-Engine; no independent governance semantics |
| `Kosmos-Oden` (KRS) | Active | Reference end-user application and Obsidian integration consuming GKOS-Engine |
| `Kosmos-Oden-Lite` (KRS-Lite) | Frozen | Stable 1.0.x maintenance line; compatibility, security, data-integrity, and documentation fixes only |

Dependency direction is one-way: **GKOS/GKX specification → GKOS-Engine →
distributions and applications**. Implementations may supply evidence and
proposals, but cannot redefine the standard. KRS-Lite is not an upstream
dependency and is not expected to track current-engine parity.

See [Ecosystem organization](docs/ECOSYSTEM-ORGANIZATION.md) for decision rights,
cross-repository change rules, and release coordination.

## Phase A — Ecosystem cohesion

The July 2026 rebranding and attribution corrections are complete. Phase A now
focuses on making the repositories operate as one governed product family.

- Publish the same repository map and lifecycle language across the family.
- Route normative and exchange-model changes to `gkos-standard`.
- Keep shared deterministic behavior in `GKOS-Engine`; prohibit re-vendoring
  in active downstream products.
- Keep Engine-Lite thin and KRS product-specific.
- Enforce the KRS-Lite frozen-core boundary and document selective backports.
- Use cross-repository issues or linked PRs for changes spanning ownership
  boundaries; merge upstream before downstream adoption.

## Phase B — Pre-standardization, v0.8–v0.9

- Complete stable requirement identifiers and normative/informative separation.
- Complete machine-readable layer artifacts, GKX schemas, and stable namespaces.
- Build executable GKOS-TS fixtures and trace them to requirements.
- Define authority receipts, actor identity, attestation chains, and
  decision-record integrity.
- Add signed release manifests, SBOMs where applicable, and archival identifiers.
- Conduct legal, security, privacy, records-management, and independent
  implementer review.
- Continue assembling multi-stakeholder governance.

## Phase C — v1.0 gates

- Second independent implementation.
- Demonstrated exchange and diagnostic interoperability.
- Complete conformance suite.
- Formal amendment authority and multi-stakeholder governance.
- Voting, quorum, recusal, appeals, and dominance safeguards.
- Trademark/name administration and final brand guide.
- Canonical signed publication and persistent archival identifier.

No implementation release, including KRS or either Lite product, satisfies these
gates on behalf of the standard.

## Coordination gates

1. A normative or GKX contract change lands in `gkos-standard` first.
2. GKOS-Engine adopts the versioned contract and publishes compatibility evidence.
3. Engine-Lite and KRS adopt the engine release without duplicating its core.
4. KRS-Lite receives a backport only when its maintenance policy permits it;
   otherwise the difference is recorded as intentional.
5. Each repository maintains its own release notes and tests. Ecosystem status is
   reported here without turning product milestones into normative claims.
