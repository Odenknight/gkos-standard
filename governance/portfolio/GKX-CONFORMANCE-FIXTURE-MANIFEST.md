# GKX conformance fixture manifest

**Document version:** 0.1.0  
**Status:** blocked pre-execution record; not a frozen required profile  
**Authoring agent/model:** Terra / ChatGPT Work  
**Inspection date:** 2026-08-03  
**Repository:** Odenknight/gkos-standard  
**Standard commit:** `f9375427de7ac5a5bc0bd0b785a28383f8950c98`  
**Standard text blob:** `standard/00_GKOS_Master_Standard.md` / `6ca776fbb0068f715e876e829ff7aa902d277d5a`  
**Conformance-profile annex blob:** `3992608306bbfc429a12c523c3a68545c72ece61`  
**Evidence classification:** repository-observed  
**Disposition:** P2.1 blocked; P3.2 must not run

## Observed catalog

The current catalog is `fixtures/fixtures.manifest.json` blob `59038b3a9109d5e1390fcd3c83a4c1b8bd6c0dfc`, catalog version 0.1.0. It contains eight executable cases: five GCP-1 cases and three GCP-3 cases. Its own declared omissions are sensitivity, delegation, replay, erasure, context-reproduction, authorized-use, GCP-4 through GCP-7, and the Viewer/Projection Profile.

The runner also states that graph-level expectations are not evaluated. The catalog therefore is neither a full profile nor a fixture suite that can support the complete qualification ladder.

## Required profile decision missing

P1.4 requires a ratified required conformance profile before results are evaluated. The merged `GKX-INDEPENDENT-IMPLEMENTATION-RULE.md` and `GKX-ADAPTER-LIMITS.md` define independence and adapter boundaries but do not name a profile, profile version, required GCP set, fixture selection, or acceptable exclusions. No profile is inferred here.

Without that decision, this record cannot lawfully assign:
- a full fixture list or fixture SHA;
- expected outputs/failures for a qualifying KRR run;
- canonicalization requirements beyond the starter catalog's mask rules; or
- a passing threshold or exclusions.

## Normative traceability available now

| Normative artifact | Full standard commit | Available requirement scope | Fixture state |
|---|---|---|---|
| GCP-1 | `f9375427de7ac5a5bc0bd0b785a28383f8950c98` | source revisions, fingerprints, provenance, custody/origin, sensitivity/retention, locators, receipts, no silent rewriting | starter cases only; partial |
| GCP-2 | same | stable identity, typed objects, schemas, canonical representations, metadata, locators | no catalog cases |
| GCP-3 | same | typed lineage, direction, actor, provenance, evidence anchors, scope, epistemic state, time, version | three starter cases; partial |
| GCP-4 | same | deterministic policy/control and mandatory promotion failures | no catalog cases |
| GCP-5 | same | authorized append-only decisions and traceable review states | no catalog cases |
| GCP-6 | same | reproducible context manifests and restrictions | no catalog cases |
| GCP-7 | same | authorized-use record and authority receipt | no catalog cases |
| Viewer/Projection | same | read-only disclosure of governed-state limitations | no catalog cases |

## P3 run preconditions

Before a discovery conformance run, Shaun must ratify the required profile and a new standard-derived fixture version must provide clause-level cases, canonicalization rules, expected outputs and failures for that profile. The new fixture commit SHA must be frozen before the run.

## What this evidence does not prove

It does not prove any implementation conforms, that catalog 0.1.0 is sufficient for a qualifying profile, or that KRR can satisfy the independent-implementation requirement.