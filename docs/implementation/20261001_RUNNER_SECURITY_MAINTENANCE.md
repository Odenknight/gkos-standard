# Development runner dependency maintenance — 2026-10-01

The development runner lock updates only the transitive `fast-uri` dependency
from 3.1.6 to 3.1.8. The former fails the required high-severity dependency audit.
The update changes its version, npm URL and integrity digest; runner code,
requirements, schemas, fixtures, normative annexes and profile standing stay
at the published technical baseline.

The owner instructed Astra-Oden to push and merge PR #42 in the October 1
session. This maintenance is prepared as the necessary dependency correction;
merge still requires successful exact-head checks and the crosswalk review
packet's completion. This is no new edition, publication authorization,
independent qualification, or owner disposition of semantic review findings.

## Separate published and development validation

- `verify-v0821-release.mjs` without flags retains the strict publication
  freeze. `--post-tag` retains the signed exact-target publication checks.
- Current development CI passes `--development`. It first verifies that the
  published v0.82.1 technical sources match v0.82. It then permits only the
  development lock change above. Every other lock field and dependency must
  match; all other technical files must remain byte-identical to the tag.
- The development guard rejects changes to historical release packages and
  rejects combining development and post-tag validation. Existing source
  inventories continue to verify the published tag's exact artifacts.
- The blocking dependency audit and all runner lanes remain enabled. The
  maintenance guard cannot replace the audit or qualify a profile.

No historical tag, signed attestation, asset, inventory or publication-control
record is rewritten. The existing v0.82.1 documentation-patch assertions
describe that publication. Any later dependency update or technical change
requires its own reviewed maintenance or release decision.

Advisories reported by the audit: GHSA-qw65-cvwx-89v3,
GHSA-58mr-gqgx-xq4g and GHSA-hrr3-gc8f-f4qj. Final audit, runner tests,
publication integrity and negative guard checks must be recorded at the
corrected PR head before merge.
