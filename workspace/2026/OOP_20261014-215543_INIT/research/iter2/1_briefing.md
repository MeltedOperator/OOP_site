# Briefing — "What should we investigate?"
> **Mindset:** Strategist. Frame the questions that could change the next plan; do not prescribe a solution.
> **Parent:** [HL-OOP_20261014-215543_INIT.md](../../HL-OOP_20261014-215543_INIT.md)
> **Goal:** Initialize OOPoman with TFW Full v3.9.2 and preserve the owner's approved project scope.
> **Producer unit:** `codex:thread:local:01a13b5e-61b2-7df3-93b1-3dcc6579acb9`
> **Parent Coordinator:** `codex:thread:local:01a13b48-ed98-7631-85cb-e7691c6a01b3`
> **Activation / dispatch source:** `journal/20261014-233141__dispatch__e8ca.md @ a3508fdcc064a0d0d9b28df4a19d3609856c5827`
> **Coordination authority:** `HL-OOP_20261014-215543_INIT.md @ 353e1f31f82bb18d5c4dc59473e3ecee820c5b20`
> **Originating proposer:** `{principal: roman, unit: owner:roman}`

## Research Plan

- **Gather:** Establish what current Chrome/Chromium documentation says about `file://` origins, file access grants, extension permissions, and handling a separate local course directory; inventory and sample remaining PDFs for explicit runtime/environment requirements.
- **Gather:** Establish documented local Python/browser execution options and their containment/resource limits, relying on primary project/runtime/security documentation and distinguishing capability from safety guarantees.
- **Extract:** Compare access and execution configurations against the owner boundary (core site works offline after local launch; no OOPoman account/auth; `OOP-course/` remains separate), and map course requirements to local versus external dependencies.
- **Challenge:** Attack apparent solutions at permission, origin, offline-first-visit, package-boundary, malicious code, and missing-runtime edges; retain unverified browser behaviors as gaps.
- **Synthesis:** Update only H1, H2, H5 and preserve owner-reserved choices, existing evidence and iteration-3 threshold.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|---|---|
| H1 | A browser-local site can deliver the requested learning flow without a project-owned server or database, but the exact way it loads owner-provided course files may constrain packaging. | open |
| H2 | Multi-stage code checks can run locally in a browser only with explicit isolation and resource limits; an ordinary same-page evaluator is insufficient for untrusted code. | open |
| H5 | Content in a separate root `OOP-course/` directory can remain distinct from application code and still support clear lesson and week gating. | open |

## Scope Intent

- **In scope:** Primary Chrome/file-origin and extension access documentation; bounded security/runtime documentation for local Python/code checking; focused review of remaining course documents for explicit local tool/runtime requirements.
- **Out of scope:** Building or choosing a site, extension, stack, runner, safety model, progress policy, assessment policy, or course redesign; editing the PDFs or `iterations.yaml`, status, config, or frozen HL.

## Guiding Questions

1. Do documented Chrome permissions/origins provide a user-authorized route from a locally launched page or extension to the separate `OOP-course/` directory, and what remains implementation-specific?
2. What local Python execution options are documented, and what security/resource guarantees are actually stated for untrusted student code?
3. Which remaining course files explicitly require software, versions, accounts, network services, or setup that matter to an offline local flow?

## User Direction

Coordinator's committed dispatch `journal/20261014-233141__dispatch__e8ca.md @ a3508fdcc064a0d0d9b28df4a19d3609856c5827` authorizes this bounded focused iteration and names H1, H2, and H5. Iteration 1's RES `@ 60abca1d48bc39e431628116b2e915b5d6d229ae` records the owner boundary: Chrome; offline core after local launch; external links may need Internet; no OOPoman accounts/auth; third-party account requirements outside site scope. The owner-supplied 38 PDFs remain read-only inputs.

---
Stage complete: YES
