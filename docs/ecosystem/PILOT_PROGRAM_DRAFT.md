# GKOS ecosystem pilot program

- **Document ID:** GKOS-PILOT-PROGRAM-001
- **Status:** informative R21 draft; preparation and synthetic testing only
- **Date:** 2026-09-02
- **Authority boundary:** no production data, credentials, deployment, writer,
  consequential effect, conformance claim, or certification is authorized

## 1. Purpose

The pilot program converts architecture claims into observable evidence. It is
intended to identify ambiguity, operational burden, false-PASS paths, security
failures, human-factor problems, implementation divergence, and protocol drift
before GKOS is treated as mature infrastructure.

A pilot may demonstrate a mechanism without qualifying a profile. Every report
must preserve that distinction.

## 2. Shared pilot rules

Every pilot must:

- use public or synthetic data unless a later authority permits otherwise;
- bind to exact GKOS, GKX, implementation, adapter, protocol, policy, fixture,
  dependency, and environment coordinates;
- state expected behavior before execution;
- preserve raw inputs and outputs or authorized immutable references;
- distinguish PASS, FAIL, partial, skipped, unsupported, and unevaluated;
- include negative, boundary, mutation, and adversarial cases;
- record operator, reviewer, authorizer, and executor identities separately;
- disclose all manual intervention and interpretation;
- preserve failures rather than rewriting them into success;
- generate an evidence package using the informative CEP draft where practical;
  and
- publish limitations, burden, and corrective actions.

## 3. Pilot sequence

### P1 — Viewer/Projection interoperability

**Goal:** prove that two public viewers or adapters can present the same
provenance, epistemic state, contradiction, restriction, warning, and limitation
without acquiring write or action authority.

**Required cases:** hidden warning, unresolved contradiction, unknown field,
missing sensitivity, superseded record, failed diagnostic, and modified source
after projection.

**Success boundary:** faithful presentation and refusal behavior only; no Core
or Advanced claim.

### P2 — Context-Only selection capture and replay

**Goal:** demonstrate separate capture of non-deterministic selection followed
by deterministic Context Manifest assembly.

**Required cases:** ranking change, omitted contradiction, stale source,
restricted source, unavailable source, altered compiler, altered rendering, and
expired context.

**Success boundary:** read-only context evidence; no consequential action.

### P3 — MCP `2026-07-28` read/proposal binding

**Goal:** test the R21 MCP binding across resource, tool, prompt, context,
selection, proposal, refusal, and protocol-version boundaries.

**Required cases:** `2025-11-25` compatibility, missing version, downgrade,
client identity conflict, dynamic undeclared tool, registry change after review,
prompt injection, and effect request on a non-effect lane.

**Success boundary:** observe, retrieve, and propose only. No governed write or
external effect.

### P4 — A2A `v1.0.1` task and artifact exchange

**Goal:** preserve Agent Card, task, message, artifact, delegation, status,
context, cancellation, and outcome evidence across independent agent endpoints.

**Required cases:** stale card, identity mismatch, scope expansion, hidden
subdelegation, artifact replacement, cross-tenant disclosure, partial effect,
and output re-entry.

**Success boundary:** information and proposal tasks only unless a later
synthetic-effect authorization is granted.

### P5 — ACS `v0.1.1` observation and control-event ingestion

**Goal:** determine whether current ACS hooks, traces, and AgBOM information can
feed GKOS evidence and controls without being mistaken for complete authority or
coverage.

**Required cases:** missing hook, bypassed hook, guardian unavailable, policy
stale, effect after deny, trace sampling, redaction loss, dynamic tool omitted
from AgBOM, and protected telemetry leakage.

**Success boundary:** public-preview interoperability evidence only.

### P6 — Evidence-package exchange

**Goal:** have two public tools independently parse and verify the same
GKOS-CEP-0.1 package and agree on positive and negative results.

**Required cases:** altered bytes, path traversal, backslash path, duplicate
path, extra file, missing digest statement, self-referential identity, claim
mismatch, unavailable external evidence, wrong signature subject, and false
PASS in the human report.

**Success boundary:** package-format and integrity interoperability; not profile
qualification.

### P7 — Multi-jurisdiction policy conflict

**Goal:** test explicit jurisdiction assertions, policy versions, locations,
transfers, holds, erasure requests, conflicts, human disposition, and receipts.

**Required cases:** unknown location, expired policy, hold/erasure conflict,
cross-tenant policy reuse, unauthorized transfer, and automated “most
restrictive wins” without competent authority.

**Success boundary:** workflow and evidence demonstration; not legal advice or
compliance determination.

### P8 — Synthetic reversible consequential effect

**Goal:** test the full L4–L7 path only after a separate bounded authorization.

**Permitted target:** synthetic, isolated, reversible state with no production
credentials, protected data, financial value, legal effect, publication effect,
or third-party impact.

**Required cases:** expired authority, stale context, role collision, effect
scope exceeded, duplicate invocation, partial commit, rollback failure,
compensation, and receipt unavailability.

**Success boundary:** exact synthetic scenario only; no production authority.

## 4. Evidence report structure

Each report must include:

1. pilot ID and revision;
2. purpose and claim boundary;
3. participants and roles;
4. exact source/protocol/implementation coordinates;
5. architecture and enabled surfaces;
6. data classification and environment;
7. fixture/scenario inventory;
8. expected results;
9. actual results and raw evidence references;
10. security and privacy findings;
11. human-factor observations;
12. operational burden and performance observations;
13. failures, limitations, and unsupported behavior;
14. corrective actions and retest status;
15. assessment standing; and
16. package and report digests.

## 5. Graduation criteria

A pilot may graduate to a repeatable reference exercise when:

- inputs and expected outcomes are public and versioned;
- at least one negative or adversarial case has exposed and then verified a
  correction;
- the evidence package is reproducible;
- limitations are stable enough for another operator to understand;
- no hidden production dependency is required; and
- another public tool, implementation, or assessor can attempt the exercise.

Graduation does not make the pilot a conformance profile.

## 6. Stop conditions

Stop and preserve evidence when:

- production or protected data is encountered without authority;
- a credential or secret appears in logs or artifacts;
- an unapproved effect path becomes reachable;
- required evidence cannot be preserved;
- a mandatory gate is bypassed or indeterminate;
- identity or authority is ambiguous;
- external-system impact cannot be reversed; or
- the test environment no longer matches the declared coordinate.

## 7. Public reporting

Public reports should be concise enough for general review and accompanied by a
complete technical evidence package. Product/vendor names may be included only
when they are material to an exact tested implementation and must not be framed
as endorsements.

No private implementation may be used as the public second implementation or
as undisclosed evidence for an independence claim.
