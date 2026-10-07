# Implementation independence and historical records

Date: September 12, 2026. Change class: clarification and editorial repair.
Standing: owner-authorized v0.x development clarification; non-consensus.

## Owner decision

During review of the ecosystem mailbox, the owner was asked whether a second
independent GKOS implementation must have a different owner. The answer was:

> Not necessary, but ideal. Different functioning products is the real blocker.

The owner then requested publication of the corresponding README and
documentation updates. Different ownership is therefore desirable, not a
mandatory prerequisite. Shared ownership must be disclosed and assessed, but
does not alone disqualify an implementation.

The remaining task is to demonstrate different functioning products and their
implementation independence. Product names, repository count, wrappers, or
alternate packaging do not by themselves demonstrate a different interpretation
or implementation. Candidates still need the public source, dependency,
operation, fixture, and evidence disclosure described in [E4](../../ROADMAP.md#e4--public-second-implementation).
No existing candidate is accepted or qualified by this clarification.

## Preserve the discovery record

The [archived divergence register](../../fixtures/archive/DIVERGENCES.md)
records three findings discovered July 22 against Engine 1.0.5. It explicitly
preserves that baseline, notes regression tests in Engine 1.2.0, and disclaims
any assertion that the findings remain present in current Engine code.

Keep that record at its historical path and leave its contents intact. Correct
the live conformance README to describe and link it as historical evidence.
For new or recurring discrepancies, use current issues and implementation
reports identifying exact versions, expected and observed behavior,
reproduction evidence, and disposition. Link to an old entry when relevant;
do not turn the old entry into a current defect claim or erase it after a fix.

## Evidence, compatibility, and limits

This clarification follows review of the published roadmap's ownership wording,
the conformance claim requirements, and the archived register's own scope.
The review is advisory and owner-authorized, not independent certification.
Shared ownership remains a disclosed potential conflict; independent assessment
claims retain the separate reviewer requirements in [GOVERNANCE.md](../../GOVERNANCE.md#non-self-certification).

No schema, fixture expectation, runtime behavior, profile qualification, or
certification rule is changed. The Viewer/Projection Profile still requires
its own claim manifest, report, and evidence. No missing fixture becomes a pass.
The signed v0.81 release and historical decisions remain unchanged. This text
applies to current development; any future correction must preserve this record
and identify its successor through the normal development decision process.
