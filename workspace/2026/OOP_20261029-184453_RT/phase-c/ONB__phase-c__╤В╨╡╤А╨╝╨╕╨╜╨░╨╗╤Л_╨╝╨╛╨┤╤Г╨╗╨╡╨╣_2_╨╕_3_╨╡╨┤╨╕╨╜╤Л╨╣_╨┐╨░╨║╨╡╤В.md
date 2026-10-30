# ONB — OOP_20261029-184453_RT / Phase C: Терминалы модулей 2 и 3 — единый пакет

> **Date**: 2026-10-30
> **Author**: Executor
> **Status**: 🟠 ONB — Onboarding recorded
> **Parent HL**: [Phase C HL](HL__phase-c__терминалы_модулей_2_и_3_единый_пакет.md)
> **TS**: [Phase C TS](TS__phase-c__терминалы_модулей_2_и_3_единый_пакет.md) · approved in `6b17d963f905cf94ce49a23f85d7965cd0297186`
> **Producer unit**: `codex:thread:local:01a18b46-828d-70c2-96eb-b68ed8688d41`
> **Parent Coordinator**: `codex:thread:local:01a18b1b-cf9b-7a50-a203-23392130eb0e`
> **Activation / dispatch source**: owner-direct `/tfw-handoff OOP_20261029-184453_RT/phase-c` in this addressed task; exact TS approval and owner response in `journal/20261030-101430__gate_answer__55d4.md`
> **Coordination authority**: `../HL-OOP_20261029-184453_RT.md @ 16e634d54418705183f6d6587b616cd79d50f806`
> **Originating proposer**: `{principal: roman, unit: owner:roman}`

---

## 1. Understanding

Реализовать один общий Candidate с учебным терминалом на всех шести теориях и шести лабораторных страницах модулей 2 и 3. Сохранить поведение Worker и интерфейс, принятые в Phase B; практические автоматические проверки привязать только к фиксированным наблюдаемым критериям текущих материалов сайта. Не менять существующие исполняемые строки, PDF, оценивание, прогресс, checklist, peer-check, завершение лабораторий или готовность модулей к публикации. Не представлять браузерную совместимость, сетевую изоляцию, offline-полноту, производительность или жёсткие лимиты как проверенные.

## 2. Entry Points

- `course/app.js`, `course/data.js`, `course/terminal.js`, `course/pyodide-worker.js`, `course/styles.css`, `course/index.html` — интеграция и содержание терминала.
- `course/assets/pyodide/` — ровно шесть существующих ресурсов в родительском селекторе; добавление VALUE-пути не разрешено.
- `scripts/serve-course.mjs`, `scripts/build-site.mjs`, `course/README.md`, `NorthStar.md` — статический запуск, сборка и точность продуктовых заявлений.
- `course/terminal.test.js` — единственный заявленный ASSURANCE-файл; `course/storage.js` и PDF остаются вне разрешённых изменений.
- Проверенная база: accepted Phase B Candidate `c1acf55e81f9ec4927f883034eaba92de2214ebf` является предком текущей Phase C approval-ветки. Правило учёта наследует исходный baseline `23637e22ce1c4242b904b7a8b9f92cfbd81f2b56`, 16 VALUE-файлов / 4,000 touched text LOC; Phase B использовала 1,200, предел Phase C — 2,800 LOC. Фактическая Phase C дельта ещё не измерена.

| Baseline obligation | Application in this phase |
|---|---|
| Authority and selection | Owner-only activation; exact owner-approved Phase C HL/TS, `native-gates`, `tfw-gates-only`, current phase `coordinator_route`; no inferred mandate or peer route. |
| Role Lock and ordered reads | Executor writes only ONB, implementation, EV and RF; Phase HL/TS remain immutable. The workflow and selected phase state/journal, parent authority, approved TS, config, required shared rules and templates were read before implementation. |
| Launch and gates | Record ONB, status/event and economics binding outcome before `ONB_READY`; continue without waiting because ONB has no blocking question. Send the final return only after durable RF/state/event. |
| Review and REVISE | Preserve one Candidate and EV; do not write REVIEW or dispatch Reviewer. Coordinator selects independent review. Any later correction follows the exact ruled rung and governing TS. |
| Accounting | Exact parent selector and denominator; Candidate is the first tested implementation commit. Keep raw accounting output in `%TEMP%\tfw\OOP_20261029-184453_RT\` and remove it at return. |
| Knowledge handover and close | Preserve inspected sources, material scope, uncertainty and continuation in ONB/RF. Reviewer and Coordinator retain their own review and close duties. |
| Installed copies | Do not change `.tfw/` framework files, adapters or installed copies. |

Native coordination capability at entry: provision — native; addressed send — native; wait/readback — native; title write/readback — native. The task title was set to `EXEC · OOP_20261029-184453_RT · PHASE-C` and read back for this exact unit. These mechanisms provide transport only; status, authority and artifacts remain governing.

**Economics binding at activation — typed pre-extraction gap.** Producer/unit: Executor `codex:thread:local:01a18b46-828d-70c2-96eb-b68ed8688d41`; project/task/phase/owner/role: OOPoman / `OOP_20261029-184453_RT` / `phase-c` / Roman / Executor. Surface: Codex local task rollout. Observed at `2026-10-30T10:28:42+05:00`; timezone `+05:00`. The rollout `session_meta.id`, exact source path/version, source byte range start and finite cutoff are not exposed to this unit, so the exact numeric source binding cannot be established. Extraction was not attempted; no JSONL, numeric usage, measured zero or failed-extraction receipt is claimed. Last-good returned numeric file: none. Code: `native_source_binding_unavailable`. Continuation: retain this gap in the role return; no source or range is guessed.

## 3. Questions

No blocking questions.

## 4. Recommendations

1. Keep the existing Module 2 readiness predicate and Module 3 local-preview predicate unchanged while mapping the twelve page IDs to their new terminal examples and exercises; these gates are part of the delivery boundary.
2. Reconcile the source inventory against each lab’s current-site scope before deriving an oracle, especially the deliberately narrower Labs 7–9.

## 5. Risks Found

1. Integrating all twelve pages may exceed the remaining 2,800 touched text LOC. Track the exact selector before additional VALUE writes; stop before any breach or added path.
2. Parent As-Is prose and current course source have known mismatches. Use inspected source and approved Phase C scope, and do not silently broaden lab criteria to PDF-only material.
3. Browser/runtime compatibility, security isolation, offline completeness, performance and hard resource limits remain outside this phase and unverified; preserve explicit disclosures.

## 6. Inconsistencies with Code

1. The approved TS requires terminal integration across lessons/labs 4–9, while the current `course/app.js` terminal mounts are limited to Module 1. This is the intended Phase C implementation gap, not authorization to change other modules.
2. The approved TS requires the Module 3 local-preview-only gate to remain; current `course/data.js` derives Module 3 readiness from local-preview context. Preserve and regression-check that predicate.
3. The TS retains current-site lab boundaries for 7–9; do not restore the broader PDF scope.

## 7. Knowledge Citations

| # | HL §7.2 ref | Read? | Applied / N/A | Notes |
|---|---|---|---|---|
| P0 | [NorthStar.md](../../../../NorthStar.md) — Purpose, Learner experience, Assessment contract, Product boundaries, Success | ✅ | Applied | Keep feedback instructional and separate from score/completion; retain the owner-approved static-only localhost and no-student-code-service boundary. |
| P1 | [.tfw/README.md](../../../../.tfw/README.md#ns1--purpose) — NS1 | ✅ | Applied | Implement the selected learning outcome with bounded feedback, not interaction for its own sake. |
| P1 | [.tfw/README.md](../../../../.tfw/README.md#ns2--principles) — NS2 | ✅ | Applied | Keep uncertainty explicit and use the approved, limited verification claims. |
| P2 | `knowledge/philosophy.md` — absent | ✅ | N/A | The cited source is recorded absent in the approved HL; no additional project philosophy is available to apply. |
| P3 | [KNOWLEDGE.md](../../../../KNOWLEDGE.md) §1 Architecture Decisions | ✅ | Applied | Do not promote a research option or source observation into a new architecture decision. |
| P4 | [.tfw/conventions.md](../../../../.tfw/conventions.md) — HL, Design Rules, Anti-patterns | ✅ | Applied | Preserve one authority, exact scope and role boundaries; no bonus fixes or duplicated acceptance contract. |
| P5 | MDN — CSP in workers | ✅ | N/A | No worker topology, CSP or network-isolation change is authorized. Keep these properties unverified; no empirical claim relies on this citation. |
| P5–P7 | `knowledge/convention.md`, `knowledge/process.md`, other `knowledge/*.md` — absent | ✅ | N/A | The approved HL records these sources absent; no extra qualified process or environment facts are assumed. |

### Material handover at this return

Producer/unit: Phase C Executor `codex:thread:local:01a18b46-828d-70c2-96eb-b68ed8688d41`; source/epoch: owner-direct handoff command and exact Phase C approval event at `2026-10-30T10:14:30+05:00`, inspected again at `2026-10-30T10:28:42+05:00`. Inspected scope: phase status/journal, Phase C HL/approved TS, frozen parent HL and approved parent TS, project configuration, North Star, knowledge citations, Phase B accepted RF/Candidate and current terminal entry points. Material: one integrated twelve-page Phase C with a 2,800 LOC remaining ceiling and no selector expansion. Uncertainty: browser/runtime/security properties remain unverified; native rollout binding is unavailable before extraction; source-to-page/oracle mapping and actual LOC fit remain to be established. Continuation: proceed under approved TS; stop and route any necessary boundary/budget decision to the existing Phase Coordinator.

---
*ONB — OOP_20261029-184453_RT / Phase C: Терминалы модулей 2 и 3 — единый пакет | 2026-10-30*


## Return 1 — Coordinator-ruled REVISE (F1/F2)

The Phase C Coordinator ruling in `REVIEW__phase-c__терминалы_модулей_2_и_3_единый_пакет.md @ cc1d61d549e5018a75c37209468fdabb47f3d62d` accepts both material findings as rung 1 under the unchanged approved TS. The exact continuation was `/tfw-handoff OOP_20261029-184453_RT/phase-c` with that immutable REVIEW reference, received from the recorded phase Coordinator route. This is the same Executor and approved Candidate lineage; no TS sibling, selector expansion, scope change, publication, or owner acceptance is authorized.

- **F1, `course/README.md` (VALUE):** correct the false statement that only Module 1 has terminal checks / other pages require separate Python projects. State that the shared terminal is available on all nine lesson/lab pairs, gives bounded checks, does not assess a complete solution, and does not change points, checklist, progress, completion, or manual peer review.
- **F2, `scripts/serve-course.mjs` (VALUE):** make the exact documented `http://127.0.0.1:8000/course/` URL serve the built course landing page while retaining the static-only allowlist and filesystem containment checks. Add a request-level regression to the already selected ASSURANCE file `course/terminal.test.js`.
- **Verification:** rerun the affected terminal/launcher assurance and site build; verify the documented URL against built output. Recalculate the exact 16-file selector against root baseline `23637e22ce1c4242b904b7a8b9f92cfbd81f2b56`; Candidate must move, and cumulative / direct-delta counts must stay within 4,000 / 2,800. No other VALUE path is in the ruling.
- **No blocking questions.** The applicable pre-extraction economics binding gap remains: same local Codex surface, but exact rollout/source/range identity remains unavailable; do not infer usage or zero.

**Resumption economics binding:** producer/unit `codex:thread:local:01a18b46-828d-70c2-96eb-b68ed8688d41`, project/task/phase/owner/role OOPoman / `OOP_20261029-184453_RT` / `phase-c` / Roman / Executor. Observed at `2026-10-30T11:39:08+05:00`. The native surface is the Codex local task rollout; `session_meta.id`, exact source path/version, range start and finite cutoff remain unexposed. Extraction was not attempted; no JSONL, measured zero or failed-capture receipt is claimed; last-good numeric file remains none. Code: `native_source_binding_unavailable`. Retain this gap in the final role return.
## Return 2 — owner-approved public Module 3 readiness

Activation is the same Executor continuation, dispatched by the Phase C Coordinator on 2026-10-30. The governing order is TS rev1 at commit a9695d828ca903f8fc04b75695a49277a310e3b1, approved under the owner’s A9 change recorded in journal/20261030-124523__gate_answer__55e1.md and authority epoch 20a6efc2e3aebef47bf42f799dfa56a3b71980a3. The dispatch is journal/20261030-125157__dispatch__c4a8.md; the preceding RF-to-TS_DRAFT transition is journal/20261030-124937__transition__be72.md. The exact first dispatch message was the task command plus the immutable TS reference. This is the same Executor and independent Reviewer lineage; the already accepted Candidate e56d2961c9927df3fc30fc3c066397d3069c23e3 and its APPROVE at REVIEW rev2 7ab897837e44494f5dcf0a7fed65a76453d3f610 remain valid for their prior scope.

### 1. Understanding — round 2

Implement the owner-approved public Module 3 availability revision within the existing 16-path VALUE selector. Remove the local-preview host condition while retaining the existing content-readiness predicate. Correct the home-page and README statements for readiness-based availability. Add actual-app route coverage on a non-local HTTPS hostname and an incomplete-content fixture proving the gate remains closed when readiness fails. Confirm the production build contains all 18 source PDFs and six diagrams and that its documented /course/ URL serves the course landing page. Preserve lesson/lab scope, terminal behavior, evaluation, progress, PDFs and all unverified browser/runtime/security claims. No production deployment or publication act is included; independent review and owner acceptance precede any publication decision.

### 2. Entry Points — round 2

- course/data.js: current weekThreeReady is explicitly conditioned on localhost/file preview before checking all lesson/lab readiness fields.
- course/app.js: home hero text says Week 3 remains closed; existing module and direct-page routes already follow module.available.
- course/README.md: describes Module 3 as local-preview-only; build and local launcher instructions are also present.
- course/terminal.test.js: existing actual-app route harness can exercise home, week and lesson/lab routes; replace the HTTPS-closed expectation with positive hosted and negative readiness fixtures.
- scripts/build-site.mjs, scripts/serve-course.mjs: use an isolated system-temp source mirror for the build and /course/ HTTP check; do not write build output into the project’s ignored dist/.

### 3. Questions — round 2

No blocking questions.

### 4. Recommendations — round 2

1. Keep public copy readiness-neutral so it remains accurate if a future content edit makes the existing predicate fail.

### 5. Risks Found — round 2

1. Removing the host condition without retaining the entire predicate would expose incomplete pages. The negative fixture must fail through the production readiness logic and verify the rendered route stays locked.
2. The route regression uses the actual app/data scripts in a VM harness, not a deployed browser session; it proves app routing for the declared HTTPS origin, not empirical browser compatibility.

### 6. Inconsistencies with Code — round 2

The approved TS requires public Module 3 availability when content is ready; current course/data.js gates it on isLocalPreview, and current course/app.js home copy says Week 3 is still closed. The existing week and content routes already derive access from module.available; the correction can retain those route guards.

### 7. Knowledge Citations — round 2

No new citation beyond the already recorded citations in the original ONB §7 is required. For this bounded route/copy change, reapply the parent’s assessment-preservation and uncertainty principles; keep hosted availability controlled by the existing readiness predicate and do not claim deployment or browser verification.

### Material handover at this return — round 2

Producer/unit: Phase C Executor codex:thread:local:01a18b46-828d-70c2-96eb-b68ed8688d41; parent Coordinator codex:thread:local:01a18b1b-cf9b-7a50-a203-23392130eb0e. Source/epoch: owner-approved TS rev1 a9695d828ca903f8fc04b75695a49277a310e3b1, A9 gate answer/authority at 20a6efc2e3aebef47bf42f799dfa56a3, Coordinator transition be72, and direct dispatch c4a8. Inspected: complete phase status and current routing, dispatch and gate events, Phase C HL/TS rev1, predecessor REVIEW rev2, exact approved selector/budget, app/data/readiness and route logic, test harness, build/serve scripts and current README. Material: implement AC-11 inside the approved selector and one existing ASSURANCE file, with no publication. Uncertainty: hosted route behavior will be proven by deterministic actual-app tests and built HTTP output; deployment/browser behavior and empirical security, isolation, offline completeness, performance and hard limits remain unverified. Continuation: append this round to ONB and commit it alone; set TS_DRAFT→ONB with the phase-local handoff event; signal ONB_READY; then implement, prove, account and return RF to the same Coordinator. No blocker or decision is pending.

Current economics binding — round 2: producer/unit is the same Executor task above; project/task/phase/owner/role is OOPoman / OOP_20261029-184453_RT / phase-c / Roman / Executor. Observed at 2026-10-30T13:01:23+05:00 on the local Codex surface. The rollout session_meta.id, exact source path/version, range start and finite cutoff remain unavailable. Extraction was not attempted; no JSONL, measured zero or failed-capture receipt is claimed; last-good numeric file remains none. Binding code: native_source_binding_unavailable. Preserve this gap in EV/RF.
## Return 3 — owner-approved per-step laboratory terminals

Activation is the same Executor continuation, sent directly by the Phase C Coordinator. The governing order is owner-approved TS rev2 at commit dd4587ee6cad203959938318b0c9b22ed0ded623. The owner gate is journal/20261030-160120__gate_answer__ea8c.md at authority epoch 20a6efc2e3aebef47bf42f799dfa56a3b71980a3. The owner-directed RF-to-TS_DRAFT transition is journal/20261030-160257__transition__8fd4.md; direct dispatch is journal/20261030-160356__dispatch__executor-labfix-a8ff.md at commit 7687101e2330489bd2a7761cb9c678b8e619f928. The current repaired status is at Coordinator commit 28682535ca874d7d12e8553120c9d0c08c0f670c. Same Executor, same phase, same selected routes and same Phase B/C accounting authority continue. The existing public Module 3 Candidate 80fc58033ea5e4db04f931c337e6f77fd15ae275 remains the predecessor; the new Candidate must be the first tested implementation descendant for this TS rev2 scope.

### 1. Understanding — round 3

Implement AC-12–AC-14 within the same 12-page Phase C and fixed 16-path VALUE selector. Add six separate editable, runnable terminals to each of Labs 4–9, exactly 36, with each editor tied to its step, code source and expected observation. Convert the existing full-program examples on Labs 7–9 from read-only code blocks into runnable terminal editors while preserving their authored source strings. Replace the six lab analogy programs with meaningful executable examples whose classes, relationships and control flow match the corresponding lab; test each analogy, then change its input/behavior and confirm the output changes. Preserve Module 3 public-readiness behavior, terminal execution/oracle behavior, existing lesson and lab source snippets, scores, progress, checklist, peer-check and completion. No deployment or publication is authorized in this continuation.

### 2. Entry Points — round 3

- course/app.js already has a stepExercises seam that renders each numbered step terminal, but there are no stepExercises for Labs 4–9. Its lab.example block currently renders read-only code with a static-only note.
- course/data.js contains six ordered steps per lab, six lab-level exercises, three read-only full-program examples for Labs 7–9, and six analogies; Labs 7–9 analog source is currently print-only.
- course/terminal.js already renders independent editors keyed by lab id and exerciseId and can suppress lab-level checking/solution display for step exercises.
- course/terminal.test.js covers the existing 11-test suite and fixed Pyodide examples; add six-lab/36-step inventory, real output, analog behavior-change and assessment-boundary assertions there.
- course/README.md should describe the per-step terminals and runnable examples while retaining the already corrected hosted-availability, public-package and uncertainty copy.
- Use system-temp path %TEMP%/tfw/OOP_20261029-184453_RT/phase-c-public-module3-r3/ for raw test/build/accounting output and scratch scripts; remove the directory before role return. Do not write build output into project dist/.

### 3. Questions — round 3

No blocking questions.

### 4. Recommendations — round 3

1. Keep step-specific code short enough to run independently, with one visible expected observation per editor; keep the full lab criteria in the existing lab-level terminal.
2. Record a six-row analogy-to-lab design map in EV so independent review can judge structure and behavioral relevance, not only printed strings.

### 5. Risks Found — round 3

1. A code sample can remain visually read-only if the old lab.example block survives alongside a new terminal. Replace that presentation with the exact existing source inside a runnable editor.
2. A step inventory can count 36 markup sections without proving independent execution. Give each editor a unique step id, run every starter, and verify its expected observation.
3. An analogy may still be superficial if it only prints a label. Each source should model the relevant classes/relationships/control flow and have a test that changes its input and observes changed behavior.
4. Six editors per lab use the existing on-demand terminal integration; browser performance and isolation remain unverified and must stay unclaimed.

### 6. Inconsistencies with Code — round 3

The owner-approved TS rev2 requires 36 step terminals and runnable lab code samples; current data defines no stepExercises for Labs 4–9, and app.js therefore emits none. Labs 7–9 render full program code as a non-runnable code block. All six terminalContent analogies exist, but several are too thin and the three for Labs 7–9 only print fixed text. The existing app/terminal interfaces can support the additional editors without a new VALUE path.

### 7. Knowledge Citations — round 3

No new external or project knowledge citation is required beyond the citations already recorded in the initial ONB §7. Apply the frozen assessment contract, current-site lab boundaries and truthful-runner limits: code output is a learning aid, not a score or completion input; Labs 7–9 remain at their current-site scope.

### Material handover at this return — round 3

Producer/unit: same Phase C Executor codex:thread:local:01a18b46-828d-70c2-96eb-b68ed8688d41; parent Coordinator codex:thread:local:01a18b1b-cf9b-7a50-a203-23392130eb0e. Routing at current Coordinator commit 28682535ca874d7d12e8553120c9d0c08c0f670c: lifecycle TS_DRAFT, owner Roman, coordinator_route unchanged, activation owner-only, dialogue tfw-gates-only, reporting native-gates, coordination_authority ../HL-OOP_20261029-184453_RT.md @ 20a6efc2e3aebef47bf42f799dfa56a3b71980a3, selection_ref baseline. Native task mechanisms remain: provision native; exact addressed send native; wait/readback native; title write plus exact title readback native. Inspected: status at the repaired Coordinator commit; TS rev2 and owner gate/transition/dispatch; Phase C paths and readiness changes; existing app step renderer, terminal API, all six lab step descriptors, lab-level exercises, static examples and analogies; current terminal suite and accepted Candidate. The direct implementation files remain within approved VALUE/ASSURANCE paths. Material: one updated Candidate for all 12 pages, six runnable per-step inventories, runnable existing full examples, substantive analogies and objective code execution. Uncertainty: actual deployed browser behavior, security/isolation, offline completeness, performance and hard resource limits remain unverified. Economics binding at 2026-10-30T16:13:09+05:00: same declared project/task/phase/owner/role and local Codex surface; rollout session_meta.id, exact source path/version, finite range start/cutoff remain unavailable; extraction was not attempted; no JSONL, measured zero or failed-capture receipt is claimed; last-good numeric file none; native_source_binding_unavailable. Continuation: append this round to ONB and commit it alone; record TS_DRAFT→ONB with a phase-local handoff event; signal ONB_READY; implement all approved criteria, test, account and return RF to the existing Coordinator. No blocking decision is pending.
