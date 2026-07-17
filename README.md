# Governed Knowledge Operations Standard (GKOS)

> **How knowledge becomes trustworthy**

**Release:** GKOS-2026-07-17 v0.75  
**Status:** Public pre-standard and implementation draft  
**Canonical repository:** https://github.com/Odenknight/gkos-standard

GKOS is a domain-neutral governance standard for preserving evidence, structuring knowledge, recording relationships and lineage, enforcing controls, governing review, compiling reproducible context, and authorizing consequential use by humans or computational agents.

GKOS does not compute absolute truth. It records how evidence, assertions, proposals, validation findings, decisions, and authorized projections relate so use can be examined, reproduced, challenged, corrected, and governed.

## Seven-layer reference model

| Layer | Responsibility | Governing artifact |
|---|---|---|
| 7. Authorized Use | Permit and record consequential use | Authorized Use Record |
| 6. Context Presentation | Compile purpose-bound context | Context Manifest |
| 5. Review and Workflow | Bind an authorized disposition | Decision Record |
| 4. Validation and Control | Enforce policy and restrictions | Diagnostics and control receipts |
| 3. Relationships and Lineage | Record provenance, time, conflict, and typed assertions | Assertion and lineage records |
| 2. Structure and Identity | Assign stable identity, type, schema, and metadata | Structured Knowledge Object |
| 1. Original Sources | Preserve evidence and acquisition history | Source Record |

The layers are cumulative responsibilities, not a mandatory synchronous pipeline.

## Architecture separation

- **GKOS** defines governance, responsibility, authority, lifecycle, and conformance.
- **OKF+** defines technical objects, schemas, identities, relationships, receipts, and protocols.
- **Kosmos-Oden** is one implementation and cannot redefine either specification.

## Specialized Agents

Specialization grants capability, not authority. Every governed Specialized Agent requires a versioned Agent Contract, and no actor may approve, review, authorize, or certify its own work.

## Repository map

- [Master standard](standard/00_GKOS_Master_Standard.md)
- [Annexes](standard/annexes/)
- [Decision register](decisions/GKOS_Decision_Register.md)
- [Conformance](conformance/README.md)
- [Schemas](schemas/README.md)
- [Fixtures](fixtures/README.md)
- [Examples](examples/README.md)
- [Graphics](graphics/README.md)
- [Roadmap](ROADMAP.md)

## Amendments

Public discussion and proposed amendments are welcome. Normative changes begin in GitHub Discussions or a classified issue, proceed through an evidence-backed proposal and recorded disposition, and are merged only under [GOVERNANCE.md](GOVERNANCE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## License and attribution

Documentation and original graphics are licensed under CC BY 4.0. Schemas, fixtures, workflows, scripts, and reference code are licensed under Apache-2.0. Trademarks are governed separately.

> Governed Knowledge Operations Standard (GKOS), GKOS-2026-07-17 v0.75, by Shaun “Oden” Marshall, licensed under CC BY 4.0. Changes, if any, are identified by the modifier.

GKOS v0.75 is suitable for public review, research, prototyping, fixture development, and independent implementation work. It is not an accredited standard, certification regime, legal opinion, or regulatory compliance assurance.
