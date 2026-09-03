#!/usr/bin/env bash

set -euo pipefail

version="0.80"
tag="v${version}"
release_date="2026-08-20"
release_id="GKOS-${release_date} v${version}"
release_dir="releases/${release_date}-v${version}"

required_files=(
  README.md
  CHANGELOG.md
  CITATION.cff
  standard/00_GKOS_Master_Standard.md
  requirements/REGISTRY.md
  requirements/PROFILE_APPLICABILITY.md
  decisions/R16_Required_Conformance_Profiles_and_GCP67_Enablement_Development_Decision_Record.md
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
test "$published_allocations" -eq 56 || {
  echo "expected 56 published v0.80 permanent allocations, found $published_allocations" >&2
  exit 1
}

r16_allocations="$(sed -n '/^## Active allocations$/,/^## Accepted unpublished allocations$/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-(PROFILE|CANON|CONTEXT|AUTHUSE|EFFECT)-[0-9]{3}` ')"
test "$r16_allocations" -eq 29 || {
  echo "expected 29 R16 published allocations, found $r16_allocations" >&2
  exit 1
}

grep -Fq "permanent-requirement-count: 56" "$release_dir/RELEASE_MANIFEST.yml"

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
echo "accepted unpublished allocations after v0.80: ${unpublished_allocations}"
