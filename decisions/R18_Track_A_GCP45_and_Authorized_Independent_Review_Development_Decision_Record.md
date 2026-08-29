# R18 — Track A GCP-4/GCP-5 closure and authorized independent review

**Date:** 2026-08-29

**Status:** Accepted development decision; v0.81 preparation authority

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Publication target:** GKOS-2026-08-29 v0.81 after the exact-bound release gate passes

**Base:** `gkos-standard` `main` at
`6a7ad71fc027894cd4e2bbb71c3bbadda06cd12f`

## 1. Reconstruction and replacement provenance

This record reconstructs the previously authorized Track A disposition that
did not reach the canonical repository. It is the controlling replacement
authority for v0.81 Track A. The reconstruction is disclosed; it does not
claim that an earlier R18 file was published or merged.

R18 closes the normative and executable gaps for GCP-4 and GCP-5, requires
portable mutation evidence for every active gate, incorporates R17 into the
v0.81 release-base mappings, and establishes bounded independent-agent review.

## 2. R18-127 — GCP-5 permanent requirements

R18 allocates four atomic requirements:

- `GKOS-REVIEW-001`: every governed proposal entering GCP-5 must enter an
  identified authorized review lifecycle before governed acceptance;
- `GKOS-REVIEW-002`: the disposition must be an authorized, append-only
  Decision Record bound to the proposal and evidence reviewed;
- `GKOS-REVIEW-003`: proposer, reviewer/decider, authorizer, and executor roles
  must remain distinct as applicable; no actor may approve or certify its own
  work; and
- `GKOS-REVIEW-004`: rejection, deferral, withdrawal, expiry, supersession,
  escalation, and acceptance must remain traceable without deletion or silent
  rewriting of prior dispositions.

The basic proposal-and-decision lifecycle is mandatory for GKOS Core.
Specialized delegation, automated supersession, retention execution, and
consequential effects remain conditional capabilities. A claimant must disclose
unsupported capabilities and cannot exclude requirements for behavior it
performs or exposes.

## 3. R18-128 — Authorized independent-agent Layer-5 review

A Layer-5 reviewer may be a human or an authorized independent Review Agent.
An agent reviewer is valid only when all of the following are true:

1. it uses a different model family from the proposing or executing agent;
2. it operates under a separately identified, bounded, versioned, expiring
   authority grant and capability lease;
3. it receives a sealed evidence packet rather than the proposer's unrestricted
   working context;
4. deterministic gates run before the agent disposition and cannot be
   overridden by the model;
5. the append-only Decision Record binds proposer and reviewer identities,
   model identities and versions, policy and gate-set digests, evidence digest,
   evaluated and effective decisions, authority, time, and escalation status;
6. it does not review its own work, authority, reviewer assignment, gate logic,
   governing policy, or autonomy envelope; and
7. every mandatory escalation trigger routes to an authorized human.

Mandatory human escalation occurs for missing, expired, ambiguous, or
conflicting authority; any mandatory `FAIL`, `HOLD`, `BLOCKED`, or `UNEVALUATED`
gate; major or indeterminate classification; unresolved contradictory evidence;
normative-policy, gate, reviewer-selection, or autonomy-envelope changes;
unproven reviewer independence; authority outside the exact grant;
security, protected-disclosure, destructive, or irreversible uncertainty; or
repeated review disagreement or nondeterminism outside declared bounds.

If the Primary Approver is unavailable or recused, affected major or
indeterminate work remains on governed HOLD. No alternate, quorum, agent, or
timeout may substitute for the Primary Approver unless a later prospective
owner decision names and bounds that authority. Unaffected qualified routine
work may continue inside its existing grant.

Self-attested deterministic evidence remains permitted. It must not be labeled
independently verified merely because a second agent reviewed it.

## 4. R18-129 — Protected disclosure and noninterference

Authorization must precede protected disclosure to another principal,
audience, provider, process, log, event, metric, count, diagnostic, error, or
output surface. Authorized internal processing is permitted inside a declared
boundary. Denied information must not influence outputs outside that boundary,
except for an explicitly authorized bounded disclosure such as a generic
refusal.

Missing, invalid, revoked, indeterminate, or insufficient authorization fails
closed before disclosure. The normative requirement is
`GKOS-DISCLOSURE-001`. Broader timing-side-channel bounds remain informative
and are a post-v0.81 decision candidate.

## 5. R18-130 — Evidence and qualification

Each materially distinct mandatory failure class receives a stable gate code
and portable positive/negative or mutation evidence. Engine tests may inform
fixture design, but Standard-owned records, inputs, expected codes, and
deterministic evaluation define the conformance evidence.

Existing Track A includes every previously uncovered gate code. The R18
allocations add their own required gate fixtures; those additions are part of
the same v0.81 gate and are not a shortcut around the original nineteen.

Field evidence for R18 uses two independently provisioned environments plus a
portable negative fixture. A second implementation is not required for v0.81.
Profile eligibility is computed from complete, passing, exact-bound catalogs;
R18 does not manually declare a qualifying profile.

Every acceptance result binds the Standard and implementation commit, GKX
version, fixture catalog, dependency closure, runtime, operating system,
architecture, relevant capability preflights, executed/failed/skipped/
unsupported counts, exceptions, raw evidence digest, and assessment type.

## 6. R18-131 — Automatic v0.81 publication

The exact-bound v0.81 pipeline may merge the approved release candidate,
create the `v0.81` tag, generate and verify release manifests and checksums,
and publish the GitHub release when every mandatory gate is PASS.

Any post-freeze normative, executable, fixture, dependency, or release-artifact
change invalidates the evidence and requires a complete final rerun. A required
capability reported unsupported in one environment must PASS in a declared
required-capability lane. No unexplained failure, skip, waiver, exception,
`HOLD`, `BLOCKED`, or `UNEVALUATED` outcome is permitted.

This is one-release authority for GKOS Standard v0.81. It does not authorize an
Engine or Lite release, deployment, Rust 3.0 tag, conformance claim not derived
from the catalog, or Rust authority cutover.

## 7. Scope exclusions

DDCV, NAV-002, Local Projection, partial publication, governed parser
equivalence, Rust architecture, MCP, Graphiti, provider connectors, watchers,
databases, and model routing are not normative additions under R18. Informative
discussion may identify them without making them qualifying or gating.

R18 authorizes only the bounded independent-review role described in Section 3.
It does not standardize or activate a general autonomous bootstrap supervisor,
Bootstrap Authority Envelope, protected source writer, general knowledge-
disposition grant, L7 effect executor, repair authority, continuous autonomy
controller, or full TheMarshal-008 autonomy profile. Those require a separate
post-v0.81 decision, contracts, portable fixtures, implementation evidence, and
activation authority. No current 008 A2 or A3 capability is implied.

The Rust Uplift r4 document remains advisory except for the five narrower
decisions recorded in OD-12. R18 does not retroactively convert the remainder
of r4 into ratified authority or classify historical implementation variance as
an authority violation without a separate controlling record.
