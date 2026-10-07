# PR #48 EU AI evidence integration review

Review date: 2026-10-07. Reviewer: Astra-Oden, acting for the upstream owner.
This is an upstream maintainer assessment, not organizationally independent
verification, an acceptance of P1.1, or a legal assessment.

## Inputs and scope

- Contributor candidate: `b7c884e147e909c9e6b76b8690384f026fc27eb8`, from
  `mariusTalpos/gkos-standard`, branch `planning/eu-ai-evidence`.
- Integrated upstream main: `b308ff7137bdbb109c31f0ace7e6c49b8988e0d5`.
- Engine observer contribution: `07f13e810aed23dd66cf843ed39b5c214f10b021`
  in `mariusTalpos/GKOS-Engine`. It is not supplied by this Standard PR.
- Controlling sources: CONTRIBUTING.md, GOVERNANCE.md, conformance claims
  policy, the P1 proposal/specification, phase tracker and preserved findings.

The material is suitable for further review as a contributor's informative
pilot with negative findings. Retaining an unsuccessful experiment does not
adopt the proposed Article 9 requirements or establish the pilot's acceptance.
The fork's owner instructions apply to that pilot, not upstream governance.

## Maintainer changes

The main integration preserves the current README specification title,
published release/citation wording and claim boundaries. The pilot link moves
into the informative add-ins section, with attribution and the incomplete
result stated beside it. The phase tracker distinguishes its upstream copy
from the contributor's canonical tracker.

The blocking Node 22/24 Ubuntu/Windows test lanes now execute the existing
four-test example harness after the existing runner checks. They do not run
the known-failing P1.1 Engine demonstration as a qualifying fixture suite.
CI also verifies the stored evidence bindings and pointers. The two immutable
captured specification files retain relative links from their original source
directory. Only those two exact captures are excluded from the ordinary
location-based link scan; the evidence checker validates their digests and
local links using `docs/eu-ai-evidence/specs` as the original link base. The
live specification and other documentation remain in the ordinary link scan.
No historical report, fixture expectation, existing runner implementation,
requirement, schema, profile, gate code or published release is changed.

## Bounded verification

Local verification used Node 24.18.0 and the locked runner dependencies.

- All 26 file bindings in the historical verification record match their
  SHA-256 values and byte counts. All five fixture content hashes match.
- Each run's observation and captured-specification bindings match. All 21
  assertion evidence pointers resolve in each run.
- Both runs retain 10 PASS assertions, P11-08 FAIL and process exit 1. Their
  expected/observed assertion values and statuses agree.
- Re-evaluating each stored observation with the unchanged baseline evaluator
  reproduces all eight baseline assertions, including P11-08 FAIL. Four
  adversarial evaluator challenges are detected in each run. The repeated
  observations agree after the explicitly named timing exclusions.
- The existing four harness tests pass locally, including missing-observer
  non-success evidence and a real non-zero process exit.

The reusable consistency check is `node scripts/check-eu-ai-p1-evidence.mjs`.
It also checks the captured specification's links at their original source
base. It is separate from the failed P1.1 acceptance experiment.

This checks stored-byte consistency and evaluator behavior. It is not a new
Engine execution, independent historical authentication, or verification of
the historical full Engine suite. The disclosed historical two Engine test
failures and six skips remain disclosed. P1.2/P1.3 remain unimplemented.

The preserved findings' reference to local uncommitted additions describes
their captured execution context. The phase tracker separately records their
later fork publication; the captured report bytes are not rewritten.

The historical EUR-Lex consolidation URL was opened during this assessment,
but returned an anti-bot page. No fresh legal-source verification or new
legal interpretation is asserted.

## Remaining merge gates

1. CONTRIBUTING.md requires all commits intended for merge to carry a DCO
   sign-off. Contributor commits `5a16ec6`, `359aeba` and `90d627d` lack it.
   The contributor must supply their own attestation through the documented
   contribution process. A maintainer sign-off cannot manufacture that
   contributor's certification; this integration preserves their history.
2. Required hosted checks must pass on the final candidate. The current-main
   lockfile still contains the previously identified fast-uri audit finding.
   PR #42 proposes bounded maintenance, but its unmerged work is not treated
   as approved or imported here.
3. The current release validator freezes the working-tree technical paths
   against v0.82. This PR adds example/fixture paths in that frozen set.
   Development validation must explicitly reconcile those additions with the
   immutable published package before the mandatory gate can pass. This
   review neither removes the gate nor relaxes published source checksums.

P11-08 is a retained experimental failure, not a passing acceptance result.
Accepting this material into the repository, if its merge gates clear, must
remain an informative development decision. It establishes no complete P1,
GKOS profile qualification, EU AI Act compliance or regulatory endorsement.
