# Annex — Known limitations and open issues

GKOS is a developmental specification (public working draft). It began as a
single-author pre-standard concept; the goal is to advance it to a
pre-standard through an open, multi-stakeholder committee process. The current
edition, GKOS-2026-09-24 v0.82.1, specifies deterministic canonical
serialization and the required GCP-6/GCP-7 contract, but it does not yet
provide:

- a complete executable conformance suite for GKOS Core, GKOS Advanced,
  GCP-6 Context-Only, or Viewer/Projection;
- complete semantic behavior coverage for GCP-4 through GCP-7; passing the
  28 registered mutation gates does not establish complete profile coverage;
- independently demonstrated second interoperable implementation;
- independently verified conformance claim;
- formal federated governance or an accredited standards-body process;
- certification or accreditation program.

Publication and DOI archival of the current edition are verified; see the
[v0.82.1 publication record](../../docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md)
and [archive verification](../../docs/releases/GKOS_2026-09-24_v0.82.1_ARCHIVE_VERIFICATION.json).
The [v0.81 publication record](../../docs/releases/GKOS_2026-09-03_v0.81_PUBLICATION_RECORD.md)
remains the receipt for that edition. Verified publication closes publication
work; it does not close the implementation and qualification gaps.

The active fixture catalog declares no qualifying profile. Passing available
tests MUST NOT be represented as full-profile conformance while applicable
executable coverage is incomplete.

Accordingly, no implementation can presently establish a qualifying GCP-6 or
GCP-7 claim through the active catalog. The contracts and initial schemas are
published; full executable demonstration remains future work.

Layer-6 retrieval and selection are attested, not reproduced. GKOS proves what
the captured selection envelope contains and whether deterministic assembly
replays. It does not prove that an approximate index, mutable graph, model, or
ranking process would select the same material again or that the selection was
epistemically correct.

Hash-chain and per-writer sequence evidence establish order within a writer
stream. Global multi-writer order requires a separately declared ordering or
adjudication authority.

GKOS does not guarantee truth, safety, security, scientific validity,
admissibility, authenticity, privilege, legal compliance, regulatory approval,
or fitness for a professional purpose. Decision Records, Context Manifests, and
Authorized Use Records preserve governed evidence; they do not manufacture
legal, organizational, clinical, scientific, or regulatory authority.
