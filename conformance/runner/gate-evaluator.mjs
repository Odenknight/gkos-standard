const missing = (value) => value === undefined || value === null || value === "";

export function evaluateGate(record) {
  switch (record.kind) {
    case "reentry":
      return record.mutates_predecessor ? "GKOS-GATE-L1-001" : null;
    case "supersession":
      return record.inferred && !record.authorized_declaration ? "GKOS-GATE-L3-001" : null;
    case "hold":
      if (["unavailable", "indeterminate"].includes(record.evaluation)) return "GKOS-GATE-L4-001";
      if (record.hold_required && record.erasure_required) return "GKOS-GATE-L4-002";
      return null;
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
      return !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(record.value ?? "") ? "GKOS-GATE-L6-004" : null;
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
      return !record.valid || missing(record.evaluation_time) || record.evaluation_time < record.valid_from || record.evaluation_time >= record.valid_until
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
    default:
      throw new Error(`unknown gate fixture kind: ${record.kind}`);
  }
}

