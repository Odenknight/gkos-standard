# R25 — v0.83 development line

Status: Proposed

**Date drafted:** 2026-10-07

**Acceptance:** none. This record is a proposal. Only the Founder and Initial
Editor may accept it.

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Prepared by:** an AI agent (worker-claude-E, Claude Opus 5.5) under the
owner's 2026-10-07 consolidation instruction and owner decisions D1 and D2.
The agent proposes; it does not decide.

**Input baseline:** `gkos-standard` `main` at
`797174485e86cbc250f52ac897d86b226c160622`. The current published edition is
GKOS-2026-09-24 v0.82.1, a documentation patch on the v0.82 technical
baseline, at signed tag `v0.82.1` (target
`3a62e4a02d674a574d87e01c10dc88b7715de037`).

**Change class (proposed):** Clarification of release administration and
repository validation. R25 itself changes no requirement, gate code, schema,
fixture, runner behaviour or profile standing.

## 1. Decision and purpose

While `CITATION.cff` names v0.82.1, the release validator holds the five
technical paths on `main` byte-identical to the published technical baseline:
`requirements/`, `schemas/`, `fixtures/`, `conformance/runner/` and
`standard/annexes/`. The only exception is the reviewed `fast-uri` lock pin
(see [runner security maintenance](../docs/implementation/20261001_RUNNER_SECURITY_MAINTENANCE.md)).
That freeze protects the published edition. It also blocks every
current-wording fix and every amendment on `main` inside those paths.

R25 proposes to open a **v0.83 development line** on `main`:

1. Published v0.82.1 stays immutable at its signed tag. Its package under
   `releases/`, the earlier packages, `release-candidates/` and the
   publication records under `docs/releases/` are not edited.
2. `main` may change the five technical paths for the next edition. Each
   change follows the `GOVERNANCE.md` v0.x amendment path. A
   normative-compatible or breaking change still needs its own Development
   Decision Record (for example, proposed R26). R25 adopts no such change.
3. Claims stay bound to published editions. A conformance or interoperability
   claim cites an exact published edition, as
   [the claims policy](../conformance/CLAIMS_POLICY.md) requires. `main`, the
   v0.83 development line and any unreleased text support no claim.
4. The nomenclature change in section 4 is recorded.
5. Release of v0.83 needs a separate, later release decision (section 6).

## 2. What stays fixed

- The `v0.82.1` tag, its target, signature and attestation.
- The technical sources at that tag. They must equal tag `v0.82`.
- Every file under `releases/` and `release-candidates/`.
- Publication records, archive verification records and the publication
  control record under `docs/releases/`.
- Accepted decision records, released `CHANGELOG.md` sections and archive
  folders. They keep their original words.
- The 62 permanent requirement allocations and the 28 diagnostic gate codes of
  the published edition. Allocated IDs are never deleted, renumbered or reused.

## 3. What the development line permits

After acceptance, `main` may carry, in the five technical paths:

- current-state prose that names the current edition and uses the section 4
  wording, with IDs, rows and original requirement text unchanged;
- informative clarifications under the edit workflow;
- normative changes only under an accepted Development Decision Record that
  names them;
- dependency maintenance after review and the blocking dependency audit.

These are development changes. They describe no published edition until a
release decision publishes them.

## 4. Nomenclature (owner decision D2)

Current material uses exactly this wording:

> GKOS is a developmental specification (public working draft). It began as a
> single-author pre-standard concept; the goal is to advance it to a
> pre-standard through an open, multi-stakeholder committee process.

The only shorter form for current-state references is “developmental
specification (public working draft)”. “Pre-standard” stays as
history: it names the concept's single-author inception and the committee goal.
Release records, publication records, accepted decision records, released
`CHANGELOG.md` sections and archives keep their original words.

## 5. Validator control

`scripts/verify-v0821-release.mjs --development` reads a machine-checkable
marker. The marker is set when the tracked file
`decisions/R25_V083_Development_Line_Development_Decision_Record.md` holds a
line that reads exactly `Status: Accepted` and no line that reads exactly
`Status: Proposed`. Only the owner sets it. This draft carries the proposed
status line, so the marker is not set.

In development mode the validator always checks that:

- development and post-tag validation are not combined;
- the technical sources at tag `v0.82.1` equal tag `v0.82`;
- no untracked, non-ignored file exists under the five technical paths,
  `releases/` or `release-candidates/` (review finding
  `edit-20261007-consistency-REV-012`);
- `releases/` and `release-candidates/` equal the published tag;
- the shared content checks still pass: 62 active allocations, 28 gate codes,
  empty `qualifying_profiles` and unchanged historical packages.

While the marker is not set, the existing guard stays in force: the five
technical paths must equal the published tag, except the reviewed `fast-uri`
lock pin, and every other lock field must match.

When the marker is set, `main`'s five technical paths may differ from the
published tag. The checks listed above still apply.

Strict publication validation (no flag) and `--post-tag` validation do not
read the marker. Their behaviour is unchanged.

`scripts/test-verify-v0821-development.mjs` runs the positive and negative
cases in a temporary clone. It also compares strict and post-tag outcomes with
the validator at the input baseline.

## 6. Release gating for v0.83

R25 authorizes no release. A v0.83 edition needs its own accepted release-gate
decision on the R24 pattern: release claim class, governing-authority
reconciliation, actual publication date, one frozen candidate, the normative
population and its counts, machine-readable coordinate consolidation, the
nine blocking checks, dependency security, package completeness, repository
release controls, a separate explicit owner publication disposition and
archival verification. That decision also replaces the v0.82.1 validator
routing in `scripts/check-current-release.sh`. Any change to the 62 active
allocations or 28 gate codes fails the current validator until then.

## 7. Merge order

1. The validator change and this proposal may merge with the proposed status
   line. CI then keeps the current strict development guard.
2. Frozen-path edits merge only after the owner accepts R25 by setting the
   marker. Before that, they fail the `validate` check by design.

## 8. Acceptance procedure (owner)

To accept, the owner replaces the proposed status line with the exact
accepted status line named in section 5, adds an acceptance date, and moves
the register entry from “Proposed decisions” to “Accepted decisions”. To
reject, the owner records the disposition and leaves the proposed status line
in place or removes the record by pull request.

## 9. Disclosure under GOVERNANCE.md

- **Evidence and review considered:** the published v0.82.1 control record and
  publication record; R24; the runner security maintenance record;
  `scripts/verify-v0821-release.mjs` at the input baseline; review finding
  `edit-20261007-consistency-REV-012` (MINOR, local untracked files); the
  scripted validator test matrix in this change.
- **Change class:** proposed Clarification of release administration and
  validation. No normative content.
- **Decision and limitations:** opens a development line only. It qualifies no
  profile, certifies nothing and publishes nothing. The validator reads the
  marker from the checkout, so a local edit can set it; the required CI checks
  on a pull request remain the gate, and the marker counts only when the owner
  merges it.
- **Material conflicts:** the owner has a material project interest in the
  outcome. The drafting agent works under the owner's authority.
- **Release or rollback route:** before acceptance, revert by pull request.
  After acceptance, a later owner decision may close the line by restoring the
  proposed status line; the strict guard then applies again and any
  frozen-path change on `main` fails `validate` until reverted. Published
  packages are never rewritten.
- **Review:** self-attested agent drafting. No advisory or independent review
  has been done at drafting time.

## 10. Authority and exclusions

R25 does not authorize a tag, GitHub Release, DOI, publication, requirement
allocation, gate-code change, profile qualification, conformance claim,
certification, consensus statement or any Engine or product release.
