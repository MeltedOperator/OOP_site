# Briefing — «Что исследуем?»
> **Mindset:** Стратег. Планируем исследование, не решаем вопрос заранее.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать понятные и согласованные материалы недели 3, где студенты видят практическую пользу ООП в связном примере.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: owner-direct activation — точная команда `/tfw-research OOP_20261027-201313_WEEK3` в отдельном Researcher task; task journal подтверждает ручной запуск владельцем.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Iteration: 1, pending entry from `iterations.yaml`; mode: `focused` (выбран владельцем 2026-10-28).

## Research Plan

### Gather
- Проверить официальную документацию нескольких подходящих API на реальные формы интеграции: контракт запрос/ответ, границы внешней системы и ошибки.
- Найти официально документированный публичный sandbox или read-only сценарий, пригодный для демонстрации без реальных операций и секретов.
- Установить, какие из Adapter, Facade и Decorator помогают объяснить эти границы; не считать названия паттернов доказательством пользы.
- Проверить, что первичные источники действительно обосновывают учебные примеры ошибок, повторов и кэша, и зафиксировать ограничения.

### Extract
- Сопоставить кандидатов API/sandbox по реалистичности, доступности официальных источников, безопасности учебной модели и простоте локальной имитации.
- Связать подтверждённые API-границы с конкретными ответственностями объектов и возможной ролью Adapter, Facade и Decorator.
- Разделить документированные свойства API, локально моделируемые свойства и вопросы, которые остаются за пределами исследования.
- Зафиксировать, какую учебную пользу дают ошибки, ограниченные повторы или кэширование и в каком упрощённом fake-data примере их можно показать.

### Challenge
- Проверить выбранный вариант на официальных ограничениях, неудобных предпосылках и данных, которые нельзя безопасно моделировать локально.
- Уточнить, не создаёт ли пример ложное впечатление, что повтор платежа или кэш автоматически безопасны либо корректны.
- Сверить выводы с H3, границами замороженного HL и исходным пожеланием не превращать курс в руководство по платежам.
- Сформулировать ограниченную рекомендацию для лабораторной 7 и явно перечислить непроверенные свойства.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|---|---|
| H3 | Официальный API/sandbox источник позволит показать пользу объектного посредника и границы интеграции без реальных платежей или секретов. | открыта |

## Scope Intent
- **In scope:** официальные первичные источники о реальном API-контракте; пригодный публичный sandbox/read-only контекст; учебная роль Adapter/Facade/Decorator; понятная локальная имитация ошибок, retry и cache на фиктивных данных; ограничения и пробелы документации.
- **Out of scope:** реальные платежи, платёжные реквизиты или секреты; проведение денежных операций; production security, compliance или рекомендации по реальным повторам платежей; сетевые обращения из курса; исполнение кода или интеграция курса с API.

## Guiding Questions
1. Какой официальный API-контекст сочетает достоверную интеграционную границу с безопасным sandbox/read-only примером для локального учебного материала?
2. Какие обязанности объектов здесь лучше объяснить через Adapter, Facade и/или Decorator, и какую часть можно оставить простой?
3. Какие выводы об ошибках, ограниченных повторах и кэшировании можно подтвердить официальными источниками, а какие останутся только учебной моделью?

## User Direction
- Режим: `focused`.
- Границы: показывать реальную пользу ООП и связь с API, но использовать в курсе только локальную имитацию и фиктивные данные; не давать советов по production-платежам.

### Замер экономики этой задачи — binding gap
- Producer: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`; task `OOP_20261027-201313_WEEK3`; owner `roman`; role `researcher`; provider surface: Codex local task; observed `2026-10-28` Asia/Qyzylorda.
- Outcome: `binding_unavailable`; extraction attempted: `false`; last-good returned file/hash: none.
- Known facts: current Researcher unit address is verified from the active Codex task; economics contract requires this unit's own Codex rollout source.
- Unavailable facts: exact rollout `session_meta.id`/source ID, source locator/version, range start and exact offset timestamp. Current task tools do not expose the rollout locator or metadata; the thread ID is not substituted for the source ID.
- No usage JSONL or measured zero is asserted. This is an attributable pre-extraction binding gap under `.tfw/economics/README.md`.

---
Stage complete: YES
