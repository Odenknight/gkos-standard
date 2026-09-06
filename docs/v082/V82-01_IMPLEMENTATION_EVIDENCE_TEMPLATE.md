# V82-01 Layer-3 implementation evidence template

**Standing:** informative preparation template; not a conformance claim.

For each implementation result set, record:

- implementation name;
- public repository or artifact locator;
- immutable commit/release coordinate;
- ownership/operator identity;
- whether the implementation is same-author or independently controlled;
- dependency closure or lock/SBOM reference;
- GKOS release and Proposed R23 candidate coordinate evaluated;
- fixture-set identity and digest;
- runtime, operating system, and architecture;
- raw result artifact digest;
- comparator report digest;
- passed, failed, divergent, incomplete, and allowed-variation counts;
- known unsupported behavior;
- migration assumptions;
- reviewer/assessment identity;
- assessment type (`self-attested`, `same-author differential`, or separately evidenced independent implementation);
- limitations and exceptions.

Do not label a same-author or implementation-controlled result as independent
interpretation evidence. Independence requires the dimensions identified under
R21, including source/implementation lineage, deterministic interpretation,
dependency closure, ownership/operational control, fixture execution, and claim
or assessment process.
