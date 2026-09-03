#!/usr/bin/env bash
set -euo pipefail

candidate_dir="release-candidates/v0.81-rc1"
expected_base="c9a37d7016efb67e79e454d05f8ba6a7561dd270"
expected_requirements=62
expected_gate_codes=28

required_files=(
  README.md
  CHANGELOG.md
  CITATION.cff
  LICENSE.md
  NOTICE.md
  ROADMAP.md
  standard/00_GKOS_Master_Standard.md
  standard/annexes/Canonical_Serialization.md
  standard/annexes/Authority_and_Refusal_Receipt_Fields.md
  standard/annexes/Diagnostic_Code_Registry.md
  standard/annexes/Conformance_Profiles.md
  standard/annexes/Layer_Interface_Contracts.md
  requirements/REGISTRY.md
  requirements/PROFILE_APPLICABILITY.md
  decisions/GKOS_Decision_Register.md
  decisions/R17_Authority_Validity_Interval_Development_Decision_Record.md
  decisions/R18_Track_A_GCP45_and_Authorized_Independent_Review_Development_Decision_Record.md
  decisions/R19_Documentation_Intent_Eighth_Invariant_Development_Decision_Record.md
  decisions/R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md
  decisions/R21_Ecosystem_Interoperability_Program_Development_Decision_Record.md
  "$candidate_dir/README.md"
  "$candidate_dir/RELEASE_MANIFEST.yml"
  "$candidate_dir/RELEASE_NOTES.md"
  "$candidate_dir/EVIDENCE_INDEX.md"
  "$candidate_dir/PUBLICATION_CHECKLIST.md"
  "$candidate_dir/SHA256SUMS.txt"
)

for path in "${required_files[@]}"; do
  test -f "$path" || { echo "missing v0.81 RC file: $path" >&2; exit 1; }
done

bash scripts/check-current-release.sh

grep -Fq 'version: "0.81"' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'candidate: rc1' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'status: release-candidate-unpublished' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq "candidate-base-sha: $expected_base" "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'publication-date: pending-owner-approval' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'tag: NOT_CREATED' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'profile-qualification: none' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'public-second-implementation: awaiting' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'release-authorization: NOT_GRANTED' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'machine-exchange-contract: GKX-2.0' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'canonical-artifact-profile: GKX-CBOR-1' "$candidate_dir/RELEASE_MANIFEST.yml"

allocations="$(sed -n '/^## Active allocations$/,/^## Accepted unpublished allocations$/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ')"
unpublished="$(sed -n '/^## Accepted unpublished allocations$/,/^## Append-only status/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ')"
total=$((allocations + unpublished))
test "$total" -eq "$expected_requirements" || {
  echo "expected $expected_requirements candidate requirements, found $total" >&2
  exit 1
}

gate_codes="$(grep -Ec '^\| GKOS-GATE-L[0-9]-[0-9]{3} \|' standard/annexes/Diagnostic_Code_Registry.md)"
test "$gate_codes" -eq "$expected_gate_codes" || {
  echo "expected $expected_gate_codes diagnostic gate codes, found $gate_codes" >&2
  exit 1
}

grep -Fq 'permanent-requirement-count: 62' "$candidate_dir/RELEASE_MANIFEST.yml"
grep -Fq 'diagnostic-gate-code-count: 28' "$candidate_dir/RELEASE_MANIFEST.yml"

if grep -E '"qualifying_profiles"[[:space:]]*:[[:space:]]*\[[^]]+\]' \
  fixtures/fixtures.manifest.json fixtures/track-a/fixtures.manifest.json 2>/dev/null; then
  echo "candidate fixture catalog unexpectedly declares a qualifying profile" >&2
  exit 1
fi

if grep -Eqi 'publication-status:[[:space:]]*(published|authorized-for-publication)|GKOS certified|independently certified|regulator-approved' \
  "$candidate_dir/README.md" "$candidate_dir/RELEASE_NOTES.md" "$candidate_dir/RELEASE_MANIFEST.yml"; then
  echo "v0.81 RC package overstates publication/certification standing" >&2
  exit 1
fi

if find releases -maxdepth 1 -type d -name '*-v0.81' | grep -q .; then
  echo "dated v0.81 release directory exists before final publication approval" >&2
  exit 1
fi

(
  cd "$candidate_dir"
  sha256sum -c SHA256SUMS.txt
)

head_sha="$(git rev-parse HEAD)"
if [[ -n "${GITHUB_SHA:-}" && "${GITHUB_EVENT_NAME:-}" == "push" ]]; then
  test "$head_sha" = "$GITHUB_SHA" || {
    echo "checkout HEAD does not match GITHUB_SHA" >&2
    exit 1
  }
fi

echo "v0.81 RC validation PASS"
echo "candidate runtime head: $head_sha"
echo "candidate requirement count: $total"
echo "candidate gate-code count: $gate_codes"
echo "profile qualification: none"
echo "publication authorization: not granted"
