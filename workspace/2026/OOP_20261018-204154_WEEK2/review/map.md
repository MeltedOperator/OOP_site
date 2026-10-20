# Map — "What must be true?"
> **Mindset:** Experienced newcomer. Understand the accepted result before judging it.
> **Test:** "Can I name the material claims, harms, boundaries, evidence identities and limits?"
> RF: [RF](../RF__OOP_20261018-204154_WEEK2.md)
> TS: [TS](../TS__OOP_20261018-204154_WEEK2.md)

## Understanding

Кандидат `bb7cd7fa2094c679048e594d6bfb8c7841eab350` добавляет лекции и лабораторные 4–6, динамические баллы и доступность модуля 2, сохраняя локальную архитектуру и ручную взаимопроверку. Проверка должна установить, что страницы соответствуют утверждённому HL/TS и North Star, а EV подтверждает результат именно этого неизменного кандидата; найденные ограничения — незавершённое визуальное подтверждение AC-7 и противоречивая формулировка доступности в NorthStar.

## Accepted Claims and Boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE | Студенты получают шесть часовых страниц недели 2 с обязательным ядром и отдельным углублением. | Неполный или чрезмерный материал мешает продолжить курс в согласованном темпе. | Данные лекций/лабораторных 4–6 и прямые оболочки. | Курс в локальном браузере; исходные PDF только для чтения. | HL §1/§3/§7; TS AC-1–3; соответствующие PDF. | Candidate `bb7cd7fa2094c679048e594d6bfb8c7841eab350`; RF §1–3; EV E1–E3. | yes |
| C2 | VALUE / ASSURANCE | Модуль 2 доступен после подготовки шести страниц; модуль 3 остаётся закрытым; прямые ссылки не обходят блокировку. | Студент либо не может продолжить, либо видит закрытый материал без разрешения. | `data.js`, `app.js`, маршрутизация главной страницы и прямых страниц. | Локальный браузер, прямые URL и навигация модулей. | HL §1/§3; TS AC-6; владелец Roman сохраняет доступность и открытие модулей за собой. | Candidate `bb7cd7fa2094c679048e594d6bfb8c7841eab350`; EV E1/E6/E9; RF §5, landing check. | yes |
| C3 | VALUE / ASSURANCE | Баллы равны 20 за правильный ответ и отмеченный пункт; завершение требует полного квиза и подтверждения peer-check; прогресс локален. | Неверный результат или преждевременное завершение подрывают прозрачность курса и сохранность прогресса. | `app.js`, `storage.js`, счётчики вопросов/чек-листа, сохранение браузера. | Chromium/localStorage, профиль Chrome. | HL §1/§3/§7; TS AC-4/5; локальная архитектура из KNOWLEDGE §1. | Candidate `bb7cd7fa2094c679048e594d6bfb8c7841eab350`; EV E4/E5; RF §3–5. | yes |
| C4 | VALUE / ASSURANCE | Теория, практические шаги и оценивание различимы; адаптация сохраняет читаемость на узком и широком экране без опоры только на цвет. | Перегруженная или нечитаемая страница мешает учиться и выполнять квиз/проверку. | `.lesson-section`, `.step-card`, `.assessment-card`, media queries в `styles.css`. | Текущий браузерный рендер, включая ширину ≤560 px и широкую ширину. | HL §7 P6; TS AC-7 и его правила доказательств. | Candidate `bb7cd7fa2094c679048e594d6bfb8c7841eab350`; EV E7 сообщает осмотр при 615×524 CSS px, но без live рендера ниже 560 px и без широкого сравнения. | yes |
| C5 | VALUE | NorthStar и README ясно и непротиворечиво описывают фактические баллы, локальное сохранение, ручной peer-check и доступность недели 2/модуля 2. | Противоречивое описание не позволяет студенту понять, открыт ли модуль 2, и нарушает AC-8. | Раздел Learner experience в `NorthStar.md`; `course/README.md`; фактические маршруты. | Репозиторий и видимые описания курса. | HL §1/§3; TS AC-8; текущий интерфейс как oracle. | Candidate `bb7cd7fa2094c679048e594d6bfb8c7841eab350`; EV E8; текущие файлы в HEAD `1439143b3770597d0c1ffc1f3c9ddca9f465b3c2`. | yes |
| C6 | VALUE / ASSURANCE | Курс остаётся локальным, без сервера, аккаунтов, сетевой проверки или запуска/оценивания кода; исходные PDF не меняются. | Расширение границ продукта создаёт неразрешённые данные/безопасность и ломает обещанную локальную учебную модель. | Архитектура, storage, ссылки и исходники `OOP-course/`. | Локальный статический сайт и файлы проекта. | HL §1/§7; TS §§1–2, AC-3/8; North Star Product boundaries. | Candidate `bb7cd7fa2094c679048e594d6bfb8c7841eab350`; ONB §1/§6; EV E2/E3/E8. | yes |
| C7 | TRACE | Утверждённая редакция TS, baseline, Candidate и EV относятся к одному принятому результату; владелец сохраняет зарезервированную приёмку. | Ошибка идентичности или полномочий приводит к оценке не того результата или самопринятия. | Статус, неизменные HL/TS refs, RF/EV и Candidate. | Локальная Git-история и task-local трасса. | `status.md`, owner gate, frozen HL epoch, approved TS SHA, RF/EV; Reviewer unit `codex:thread:local:01a159a3-f467-7923-92bf-1ba81013008c` distinct from Executor and parent Coordinator. | Baseline `ee410b2cc851825803cd3728991864482efbc944`; Candidate `bb7cd7fa2094c679048e594d6bfb8c7841eab350`; current HEAD `1439143b3770597d0c1ffc1f3c9ddca9f465b3c2`; TS blob `16f82248d3569bdfbd27cd863ab27298904ada57`; EV blob `00966bdd43147b13ded4aee56ace13bae6d52ef7`. | yes |
| C8 | TRACE | Экономическая привязка собственного источника Reviewer разрешена либо правдиво записана как pre-extraction gap. | Без привязки нельзя валидировать персональный numeric contribution; это не меняет качество продукта, но требует честной трассы. | Текущий Reviewer unit и `.tfw/economics/README.md`. | Codex local task; точный rollout источник не доступен в инструментах. | Economics README; Reviewer return contract. | Namespace Codex rollout; source ID/path/hash/range недоступны, extraction не начат. | yes |
| C9 | TRACE | После независимой проверки координатор исполняет HL DoD-11: актуализирует `KNOWLEDGE.md` §1 либо фиксирует обоснованное отсутствие нужных изменений. | Устаревшая карта архитектуры может направить будущую работу по неверному состоянию страниц; невыполненный DoD-11 удерживает task close открытым. | `KNOWLEDGE.md` §1 и closing route KNW. | Локальная project knowledge и current Candidate. | Frozen HL DoD-11 и §7.2 P3; Coordinator через `/tfw-docs`. | KNOWLEDGE.md утверждает, что страницы пусты; Candidate уже содержит страницы 4–6. | yes |

## TS ↔ RF Alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-1: direct lesson/lab pages 4–6 | RF §3 AC-1; EV E1 | C1, C2 | ✅ |
| AC-2: 60-minute lectures and optional depth | RF §3 AC-2; EV E2 | C1 | ✅ |
| AC-3: complete 60-minute labs, source fidelity | RF §3 AC-3; EV E3 | C1, C6 | ✅ |
| AC-4: dynamic score and unlimited actual checklist keys | RF §3 AC-4; EV E4 | C3 | ✅ |
| AC-5: completion and local persistence | RF §3 AC-5; EV E5 | C3 | ✅ |
| AC-6: module readiness, no bypass, module 3 locked | RF §3 AC-6; EV E1/E6/E9 | C2 | ✅ |
| AC-7: differentiated sections and responsive readability | RF §3 AC-7 is unchecked; EV E7 is DEFERRED | C4 | ⚠️ partial |
| AC-8: current scoring, storage, peer-check and availability descriptions | RF §3 AC-8; EV E8 | C5 | ⚠️ partial; `NorthStar.md` also says weeks 2 and 3 remain unavailable until Roman opens them, while its preceding bullet says week 2 is available |

## Verification Selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1, C2, C3, C6 | Inspect all 12 Candidate VALUE paths and their relation to EV; reuse E1–E6/E8/E9 only where candidate, environment, oracle and dependency state match. | Core learning path, module access, points and local-only boundaries are central to purpose and mandatory acceptance. | No new automated test files are allowed by TS. |
| C4 | Inspect semantic markup, CSS selectors and breakpoints; attempt the required local browser view at ≤560 px and a wide width. | Responsive readability is an explicit AC and visual harm cannot be ruled out from CSS alone. | EV omits both render conditions; local-file browser navigation was blocked by browser policy, which disallows workarounds. |
| C5 | Read current NorthStar and README against HL §1, TS AC-8, and actual module readiness. | These documents tell students the availability and scoring contract. | NorthStar contains conflicting present-tense availability statements. |
| C7 | Verify exact immutable refs, task routing spine/selection, Candidate ancestry and absence of later VALUE-path changes. | Mandatory acceptance authority and accepted-result identity floor. | Trace changes after Candidate are permitted only if they do not alter VALUE paths. |
| C8 | Bind exact source only if native session metadata/path/range are available; otherwise record the attributable pre-extraction gap in REVIEW. | Common full-role economics outcome; no metrics tool or source selector is exposed here. | No extraction or failure receipt is claimed. |
| C9 | Compare KNOWLEDGE map to Candidate; record Coordinator KNW documentation update or justified N/A. | HL DoD-11 explicitly requires this after independent review. | `KNOWLEDGE.md` §1 is stale; close remains open until Coordinator resolves it. |

## Deviations from TS

RF identifies AC-7 as DEFERRED despite AC-7 being required; its evidence does not include the narrow and wide live views. AC-8 NorthStar claim is contradicted by a second present-tense availability statement in the current file. HL DoD-11 also requires Coordinator documentation follow-through after independent review because KNOWLEDGE.md §1 is stale. No scope expansion was found in the Candidate VALUE path list; accounting is reviewed separately in Verify.

## Checkpoint

**Self-check:**
- [x] Read RF §§1–5, governing TS AC/DoF, HL purpose/principles, ONB and referenced predecessors.
- [x] Mapped every material accepted claim and the mandatory safety/security, authority and result-identity boundaries.
- [x] Bound each claim to affected behavior/dependencies, environment, oracle/authority and exact evidence identity.
- [x] Recorded a replayable verification selection and every known gap or limit.
- [x] Avoided classifying by filename, discrepancy count or artifact volume.

Stage complete: YES

## Review rev1 Candidate — current selection

| Claim | Check | Result / limit |
|---|---|---|
| C13 — Authority and status | Resolve the supplied continuation REF, live `status.md`, current transition/dispatch, selected operating values and owner gate. | Same independent Reviewer and Coordinator route; owner-only, gates-only, single-phase, native-gates; status RF; approved TS rev1 and 12-file/1,600-LOC denominator are explicit. |
| C14 — Candidate identity and accounting | Bind Baseline/Candidate and current main; reproduce the exact NUL-safe TS selector commands. | Candidate `4fcf40aa08434b3b2beb9a9979bd4019d9e237bb` is on main and its approved VALUE paths are unchanged at current HEAD; 12 files, 633 additions + 30 deletions = 663 LOC, no binary, below denominator and trigger. |
| C15 — AC-2 lessons | Inspect current data/renderers, outcomes, sections/time, example blocks and self-checks against TS rev1 and lecture PDF topics. | Each 60-minute lesson has an action outcome, one aligned self-check, separate optional depth, 3/4/4 explained JS examples, and source-aligned OOP topics. |
| C16 — AC-7 OOP workbook and responsiveness | Inspect week-two scoped structure/styles and diagram data; reconcile EV E14's exact Candidate, comparison and viewport observations. | Outcome/code breakdown/diagram/self-check blocks distinguish week 2 structurally; each lesson contains a labelled relation diagram; E14 records responsive readings at 390×844 and 1280×800 CSS px. |
| C17 — AC-8 local PDF access | Resolve all six encoded links from their course page URLs, verify exact local source files and immutable blobs, and assess Candidate-bound EV E15's local HTTP result. | All six resolve to their matching `OOP-course/` files, which are unchanged from Baseline; E15 reports each source action returned `200 application/pdf` through the local preview. |
| C18 — unaffected ACs and close boundary | Reuse only evidence with matching oracle/subject; inspect changed dependencies for AC-1, AC-3–6 and AC-9, current RF/EV, task close and remaining TRACE. | Existing route/scoring/lab/document evidence remains applicable; T1 is still owed at KNW. Executor economics remains the previously recorded pre-extraction binding gap. |

No implementation, browser workaround, test suite, lifecycle event or temporary artifact was created in this review continuation.

**Rev1 map self-check:** the current immutable authority, return, Candidate, evidence and any remaining limits are identified before judgment.

Stage complete: YES

## Follow-up map — corrected Candidate and owner observations

| Claim | Check | Result / limit |
|---|---|---|
| C10 — Source-PDF actions on lessons/labs 4–6 | Resolve the actual `sourceHref(file)` produced by `course/app.js` from each page under `course/`; compare with the six preserved source files in `OOP-course/` and check whether learner access is an approved AC. | All six generated targets miss; all six preserved files exist under `OOP-course/`. No approved AC explicitly requires clickable learner access to these PDFs, so the observed broken action is routed as a scope request, not a breach finding. |
| C11 — Lesson 4–6 AC-2 content | Inspect the current Candidate `e8893345a8e085250df11891ea9de0b64fbe7143`, lesson data/rendering, timing, takeaways, code/examples and the six named source PDFs. | Five sections per lesson total 60 minutes; three takeaways each; code blocks are 1, 1 and 2. No explicit learner-objective field or learner-facing objective statement is present. Source-topic alignment is corroborated by EV E2 and direct read-only extraction. |
| C12 — AC-7 and requested OOP-oriented design | Reconcile EV E11 against the AC-7 oracle; inspect HL/P1 and current lesson content/styles for the separate design request. | AC-7 narrow/wide observation is verified in EV E11. OOP principles are central in lesson content; a distinct OOP visual identity is not defined by the approved HL/TS. |

No new browser workaround or implementation was used. The follow-up checks are bounded to current Candidate/EV/RF, the preserved source files, and the exact owner observation record.

**Follow-up self-check:** exact current status/route/authority and Candidate were read; every new owner observation has an identified accepted claim, oracle and scope limit; no product work or new requirement was silently authorized.

Stage complete: YES
