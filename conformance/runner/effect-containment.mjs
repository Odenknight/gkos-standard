// R26-A02 (proposed; v0.83 development line): effect-scope containment evaluation, Authority and
// Refusal Receipt Fields annex section 5.1. Deterministic: it reads the requested scope R, the
// authorizing scopes in chain order (actor standing first) and digest-bound policy inputs, and
// nothing else. It returns the detected gate codes; it is not the boolean `effect-containment`
// predicate of gate-evaluator.mjs, which stays unchanged.
//
// Policy inputs the evaluation may use, each only when the policy is digest-bound:
//   required_dimensions      dimensions the governing policy declares required
//   effect_class_inclusions  [{ outer, inner }]: A's class `outer` includes R's class `inner`
//   resource_matchers        [{ predicate_ref, semantics }]: digest-bound resource-matching
//                            predicates; the reference runner evaluates `prefix` semantics only
//   sensitivity_order        deployment-declared order of sensitivity labels, lowest first
import { isCanonicalTimestamp } from "./canonical-time.mjs";

const L7_002 = "GKOS-GATE-L7-002";
const L7_003 = "GKOS-GATE-L7-003";
export const EFFECT_DIMENSIONS = [
  "effect_class", "resources", "environment", "audience", "sensitivity_ceiling",
  "valid_from", "valid_until", "layer_reach", "reversibility", "maximum_affected_count",
];
// The effect-scope schema (gkx-common.defs.json#/$defs/effectScope) requires these.
const SCHEMA_REQUIRED = ["effect_class", "resources", "environment", "reversibility"];
const REVERSIBILITY = ["reversible", "compensable", "irreversible"];
const POLICY_INPUTS = ["required_dimensions", "effect_class_inclusions", "resource_matchers", "sensitivity_order"];

const text = (v) => typeof v === "string" && v.length > 0;
const texts = (v) => Array.isArray(v) && v.every(text);
const hex64 = (v) => typeof v === "string" && /^[0-9a-f]{64}$/.test(v);
const componentRef = (v) => !!v && typeof v === "object" && text(v.component_id) && text(v.component_version)
  && v.digest?.algorithm === "sha-256" && v.digest?.canonical_profile === "GKX-CBOR-1" && hex64(v.digest?.value);
const integerIn = (v, min, max) => Number.isSafeInteger(v) && v >= min && v <= max;

const valid = {
  effect_class: text,
  resources: texts,
  environment: text,
  audience: texts,
  sensitivity_ceiling: text,
  valid_from: isCanonicalTimestamp,
  valid_until: isCanonicalTimestamp,
  layer_reach: (v) => integerIn(v, 1, 7),
  reversibility: (v) => REVERSIBILITY.includes(v),
  maximum_affected_count: (v) => integerIn(v, 0, Number.MAX_SAFE_INTEGER),
};

// One resource of R against the members of A: equality, or a digest-bound matcher.
// Returns "contained", "not-contained" or "incomparable".
const resourceContained = (resource, authorized, matchers) => {
  if (authorized.includes(resource)) return "contained";
  let incomparable = false;
  for (const matcher of matchers) {
    if (!componentRef(matcher?.predicate_ref) || matcher.semantics !== "prefix") { incomparable = true; continue; }
    if (authorized.some((member) => resource.startsWith(member))) return "contained";
  }
  return incomparable ? "incomparable" : "not-contained";
};

// Compare one dimension present in both scopes. Returns "contained", "not-contained" or "incomparable".
const compare = (dimension, r, a, policy) => {
  if (!valid[dimension](r) || !valid[dimension](a)) return "incomparable";
  switch (dimension) {
    case "effect_class":
      return r === a || (policy.effect_class_inclusions ?? []).some((i) => i?.outer === a && i?.inner === r) ? "contained" : "not-contained";
    case "resources": {
      const results = r.map((resource) => resourceContained(resource, a, policy.resource_matchers ?? []));
      return results.includes("incomparable") ? "incomparable" : results.includes("not-contained") ? "not-contained" : "contained";
    }
    case "environment":
      return r === a ? "contained" : "not-contained";
    case "audience":
      return r.every((member) => a.includes(member)) ? "contained" : "not-contained";
    case "sensitivity_ceiling": {
      if (r === a) return "contained";
      const order = policy.sensitivity_order;
      // GKOS defines no order over the standard labels: without a declared order, different labels
      // are incomparable; a label outside the declared order is incomparable too.
      if (!texts(order) || !order.includes(r) || !order.includes(a)) return "incomparable";
      return order.indexOf(r) <= order.indexOf(a) ? "contained" : "not-contained";
    }
    // Canonical timestamps have one fixed-width UTC form, so text order is time order.
    case "valid_from":
      return a <= r ? "contained" : "not-contained";
    case "valid_until":
      return r <= a ? "contained" : "not-contained";
    case "layer_reach":
    case "maximum_affected_count":
      return r <= a ? "contained" : "not-contained";
    case "reversibility":
      return REVERSIBILITY.indexOf(r) <= REVERSIBILITY.indexOf(a) ? "contained" : "not-contained";
    default:
      return "incomparable";
  }
};

// Containment of scope `r` in scope `a`. The presence check runs first for every applicable
// dimension; then each dimension present in both is compared. Returns the findings.
export const containmentFindings = (r, a, policy = {}, label = "authorizing scope") => {
  const findings = [];
  if (!r || typeof r !== "object" || Array.isArray(r) || !a || typeof a !== "object" || Array.isArray(a)) {
    return [{ scope: label, dimension: "*", result: "unknown" }];
  }
  for (const key of new Set([...Object.keys(r), ...Object.keys(a)])) {
    if (!EFFECT_DIMENSIONS.includes(key)) findings.push({ scope: label, dimension: key, result: "incomparable" });
  }
  // A policy-required dimension is applicable (section 5.1). r26-REV-011: a declaration that is
  // not a list of dimension names, or that names a dimension this evaluator does not support,
  // cannot be evaluated; it fails closed as unknown (GKOS-GATE-L7-003) instead of being dropped.
  let required = [];
  if (Object.hasOwn(policy ?? {}, "required_dimensions")) {
    const declared = policy.required_dimensions;
    if (!texts(declared)) findings.push({ scope: label, dimension: "required_dimensions", result: "unknown" });
    else {
      for (const dimension of declared) {
        if (!EFFECT_DIMENSIONS.includes(dimension)) findings.push({ scope: label, dimension, result: "unknown" });
      }
      required = declared;
    }
  }
  const applicable = EFFECT_DIMENSIONS.filter((d) => SCHEMA_REQUIRED.includes(d) || required.includes(d) || Object.hasOwn(r, d) || Object.hasOwn(a, d));
  const present = [];
  for (const dimension of applicable) {
    // An absent dimension is never read as unlimited in A or as not requested in R.
    if (!Object.hasOwn(r, dimension) || !Object.hasOwn(a, dimension)) findings.push({ scope: label, dimension, result: "unknown" });
    else present.push(dimension);
  }
  for (const dimension of present) {
    const result = compare(dimension, r[dimension], a[dimension], policy);
    if (result !== "contained") findings.push({ scope: label, dimension, result });
  }
  return findings;
};

// evaluateEffectContainment({ requested, authorizing, policy, action_class })
//   authorizing: [{ source, scope, derived?, permitted_action_classes? }] in chain order.
// Returns { gate_code, gate_codes, findings }. gate_code is null when R is contained in every
// authorizing scope, every derived grant is contained in its predecessor, and any action_class is
// permitted by every receipt in the chain. Unknown or incomparable dimensions give
// GKOS-GATE-L7-003; a comparable dimension not contained gives GKOS-GATE-L7-002. When both occur,
// both are reported (R26-A09) and gate_code is the L7-003 found by the presence check first.
export function evaluateEffectContainment({ requested, authorizing, policy = {}, action_class: actionClass } = {}) {
  const findings = [];
  const usesPolicy = POLICY_INPUTS.some((key) => Object.hasOwn(policy ?? {}, key));
  if (usesPolicy && !componentRef(policy.policy_ref)) findings.push({ scope: "policy", dimension: "policy_ref", result: "unknown" });
  if (!Array.isArray(authorizing) || authorizing.length === 0) {
    findings.push({ scope: "chain", dimension: "*", result: "unknown" });
  } else {
    authorizing.forEach((entry, index) => {
      const label = `${entry?.source ?? `chain[${index}]`}`;
      findings.push(...containmentFindings(requested, entry?.scope, policy, label));
      if (entry?.derived === true) {
        if (index === 0) findings.push({ scope: label, dimension: "predecessor", result: "unknown" });
        else findings.push(...containmentFindings(entry.scope, authorizing[index - 1]?.scope, policy, `${label} within its predecessor`));
      }
      if (actionClass !== undefined && entry?.source !== "actor-standing") {
        const permitted = entry?.permitted_action_classes;
        if (!text(actionClass) || !texts(permitted) || !permitted.includes(actionClass)) {
          findings.push({ scope: label, dimension: "action_class", result: "not-contained" });
        }
      }
    });
  }
  const codes = [];
  if (findings.some((f) => f.result === "unknown" || f.result === "incomparable")) codes.push(L7_003);
  if (findings.some((f) => f.result === "not-contained")) codes.push(L7_002);
  return { gate_code: codes[0] ?? null, gate_codes: codes, findings };
}
