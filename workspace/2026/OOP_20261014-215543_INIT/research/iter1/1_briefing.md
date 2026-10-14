# Briefing — "What should we investigate?"

> **Mindset:** Strategist. Plan the investigation; do not solve product decisions.
> **Test:** Explain why each question matters and what evidence could change the next plan.
> Parent: [HL-OOP_20261014-215543_INIT.md](../../HL-OOP_20261014-215543_INIT.md)
> Goal: OOPoman gives second-year students a clear three-week OOP learning path with visible progress and points, usable locally without an account.
> Producer unit: `codex:thread:local:01a13b5e-61b2-7df3-93b1-3dcc6579acb9`
> Parent Coordinator: `codex:thread:local:01a13b48-ed98-7631-85cb-e7691c6a01b3`
> Activation / dispatch source: `journal/20261014-222832__dispatch__9ac4.md @ f29e83302ce885e8cbe9c13156d496c6a3728ca0`
> Coordination authority: `HL-OOP_20261014-215543_INIT.md @ 353e1f31f82bb18d5c4dc59473e3ecee820c5b20`
> Originating proposer: `{principal: roman, unit: owner:roman}`

## Researcher Source Binding — TRACE

- Surface and version: Codex local task rollout, source `vscode`, CLI `0.162.0-alpha.17.2`.
- Exact source ID: `01a13b5e-61b2-7df3-93b1-3dcc6579acb9`.
- Native source path: `C:\Users\tata2\.codex\sessions\2026\10\14\rollout-2026-10-14T22-03-25-01a13b5e-61b2-7df3-93b1-3dcc6579acb9.jsonl`.
- Bound range start: `2026-10-14T22:03:25+05:00`; timezone: `Asia/Qyzylorda` (`+05:00`); end: open at this Briefing checkpoint.

## Research Plan

### Gather

- Verify official browser documentation on local delivery, file origins, and loading owner-provided course files from the separate `OOP-course/` directory.
- Compare browser-native isolation and resource-control mechanisms against the stated need for staged checks of untrusted student code.
- Verify browser persistence options and constraints, then map the evidence to the no-project-server, no-database, no-account, local-use boundary.

### Extract

- Build a compact matrix of content-loading and local-delivery approaches compatible with the owner boundary; leave stack selection open.
- Map code-checking approaches to isolation, resource limits, and the scoring flow; identify evidence or approval still needed before implementation.
- Compare persistence choices by privacy, portability, and recovery behavior, without selecting a product policy.

### Challenge

- Test the browser-local direction against the strongest file-access, isolation, and denial-of-service counterexamples found in primary sources.
- Challenge persistence claims against origin boundaries, private browsing, quota, and user deletion behavior where official documentation supports those limits.
- Separate verified constraints from assumptions and owner-reserved choices; state which unresolved facts could change the next plan.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|---|---|
| H1 | A browser-local site can deliver the requested learning flow without a project-owned server or database, but the exact way it loads owner-provided course files may constrain packaging. | open |
| H2 | Multi-stage code checks can run locally in a browser only with explicit isolation and resource limits; an ordinary same-page evaluator is insufficient for untrusted code. | open |
| H3 | Local progress persistence is possible without a project database, but persistence choice changes privacy, portability, and recovery behavior. | open |
| H4 | The course can account for exactly 500 points while leaving the three practical splits and exam accounting open until Roman approves them. | open |
| H5 | Content in a separate root `OOP-course/` directory can remain distinct from application code and still support clear lesson and week gating. | open |

## Scope Intent

- **In scope:** Evidence about local browser delivery; access to owner-supplied course files; isolation and resource limits for student-code checks; local progress persistence; compatibility with the fixed 500-point total and week-release boundary.
- **Out of scope:** Choosing a stack or target browser; implementing code or course content; choosing practical score splits or rubrics; designing exam content or accounting; changing product scope; adding a project-owned server, database, account system, or deployment; opening Weeks 2–3.

## Guiding Questions

1. Is there a required browser or student-computer environment? If not, research will report documented compatibility limits without selecting a target platform.

## User Direction

- Roman selected the recommended `focused` mode. The delegated mandate permits focused iterations 1–2 and, only for a material unresolved gap, iteration 3 within the configured maximum.
- The frozen HL reserves product scope, score splits and rubrics, exam design, code-checking safety, persistence, stack, and release of Weeks 2–3 to Roman.

## Knowledge Inspected for This Briefing

Inspected at repository revision `f29e83302ce885e8cbe9c13156d496c6a3728ca0`:

| Source and scope | Material used | Limits / disposition |
|---|---|---|
| [NorthStar.md](../../../../../NorthStar.md) @ `8d3484311199f9a210151a574680ecda4ed316dd`; Purpose, Learner experience, Assessment contract, Product boundaries, Success | Local browser use; three weeks; owner-supplied course files; staged code checks; visible criteria; fixed 500-point total; owner-controlled week release. | Human-approved product direction; not technical proof. Preserve unresolved score splits, exam, runtime, and persistence choices for Roman. |
| [.tfw/README.md](../../../../../.tfw/README.md) @ `76a08ff82ebb369b54fc483178566cc62c2f3bbb`; NS1, NS2, Success Criteria | Purpose before activity; questions before premature answers; selected trace and bounded delegation; resumable, inspectable work. | Method guidance, not browser evidence or permission to decide reserved items. |
| [KNOWLEDGE.md](../../../../../KNOWLEDGE.md) @ `938f8524436e2e39cd3c47c506424ba0d627ae2d`; §1 Architecture Map | No project architecture decisions recorded. | Justified none; do not treat the context diagram as approved implementation architecture. No `knowledge/` records are present in the selected project tree. |
| [HL-OOP_20261014-215543_INIT.md](../../HL-OOP_20261014-215543_INIT.md) @ `353e1f31f82bb18d5c4dc59473e3ecee820c5b20`; §§4.1, 7.2, 8–10 | Delegation boundary, selected North Star and knowledge citations, open dependencies and risks, H1–H5, and proposed research focus. | Frozen contract remains unchanged; free-section recommendations go to the Coordinator in RES. |
| [.tfw/conventions.md](../../../../../.tfw/conventions.md) @ `f29e83302ce885e8cbe9c13156d496c6a3728ca0`; HL Contract | Distinguish free-section refinements from frozen-section amendments. | Researcher classifies recommendations only; Coordinator applies or escalates. |

`knowledge/philosophy.md` is cited as absent in HL §7.2; no project philosophy record was available to apply.

---
Stage complete: YES
