# Briefing — «Подтвердить выбранный браузерный runtime»
> **Mindset:** Strategist. Планируем проверку, а не заранее принимаем Pyodide за работающий.
> **Test:** Можно ли воспроизводимо подтвердить обязательные границы Phase A на браузерном стенде?
> **Parent:** [HL-OOP_20261029-184453_RT](../../HL-OOP_20261029-184453_RT.md)
> **Goal:** Добавить исполняемые учебные терминалы к теориям и лабораторным всех трёх модулей OOPoman.
> **Producer unit:** `codex:thread:local:01a187f0-5141-7a03-ad0b-99812be36c8f`
> **Parent Coordinator:** `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`
> **Activation / dispatch source:** Coordinator continuation `/tfw-research OOP_20261029-184453_RT journal/20261029-205052__gate_answer__c4a7.md @ f85e9bf6442ab5713e886bc9068e3ef02823769a`; owner gate answer permits only iteration 3 validation.
> **Coordination authority:** `status.md` → `HL-OOP_20261029-184453_RT.md @ 055e11ab48f45807a9a72bdb1e9534a8d32fc167`
> **Originating proposer:** `none` — continuation under the owner-ratified scope in the gate answer; not a new architecture proposal.

## Research Plan

### Gather
- Establish the actual browser/OS/version and whether the approved offline localhost path can be exercised in this environment.
- Fix the exact Pyodide distribution/package assets, version, origin and integrity evidence under the approved pinned-origin rule.
- Select the in-scope runnable course snippets and deterministic lab fixtures from existing course sources; preserve the current Lab 7–9 scope.

### Extract
- Use a bounded temporary, non-production harness to load the pinned runtime in a dedicated Worker and run the selected snippets/fixtures.
- Observe whether runtime bootstrap can use only approved assets while submitted Python cannot make network requests.
- Record startup/run outcomes, supported package behavior, timeout termination/restart, output truncation and local bundled-asset launch behavior.

### Challenge
- Check ordinary syntax/runtime failures, accidental nontermination and excessive output against the intended beginner feedback.
- Verify offline operation uses local assets without remote fallback and the launcher serves files only; check that code and progress are not sent to a service.
- Compare each result to HL §4 Phase A and §6 DoF; if a required boundary or executable browser stand is unavailable, return the precise blocker and stop module integration.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|---|---|
| H2 | Для каждого практического критерия лабораторной можно определить наблюдаемый oracle либо явно оставить его ручным; автоматическая обратная связь применяется только к oracle-backed критериям. | Fixtures не проверялись; карта кандидатов есть |
| H3 | Полные решения и аналоги можно добавить, сохраняя все существующие строки кода и не расширяя суженный объём ЛР 7–9. | Scope-конфликты найдены; сохранность строк не проверялась |
| H5 | Pyodide в отдельном Worker выполняет требуемые snippets при выбранных ограничениях CSP, pinned origins, сети и целевой browser/OS matrix. | Owner-selected candidate; runtime/network proof отсутствует |

## Scope Intent
- **In scope:** Эмпирическая проверка выбранной Phase A модели на фактически доступном браузерном стенде: Pyodide Worker, pinned runtime/package assets, запрет сети для student code, offline localhost static-only launcher, snippets/fixtures, timeout/output bounds и версия матрицы.
- **Out of scope:** Production runtime или интеграция модулей; изменение курса, NorthStar, HL, оценки, баллов, checklist или completion; Docker fallback; обещание hard memory cap или абсолютной защиты; намеренная adversarial-эксплуатация.

## Guiding Questions
1. Можно ли на названном браузере загрузить закреплённые assets и запустить выбранные примеры в Worker, включая offline localhost-копию без remote fallback?
2. Подтверждается ли отсутствие сетевых запросов из student code при загрузке только одобренных runtime/package origins?
3. Дают ли fixtures, обычные ошибки, timeout/restart и output cap корректную и честную учебную обратную связь без влияния на оценивание?

## User Direction
- Owner выбрал Pyodide Worker вместо Docker только при успешной Phase A validation.
- Разрешены только закреплённые runtime/package origins; student code не получает сеть.
- Для offline-копии разрешён localhost static-only launcher с локальными assets, без удалённого fallback, backend, code upload и хранения данных.
- Coordinator gate-answer ограничивает эту работу iteration 3 validation; production runtime changes запрещены.
- Исследовательский режим сохранён: `focused`.

## Economics binding checkpoint
- **Observed at:** `2026-10-29T20:56:22+05:00` (`Asia/Qyzylorda`).
- **Known:** task `OOP_20261029-184453_RT`; owner `roman`; role Researcher; producer unit `codex:thread:local:01a187f0-5141-7a03-ad0b-99812be36c8f`; native surface is this local Codex task.
- **Unavailable before extraction:** exact native usage source ID/version, numeric source path and bound range/cutoff are not exposed by the current task tools or supplied in task files. The unit address is not treated as a usage-source ID.
- **Disposition:** extraction not attempted; no numeric JSONL, measured zero, failed extraction or last-good receipt is claimed. This is an attributable pre-extraction binding gap; any later available own-source capture remains owed.

---
Stage complete: YES
