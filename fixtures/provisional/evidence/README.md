# Provisional evidence-package fixtures

**Standing:** informative R21 schema and mechanism evidence; non-normative and
non-qualifying.

- `gkos-cep-p01-minimal.json` is a schema-valid minimal package manifest with a
  stable package-instance ID, external canonical-manifest digest locator, exact
  Standard coordinate, claim/report bindings, and sorted entry inventory.
- `gkos-cep-n01-path-traversal.json` contains parent-directory traversal in the
  claim and inventory paths and must be rejected.

`conformance/runner/test/evidence-package-schema.test.mjs` also mutates the
positive fixture to verify rejection of backslash paths, an undeclared
self-digest field, and use of a content digest as `package_id`.

Passing these fixtures demonstrates only the provisional schema boundary. It
does not verify file bytes, inventory sorting or uniqueness, carrier contents,
canonical CBOR, external evidence, signatures, conformance, or package
interoperability. Those require later verifier and multi-tool pilot work.
