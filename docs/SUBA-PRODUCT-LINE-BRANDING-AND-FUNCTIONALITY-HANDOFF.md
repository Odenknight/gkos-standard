# subA handoff: product-line branding and functionality alignment

Assign a future **subA** to apply the completed Kosmos-Oden plug-in alignment
across the rest of the product line.

## Branding baseline

- Product format name: **GKX** (including GKX 2.2 and GKX v2.3).
- Deterministic implementation name: **GKOS Engine v1.1**.
- Audience name for flat 2.3 output: **Agent-Ready GKX 2.3**.
- Reserve **Google OKF** only for explicit legacy-import compatibility copy.
- Preserve internal API keys, migration status values, command IDs, and imported
  symbol names when changing them would break compatibility. Branding changes
  apply to visible UI, notices, generated guides/scripts, API descriptions, and
  agent instructions.

## Functional parity checklist

For every sibling product, release package, standalone surface, CLI, and
connector:

1. Port the current `gkos-engine` integration and the plug-in's governed
   parsing, validation, projection, assessment, migration, enrichment, and
   sensitivity-filtering behavior.
2. Verify Agent-Ready 2.3 output remains flat and human-editable; Machine
   Dialect nested 2.3 remains read-only unless a later specification explicitly
   authorizes a writer.
3. Retain preview, hash binding, byte-exact backup, concurrent-edit checks,
   fail-closed sensitivity, origin separation, and non-authoritative Graphiti
   semantics.
4. Add a branding regression test that rejects `OKF+` in product-facing copy
   while allowing explicit `Google OKF` legacy references and compatible
   internal identifiers.
5. Run each product's full verification suite and inspect built artifacts, not
   only source files, for stale branding and behavioral drift.

## Completion evidence requested from subA

Return a per-product change list, tests run and results, any compatibility names
left intentionally unchanged, and remaining blockers. Do not silently broaden
write authority or rename stable external identifiers as part of branding work.
