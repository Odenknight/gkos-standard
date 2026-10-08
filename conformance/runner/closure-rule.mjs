// R26-A16 (accepted 2026-10-07; v0.83 development line): closure-rule identity (Canonical Serialization
// annex section 10.2). The closure rule that decides the required contradictions, warnings,
// restrictions and lineage items is a digest-bound component that the Context Manifest
// `policy_ref` identifies. The rule evaluates the eligible snapshot named by the selection
// envelope's `eligible_snapshot_ref` and the captured selection envelope, and nothing else.
// A required item missing from the manifest `members` fails closed with GKOS-GATE-L6-009; the
// display-only `restrictions` list never satisfies a required restriction.
//
// The reference runner evaluates rules in the fixture-local form { rule_id, rule_version,
// required_kinds }: every snapshot item whose kind is listed is required. Other rule languages
// are deployment components the runner does not interpret.
import { canonicalHash } from "./canonical.mjs";

const CLOSURE_KINDS = ["contradiction", "warning", "restriction", "lineage"];
const ref = (r) => `${r?.artifact_id}\u0000${r?.artifact_version}\u0000${r?.digest?.value}`;
const fail = (code, message) => { throw new Error(`${code} ${message}`); };
const text = (v) => typeof v === "string" && v.length > 0;
const plainObject = (v) => !!v && typeof v === "object" && !Array.isArray(v);
// One held item: { kind, object_ref } with a text kind and an artifact reference whose digest is
// SHA-256 over exactly one named basis (GKX-CBOR-1 or received bytes). r26-REV-013: the other
// basis field must be absent, as in verifyDigestBinding (canonical.mjs); a present but
// unsupported value is not ignored.
const exactlyOneBasis = (digest) => (digest.canonical_profile === "GKX-CBOR-1" && !Object.hasOwn(digest, "basis"))
  || (digest.basis === "received-bytes" && !Object.hasOwn(digest, "canonical_profile"));
const heldItem = (item) => plainObject(item) && text(item.kind) && plainObject(item.object_ref)
  && text(item.object_ref.artifact_id) && text(item.object_ref.artifact_version)
  && plainObject(item.object_ref.digest) && item.object_ref.digest.algorithm === "sha-256"
  && typeof item.object_ref.digest.value === "string" && /^[0-9a-f]{64}$/.test(item.object_ref.digest.value)
  && exactlyOneBasis(item.object_ref.digest);

// Recompute a GKX-CBOR-1 digest-bound reference over the canonical encoding of `value`.
const bound = (reference, value, id, version) => reference?.digest?.algorithm === "sha-256"
  && reference.digest.canonical_profile === "GKX-CBOR-1"
  && reference.digest.value === canonicalHash(value)
  && id === (reference.artifact_id ?? reference.component_id)
  && version === (reference.artifact_version ?? reference.component_version);

// evaluateClosureRule({ manifest, selectionEnvelope, eligibleSnapshot, rules }) returns the
// required items when every one is in `members`; otherwise it throws an Error led by a gate code.
// `rules` holds the candidate rule components; the one `policy_ref` digest-binds is used.
export function evaluateClosureRule({ manifest, selectionEnvelope, eligibleSnapshot, rules = [] }) {
  if (!bound(manifest?.selection_set_ref, selectionEnvelope, selectionEnvelope?.selection_set_id, selectionEnvelope?.selection_set_version)) {
    fail("GKOS-GATE-L6-007", "manifest selection_set_ref does not bind the captured selection envelope");
  }
  if (!bound(selectionEnvelope.eligible_snapshot_ref, eligibleSnapshot, eligibleSnapshot?.snapshot_id, eligibleSnapshot?.snapshot_version)) {
    fail("GKOS-GATE-L6-007", "eligible_snapshot_ref does not bind the eligible snapshot");
  }
  const rule = rules.find((candidate) => bound(manifest.policy_ref, candidate, candidate?.rule_id, candidate?.rule_version));
  if (!rule) fail("GKOS-GATE-L6-007", "closure rule is not resolved by the manifest policy_ref digest");
  const kinds = rule.required_kinds;
  if (!Array.isArray(kinds) || !kinds.every((kind) => CLOSURE_KINDS.includes(kind))) {
    // A rule the runner cannot evaluate leaves the required set undetermined: fail closed.
    fail("GKOS-GATE-L6-009", "closure rule required set cannot be determined");
  }
  // r26-REV-012: binding the snapshot does not make its contents evaluable. The held-item
  // collection must be present as an array, and every item must carry a text kind and an artifact
  // reference with a SHA-256 digest; otherwise the required set cannot be determined and the
  // evaluation fails closed. An explicit empty array is a snapshot that holds nothing: the
  // required set is empty.
  const held = eligibleSnapshot.held_items;
  if (!Array.isArray(held)) fail("GKOS-GATE-L6-009", "eligible snapshot held_items is absent or not an array; required set cannot be determined");
  held.forEach((item, index) => {
    if (!heldItem(item)) fail("GKOS-GATE-L6-009", `eligible snapshot held_items[${index}] is malformed; required set cannot be determined`);
  });
  const required = held.filter((item) => kinds.includes(item.kind));
  const members = new Set((manifest.members ?? []).map((member) => `${member.kind}\u0000${ref(member.object_ref)}`));
  for (const item of required) {
    if (!members.has(`${item.kind}\u0000${ref(item.object_ref)}`)) {
      fail("GKOS-GATE-L6-009", `required ${item.kind} missing from members: ${item.object_ref?.artifact_id}`);
    }
  }
  return required;
}
