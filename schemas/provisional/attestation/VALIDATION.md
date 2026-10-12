# CAP-DRAFT-0.1 local validation record

Date: 2026-10-12. Baseline: `446b2d4526c09150bed0d7d699b010850b2dd68d`.
Candidate identity is the PR commit containing this record and the reviewed diff.
Environment: Linux x86_64; Node v24.19.0; npm 11.9.0; dependencies installed from
the existing runner lockfile using `npm ci --ignore-scripts`.

| Check | Observed result |
| --- | --- |
| Complete runner suite, `npm --prefix conformance/runner test` | 453 tests passed, 0 failed, 0 skipped |
| New profile coverage within that suite | 36 tests passed, including generated example consistency |
| Registry lint included by `npm test` | No errors or warnings |
| Standalone profile report | Three expected cases passed; no conformance profiles claimed |
| New Markdown documentation, markdownlint-cli2 0.18.1 | Five proposal/profile/fixture documents passed, 0 errors |
| `git diff --check` | Passed |

The full suite includes schema compilation/validation, canonical byte/hash replay,
negative mutations, refusal persistence, existing-schema SRTP comparison validation,
and exact generated-example consistency. Examples contain computed hashes, and the
positive raw execution receipt's bytes are checked against its attestation digest.

This is author-run local evidence, not independent review. It does not establish
Windows/Node 22 results, remote CI completion, production authentication, live authority
resolution, database snapshot correctness or transactional action durability. Remote CI
and domain adapter/shadow tests remain separate gates. See [TESTING.md](TESTING.md).
