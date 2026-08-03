# GKX–KRR semantic coverage matrix

**Document version:** 0.1.0  
**Status:** pre-profile discovery matrix; incomplete by required-profile gate  
**Authoring agent/model:** Terra / ChatGPT Work  
**Inspection date:** 2026-08-03  
**Standard commit:** `f9375427de7ac5a5bc0bd0b785a28383f8950c98`  
**KRR discovery source commit:** `44c9fcf189337ccb7d035b41905e5a9c3ccc9bf9`  
**Evidence classification:** repository-observed and self-attested where noted  
**Disposition:** P2.2 partial; not a conformance conclusion

## Scope limitation

No ratified required conformance profile exists. This matrix therefore maps the published provisional GCP headings and their single stated requirements; it is not the complete, profile-specific matrix mandated for qualification. It does not alter KRR's frozen source SHA.

| GKX clause and semantic | KRR location at `44c9fcf…` | Coverage | Semantic delta | Evidence | Qualification impact |
|---|---|---|---|---|---|
| GCP-1 — preservation: revisions, fingerprints, provenance/custody, sensitivity/retention, locators, receipts; no silent rewriting | `docs/GKOS-CONFORMANCE.md`; `src/krs/governed.py` proof sidecars and governed migration | partial | KRR self-attests file preservation and SHA-256 sidecars; custody, retention defaults, and all receipt semantics are not audit-verified | KRR docs blob `3652bbbf8c789ce96bd542a703b7715fe313a596`; `governed.py` at source commit | cannot qualify without full clause cases |
| GCP-2 — stable IDs, typed structures, schemas/canonical forms, metadata/locators; paths not identity | `docs/GKOS-CONFORMANCE.md`; `src/krs/objects.py` cited there | partial | KRR claims frontmatter ID and typed objects; standard schema-version/canonical-representation equivalence is unverified | KRR conformance statement, source commit | cannot qualify without source audit and fixtures |
| GCP-3 — typed assertions/lineage preserve direction, actor, provenance, evidence, scope, epistemic state, temporal validity, version | `docs/GKOS-CONFORMANCE.md`; `src/krs/governed.py` | partial | Typed links, proof sidecars, and twelve-state values are present by self-attestation; actor authority, scope, and temporal-validity semantics are not established | `governed.py` defines `GKOS_EPISTEMIC_STATES`; KRR statement claims GCP-3 | no native-conformance conclusion |
| GCP-4 — deterministic policy/identity/permission/sensitivity/lineage/containment/risk controls, diagnostics/receipts, mandatory promotion blocks | `docs/GKOS-CONFORMANCE.md` | partial | KRR expressly lacks permission, containment, blast-radius, and risk controls; default proof verification reports rather than blocks | KRR statement's “Partial GCP-4” section | material gap; no adapter may repair semantic controls |
| GCP-5 — authorized append-only Decision Records; separation of duties; traceable review states | `docs/GKOS-CONFORMANCE.md`; governed review queue | partial | KRR expressly lacks authenticated authority and deferral/withdrawal/expiry states; human-authored objects are not gated | KRR statement's “Partial GCP-5” section | material gap; outcome cannot be native |
| GCP-6 — reproducible purpose-bound Context Manifests with restrictions and compiler/policy version | no identified implementation | absent | KRR expressly does not claim Context Manifests | KRR statement “Not claimed” | material gap |
| GCP-7 — authorized Context Manifest, authority receipt, Authorized Use Record | no identified implementation | absent | KRR expressly does not claim Authorized Use Records | KRR statement “Not claimed” | material gap |
| Viewer/Projection — read-only display of origin, state, incompleteness, contradictions, warnings, restrictions, limitations | optional read-mostly web view in README | partial | No verified defect-badge-or-refuse behavior or all required disclosure fields | KRR README blob `19e5dc46f6b69cc762d3c9bfef62a21622f8ab11` | profile-specific fixture required |

## Discovery limitation

The KRR source history contains GKOS v0.76 alignment commits, including `a6b2e0256ddc0b9b5a7150e800f4d3ab3b4b3eb4` and `44c9fcf189337ccb7d035b41905e5a9c3ccc9bf9`. This matrix cannot support a claim of untouched pre-GKX convergence.

## What this evidence does not prove

It does not prove all KRR source paths were audited, native semantics, equivalent semantics, independent implementation, or a qualifying conformance outcome.