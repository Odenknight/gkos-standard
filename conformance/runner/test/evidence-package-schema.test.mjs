import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const root = resolve(import.meta.dirname, "..", "..", "..");
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const schema = readJson("schemas/provisional/evidence/gkos-conformance-evidence-package-0.1.draft.schema.json");
const positive = readJson("fixtures/provisional/evidence/gkos-cep-p01-minimal.json");
const traversal = readJson("fixtures/provisional/evidence/gkos-cep-n01-path-traversal.json");

const validator = () => {
  const ajv = new Ajv2020.default({ strict: false, allErrors: true });
  return ajv.compile(schema);
};

test("evidence-package draft accepts the bounded positive fixture", () => {
  const validate = validator();
  assert.equal(validate(positive), true, JSON.stringify(validate.errors));
});

test("evidence-package draft rejects parent path traversal", () => {
  const validate = validator();
  assert.equal(validate(traversal), false);
  assert.ok(validate.errors.some((error) =>
    error.instancePath === "/claim_manifest/path"
      || error.instancePath === "/entries/0/path"));
});

test("evidence-package draft rejects backslash paths and undeclared self-digests", () => {
  const backslash = structuredClone(positive);
  backslash.entries[0].path = "claim\\conformance-manifest.json";
  let validate = validator();
  assert.equal(validate(backslash), false);
  assert.ok(validate.errors.some((error) => error.instancePath === "/entries/0/path"));

  const selfDigest = structuredClone(positive);
  selfDigest.manifest_digest = "sha256:" + "8".repeat(64);
  validate = validator();
  assert.equal(validate(selfDigest), false);
  assert.ok(validate.errors.some((error) =>
    error.keyword === "additionalProperties"
      && error.params.additionalProperty === "manifest_digest"));
});

test("evidence-package draft keeps stable package identity separate from content digest", () => {
  const digestAsId = structuredClone(positive);
  digestAsId.package_id = "sha256:" + "9".repeat(64);
  const validate = validator();
  assert.equal(validate(digestAsId), false);
  assert.ok(validate.errors.some((error) => error.instancePath === "/package_id"));
});
