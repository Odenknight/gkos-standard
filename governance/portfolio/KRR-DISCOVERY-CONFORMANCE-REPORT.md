# KRR discovery conformance report

**Document version:** 0.1.0  
**Status:** blocked; no discovery conformance command executed  
**Authoring agent/model:** Terra / ChatGPT Work  
**Execution date:** 2026-08-03  
**Candidate repository:** Odenknight/Kosmos_Research_Studio_Lite  
**Frozen discovery source commit:** `44c9fcf189337ccb7d035b41905e5a9c3ccc9bf9`  
**Evidence classification:** repository-observed  
**Disposition:** P3.2 blocked; P3.3 cannot assign an F-4 outcome

## Preconditions not satisfied

1. No ratified required GKX conformance profile names the required GCP set, version, case selection, or exclusions.
2. The only published catalog is 0.1.0 at blob `59038b3a9109d5e1390fcd3c83a4c1b8bd6c0dfc`; it is expressly incomplete and cannot be frozen as a full qualifying fixture profile.
3. The KRR freeze decision requires dependency locks, exact host toolchain, configuration, and fresh command output before discovery execution. Those captures are not archived. KRR's `pyproject.toml` blob is `b93fc9bdea5444771ff9fcc632811e84ea00fb64`, but its version ranges are not a lock.
4. P3.1's independence audit is fail/indeterminate, so this candidate cannot close the independent-implementation blocker even if a later run passes.

## Commands and results

No conformance command was run. The historic `python -m pytest -q` / 143-passed statement is a repository claim, not a fresh discovery run. No source, fixture, expectation, or adapter rule was changed.

## Required next decision

Shaun must ratify a required profile and authorize a standard-derived, clause-traceable full fixture version. KRR's frozen source SHA must then receive a reproducibility capture (resolved dependency lock, toolchain, configuration, exact commands, raw outputs) before a fresh run. A rerun may not alter the source SHA, fixture SHA, expectations, or adapter rule.

## What this evidence does not prove

It does not prove KRR passes or fails any GKX profile, reproducibility, native conformance, or mappable compatibility.