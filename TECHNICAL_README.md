# GKOS technical orientation

GKOS v0.79 governs the GKX 2.0 machine contract. Current implementations use
`gkx_version`, `.gkx/`, `GKX-*`, and `gkx`. R14 is owner-authorized,
developmental, and non-consensus.

R15 adds the state-change receipt role, retention/disposition controls,
Layer-1 re-entry rules, explicit semantic supersession, and bounded delegation.
These requirements do not change the GKX 2.0 serialized namespace or confer
general agent write authority.

The reference implementation is `gkos-engine` 2.0.1 at commit
`7c742436d50b34f6dda66976212a672fb51f7c21`. Historical technical orientation
is preserved in `archive/` and has no current conformance authority.
