import { isCanonicalTimestamp } from "./canonical-time.mjs";

const refusal = (reason) => ({
  allowed: false,
  reason,
  gate_code: "GKOS-GATE-L7-001",
  requirement_ids: ["GKOS-AUTHUSE-003", "GKOS-AUTHUSE-007"],
});

export const evaluateAuthorityWindow = (record) => {
  if (!record || typeof record !== "object" || Array.isArray(record)) return refusal("invalid-or-indeterminate-time-evidence");
  const { valid_from, valid_until, evaluation_time } = record;
  if (![valid_from, valid_until, evaluation_time].every(isCanonicalTimestamp)) return refusal("invalid-or-indeterminate-time-evidence");
  if (valid_from >= valid_until) return refusal("invalid-or-indeterminate-authority-window");
  if (evaluation_time < valid_from) return refusal("authority-not-yet-valid");
  if (evaluation_time >= valid_until) return refusal("authority-expired");
  return {
    allowed: true,
    reason: "authority-valid",
    requirement_ids: ["GKOS-AUTHUSE-003", "GKOS-AUTHUSE-007"],
  };
};

// R26-A03 (accepted 2026-10-07; v0.83 development line): for delegated authority the evaluation time must lie
// in the half-open interval of every receipt in the chain, from the originating grant to the final
// grantee. `issued_at` is not a validity bound. An empty or missing chain is indeterminate.
export const evaluateAuthorityChain = (record) => {
  const chain = record?.chain;
  if (!Array.isArray(chain) || chain.length === 0) return refusal("invalid-or-indeterminate-authority-chain");
  for (const link of chain) {
    if (!link || typeof link !== "object" || Array.isArray(link)) return refusal("invalid-or-indeterminate-authority-chain");
    const result = evaluateAuthorityWindow({ valid_from: link.valid_from, valid_until: link.valid_until, evaluation_time: record.evaluation_time });
    if (!result.allowed) return result;
  }
  return { allowed: true, reason: "authority-valid", requirement_ids: ["GKOS-AUTHUSE-003", "GKOS-AUTHUSE-007"] };
};

export const createAuthorityRefusalReceipt = ({ receipt_id, authority_ref, predicate_ref, policy_ref, evaluated_at, actor_context, requested_effect_scope, reason }) => ({
  canonical_profile: "GKX-CBOR-1",
  artifact_type: "refusal-receipt",
  schema_version: "1.0.0",
  receipt_id,
  gate_code: "GKOS-GATE-L7-001",
  requirement_id: "GKOS-AUTHUSE-007",
  predicate_ref,
  result: "refused",
  input_refs: [authority_ref],
  evaluated_at,
  actor_context,
  requested_effect_scope,
  refusal_effect: `no consequential effect admitted: ${reason}`,
  escalation_route: "obtain new valid authority or authorized human disposition",
  policy_ref,
});
