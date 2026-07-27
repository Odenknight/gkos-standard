# Informative implementation references

The documents in this directory are standalone implementation and role-design references. They are not normative GKOS requirements and are outside the normative scope of GKOS-2026-07-20 v0.76.

- `GKOS-Engine-Implementation-Guide.md` (formerly `GKOS-Engine-v1.0-Build-Instructions.md`) describes a deterministic engine architecture implementing OKF+ 2.3 projections under bounded GKOS claims, refreshed to current GKOS-Engine v1.1.3 implementation reality (CLI surface, fail-closed sensitivity, twelve-state epistemic vocabulary, temporal warnings, and the optional `gkos.intelligence.v1` proposal-only capability). **Engine version ≠ GKOS standard version:** the engine's own version identifier (v1.1.3) is an implementation release number and does not imply that the GKOS standard has reached that version. See the repository root `COMPAT.md` for the current cross-repository version matrix.
- `OKF-Plus-2.3-Specialist-Reviewer-Role.md` describes an assignment, competence, authority, and output contract for a Specialist Reviewer. It grants no authority by itself.

These documents may evolve independently through implementation experience. Any rule intended to become normative GKOS text must pass through the applicable GKOS development or future v1.0 governance process.
