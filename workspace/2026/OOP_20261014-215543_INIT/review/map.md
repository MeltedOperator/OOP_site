# Map — What must be true?

> **RF:** [RF](../RF__OOP_20261014-215543_INIT.md)
> **TS:** N/A — the INIT gate is governed by the frozen master HL and owner-approved completion criteria.

## Understanding

INIT claims that OOPoman has a traceable TFW Full v3.9.2 setup, owner-approved project context, Codex command routes, selected research records, and preserved owner-provided course files, without starting product implementation or deciding owner-reserved matters. Its purpose is to leave a reliable, resumable basis for a later site-planning task while preserving Roman's control over scope, course content, assessment policy, safety, persistence, and release of later weeks.

## Accepted Claims and Boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE / ASSURANCE | TFW Full v3.9.2, OOPoman identity, Russian language, OOP task prefix, and Codex command routes are installed and consistent. | A wrong or partial setup can route future work incorrectly or make the project unreproducible. | `.tfw/VERSION`, `.tfw/project_config.yaml`, root adapter instructions, and selected Codex skills. | Current checkout, Windows; no app runtime. | Approved INIT scope; installed framework files. | Current checkout at review start; EV E1–E3; RF §§1, 2, 4. | yes |
| C2 | VALUE / TRACE | North Star, owner-command trace, README routes, and initial context diagram preserve the approved product purpose and boundaries. | Later work could contradict owner requirements or mistake a context sketch for approved architecture. | `NorthStar.md`, `TRACE.md`, `README.md`, `architecture/context.puml`, frozen master HL. | Current checkout and owner-authored project records. | Owner-authored `TRACE.md` and `NorthStar.md`; frozen HL §§1, 3–7. | Current checkout; RF §§1–2, §9; HL at the status coordination-authority epoch. | yes |
| C3 | VALUE / TRACE | Two bounded research iterations and the RF handover preserve findings and unresolved decisions without selecting owner-reserved product choices. | A later planner could treat an unproven launch/sandbox/persistence option as a settled design. | Research RES/stage records, owner reservations, RF §§1–2 and handover. | Research evidence and declared browser/offline context. | Frozen HL §§4.1, 8–10; RF; cited RES records. | `research/iter1/RES.md`, `research/iter2/RES.md`, RF; exact revisions to be checked in Verify. | yes |
| C4 | VALUE / ASSURANCE | The supplied course PDFs are present under root `OOP-course/` and remain source material, not altered or invented content. | Changed or missing material could corrupt course inputs; false provenance could mislead later integration. | Root `OOP-course/` and owner trace. | User-supplied untracked files in current checkout. | Owner trace plus current file inventory; no version-controlled baseline is declared. | RF E6 / EV E6 and current checkout inventory; integrity boundary to be checked. | yes |
| C5 | VALUE / TRACE | INIT creates no site, extension, runtime, tests, or unapproved assessment/safety/persistence decision. | Premature implementation or a hidden design choice could cross owner-reserved boundaries. | RF changed/new-file list, repository status, North Star and HL reservations. | Current checkout. | Frozen HL §§4–6, 8; TRACE; owner-approved INIT scope. | RF §§1–3; current repository state and file list. | yes |
| C6 | ASSURANCE / TRACE | RF evidence accurately establishes its claims, applies to the accepted result, and exposes limits; there is an attributable accepted-result identity and authorized review route. | Weak or stale evidence may create false confidence; an invalid route or ambiguous result blocks safe continuation. | EV E1–E7, RF §§4–6, Git history/status, task status and journal. | Current checkout, declared Windows environment. | Frozen HL; task status and selection/dispatch; RF/EV and source files. | Current review checkout; status `REV`; dispatch to Reviewer; EV and RF. | yes |
| C7 | VALUE / ASSURANCE | Mandatory safety/security and human-authority boundaries are preserved even though no executable application exists. | Arbitrary student code, unauthorized services, or unapproved access to later weeks would harm students or violate owner control. | No app/code runner, server, database, accounts, deployment, or release mechanism; later design remains open. | INIT only; no application runtime. | Frozen HL §§3–6, 8–9; North Star; TRACE. | Current checkout; RF §2 and EV limits. | yes |

## TS ↔ RF Alignment

No separate TS governs INIT. The accepted checklist is the owner-approved initialization scope in the frozen HL §5 (DoD) and §6 (DoF), with authority and owner-reserved boundaries in §4.1 and §7. RF §3 marks initialization items complete and independent review/Coordinator closure pending. Verify will compare each claim above to those frozen criteria and the actual files/evidence.

## Verification Selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1 | Read version/config; compare all selected Codex skill copies byte-for-byte by SHA-256; compare managed AGENTS block with its template; inspect installed route scope. | Installation consistency is a core INIT result and an incorrect route could affect all later work. | Hash parity does not prove live command invocation. |
| C2 | Inspect the owner-authored North Star/TRACE, README links, context diagram, and frozen HL acceptance boundary. | These records carry scope and continuity to future tasks. | A context diagram is not implementation architecture. |
| C3 | Inspect RES/stage records referenced by RF, confirm iteration count, declared source/evidence and that unresolved decisions remain open in RF/HL. | RF depends on research for its handover but research does not authorize implementation. | Research sources and exploratory checks do not prove an implemented browser experience. |
| C4 | Count current files by directory, compare available source names/sizes to RF's 38-PDF claim, check whether paths are tracked/ignored, and look for a committed baseline or owner inventory. | Owner-provided source preservation is mandatory; provenance and change detection need an explicit oracle. | The folder may be untracked, so Git alone may not establish prior byte identity. |
| C5, C7 | Reconcile RF's changed/new-file list with Git state and inspect owner scope/reservations; establish absence of app/runtime artifacts and prohibited choices. | Safety, owner authority and scope boundaries are mandatory floors. | Absence in the current checkout cannot prove no external action occurred. |
| C6 | Audit EV against RF; independently repeat applicable read-only checks; verify status, immutable selection/authority refs, dispatch identity, Candidate status, and evidence applicability. | Evidence must apply to this accepted setup and the Reviewer must return to the authorized Coordinator. | No application tests are applicable; task economics may have a native-source binding gap. |

## Deviations from TS

No TS exists for INIT. RF explicitly uses the owner-approved initialization criteria instead. Verify must identify any omissions against the master-HL DoD/DoF rather than treating TS as an authority.

## Checkpoint

**Self-check:**
- [x] Read RF §§1–5 and governing HL purpose/principles and acceptance boundaries; TS is N/A, and there is no ONB. The two RF-referenced RES predecessors were selected here and opened at Verify V3 before judgment; this sequencing deviation is recorded as O3.
- [x] Mapped every material accepted claim and the mandatory safety/security, authority and result-identity boundaries.
- [x] Bound each claim to affected behavior/dependencies, environment, oracle/authority and exact evidence identity.
- [x] Recorded a replayable verification selection and known gaps or limits.
- [x] Avoided classifying by filename, discrepancy count or artifact volume.

Stage complete: YES
