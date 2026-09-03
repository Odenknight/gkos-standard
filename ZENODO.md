# Zenodo Release and DOI Policy

Zenodo archives **tagged GitHub Releases**, not ordinary commits. After this repository is enabled in Zenodo, each eligible GitHub Release produces an immutable version record and a version-specific DOI. Zenodo also maintains a concept DOI representing GKOS across releases.

## Release sequence

1. Merge the authorized standard changes into `main`.
2. Confirm `CITATION.cff`, `.zenodo.json`, release notes, decisions, schemas, fixtures, conformance boundaries, and license routing match the intended version.
3. Complete the release gate and preserve its results.
4. Create the signed/annotated tag and GitHub Release for the authorized version.
5. Wait for Zenodo to ingest the release archive.
6. Verify the Zenodo title, creator, version, licenses, files, and Git commit/tag.
7. Add the version DOI and concept DOI to citation and release metadata in a follow-up change.
8. Create a GKOS release record that binds the DOI to the exact tag, commit, archive hash, authorizing decision, validation evidence, predecessor, and unresolved limitations.

Existing GitHub releases that predate activation are not assumed to be archived automatically. Import or republish them only through an explicit owner-authorized archival decision; never create a misleading duplicate release merely to obtain a DOI.

## DOI use

### Verified v0.81 archive

GKOS-2026-09-03 v0.81 is published and archived:

- Version DOI: [10.5281/zenodo.22269294](https://doi.org/10.5281/zenodo.22269294).
- Concept DOI: [10.5281/zenodo.22269293](https://doi.org/10.5281/zenodo.22269293).
- [Public record](https://zenodo.org/records/22269294), classified as a technical
  note, with the approved title, creator, version, date and license routing.
- [Publication receipt](docs/releases/GKOS_2026-09-03_v0.81_PUBLICATION_RECORD.md)
  binds both DOI identities to the signed tag, exact commit, approval and
  verified archive. All 318 archived files match the owner-approved source.

Citation updates after archival do not rewrite the signed release snapshot.
When preparing a later edition, replace the version-specific DOI only after
that edition's own archive identity is verified; never reuse v0.81's DOI as
another edition's identity.

### Citation scope

- Cite the **version DOI** when a claim depends on a specific GKOS edition.
- Use the **concept DOI** when referring to GKOS as a continuously developed project.
- The DOI establishes durable identity and preservation. It is not certification, consensus, conformance, scientific validation, or authorization.

## Licensing

Zenodo's release-level license is CC BY 4.0 for the normative standard. The archive is mixed-license: schemas, fixtures, workflows, scripts, and reference code remain Apache-2.0 under `LICENSE.md`.
