# RES — OOP_20261030-091045_EXAM: Exam Content Coverage

> **Date**: 2026-10-30
> **Author**: Researcher
> **Status**: 🔬 RES — In progress
> **Parent HL**: [HL-OOP_20261030-091045_EXAM](../../HL-OOP_20261030-091045_EXAM.md)
> **Mode**: Pipeline — focused
> **Producer unit**: `codex:thread:local:01a18b22-efd8-7bd3-97e2-6e1fd8b9c7f1`
> **Parent Coordinator**: `codex:thread:local:01a18b01-85ef-7772-84f6-535c59379865`
> **Activation / dispatch source**: Owner-direct `/tfw-research OOP_20261030-091045_EXAM`; owner continuation and updated task direction in this conversation; no delegation claimed.
> **Coordination authority**: `HL-OOP_20261030-091045_EXAM.md @ d15f99bd4906e3d1567649bac7ffeae0ce57b477`
> **Originating proposer**: `{principal: roman, unit: owner:roman}`

---

## Research Context

This single authorized iteration checks whether original lecture and lab PDFs contain enough explicit, assessable OOP content to author the fixed 20-question allocation (8/7/5) and three practical tasks (4/6/10). It inspects only the 9 original lecture and 9 original lab PDFs; site pages, HTML, `course/data.js`, `dist/`, RT readiness and shared-file routing were excluded from content evidence and remain outside this H1. All PDF pages were text-extracted and indexed; representative lecture and lab pages were visually spot-checked. No exam implementation or certificate was created.

Exact source inventory:

- `OOP-course/01_Лекции/Лекция_01_От_процедурного_подхода_к_объектам_Инкапсуляция.pdf`
- `OOP-course/01_Лекции/Лекция_02_Отношения_между_объектами_Композиция_против_наследования.pdf`
- `OOP-course/01_Лекции/Лекция_03_Полиморфизм_Абстрактные_классы_и_протоколы.pdf`
- `OOP-course/01_Лекции/Лекция_04_SOLID_Часть_1_SRP_и_OCP_Cohesion_Coupling.pdf`
- `OOP-course/01_Лекции/Лекция_05_SOLID_Часть_2_LSP_ISP_DIP_Dependency_Injection.pdf`
- `OOP-course/01_Лекции/Лекция_06_Порождающие_паттерны_GoF_Factory_Method_Builder.pdf`
- `OOP-course/01_Лекции/Лекция_07_Структурные_паттерны_GoF_Adapter_Decorator_Facade.pdf`
- `OOP-course/01_Лекции/Лекция_08_Поведенческие_паттерны_GoF_Strategy_Observer_Chain.pdf`
- `OOP-course/01_Лекции/Лекция_09_Чистая_архитектура_Clean_Architecture_Рефакторинг.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_01_Моделирование_домена_Avtobys_Защита_инвариантов.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_02_Композитный_движок_тарификации_и_платежей.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_03_Полиморфный_процессор_событий_Event_Dispatcher.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_04_Рефакторинг_спагетти_кода_SRP_и_OCP.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_05_Практикум_Midterm_DI_Container_LSP_ISP.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_06_Фабричный_метод_и_Строитель_финансовых_отчетов.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_07_Адаптер_банка_Декораторы_кэша_и_Терминальный_фасад.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_08_Цепочка_обязанностей_и_Наблюдатели_мониторинга.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_09_Clean_Architecture_и_симулятор_смены_автобуса.pdf`

## Briefing

See [1_briefing.md](1_briefing.md). The earlier draft in this same `iter1` concerned a different H1 and is superseded; its non-PDF findings are not used here. No second iteration was opened.

## Decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | H1 is supported for source sufficiency, with authoring constraints. | The original PDFs contain at least 20 distinct taught concept slots distributed across all three modules and practical outcomes that can be narrowed to the requested point totals. They do not provide a complete exam blueprint, timed validation, or point-by-point rubrics for every candidate. |
| D2 | Use the proposed 8/7/5 map as a candidate blueprint only; retain named omissions as deliberate selection choices. | Each slot is traced to a lecture page/section; no source says all named concepts must be tested. |
| D3 | Prefer Lab 5 block 3 (6 points) for the medium candidate and Lab 8 blocks 1+3 (6+4=10) for the advanced candidate. | Their published block totals match the exam allocation; narrow the 135-minute labs and supply or scope dependencies. |
| D4 | Treat the Lab 1 4-point adaptation as a newly authored rubric, not a verbatim lab rubric. | Lab 1 block 1 is worth 5 points; its Route invariants are explicit, but the PDF does not allocate a 4-point subset. |
| D5 | Do not use Lab 2 arithmetic for a keyed numerical question until its formula is clarified. | Lab 2 p.3 formula and p.2 discount-policy/example semantics do not unambiguously specify whether `Discount` is an amount to subtract or a multiplicative factor. |
| D6 | Record the owner's no-certificate direction as amendment proposals only; do not alter frozen HL. | The direct instruction conflicts with current frozen claims in §§1, 3, 5 and 7.1; the Researcher has no authority to edit them. |

## Open Questions

| # | Question | Status | Answer |
|---|---|---|---|
| 1 | Does the PDF set have enough taught content to author the fixed distribution? | Answered for H1 | Yes, for a selective, source-traceable exam blueprint. |
| 2 | Are the proposed practicals already ready to use in a 60-minute exam? | Open for exam author | No; lab tasks state 135 minutes and need narrowing, scaffolds, and timed validation. |
| 3 | Are all practical points already mapped to atomic criteria in the PDFs? | Open for exam author | No. Blocks and expected outcomes exist, but per-point decomposition is incomplete or absent. |
| 4 | Is the frozen certificate scope reconciled with the owner's direction? | Open for Coordinator | No. Proposals below route the discrepancy; no verdict is supplied by the Researcher. |

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status | RES Status | Evidence |
|---|---|---|---|---|
| H1 | Using only original lecture and lab PDFs, determine whether there is enough clearly taught and assessable OOP content for 20 questions split 8/7/5 and three practical tasks split 4/6/10; map candidate concepts/exercises with exact PDF references and report gaps/ambiguities. | open | 🟢 supported, with constraints | 18 PDFs; candidate question map in Extract E1; practical map and rubrics in Extract E2; limitations and ambiguity in Extract E3 and Challenge C1–C4. |

## HL Update Recommendations

### Refinements — free sections, coordinator applies

| # | § | What to update | Source |
|---|---|---|---|
| R1 | §8 | Keep RT readiness and shared-file route as separate unresolved dependencies; this content-only pass did not assess them. | Current owner H1 scope in `1_briefing.md`; no claims about either dependency were tested. |
| R2 | §10 | Record H1 as supported for material availability, with explicit caveats: no exam-length evidence, selective topic choice, rubric decomposition, and Lab 2 formula ambiguity. | `2_gather.md` G1–G3; `3_extract.md` E1–E3; `4_challenge.md` C1–C4. |
| R3 | §2 | If current-state exam preparation is summarized, note that source selection is possible from the original PDFs while 60-minute fit and atomic practical scoring remain unvalidated. | `3_extract.md` E2–E3; `4_challenge.md` C2–C4. |

### Amendment Proposals — frozen sections, resolved-ruler verdict required

| # | § | Type | Proposed change | Evidence | Cost | Alternatives considered |
|---|---|---|---|---|---|---|
| A1 | §1 | `RESTRICT` | Remove the promise that passing produces a local course-completion certificate; keep the vision to an exam and understandable result. | Owner Roman directly instructed: proceed without certificates because they have not been made; certificate work belongs in a separate future task (current conversation). Frozen §1 promises a local certificate. | Revise frozen vision through the amendment route; certificate is outside this exam's acceptance and messaging. | Keep the approved certificate promise and block this exam until a certificate exists; rejected for this scope because the owner explicitly deferred it. |
| A2 | §3 | `RESTRICT` | Remove the local-certificate outcome from target state; retain the exam, score and practical feedback outcomes. | Same direct owner instruction; frozen §3 and §3.2 currently promise a local certificate on passing. | Reconcile the target state with the separate future certificate task; avoid implementing an absent deliverable here. | Implement certificate work in this task or retain it as a gate; both contradict the explicit deferral. |
| A3 | §5 | `RESTRICT` | Remove certificate creation/award from exam DoD and completion language; do not count deferred certificate work against this exam task. | Same direct owner instruction; frozen §5 includes certificate-related completion claims. | Change the frozen acceptance contract through formal ruling and update task planning accordingly. | Leave certificate as mandatory DoD and fail to close the exam without it; inconsistent with the owner direction. |
| A4 | §7.1 | `RESTRICT` | Remove the certificate-specific clause from the honest-result principle; preserve truthful score, completeness, identity and authenticity limits. | Same direct owner instruction; frozen §7.1 requires distinguishing exam score, task completeness and a local certificate. | Narrow one frozen principle while preserving its remaining honesty constraints. | Keep the certificate distinction even though this task will not create or award certificates; that would leave an inapplicable output promise in the contract. |

## Fact Candidates

| # | Category | Candidate | Source | Confidence |
|---|---|---|---|---|

No project fact candidates. The no-certificate direction is a task-scope instruction routed as amendment proposals, not independently verified domain knowledge.

## Strategic Insights (Research)

| # | Category | Insight | Source | Confidence |
|---|---|---|---|---|
| SS1 | scope | The owner wants the exam to proceed without certificate production; treating certificate work as a separate future task keeps the current assessment deliverable bounded. | User, direct continuation instruction in this research conversation | ★★★ |

## Findings Map

```text
18 original PDFs
├── Lectures: explicit concepts across M1/M2/M3
│   └── supports a traceable 8 / 7 / 5 candidate item map
└── Labs: explicit behaviors + block-level points
    ├── Lab 1 block 1: 5 → derive 4-point easy rubric
    ├── Lab 5 block 3: 6 → medium candidate
    └── Lab 8 blocks 1+3: 6+4 → advanced candidate
        └── all practicals still need 60-minute narrowing and atomic scoring

Risk gates: Lab 2 formula ambiguity; no exam-time evidence; certificate claims in frozen HL conflict with owner direction.
```

## Iteration Status

- **Iteration:** 1 of 1 (min) / 1 (max)
- **Hypotheses tested:** H1 (supported with constraints)
- **Hypotheses deferred:** None
- **Gaps discovered:** Exam time feasibility; point-level practical oracle for every criterion; Lab 2 formula meaning; certificate scope reconciliation; separate RT/shared-file dependencies remain outside H1.
- **Superseded decisions:** Earlier `iter1` stage drafts tested RT/site readiness; current owner-authorized PDF-only H1 supersedes them in place. No prior RES existed, and no second iteration was created.

### Open Threads (for next iteration)

No open threads in this task's single authorized iteration. The Coordinator can take the listed authoring and amendment actions through `/tfw-plan`; RT readiness/shared-file route and certificate implementation are separate work items, not deferred H1 iterations.

### Recommendation

- [x] **SUFFICIENT** — proceed to `/tfw-plan` to classify these recommendations and write TS
- [ ] **MORE NEEDED** —
- [ ] **BLOCKED** —

## Conclusion

The PDF-only research supports that there is enough explicitly taught and assessable OOP content to author a selective 20-question exam across the 8/7/5 split and derive three practicals at 4/6/10 points. It provides a page-traceable candidate map and identifies two lab rubric blocks that match 6 and 10 points directly. It does not prove the tasks fit a 60-minute sitting or supply all atomic scoring rules; Lab 1's 4-point task needs an authored decomposition, and Lab 2's discount formula should not be used for arithmetic until clarified. The owner’s no-certificate direction conflicts with frozen HL promises and must be reconciled by the Coordinator under the amendment process. This conclusion does not assess RT readiness or the shared-file route.

### Material handover at this return

- Producer/unit: Researcher `codex:thread:local:01a18b22-efd8-7bd3-97e2-6e1fd8b9c7f1`; parent Coordinator `codex:thread:local:01a18b01-85ef-7772-84f6-535c59379865`.
- Source/epoch: original PDFs in `OOP-course/01_Лекции/` and `OOP-course/02_Лабораторные/`; 9 lecture + 9 lab PDFs; observed 2026-10-30 Asia/Qyzylorda. Research working material was kept under `%TEMP%\tfw\OOP_20261030-091045_EXAM\` only.
- Inspected scope: all pages of those 18 original PDFs; page text extracted/indexed; representative pages visually inspected. Excluded all site pages, HTML, `course/data.js`, `dist/`, RT artifacts, and implementation evidence from H1.
- Material returned: candidate 8/7/5 question map; practical map at 4/6/10; exact page and block references; formula/rubric/time-scope gaps; four frozen-HL amendment proposals sourced to the owner's direct instruction.
- Uncertainty: exam time fit and final point oracles need author decisions; Lab 2 formula needs clarification; RT/shared-file dependencies were intentionally unexamined; certificate claims await valid amendment verdict.
- Continuation: Coordinator reviews RES via `/tfw-plan`; Researcher makes no HL, TS or code changes. No certificate work or second research iteration is included.
- Binding limitation: native task surface did not expose exact rollout `session_meta.id` or source range; this is recorded as a pre-extraction source-binding gap, not a numeric measure or zero.

---

*RES — OOP_20261030-091045_EXAM: Exam Content Coverage | 2026-10-30*
