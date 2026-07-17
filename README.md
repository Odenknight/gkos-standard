# Governed Knowledge Operations Standard (GKOS)

> **How knowledge becomes trustworthy**

**Current release:** `GKOS-2026-07-17 v0.75`  
**Status:** Public pre-standard and implementation draft  
**Canonical repository:** `https://github.com/Odenknight/gkos-standard`

GKOS is a domain-neutral governance standard for preserving evidence, structuring knowledge, recording relationships and lineage, enforcing controls, governing review, compiling reproducible context, and authorizing consequential use by humans or computational agents.

GKOS does **not** claim to compute absolute truth. It records how evidence, assertions, proposals, validation findings, decisions, and authorized projections relate to one another so knowledge use can be examined, reproduced, challenged, corrected, and governed.

## Seven-layer reference model

| Layer | Responsibility | Governing artifact |
|---|---|---|
| 7. Authorized Use | Permit and record consequential use | Authorized Use Record |
| 6. Context Presentation | Compile purpose-bound, reproducible context | Context Manifest |
| 5. Review and Workflow | Bind an authorized disposition | Decision Record |
| 4. Validation and Control | Enforce deterministic policy and restrictions | Diagnostics and control receipts |
| 3. Relationships and Lineage | Record typed assertions, provenance, time, and conflict | Assertion and lineage records |
| 2. Structure and Identity | Assign stable identity, type, schema, and metadata | Structured Knowledge Object |
| 1. Original Sources | Preserve evidence and acquisition history | Source Record |

The layers are cumulative responsibilities, not a mandatory synchronous pipeline.

## Architecture separation

- **GKOS** defines governance, responsibility, authority, lifecycle, and conformance.
- **OKF+** defines technical objects, schemas, identities, relationships, receipts, and protocols.
- **Kosmos-Oden** is one implementation and cannot redefine either specification.

## Specialized Agents

Specialized Agents may preserve, extract, classify, connect, validate, review-assist, compile context, orchestrate work, or perform authorized operations. Specialization grants **capability, not authority**. Every governed Specialized Agent requires a versioned Agent Contract, and no actor may approve, review, authorize, or certify its own work.

## Repository map

- [Normative master standard](standard/00_GKOS_Master_Standard.md)
- [Normative annexes](standard/annexes/)
- [Ratified decision register](decisions/GKOS_Decision_Register.md)
- [Conformance work](conformance/README.md)
- [Schemas](schemas/README.md)
- [Fixtures](fixtures/README.md)
- [Examples](examples/README.md)
- [Graphics](graphics/README.md)
- [Roadmap](ROADMAP.md)

## Amendments and discussion

Public discussion and proposed amendments are welcome. Normative changes begin in GitHub Discussions or a classified issue, proceed through an evidence-backed proposal and recorded disposition, and are merged only through the processes in [GOVERNANCE.md](GOVERNANCE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## License and attribution

- Normative text, documentation, and original graphics: **CC BY 4.0**.
- Schemas, fixtures, workflows, scripts, and reference code: **Apache-2.0**.
- Names and logos are governed separately under [TRADEMARKS.md](TRADEMARKS.md).

Recommended attribution:

> Governed Knowledge Operations Standard (GKOS), GKOS-2026-07-17 v0.75, by Shaun “Oden” Marshall, licensed under CC BY 4.0. Changes, if any, are identified by the modifier.

GKOS-2026-07-17 v0.75 is suitable for public review, research, prototyping, fixture development, and independent implementation work. It is not an accredited standard, certification regime, legal opinion, or regulatory compliance assurance.
