---
id: VR-0009
from: technical-fixtures
date: 2026-09-08T18:40
claim: GKOS-Engine and GKOS-Engine-Lite implement a NO_ELIGIBLE_RESULTS reason code on the retrieval path, with a fixture and tests that exercise it; gkos-standard defines the Refusal Receipt role in a named clause.
result: verified (code path and tests found in both repos; the standard clause found); see "Finding" for what the code does and does not do
---

## Method

All values below come from tools run on 2026-09-08 (UTC). Nothing is quoted from memory.

- Fresh clones into the session scratchpad (`git clone`, default branch `main`):
  - `https://github.com/Odenknight/GKOS-Engine` at HEAD `650eab4a6752227cae336d7556a57826c22a0d5a` (merge of PR #45, 2026-09-06).
  - `https://github.com/Odenknight/GKOS-Engine-Lite` at HEAD `1e1f84c547f610ecae2eb459cba53d3f1d00889c` (merge of PR #24, 2026-09-02).
- `grep -rn "NO_ELIGIBLE\|reason_code\|reasonCode\|refusal" --exclude-dir=node_modules --exclude-dir=.git .` in each clone, then `grep -rn "NO_ELIGIBLE"` alone, then `grep -rni "refusal"` alone.
- `git log -1 --format='%H %cs' -- <file>` for each file listed, to get the last commit that touched it.
- gkos-standard: existing checkout (not modified) at `worktrees\gkos-standard` (HEAD `07a8a1d648aefb229caf34d7fecd0240c2b10822`, branch `codex/qualify-standard-windows-gcp3-20260901`, `git describe` = `v0.80-9-g07a8a1d`; the v0.81 tag is not present in that checkout). `grep -rni "refusal"` and `grep -rni "refusal receipt"` under the checkout, then `curl` of the same two files at tag `v0.81` from `raw.githubusercontent.com` and `sha256sum` on both copies to confirm they are byte-identical to the checkout.
- Raw output saved at: `shared/evidence/VR-0009_no-eligible-results-code-path.md` (this file carries the quoted lines; the full grep output was 205 KB and was not retained, the counts below come from `grep -c`).

## Finding

### 1. GKOS-Engine (HEAD 650eab4a6752227cae336d7556a57826c22a0d5a) — executed grep

`NO_ELIGIBLE_RESULTS` occurs in source, contract fixture, generator script and tests. `dist/` is not tracked (`git ls-files dist` returned 0 files); the `dist/*.mjs` hits appeared because `npm test` had just built it locally and are omitted here.

Code path (TypeScript source):

| File:line | Last commit touching file | What it does |
|---|---|---|
| `src/retrieval/confidence.ts:11` | `5b72aae1aad5b6416b8cb86a4137a7e536d8bb59` (2026-08-21) | `if (!scores.length) reasons.push(eligibleCount === 0 ? "NO_ELIGIBLE_RESULTS" : "WEAK_LEXICAL_MATCH");` — inside `assessRetrievalConfidence()`. With no scored hits, the code distinguishes "nothing was eligible" from "eligible items scored weakly". |
| `src/retrieval/coordinator.ts:203` | `ed57a181df7ad9c8f3cce65b4e656242c4e311a2` (2026-09-04) | `emptyLineageSearchResult(..., reasonCode: "NO_ELIGIBLE_RESULTS" \| "TEMPORAL_COVERAGE_INSUFFICIENT", ...)` — builds the empty result envelope; each stage (lexical, vector, reranker) is marked `skipped` with the reason code. |
| `src/retrieval/coordinator.ts:863` | same | Returns `NO_ELIGIBLE_RESULTS` with temporal coverage `not_evaluated` when `temporalView.authorized_source_count === 0` under an `as_of` query. |
| `src/retrieval/coordinator.ts:934` | same | Returns `NO_ELIGIBLE_RESULTS` when the lineage projection yields `eligible.length === 0`. |
| `src/retrieval/evaluation.ts:1112`, `:1373` | `2196d128344f68bde928ad772ff59f40726e2c04` (2026-09-06) | Evaluation harness selects `TEMPORAL_COVERAGE_INSUFFICIENT` or `NO_ELIGIBLE_RESULTS` for empty result cells. |

Fixture and tests:

| File:line | Last commit touching file | Content |
|---|---|---|
| `contracts/retrieval/gkos-retrieval-1.0.0-draft.2/conformance-fixture.json:44` | `6e2df27d33ede62ee0d2e3cb7610df478a7d66ce` (2026-08-21) | `"authorized_filtered_empty": { "coverage": "not_evaluated", "confidence_reason": "NO_ELIGIBLE_RESULTS" }` |
| `contracts/retrieval/gkos-retrieval-1.0.0-draft.2/contract.json:44` | not separately checked | `"empty_authorized_rule": "ordinary NO_ELIGIBLE_RESULTS; temporal coverage not_evaluated"` |
| `contracts/retrieval/gkos-retrieval-1.0.0-draft.2/README.md:51` | not separately checked | describes the "ordinary non-oracular `NO_ELIGIBLE_RESULTS`" rule |
| `contracts/retrieval/gkos-retrieval-evaluation-1.0.0-draft.1/metric-computation-fixture.json:16601`, `:16621` | not separately checked | generated metric fixture rows carrying the code |
| `test/retrieval-temporal.test.mjs:334`, `:415` | `6e2df27d33ede62ee0d2e3cb7610df478a7d66ce` (2026-08-21) | `assert.ok(result.confidence.reason_codes.includes("NO_ELIGIBLE_RESULTS"))` — line 334 is inside a loop over discoverability-policy decisions `deny`, `indeterminate`, `throw` and also asserts zero source reads (`reads === 0`), i.e. the policy fails before any content work. |
| `test/retrieval-evaluation.test.mjs:2233`, `:2242` | not separately checked | expected `reason_codes: ["NO_ELIGIBLE_RESULTS", ...]` |
| `scripts/generate-retrieval-evaluation-metric-fixture.mjs:599`, `:608` | not separately checked | generator that writes the code into the metric fixture |

Repo-assigned fixture ID: none. The Engine names fixtures by path and contract version (`gkos-retrieval-1.0.0-draft.2`), not by a separate ID. The two `fixtures.manifest.json` files that do assign IDs (`ENGINE-NAV-CONTRACT-1.0.0`, `ENGINE-NAV-EFFECTS-CONTRACT-1.0.0`) do not cover retrieval.

Run evidence: `test/retrieval-temporal.test.mjs` is in the current test inventory selected by `scripts/current-test-plan.mjs` and runs under `npm test` (`scripts/run-current-tests.mjs`). The GitHub Actions run `34063066179` (workflow CI, branch main, head `650eab4a…`, 2026-09-06T22:07:04Z, conclusion `success`) ran `npm test` on Node 22, 24 and 26. See `FIXTURE-INVENTORY-2026-09-08.md` for the local run.

`refusal` (case-insensitive) in Engine source: `src/service/mcp.ts:99` (tool description of `gkos_record_resolve`: "Missing, restricted, moved and UID-mismatched targets share one non-disclosing refusal"), `src/service/mcp.ts:294`, `:307` (comments), `test/service-retrieval.test.mjs:154` (assertion message), `docs/MCP-PARAM-ERRORS.md:7`, `:70`, `docs/SETTINGS.md:92`, `docs/moc-build-review-2026-09-05/ENGINE-RUST-MOC-BUILD-PLAN.md:31`, `evidence/2026-09-06-engine-2.2-moc-build.md:19`. There is no type, schema or artifact in the Engine named "refusal receipt". The Engine's receipt-like records use other names: `contracts/admission-policy/1.0.0/decision-receipt.schema.json` (fields `reasonCodes`, `outcome`), `engine.navigation-context-rejection` (`bin/gkx.mjs:1377`, `status: "rejected", reason_codes`), `engine.reentry-plan` with `status: "rejected"` and `diagnostics[]` (`src/navigation/reentry.ts`), and navigation-effects results with `status: "denied"` and `reasonCodes` (`src/navigation-effects/node/executor.ts:710`).

`reason_code|reasonCode` occurs in 129 tracked files in the Engine (`grep -rlc`), the largest being the watcher recovery conformance fixture (2855 lines matching) and `journal.schema.json` (422).

### 2. GKOS-Engine-Lite (HEAD 1e1f84c547f610ecae2eb459cba53d3f1d00889c) — executed grep

| File:line | Last commit touching file | Content |
|---|---|---|
| `rust/crates/gkos-retrieval/src/confidence.rs:19` | `26d3b66c4e126c6dbcc35ae37a2aad8296d8bc63` (2026-08-21) | `reasons.insert(if eligible_count == 0 { "NO_ELIGIBLE_RESULTS" } else { "WEAK_LEXICAL_MATCH" })` — Rust port of the Engine rule. |
| `rust/crates/gkos-retrieval/src/confidence.rs:118` | same | unit test `no_hits_distinguish_no_eligibility_from_weak_match`: `assert_eq!(none.reason_codes, ["NO_ELIGIBLE_RESULTS"]);` |
| `rust/crates/gkos-retrieval/src/temporal_coordinator.rs:424`, `:506` | `9e2a1cbd070e7b2d08aa094e692b65eb50213ccd` (2026-08-22) | `self.empty_result(..., "NO_ELIGIBLE_RESULTS", TemporalCoverage::NotEvaluated, ...)` and the `eligible.is_empty()` branch. |
| `rust/contracts/gkos-retrieval-1.0.0-draft.2/conformance-fixture.json:44` | `42df8b047797a725f8b7c31f2f02d123a798515e` (2026-08-21) | same line as the Engine fixture (imported contract pack). |
| `rust/contracts/gkos-retrieval-1.0.0-draft.2/contract.json:44`, `README.md:51` | not separately checked | same text as the Engine copies. |

`refusal`: 0 hits in Lite. `reason_code|reasonCode`: 20 files, all under `rust/`.

Run evidence: the Rust tests are not run by the Lite root `npm test` (`node --test "test/*.test.mjs"`). They run in CI jobs `retrieval-rust-latest`, `retrieval-rust-msrv`, `retrieval-rust-windows-msvc` of run `33590643533` (workflow CI, main, head `1e1f84c5…`, 2026-09-02T04:23:47Z, success). The audit `reports\GKOS-ENGINE-LITE-SUCCESSOR-AUDIT-20260901.md` records `cargo test --workspace --all-targets --locked`: 155 unit and 11 conformance tests passed at `938a3ebc6b6f1001c7b70320bed803a24e71b606` (Rust 1.98.0, Windows), which is an ancestor of current main, not current main. I did not run `cargo test` in this session (cargo 1.98.1 is present; not run to keep within the time box). Status for the Rust tests at current main: `executed` in CI on 2026-09-02, `not verified` locally.

### 3. gkos-standard — refusal receipt clause

- File: `standard/annexes/Authority_and_Refusal_Receipt_Fields.md`
- Heading: `## 4. Refusal Receipt` (line 62; document title `# Annex — Authority, authorized-use, and refusal receipt fields`, line 1).
- Opening sentence: "A record satisfying the Refusal Receipt role MUST identify:" followed by twelve bullets (receipt identity; gate and permanent requirement ID; registered diagnostic code; evaluated predicate identity and version; result; digest-bound inputs; captured evaluation time; actor context; requested effect scope; refusal effect; escalation route; governing policy identity, version, and digest), then "A quiet refusal without this evidence does not satisfy a required refusal fixture."
- Companion schema: `schemas/refusal-receipt.schema.json` (title `GKX Refusal Receipt role`; required fields `canonical_profile, artifact_type, schema_version, receipt_id, gate_code, requirement_id, predicate_ref, result, input_refs, evaluated_at, actor_context, policy_ref`; `result` is `const "refused"`; `gate_code` pattern `^GKOS-GATE-L[1-7]-\d{3}$`).
- Related registry rows: `requirements/REGISTRY.md` `GKOS-AUTHUSE-005` ("A required gate closure MUST leave a record satisfying the Refusal Receipt role ...") and `GKOS-AUTHUSE-007` (fail closed with `GKOS-GATE-L7-001` and a Refusal Receipt). Decision record `decisions/R16_...md` `## 7. Refusal Receipt role`.
- Version check: SHA-256 of the annex is `6457ba35c2a9a59e35297349767364b81df978640434b40b82985ba244250dcc` both in the local checkout (07a8a1d) and at `https://raw.githubusercontent.com/Odenknight/gkos-standard/v0.81/standard/annexes/Authority_and_Refusal_Receipt_Fields.md` (HTTP 200). SHA-256 of the schema is `11017113221f8ebc51b03c7de8078bdba3258a7d32b084d675ffd3de28c0182f` in both. So the clause text quoted here is the v0.81 text. `gh api repos/Odenknight/gkos-standard/git/ref/tags/v0.81` returned tag object `b035c91a82f8de2dc21b2b1479b162a23d0cef18`; VR-0001 records the commit it points to as `8f2a158c6d4b8cabd907d98765766d281aec1247`.
- The Master Standard (`standard/00_GKOS_Master_Standard.md`) mentions the annex by link at line 27 under `## Normative surface`; the substantive text is in the annex.
- `NO_ELIGIBLE_RESULTS` does not appear anywhere in gkos-standard (0 hits). The reason code is an Engine/Lite retrieval vocabulary item, not a standard term.

### 4. What this does and does not establish

- `NO_ELIGIBLE_RESULTS` is a **retrieval confidence reason code** carried in `result.confidence.reason_codes` and per-stage `reason_codes` on an ordinary empty search result. It is not a Refusal Receipt in the standard's sense: the result envelope has no `gate_code`, `requirement_id`, `receipt_id`, `input_refs` digests, `actor_context` or `policy_ref`. It is the Engine's mechanism for saying "the answer is empty because nothing was eligible, and here is the reason", and the test at `retrieval-temporal.test.mjs:334` shows the deny path performs zero source reads.
- The Engine records that come closest to the Refusal Receipt role are `engine.navigation-context-rejection`, `engine.reentry-plan` (`status: "rejected"`, `diagnostics[]`), the navigation-effects `denied`/`stale` receipts (`reasonCodes`, sealed journal), and `admission-policy/1.0.0/decision-receipt.schema.json`. None of them is validated against `schemas/refusal-receipt.schema.json` from gkos-standard (grep for `refusal-receipt` in the Engine: 0 hits).

## Allowed sentence

For CR-01 `engine_implementation`: "GKOS-Engine at commit 650eab4a6752227cae336d7556a57826c22a0d5a emits the `NO_ELIGIBLE_RESULTS` reason code from `src/retrieval/confidence.ts` (line 11) and `src/retrieval/coordinator.ts` (lines 203, 863, 934); the contract fixture `contracts/retrieval/gkos-retrieval-1.0.0-draft.2/conformance-fixture.json` (line 44) and tests in `test/retrieval-temporal.test.mjs` (lines 334, 415) exercise it. GKOS-Engine-Lite at 1e1f84c547f610ecae2eb459cba53d3f1d00889c carries the same rule in `rust/crates/gkos-retrieval/src/confidence.rs` (line 19). This reason code is a retrieval confidence signal on an empty result; it is not an implementation of the gkos-standard Refusal Receipt role (`standard/annexes/Authority_and_Refusal_Receipt_Fields.md`, §4), which no Engine record is currently validated against."

Do not use: "the Engine implements Refusal Receipts", "NO_ELIGIBLE_RESULTS is a refusal receipt", any fixture ID for this code (the repo assigns none).
