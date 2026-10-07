# PR #42 proposed correction disposition — 2026-10-01

Astra-Oden recovered and preserved the [September 7 review](PR42_XW002_HISTORICAL_REVIEW_20260907.md)
from the shared recovery evidence. Its original bytes have SHA-256
`a9ba26bb4e7d4304a4a36e3b26e9d442b320d6d85a0b78c77dda015a4e2e2646`. Its verdict concerns head `f1b7c5510f788e4db2799c050e75a022edd0bacc`,
not the corrected candidate. It records a Claude-family reviewer, 62 row
dispositions, two MAJOR findings and `PASS_WITH_CORRECTIONS`.

The historical reviewer did not retrieve NIST AI 100-1. It also lacks exact
start/end times and a served session identifier. Those limitations are
preserved; this record does not fabricate them or complete the review gate.
The [October 1 Fable review](PR42_XW002_FABLE_REVIEW_20261001.md) completes
the primary-source 62-row review of `37cab1fcb3b3902d9efa4abe737bdf452a624b9d`
with verdict `PASS_WITH_CORRECTIONS`. Its [original bytes](PR42_XW002_FABLE_REVIEW_20261001.source.txt) have SHA-256
`2cec73c207e89ee76e97a52a9bdb3ffc918658fe3a2a28ad969712dae09802a8`.
That verdict is not carried forward to the subsequently corrected head.

## Prepared corrections and owner disposition

The owner instructed push and merge of PR #42. That authorizes the merge work;
it is not recorded as an explicit disposition of previously undisclosed major
findings. The [review packet](PR42_XW002_BOUNDED_DIFFERENT_MODEL_REVIEW_PACKET.md)
requires an explicit owner disposition for every MAJOR finding.

| Finding | Severity | Prepared correction | Owner disposition |
| --- | --- | --- | --- |
| F-001 | MAJOR | Remove GOVERN 2.1 from DELEGATION-001, AUTHUSE-004 and REVIEW-003; retain Direct evidence candidate / GOVERN 3.2 | ACCEPTED by the owner, 2026-10-07 (instruction to Fable-FAC: "All mine I accept.") |
| F-002 | MAJOR | Remove MEASURE 2.5 from RECEIPT-003 and AUTHUSE-002; move CONTEXT-002 and CONTEXT-003 to No direct mapping | ACCEPTED by the owner, 2026-10-07 (instruction to Fable-FAC: "All mine I accept.") |
| F-003 | MINOR | Move CANON-007 to No direct mapping | Prepared as recommended |
| F-004 | OBSERVATION | Add explicit evidence-supply-only MEASURE 2.8 caveat in §4.3 | Prepared as recommended |
| F-005 | OBSERVATION | Preserve original drafting-model uncertainty | No back-filled identity |
| F-006 | OBSERVATION | Incorporate current main and preserve its README specification/citation wording and the crosswalk paragraph | Integration conflict resolved |
| F-007 | MAJOR | Remap PROFILE-005 from MEASURE 2.5 to Contributes / MEASURE 2.1; violation fixtures are documented TEVV test sets when used in an AI-system evaluation | ACCEPTED by the owner, 2026-10-07 (instruction to Fable-FAC: "All mine I accept.") |
| F-008 | MINOR | Remove MAP 1.1 from CONTEXT-001; retain Contributes / MEASURE 2.8 | Prepared as recommended |
| F-009 | MINOR | Remap DELEGATION-003 to Contributes / GOVERN 3.2, explicitly conditional on the checker being an AI component in human-governed oversight | Prepared with narrower deployment condition |
| F-010 | MINOR | Remap POLICY-001 to Deployment-declared / GOVERN 1.4, with risk priorities and process substance external | Prepared as recommended; no GOVERN 1.2 mapping retained |
| F-011 | MINOR | Remove the unsupported unmeasured-risk disclosure claim in §4.3 | Prepared as recommended |
| F-012 | OBSERVATION | Narrow the §4.4 hash/access-control caveat to mechanics without risk-linked refusal or evaluation evidence | Prepared as recommended |
| F-013 | OBSERVATION | Remove the bounded-delegation exception to unmapped MANAGE 3 in prose and generated JSON | Prepared as recommended |
| F-014 | OBSERVATION | Optional MAP 3.5 on REVIEW-001/-003 | Not added: the rules define a review lifecycle but do not mandate assessment of its oversight process; no coverage-only additions |
| F-015 | OBSERVATION | Retain the narrow REENTRY-004 Direct evidence candidate | Retained with the existing component-only limitation |
| F-016 | OBSERVATION | Record the October 1 primary-source check | Preserved in the Fable review and this record; no external revision inferred |

Finding IDs above abbreviate `PR42-XW2-REV-F-001` through `-016`.
These are conservative changes to informative mappings. No requirement text,
allocation, profile, gate code or ISO Annex A mapping changes. The generated
distribution is 5 Direct evidence candidate, 24 Contributes, 3
Deployment-declared, 29 No direct mapping and 1 Superseded.

## Source and compatibility check

Astra reopened [NIST AI 100-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
on October 1. GOVERN 2.1 concerns organization-wide risk responsibilities and
communication; GOVERN 3.2 concerns human-AI roles. MEASURE 2.5 concerns deployed
AI-system validity/reliability and generalization limits; MEASURE 2.7 concerns
security/resilience evaluation. These support narrowing the reviewed rows.
GOVERN 1.4 concerns transparent risk-management policies and controls based on
organizational risk priorities. POLICY-001 provides an explicit identity/version
hook, while that policy substance remains external. For DELEGATION-003 the
GOVERN 3.2 contribution is conditional on an AI checker; non-determinism does
not itself prove AI use. These are author-side correction checks, distinct
from Fable's review of the prior head.

The crosswalk remains pinned to published v0.81, separately informative, with
ISO verification-held. It neither adopts the proposed Observatory pilot nor
supplies its deployment control-objective map or execution evidence. Current
requirements can evolve independently; extending the frozen crosswalk baseline
would require a separate version and review.

The [runner security maintenance](../implementation/20261001_RUNNER_SECURITY_MAINTENANCE.md)
addresses a separate audit blocker without modifying historical releases.
Exact corrected-head review, owner dispositions and hosted checks remain
required before merge. Final head/tree and CI receipts belong in the PR
conversation after the last evidence-file commit.

## Owner disposition and corrected-head verification — 2026-10-07

The owner accepted F-001, F-002 and F-007 on 2026-10-07. Fable-FAC's bounded
verification of `0a09875904249633c5ae60fa38893386ad176cbb` is recorded in
[PR42_XW002_FABLE_CORRECTED_HEAD_VERIFICATION_20261007.md](PR42_XW002_FABLE_CORRECTED_HEAD_VERIFICATION_20261007.md)
with verdict `PASS` and no new finding. Merge remains the owner's action.
