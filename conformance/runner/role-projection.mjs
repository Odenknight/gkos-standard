// R26-A13 (proposed; v0.83 development line): satisfying a semantic role with an existing record
// through a declared role projection (Authority and Refusal Receipt Fields annex section 1).
//
// evaluateRoleProjection({ source, projection, sourceValidator, roleValidator }) checks the
// projection declaration, validates the source against its own schema, builds the role object
// (envelope constants, then one source field per role element by copy, wrap-set or value-table)
// and validates the role object against the role schema. The validators are compiled Ajv
// functions; their `schema` documents are read for the declaration rules (envelope constants and,
// for value tables, enumerated fields: r26-REV-010). The source record is never modified; the role object is a derived view.
//
// Result: { satisfies_role, failure, role_object, role_schema_valid, errors }, where failure is
// null or one of "projection-declaration", "source-schema", "value-table", "role-schema".

// Envelope fields the role schema fixes by `const` and the projection sets by constant only.
export const ENVELOPE_CONSTANTS = ["canonical_profile", "artifact_type", "schema_version"];
const OPERATIONS = ["copy", "wrap-set", "value-table"];

const text = (v) => typeof v === "string" && v.length > 0;
const plainObject = (v) => !!v && typeof v === "object" && !Array.isArray(v);
const digestBound = (d) => plainObject(d) && d.algorithm === "sha-256" && d.canonical_profile === "GKX-CBOR-1"
  && typeof d.value === "string" && /^[0-9a-f]{64}$/.test(d.value);

// r26-REV-010: a value table only translates an enumerated value. The enumerated values a schema
// declares for one top-level property: the strings of its `enum` or its `const`, read from the
// property itself and from `allOf` parts (intersected), or null when the property is not
// enum-typed. A `$ref` (for example a timestamp, identifier or digest definition), a bare `type`,
// a `pattern` or a `format` does not make a property enum-typed.
const enumeratedValues = (schema, field) => {
  let values = null;
  const parts = [schema, ...(Array.isArray(schema?.allOf) ? schema.allOf : [])];
  for (const part of parts) {
    const property = plainObject(part?.properties) ? part.properties[field] : undefined;
    if (!plainObject(property)) continue;
    for (const node of [property, ...(Array.isArray(property.allOf) ? property.allOf : [])]) {
      let declared = null;
      if (Array.isArray(node?.enum)) declared = node.enum;
      else if (Object.hasOwn(node ?? {}, "const")) declared = [node.const];
      if (declared === null) continue;
      const strings = declared.filter((value) => typeof value === "string");
      if (strings.length !== declared.length) return null;
      values = values === null ? strings : values.filter((value) => strings.includes(value));
    }
  }
  return values;
};

// Value-table defects for one mapping: the source field and the role element must both be
// enum-typed in their schemas, and every table entry must map a declared source value to a
// declared role value. Anything else would convert a value the annex says is copied unchanged
// (timestamps, identifiers, digests) and is a declaration defect.
const valueTableDefects = (mapping, roleSchema, sourceSchema) => {
  const defects = [];
  const sourceValues = enumeratedValues(sourceSchema, mapping.source_field);
  const roleValues = enumeratedValues(roleSchema, mapping.role_element);
  if (sourceValues === null) defects.push(`value table on ${mapping.source_field}, which the source schema does not declare enumerated`);
  if (roleValues === null) defects.push(`value table into ${mapping.role_element}, which the role schema does not declare enumerated`);
  if (defects.length) return defects;
  for (const [from, to] of Object.entries(mapping.value_table)) {
    if (!sourceValues.includes(from)) defects.push(`value table key ${from} is not an enumerated value of ${mapping.source_field}`);
    if (typeof to !== "string" || !roleValues.includes(to)) defects.push(`value table entry ${from} does not map to an enumerated value of ${mapping.role_element}`);
  }
  return defects;
};

// The declaration rules of R26-A13. `roleSchema` is the role schema document, used to read which
// envelope fields it fixes by `const` and which role elements are enumerated; `sourceSchema` is the
// source record's schema document, used to read which source fields are enumerated. Returns a list
// of defects; empty means well formed.
export const projectionDeclarationDefects = (projection, roleSchema, sourceSchema) => {
  const defects = [];
  if (!plainObject(projection)) return ["projection is not an object"];
  if (!text(projection.projection_id) || !text(projection.projection_version) || !digestBound(projection.digest)) {
    defects.push("projection identity, version or digest missing");
  }
  const constants = plainObject(projection.constants) ? projection.constants : {};
  for (const key of Object.keys(constants)) {
    if (!ENVELOPE_CONSTANTS.includes(key)) defects.push(`role element ${key} set by a constant`);
  }
  for (const field of ENVELOPE_CONSTANTS) {
    const fixed = roleSchema?.properties?.[field]?.const;
    if (fixed !== undefined && constants[field] !== fixed) defects.push(`envelope constant ${field} not set to the role schema constant`);
  }
  const seen = new Set();
  for (const mapping of Array.isArray(projection.mappings) ? projection.mappings : [null]) {
    if (!plainObject(mapping) || !text(mapping.role_element) || !text(mapping.source_field)) { defects.push("malformed mapping"); continue; }
    if (ENVELOPE_CONSTANTS.includes(mapping.role_element)) defects.push(`envelope field ${mapping.role_element} read from the source record`);
    if (Object.hasOwn(constants, mapping.role_element)) defects.push(`role element ${mapping.role_element} set by both a constant and a mapping`);
    if (seen.has(mapping.role_element)) defects.push(`role element ${mapping.role_element} mapped more than once`);
    seen.add(mapping.role_element);
    if (!OPERATIONS.includes(mapping.operation)) defects.push(`unsupported operation ${mapping.operation} for ${mapping.role_element}`);
    if (mapping.operation === "value-table") {
      if (!plainObject(mapping.value_table)) defects.push(`value table missing for ${mapping.role_element}`);
      else defects.push(...valueTableDefects(mapping, roleSchema, sourceSchema));
    }
  }
  return defects;
};

// Build the role object exactly as declared. Returns { role_object, value_table_miss }.
export const buildRoleObject = (source, projection) => {
  const roleObject = {};
  let valueTableMiss = null;
  for (const [field, value] of Object.entries(plainObject(projection?.constants) ? projection.constants : {})) roleObject[field] = structuredClone(value);
  for (const mapping of Array.isArray(projection?.mappings) ? projection.mappings : []) {
    if (!plainObject(mapping) || !Object.hasOwn(source, mapping.source_field)) continue;
    const value = source[mapping.source_field];
    if (mapping.operation === "copy") roleObject[mapping.role_element] = structuredClone(value);
    else if (mapping.operation === "wrap-set") roleObject[mapping.role_element] = [structuredClone(value)];
    else if (mapping.operation === "value-table") {
      const table = plainObject(mapping.value_table) ? mapping.value_table : {};
      if (typeof value === "string" && Object.hasOwn(table, value)) roleObject[mapping.role_element] = table[value];
      else valueTableMiss ??= mapping.role_element;
    }
  }
  return { role_object: roleObject, value_table_miss: valueTableMiss };
};

export function evaluateRoleProjection({ source, projection, sourceValidator, roleValidator }) {
  const errors = projectionDeclarationDefects(projection, roleValidator?.schema, sourceValidator?.schema);
  const { role_object: roleObject, value_table_miss: miss } = plainObject(source) ? buildRoleObject(source, projection) : { role_object: {}, value_table_miss: null };
  const roleSchemaValid = miss === null && roleValidator(roleObject);
  const result = (failure, more = []) => ({ satisfies_role: failure === null, failure, role_object: roleObject, role_schema_valid: roleSchemaValid, errors: [...errors, ...more] });
  if (errors.length) return result("projection-declaration");
  if (!plainObject(source) || !sourceValidator(source)) return result("source-schema", (sourceValidator.errors ?? []).map((e) => `source ${e.instancePath} ${e.message}`));
  if (miss !== null) return result("value-table", [`source value for ${miss} is not in the value table`]);
  if (!roleSchemaValid) return result("role-schema", (roleValidator.errors ?? []).map((e) => `role ${e.instancePath} ${e.message}`));
  return result(null);
}

// Fixture patches (R26-A13 negative cases): applied to copies, never to the shared files.
export const patchProjection = (projection, patches = []) => {
  const out = structuredClone(projection);
  for (const patch of patches) {
    if (patch.op === "remove-mapping") out.mappings = out.mappings.filter((m) => m.role_element !== patch.role_element);
    else if (patch.op === "add-mapping") out.mappings = [...out.mappings, structuredClone(patch.mapping)];
    else if (patch.op === "add-constant") out.constants = { ...out.constants, [patch.role_element]: patch.value };
    else if (patch.op === "remove-constant") { out.constants = { ...out.constants }; delete out.constants[patch.role_element]; }
    else throw new Error(`unknown projection patch ${patch.op}`);
  }
  return out;
};
export const patchSource = (source, patch = {}) => ({ ...structuredClone(source), ...structuredClone(patch) });
