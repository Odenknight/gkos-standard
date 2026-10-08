import { isCanonicalTimestamp } from "./canonical-time.mjs";
import { evaluateAuthorityWindow, evaluateAuthorityChain } from "./authority-window.mjs";
import { isActorReference, sameActor } from "./actor-identity.mjs";

const bool = value => typeof value === "boolean";
const text = value => typeof value === "string" && value.trim().length > 0 && value.isWellFormed();
const level = value => typeof value === "number" && Number.isFinite(value) && value >= 0;
const texts = value => Array.isArray(value) && Array.from(value).every(text);
const lineageBases = ["none", "authorized-declaration"];
const prohibitedLineageBases = ["timestamp", "uuid-order", "lexical-order", "implementation-tiebreak"];
const liveOperations = ["live-retrieval", "model-call", "navigation", "random-generation", "wall-clock-read", "mutable-external-lookup"];
const manifestBindingFields = ["manifest_id", "manifest_version", "digest_algorithm", "canonical_hash"];
// This is the portable predicate fixture interface, not an artifact/admission schema.
// Digest labels here remain opaque fixture references; full digest validation belongs
// to the schema-owned executor, which these synthetic predicates do not replace.
const shapes = {
  reentry: ["L1-001", {mutates_predecessor:bool}],
  supersession: ["L3-001", {inferred:bool, authorized_declaration:bool}],
  // R26-A15 (proposed; v0.83 development line): result vocabulary no-hold|hold|unavailable|indeterminate;
  // legacy `clear` maps to no-hold.
  // `hold_required` is the legacy (pre-R26) result carrier and stays accepted when present.
  hold: ["L4-001", {evaluation:v => ["no-hold", "hold", "unavailable", "indeterminate", "clear"].includes(v), erasure_required:bool}],
  "delegation-predicate": ["L4-003", {classification:text}],
  restrictiveness: ["L4-004", {checker_level:level, deterministic_level:level}],
  "deferred-review": ["L5-001", {overdue:bool, valid_exception:bool}],
  "context-binding": ["L5-002", {reviewed_manifest_hash:text, decision_manifest_hash:text}],
  "review-entry": ["L5-003", {governed_acceptance:bool, review_lifecycle_id:text}],
  "decision-record": ["L5-004", {authorized:bool, append_only:bool, proposal_digest:text, bound_proposal_digest:text, evidence_digest:text, bound_evidence_digest:text}],
  "review-independence": ["L5-005", {proposer_id:text, reviewer_id:text, reviewer_type:v => ["human", "agent"].includes(v)}],
  "decision-history": ["L5-006", {deleted_prior:bool, rewritten_prior:bool, traceable:bool}],
  "canonical-encoding": ["L6-001", {profile:text, indefinite_length:bool}],
  "canonical-map": ["L6-002", {duplicate_keys:bool, keys_bytewise_sorted:bool}],
  "canonical-number": ["L6-003", {negative_zero:bool, nan:bool, infinity:bool, schema_type_preserved:bool}],
  "canonical-time": ["L6-004", {value:isCanonicalTimestamp}],
  "canonical-text": ["L6-005", {valid_utf8:bool, nfc:bool}],
  "canonical-state": ["L6-006", {absent_null_empty_conflated:bool}],
  "digest-binding": ["L6-007", {expected_digest:text, actual_digest:text}],
  rendering: ["L6-008", {complete:bool, round_trip_hash:text, canonical_hash:text}],
  "context-closure": ["L6-009", {required_items:texts, included_items:texts}],
  authority: ["L7-001", {valid:bool, valid_from:isCanonicalTimestamp, valid_until:isCanonicalTimestamp, evaluation_time:isCanonicalTimestamp}],
  "effect-containment": ["L7-002", {actor_contains:bool, delegation_contains:bool}],
  "effect-dimensions": ["L7-003", {dimensions:v => texts(v) && v.length > 0 && v.every(x => ["bounded", "reversible"].includes(x))}],
  "authorization-manifest": ["L7-004", {authorized_hash:text, action_hash:text}],
  "receipt-binding": ["L7-005", {reported_committed:bool, durable_receipt:bool}],
  recovery: ["L7-006", {applicable_route:bool, route_usable:bool}],
  "protected-disclosure": ["L7-007", {authorized:bool, exposed:bool, influenced_unauthorized_surface:bool}],
  // R26-A10 Option A (proposed; v0.83 development line): one registered code per listed condition.
  "reentry-standing": ["L1-002", {inherited_standing:texts}],
  "reentry-preservation": ["L1-003", {predecessor_mutated:bool, predecessor_destroyed:bool}],
  "note-identity": ["L2-001", {historical_uid:text, resulting_uid:text}],
  "lineage-selection": ["L3-002", {selection_basis:v => [...lineageBases, ...prohibitedLineageBases].includes(v)}],
  "policy-identity": ["L4-005", {declared_policy_id:text, declared_policy_version:text, applied_policy_id:text, applied_policy_version:text}],
  "disposition-hold": ["L4-006", {committed:bool, hold_predicate_consulted:bool, hold_result_bound:bool}],
  "delegation-bounds": ["L4-007", {scope_contained:bool, delegation_valid_until:isCanonicalTimestamp, source_valid_until:isCanonicalTimestamp}],
  "delegation-authority": ["L4-008", {confers_general_write:bool}],
  "deterministic-assembly": ["L6-010", {live_operations:v => texts(v) && v.every(x => liveOperations.includes(x))}],
  "authorized-use-binding": ["L7-008", {bound_manifest_fields:texts}],
  // R26-A03 (proposed; v0.83 development line): every receipt in the delegation chain.
  "authority-interval": ["L7-001", {evaluation_time:isCanonicalTimestamp, chain:v => Array.isArray(v) && v.length > 0}],
  // R26-A11 (proposed; v0.83 development line): actor references; a class-only value is undetermined.
  "role-separation": ["L5-005", {proposer:isActorReference, reviewer:isActorReference}],
};
// R26-A15 (proposed; v0.83 development line): a plain `hold` refuses and cites GKOS-RETENTION-001
// with GKOS-GATE-L4-009 (disposition refused: active hold), allocated under the owner answer of
// 2026-10-07 (R26 section 7.2). It is distinct from GKOS-GATE-L4-006, a commit made without the
// hold predicate or its bound result.

// R26-A14 (proposed; v0.83 development line): overdue review computed from the deadline, commit
// time, review status and evaluation time. Records with the legacy `overdue` boolean are unchanged.
const MICROS = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\.(\d{6})Z$/;
const toMicros = value => {
  if (!isCanonicalTimestamp(value)) return null;
  const [, seconds, fraction] = MICROS.exec(value);
  return BigInt(Date.parse(`${seconds}Z`)) * 1000n + BigInt(fraction);
};
const validReviewException = (record, evaluation) => {
  const e = record.exception;
  if (!e || typeof e !== "object" || Array.isArray(e)) return false;
  const until = toMicros(e.valid_until);
  return text(e.authority_receipt_ref)
    && e.precedence_relative_to_delegation === "higher"
    && e.names_delegation_ref === record.delegation_ref
    && e.names_condition === "review-overdue"
    && until !== null && evaluation < until
    && e.bound_in_state_change_receipt === true;
};
export function evaluateReviewDeadline(record) {
  const evaluation = toMicros(record.evaluation_time);
  if (evaluation === null || !text(record.delegation_ref) || !Array.isArray(record.actions)) return "GKOS-GATE-L5-001";
  const deadline = record.review_deadline_seconds;
  const hasDeadline = Number.isSafeInteger(deadline) && deadline >= 1;
  const overdue = !hasDeadline || record.actions.some(action => {
    if (!action || typeof action !== "object") return true;
    // r26-REV-006: commit-time evidence is validated before the disposition shortcut. An
    // unavailable or indeterminate commit time counts as overdue whatever the review status says.
    const commit = toMicros(action.commit_time);
    if (commit === null) return true;
    if (action.review_status === "dispositioned") return false;
    if (action.review_status !== "pending") return true;
    return evaluation >= commit + BigInt(deadline) * 1000000n;
  });
  return overdue && !validReviewException(record, evaluation) ? "GKOS-GATE-L5-001" : null;
}

// R26-A02 table row for `valid_from`/`valid_until` (used by R26-A03): an applicable window absent
// from either scope, or not a non-empty canonical interval, is unknown (L7-003); a comparable window
// not contained is L7-002. Canonical timestamps have one fixed-width UTC form, so text order is time order.
const window = v => !!v && typeof v === "object" && isCanonicalTimestamp(v.valid_from) && isCanonicalTimestamp(v.valid_until) && v.valid_from < v.valid_until;
function effectWindowContainment(requested, authorized) {
  if (!window(requested) || !window(authorized)) return "GKOS-GATE-L7-003";
  return authorized.valid_from <= requested.valid_from && requested.valid_until <= authorized.valid_until ? null : "GKOS-GATE-L7-002";
}

const agentShape = {proposer_model_family:text, reviewer_model_family:text, separate_authority:bool, sealed_evidence:bool, deterministic_gates:bool, gate_override:bool, human_escalation_required:bool, human_escalated:bool};

export function evaluateGate(record) {
  if (!record || typeof record !== "object" || Array.isArray(record) || !Object.hasOwn(shapes, record.kind)) {
    // No registered gate exists for an unknown fixture kind. Reject deterministically;
    // never manufacture a normative diagnostic or return the open sentinel.
    throw new TypeError("invalid or unknown gate fixture kind");
  }
  if (record.kind === "deferred-review" && Object.hasOwn(record, "actions")) return evaluateReviewDeadline(record);
  const [suffix, shape] = shapes[record.kind];
  if (!Object.entries(shape).every(([key, valid]) => Object.hasOwn(record, key) && valid(record[key]))) return `GKOS-GATE-${suffix}`;
  if (record.kind === "review-independence" && record.reviewer_type === "agent"
    && !Object.entries(agentShape).every(([key, valid]) => Object.hasOwn(record, key) && valid(record[key]))) return "GKOS-GATE-L5-005";
  switch (record.kind) {
    case "reentry":
      return record.mutates_predecessor ? "GKOS-GATE-L1-001" : null;
    case "supersession":
      return record.inferred && !record.authorized_declaration ? "GKOS-GATE-L3-001" : null;
    case "hold": {
      const legacy = Object.hasOwn(record, "hold_required");
      if (legacy && !bool(record.hold_required)) return "GKOS-GATE-L4-001";
      if (["unavailable", "indeterminate"].includes(record.evaluation)) return "GKOS-GATE-L4-001";
      const held = record.evaluation === "hold" || (legacy && record.hold_required);
      if (held && record.erasure_required) return "GKOS-GATE-L4-002";
      if (held) return "GKOS-GATE-L4-009";
      return null;
    }
    case "delegation-predicate":
      return record.classification !== "routine" ? "GKOS-GATE-L4-003" : null;
    case "restrictiveness":
      return record.checker_level < record.deterministic_level ? "GKOS-GATE-L4-004" : null;
    case "deferred-review":
      return record.overdue && !record.valid_exception ? "GKOS-GATE-L5-001" : null;
    case "context-binding":
      return record.reviewed_manifest_hash !== record.decision_manifest_hash ? "GKOS-GATE-L5-002" : null;
    case "review-entry":
      return record.governed_acceptance && !record.review_lifecycle_id ? "GKOS-GATE-L5-003" : null;
    case "decision-record":
      return !record.authorized || !record.append_only || record.proposal_digest !== record.bound_proposal_digest || record.evidence_digest !== record.bound_evidence_digest
        ? "GKOS-GATE-L5-004" : null;
    case "review-independence": {
      const agentInvalid = record.reviewer_type === "agent" && (
        record.proposer_model_family === record.reviewer_model_family ||
        !record.separate_authority || !record.sealed_evidence || !record.deterministic_gates ||
        record.gate_override || (record.human_escalation_required && !record.human_escalated)
      );
      return record.proposer_id === record.reviewer_id || agentInvalid ? "GKOS-GATE-L5-005" : null;
    }
    case "decision-history":
      return record.deleted_prior || record.rewritten_prior || !record.traceable ? "GKOS-GATE-L5-006" : null;
    case "canonical-encoding":
      return record.profile !== "GKX-CBOR-1" || record.indefinite_length ? "GKOS-GATE-L6-001" : null;
    case "canonical-map":
      return record.duplicate_keys || !record.keys_bytewise_sorted ? "GKOS-GATE-L6-002" : null;
    case "canonical-number":
      return record.negative_zero || record.nan || record.infinity || !record.schema_type_preserved ? "GKOS-GATE-L6-003" : null;
    case "canonical-time":
      return !isCanonicalTimestamp(record.value) ? "GKOS-GATE-L6-004" : null;
    case "canonical-text":
      return !record.valid_utf8 || !record.nfc ? "GKOS-GATE-L6-005" : null;
    case "canonical-state":
      return record.absent_null_empty_conflated ? "GKOS-GATE-L6-006" : null;
    case "digest-binding":
      return record.expected_digest !== record.actual_digest ? "GKOS-GATE-L6-007" : null;
    case "rendering":
      return !record.complete || record.round_trip_hash !== record.canonical_hash ? "GKOS-GATE-L6-008" : null;
    case "context-closure":
      return record.required_items.some((item) => !record.included_items.includes(item)) ? "GKOS-GATE-L6-009" : null;
    case "authority":
      return !record.valid || !evaluateAuthorityWindow(record).allowed
        ? "GKOS-GATE-L7-001" : null;
    case "effect-containment":
      return !record.actor_contains || !record.delegation_contains ? "GKOS-GATE-L7-002" : null;
    case "effect-dimensions":
      return record.dimensions.some((value) => ["unknown", "indeterminate", "incomparable"].includes(value)) ? "GKOS-GATE-L7-003" : null;
    case "authorization-manifest":
      return record.authorized_hash !== record.action_hash ? "GKOS-GATE-L7-004" : null;
    case "receipt-binding":
      return record.reported_committed && !record.durable_receipt ? "GKOS-GATE-L7-005" : null;
    case "recovery":
      return !record.applicable_route || !record.route_usable ? "GKOS-GATE-L7-006" : null;
    case "protected-disclosure":
      return !record.authorized && (record.exposed || record.influenced_unauthorized_surface) ? "GKOS-GATE-L7-007" : null;
    case "reentry-standing":
      return record.inherited_standing.length > 0 ? "GKOS-GATE-L1-002" : null;
    case "reentry-preservation":
      return record.predecessor_mutated || record.predecessor_destroyed ? "GKOS-GATE-L1-003" : null;
    case "note-identity":
      return record.historical_uid !== record.resulting_uid ? "GKOS-GATE-L2-001" : null;
    case "lineage-selection":
      return prohibitedLineageBases.includes(record.selection_basis) ? "GKOS-GATE-L3-002" : null;
    case "policy-identity":
      return record.declared_policy_id !== record.applied_policy_id || record.declared_policy_version !== record.applied_policy_version
        ? "GKOS-GATE-L4-005" : null;
    case "disposition-hold":
      return record.committed && (!record.hold_predicate_consulted || !record.hold_result_bound) ? "GKOS-GATE-L4-006" : null;
    case "delegation-bounds":
      // Canonical timestamps have one fixed-width UTC form, so text order is time order.
      return !record.scope_contained || record.delegation_valid_until > record.source_valid_until ? "GKOS-GATE-L4-007" : null;
    case "delegation-authority":
      return record.confers_general_write ? "GKOS-GATE-L4-008" : null;
    case "deterministic-assembly":
      return record.live_operations.length > 0 ? "GKOS-GATE-L6-010" : null;
    case "authorized-use-binding":
      return manifestBindingFields.some((field) => !record.bound_manifest_fields.includes(field)) ? "GKOS-GATE-L7-008" : null;
    case "authority-interval": {
      if (!evaluateAuthorityChain(record).allowed) return "GKOS-GATE-L7-001";
      // The effect-scope window is a containment dimension (annex section 5.1), not a validity bound.
      if (!Object.hasOwn(record, "requested_effect_window") && !Object.hasOwn(record, "authorized_effect_window")) return null;
      return effectWindowContainment(record.requested_effect_window, record.authorized_effect_window);
    }
    case "role-separation": {
      const same = sameActor(record.proposer, record.reviewer, record.policy);
      // `undefined` means distinctness cannot be determined: fail closed.
      return same === false ? null : "GKOS-GATE-L5-005";
    }
    default:
      throw new Error(`unknown gate fixture kind: ${record.kind}`);
  }
}
