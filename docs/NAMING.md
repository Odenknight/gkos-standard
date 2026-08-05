# GKOS and GKX naming and compatibility policy

**Status:** Current-facing interpretation of accepted development decisions
[R11](../decisions/R11_GKX_Naming_Transition_Development_Decision_Record.md)
and
[R12](../decisions/R12_Ecosystem_Compatibility_Development_Decision_Record.md).
This document does not rename a machine identifier or product.

## Canonical public vocabulary

- **GKOS** is the governance standard: responsibilities, authority, lifecycle,
  control, and conformance.
- **GKX** is the technical exchange model used by GKOS implementations. On the
  first compatibility-relevant reference, write **“GKX (formerly OKF+)”**.
- **OKF+** is the former public name of the GKX 2.2/2.3 line and remains valid
  where historical meaning or compatibility must be identified.
- **Google Cloud OKF 0.2** is an unaffiliated external specification addressed
  only through the version-scoped interoperability boundary in R12. It is not
  the GKX schema authority.

In one sentence: **OKF+ 2.2/2.3 continues as GKX on the same version line; GKOS
governs it; Google Cloud OKF 0.2 remains a separate optional interchange
target.**

## Retained machine identifiers

Existing machine-facing identifiers—including `okf_version`, `.okf/`, `okf*`
commands, `OKF-*` diagnostics, historical schema identifiers, and compatibility
profile URIs—remain supported under R11 and R12. Their retained spelling is a
compatibility obligation, not the current public name of the model.

They are not frozen indefinitely. R11 requires a separately versioned schema or
protocol migration, replacements, deprecation periods, reader compatibility,
and fixtures before a machine identifier can be changed or removed. Until that
process occurs, current documentation explains the identifier instead of
silently renaming it.

## Historical and current-facing text

Archived releases and decision records retain the terminology in force when
they were written. Current-facing documents use GKX as the display name and may
quote OKF+ when explaining compatibility, provenance, or an unchanged literal
identifier. Historical text is not rewritten to simulate a past decision.

## Product names

Until the open product-name inventory and decision in
[OPEN_QUESTIONS.md](../decisions/OPEN_QUESTIONS.md) closes, portfolio documents
should use unambiguous repository or full product names instead of assigning or
expanding `KRS`. This interim rule prevents documentation from deciding a
product rename by implication.
