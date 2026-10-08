// R26-A12 (accepted 2026-10-07; v0.83 development line): check that a record satisfies the State-Change Receipt
// role under a declared role-element field map (Governed State Change annex section 1). Ported from
// packet R4's proposed module. It reports satisfaction and missing elements; it is not a gate.
import { isCanonicalTimestamp } from "./canonical-time.mjs";

const OUTCOMES = ["committed", "rolled-back", "compensated", "refused"];
const text = v => typeof v === "string" && v.trim().length > 0;
const get = (record, path) => path.split(".").reduce((o, k) => (o && typeof o === "object" && Object.hasOwn(o, k) ? o[k] : undefined), record);
// A digest in its declared representation: an object with algorithm `sha-256`, a lowercase
// hexadecimal SHA-256 value and at most one basis label, either canonical_profile `GKX-CBOR-1` or
// basis `received-bytes` (R26-S03). No other member is allowed (r26-REV-007).
const DIGEST_MEMBERS = ["algorithm", "value", "canonical_profile", "basis"];
const digestValue = d => !!d && typeof d === "object" && !Array.isArray(d)
  && Object.keys(d).every(k => DIGEST_MEMBERS.includes(k))
  && d.algorithm === "sha-256" && typeof d.value === "string" && /^[0-9a-f]{64}$/.test(d.value)
  && !(Object.hasOwn(d, "canonical_profile") && Object.hasOwn(d, "basis"))
  && (!Object.hasOwn(d, "canonical_profile") || d.canonical_profile === "GKX-CBOR-1")
  && (!Object.hasOwn(d, "basis") || d.basis === "received-bytes");
const digestBound = v => !!v && typeof v === "object" && text(v.ref) && digestValue(v.digest);

export function checkStateChangeReceiptRole({ context, role_field_map: map, record }) {
  const missing = [];
  const need = (element, valid = v => v !== undefined && v !== null && v !== "") => {
    const path = map?.[element];
    if (!text(path) || !valid(get(record, path))) missing.push(element);
  };
  need("identity", text); need("version", text);
  need("actor_ref", text); need("actor_class", text);
  if (context.requires_authority) need("authority_basis_ref", text);
  if (context.policy_took_part) { need("policy_identity", text); need("policy_version", text); need("policy_digest", digestValue); }
  if (context.predicate_consulted) {
    need("predicate_identity", text); need("predicate_version", text);
    need("nondeterministic_checker_increased_restrictiveness", v => typeof v === "boolean");
  }
  need("operation", text);
  if (!context.creation) need("before_state_ref", digestBound);
  need(context.deletion_or_erasure ? "tombstone_ref" : "after_state_ref", digestBound);
  need("outcome", v => OUTCOMES.includes(v));
  need("binding_mechanism", v => text(v) && v === context.manifest_binding_mechanism);
  need("binding_identifier", text);
  need("captured_time", isCanonicalTimestamp);
  return { satisfies_role: missing.length === 0, missing_elements: missing };
}
