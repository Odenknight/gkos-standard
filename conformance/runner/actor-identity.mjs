// R26-A11 (accepted 2026-10-07; v0.83 development line): actor references and sameness for role separation
// under GKOS-REVIEW-003 and GKOS-AUTHUSE-004.
const text = (value) => typeof value === "string" && value.trim().length > 0 && value.isWellFormed();
const providerOk = (ref) => !Object.hasOwn(ref, "identity_provider") || text(ref.identity_provider);

// An actor reference identifies an individual actor: `actor_id`, `actor_class`, and
// `identity_provider` where the identifier is scoped to a provider. A class-only value such as
// "human" is not an actor reference.
export const isActorReference = (ref) => !!ref && typeof ref === "object" && !Array.isArray(ref)
  && text(ref.actor_id) && text(ref.actor_class) && providerOk(ref);

// Equal `actor_id` and equal `identity_provider` values, or both providers absent.
const directlySame = (a, b) => a.actor_id === b.actor_id
  && (Object.hasOwn(a, "identity_provider") ? a.identity_provider === b.identity_provider : !Object.hasOwn(b, "identity_provider"));

const declarationRef = (ref) => !!ref && typeof ref === "object" && !Array.isArray(ref) && text(ref.actor_id) && providerOk(ref);
const versionedPolicy = (policy) => text(policy?.policy_ref?.component_id) && text(policy?.policy_ref?.component_version);

// Returns true (same actor), false (distinct) or undefined (cannot be determined). A versioned
// policy MAY declare that different references denote the same accountable actor; declarations
// merge actors (transitively) and never separate them.
export const sameActor = (a, b, policy) => {
  if (!isActorReference(a) || !isActorReference(b)) return undefined;
  if (directlySame(a, b)) return true;
  if (policy === undefined || policy === null) return false;
  const groups = policy.same_actor_declarations;
  if (!versionedPolicy(policy) || !Array.isArray(groups)
    || !groups.every((group) => Array.isArray(group) && group.length >= 2 && group.every(declarationRef))) return undefined;
  // Union the declared groups, then ask whether a and b fall in one merged set.
  const merged = groups.map((group) => [...group]);
  for (let changed = true; changed;) {
    changed = false;
    for (let i = 0; i < merged.length; i++) {
      for (let j = i + 1; j < merged.length; j++) {
        if (merged[i].some((x) => merged[j].some((y) => directlySame(x, y)))) {
          merged[i].push(...merged.splice(j, 1)[0]);
          changed = true;
          j--;
        }
      }
    }
  }
  return merged.some((group) => group.some((x) => directlySame(x, a)) && group.some((x) => directlySame(x, b)));
};
