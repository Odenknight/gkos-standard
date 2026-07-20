# Governed Knowledge Operations Standard (GKOS)

> **How knowledge becomes trustworthy**

**Release:** GKOS-2026-07-20 v0.76  
**Status:** Public pre-standard and concept-refinement release  
**Canonical repository:** [Odenknight/gkos-standard](https://github.com/Odenknight/gkos-standard)

GKOS is a domain-neutral governance standard for preserving evidence, structuring knowledge, recording relationships and lineage, enforcing controls, governing review, compiling reproducible context, and authorizing consequential use by humans or computational agents.

GKOS does not compute absolute truth. It records how evidence, assertions, proposals, validation findings, decisions, and authorized projections relate so use can be examined, reproduced, challenged, corrected, and governed.

## Development-phase governance

The v0.x series is for testing and refining the concept. Changes are documented development decisions by the Founder and Initial Editor after technical review; they are not formal consensus ratifications, certification, accreditation, or regulator approval. Multi-stakeholder governance is a v1.0 gate.

## Seven-layer reference model

| Layer | Responsibility | Governing artifact |
| --- | --- | --- |
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
- **Kosmos-Oden** and the **GKOS Engine** are implementations and cannot redefine either specification.

## Repository map

- [Master standard](standard/00_GKOS_Master_Standard.md)
- [Annexes](standard/annexes/)
- [Development decision register](decisions/GKOS_Decision_Register.md)
- [v0.76 development decision](decisions/R9_V0.76_Development_Decision_Record.md)
- [Conformance](conformance/README.md)
- [Schemas](schemas/README.md)
- [Fixtures](fixtures/README.md)
- [Examples](examples/README.md)
- [Graphics](graphics/README.md)
- [Implementation references](docs/implementation/README.md)
- [Roadmap](ROADMAP.md)

## v0.76 highlights

- Freezes a twelve-state GKOS epistemic vocabulary without making the standard depend on the changing OKF+ 2.3 draft.
- Defines consequential use, blast radius, materially equivalent proposals, and defect-badge-or-refuse behavior.
- Adds progressive-disclosure requirements to the Viewer/Projection Profile.
- Publishes informative layer-artifact and provisional authority-receipt annexes.
- Clarifies pre-v1.0 development governance and version relationships.

## License and attribution

Documentation and original graphics are licensed under CC BY 4.0. Schemas, fixtures, workflows, scripts, and reference code are licensed under Apache-2.0. Trademarks are governed separately.

> Governed Knowledge Operations Standard (GKOS), GKOS-2026-07-20 v0.76, by Shaun “Oden” Marshall, licensed under CC BY 4.0. Changes, if any, are identified by the modifier.

GKOS v0.76 is suitable for public review, research, prototyping, fixture development, and independent implementation work. It is not an accredited standard, certification regime, legal opinion, regulatory compliance assurance, or guarantee of truth or safety.
