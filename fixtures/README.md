# GKOS fixture catalog

Executable starting with catalog 0.1.0: nine fixtures across positive,
negative, boundary, contradiction, lineage, and promotion-gate classes for
GCP-1 and GCP-3, with schema expectations bound to `../schemas/` and projection
expectations bound to diagnostic codes. `fixtures.manifest.json` is the
machine-readable catalog; `expected/` holds engine-generated golden outputs;
`DIVERGENCES.md` records where the reference implementation and the standard's
expectation currently disagree (three known divergences as of catalog 0.1.0 —
recorded, not hidden).

Fixture classes still to be authored: sensitivity, delegation, replay, erasure,
context-reproduction, and authorized-use, plus coverage for GCP-4 through GCP-7
and the Viewer/Projection Profile. Fixtures are incomplete in v0.76; a
conformance claim must disclose which fixtures were executed, catalog and
implementation versions, outcomes, exceptions, known divergences, and whether
evaluation was self-attested or independent (`../schemas/conformance-manifest.schema.json`).
