#!/usr/bin/env bash
set -euo pipefail

expected_version="0.81"
expected_requirements=62

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

bash scripts/check-current-release.sh

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
grep -Fq 'current-release: true' "$manifest"

tag_target="$(sed -n 's/^[[:space:]]*tag-target-sha:[[:space:]]*\([0-9a-f]\{40\}\).*/\1/p' "$manifest" | head -n1)"
[[ "$tag_target" =~ ^[0-9a-f]{40}$ ]] || {
  echo "v0.81 manifest lacks tag-target-sha" >&2
  exit 1
}

if [[ -n "${EXPECTED_TAG_TARGET:-}" ]]; then
  test "$tag_target" = "$EXPECTED_TAG_TARGET" || {
    echo "manifest tag target $tag_target does not match verified tag target $EXPECTED_TAG_TARGET" >&2
    exit 1
  }
fi

grep -Fq 'decisions/R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md' "$manifest"
grep -Fq 'public-second-implementation: awaiting' "$manifest"
grep -Fq 'protocol-activation: NOT_AUTHORIZED' "$manifest"
grep -Fq 'certification-program: NOT_ESTABLISHED' "$manifest"

if grep -Eqi 'GKOS certified|independently certified|NIST approved|regulator-approved' "$release_dir/README.md" "$release_dir/RELEASE_NOTES.md"; then
  echo "published v0.81 package contains unsupported certification/approval claim" >&2
  exit 1
fi

echo "published v0.81 package validation PASS"
echo "release date: $release_date"
echo "published requirement count: $published_allocations"
echo "profile qualification: none"
echo "tag target: $tag_target"
