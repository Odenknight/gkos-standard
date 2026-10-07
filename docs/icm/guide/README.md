# Workflow: guide (beginner's guide maintenance)

Status: **proposed** (worker-claude-A for Fable-FAC, 2026-10-07). Grants no authority.

Use this workflow to create or change the beginner's guide: the top-level `guide/` folder with a README index, numbered chapters (`01-...md` onward) and a glossary, written for a capable non-specialist. The guide is informative. It explains the specification in plain words and links every factual statement to the file that controls it. It never adds a requirement, a profile or a claim.

The guide has a byte-identical mirror on the agent share at `_Agents/_work/ICM/gkos-standard/guide/`. Until the guide is merged, the mirror follows the branch; after the merge, the repository copy is canonical and the mirror is refreshed from it.

Do not use this workflow to change the documents the guide links to. A wrong source document goes through [edit](../edit/README.md); a missing or stale figure goes through [graphics](../graphics/README.md).

## Stages

| Stage | Job | Main output |
| --- | --- | --- |
| `01-scope` | Name the trigger, the chapters affected, each statement to add or change and its authoritative source | `scope.json` |
| `02-draft` | Write or change the chapters on one branch; reuse figures; propose earmarks; refresh the mirror | Commit, `change.patch`, `rows.md` |
| `03-check` | Lint, links, wording and edition checks, map drift, mirror comparison | `results.json` |
| `04-review` | Independent review for accuracy against sources and for plain language | `REVIEW.md` with a verdict |

`dependencies.json` is linear. Skips follow the router's "Skips and late entry" rule. A typo or broken link in one chapter may go `01-scope → 02-draft → 03-check` with `04-review` recorded `NOT_APPLICABLE`, only when no sentence changes meaning. Any new or changed factual statement needs `04-review`.

## When the guide must change

- A new edition is published, or `CITATION.cff` names a new version: chapter headers and every edition statement.
- A decision record is accepted that changes a concept the guide explains.
- A figure the guide uses is replaced or marked historical in the graphics register.
- The area tracker `docs/icm/map/areas/guide.md` or `REPO-MAP.md` lists a stale-edition candidate or retired maturity wording in `guide/`.

## Rules for guide text

- Each page opens with a one-line header that says the page is informative, names the edition it describes and links the claims policy.
- Current maturity uses the D2 wording exactly: "GKOS is a developmental specification (public working draft). It began as a single-author pre-standard concept; the goal is to advance it to a pre-standard through an open, multi-stakeholder committee process." Shorter references say "developmental specification".
- Plain, direct, active voice. Short sentences. Define a term before using it, and link the glossary entry.
- Every factual statement links to its authoritative file with a relative link. If no file supports a statement, the statement goes.
- Never claim certification, conformance, consensus, endorsement, accreditation or qualification. Never use *first, only, novel, certified, recognized, admissible* or *approved* as claims about the work.
- Reuse figures from `illustrated/figures/` and `graphics/` with relative links and alt text. Do not copy image files into `guide/`.
- Where a figure would help and none exists, propose an earmark in `rows.md`. Insert the earmark only if the packet also grants the graphics register.

## Small example

Task: a new edition changes the version named in chapter 1 and the glossary.

1. `01-scope`: targets are the chapter 1 header and the glossary entry for "edition"; source is `CITATION.cff`; trigger is the publication record the packet names.
2. `02-draft`: one commit with DCO sign-off; mirror refreshed.
3. `03-check`: lint, links, `node scripts/icm-map.mjs --check`, mirror comparison.
4. `04-review`: recorded `NOT_APPLICABLE` only if the edit changes nothing but the coordinate; otherwise a reviewer reads the changed sentences against the sources.
