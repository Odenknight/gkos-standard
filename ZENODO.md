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

- Cite the **version DOI** when a claim depends on a specific GKOS edition.
- Use the **concept DOI** when referring to GKOS as a continuously developed project.
- The DOI establishes durable identity and preservation. It is not certification, consensus, conformance, scientific validation, or authorization.

## Licensing

Zenodo's release-level license is CC BY 4.0 for the normative standard. The archive is mixed-license: schemas, fixtures, workflows, scripts, and reference code remain Apache-2.0 under `LICENSE.md`.
