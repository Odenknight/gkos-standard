import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const root = resolve(import.meta.dirname, "..", "..", "..");
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));

test("machine-readable applicability and evidence vocabularies satisfy their schemas", () => {
  const ajv = new Ajv2020.default({ strict: false, allErrors: true });
  for (const name of ["profile-applicability.schema.json", "evidence-vocabulary.schema.json"]) {
    const schema = readJson(`schemas/${name}`);
    ajv.addSchema(schema, name);
  }
  for (const [document, schemaName] of [
    ["requirements/PROFILE_APPLICABILITY.json", "profile-applicability.schema.json"],
    ["requirements/PROFILE_APPLICABILITY.R17.json", "profile-applicability.schema.json"],
    ["requirements/EVIDENCE_VOCABULARY.json", "evidence-vocabulary.schema.json"],
  ]) {
    const validate = ajv.getSchema(basename(schemaName));
    assert.equal(validate(readJson(document)), true, `${document}: ${JSON.stringify(validate.errors)}`);
  }
});
