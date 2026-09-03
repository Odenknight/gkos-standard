#!/usr/bin/env bash
set -euo pipefail

expected_version="0.81"
expected_requirements=62
mode="${1:---pre-tag}"
[[ "$mode" == "--pre-tag" || "$mode" == "--post-tag" ]] || exit 1

version="$(awk -F'"' '/^version: "/ { print $2; exit }' CITATION.cff)"
release_date="$(awk -F'"' '/^date-released: "/ { print $2; exit }' CITATION.cff)"

[[ "$version" == "$expected_version" ]] || {
  echo "expected published version $expected_version, found $version" >&2
  exit 1
}
[[ "$release_date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || {
  echo "invalid v0.81 publication date: $release_date" >&2
  exit 1
}

release_dir="releases/${release_date}-v0.81"
manifest="$release_dir/RELEASE_MANIFEST.yml"

test -d "$release_dir" || { echo "missing dated v0.81 release directory" >&2; exit 1; }

test "$(find releases -maxdepth 1 -type d -name '*-v0.81' | wc -l)" -eq 1

published_allocations="$(sed -n '/^## Active allocations$/,/^## Accepted unpublished allocations$/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ')"
test "$published_allocations" -eq "$expected_requirements" || {
  echo "expected $expected_requirements published v0.81 requirements, found $published_allocations" >&2
  exit 1
}

unpublished_allocations="$(sed -n '/^## Accepted unpublished allocations$/,/^## Append-only status/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ' || true)"
test "$unpublished_allocations" -eq 0 || {
  echo "v0.81 publication still contains $unpublished_allocations accepted-unpublished allocations" >&2
  exit 1
}

grep -Fq 'permanent-requirement-count: 62' "$manifest"
grep -Fq 'profile-qualification: none' "$manifest"
grep -Fq 'qualifying-profile-created: false' "$manifest"
grep -Fq 'tag: v0.81' "$manifest"
grep -Fq 'publication-status-source: verified-signed-tag-and-github-release' "$manifest"
grep -Fq 'tag-target-binding: signed-owner-attestation' "$manifest"
grep -Fq 'diagnostic-gate-code-count: 28' "$manifest"
test "$(grep -Ec '^\| GKOS-GATE-L[0-9]-[0-9]{3} \|' standard/annexes/Diagnostic_Code_Registry.md)" -eq 28
for catalog in fixtures/fixtures.manifest.json fixtures/track-a/fixtures.manifest.json; do
  node -e 'const c=JSON.parse(require("fs").readFileSync(process.argv[1])); if(!Array.isArray(c.qualifying_profiles)||c.qualifying_profiles.length)process.exit(1)' "$catalog"
done

tag_target="$(git rev-parse HEAD)"
if [[ "$mode" == "--post-tag" ]]; then
  test "$tag_target" = "${EXPECTED_TAG_TARGET:?verified tag target required}"
  node scripts/verify-v081-attestation.mjs "${VERIFIED_TAG_JSON:?verified tag object required}" "$tag_target" "$release_date" "$release_dir"
fi

grep -Fq 'decisions/R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md' "$manifest"
grep -Fq 'public-second-implementation: awaiting' "$manifest"
grep -Fq 'protocol-activation: NOT_AUTHORIZED' "$manifest"
grep -Fq 'certification-program: NOT_ESTABLISHED' "$manifest"

if grep -Eqi 'GKOS certified|independently certified|NIST approved|regulator-approved' "$release_dir/README.md" "$release_dir/RELEASE_NOTES.md"; then
  echo "published v0.81 package contains unsupported certification/approval claim" >&2
  exit 1
fi

grep -Fq "**Release coordinate:** GKOS-${release_date} v0.81" README.md
grep -Fq "GKOS-${release_date} v0.81" standard/00_GKOS_Master_Standard.md
grep -Fq "## GKOS-${release_date} v0.81" CHANGELOG.md
grep -Fq 'version: "0.81"' "$manifest"
grep -Fq "date: \"$release_date\"" "$manifest"
(cd "$release_dir" && sha256sum -c SHA256SUMS.txt && sha256sum -c SOURCE_SHA256SUMS.txt)
echo "v0.81 package validation PASS ($mode; publication requires verified tag and GitHub Release)"
echo "release date: $release_date"
echo "published requirement count: $published_allocations"
echo "profile qualification: none"
echo "tag target: $tag_target"
