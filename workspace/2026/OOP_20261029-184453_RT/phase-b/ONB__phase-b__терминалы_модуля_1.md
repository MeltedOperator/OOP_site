# ONB — OOP_20261029-184453_RT / Phase B: Терминалы модуля 1

> **Current filename**: `ONB__phase-b__терминалы_модуля_1.md`
> **Date**: 2026-10-29
> **Author**: Executor · `codex:thread:local:01a188d2-f071-7e82-89c7-6a2813203583`
> **Status**: 🟠 ONB — Onboarding recorded
> **Parent HL**: [Phase B HL](HL__phase-b__терминалы_модуля_1.md)
> **TS**: [Phase B TS](TS__phase-b__терминалы_модуля_1.md)
> **Producer unit**: `codex:thread:local:01a188d2-f071-7e82-89c7-6a2813203583`
> **Parent Coordinator**: `coordinator:codex:thread:local:01a188ab-5190-7ce1-ab81-e572ebbbebc2`
> **Activation / dispatch source**: owner-direct assignment in this task; approved Executor scope in `../journal/20261029-225647__dispatch__phase-b-executor-retry.md` at `aa624d4874638beb0ea7ba3fb76caa7b34f9aecf`
> **Coordination authority**: `HL__phase-b__терминалы_модуля_1.md @ a8666c532fc8e3ab2f0fe2d649ee41058b29119b`
> **Originating proposer**: `{principal: roman, unit: owner:roman}`

---

## 1. Understanding

Build the shared two-panel Python practice terminal for the three Module 1 lessons and three labs. Learners need to edit and run lesson examples, start the labs from commented templates, receive only unambiguous oracle-backed feedback, see a subject-matter analogy after failures, and reveal full lab solutions on request. Existing executable source lines and all scoring, checklist, progress, peer-check, and completion behavior stay unchanged. This is the first shared terminal foundation; later phases may extend it only through their own approved selectors and Candidates.

## 2. Entry Points

- `course/data.js`: lesson sections and lab prompts, examples, questions, and checklist criteria.
- `course/app.js`: lesson/lab rendering and current score/progress behavior.
- `course/index.html`, `course/styles.css`: shared page shell and presentation.
- `course/storage.js`: protected progress storage; inspect and leave unchanged.
- `scripts/build-site.mjs`: current static site build; currently copies the course tree into `dist/`.
- `course/README.md`, `NorthStar.md`: approved local-run instructions and narrow disclosure.
- Planned additions: shared `course/terminal.js`, `course/pyodide-worker.js`, six pinned local runtime files, `scripts/serve-course.mjs`, and ASSURANCE-only `course/terminal.test.js`.

Baseline obligations: owner approval binds the exact TS, six-page Phase B selector, parent denominator (16 VALUE files / 4,000 touched text LOC for the entire task), score/progress boundary, and deferred browser/runtime/isolation claims. The Executor may implement only that frozen order; no added VALUE path, runtime asset, network route, scope, or acceptance criterion is admitted. The phase's delta is reported separately and is not a second denominator. ONB and EV/RF remain phase-local TRACE artifacts. No new temporary resource is needed yet; raw command output and scratch files will live under `%TEMP%/tfw/OOP_20261029-184453_RT/` and be removed before return.

## 3. Questions (blocking — cannot proceed without answers)

No blocking questions.

## 4. Recommendations (suggestions, not blocking)

1. Pin one official stable Pyodide distribution and copy only the six TS-planned core files into the approved local asset directory. The version is a candidate runtime version, not a compatibility or security claim.

## 5. Risks Found (edge cases, potential issues not in TS)

1. Lab criteria mix observable behavior with design, documentation, and peer-review judgments. Only criteria with a deterministic input and independent expected observation should become automatic checks; the rest must remain manual and never appear as passed.

## 6. Inconsistencies with Code (spec vs reality)

1. The current build has no package manifest or configured app test command. `scripts/build-site.mjs` runs directly under Node and copies all of `course/` into `dist/course/`; the implementation must keep the launcher static-only and add only targeted checks required by the approved TS.
2. Existing progress/scoring logic is inside `course/app.js` and `course/storage.js`; the approved selector permits changes to the former, not the latter.

## 7. Knowledge Citations

| # | HL §7.2 ref | Read? | Applied / N/A | Notes |
|---|---|---|---|---|
| 1 | P0 — `NorthStar.md`, purpose and product boundaries | ✅ | Applied | Preserve local no-account course behavior; only the owner-approved static-only localhost asset launcher is added. |
| 2 | P1 — `.tfw/README.md`, NS1 Purpose | ✅ | Applied | Keep practice tied to the existing six Module 1 pages and their learning goals. |
| 3 | P1 — `.tfw/README.md`, NS2 Principles | ✅ | Applied | Disclose browser/runtime uncertainty and keep manual review decisions human-owned. |
| 4 | P2 — `knowledge/philosophy.md` | ✅ | N/A | HL reports no separate verified project philosophy. |
| 5 | P3 — `KNOWLEDGE.md` §1 Architecture Decisions | ✅ | Applied | No architecture decisions are qualified yet; this implementation does not claim a qualified isolation model. |
| 6 | P4 — `.tfw/conventions.md`, HL / Design Rules / Anti-patterns | ✅ | Applied | Preserve the frozen scope and avoid claims beyond observable checks. |
| 7 | P5 — Pyodide official deployment docs, v314.0.7 | ✅ | Applied | Use the documented local distribution files and Worker loader contract; pin the candidate version without claiming compatibility. |

> **Cross-references**: P0–P5 as cited in the frozen Phase B HL §7.2.

### Material handover at this return

Producer/unit: this Executor. Source/epoch: approved Phase B TS `80b292a7ba85756efb0f0e4b53a2a51be94f462c`, owner approval gate `e5c57f732005df23ea30378ebc4ce2cd879321e0`, and inspected code at authority base `aa624d4874638beb0ea7ba3fb76caa7b34f9aecf`. Inspected scope: Module 1 lesson/lab source objects, app rendering, storage boundary, build script, README, and North Star. Material: app and data contain the six selected pages; score/progress state is separately stored; build currently copies the full course folder. Uncertainty: no browser, runtime compatibility, offline completeness, or hostile-code isolation was verified. Continuation: implement the six-page terminal and bounded local static assets under this TS; manual criteria remain manual. No new project knowledge record is proposed; qualification belongs to `/tfw-docs` or `/tfw-knowledge`.

---

*ONB — OOP_20261029-184453_RT / Phase B: Терминалы модуля 1 | 2026-10-29*

## Canonical re-entry — approved TS rev2 (2026-10-30)

- Canonical owner-selected phase transition: `journal/20261030-022757__transition__a1bf.md @ 62fd2395c3e3fd329472915694369902ee4df53d` set the phase to `TS_DRAFT`; exact owner approval is `../journal/20261030-023556__gate_answer__phase-b-ts-rev2.md @ cd3983e2442d0a696b04fdb611165f5c94044228` for TS rev2 `TS__phase-b__терминалы_модуля_1__rev2.md @ 156ee785c7043747ab231d801240d4c68e041afa`.
- Current Executor dispatch: `journal/20261030-030802__dispatch__phase-b-correct-lineage.md @ 028c4594039a7c90aafe77ac2520f72547d06099`; it authorizes only trace-lineage correction and binds the existing Candidate `c1acf55e81f9ec4927f883034eaba92de2214ebf`.
- This is a current-dated `TS_DRAFT → ONB` re-entry. Earlier branch transition records remain byte-for-byte preserved as history; they are not used as the current activation chain. The product Candidate predates this trace-only re-entry; no VALUE or ASSURANCE file is changed here.
- Re-read the existing Candidate's EV/test/build evidence under the exact approved rev2 and confirm that RF/EV identify the same Candidate. Then append the truthful `ONB → RF` transition and return the corrected RF to the Phase Coordinator. No new Candidate, Module 2/3 work, or browser/runtime/isolation claim is authorized.

### Material handover

Producer/unit: same Executor `codex:thread:local:01a188d2-f071-7e82-89c7-6a2813203583`. Source/epoch: canonical `TS_DRAFT` status, owner gate answer, exact approved TS rev2, and correction dispatch above. Inspected: current status carrier, transition `KNW → TS_DRAFT`, review GATE_REQUIRED ruling, and existing Candidate binding. Material: lineage is being re-established from the owner-selected approval cycle without rewriting prior events or product content. Uncertainty: none about the exact approved revision or Candidate identity; empirical browser/runtime, offline-completeness and isolation limits remain deferred. Continuation: same Executor validates the existing EV/RF and returns a current truthful RF/event chain.

## F4 — bounded current-summary metadata correction (2026-10-30)

- Accepted Coordinator ruling: `REVIEW__phase-b__терминалы_модуля_1__rev3.md @ 55e7f4848d3b872c58ba11743154c84f60d06652`; F4 only, rung 1, record-only.
- Current phase authority/status: RF at `status.md @ 20c284d171c05960f2bee3729efc11db768d5ac8`; exact approved TS rev2 `156ee785c7043747ab231d801240d4c68e041afa`; owner gate `cd3983e2442d0a696b04fdb611165f5c94044228`; Candidate `c1acf55e81f9ec4927f883034eaba92de2214ebf`.
- The only correction is to current RF/EV summary metadata and labels on superseded accounting/authority snapshots. Preserve earlier evidence and all transition bytes; no VALUE/ASSURANCE, Candidate, TS, selector, denominator, runtime, scoring or progress changes.

### Material handover

Producer/unit: same Executor `codex:thread:local:01a188d2-f071-7e82-89c7-6a2813203583`. Source/epoch: Phase Coordinator dispatch `journal/20261030-033712__dispatch__phase-b-rung1-f4.md @ 104fe401297a759fa538703ed4337ccc2e5d1734`, F4 ruling and status ref above. Material: RF/EV metadata currently names superseded TS rev1; candidate and rev2 evidence are already present. Continuation: correct only the current summary refs, label superseded snapshots, and return RF/EV for F4-only independent verification.

## Return 2 — owner-approved TS rev2 continuation (2026-10-30)

### Governing authority and scope

- Coordinator continuation: `/tfw-handoff OOP_20261029-184453_RT/phase-b workspace/2026/OOP_20261029-184453_RT/journal/20261030-023556__gate_answer__phase-b-ts-rev2.md @ cd3983e2442d0a696b04fdb611165f5c94044228`.
- Owner directly approved exact Phase B TS rev2: `TS__phase-b__терминалы_модуля_1__rev2.md @ 156ee785c7043747ab231d801240d4c68e041afa`. The gate answer records the approved revision and current TS_DRAFT status at its source epoch; this Executor's live phase state was RF at `b7d4f4b5646abd02a5907e4657fe4cd593d988e4`.
- Prior corrected Candidate: `422b4fa59881090bfbfa02b4d78ddde622652c1e`; baseline and immutable parent denominator remain unchanged. No Module 2/3 work or selector expansion is authorized.
- Rev2 adds explicit coverage requirements for every lecture Python block and JS comparison, each code-writing lab step, runnable concept analogies and solutions; prior RF/EV claims are not assumed to prove these expanded gates. Browser/runtime compatibility, offline completeness and isolation remain DEFERRED.

### Entry check and plan

The same Executor resumes Phase B from RF to ONB under the exact owner-approved TS rev2 and gate-answer record. First map every selected lecture block and code-writing lab step from current source to terminal content; identify gaps against AC-2, AC-3, AC-5 and AC-6; implement only within the approved VALUE selector; add reproducible coverage evidence and update EV/RF. Preserve original executable lines, scoring/progress boundaries, runtime boundary and module hold. Any VALUE change creates a new Candidate and requires fresh selector/accounting checks against the unchanged baseline.

### Material handover at continuation

Producer/unit: Executor `codex:thread:local:01a188d2-f071-7e82-89c7-6a2813203583`. Source/epoch: exact Coordinator continuation and owner gate answer above; governing TS rev2 is fixed at `156ee785c7043747ab231d801240d4c68e041afa`. Inspected: approved revision, current RF/ONB, phase state and prior Candidate. Material: the F1 route correction is present, while rev2 requires explicit content/step coverage and supporting evidence to be assessed. Uncertainty: no browser or isolation claims are added. Continuation: same Executor completes the rev2 acceptance gates and returns RF/EV to the Phase Coordinator.

## Return 3 — TS rev2 implementation completed (2026-10-30)

- Governing authority: approved TS rev2 `156ee785c7043747ab231d801240d4c68e041afa`; exact owner gate answer `cd3983e2442d0a696b04fdb611165f5c94044228`.
- Final tested Candidate: `c1acf55e81f9ec4927f883034eaba92de2214ebf`. The earlier rung-1 Candidate is superseded for this return.
- Added one editable/runnable exercise for each of the six lesson Python code blocks. Their executable lines are included in the exercise starters; the authored source comparison remains byte-for-byte. No JavaScript example block exists in the three selected lesson records.
- Added runnable terminal tasks to every code-writing lab step: lab 1 steps 2–5, lab 2 steps 2–5, lab 3 steps 1–5. Each gives an expected observation and was executed in Pyodide.
- Replaced text-only lab analogies with separate-domain runnable Python analogs. Failures and runtime errors reveal the analog; a dedicated button runs it. Each lab keeps one explicit full-solution control.
- Evidence at Candidate: terminal suite 8/8; storage regression 4/4; syntax checks pass; build passes. Exact VALUE selector remains 16 paths; final baseline delta is 1,183 additions + 17 deletions = 1,200 touched text LOC, two binary files N/A. No Module 2/3 work, score/storage changes, new selector paths or runtime assets.
- Browser behavior, compatibility, offline completeness and isolation remain DEFERRED. No reviewer verdict or owner acceptance is inferred.

### Material handover at this return

Producer/unit: Executor `codex:thread:local:01a188d2-f071-7e82-89c7-6a2813203583`. Source/epoch: exact Coordinator continuation, owner gate answer and approved TS rev2 above. Inspected: six source code blocks, all Module 1 numbered lab steps, terminal route rendering, analogy/solution UI, oracle fixtures, scoring/storage boundary, launcher and build. Material: rev2 coverage is implemented and recorded in EV at final Candidate `c1acf55e81f9ec4927f883034eaba92de2214ebf`. Uncertainty: no browser/runtime compatibility, offline-completeness or isolation evidence was produced. Continuation: Phase Coordinator receives RF/EV for the next authorized review action.

## Return 1 — accepted REVISE rung 1 (2026-10-30)

### Ruling and bounded scope

- Governing TS: unchanged owner-approved Phase B TS `80b292a7ba85756efb0f0e4b53a2a51be94f462c`; owner approval `e5c57f732005df23ea30378ebc4ce2cd879321e0`.
- Live REVIEW and closed Coordinator ruling: `REVIEW__phase-b__терминалы_модуля_1.md @ b6cae465f4b928e845f82e1c645d876b9071ac42`; F1 accepted at rung 1 under AC-2.
- Reviewed RF/EV epoch: RF `80bd2369e6c25bddd00d02917711d3577392f632`; Candidate remains `6af207b52d36cd674fcc9dbf804a22b637b71a41` until any tested VALUE change.
- Bound: make the terminal visible on lab routes 1–3, add route-level regression coverage for all six Module 1 lesson/lab pages, preserve scoring/progress boundaries, and return updated RF/EV with relevant checks. Recompute Candidate accounting against the unchanged selector/denominator if VALUE changes.
- F2/F3 remain non-material TRACE observations; they authorize no product work. Browser/runtime compatibility, offline completeness and isolation remain deferred.
- No blocking question remains within this bound. Do not change TS, scope, paths, runtime assets or scoring policy.

### Entry check and plan

The current phase status is RF and still names this Executor's `coordinator_route`, `reporting: native-gates` and `selection_ref: baseline`. The exact `/tfw-handoff` continuation and current live REVIEW resolve to the same Phase B and owner-approved TS. Source inspection confirms the finding: `renderLab` places terminal markup inside the `lab.example` branch, while Module 1 labs have no `example` member. The fix will make terminal rendering independent of the optional static example, and the test will exercise the actual page-route render path for all six pages instead of only testing the terminal helper in isolation.

The first new route-level run exposed the related terminal API mismatch: `app.js` calls `OopomanTerminal.render`, but the approved terminal module exports `renderTerminal`. This prevents terminal markup on lesson routes too. Correcting both Module 1 route call sites to the exported `renderTerminal` function is necessary to complete the same six-page F1 bound and introduces no new scope.

### Material handover at this return

Producer/unit: Executor `codex:thread:local:01a188d2-f071-7e82-89c7-6a2813203583`. Source/epoch: Coordinator continuation `/tfw-handoff OOP_20261029-184453_RT/phase-b workspace/2026/OOP_20261029-184453_RT/phase-b/REVIEW__phase-b__терминалы_модуля_1.md @ b6cae465f4b928e845f82e1c645d876b9071ac42`; inspected scope is the returned F1, its ruling, approved TS AC-2, current `renderLab` route and existing terminal test. Material: the static lab examples are optional data and cannot gate the approved lab terminals. Uncertainty: browser-visible layout remains untested and deferred. Recipient/continuation: Phase B Coordinator; same Executor fixes only the rung-1 boundary and returns updated EV/RF. No new project Fact Candidate is proposed.

