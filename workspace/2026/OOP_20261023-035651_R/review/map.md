# Map — OOP_20261023-035651_R

> **RF:** `workspace/2026/OOP_20261023-035651_R/RF__OOP_20261023-035651_R.md` at `a27e285aa18a866c65922d73f26205acaadc709b`  
> **TS:** `workspace/2026/OOP_20261023-035651_R/TS__OOP_20261023-035651_R.md` approved at `debfaeec8cf9c5f5d52da55f56cda7b4adf0c66b`

## Understanding

The Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68` protects an unrecognized per-lab local-progress record from being dropped when another lab is saved, refuses writes to the affected lab, and informs the learner. The accepted boundary is a local static course that keeps its existing progress key, normal lab behavior, and explicit reset scope; no real learner data-loss incident is claimed. The routed RF/EV return also records an owner confirmation about the browser scenario in project `TRACE.md` at `ae54af97c73ac8514fb3ea1ea00b2d17a289c94a`.

## Accepted Claims and Boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE | Unknown or unsupported lab records survive a successful write to a different lab without normalization or loss. | Silent deletion of saved learner state. | `readProgress()` and persistence of the complete local progress document. | Browser `localStorage`; deterministic isolated storage test. | TS §2, §5 AC-1; frozen HL; North Star. | Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68`; RF §3 / EV E1. | yes |
| C2 | VALUE / ASSURANCE | All write paths refuse to replace the affected unsupported lab; the UI explains the refusal and preserves explicit reset as the learner's choice. | Data overwrite or misleading indication that state was saved/deleted. | Start, answer-save, completion and notice paths in `course/storage.js` and `course/app.js`. | Browser course flow and local storage. | TS §5 AC-1/AC-2; EV; owner confirmation recorded in `TRACE.md`. | Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68`; RF §3 / EV E1–E2; `TRACE.md` at `ae54af97c73ac8514fb3ea1ea00b2d17a289c94a`. | yes |
| C3 | VALUE | Normal supported-lab operations, completion/scoring, and reset of only `oopoman.progress.v1` retain their established behavior. | A broad write lock or reset could discard valid work or unrelated browser state. | Other lab state, answers/checklists, completion and reset. | Isolated Node storage tests and real browser flow. | TS §5 AC-1/AC-2; North Star and `course/README.md`. | Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68`; RF §3 / EV E1–E2. | yes |
| C4 | TRACE | The approved selector, accounting denominator, Candidate identity, and transition into RF are authorized and reproducible. | Unapproved scope or a wrong result could be accepted. | Owner-approved TS, exact path selection, baseline-to-Candidate diff, task status/journal. | Git history and task records. | Owner gate `journal/20261023-120201__gate_answer__D92F.md`; TS §4; status/event at RF commit. | Baseline `2daa9a40f2278802145496934fadf0c5830734e3`; Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68`; RF commit `a27e285aa18a866c65922d73f26205acaadc709b`. | yes |
| C5 | ASSURANCE | The regression test detects the original loss/overwrite behavior and passes on the accepted Candidate. | A positive-only or irrelevant test would leave the reported invariant unguarded. | Built-in `node:test` suite and its actual storage oracle. | Node.js 22.20.0. | TS §5 AC-1; permanent-guard rule in review workflow. | `course/storage.test.js` and `course/storage.js` at Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68`; EV E1. | yes |
| C6 | ASSURANCE / TRACE | Browser evidence applies to this exact Candidate and meets the TS browser environment/observation requirement, or is adequately supported by the owner's direct confirmation. | The key learner-facing warning, ordinary flow and reset boundary may be unproved in the required environment. | Real browser execution, storage observations, and evidence-to-Candidate binding. | TS specifies Chrome; EV identifies ChatGPT in-app browser with unknown engine version. | TS §5 AC-2; EV E2; owner-sourced `TRACE.md` entry dated 2026-10-27. | Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68`; RF commit `a27e285aa18a866c65922d73f26205acaadc709b`; trace commit `ae54af97c73ac8514fb3ea1ea00b2d17a289c94a`. | yes |
| C7 | ASSURANCE / TRACE | Accounting contains only the two pre-approved VALUE files, with valid logical membership, numeric LOC and trigger disposition. | Misstated cost or unauthorized scope could bypass owner authority. | NUL-safe `name-status` and `numstat`; protected-path boundaries; chronology. | Git baseline and first tested Candidate. | Approved TS §4; task conventions on exact accounting. | Baseline `2daa9a40f2278802145496934fadf0c5830734e3` → Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68`; RF §1 / EV E-accounting. | yes |
| C8 | TRACE | No real learner incident is asserted; the cross-tab race remains out of scope and unresolved. | Overclaiming would distort the reason, priority, or future work. | Project knowledge, residual-risk statements, and continuation authority. | Existing local course and reported test/browser environment. | Frozen HL, approved TS and human-sourced task records. | RF §§2–6; EV; `TRACE.md` at `ae54af97c73ac8514fb3ea1ea00b2d17a289c94a`. | yes |

## TS ↔ RF Alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-1 preserve unsupported record while saving another lab; refuse writes to it; retain normal operations/reset | RF §3 AC-1; EV E1 | C1, C2, C3, C5 | ✅, subject to independent verification |
| AC-2 learner-facing warning, normal flow and explicit reset in Chrome with storage observations | RF §3 AC-2; EV E2 used ChatGPT in-app browser; later owner confirmation is in project TRACE | C2, C3, C6 | ⚠️ environment/identity and attestation sufficiency require verification |
| AC-3 exact artifacts, status/journal, trace and independent review | RF §3 AC-3 is unchecked and says REVIEW remains; RF commit contains status transition and event | C4, C7, C8 | ⚠️ this review must complete the independent-review part |
| Exact two-file VALUE selector, Candidate timing, ≤120 touched LOC, trigger and authority rules | RF §1 and EV E-accounting | C4, C7 | ✅, subject to rerunning exact accounting |

## Verification Selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1, C2, C3, C5 | Inspect the exact changed storage/app code and regression tests; run the approved test on the exact Candidate and a baseline counterfactual; inspect behavior of each write path and reset boundary. | The accepted value protects learner state and requires an actual relevant counterfactual guard. | The sandbox may prevent `node --test` child-process launch; if so, record the exact failure and use only a checked equivalent that preserves the test assertions. |
| C2, C3, C6 | Audit EV E2 and the owner statement in the exact TRACE revision; compare environment, Candidate identity and before/after observations with TS AC-2. | Browser UI and persisted state are separate from the storage-unit tests; owner confirmation carries human authority but must be scoped to the required claim. | EV says in-app browser/unknown engine; owner statement does not name browser/version or repeat observations. No Chrome surface was available in this task. |
| C4 | Resolve owner approval, authority epoch, Candidate and RF transition event; verify status and route at the exact RF return. | Human authority and accepted-result identity are mandatory review floors. | Role worktree and project TRACE are separate snapshots; bind each fact to its immutable commit. |
| C7 | Rerun the approved NUL-safe `name-status` and `numstat` methods with literal VALUE selector and compare full changed-file inventory to TS. | Accounting is part of frozen scope and trigger authority. | Non-VALUE TRACE/evidence files are outside the VALUE denominator. |
| C8 | Compare residual-risk language to the frozen HL and owner-approved TS; check the exact TRACE successor entry and cited task records. | Prevent turning conditional risk into an unsupported incident or promising out-of-scope repair. | Do not inspect another role's unreturned reasoning or infer owner approval beyond the selected human-sourced statement. |

## Deviations from TS

RF/EV name ChatGPT in-app browser, while TS/ONB specify Chrome. The newer owner-sourced TRACE entry says Roman personally checked the browser scenario and confirms it, and says a Reviewer rerun is unnecessary. The review must judge that direct confirmation against the exact AC-2 claim; it does not identify browser/version, exact Candidate, or the observed storage transitions. RF also leaves AC-3 unchecked because independent REVIEW is the current stage, not because the implementation failed it.

## Checkpoint

**Self-check:**
- [x] Read RF §§1–5, governing TS AC/DoF, HL purpose/principles, ONB and referenced predecessors.
- [x] Mapped every material accepted claim and the mandatory safety/security, authority and result-identity boundaries.
- [x] Bound each claim to affected behavior/dependencies, environment, oracle/authority and exact evidence identity.
- [x] Recorded a replayable verification selection and every known gap or limit.
- [x] Avoided classifying by filename, discrepancy count or artifact volume.

Stage complete: YES
