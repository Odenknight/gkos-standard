# GKOS fixture catalog

Executable starting with catalog 0.1.0; current catalog 0.1.1 contains eight
fixtures across positive,
negative, boundary, contradiction, lineage, and promotion-gate classes for
GCP-1 and GCP-3, with schema expectations bound to `../schemas/` and projection
expectations currently bound to implementation diagnostic codes. That binding
is a known implementation-neutrality defect and cannot support an external
qualification claim until GKOS-owned requirement IDs and adapter mappings are
adopted. `fixtures.manifest.json` is the
machine-readable catalog; `expected/` holds engine-generated golden outputs;
`DIVERGENCES.md` records where the reference implementation and the standard's
expectation disagreed at the recorded Engine v1.0.5 baseline (three historical
divergences —
recorded, not hidden).

The historical R10 decision record describes the catalog as containing nine
fixtures. The machine-readable manifest has contained eight fixture objects;
the decision record is preserved as written, while this current-facing count is
corrected from the catalog itself.

Catalog 0.1.1 explicitly declares `qualifying_profiles: []`. Unexecuted pair or
graph expectations produce `UNEVALUATED`, block profile claims, and make the
starter runner exit non-zero.

Fixture classes still to be authored: sensitivity, delegation, replay, erasure,
context-reproduction, and authorized-use, plus coverage for GCP-4 through GCP-7
and the Viewer/Projection Profile. Fixtures are incomplete in v0.76; a
conformance claim must disclose which fixtures were executed, catalog and
implementation versions, outcomes, exceptions, known divergences, and whether
evaluation was self-attested or independent (`../schemas/conformance-manifest.schema.json`).
