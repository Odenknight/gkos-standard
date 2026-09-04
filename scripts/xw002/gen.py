from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

from rows import ROWS

CLASS = {
    "DEC": "Direct evidence candidate",
    "CON": "Contributes",
    "DD": "Deployment-declared",
    "NDM": "No direct mapping",
    "SUP": "Superseded",
}

COMMIT = "8f2a158c6d4b8cabd907d98765766d281aec1247"
ROOT = Path(__file__).resolve().parents[2]
MD_PATH = ROOT / "docs/GKOS_ISO42001_NIST_AIRMF_CROSSWALK.md"
JSON_PATH = ROOT / "docs/ecosystem/EXTERNAL_CROSSWALK.json"
ROW_SOURCE = "scripts/xw002/rows.py"
GENERATOR = "scripts/xw002/gen.py"
PROSE_PLACEHOLDER = "__PROSE_NORMALIZED_SHA256__"
JSON_PLACEHOLDER = "__JSON_SHA256__"


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def render_table() -> str:
    lines = [
        "| GKOS ID | Class | AI RMF subcategory | Evidence artifact | Note |",
        "| --- | --- | --- | --- | --- |",
    ]
    for rid, class_code, subcategories, artifact, note in ROWS:
        lines.append(
            f"| `{rid}` | {CLASS[class_code]} | "
            f"{', '.join(subcategories) if subcategories else '—'} | "
            f"{artifact} | {note} |"
        )
    return "\n".join(lines)


def distribution_text() -> str:
    counts = {code: sum(1 for row in ROWS if row[1] == code) for code in CLASS}
    return (
        f"Distribution ({len(ROWS)} rows): "
        f"Direct evidence candidate {counts['DEC']}; "
        f"Contributes {counts['CON']}; "
        f"Deployment-declared {counts['DD']}; "
        f"No direct mapping {counts['NDM']}; "
        f"Superseded {counts['SUP']}."
    )


def reconcile_markdown(markdown: str) -> str:
    table_start = markdown.index("| GKOS ID | Class | AI RMF subcategory |")
    distribution_start = markdown.index("\nDistribution (", table_start)
    markdown = (
        markdown[:table_start]
        + render_table()
        + "\n\n"
        + distribution_text()
        + markdown[markdown.index("\n", distribution_start + 1):]
    )
    return markdown


def normalize_prose_for_hash(markdown: str) -> str:
    markdown = re.sub(
        r"(\| prose_normalized_sha256 \| `)[0-9a-f]{64}(` \|)",
        rf"\g<1>{PROSE_PLACEHOLDER}\g<2>",
        markdown,
        count=1,
    )
    markdown = re.sub(
        r"(\| json_sha256 \| `)[0-9a-f]{64}(` \|)",
        rf"\g<1>{JSON_PLACEHOLDER}\g<2>",
        markdown,
        count=1,
    )
    return markdown


def fill_digest_cells(markdown: str, prose_sha: str, json_sha: str) -> str:
    markdown = re.sub(
        r"(\| prose_normalized_sha256 \| `)[^`]+(` \|)",
        rf"\g<1>{prose_sha}\g<2>",
        markdown,
        count=1,
    )
    markdown = re.sub(
        r"(\| json_sha256 \| `)[^`]+(` \|)",
        rf"\g<1>{json_sha}\g<2>",
        markdown,
        count=1,
    )
    return markdown


def build_json(prose_sha: str) -> str:
    requirements = {}
    for rid, class_code, subcategories, artifact, note in ROWS:
        requirements[rid] = {
            "nist_ai_rmf": {
                "class": CLASS[class_code],
                "subcategories": subcategories,
            },
            "evidence_artifact": artifact,
            "note": note,
        }

    payload = {
        "crosswalk_id": "GKOS-XW-002",
        "mapping_version": "0.2.0-draft",
        "disposition": (
            "PROPOSED — owner/reviewer disposition required; "
            "no row adopted by appearance"
        ),
        "status": (
            "informative R21 machine-readable mirror generated from the reviewed "
            "row source and bound to docs/GKOS_ISO42001_NIST_AIRMF_CROSSWALK.md; "
            "grants no profile claim, certification, alignment, or outcome assertion"
        ),
        "authority": "docs/GKOS_ISO42001_NIST_AIRMF_CROSSWALK.md",
        "requirement_registry": "requirements/REGISTRY.md",
        "gkos_release": "GKOS-2026-09-03 v0.81",
        "gkos_tag": "v0.81",
        "gkos_commit": COMMIT,
        "generation": {
            "row_source": ROW_SOURCE,
            "generator": GENERATOR,
            "prose_normalized_sha256": prose_sha,
        },
        "external_baselines": {
            "iso_42001": {
                "esr_id": "ESR-ISO-42001",
                "status": "verification-held",
                "note": (
                    "No rows emitted until Annex A identifiers and titles are "
                    "verified against legitimately accessed final ISO/IEC 42001:2023 text."
                ),
            },
            "nist_ai_rmf": {
                "esr_id": "ESR-NIST-AIRMF",
                "title": (
                    "NIST AI 100-1, Artificial Intelligence Risk Management "
                    "Framework (AI RMF 1.0)"
                ),
                "publication_date": "2023-01",
                "doi": "10.6028/NIST.AI.100-1",
                "reviewed_scope": "Core Tables 1-4",
                "checked_at": "2026-09-03",
                "external_baseline_status": (
                    "AI RMF 1.0 current baseline; revised AI RMF in progress "
                    "as checked 2026-09-03"
                ),
            },
        },
        "nist_relationship_classes": {
            "Direct evidence candidate": (
                "A GKOS-mandated artifact can directly contribute evidence toward "
                "the RMF outcome; sufficiency is an organizational determination."
            ),
            "Contributes": (
                "Relevant but partial; substantial additional organizational "
                "evidence required."
            ),
            "Deployment-declared": (
                "GKOS mandates the record or hook; the organization supplies policy, "
                "threshold, authority, risk tolerance, or legal basis."
            ),
            "No direct mapping": (
                "No defensible correspondence; recorded explicitly. "
                "A positive result, not a defect."
            ),
            "Superseded": (
                "Requirement superseded in the current development line; see replacement."
            ),
        },
        "nist_ai_rmf_outcomes_not_substantively_implemented": [
            "GOVERN 3.1",
            "GOVERN 5",
            "MAP 5",
            "MEASURE 2.6",
            "MEASURE 2.11",
            "MEASURE 2.12",
            "MEASURE 3",
            "MEASURE 4",
            "MANAGE 3 (beyond bounded delegation)",
        ],
        "control_rule": (
            "A mapping-rule example does not authorize automatic assignment of that "
            "subcategory to every member of a GKOS family; every row is adjudicated "
            "independently."
        ),
        "requirements": requirements,
    }
    return json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n"


def generate() -> tuple[str, str]:
    markdown = reconcile_markdown(MD_PATH.read_text(encoding="utf-8"))
    normalized = normalize_prose_for_hash(markdown)
    prose_sha = sha256_text(normalized)
    json_text = build_json(prose_sha)
    json_sha = sha256_text(json_text)
    markdown = fill_digest_cells(markdown, prose_sha, json_sha)
    return markdown, json_text


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="exit non-zero if committed prose or JSON differs from generated output",
    )
    args = parser.parse_args()

    expected_markdown, expected_json = generate()
    if args.check:
        ok = True
        if MD_PATH.read_text(encoding="utf-8") != expected_markdown:
            print(f"drift: {MD_PATH.relative_to(ROOT)}")
            ok = False
        if JSON_PATH.read_text(encoding="utf-8") != expected_json:
            print(f"drift: {JSON_PATH.relative_to(ROOT)}")
            ok = False
        if ok:
            print("GKOS-XW-002 generated representations: PASS")
            return 0
        return 1

    MD_PATH.write_text(expected_markdown, encoding="utf-8")
    JSON_PATH.write_text(expected_json, encoding="utf-8")
    print(f"wrote {MD_PATH.relative_to(ROOT)}")
    print(f"wrote {JSON_PATH.relative_to(ROOT)}")
    print(f"json sha256 {sha256_text(expected_json)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
