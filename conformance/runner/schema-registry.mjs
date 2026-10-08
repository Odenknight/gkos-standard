// Load every schemas/*.json into one Ajv 2020 instance by `$id` and file name, as run.mjs and the
// schema tests do, and expose the declared (artifact_type, schema_version) pairs (R26-A08,
// proposed; v0.83 development line).
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import { supportedArtifactPairs } from "./canonical.mjs";

export const loadSchemaRegistry = (root = resolve(import.meta.dirname, "..", "..")) => {
  const ajv = new Ajv2020.default({ strict: false, allErrors: true, formats: { "date-time": true } });
  const schemas = readdirSync(resolve(root, "schemas"))
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => ({ name, schema: JSON.parse(readFileSync(resolve(root, "schemas", name), "utf8")) }));
  for (const { name, schema } of schemas) {
    ajv.addSchema(schema, schema.$id);
    ajv.addSchema(schema, name);
  }
  return { ajv, schemas, supported: supportedArtifactPairs(schemas.map(({ schema }) => schema)) };
};
