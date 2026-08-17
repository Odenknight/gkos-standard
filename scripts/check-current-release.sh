#!/usr/bin/env bash

set -euo pipefail

version="0.79"
tag="v${version}"
release_date="2026-08-16"
release_id="GKOS-${release_date} v${version}"
release_dir="releases/${release_date}-v${version}"
annex="standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md"

required_files=(
  README.md
  CHANGELOG.md
  CITATION.cff
  standard/00_GKOS_Master_Standard.md
  requirements/REGISTRY.md
  requirements/PROFILE_APPLICABILITY.md
  "$annex"
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

grep -Fq "Current release:** ${release_id}" README.md
grep -Fq "This v${version} standard" standard/00_GKOS_Master_Standard.md
grep -Fq "version: \"${version}\"" CITATION.cff
grep -Fq "date-released: \"${release_date}\"" CITATION.cff
grep -Fq "## ${release_id}" CHANGELOG.md
grep -Fq "version: \"${version}\"" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "date: \"${release_date}\"" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "tag: ${tag}" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "current-release: true" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "${annex}" "$release_dir/RELEASE_MANIFEST.yml"
grep -Fq "Governed_State_Change_Reentry_and_Bounded_Delegation.md" standard/00_GKOS_Master_Standard.md

r15_allocations="$(sed -n '/^## Active allocations$/,/^## Append-only status/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-(RECEIPT|POLICY|RETENTION|REENTRY|DELEGATION)-[0-9]{3}` ')"
test "$r15_allocations" -eq 17 || {
  echo "expected 17 R15 allocations, found $r15_allocations" >&2
  exit 1
}

all_allocations="$(sed -n '/^## Active allocations$/,/^## Append-only status/p' requirements/REGISTRY.md | grep -Ec '^\| `GKOS-[A-Z]+-[0-9]{3}` ')"
test "$all_allocations" -eq 27 || {
  echo "expected 27 permanent allocations, found $all_allocations" >&2
  exit 1
}

if grep -Eqi 'NAV-001[^\n]*(normative|qualifying)|SRTP[^\n]*(normative profile|qualifying profile)' "$release_dir/RELEASE_NOTES.md"; then
  echo "release notes may overstate NAV-001 or SRTP standing" >&2
  exit 1
fi

(
  cd "$release_dir"
  sha256sum -c SHA256SUMS.txt
)

echo "current release metadata is internally consistent for ${release_id}"
