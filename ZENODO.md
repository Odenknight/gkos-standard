# Zenodo Release and DOI Policy

Zenodo archives **tagged GitHub Releases**, not ordinary commits. This repository is enabled in Zenodo; each eligible GitHub Release produces an immutable version record and a version-specific DOI. Zenodo also maintains a concept DOI representing GKOS across releases.

## Release sequence

1. Merge the authorized specification changes into `main`.
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

### Verified v0.82 archive

GKOS-2026-09-22 v0.82 (informative edition) is published and archived:

- Version DOI: [10.5281/zenodo.22905582](https://doi.org/10.5281/zenodo.22905582).
- Concept DOI: [10.5281/zenodo.22269293](https://doi.org/10.5281/zenodo.22269293).
- [Public record](https://zenodo.org/records/22905582), technical note, version
  0.82, dated 2026-09-22, `isNewVersionOf` the v0.81 DOI.
- [Publication receipt](docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.md) binds both DOI identities to the signed tag and
  exact commit. All 411 archived files match the tagged tree.

### Verified v0.82.1 archive

GKOS-2026-09-24 v0.82.1 (documentation patch) is published and archived:

- Version DOI: [10.5281/zenodo.22949713](https://doi.org/10.5281/zenodo.22949713).
- Concept DOI: [10.5281/zenodo.22269293](https://doi.org/10.5281/zenodo.22269293).
- [Public record](https://zenodo.org/records/22949713), version 0.82.1, edition
  date 2026-09-24, developmental specification/public working draft,
  `isNewVersionOf` the v0.82 DOI.
- [Publication receipt](docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md)
  and [archive verification](docs/releases/GKOS_2026-09-24_v0.82.1_ARCHIVE_VERIFICATION.json)
  bind the DOI to the original signed tag and commit. Verification on October 7
  compared all 426 archive files, with zero differences. The record was created
  at `2026-09-25T02:18:13.373985Z`; verification was not backdated.

The signed release snapshot and mixed-license routing remain unchanged.

### Citation scope

- Cite the **version DOI** when a claim depends on a specific GKOS edition.
- Use the **concept DOI** when referring to GKOS as a continuously developed project.
- The DOI establishes durable identity and preservation. It is not certification, consensus, conformance, scientific validation, or authorization.

## Licensing

Zenodo's release-level license is CC BY 4.0 for the normative standard. The archive is mixed-license: schemas, fixtures, workflows, scripts, and reference code remain Apache-2.0 under `LICENSE.md`.
