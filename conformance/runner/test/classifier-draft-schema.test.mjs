import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const root = resolve(import.meta.dirname, "../../..");
const read = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const schema = read("schemas/provisional/classifier/classifier-record.draft.schema.json");
const catalog = read("fixtures/provisional/classifier/schema-cases.json");
const validate = new Ajv2020({ strict: false, allErrors: true }).compile(schema);

for (const fixture of catalog.cases) {
  test(`classifier draft shape only: ${fixture.id}`, () => {
    assert.equal(validate(fixture.record), fixture.valid,
      JSON.stringify(validate.errors));
  });
}

test("classifier schema fixtures carry no profile qualification", () => {
  assert.equal(catalog.standing, "draft-schema-only-non-qualifying");
  assert.equal(new Set(catalog.cases.map((item) => item.id)).size, catalog.cases.length);
});
