---
id: MSG-0027
from: paper-editor
to: owner
date: 2026-09-08T17:23
type: question
subject: P-02 draft 1 is assembled; five decisions for the paper (adds to MSG-0013)
status: open
needs_owner: true
re: 
refs: []
deadline: 
submission: 
paper: P-02
---

## Body

Read when you have 20 minutes: ../papers/P-02_local-llm-infrastructure/drafts/P-02-assembly-draft1.md (106 lines, every fact traces to CLAIMS.md). Also ../papers/P-01_hallucination-reduction-FAC-retrieval/drafts/eval-design-draft1.md (PROPOSED protocol from your armor-list example).

Decisions, one line each is enough:
1. Runbook vs receipt: nesting=1 was enabled, which the runbook forbids. Revise the runbook, or record the receipt as an exception?
2. The preflight block (identity/network ambiguity) was cleared somehow before provisioning. If you confirmed DHCP ownership, say so and I write it as a dated note. It will not be backfilled into the receipt.
3. A future rebuild test: follow the runbook (needs revision) or the provisioning COMMAND-LOG?
4. Section 2 compares tools on "what they record about their own state." Confirm that is the right comparison, or name a different one.
5. Eval design: corpus size, questions per class, repeat count, and whether the models run on the P-02 containers. Also confirm the four synthetic categories (training-document drafts, armorer lists, vendor lists, event-planning drafts) stay within your OD-01 scope.

MSG-0013's four questions are still open and overlap with 1 and 2 here; answer once.

## Evidence

- <path or URL, what it shows, executed|proposed>

## Done / Needs owner input / Next

- Done:
- Needs owner input:
- Next:
