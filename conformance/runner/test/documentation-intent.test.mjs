import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..", "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const splitTableRow = (line) =>
  line
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());

test("R19 binds the adopted documentation-intent gate to exactly eight positions", () => {
  const docstd = read(
    "docs/proposals/GKOS-DOCSTD-001_Documentation_Engineering_Alignment.md",
  );
  const section = docstd.match(/## 4\. Intent review[\s\S]*?(?=\n## 5\.)/u)?.[0];
  assert.ok(section, "DOCSTD section 4 must exist");

  const rows = section
    .split(/\r?\n/u)
    .filter((line) => /^\| .+ \| .+ \| .+ \|$/u.test(line))
    .map(splitTableRow)
    .filter(([invariant]) => invariant !== "Invariant" && !/^-+$/u.test(invariant));

  assert.equal(rows.length, 8);
  assert.deepEqual(rows.at(-1), [
    "Every committed governed state change is durably receipted",
    "R15-104..R15-105; `GKOS-RECEIPT-001`; `GKOS-RECEIPT-003`; directive provenance: STD-079 r4 invariants 3–4",
    "A governed mutation commits without a durably bound receipt, or receipt-binding failure neither fails closed nor produces verifiable rollback or compensation",
  ]);
  assert.match(
    section,
    /newly supplied and adopted by R19; it was not recovered from an\s+earlier R4 enumeration/u,
  );
});

test("R19 records prospective adoption and preserves release and set boundaries", () => {
  const decision = read(
    "decisions/R19_Documentation_Intent_Eighth_Invariant_Development_Decision_Record.md",
  );
  const changelog = read("CHANGELOG.md");

  assert.match(decision, /previously undefined eighth documentation-intent position/u);
  assert.match(decision, /prospective owner adoption on 2026-09-01/u);
  assert.match(decision, /not a finding that[\s\S]*always occupied R4's missing position/u);
  assert.match(decision, /remainder of GKOS-DOCSTD-001 stays[\s\S]*proposed and non-normative/u);
  assert.match(decision, /No new requirement identifier is allocated/u);
  assert.match(decision, /does not alter, retag, or republish an existing release/u);
  assert.match(decision, /declare Standard v0\.81 or any GCP profile qualified/u);
  assert.match(decision, /R18-131[\s\S]*complete final rerun[\s\S]*separate publication authority/u);
  assert.match(
    changelog,
    /### Historical pre-publication development record[\s\S]*R19 prospectively supplies and adopts/u,
  );
  assert.match(changelog, /R19 adopts only the eight-position intent-review table in DOCSTD §4/u);
  assert.match(
    changelog,
    /R19 publication requires a complete final rerun and separate publication[\s\n]+authority under R20/u,
  );
});
