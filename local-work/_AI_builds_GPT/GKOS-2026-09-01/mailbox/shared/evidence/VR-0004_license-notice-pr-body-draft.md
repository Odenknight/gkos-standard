# Draft PR body (not pushed): version-neutral citation examples

**Observed at main 765c081523ec24fae0b462b1c221ea2033c52970 on 2026-09-08.**

LICENSE.md line 15 and NOTICE.md lines 4 and 11 give attribution examples pinned to v0.76 and v0.77. Readers copying the example cite the wrong release.

## Proposed change

Replace the pinned example in both files with a pattern plus a pointer:

> Cite the specific GKOS release you used. Pattern:
> Governed Knowledge Operations Standard (GKOS), GKOS-<release-date> v<version>, by Shaun "Oden" Marshall, licensed under CC BY 4.0. Changes, if any, are identified by the modifier.
> Current release and DOI: see CITATION.cff.

NOTICE.md line 4 `Release:` line: either remove or make it read `Release: see CITATION.cff (current: v0.81)` and add it to the release checklist so it cannot go stale silently.

Historical release folders are untouched. No change to license terms. Owner decision needed only on whether NOTICE.md keeps a hard-coded current version at all.
