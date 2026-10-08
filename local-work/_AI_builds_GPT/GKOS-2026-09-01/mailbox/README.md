# GKOS multi-agent mailbox

Root: `C:\Users\FAC\Documents\_AI_builds_GPT\GKOS-2026-09-01\mailbox\`
Created 2026-09-08. Owner: Shaun "Oden" Marshall.

Consolidation update: [migration record](shared/evidence/MIGRATION-2026-09-08.md), [byte/hash receipt](shared/evidence/MIGRATION-RECEIPT-2026-09-08.json), and [initial source limitations](shared/evidence/INITIAL-SOURCE-REGISTER.md). The former `submissions_papers/mailbox` now contains compatibility pointers. Use this mailbox and BOARD.md for coordination.

New author material: [origin timeline and editorial brief](../papers/ORIGIN-TIMELINE-AND-BRIEF.md). Messages MSG-0007 through MSG-0009 route the changes to lead-correspondence, paper-editor and evidence-verifier.

This is a file-based mailbox. Any agent (Claude Code, Codex, a local LLM, or a person) participates by reading its inbox, writing to another party's inbox, and updating the shared board. No agent sends anything outside this folder tree. Only the owner sends.

## Parties

| Address | Who | Reads | Writes | Standing role |
|---|---|---|---|---|
| `owner` | Shaun "Oden" Marshall | `owner/inbox/` | `owner/outbox/` (dictated notes, decisions, approvals) | Decides. Approves. Sends. |
| `lead-correspondence` | agent | own inbox | drafts in the owner's voice, message briefs, change notes | Turns dictated notes into drafts; assigns tasks to other agents |
| `evidence-verifier` | agent | own inbox | fact checks, source register rows, hashes, dates | Every claim about repos, versions, DOIs, dates, tests. Runs the tool or writes `not verified`. |
| `technical-fixtures` | agent | own inbox | fixture runs, worked examples, failure examples | Executes tests. Labels every result `executed` or `proposed`. |
| `reviewer` | agent | own inbox | independent check of final packages | Never edits the draft it reviews. Passes or returns with findings. |
| `paper-editor` | agent | own inbox | outlines, claim ledgers, section drafts | Organizes notes into the three papers under `../papers/`. |

Add a party by creating `agents/<name>/inbox/` and `agents/<name>/outbox/` and a row here.

## Layout

```
mailbox/
  README.md                 this file (the protocol)
  AGENTS.md                 standing instructions every agent loads first
  BOARD.md                  live task board (single source of what is open)
  owner/inbox|outbox/
  agents/<name>/inbox|outbox/
  shared/
    decisions/              OD-series owner decisions, one file each, never edited after signing
    registers/              contribution-register.yaml, submission-log.csv, release-register.csv
    evidence/               verification receipts agents produce (hashes, tool outputs, screenshots)
  archive/YYYY-MM/          processed messages, moved here by the recipient
  templates/                message, decision-request, decision, review, verification-receipt
  scripts/mailbox.py        new / list / archive / board helpers
```

Related trees the mailbox coordinates but does not contain:

- `../voice/` transcripts, samples, STYLE.md (Execution Guide Phase 0)
- `../submissions/S-xx_*/` one folder per submission: `drafts/ sent/ ack/ public/ README.md`
- `../papers/` three papers plus `notes/inbox/` for raw thoughts

## Message rules

1. **One file, one message.** Filename: `YYYYMMDD-HHMM_MSG-NNNN_<from>_to_<to>_<slug>.md`. NNNN comes from `shared/.counter`. Use `scripts/mailbox.py new` so the id is never reused.
2. **Frontmatter is the envelope.** Required fields: `id, from, to, date, type, subject, status, needs_owner`. Optional: `re` (id being answered), `refs` (paths, URLs, commit SHAs), `deadline`, `submission`, `paper`.
3. **Types:** `task` (do this), `report` (done or blocked, with evidence), `question` (blocks progress), `decision-request` (owner must choose; give options and a recommendation), `decision` (owner only), `review` (reviewer verdict), `note` (owner dictation, raw).
4. **Status lifecycle:** `open` then `in-progress` then `done`, `blocked`, or `superseded`. The sender sets `open`. The recipient owns the status afterward. When a message reaches a terminal status, the recipient moves it to `archive/YYYY-MM/` and refreshes BOARD.md.
5. **A message lives in exactly one place.** Deliver to the inbox, keep no copies. Replies are new messages that cite `re:`.
6. **Evidence or `not verified`.** Any fact about repo state, versions, dates, tests, DOIs, or external documents states the tool run or the document opened. Otherwise write `not verified`. This is rule 3 of AGENTS.md and it overrides everything else.
7. **Executed vs proposed.** Every test result carries one of those two words. A proposed test is never presented as a result.
8. **Owner decisions are OD-series.** Anything about what to claim, file, pay for, or send goes to `owner/inbox/` as a `decision-request`. The owner answers with a `decision` and the lead copies the signed decision into `shared/decisions/OD-NN_<slug>.md`.
9. **Sent items are frozen.** Once a submission is sent, its `sent/` folder and its log row are never edited. Corrections are new rows and new messages.
10. **Owner reads only `owner/inbox/`.** Agents keep it short: decision requests, blocking questions, and packages ready for approval. Progress goes to BOARD.md, not the owner's inbox.

## Daily rhythm

1. Owner dictates. The unedited transcript goes to `../voice/transcripts/YYYY-MM-DD-<topic>.md`. A `note` message pointing at it goes to `agents/lead-correspondence/inbox/` (or the owner drops the raw text in `owner/outbox/` and the lead files it).
2. Lead reads it, files tasks to other agents, drafts, and posts one `report` or `decision-request` to `owner/inbox/` at most once a day unless something is blocking.
3. Each agent: read inbox, act, write reports, archive processed messages, refresh BOARD.md with `python scripts/mailbox.py board`.
4. Owner reviews `owner/inbox/`, answers by voice or text into `owner/outbox/`, and the lead routes it.

## Priority order (from the Execution Guide, 2026-09-08)

1. S-01 NIST AI 300-1 comment. Internal send target 2026-09-14, deadline 2026-09-16.
2. Phase 1 evidence reconciliation and Phase 3 contribution register, because no external submission cites a mechanism until its register entry has a finding.
3. S-02 OECD.AI, S-07 INCITS, S-08 JTC 21 inquiries by 2026-09-18.
4. S-03, S-04, S-05 in October.
5. Papers P-01, P-02, P-03 run in parallel under `paper-editor` and never block a submission.

## Quick start for a new agent session

```
1. Read mailbox/AGENTS.md
2. Read mailbox/BOARD.md
3. ls mailbox/agents/<your-name>/inbox/
4. Work. Write reports with: python mailbox/scripts/mailbox.py new --from <you> --to <party> --type report --subject "..."
5. Archive what you finished: python mailbox/scripts/mailbox.py archive <MSG-id>
6. python mailbox/scripts/mailbox.py board
```
