#!/usr/bin/env bash
set -euo pipefail

candidate_dir="release-candidates/v0.82-rc1"
expected_requirements=62
expected_gate_codes=28
manifest="$candidate_dir/RELEASE_MANIFEST.yml"

required_files=(
  README.md
  CHANGELOG.md
  CITATION.cff
  .zenodo.json
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
  decisions/R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md
  decisions/R21_Ecosystem_Interoperability_Program_Development_Decision_Record.md
  decisions/R22_Canonical_Informative_Architecture_Development_Decision_Record.md
  decisions/R23_Layer3_Interoperability_Semantics_Development_Decision_Record.md
  decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md
  releases/2026-09-03-v0.81/SHA256SUMS.txt
  "$candidate_dir/README.md"
  "$manifest"
  "$candidate_dir/RELEASE_NOTES.md"
  "$candidate_dir/EVIDENCE_INDEX.md"
  "$candidate_dir/PUBLICATION_CHECKLIST.md"
  "$candidate_dir/SHA256SUMS.txt"
)

for path in "${required_files[@]}"; do
  test -f "$path" || { echo "missing v0.82 RC file: $path" >&2; exit 1; }
done

# The published v0.81 edition must remain intact and current until approval.
bash scripts/check-current-release.sh

for expected in \
  'version: "0.82"' \
  'candidate: rc1' \
  'release-class: informative-edition' \
  'status: release-candidate-unpublished' \
  'publication-date: pending-owner-approval' \
  'tag: NOT_CREATED' \
  'current-release: false' \
  'profile-qualification: none' \
  'qualifying-profiles: []' \
  'public-second-implementation: awaiting' \
  'release-authorization: NOT_GRANTED' \
  'machine-exchange-contract: GKX-2.0' \
  'canonical-artifact-profile: GKX-CBOR-1' \
  "permanent-requirement-count: $expected_requirements" \
  'new-allocation-count: 0' \
  "diagnostic-gate-code-count: $expected_gate_codes"; do
  grep -Fxq "$expected" "$manifest" || { echo "RC manifest lacks: $expected" >&2; exit 1; }
done

allocations="$(sed -n '/^## Active allocations$/,/^## Accepted unpublished allocations$/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ')"
unpublished="$(sed -n '/^## Accepted unpublished allocations$/,/^## Append-only status/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ' || true)"
test "$allocations" -eq "$expected_requirements" || {
  echo "informative edition requires $expected_requirements active requirements, found $allocations" >&2
  exit 1
}
test "$unpublished" -eq 0 || {
  echo "informative edition must not carry unpublished allocations, found $unpublished" >&2
  exit 1
}

gate_codes="$(grep -Ec '^\| GKOS-GATE-L[0-9]-[0-9]{3} \|' standard/annexes/Diagnostic_Code_Registry.md)"
test "$gate_codes" -eq "$expected_gate_codes" || {
  echo "expected $expected_gate_codes diagnostic gate codes, found $gate_codes" >&2
  exit 1
}

while IFS= read -r path; do
  test -f "$path" || { echo "manifest lists missing file: $path" >&2; exit 1; }
done < <(sed -n 's/^  - \(\(decisions\|fixtures\|schemas\|standard\)\/.*\)$/\1/p' "$manifest")
while IFS= read -r dir; do
  test -f "$dir/SHA256SUMS.txt" || { echo "preserved release missing: $dir" >&2; exit 1; }
done < <(sed -n 's/^  - \(releases\/.*\)$/\1/p' "$manifest")

if grep -E '"qualifying_profiles"[[:space:]]*:[[:space:]]*\[[^]]+\]' \
  fixtures/fixtures.manifest.json fixtures/track-a/fixtures.manifest.json 2>/dev/null; then
  echo "candidate fixture catalog unexpectedly declares a qualifying profile" >&2
  exit 1
fi

if grep -Eqi 'publication-status:[[:space:]]*(published|authorized-for-publication)|GKOS certified|independently certified|regulator-approved|R23 (is|becomes) normative' \
  "$candidate_dir/README.md" "$candidate_dir/RELEASE_NOTES.md" "$manifest"; then
  echo "v0.82 RC package overstates publication, certification or R23 standing" >&2
  exit 1
fi

if find releases -maxdepth 1 -type d -name '*-v0.82' | grep -q .; then
  echo "dated v0.82 release directory exists before publication approval" >&2
  exit 1
fi
if git rev-parse --verify -q refs/tags/v0.82 >/dev/null; then
  echo "v0.82 tag exists before publication approval" >&2
  exit 1
fi

(
  cd "$candidate_dir"
  sha256sum -c SHA256SUMS.txt
)

echo "v0.82 RC validation PASS"
echo "candidate runtime head: $(git rev-parse HEAD)"
echo "candidate requirement count: $allocations"
echo "candidate gate-code count: $gate_codes"
echo "profile qualification: none"
echo "publication authorization: not granted"
