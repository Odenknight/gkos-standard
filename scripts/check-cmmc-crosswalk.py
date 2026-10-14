"""Check the bounded CMMC mapping and its generated Markdown table (stdlib only)."""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/ecosystem/CMMC_LEVEL2_CROSSWALK.json"
DOC = ROOT / "docs/ecosystem/CMMC_LEVEL2_CROSSWALK_0.1_DRAFT.md"
COUNTS = {"AC": 22, "AT": 3, "AU": 9, "CM": 9, "IA": 11, "IR": 3,
          "MA": 6, "MP": 9, "PS": 2, "PE": 6, "RA": 3, "CA": 4,
          "SC": 16, "SI": 7}
FAMILIES = dict(zip(COUNTS, range(1, 15)))
CLASSES = {"Potential component evidence", "No direct mapping asserted"}
BEGIN = "<!-- cmmc-table:start -->"
END = "<!-- cmmc-table:end -->"


def validate(data):
    assert data["standing"] == "DRAFT-NOT-INDEPENDENTLY-REVIEWED"
    assert data["assessment_performed"] is False
    assert data["cmmc_status_claim"] is None
    baseline = data["gkos_baseline"]
    assert baseline["commit"] == "3a62e4a02d674a574d87e01c10dc88b7715de037"
    registry = subprocess.check_output(
        ["git", "show", baseline["commit"] + ":requirements/REGISTRY.md"], cwd=ROOT)
    assert hashlib.sha256(registry).hexdigest() == baseline["registry_sha256"]
    ids = set(re.findall(rb"^\| `(GKOS-[A-Z]+-\d{3})` \|", registry, re.M))
    assert len(ids) == 62
    active = {x.decode() for x in ids} - {"GKOS-DELEGATION-004"}
    expected = {f"{family}.L2-3.{FAMILIES[family]}.{n}"
                for family, count in COUNTS.items() for n in range(1, count + 1)}
    rows = data["rows"]
    assert len(rows) == 110 and {r["cmmc_id"] for r in rows} == expected
    assert sum(len(r["all_objectives"]) for r in rows) == 320
    catalog = [{"cmmc_id": r["cmmc_id"], "objective_letters": r["all_objectives"]} for r in rows]
    digest = hashlib.sha256(json.dumps(catalog, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
    assert digest == data["external_baseline"]["objective_catalog_sha256"] == "bb8af6cf52757e092cf0c29ad71fad55025c2fb4f66f5ddbdc782c0c754da22a", "objective catalog changed"
    for row in rows:
        assert row["relationship"] in CLASSES
        assert row["assessment_result"] == "NOT_ASSESSED"
        letters = row["all_objectives"]
        assert letters and letters == [chr(97 + n) for n in range(len(letters))]
        assert set(row["candidate_objectives"]) <= set(letters)
        assert len(set(row["candidate_objectives"])) == len(row["candidate_objectives"])
        assert len(set(row["gkos_ids"])) == len(row["gkos_ids"])
        assert set(row["gkos_ids"]) <= active
        if row["relationship"] == "No direct mapping asserted":
            assert not row["candidate_objectives"] and not row["gkos_ids"]
        else:
            assert row["candidate_objectives"] and row["gkos_ids"]
        assert row["candidate_evidence"] and row["remaining_work"]
    return rows


def table(rows):
    lines = ["| CMMC requirement | Candidate objectives | GKOS references | Relationship |",
             "| --- | --- | --- | --- |"]
    for r in rows:
        objectives = ", ".join(f"[{x}]" for x in r["candidate_objectives"]) or "—"
        refs = ", ".join(f"`{x}`" for x in r["gkos_ids"]) or "—"
        lines.append(f"| `{r['cmmc_id']}` | {objectives} | {refs} | {r['relationship']} |")
    return "\n".join(lines)


def main():
    rows = validate(json.loads(DATA.read_text(encoding="utf-8")))
    text = DOC.read_text(encoding="utf-8")
    assert text.count(BEGIN) == 1 and text.count(END) == 1
    before, tail = text.split(BEGIN)
    _, after = tail.split(END)
    generated = before + BEGIN + "\n\n" + table(rows) + "\n\n" + END + after
    if sys.argv[1:] == ["--write"]:
        DOC.write_text(generated, encoding="utf-8", newline="\n")
    else:
        assert not sys.argv[1:], "only --write is supported"
        assert text == generated, "CMMC Markdown/JSON drift; run --write"
    print("CMMC draft PASS: 110 requirements, 320 objective identifiers; no assessment/status claim")


if __name__ == "__main__":
    main()
