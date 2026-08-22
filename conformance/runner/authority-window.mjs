const canonicalTimestamp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{6})Z$/;

const isCanonicalTimestamp = (value) => {
  const match = canonicalTimestamp.exec(value ?? "");
  if (!match) return false;
  const [, year, month, day, hour, minute, second] = match.map((item, index) => index === 0 ? item : Number(item));
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(hour, minute, second, 0);
  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day
    && date.getUTCHours() === hour
    && date.getUTCMinutes() === minute
    && date.getUTCSeconds() === second;
};

const refusal = (reason) => ({
  allowed: false,
  reason,
  gate_code: "GKOS-GATE-L7-001",
  requirement_ids: ["GKOS-AUTHUSE-003", "GKOS-AUTHUSE-007"],
});

export const evaluateAuthorityWindow = ({ valid_from, valid_until, evaluation_time }) => {
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
