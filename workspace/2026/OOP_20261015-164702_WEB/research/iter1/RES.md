# RES — OOP_20261015-164702_WEB: Каркас сайта OOPoman

> **Date**: 2026-10-16
> **Author**: Researcher
> **Status**: 🔬 RES — In progress
> **Parent HL**: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md) _(pipeline only)_
> **Mode**: Pipeline
> **Producer unit**: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> **Parent Coordinator**: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> **Activation / dispatch source**: owner-direct `/tfw-research OOP_20261015-164702_WEB`; owner-started route corroborated by `journal/20261016-083439__dispatch__7d3c.md`
> **Coordination authority**: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> **Originating proposer**: `{principal: roman, unit: owner:roman}`

---

## Research Context

Исследование сравнило локальную страницу `file://` и unpacked Chrome extension для каркаса OOPoman: запуск без своего сервера и аккаунта, работа офлайн, PDF из `OOP-course/`, а также хранение и выборочный сброс прогресса в профиле Chrome. Цель — отделить поддержанные источниками свойства платформы от поведения, которое можно установить только на прототипе; стек и победитель не выбирались.

## Briefing

Briefing: [1_briefing.md](1_briefing.md). Исходные H1/H2 и границы scope сохранены; выбран `focused` режим, один проход на этап. Предэкстракционный binding gap по экономике описан там с producer и известными/недоступными полями; измерение не извлекалось и нулевое использование не заявляется.

## Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Сохранить шесть кандидатов C1–C6 для дальнейшего сравнения; ни один не выбран. | Challenge не обнаружил документального основания исключить кандидаты, но для file-origin особенно не хватает сведений о поведении Chrome. См. [3_extract.md](3_extract.md) и [4_challenge.md](4_challenge.md). |
| D2 | Рассматривать `chrome.storage.local` как наиболее документированный storage-механизм для extension route, а не как доказательство готового H2. | Chrome документирует локальную область и адресное удаление; интерфейс подтверждения, интеграция, перезапуск и офлайн-поведение OOPoman не испытаны. |
| D3 | Следующий содержательный шаг исследования должен проверять прототип в целевом Windows Chrome и профиле. | Только такое испытание может проверить offline cold-start/restart, сохранение и чтение progress, Cancel/Confirm reset и открытие PDF. Внешние источники не исполняли OOPoman. |
| D4 | Не менять утверждённые ограничения H1/H2. | Документы уточняют осуществимость и неопределённости, не дают основания менять замороженные требования. |

## Open Questions

| # | Question | Status | Answer |
|---|----------|--------|--------|
| Q1 | Может ли выбранный локальный пакет запуститься холодно и повторно без сети в целевом Chrome? | Open — prototype required | Оба режима могут открывать локальный материал без собственного HTTP-сервера; для offline нужны локальные все критические ресурсы. Конкретный пакет и его сетевые обращения не проверены. |
| Q2 | Какой режим сохраняет progress между офлайн-запусками и сбрасывает только данные OOPoman? | Open — prototype required | `chrome.storage.local` документирован для extension context; file-origin storage и продуктовый reset требуют испытания. |
| Q3 | Можно ли надёжно открыть PDF из `OOP-course/` в extension UI? | Open — prototype required | File URL доступ требует ручного разрешения; чтение/открытие этих PDF в конечном UI источниками не доказано. |
| Q4 | Совпадают ли гарантии Chrome о Web Storage расширений при очистке browsing data? | Open — documentation conflict | Gather зафиксировал расхождение Chrome API reference и Storage and cookies. Это не отменяет проверку обычного offline restart и не разрешает обещать поведение после очистки данных профиля. |

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status | RES Status | Evidence |
|---|---|---|---|---|
| H1 | Минимальный локальный каркас может удовлетворить требованию офлайн-работы в Chrome без собственного сервера или HTTP-службы запуска. | open | 🟡 testing | Chrome документирует локальный запуск unpacked extension и локальные packaged resources; HTML `file://` открывает локальный документ без собственного сервера. Полная локальность обязательных ресурсов и поведение OOPoman в cold-start/restart offline не проверены. См. [2_gather.md](2_gather.md), [4_challenge.md](4_challenge.md). |
| H2 | Выбранный локальный источник страницы позволяет Chrome сохранять прогресс в профиле между офлайн-запусками и очищать только данные OOPoman без сервера и учётной записи. | open | 🟡 testing | `chrome.storage.local` документирован как локальная область extension с `remove()`; это наиболее определённый механизм среди кандидатов. File-origin localStorage/IndexedDB остаются неопределёнными; ни один вариант не прошёл испытание persistence или подтверждённого selective reset в UI. См. [3_extract.md](3_extract.md), [4_challenge.md](4_challenge.md). |

## HL Update Recommendations

> Классификация для Coordinator; Researcher не меняет и не утверждает HL.

### Refinements — free sections, coordinator applies

| # | § | What to update | Source |
|---|---|---|---|
| R1 | §7.2 | Добавить проверенные первичные ссылки Chrome/WHATWG о загрузке unpacked extension, `chrome.storage`, file URL permissions, extension CSP и file-origin storage; отметить, что это документированные механизмы, не испытание OOPoman. | Gather и Challenge, источники ниже |
| R2 | §9 | Уточнить риск: file-origin storage, фактический offline cold-start/restart, UI reset и чтение PDF из отдельной папки остаются непроверенными; ручной file URL grant добавляет setup-зависимость. | Gather G1/G3; Challenge |
| R3 | §10 | Зафиксировать шесть конфигураций C1–C6 как область прототипной проверки; выделить локальность обязательных ресурсов и проверку сохранения/селективного сброса в целевом профиле. | Extract configuration space; Challenge H1/H2 |

### Amendment Proposals — frozen sections, resolved-ruler verdict required

**No amendment proposals.** Исследование не выявило необходимости менять замороженные продуктовые требования; сравнение конфигураций оставлено без выбора.

## Fact Candidates

**No fact candidates.** В исследованных материалах новые наблюдения получены из доступных проектных файлов и внешних источников; отдельного human-only факта, не отражённого в действующих материалах задачи, исследование не добавило.

## Strategic Insights (Research)

**No strategic insights.** Владелец выбрал focused режим исследования; нового human-sourced предметного контекста или стратегической коррекции в briefing dialogue не поступило.

## Findings Map

```text
Локальный запуск без собственного HTTP-сервера
├── file:// → локальный HTML открывается
│   └── H1 зависит от полной локальности критических ресурсов
└── unpacked extension → локальная папка + Developer mode
    └── H1 зависит от packaged resources и требует prototype offline test

Профильное сохранение и сброс (H2)
├── file:// → localStorage / IndexedDB
│   └── origin file: определяется реализацией → persistence не доказано
└── extension origin
    ├── chrome.storage.local → документированный local API и remove()
    │   └── UI, restart и selective reset всё ещё требуют проверки
    └── Web Storage / IndexedDB → документальное расхождение и проверки

PDF вне пакета extension
└── file URL access → ручной permission grant → фактический PDF UX не доказан
```

## Iteration Status

- **Iteration:** 1 of 2 (min) / 3 (max)
- **Hypotheses tested:** H1 (🟡 testing; documentary feasibility, no target-app offline test), H2 (🟡 testing; mechanism comparison, no persistence/reset prototype test)
- **Hypotheses deferred:** None
- **Gaps discovered:** Chrome-specific file-origin storage behavior; offline cold-start/restart for the actual package; in-app Cancel/Confirm selective reset; opening PDFs from `OOP-course/`; conflict in Chrome documentation about extension Web Storage after browsing-data clearing; exact economics rollout source binding unavailable before extraction (see Briefing).
- **Superseded decisions:** None

### Open Threads (for next iteration)

| # | Thread | Why it matters | Suggested focus |
|---|---|---|---|
| 1 | Validate the smallest representative local prototype in target Windows Chrome and the intended profile. | Establishes whether H1 and H2 hold for actual packaged resources and real browser storage behavior. | Test cold start and restart offline; save/read progress; cancel and confirm removal of only OOPoman keys; open local PDFs; record Chrome version, profile, paths and outcomes. |
| 2 | Resolve whether C1/C2 file-origin storage merits prototype comparison against C3/C4 `chrome.storage.local`. | The standards do not establish Chrome behavior for `file:` in this specific layout. | Keep separate observations for localStorage and IndexedDB; test path separation and persistence without inferring from extension-origin behavior. |

### Recommendation
- [ ] **SUFFICIENT** — proceed to `/tfw-plan` to classify these recommendations and write TS
- [x] **MORE NEEDED** — complete the required second iteration with a bounded prototype-focused investigation; preserve the six candidates until evidence supports narrowing.
- [ ] **BLOCKED** — specify blocker

> Coordinator decides whether to continue or proceed. Researcher recommends but does NOT decide.

## Conclusion

Исследование установило, что прямой `file://` и unpacked extension оба являются документально правдоподобными путями запуска без собственного HTTP-сервера, но условие offline требует локальности всех обязательных ресурсов. Для extension route `chrome.storage.local` имеет наиболее чётко описанную локальную область и key-level removal; это не доказывает сохранение или UX требуемого reset в OOPoman. Все шесть конфигураций остаются кандидатами, а поведение `file:` и доступ к PDF из отдельной папки требуют целевого прототипа. Исследование не выбирало реализацию и не запускало приложение; его вклад — выявленные несовместимые storage contexts, настройка file URL access, конфликт документации и конкретный план эмпирической проверки. Ограничение вывода: внешний материал подтверждает API и ограничения платформы, но не поведение конкретного пакета.

### Material handover at this return

- **Producer/unit:** Researcher `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`; parent Coordinator `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`.
- **Source/epoch:** owner-direct `/tfw-research OOP_20261015-164702_WEB`; task-local authority `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`; observed 2026-10-16. External Chrome for Developers and WHATWG documents accessed 2026-10-16; versions are current web documentation as accessed that date, except the cited Chromium `122.0.6261.117` source, which is explicitly historical context only.
- **Inspected scope:** approved HL §10 H1/H2; status, task journal dispatch, iterations control, project config and knowledge handover route; four iteration stage artifacts; primary Chrome/WHATWG references listed in Gather/Extract/Challenge. No application code or prototype behavior was inspected.
- **Material:** six surviving configurations; `chrome.storage.local` is the clearest documented extension storage option; file-origin persistence, real offline operation, selective reset UI, and external PDF access remain empirical gaps. **Justified none:** no implementation-level facts or prototype observations were available to hand over.
- **Uncertainty:** Chrome docs conflict on extension Web Storage during browsing-data clearing; no source establishes behavior of OOPoman itself. Economics source binding remains unavailable as recorded in Briefing: rollout `session_meta.id`, exact source locator/version/range start were not exposed; no usage JSONL or measured zero is asserted.
- **Continuation:** iteration 1 RES is returned under Coordinator authority. Research recommends a prototype-focused iteration 2 to address the listed gaps. The Coordinator determines whether to continue or route to `/tfw-plan`; no HL or TS was edited.

---

*RES — OOP_20261015-164702_WEB: Каркас сайта OOPoman | 2026-10-16*
