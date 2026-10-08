import { createHash } from "node:crypto";
import cbor from "cbor";
import { isCanonicalTimestamp } from "./canonical-time.mjs";

const { encodeCanonical, decodeFirstSync } = cbor;

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const clone = (value) => structuredClone(value);

const inspectCanonicalValue = (value, path = "$") => {
  if (typeof value === "string") {
    if (!value.isWellFormed()) throw new Error(`GKOS-GATE-L6-005 invalid Unicode text at ${path}`);
    if (value !== value.normalize("NFC")) throw new Error(`GKOS-GATE-L6-005 non-NFC text at ${path}`);
    if ((path.endsWith("_at") || path.endsWith("_from") || path.endsWith("_until")) && !isCanonicalTimestamp(value)) {
      throw new Error(`GKOS-GATE-L6-004 invalid canonical timestamp at ${path}`);
    }
    return;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value) || Object.is(value, -0)) throw new Error(`GKOS-GATE-L6-003 prohibited numeric value at ${path}`);
    return;
  }
  if (value === undefined) throw new Error(`GKOS-GATE-L6-006 undefined is not a canonical artifact value at ${path}`);
  if (value === null || typeof value === "boolean" || typeof value === "bigint") return;
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index++) {
      if (!Object.hasOwn(value, index)) throw new Error(`GKOS-GATE-L6-006 sparse array at ${path}[${index}]`);
      inspectCanonicalValue(value[index], `${path}[${index}]`);
    }
    return;
  }
  if (Object.getPrototypeOf(value) !== Object.prototype) throw new Error(`unsupported canonical value at ${path}`);
  for (const [key, item] of Object.entries(value)) {
    inspectCanonicalValue(key, `${path}.<key>`);
    inspectCanonicalValue(item, `${path}.${key}`);
  }
};

export const canonicalEncode = (value) => {
  inspectCanonicalValue(value);
  return encodeCanonical(value);
};

export const canonicalHash = (value) => sha256(canonicalEncode(value));

// Walk the received CBOR bytes and report the first map whose encoded keys are
// duplicated or not in bytewise lexicographic order (GKOS-CANON-002). Returns
// null when no such map is found or the bytes are not well formed; malformation
// is GKOS-GATE-L6-001 and is reported by the caller.
const mapKeyDefect = (bytes) => {
  const buffer = Buffer.from(bytes);
  let defect = null;
  const head = (offset) => {
    if (offset >= buffer.length) throw new RangeError("truncated CBOR");
    const initial = buffer[offset];
    const major = initial >> 5;
    const info = initial & 0x1f;
    if (info < 24) return { major, info, value: info, next: offset + 1 };
    if (info === 31) return { major, info, value: null, next: offset + 1 };
    if (info > 27) throw new RangeError("reserved additional information");
    const size = 1 << (info - 24);
    if (offset + 1 + size > buffer.length) throw new RangeError("truncated CBOR");
    const value = size === 8 ? buffer.readBigUInt64BE(offset + 1) : buffer.readUIntBE(offset + 1, size);
    return { major, info, value: Number(value), next: offset + 1 + size };
  };
  const item = (offset, depth) => {
    if (depth > 512) throw new RangeError("nesting too deep");
    const { major, info, value, next } = head(offset);
    if (major === 0 || major === 1) return next;
    if (major === 7) {
      if (info === 31) throw new RangeError("unexpected break");
      return next;
    }
    if (major === 6) return item(next, depth + 1);
    const indefinite = info === 31;
    const atBreak = (at) => buffer[at] === 0xff;
    if (major === 2 || major === 3) {
      if (!indefinite) {
        if (next + value > buffer.length) throw new RangeError("truncated CBOR");
        return next + value;
      }
      let at = next;
      while (!atBreak(at)) at = item(at, depth + 1);
      return at + 1;
    }
    if (major === 4) {
      let at = next;
      for (let index = 0; indefinite ? !atBreak(at) : index < value; index++) at = item(at, depth + 1);
      return indefinite ? at + 1 : at;
    }
    // major === 5: map. Compare each encoded key with its predecessor.
    let at = next;
    let previous = null;
    for (let index = 0; indefinite ? !atBreak(at) : index < value; index++) {
      const keyEnd = item(at, depth + 1);
      const key = buffer.subarray(at, keyEnd);
      if (previous && defect === null) {
        const order = Buffer.compare(previous, key);
        if (order === 0) defect = "duplicate map key";
        else if (order > 0) defect = "map keys out of bytewise order";
      }
      previous = key;
      at = item(keyEnd, depth + 1);
    }
    return indefinite ? at + 1 : at;
  };
  try {
    item(0, 0);
  } catch {
    // Malformed bytes: keep any key defect already found before the malformation.
  }
  return defect;
};

export const verifyCanonicalBytes = (bytes) => {
  let decoded;
  try {
    decoded = decodeFirstSync(bytes, { required: true, preventDuplicateKeys: true, preferMap: false });
  } catch (error) {
    if (error.code === "ERR_ENCODING_INVALID_ENCODED_DATA") throw new Error("GKOS-GATE-L6-005 invalid UTF-8", { cause: error });
    // R26-A09: a duplicate map key is GKOS-GATE-L6-002, the most specific code.
    const keyDefect = mapKeyDefect(bytes);
    if (keyDefect) throw new Error(`GKOS-GATE-L6-002 ${keyDefect}`, { cause: error });
    throw new Error("GKOS-GATE-L6-001 invalid canonical CBOR", { cause: error });
  }
  // R26-A07 (accepted 2026-10-07; v0.83 development line): GKX-CBOR-1 payloads contain no tags, byte
  // strings, `undefined` or simple values other than false, true and null. A prohibited item
  // is GKOS-GATE-L6-001 under the most-specific rule, before any value check.
  const prohibited = prohibitedItem(bytes);
  if (prohibited) throw new Error(`GKOS-GATE-L6-001 ${prohibited}`);
  const reencoded = canonicalEncode(decoded);
  if (!Buffer.from(bytes).equals(reencoded)) {
    // R26-A09: an out-of-order or duplicate key found by re-encoding comparison
    // is still GKOS-GATE-L6-002; any other re-encoding difference is L6-001.
    const keyDefect = mapKeyDefect(bytes);
    if (keyDefect) throw new Error(`GKOS-GATE-L6-002 ${keyDefect}`);
    throw new Error("GKOS-GATE-L6-001 non-canonical CBOR encoding");
  }
  return decoded;
};

const canonicalSet = (values) => [...values]
  .map((value) => ({ value, bytes: canonicalEncode(value) }))
  .sort((left, right) => left.bytes.compare(right.bytes))
  .map(({ value }) => value);

export const captureSelection = (captured) => {
  const selection = clone(captured);
  selection.known_omissions = canonicalSet(selection.known_omissions ?? []);
  selection.closure_inputs = canonicalSet(selection.closure_inputs ?? []);
  canonicalEncode(selection);
  return selection;
};

const artifactKey = (reference) => `${reference.artifact_id}\u0000${reference.artifact_version}\u0000${reference.digest.value}`;

export const validateRequiredClosure = (selection, eligibleSnapshot) => {
  const captured = new Set(selection.closure_inputs.map((item) => `${item.kind}\u0000${artifactKey(item.object_ref)}`));
  for (const required of eligibleSnapshot.required_closure ?? []) {
    const key = `${required.kind}\u0000${artifactKey(required.object_ref)}`;
    if (!captured.has(key)) throw new Error(`GKOS-GATE-L6-009 required ${required.kind} omitted: ${required.object_ref.artifact_id}`);
  }
  return true;
};

const digestRef = (artifactId, artifactVersion, digest) => ({
  artifact_id: artifactId,
  artifact_version: artifactVersion,
  digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value: digest },
});

// R26-A06 (accepted 2026-10-07; v0.83 development line): a verifier recomputes each
// digest over the bytes its basis names. A received-bytes digest covers the
// exact bytes. A GKX-CBOR-1 digest covers canonical CBOR payload bytes, so the
// bytes must pass the canonical verifier. Any mismatch is GKOS-GATE-L6-007.
//
// The GKX-CBOR-1 basis is checked with the typed canonical verifier (r26-REV-004), so a
// schema-declared float with an integral value (R26-A07, section 5) stays valid. With a schema
// registry `{ ajv, supported }` the bytes must also pass verifyArtifactBytes; without one, the
// typed structural check applies (no schema-less re-encoding through generic numbers).
export const verifyDigestBinding = (digest, bytes, registry) => {
  const received = typeof bytes === "string" ? Buffer.from(bytes, "utf8") : bytes;
  if (!digest || digest.algorithm !== "sha-256" || !(received instanceof Uint8Array)) {
    throw new Error("GKOS-GATE-L6-007 unsupported digest or unresolved bytes");
  }
  const receivedBasis = digest.basis === "received-bytes" && !Object.hasOwn(digest, "canonical_profile");
  const canonicalBasis = digest.canonical_profile === "GKX-CBOR-1" && !Object.hasOwn(digest, "basis");
  if (!receivedBasis && !canonicalBasis) throw new Error("GKOS-GATE-L6-007 digest basis is absent or ambiguous");
  if (canonicalBasis) {
    try {
      if (registry) verifyArtifactBytes(received, registry);
      else verifyTypedCanonicalBytes(received);
    } catch (error) {
      throw new Error("GKOS-GATE-L6-007 GKX-CBOR-1 digest over bytes that are not canonical CBOR", { cause: error });
    }
  }
  if (sha256(received) !== digest.value) throw new Error("GKOS-GATE-L6-007 digest mismatch over the named basis");
  return true;
};

// Edition boundary for assembly (r26-REV-005; R26-A06 and R26-S03, accepted 2026-10-07; v0.83
// development line). The selection envelope's declared schema version selects the path:
//
// - `1.1.0` (selection-set-1.1.0, R26): every member and closure reference is recomputed by
//   verifyDigestBinding over the bytes its basis names. Raw content labelled GKX-CBOR-1 is
//   refused with GKOS-GATE-L6-007. The manifest is emitted as context manifest 1.1.0.
//   A GKX-CBOR-1 reference must resolve to a canonical GKOS artifact (r26-REV-005, second
//   round): the caller supplies the verifier's schema registry as `inputs.schema_registry`
//   (`{ ajv, supported }`, as loadSchemaRegistry returns), and the bytes must pass
//   verifyArtifactBytes: a map whose (artifact_type, schema_version) is a declared pair, valid
//   under that schema, with the typed checks (set order, timestamps, numeric types). Bytes that
//   are merely well-formed canonical CBOR, such as a scalar, do not identify an artifact. Without
//   a registry the R26 path refuses with GKOS-GATE-L6-007 rather than fall back to the
//   structural check.
// - `1.0.0` or no declared version (legacy, published): received-bytes references follow
//   R26-A06; GKX-CBOR-1 references over raw content keep the pre-R26 UTF-8 recompute, so the
//   published GCP-6 replay fixture and its preserved evidence stay byte-identical. The manifest
//   is emitted as context manifest 1.0.0, exactly as before.
//
// Any other declared version is refused with GKOS-GATE-L6-001 (R26-A08).
export const R26_SELECTION_SCHEMA_VERSION = "1.1.0";
const LEGACY_SELECTION_SCHEMA_VERSION = "1.0.0";
const resolvedMatches = (reference, resolved, r26, registry) => {
  const { digest } = reference;
  const content = resolved[digest.value];
  if (r26 || digest.basis === "received-bytes") {
    try {
      return verifyDigestBinding(digest, content, r26 ? registry : undefined);
    } catch {
      return false;
    }
  }
  return typeof content === "string" && sha256(Buffer.from(content, "utf8")) === digest.value;
};

export const assembleContext = (selection, inputs) => {
  const declared = selection.schema_version;
  const r26 = declared === R26_SELECTION_SCHEMA_VERSION;
  if (!r26 && declared !== undefined && declared !== LEGACY_SELECTION_SCHEMA_VERSION) {
    throw new Error(`GKOS-GATE-L6-001 unsupported selection envelope schema_version ${declared}`);
  }
  const registry = inputs.schema_registry;
  if (r26 && !(registry?.ajv && Array.isArray(registry.supported))) {
    throw new Error("GKOS-GATE-L6-007 R26 assembly requires schema-aware canonical artifact verification; no schema registry supplied");
  }
  const selectionBytes = canonicalEncode(selection);
  const resolved = inputs.resolved_content ?? {};
  for (const member of selection.members) {
    if (!resolvedMatches(member.object_ref, resolved, r26, registry)) {
      throw new Error(`GKOS-GATE-L6-007 unresolved or mismatched content ${member.object_ref.artifact_id}`);
    }
  }
  for (const closure of selection.closure_inputs) {
    if (!resolvedMatches(closure.object_ref, resolved, r26, registry)) {
      throw new Error(`GKOS-GATE-L6-007 unresolved or mismatched closure ${closure.object_ref.artifact_id}`);
    }
  }

  const selectedMembers = selection.members.map((member) => ({ kind: "context", object_ref: clone(member.object_ref) }));
  const closureMembers = selection.closure_inputs.map((item) => ({ kind: item.kind, object_ref: clone(item.object_ref) }));
  const manifest = {
    canonical_profile: "GKX-CBOR-1",
    artifact_type: "context-manifest",
    schema_version: r26 ? R26_SELECTION_SCHEMA_VERSION : "1.0.0",
    manifest_id: inputs.manifest_id,
    manifest_version: inputs.manifest_version,
    purpose: selection.purpose,
    recipient: selection.recipient,
    selection_set_ref: digestRef(selection.selection_set_id, selection.selection_set_version, sha256(selectionBytes)),
    policy_ref: clone(inputs.policy_ref),
    compiler_ref: clone(inputs.compiler_ref),
    compiled_at: inputs.compiled_at,
    members: [...selectedMembers, ...closureMembers],
    known_omissions: canonicalSet(selection.known_omissions),
  };
  canonicalEncode(manifest);
  return manifest;
};

const orderForRendering = (value) => {
  if (Array.isArray(value)) return value.map(orderForRendering);
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value)
    .map((key) => ({ key, bytes: canonicalEncode(key) }))
    .sort((left, right) => left.bytes.compare(right.bytes))
    .map(({ key }) => [key, orderForRendering(value[key])]));
};

export const renderDiagnosticJson = (bytes) => {
  const decoded = verifyCanonicalBytes(bytes);
  return `${JSON.stringify({
    rendering_format: "GKX-DIAGNOSTIC-JSON-1",
    artifact_hash: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value: sha256(bytes) },
    canonical_cbor_base64: Buffer.from(bytes).toString("base64"),
    decoded: orderForRendering(decoded),
  }, null, 2)}\n`;
};

export const parseDiagnosticJson = (rendering) => {
  const parsed = JSON.parse(rendering);
  if (parsed.rendering_format !== "GKX-DIAGNOSTIC-JSON-1") throw new Error("GKOS-GATE-L6-008 unsupported rendering format");
  const bytes = Buffer.from(parsed.canonical_cbor_base64, "base64");
  const decoded = verifyCanonicalBytes(bytes);
  if (JSON.stringify(orderForRendering(decoded)) !== JSON.stringify(parsed.decoded)) {
    throw new Error("GKOS-GATE-L6-008 rendered fields do not match canonical bytes");
  }
  if (sha256(bytes) !== parsed.artifact_hash?.value) throw new Error("GKOS-GATE-L6-008 rendering hash mismatch");
  return bytes;
};

// ---------------------------------------------------------------------------------------------
// R26-A07 and R26-A08 (accepted 2026-10-07; v0.83 development line): schema-driven artifact verification.
//
// verifyCanonicalBytes above stays the schema-less structural check (its field-name timestamp
// heuristic is kept for existing callers). verifyArtifactBytes decodes with CBOR major types
// kept, dispatches on the declared (artifact_type, schema_version) pair, and reads timestamp and
// numeric typing from that pair's schema rather than from field names.

const halfToNumber = (half) => {
  const sign = half & 0x8000 ? -1 : 1;
  const exponent = (half >> 10) & 0x1f;
  const mantissa = half & 0x3ff;
  if (exponent === 0) return sign * mantissa * 2 ** -24;
  if (exponent === 31) return mantissa ? NaN : sign * Infinity;
  return sign * (1 + mantissa / 1024) * 2 ** (exponent - 15);
};

const decodeTyped = (input) => {
  const bytes = Buffer.from(input);
  let at = 0;
  const need = (n) => { if (at + n > bytes.length) throw new RangeError("truncated CBOR"); };
  const argument = (info) => {
    if (info < 24) return info;
    if (info > 27) throw new RangeError("indefinite length or reserved additional information");
    const size = 1 << (info - 24);
    need(size);
    let value = 0n;
    for (let k = 0; k < size; k++) value = (value << 8n) | BigInt(bytes[at + k]);
    at += size;
    return value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : value;
  };
  const length = (value) => {
    if (typeof value !== "number") throw new RangeError("length too large");
    return value;
  };
  const item = (depth) => {
    if (depth > 512) throw new RangeError("nesting too deep");
    need(1);
    const initial = bytes[at++];
    const major = initial >> 5;
    const info = initial & 0x1f;
    if (major === 7) {
      if (info === 25) { need(2); const v = halfToNumber(bytes.readUInt16BE(at)); at += 2; return { t: "float", v }; }
      if (info === 26) { need(4); const v = bytes.readFloatBE(at); at += 4; return { t: "float", v }; }
      if (info === 27) { need(8); const v = bytes.readDoubleBE(at); at += 8; return { t: "float", v }; }
      if (info >= 28) throw new RangeError("break or reserved simple value");
      return { t: "simple", v: argument(info) };
    }
    const value = argument(info);
    if (major === 0) return { t: "int", v: value };
    if (major === 1) return { t: "int", v: typeof value === "bigint" ? -1n - value : -1 - value };
    if (major === 2) { const n = length(value); need(n); const v = bytes.subarray(at, at + n); at += n; return { t: "bytes", v }; }
    if (major === 3) {
      const n = length(value);
      need(n);
      const raw = bytes.subarray(at, at + n);
      at += n;
      try {
        return { t: "text", v: new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(raw) };
      } catch (error) {
        throw Object.assign(new Error("invalid UTF-8", { cause: error }), { utf8: true });
      }
    }
    if (major === 4) { const v = []; for (let k = 0; k < length(value); k++) v.push(item(depth + 1)); return { t: "array", v }; }
    if (major === 5) { const v = []; for (let k = 0; k < length(value); k++) v.push([item(depth + 1), item(depth + 1)]); return { t: "map", v }; }
    return { t: "tag", tag: value, v: item(depth + 1) };
  };
  const root = item(0);
  if (at !== bytes.length) throw new RangeError("trailing bytes");
  return root;
};

const findProhibited = (node, path = "$") => {
  if (node.t === "tag") return `prohibited tag ${node.tag} at ${path}`;
  if (node.t === "bytes") return `prohibited byte string at ${path}`;
  if (node.t === "simple" && ![20, 21, 22].includes(node.v)) return `prohibited simple value ${node.v} at ${path}`;
  if (node.t === "array") {
    for (let index = 0; index < node.v.length; index++) {
      const found = findProhibited(node.v[index], `${path}[${index}]`);
      if (found) return found;
    }
  }
  if (node.t === "map") {
    for (const [key, value] of node.v) {
      if (key.t !== "text") return `non-text map key at ${path}`;
      const found = findProhibited(value, `${path}.${key.v}`);
      if (found) return found;
    }
  }
  return null;
};

// Used by verifyCanonicalBytes. Malformed bytes return null; the caller reports malformation.
function prohibitedItem(bytes) {
  try {
    return findProhibited(decodeTyped(bytes));
  } catch {
    return null;
  }
}

// Shortest binary16, binary32 or binary64 form that round-trips the value exactly (section 5).
const halfBits = (value) => {
  const sign = value < 0 ? 0x8000 : 0;
  const abs = Math.abs(value);
  if (abs === 0) return sign;
  for (let exponent = -14; exponent <= 15; exponent++) {
    const mantissa = (abs / 2 ** exponent - 1) * 1024;
    if (mantissa >= 0 && mantissa < 1024 && Number.isInteger(mantissa)) return sign | ((exponent + 15) << 10) | mantissa;
  }
  const subnormal = abs / 2 ** -24;
  return Number.isInteger(subnormal) && subnormal < 1024 ? sign | subnormal : null;
};
const encodeFloat = (value) => {
  const half = halfBits(value);
  if (half !== null) { const out = Buffer.alloc(3); out[0] = 0xf9; out.writeUInt16BE(half, 1); return out; }
  if (Math.fround(value) === value) { const out = Buffer.alloc(5); out[0] = 0xfa; out.writeFloatBE(value, 1); return out; }
  const out = Buffer.alloc(9); out[0] = 0xfb; out.writeDoubleBE(value, 1); return out;
};
const encodeHead = (major, value) => {
  const n = BigInt(value);
  if (n < 24n) return Buffer.from([(major << 5) | Number(n)]);
  if (n < 0x100n) return Buffer.from([(major << 5) | 24, Number(n)]);
  if (n < 0x10000n) { const out = Buffer.alloc(3); out[0] = (major << 5) | 25; out.writeUInt16BE(Number(n), 1); return out; }
  if (n < 0x100000000n) { const out = Buffer.alloc(5); out[0] = (major << 5) | 26; out.writeUInt32BE(Number(n), 1); return out; }
  const out = Buffer.alloc(9); out[0] = (major << 5) | 27; out.writeBigUInt64BE(n, 1); return out;
};
// Re-encode a typed node in canonical form: shortest heads, definite lengths, bytewise-sorted
// map keys, and floats kept as floats.
const encodeTyped = (node) => {
  switch (node.t) {
    case "int": return BigInt(node.v) >= 0n ? encodeHead(0, node.v) : encodeHead(1, -1n - BigInt(node.v));
    case "float": return encodeFloat(node.v);
    case "text": { const raw = Buffer.from(node.v, "utf8"); return Buffer.concat([encodeHead(3, raw.length), raw]); }
    case "simple": return Buffer.from([0xe0 | node.v]);
    case "array": return Buffer.concat([encodeHead(4, node.v.length), ...node.v.map(encodeTyped)]);
    case "map": {
      const entries = node.v.map(([key, value]) => [encodeTyped(key), encodeTyped(value)]).sort((a, b) => Buffer.compare(a[0], b[0]));
      return Buffer.concat([encodeHead(5, entries.length), ...entries.flat()]);
    }
    default: throw new Error(`GKOS-GATE-L6-001 prohibited CBOR item ${node.t}`);
  }
};
const toValue = (node) => {
  switch (node.t) {
    case "int": case "float": case "text": return node.v;
    case "simple": return node.v === 20 ? false : node.v === 21 ? true : null;
    case "array": return node.v.map(toValue);
    default: return Object.fromEntries(node.v.map(([key, value]) => [key.v, toValue(value)]));
  }
};
const checkValues = (node, path = "$") => {
  if (node.t === "text" && node.v !== node.v.normalize("NFC")) throw new Error(`GKOS-GATE-L6-005 non-NFC text at ${path}`);
  if (node.t === "float" && (!Number.isFinite(node.v) || Object.is(node.v, -0))) throw new Error(`GKOS-GATE-L6-003 prohibited numeric value at ${path}`);
  if (node.t === "array") node.v.forEach((item, index) => checkValues(item, `${path}[${index}]`));
  if (node.t === "map") for (const [key, value] of node.v) { checkValues(key, `${path}.<key>`); checkValues(value, `${path}.${key.v}`); }
};

// The declared (artifact_type, schema_version) pairs: every schema that fixes both by `const`.
export const supportedArtifactPairs = (schemas) => schemas.flatMap((schema) => {
  const type = schema?.properties?.artifact_type?.const;
  const version = schema?.properties?.schema_version?.const;
  return typeof type === "string" && typeof version === "string" ? [{ artifact_type: type, schema_version: version, schema_id: schema.$id }] : [];
});
// R26-A08: each pair identifies one schema. Returns every pair that more than one schema declares.
export const duplicateArtifactPairs = (pairs) => {
  const seen = new Map();
  for (const pair of pairs) {
    const key = `${pair.artifact_type}@${pair.schema_version}`;
    seen.set(key, [...(seen.get(key) ?? []), pair.schema_id]);
  }
  return [...seen].filter(([, ids]) => ids.length > 1).map(([pair, schemaIds]) => ({ pair, schema_ids: schemaIds }));
};

// Resolve a `$ref` against the document it appears in, using the schemas loaded in Ajv by `$id`.
const resolveRef = (ajv, ref, baseId) => {
  const url = new URL(ref, baseId);
  const fragment = decodeURIComponent(url.hash.slice(1));
  url.hash = "";
  const document = ajv.getSchema(url.href)?.schema;
  if (!document) throw new Error(`GKOS-GATE-L6-001 unresolvable schema reference ${ref}`);
  const schema = fragment ? fragment.split("/").slice(1).reduce((node, key) => node?.[key], document) : document;
  return { schema, baseId: url.href };
};
// Walk the typed tree beside its schema: timestamps from `canonicalTimestamp` references, integer
// typing from `type`, and the declared-type sibling `score_type` for `score` (section 2.1).
// Composition keywords other than `allOf` are not followed.
// r26-REV-003: an array whose schema declares `x-gkx-set-order` is a logical set (section 4).
// Its members must be in the declared order, here the bytewise order of their canonical CBOR
// encodings, without duplicates. Order-sensitive arrays carry no such declaration and keep their
// encoded order. A set out of order is a non-canonical encoding: GKOS-GATE-L6-001.
const checkSetOrder = (node, schema, path) => {
  const order = schema?.["x-gkx-set-order"];
  if (order === undefined || node.t !== "array") return;
  if (order !== "canonical-cbor-bytewise") throw new Error(`GKOS-GATE-L6-001 unsupported set order ${order} at ${path}`);
  const encoded = node.v.map(encodeTyped);
  for (let index = 1; index < encoded.length; index++) {
    const comparison = Buffer.compare(encoded[index - 1], encoded[index]);
    if (comparison === 0) throw new Error(`GKOS-GATE-L6-001 duplicate member of a schema-declared set at ${path}[${index}]`);
    if (comparison > 0) throw new Error(`GKOS-GATE-L6-001 schema-declared set out of canonical order at ${path}[${index}]`);
  }
};
const typeWalk = (ajv, node, schema, baseId, path, siblings, key) => {
  if (!schema || typeof schema !== "object") return;
  while (schema?.$ref) {
    checkSetOrder(node, schema, path);
    if (/#\/\$defs\/canonicalTimestamp$/.test(schema.$ref)) {
      if (node.t !== "text" || !isCanonicalTimestamp(node.v)) throw new Error(`GKOS-GATE-L6-004 invalid canonical timestamp at ${path}`);
      return;
    }
    ({ schema, baseId } = resolveRef(ajv, schema.$ref, baseId));
  }
  if (!schema || typeof schema !== "object") return;
  checkSetOrder(node, schema, path);
  for (const part of schema.allOf ?? []) typeWalk(ajv, node, part, baseId, path, siblings, key);
  if (schema.type === "integer" && node.t === "float") throw new Error(`GKOS-GATE-L6-003 float where the schema declares integer at ${path}`);
  if (key === "score" && typeof siblings?.score_type === "string") {
    if (siblings.score_type === "float" && node.t !== "float") throw new Error(`GKOS-GATE-L6-003 score_type float encoded as ${node.t} at ${path}`);
    if (siblings.score_type === "integer" && node.t !== "int") throw new Error(`GKOS-GATE-L6-003 score_type integer encoded as ${node.t} at ${path}`);
  }
  if (node.t === "map" && schema.properties) {
    const textSiblings = Object.fromEntries(node.v.filter(([, value]) => value.t === "text").map(([name, value]) => [name.v, value.v]));
    for (const [name, value] of node.v) typeWalk(ajv, value, schema.properties[name.v], baseId, `${path}.${name.v}`, textSiblings, name.v);
  }
  if (node.t === "array" && schema.items) node.v.forEach((item, index) => typeWalk(ajv, item, schema.items, baseId, `${path}[${index}]`, null, null));
};

// verifyArtifactBytes(bytes, { ajv, supported }): `ajv` holds every schema by `$id`; `supported`
// is the verifier's declared pair set (for example supportedArtifactPairs over schemas/).
// Returns { value, artifact_type, schema_version } or throws an Error led by a GKOS-GATE code.
// Typed structural verification without a schema: well-formed definite CBOR, map keys in
// bytewise order without duplicates, no prohibited items, valid text and numbers, and bytes equal
// to their typed canonical re-encoding. Floats stay floats (section 5), so an integral float is
// not re-encoded as an integer. Returns the typed root node.
const typedCanonicalRoot = (bytes) => {
  let root;
  try {
    root = decodeTyped(bytes);
  } catch (error) {
    if (error.utf8) throw new Error("GKOS-GATE-L6-005 invalid UTF-8", { cause: error });
    const keyDefect = mapKeyDefect(bytes);
    if (keyDefect) throw new Error(`GKOS-GATE-L6-002 ${keyDefect}`, { cause: error });
    throw new Error("GKOS-GATE-L6-001 invalid canonical CBOR", { cause: error });
  }
  // R26-A09: duplicate or out-of-order map keys are GKOS-GATE-L6-002, the most specific code.
  const keyDefect = mapKeyDefect(bytes);
  if (keyDefect) throw new Error(`GKOS-GATE-L6-002 ${keyDefect}`);
  const prohibited = findProhibited(root);
  if (prohibited) throw new Error(`GKOS-GATE-L6-001 ${prohibited}`);
  checkValues(root);
  if (!encodeTyped(root).equals(Buffer.from(bytes))) throw new Error("GKOS-GATE-L6-001 non-canonical CBOR encoding");
  return root;
};
export const verifyTypedCanonicalBytes = (bytes) => toValue(typedCanonicalRoot(bytes));

export const verifyArtifactBytes = (bytes, { ajv, supported }) => {
  const root = typedCanonicalRoot(bytes);
  if (root.t !== "map") throw new Error("GKOS-GATE-L6-001 payload is not a map");
  const top = Object.fromEntries(root.v.map(([key, value]) => [key.v, value]));
  for (const field of ["canonical_profile", "artifact_type", "schema_version"]) {
    if (top[field]?.t !== "text") throw new Error(`GKOS-GATE-L6-001 ${field} is absent or not a text string`);
  }
  if (top.canonical_profile.v !== "GKX-CBOR-1") throw new Error("GKOS-GATE-L6-001 unsupported canonical_profile");
  const pair = supported.find((item) => item.artifact_type === top.artifact_type.v && item.schema_version === top.schema_version.v);
  if (!pair) throw new Error(`GKOS-GATE-L6-001 unsupported artifact identity (${top.artifact_type.v}, ${top.schema_version.v})`);
  const validate = ajv.getSchema(pair.schema_id);
  if (!validate) throw new Error(`GKOS-GATE-L6-001 no schema loaded for (${pair.artifact_type}, ${pair.schema_version})`);
  typeWalk(ajv, root, validate.schema, pair.schema_id, "$", null, null);
  const value = toValue(root);
  if (!validate(value)) {
    const [first] = validate.errors ?? [];
    throw new Error(`GKOS-GATE-L6-001 not valid under (${pair.artifact_type}, ${pair.schema_version}): ${first?.instancePath ?? ""} ${first?.message ?? ""}`.trim());
  }
  return { value, artifact_type: pair.artifact_type, schema_version: pair.schema_version };
};
