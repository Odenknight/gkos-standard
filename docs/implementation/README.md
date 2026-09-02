# Implementation references

These documents are informative. They do not define a conformance profile,
certify an implementation, or replace the exact release and evidence coordinates
required by a GKOS claim.

- [`GKOS_REFERENCE_INFRASTRUCTURE.md`](GKOS_REFERENCE_INFRASTRUCTURE.md)
  provides a validated, vendor-neutral map of commercial, enterprise,
  open-source, and open-standard mechanisms that may contribute to each GKOS
  layer. It also maps selected GKOS responsibilities to current NIST/NCCoE
  agent-identity and interoperability questions.
- [`GKOS-Engine-Implementation-Guide.md`](GKOS-Engine-Implementation-Guide.md)
  records a reviewed GKX 2.0 reference-implementation baseline:
  `gkos-engine` 2.0.1 at
  `7c742436d50b34f6dda66976212a672fb51f7c21`. It is a pinned review coordinate,
  not a claim that no later Engine tag or development commit exists.
- [`VERSION_COMPATIBILITY_MATRIX.md`](VERSION_COMPATIBILITY_MATRIX.md)
  separates the GKOS publication, GKX namespace, canonical artifact profile,
  projection profile, Engine package, and implementation API coordinates used
  by the pinned standard and SRTP draft work. It must not be read as a general
  latest-version registry for every ecosystem repository.
- Historical implementation-role material is preserved for provenance and is
  not current GKX 2.0 guidance.

An implementation claim must identify the exact standard release, Engine or
other implementation commit, schemas, policies, fixtures, environment, and
assessment scope actually evaluated. Matching version numbers do not imply
compatibility.
