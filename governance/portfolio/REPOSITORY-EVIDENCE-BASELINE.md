# Repository evidence baseline

**Document version:** 0.1.0  
**Status:** inspection record  
**Authoring agent/model:** Terra / ChatGPT Work  
**Inspection date:** 2026-08-03  
**Evidence classification:** repository-observed except where explicitly noted  
**Disposition:** P0.3 pass

| Repository | URL / visibility | Default / HEAD | Latest observed release or identity | License / relationship | Inspection limits |
|---|---|---|---|---|---|
| gkos-standard | https://github.com/Odenknight/gkos-standard — public | main / `9ea01d696bb8f2fef6f5826a3556f4fce72537a2` | GKOS-2026-07-20 v0.76; no local tag observed | CC BY 4.0 docs; Apache-2.0 software materials | local clone clean; `GOVERNANCE.md`, `CONTRIBUTING.md`, fixtures and standard read |
| GKOS-Engine | https://github.com/Odenknight/GKOS-Engine — public | main / `d73e86816df1b800dd9286459722f047266f1cc2` | tag `v1.2.0` | Apache-2.0; implementation, not standard authority | local clone clean; README, roadmap, workflows inspected |
| GKOS-Engine-Lite | https://github.com/Odenknight/GKOS-Engine-Lite — public | main / `2ebbf77583af3e83032054f1256188dc56376907` | tag `v1.1.3` | Apache-2.0; reduced distribution dependent on Engine | local clone clean; README, roadmap, workflows inspected |
| Kosmos_Research_Studio_Lite (KRR candidate) | https://github.com/Odenknight/Kosmos_Research_Studio_Lite — private | main / `44c9fcf189337ccb7d035b41905e5a9c3ccc9bf9` | package `krs-lite` 0.3.2 | MIT; local Markdown/YAML research record | GitHub app read; no root AGENTS.md or CONTRIBUTING.md found; private working-tree state unavailable |
| Kosmos_Research_Suite | https://github.com/Odenknight/Kosmos_Research_Suite — private | main / `3bfa6d728e63ed6e615dfe897b6816675b0f9a56` | package `open-notebook` 1.13.0 | MIT; Open Notebook-derived application per package metadata | GitHub app read; no root AGENTS.md/CONTRIBUTING.md/UPSTREAM.md found; private working-tree state unavailable |
| TheMarshal | https://github.com/Odenknight/TheMarshal — private | main / `2dc1bae7acc44420f5ffbf9aaa0286d31547b479` | package `marshal-harness` 0.1.0 | standalone alpha agent harness | GitHub app read; no root AGENTS.md/CONTRIBUTING.md found; private working-tree state unavailable |

## Observations material to later gates

- Current standard fixtures are catalog 0.1.0 and explicitly incomplete for GCP-4 through GCP-7; no complete required profile is yet frozen.
- Engine-Lite states an implementation-dependent distribution role and cannot satisfy the second-independent-implementation requirement.
- KRR documents self-attested, provisional GKOS v0.76 GCP-3 coverage; that is not an audit-verified GKX qualification.
- Suite package metadata retains the upstream `open-notebook` identity and author attribution.
- TheMarshal README describes a standalone alpha harness; no portfolio integration claim was relied on.

## What this evidence does not prove

It does not prove a clean private working tree, release/tag absence in private repositories, code-level implementation independence, fixture completeness, conformance, or public-claim alignment.