# RRET-01 — Golden adversarial retrieval corpus

Status: **provisional, non-normative, non-qualifying**

RRET-01 is the first retrieval-focused falsification corpus for GKOS. It is deliberately designed so that relevance retrieval can produce a plausible but non-operative top result while GKOS governance either selects eligible evidence, expands retrieval, abstains, or escalates.

This corpus does not modify the published GKOS v0.81 standard, create a new profile, qualify an implementation, or establish production authority. It is intended to drive the next standard revision and the Rust GKOS-Engine retrieval implementation.

## What RRET-01 proves

The corpus separates two proof obligations that must both hold:

1. **Governance isolation.** Retrieval may rank superseded, withdrawn, purpose-incompatible, or otherwise non-operative evidence first. Governance state must not be smuggled into relevance scoring.
2. **Retrieval sufficiency.** Eligible evidence must remain discoverable. If the initial candidate window contains no eligible candidate, the system expands retrieval, abstains, or escalates rather than answering from whatever remains.

The paired headline measurements are:

- False Current-State Rate (FCSR).
- Eligible Candidate Recall at K, including ECR@5, ECR@10, ECR@20, and ECR@50.

A falling abstention rate is not automatically progress. If abstention falls before eligible-candidate recall rises, the implementation should be treated as suspect for governance leakage or unsafe fallback behavior.

## Retrieval representations

Retrieval representations (RRs) are discovery-only projections. They may contain question-shaped or answer-candidate text to improve retrieval, but they are not evidence and have no authority.

Every fixture RR carries a generator reference and content digest. Production RR generation is expected to record the generator model, model version, prompt identifier and digest, software version, source-content digest, RR-content digest, and enough information to regenerate the projection.

**RR content must never be rendered as the authoritative answer.** Answer composition must quote or cite the underlying evidence object. Regenerating an RR must not mutate its evidence object.

## Query intent

Query intent is a caller control field, not a model-selected policy switch. If the caller omits intent, the effective intent defaults to `CURRENT_STATE`.

A model may help a caller formulate a request, but it must not silently select a weaker governance regime because natural-language wording appears historical, investigative, or source-scoped.

## SOURCE_SCOPED superseded material

A source-scoped query may inspect superseded evidence. That material remains structurally tagged as superseded and non-operative.

The enforcement point is not a consumer acknowledgement boolean. The ContextBundle compiler must preserve the restriction, and L7 must refuse an effect whose justification chain relies on the tagged object unless a separate authorization receipt permits that use. Any human acknowledgement is an audit receipt, not authority by itself.

## The ten failing cases

| Fixture | Failure exposed | Required behavior |
| --- | --- | --- |
| `RRET-01-N01` | Superseded current-state result ranks first | Select current eligible evidence without changing raw rank |
| `RRET-01-N02` | Withdrawn high-similarity result ranks first | Exclude withdrawn evidence from operative answer |
| `RRET-01-N03` | Conflicting witnesses have no adjudication | Abstain or escalate |
| `RRET-01-N04` | Training-only material outranks production material | Enforce purpose binding |
| `RRET-01-N05` | Superseded source is explicitly requested | Return tagged evidence for inspection; deny operative effect without separate authorization |
| `RRET-01-N06` | Only eligible candidate is outside K=5 | Expand retrieval; ECR@5 fails and ECR@10 succeeds |
| `RRET-01-N07` | Query wording sounds historical but caller omitted intent | Default to `CURRENT_STATE`; do not infer a weaker intent |
| `RRET-01-N08` | Candidate set contains zero eligible items | Expand or abstain; never substitute an ineligible item |
| `RRET-01-N09` | Current evidence requires Human Operator authority | Create escalation/Human To Do path; deny agent effect |
| `RRET-01-N10` | Identical semantic content has different governance state | Preserve relevance tie and let governance select the operative object |

## Type-system isolation requirement for the Rust rebuild

The corpus is a regression test, not the primary proof of isolation. The Rust implementation should make governance leakage structurally impossible:

- the `gkos-retrieval` crate must not depend on the crate that defines `GovernanceState` or equivalent eligibility/disposition types;
- retrieval input types must contain only retrieval-relevant fields and opaque evidence identifiers;
- governance evaluation must consume the returned candidate identifiers in a separate crate or layer;
- CI should include a dependency-boundary check so adding the forbidden dependency fails the build.

This requirement is intentionally not promoted into a new named normative abstraction here. It should first emerge as an Engine struct/API and be compared with GKOS-Engine-Lite. Promotion into the standard should wait until at least two implementations need the same record.

## Acceptance use

RRET-01 should be consumed in this order:

1. validate corpus structure and fixture integrity;
2. replay raw rankings exactly as declared;
3. evaluate candidate eligibility separately;
4. verify expected answer, expansion, abstention, or escalation behavior;
5. compute FCSR and eligible-candidate recall;
6. verify answers cite evidence objects rather than RR text;
7. verify source-scoped restrictions survive ContextBundle compilation into L7 enforcement.

The corpus should remain adversarial. Do not tune retrieval scoring to make the fixtures look easier. Natural retrieval quality is evaluated separately from the isolation cases.
