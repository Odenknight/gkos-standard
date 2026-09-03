# Implementation references

These documents are informative. They do not define a new conformance profile,
certify an implementation, or replace the exact release and evidence
coordinates required by a GKOS claim.

- [`GKOS_REFERENCE_INFRASTRUCTURE.md`](GKOS_REFERENCE_INFRASTRUCTURE.md)
  is the current PR #30 public reference-architecture **review candidate**. It
  separates Standard requirements, architecture recommendations,
  implementation examples, and matters not in the Standard; maps the seven
  GKOS responsibilities to current infrastructure classes; and records the R21
  protocol, agent-governance, public-second-implementation, and evidence-package
  boundaries. It must not be described as independently reviewed or controlling
  until the PR #30 bounded review and merge gates are complete.
- [`GKOS_INFRASTRUCTURE_PRACTITIONER_BLUEPRINT.md`](GKOS_INFRASTRUCTURE_PRACTITIONER_BLUEPRINT.md)
  provides a role-based implementation blueprint across managed/commercial,
  enterprise/self-managed, and open-source/open-standard mechanisms.
- [`GKOS-Engine-Implementation-Guide.md`](GKOS-Engine-Implementation-Guide.md)
  identifies the current reviewed signed reference-implementation baseline as
  `gkos-engine` 2.1.2 at
  `7bf14b481e78c5ae9d1e14661602be4f24559d0e`. Later Engine development heads
  remain separate coordinates.
- [`VERSION_COMPATIBILITY_MATRIX.md`](VERSION_COMPATIBILITY_MATRIX.md)
  separates the GKOS publication, GKX namespace, canonical profile, projection
  profiles, signed package releases, development heads, provisional scientific
  coordinates, and current R21 protocol-binding inputs.
- [`../ecosystem/README.md`](../ecosystem/README.md) indexes the R21 ecosystem
  workspace for MCP, A2A, ACS, agent governance, multi-jurisdiction guidance,
  evidence packaging, public pilots, and the call for a public second
  implementation.
- Historical implementation-role material is preserved for provenance and is
  not current GKX 2.0 guidance.

An implementation claim must identify the exact Standard release, Engine or
other implementation commit, schemas, policies, fixtures, environment,
dependencies, commands, raw outputs, limitations, and assessment scope actually
evaluated. Matching version numbers do not imply compatibility.
