# Briefing — "What should we investigate?"
> **Mindset:** Strategist. You're planning an investigation, not doing it. Frame what matters. Resist solving.
> **Test:** "Can I explain WHY we're investigating this and what would change our approach?"
> Parent: [HL-OOP_20261029-184453_RT](../../HL-OOP_20261029-184453_RT.md)
> Goal: Добавить исполняемые учебные терминалы к теориям и лабораторным всех трёх модулей OOPoman.
> Producer unit: `codex:thread:local:01a187f0-5141-7a03-ad0b-99812be36c8f`
> Parent Coordinator: `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`
> Activation / dispatch source: owner-direct Researcher activation, continued in this same unit by Coordinator message `/tfw-research OOP_20261029-184453_RT research/iterations.yaml @ f42220bbd28d8522d6d9ac319f446f6c62d1b723`; blob hash for the cited path matches the current file.
> Coordination authority: `HL-OOP_20261029-184453_RT.md @ e408df4237a1aaad5bd016175f2462e3dbb8262d`
> Originating proposer: none

## Research Plan
- **Gather:** Compare primary documentation for the Docker helper/container and pinned Pyodide Worker; inspect the actual course snippets and nine lab PDFs; record what can and cannot be exercised on this available host and its browser/OS.
- **Extract:** Map the exact terminal-relevant practical criteria to executable assertions with deterministic fixtures, or explicitly mark them human-reviewed; compare setup, trust boundaries, egress, resource bounds, compatibility and tamperability without treating design intent as proof.
- **Challenge:** Use bounded functional probes for timeout, output and network behavior where the environment permits; omit deliberate attack testing for the agreed beginner threat model; distinguish observations from documentary claims and enumerate untested target devices.
- **Synthesize:** State whether evidence changes the candidate ranking or only narrows the next experiment; retain Docker as baseline unless the authorized owner resolves frozen HL changes; leave the local static launcher unapproved and runtime unimplemented.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|-----------|-----------|
| H1 | Локальный помощник может безопасно и достаточно просто связывать статическую страницу с Docker на согласованной матрице браузеров; ложность означает переход к локальному launcher либо ограничение поддержки. | open |
| H2 | Для каждого практического критерия лабораторной можно определить наблюдаемый oracle либо явно оставить его ручным; только oracle-backed критерии получают автоматическую учебную обратную связь, устная защита остаётся студенту. | iteration 2: карта критериев и проверка oracle |
| H3 | Полные решения и аналоги можно добавить, сохраняя все существующие строки кода и не расширяя суженный объём ЛР 7–9; ложность означает вернуть конкретные спорные критерии Roman. | open |
| H4 | Одноразовые контейнеры без сети/mounts с ресурсными лимитами достаточно безопасны и отзывчивы для учебных задач на поддерживаемых машинах; ложность означает не запускать код в клиентском Docker до смены модели. | open |
| H5 | Pyodide в отдельном Worker может запускать требуемые snippets при подходящем worker-specific CSP, ограниченном протоколе и целевой браузерной матрице без недопустимого host/network доступа; ложность исключает замену Docker этим путём. | iteration 2: ограниченный прототип и adversarial checks; доказательств пока нет |

## Scope Intent
- **In scope:** Bounded evidence collection on this host; code/source inspection; exact snippet and lab-criterion inventory; comparative security and compatibility probes that can run without broadening authority; owner-facing evidence gaps and next decisions. Distinguish public-site behavior, local downloadable-copy behavior and local runner behavior.
- **Out of scope:** Selecting or deploying a runtime; changing HL §1/§3–§7 or its Docker baseline; assuming permission for a localhost launcher; claiming zero egress, hard memory ceilings, broad browser compatibility or safe isolation without direct proof; changing course code, PDFs, grading, points or completion.

## Guiding Questions
1. На доступном стенде можно ли безопасно провести ограниченные проверки обоих вариантов, и что именно останется непроверенным без целевой матрицы машин студентов?
2. Какие критерии практических заданий допускают воспроизводимый oracle на основании PDF и фактических snippets, а какие должны остаться с явной ручной проверкой?

## User Direction
Iteration 1 recorded Roman's direction that a non-Docker approach is acceptable if it can provide safe, correct terminal behavior, and that the site may be adapted to its requirements. Roman clarified at the Gather checkpoint that students are beginners rather than malicious users; research should prioritize simple guardrails against accidental infinite loops and excessive output, without claiming protection against deliberate attacks. At the Challenge checkpoint Roman directed a Pyodide-only network exception for everything needed for correct operation while keeping the site local and without a database. This steers amendment recommendations but does not itself update the frozen contract. Iteration 2's Coordinator-prepared control record limits work to a bounded comparison/prototype and network/resource checks, while expressly prohibiting runtime implementation and treating the local static launcher as unapproved.

## Prior Iteration Handover
Iteration 1 found Pyodide in a disposable Worker plausible but unproven. Its unresolved threads carried forward are worker CSP/network-egress proof, timeout and resource/output behavior, actual course-snippet compatibility, target browser/OS coverage, local-copy serving authority, and deterministic versus human lab criteria. Docker remained the approved baseline; no target-device experiment or runtime implementation had occurred. See [iteration 1 RES](../iter1/RES.md), including its sourced decisions, open questions and two amendment proposals. This iteration will report observations only for the actual available host and will not generalize them to students' devices.

## Economics Binding Status
At continuation, this Researcher unit has no native usage source locator or selectable numeric range available in the task tools/context. This is an attributable pre-extraction binding gap; no extraction was attempted and no measurement is claimed. Preserve this gap for final RES reconciliation; do not invent a source, range or JSONL record.

---
Stage complete: YES


