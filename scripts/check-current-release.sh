#!/usr/bin/env bash

set -euo pipefail

version="$(awk -F'"' '/^version: "/ { print $2; exit }' CITATION.cff)"
release_date="$(awk -F'"' '/^date-released: "/ { print $2; exit }' CITATION.cff)"

# A frozen publication-ready edition has a stable content identity. Its live
# status is established externally by owner approval, a signed tag and Release.
if [[ "$version" == "0.81" ]]; then
  exec bash scripts/check-v081-published-release.sh --pre-tag
fi

[[ "$version" =~ ^0\.[0-9]+$ ]] || {
  echo "cannot resolve published version from CITATION.cff" >&2
  exit 1
}
[[ "$release_date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || {
  echo "cannot resolve published date from CITATION.cff" >&2
  exit 1
}

tag="v${version}"
release_id="GKOS-${release_date} v${version}"
release_dir="releases/${release_date}-v${version}"

required_files=(
  README.md
  CHANGELOG.md
  CITATION.cff
  standard/00_GKOS_Master_Standard.md
  requirements/REGISTRY.md
  requirements/PROFILE_APPLICABILITY.md
  standard/annexes/Canonical_Serialization.md
  standard/annexes/Authority_and_Refusal_Receipt_Fields.md
  standard/annexes/Diagnostic_Code_Registry.md
  docs/GKOS_LEGAL_AND_PROFESSIONAL_ORIENTATION.md
  "$release_dir/README.md"
  "$release_dir/RELEASE_NOTES.md"
  "$release_dir/RELEASE_MANIFEST.yml"
  "$release_dir/SHA256SUMS.txt"
)

for path in "${required_files[@]}"; do
  test -f "$path" || {
    echo "missing current-release file: $path" >&2
    exit 1
  }
done

grep -Eq "\*\*(Published|Current) release:\*\* ${release_id}" README.md
grep -Fq "GKOS-${release_date} v${version} is an owner-authorized developmental publication" standard/00_GKOS_Master_Standard.md
grep -Fq "version: \"${version}\"" CITATION.cff
grep -Fq "date-released: \"${release_date}\"" CITATION.cff
grep -Fq "## ${release_id}" CHANGELOG.md
grep -Fq "version: \"${version}\"" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "date: \"${release_date}\"" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "tag: ${tag}" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "current-release: true" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "standard/annexes/Canonical_Serialization.md" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "Canonical_Serialization.md" standard/00_GKOS_Master_Standard.md

published_allocations="$(sed -n '/^## Active allocations$/,/^## Accepted unpublished allocations$/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ')"
manifest_allocations="$(sed -n 's/^[[:space:]]*permanent-requirement-count:[[:space:]]*\([0-9][0-9]*\).*/\1/p' "$release_dir/RELEASE_MANIFEST.yml" | head -n1)"
[[ "$manifest_allocations" =~ ^[0-9]+$ ]] || {
  echo "release manifest lacks permanent-requirement-count" >&2
  exit 1
}
test "$published_allocations" -eq "$manifest_allocations" || {
  echo "published registry count $published_allocations does not match manifest $manifest_allocations" >&2
  exit 1
}

if grep -Eqi 'NAV-001 (is|becomes) (normative|qualifying)|SRTP (is|becomes) (a )?(normative|qualifying)' "$release_dir/RELEASE_NOTES.md"; then
  echo "release notes may overstate NAV-001 or SRTP standing" >&2
  exit 1
fi

(
  cd "$release_dir"
  sha256sum -c SHA256SUMS.txt
)

unpublished_allocations="$(sed -n '/^## Accepted unpublished allocations$/,/^## Append-only status/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ' || true)"

echo "published current release metadata is internally consistent for ${release_id}"
echo "published permanent requirement count: ${published_allocations}"
echo "accepted unpublished allocations after ${tag}: ${unpublished_allocations}"
