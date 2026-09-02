# GKOS Conformance Evidence Package 0.1

- **Document ID:** GKOS-CEP-0.1
- **Status:** informative R21 draft; non-qualifying and non-normative
- **Date:** 2026-09-02
- **Semantic root:** active GKOS conformance-manifest schema
- **Candidate package schema:**
  `schemas/provisional/evidence/gkos-conformance-evidence-package-0.1.draft.schema.json`

## 1. Purpose

The current conformance manifest defines the semantic claim root: exact
Standard and implementation identity, evidence status, verified requirements,
profiles, applicability, attestation, fixture outcomes, evidence locators,
limitations, exceptions, environment, and generation time.

What is not yet standardized is how a claimant or assessor packages that
manifest with the raw evidence needed for transport, replay, comparison, and
independent inspection.

This document proposes a portable evidence-package format. It does not make a
new conformance claim and does not change the active manifest schema.

## 2. Four statement classes

### Standard requires

An exact-bound claim must provide the records and evidence required by the
applicable GKOS release and conformance manifest.

### Package recommends

This draft recommends a directory, archive, or OCI-style carrier with a
digest-bound inventory.

### Implementation example

A tool may generate or verify this package, but its output is only as reliable
as its implementation, environment, inputs, and evidence.

### Not in the Standard

The package layout, media types, role vocabulary, deterministic archive profile,
and OCI carrier are informative proposals under R21.

## 3. Design goals

The package should be:

- self-describing;
- exact-bound;
- implementation-neutral;
- deterministic to verify;
- capable of carrying positive and negative evidence;
- explicit about missing, failed, skipped, unsupported, and unevaluated work;
- safe to inspect without requiring production credentials;
- able to preserve protected evidence by authorized reference rather than
  unlawful or unnecessary duplication;
- suitable for directory, deterministic archive, or OCI-style distribution;
- compatible with optional signatures and attestations; and
- usable by at least two public implementations or assessors before any
  proposal to make it a conformance requirement.

## 4. Package identity model

The package keeps four identities distinct:

1. **Claim identity:** the `claim_id` in the conformance manifest.
2. **Package-instance identity:** a stable UUID or namespaced `package_id`
   assigned to the evidence-package instance.
3. **Package-manifest identity:** the SHA-256 digest of the canonical
   `package-manifest.cbor` bytes, recorded outside the manifest in carrier
   metadata, a digest statement, an attestation, or a verifier receipt.
4. **Carrier identity:** the digest or registry reference of the complete
   directory snapshot, archive bytes, or OCI artifact.

The package manifest must not contain the digest of its own complete canonical
bytes. That would be a circular, non-computable self-reference. A repackaging
operation may retain the claim, package-instance, and package-manifest identities
while changing the carrier identity, provided the semantic package manifest and
all inventoried entries remain unchanged.

### Recommended canonical package manifest

The package-manifest semantic object should be validated against the candidate
schema and canonically encoded under GKX-CBOR-1. A JSON rendering may be shipped
for inspection, but the JSON rendering is not a second canonical authority.

The SHA-256 digest of `package-manifest.cbor` is written to a carrier-level
statement such as `package-manifest.sha256`, an OCI descriptor, or a verifier
receipt. The canonical manifest does not inventory itself, its JSON rendering,
or its external digest statement.

This is an architecture recommendation under R21, not a new v0.80 requirement.

## 5. Candidate directory layout

```text
gkos-evidence-package/
├── package-manifest.json
├── package-manifest.cbor
├── package-manifest.sha256
├── claim/
│   ├── conformance-manifest.json
│   └── conformance-report.md
├── coordinates/
│   ├── source-revisions.json
│   ├── dependencies.json
│   ├── environment.json
│   └── toolchain.json
├── inputs/
│   ├── schemas/
│   ├── policies/
│   ├── fixtures/
│   └── adapter/
├── results/
│   ├── machine/
│   ├── human/
│   └── raw/
├── evidence/
│   ├── logs/
│   ├── receipts/
│   ├── snapshots/
│   └── external-references.json
├── security/
│   ├── dependency-audit.json
│   ├── secret-scan.json
│   └── threat-test-results.json
├── signatures/
│   └── optional-attestations/
└── README.md
```

Directories may be absent when inapplicable, but every omission affecting the
claim must be declared in the package manifest and conformance report.

The three `package-manifest.*` files are carrier-level control files. They are
not listed in the manifest's own `entries` array. A strict carrier verifier must
recognize exactly those control files plus the files inventoried by the
manifest; any other file is undeclared.

## 6. Package-manifest fields

The candidate package manifest includes:

- `package_format`;
- `package_version`;
- stable package-instance `package_id`;
- `created_at`;
- `created_by`;
- carrier kind and optional external carrier identity;
- external manifest-digest-statement locator;
- exact GKOS release and source commit;
- exact GKX version and canonical profile;
- claim-manifest path and digest;
- human-report path and digest;
- inventory rules;
- sorted entry inventory;
- declared omissions;
- protected or externally retained evidence references;
- optional signature/attestation inventory;
- limitations and exceptions; and
- verification instructions or tool reference.

The `package_id` is not a content digest. The manifest's content digest is
computed over the complete canonical CBOR bytes and recorded outside those
bytes.

Each inventory entry should contain:

- canonical relative path;
- semantic role;
- media type;
- byte count;
- SHA-256 digest;
- whether the entry is required, optional, protected-reference, or informative;
- source or producer identity where relevant; and
- optional external locator.

## 7. Path and inventory rules

Recommended path rules:

- UTF-8 paths;
- `/` separator in the package manifest;
- no backslash separators;
- no absolute paths;
- no `..` traversal;
- no empty segment;
- no NUL or control characters;
- no duplicate path after exact byte comparison;
- case sensitivity declared explicitly rather than normalized silently;
- symlinks forbidden in the initial profile;
- inventory sorted by UTF-8 path bytes; and
- every included regular file, except the three carrier-level package-manifest
  control files, represented by exactly one inventory entry.

A verifier must reject unlisted extra files in strict mode. A human viewer may
allow them only by labeling the package modified or non-exact.

## 8. Semantic roles

Recommended role vocabulary:

| Role | Meaning |
| --- | --- |
| `claim-manifest` | Machine-readable GKOS claim |
| `human-report` | Human-readable assessment report |
| `standard-source` | Exact Standard text or immutable reference evidence |
| `requirement-registry` | Requirement population used |
| `applicability-map` | Exact applicability mapping |
| `diagnostic-registry` | Stable diagnostic/gate population |
| `schema` | Schema used for validation |
| `fixture-manifest` | Fixture catalog and expectations |
| `fixture-input` | Positive, negative, boundary, mutation, or adversarial input |
| `policy` | Deterministic policy or predicate |
| `adapter` | Implementation adapter or its exact source/artifact reference |
| `implementation-artifact` | Built implementation artifact or immutable locator |
| `dependency-lock` | Dependency closure |
| `environment` | Runtime, OS, architecture, hardware, and service evidence |
| `command` | Exact command or invocation record |
| `raw-output` | Unprocessed execution output |
| `machine-result` | Structured test or assessment result |
| `human-finding` | Human or agent review finding with standing disclosed |
| `receipt` | State-change, control, decision, refusal, context, or authorized-use evidence |
| `security-result` | Dependency, secret, threat, or hardening evidence |
| `external-reference` | Evidence retained outside the package under an authorized locator |
| `signature-or-attestation` | Optional integrity/origin evidence under its own trust model |
| `limitation` | Declared limitation, exception, or unresolved ambiguity |

This vocabulary is informative. A later profile may normalize it after pilot
experience.

## 9. Claim manifest binding

The package must include or validly reference one conformance manifest that:

- validates against the exact schema identified by the package;
- names the same Standard, GKX, implementation, fixture, and assessment
  coordinates represented by the package inventory;
- identifies every evidence locator by an inventory entry or authorized
  external reference;
- reports fixture results without collapsing PASS, FAIL, known divergence,
  skip, unsupported, or unevaluated states;
- discloses limitations and exceptions; and
- distinguishes self-attested from independently verified assessment.

A package with an invalid or missing conformance manifest is not a valid
GKOS-CEP-0.1 package even if its archive and file digests verify.

## 10. External and protected evidence

Not every evidence item should be copied into a portable package. Protected,
licensed, regulated, privileged, secret, or very large evidence may remain in
an authorized external repository.

An external-reference entry should record:

- stable evidence ID;
- authorized locator or resolver;
- expected digest and byte count where available;
- media type;
- owner and access authority;
- sensitivity and retention class;
- reason it is not embedded;
- availability or verification time;
- whether the assessment actually accessed it; and
- limitations if an external reviewer cannot retrieve it.

A locator without a digest or adequate identity may be acceptable evidence only
when the applicable claim and assessment rules permit it and the limitation is
disclosed.

## 11. Raw evidence preservation

The package should preserve raw outputs before summarization. Examples:

- stdout and stderr;
- process exit status;
- test-runner JSON;
- fixture-by-fixture results;
- dependency audit;
- environment inventory;
- workflow metadata;
- signed tag or commit verification;
- model or agent review packet and findings;
- failure and retry logs; and
- recovery or rollback output.

A polished report cannot replace raw evidence needed to reproduce or challenge
the result.

## 12. Environment and dependency evidence

Environment evidence should include, as applicable:

- operating system and image identity;
- architecture;
- runtime and package-manager versions;
- dependency lock and resolved artifacts;
- container/VM image digest;
- relevant hardware or accelerator identity;
- database and service versions;
- locale, timezone, and filesystem behavior;
- environment-variable names and protected handling without secret values;
- network/service assumptions;
- code and build artifact digests; and
- clock source and captured times.

The package should not contain live production secrets, raw tokens, private
keys, or unrestricted credentials.

## 13. Optional signatures and attestations

A package may carry signatures or attestations using Sigstore, in-toto, SLSA,
CMS, OpenPGP, SSH signing, organizational PKI, or another declared mechanism.

The package must state:

- what bytes or digest were signed;
- signer/attester identity;
- trust root or verification mechanism;
- signing time and validity where applicable;
- verification result; and
- what the attestation asserts.

A valid signature proves only what its trust model and signed statement
support. It does not prove source truth, policy legality, reviewer competence,
substantive authority, safety, or GKOS conformance by itself.

## 14. Carrier profiles

### 14.1 Directory carrier

A directory carrier is the simplest review format. Its control sequence is:

1. validate the JSON rendering if present;
2. verify `package-manifest.sha256` against `package-manifest.cbor`;
3. decode and validate the canonical package manifest;
4. verify each inventoried entry; and
5. reject unexpected files in strict mode.

Filesystem metadata outside the inventory is not part of the semantic package
unless explicitly captured. The directory carrier itself has no single byte
stream unless a separately defined snapshot algorithm supplies one.

### 14.2 Deterministic archive carrier

A later archive subprofile should define:

- archive format and exact version;
- sorted entry order;
- fixed or normalized timestamps;
- UID/GID and permission treatment;
- compression method and parameters;
- forbidden special files, links, and path traversal;
- encoding and filename rules; and
- archive-byte digest.

Until those rules are adopted, a ZIP or tar file may transport a package but
must not be called a deterministic GKOS evidence carrier.

### 14.3 OCI-style carrier

An OCI-style artifact may distribute the package through a registry. A binding
must identify:

- OCI distribution/specification version;
- artifact type and media types;
- manifest and layer digests;
- annotations relied upon;
- repository and registry identity;
- retention and access policy; and
- relationship between the OCI manifest digest, GKOS package-manifest digest,
  and package-instance identity.

OCI distribution is a candidate carrier, not a GKOS dependency.

## 15. Verification procedure

A strict verifier should:

1. obtain the package through an authorized path;
2. identify the carrier and package format;
3. reject unsafe paths or unsupported carrier constructs;
4. locate the canonical package manifest and its external digest statement;
5. verify the canonical `package-manifest.cbor` bytes against that external
   digest;
6. parse and validate the decoded package manifest;
7. verify every embedded inventory entry's path, size, and digest;
8. reject undeclared extra files in strict mode;
9. validate the claim manifest;
10. verify cross-document coordinates and evidence locators;
11. verify optional signatures/attestations according to their declared trust
    models;
12. report unavailable protected/external evidence;
13. preserve all failures, warnings, limitations, and unevaluated results; and
14. emit a verifier receipt identifying its implementation, environment,
    package ID, package-manifest digest, and carrier identity where available.

Verification of package integrity is not conformance assessment.

## 16. Mutation and negative fixtures

The package profile should include at least:

- altered evidence bytes;
- altered canonical package manifest;
- altered or missing external manifest digest statement;
- self-referential digest field inserted into the manifest;
- package ID reused for semantically different package content;
- missing inventory entry;
- unlisted extra file;
- duplicate path;
- path traversal;
- backslash path;
- case-collision behavior;
- missing or invalid claim manifest;
- claim/package coordinate mismatch;
- evidence locator not present in inventory;
- external evidence digest mismatch;
- optional signature valid over the wrong digest;
- unsupported carrier;
- archive with non-deterministic metadata;
- secret canary embedded in the package;
- report says PASS while raw result says FAIL;
- skipped fixture omitted from the summary;
- package produced after implementation or fixture change without new identity;
- stale protocol/source register; and
- verifier that ignores an unknown mandatory field.

## 17. Initial pilot plan

### Pilot P1 — same-tool round trip

One tool creates and verifies a directory package. This establishes only basic
mechanism behavior.

### Pilot P2 — two-tool exchange

A second public tool independently parses, validates, and verifies the package
without sharing the first tool's internal code path.

### Pilot P3 — protected external evidence

Test authorized external references, unavailable evidence, and accurate
limitation reporting without copying protected material.

### Pilot P4 — deterministic archive

Define and test one archive subprofile with reproducible carrier bytes across
at least two environments.

### Pilot P5 — OCI-style distribution

Transport the same semantic package through an OCI-compatible registry and
verify that carrier identity remains distinct from claim, package-instance, and
package-manifest identities.

## 18. Adoption gate

GKOS-CEP-0.1 remains informative and non-qualifying until at least two public
implementations or assessors:

- exchange the same package;
- agree on inventory and digest verification;
- produce comparable failure results on negative fixtures;
- disclose implementation independence and limitations; and
- publish evidence packages for review.

Any later normative proposal requires its own development decision and complete
compatibility analysis.

## 19. Claim boundary

A valid evidence package proves only that the package satisfies this draft's
format and integrity checks. It does not establish a qualifying GKOS profile,
independent verification, certification, safety, legal compliance, or
substantive correctness.
