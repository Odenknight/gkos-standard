# Provisional schemas

**Standing:** informative development schemas; non-normative and non-qualifying
unless a later controlling decision promotes an exact schema.

This directory contains experimental application and packaging shapes that are
kept separate from the active schemas in the parent `schemas/` directory.
Validation against a provisional schema does not establish a GKOS requirement,
profile, implementation conformance, certification, or authority.

Promotion to the active schema surface requires:

- a recorded development decision;
- compatibility and migration analysis;
- implementation and fixture evidence appropriate to the risk;
- exact source and dependency coordinates;
- repository validation; and
- a separately authorized publication path.

## Current provisional areas

### `science/`

Contains the `SRTP-DRAFT-0.1` scientific trace experiment. Its schemas and
fixtures remain provisional, informative, and non-qualifying. They preserve an
exact historical compatibility tuple and do not silently advance to the newest
Standard or Engine release.

### `evidence/`

Contains the candidate
`gkos-conformance-evidence-package-0.1.draft.schema.json` under R21. It defines
an informative digest-bound inventory for transporting the existing
conformance manifest and supporting evidence through a directory, future
deterministic archive, OCI-style artifact, or declared external carrier.

The evidence-package draft:

- does not replace `schemas/conformance-manifest.schema.json`;
- does not mandate one carrier or signature technology;
- does not create a qualifying profile;
- requires multi-implementation or multi-assessor exchange evidence before any
  proposal for normative adoption; and
- must preserve failures, skips, unsupported and unevaluated behavior,
  limitations, exceptions, and protected external evidence accurately.

## Current active-schema boundary

Authority Receipt, Context Manifest, Decision Record, Authorized Use Record,
Refusal Receipt, conformance manifest, and related active shapes now exist in
the parent `schemas/` directory. Older statements that those shapes are wholly
absent are historical and must not be used as current guidance.
