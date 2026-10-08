// R26-A05 (proposed; v0.83 development line): operation-kind applicability of a Refusal Receipt
// (Authority and Refusal Receipt Fields annex section 4). Schema validation checks the receipt
// against the operation kind it declares; this module checks that the declared kind is correct for
// the refused operation. The kind is `consequential-action` when the refused operation is in a
// D-1 consequential class (Definitions annex; R26-A01, which stays proposed) or a class a versioned
// policy adds, and `other` for every other operation, whatever the gate code, its layer, or
// whether a code is present.
//
// Input: the refused operation as the fixture states it, { d1_class }, where d1_class is one of
// D1_CLASSES, a policy-declared extension, or null for an operation in no consequential class.
// Classifying a live action into a D-1 class is outside this module (R26-A01; GKOS-Engine).

export const D1_CLASSES = [
  "disclosure-outside-boundary",
  "sensitivity-label-change",
  "promotion-to-accepted",
  "deletion-tombstone-or-erasure",
  "external-system-effect",
];
// GKOS-GATE-L7-002 and GKOS-GATE-L7-003 arise only from effect-scope evaluation.
const EFFECT_SCOPE_CODES = ["GKOS-GATE-L7-002", "GKOS-GATE-L7-003"];

const versionedPolicy = (p) => !!p && typeof p === "object" && typeof p.policy_id === "string" && p.policy_id.length > 0
  && typeof p.policy_version === "string" && p.policy_version.length > 0;

// evaluateOperationKind({ evaluated_operation, receipt, policy_extension })
// Returns { expected_kind, declared_kind, correct, reason }. An undeclared class, or an extension
// without policy identity and version (GKOS-POLICY-001), leaves the kind indeterminate: correct is
// false and expected_kind is null.
export function evaluateOperationKind({ evaluated_operation: operation, receipt, policy_extension: extension }) {
  const declared = receipt?.operation_kind ?? null;
  const extra = versionedPolicy(extension) && Array.isArray(extension.added_classes) ? extension.added_classes : [];
  const cls = operation?.d1_class;
  let expected;
  if (cls === null) expected = "other";
  else if (D1_CLASSES.includes(cls) || extra.includes(cls)) expected = "consequential-action";
  else return { expected_kind: null, declared_kind: declared, correct: false, reason: `operation class ${String(cls)} is not declared` };
  if (EFFECT_SCOPE_CODES.includes(receipt?.gate_code) && expected !== "consequential-action") {
    return { expected_kind: expected, declared_kind: declared, correct: false, reason: `${receipt.gate_code} arises only from effect-scope evaluation of a consequential action` };
  }
  return { expected_kind: expected, declared_kind: declared, correct: declared === expected, reason: declared === expected ? null : `declared ${declared}, expected ${expected}` };
}
