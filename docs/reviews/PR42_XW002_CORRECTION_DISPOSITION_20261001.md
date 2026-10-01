# PR #42 proposed correction disposition — 2026-10-01

Astra-Oden recovered and preserved the [September 7 review](PR42_XW002_HISTORICAL_REVIEW_20260907.md)
from the shared recovery evidence. Its original bytes have SHA-256
`a9ba26bb4e7d4304a4a36e3b26e9d442b320d6d85a0b78c77dda015a4e2e2646`. Its verdict concerns head `f1b7c5510f788e4db2799c050e75a022edd0bacc`,
not the corrected candidate. It records a Claude-family reviewer, 62 row
dispositions, two MAJOR findings and `PASS_WITH_CORRECTIONS`.

The historical reviewer did not retrieve NIST AI 100-1. It also lacks exact
start/end times and a served session identifier. Those limitations are
preserved; this record does not fabricate them or complete the review gate.
Fable-FAC has been requested to review the corrected exact head using the
primary source and record the packet's required evidence.

## Prepared corrections and owner disposition

The owner instructed push and merge of PR #42. That authorizes the merge work;
it is not recorded as an explicit disposition of previously undisclosed major
findings. The [review packet](PR42_XW002_BOUNDED_DIFFERENT_MODEL_REVIEW_PACKET.md)
requires an explicit owner disposition for every MAJOR finding.

| Finding | Severity | Prepared correction | Owner disposition |
| --- | --- | --- | --- |
| F-001 | MAJOR | Remove GOVERN 2.1 from DELEGATION-001, AUTHUSE-004 and REVIEW-003; retain Direct evidence candidate / GOVERN 3.2 | PENDING; recommended ACCEPT |
| F-002 | MAJOR | Remove MEASURE 2.5 from RECEIPT-003 and AUTHUSE-002; move CONTEXT-002 and CONTEXT-003 to No direct mapping | PENDING; recommended ACCEPT |
| F-003 | MINOR | Move CANON-007 to No direct mapping | Prepared as recommended |
| F-004 | OBSERVATION | Add explicit evidence-supply-only MEASURE 2.8 caveat in §4.3 | Prepared as recommended |
| F-005 | OBSERVATION | Preserve original drafting-model uncertainty | No back-filled identity |
| F-006 | OBSERVATION | Incorporate current main and preserve its README specification/citation wording and the crosswalk paragraph | Integration conflict resolved |

Finding IDs above abbreviate `PR42-XW2-REV-F-001` through `-006`.
These are conservative changes to informative mappings. No requirement text,
allocation, profile, gate code or ISO Annex A mapping changes. The generated
distribution is 5 Direct evidence candidate, 23 Contributes, 3
Deployment-declared, 30 No direct mapping and 1 Superseded.

## Source and compatibility check

Astra reopened [NIST AI 100-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
on October 1. GOVERN 2.1 concerns organization-wide risk responsibilities and
communication; GOVERN 3.2 concerns human-AI roles. MEASURE 2.5 concerns deployed
AI-system validity/reliability and generalization limits; MEASURE 2.7 concerns
security/resilience evaluation. These support narrowing the reviewed rows.
This is an author-side correction check, not Fable's required separate review.

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
