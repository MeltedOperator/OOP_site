# HL — OOP_20261029-184453_RT/phase-c: Терминалы модулей 2 и 3 — единый пакет

> Date: 2026-10-30
> Author: Coordinator
> Title: Терминалы модулей 2 и 3 — единый пакет
> ABBR: RT inherited from parent
> Status: 🔒 HL_DRAFT — approved by roman 2026-10-30
> Contract: 🔒 FROZEN — approved by roman 2026-10-30
> Frozen: §1 · §3 · §4 · §5 · §6 · §7
> Free: §2 · §7.2 · §8 · §9 · §10 · §11
> North Star: NorthStar.md §Purpose, §Learner experience, §Assessment contract, §Product boundaries, §Success

## 1. Vision 🔒 FROZEN

Модули 2 и 3 завершены как единый учебный пакет: шесть теорий и шесть лабораторных дают runnable-примеры и ограниченную, наблюдаемую практическую обратную связь. Оценивание курса, прогресс и завершение не меняются; модуль 3 остаётся в локальном preview.

**Impact:** студент проходит путь от SOLID и порождающих паттернов до Adapter, Chain и Clean Architecture в одном потоке и видит конкретные результаты запуска.

> *Воображаемая цитата студента:* «Я прошёл обе части курса одним потоком и могу сверить результат примера, не принимая автоматический PASS за оценку архитектуры».

## 2. Current State (As-Is) 🟢 FREE

- Текущие страницы находятся в course/data.js. Уроки 4–9 уже имеют статические примеры; уроки 5 и 6 содержат JavaScript-примеры. Это противоречит фразе родительского HL §2 об отсутствии блоков кода в теориях 4–9. Для планирования следует исходить из текущего файла и сохранять исполняемые строки согласно parent A8.
- Лекции 4–9 охватывают SRP/OCP; LSP/ISP/DIP; Factory/Builder/Singleton; Adapter/Decorator/Facade/Proxy; Strategy/Observer/Command/State/Chain; Clean Architecture. Источники: локальные PDF OOP-course/01_Лекции/Лекция_04…Лекция_09.
- Текущие лабораторные 4–6 охватывают рефакторинг, DI/контракты, фабрики и Builder. Лабораторные 7–9 намеренно уже PDF: фиктивный локальный gateway; два узла Chain и два Observer; Shift/Repository/FinishShift. Источники: course/data.js и OOP-course/02_Лабораторные/Лабораторная_04…Лабораторная_09. Оракулы не должны расширять сайт scope до удалённого PDF scope.
- course/app.js и course/README.md подтверждают статическое отображение без выполнения кода. Родительский контракт сохраняет PDF, баллы, прогресс, checklist и completion; эмпирические browser/runtime/security свойства остаются непроверенными.
- Phase B принят: Candidate c1acf55e81f9ec4927f883034eaba92de2214ebf, RF/EV/REVIEW rev4, verdict APPROVE и KNW на commit a6beff1e267a33dc2bf1ddcc589fc26a5ed97220. Текущий checkout содержит устаревшую проекцию Phase B; authoritative зависимость — этот accepted return.
- Root TS rev2 принят с селектором 16 VALUE files / 4,000 touched text LOC. Phase B использовал 1,200 по тому же селектору; Phase C располагает остатком до 2,800 от root baseline 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56. Любое расширение требует owner approval до действия.

## 3. Target State (To-Be) 🔒 FROZEN

Один Phase C охватывает 12 страниц: уроки и лабораторные 4–9 обоих модулей. Один Executor интегрирует их в один Candidate, который проходит один независимый review. PASS разрешён только для фиксированных объективных критериев; архитектурное качество и защита остаются человеческой оценкой.

### 3.1 Result Visualization

Числа и ожидаемые результаты в макете иллюстративны; точные сценарии определяются страницами курса.

~~~text
ОДИН ПАКЕТ · МОДУЛИ 2 + 3 · 12 материалов
Урок 4 + ЛР 4  SRP/OCP              → фиксированный сценарий рефакторинга
Урок 5 + ЛР 5  LSP/ISP/DIP/DI       → проверка контракта и подмены зависимости
Урок 6 + ЛР 6  Factory/Builder      → ожидаемые поля и вывод отчёта
Урок 7 + ЛР 7  Adapter/Decorator    → локально approve / decline / timeout
Урок 8 + ЛР 8  Chain/Observer       → отказ останавливает цепочку, оба listener видят итог
Урок 9 + ЛР 9  Clean Architecture   → порт сохраняет смену, в примере 2 остановки

┌ УРОК: теория + пример ────────────────┐  ┌ ЛАБОРАТОРНАЯ: текущие шаги ────────────┐
│ [Запустить] → вывод/ошибка и причина  │  │ [Запустить] → наблюдаемые checks       │
│ обратная связь объясняет условие      │  │ архитектурное решение оценивает человек│
└───────────────────────────────────────┘  └────────────────────────────────────────┘
Оценивание / прогресс / checklist / completion не меняются
Модуль 3 остаётся local preview; публикация требует отдельного gate
~~~

### 3.2 Value Flow

~~~mermaid
flowchart LR
 A[6 лекций + 6 лабораторных PDF] --> B[Сверить с 12 текущими страницами]
 B --> C[Примеры и фиксированные практические oracle]
 C --> D[Единый terminal Candidate модулей 2 и 3]
 D --> E[Независимый review и owner acceptance]
 E --> F[Обратная связь без изменения оценки курса]
~~~

## 4. Phases 🔒 FROZEN

Phase C следует за принятым Phase B. Между модулями 2 и 3 промежуточного gate нет.

### 4.1 Coordination Selection 🔒 FROZEN

| Activation | Owner | Task Coordinator | Phase Coordinator | Scope | Upward route | Dialogue | Reporting | Authority |
|---|---|---|---|---|---|---|---|---|
| owner-direct | roman | codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be | текущий directly addressed Phase C Coordinator | только Phase C, без principal | task Coordinator | tfw-gates-only | native-gates | owner сохраняет approvals; root HL @ 16e634d54418705183f6d6587b616cd79d50f806 |

### Phase C: Терминалы модулей 2 и 3 — единый пакет 🔴
- Один TS, один Executor, один Candidate, один RF/EV и один независимый review для 12 материалов.
- Неизменный parent selector: 16 VALUE files / 4,000 LOC. После Phase B остаётся максимум 2,800 LOC.
- Сохранять текущие границы ЛР 7–9; не менять оценивание и PDF.

## 5. Definition of Done (DoD) 🔒 FROZEN

- ✅ 1. Все шесть уроков 4–9 и все шесть лабораторных 4–9 представлены в одном Candidate и одном фазовом результате.
- ✅ 2. Исполняемые строки сохранены, комментарии следуют синтаксису исходного языка и parent A8.
- ✅ 3. Каждая страница имеет связанный пример/упражнение и наблюдаемый результат; PASS только для объективных oracle.
- ✅ 4. Сайт scope лабораторных 7–9 не расширен без owner ruling.
- ✅ 5. Баллы, прогресс, checklist, peer-check и completion не изменены; Module 3 остаётся local preview.
- ✅ 6. Есть evidence по точному Candidate, независимый review и owner acceptance.
- ✅ 7. Cumulative accounting не превышает 16 VALUE files / 4,000 LOC; Phase C не превышает остаток 2,800 без approval.

## 6. Definition of Failure (DoF) 🔒 FROZEN

- ❌ 1. Изменена исполняемая строка существующего примера без authority.
- ❌ 2. Расширены ЛР 7–9, изменены PDF или оценочный контракт.
- ❌ 3. Автоматический PASS подменяет архитектурное, документационное или устное суждение.
- ❌ 4. Browser/runtime/security/offline свойства заявлены доказанными без эмпирического evidence.
- ❌ 5. Добавлен VALUE path/asset или превышен budget без предварительного owner approval.

**On failure:** остановить изменение и вернуть точную причину владельцу; не урезать scope молча.

## 7. Principles 🔒 FROZEN

1. **Контракт курса** — терминал не меняет оценивание и завершение.
2. **Честный PASS** — автоматизируются только наблюдаемые практические критерии.
3. **Единый поток** — оба модуля и все 12 материалов в одной фазе.
4. **Текущая граница** — сайт scope ЛР 7–9 не расширяется по умолчанию.
5. **Честность о runner** — интеграция не доказывает runtime/browser/security.
6. **Неизменный accounting** — родительский selector и denominator не ratchet-ятся.

### 7.2 Knowledge Citations 🟢 FREE

| # | Source | Item | Application |
|---|---|---|---|
| P0 | NorthStar.md | Purpose; Learner experience; Assessment contract; Product boundaries; Success | Ценность для студента и локальные границы продукта. |
| P1 | .tfw/README.md | NS1 — Purpose | Реализация оправдана улучшением обучения. |
| P1 | .tfw/README.md | NS2 — Principles | Candor, structural enforcement, exact naming, portability задают честные oracle и воспроизводимость. |
| P1 | .tfw/README.md | Success Criteria | PASS не должен вводить в заблуждение. |
| P2 | KNOWLEDGE.md | §1 architecture decision map | Local-first без backend/auth/database; Module 3 требует отдельного release acceptance. |
| P3 | .tfw/conventions.md | HL Contract; Value-bearing accounting; Decomposition/change authority | Frozen boundaries и accounting authority соблюдаются. |
| P4 | NorthStar.md | Learner experience; Assessment contract | Feedback помогает учиться, не подменяя оценку. |

## 8. Dependencies 🟢 FREE

| Dependency | Status |
|---|---|
| Accepted Phase B RF/EV/REVIEW rev4 at a6beff1e267a33dc2bf1ddcc589fc26a5ed97220; Candidate c1acf55e81f9ec4927f883034eaba92de2214ebf | ✅ |
| Root HL @ 16e634d54418705183f6d6587b616cd79d50f806; root TS rev2 @ aa346605fd53ffa6234d0c8a3cbcec324a8eeb6f | ✅ |
| Exact Phase C TS/denominator owner approval | ⬜ |
| Runtime/browser empirical proof | ⬜ explicitly outside phase |
| Independent review and owner acceptance | ⬜ after Executor return |

## 9. Risks 🟢 FREE

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| 12 pages exceed 2,800 LOC remainder | Medium | High | Track cumulative diff and return expansion before action. |
| Current source contradicts parent As-Is prose | Confirmed | Medium | Use actual source inventory; preserve strings. |
| PDF details expand lab scope | Medium | High | Tie each oracle to current site criteria. |
| Runtime claims exceed evidence | Medium | High | Leave unverified claims explicit. |
| Combined phase complicates regression diagnosis | Medium | Medium | Map evidence per lesson/lab pair inside one Candidate. |

## 10. RESEARCH Case 🟢 FREE

### Blind Spots
- Browser compatibility, worker lifecycle, network isolation and hard resource limits remain unverified.
- Fixture mapping and fit within remaining LOC are execution-stage facts.
- Current source has examples contrary to a parent As-Is sentence.

### Hypotheses

| # | Hypothesis | Status |
|---|---|---|
| H1 | Existing terminal protocol can serve all six page pairs without new VALUE paths or assessment changes. | inherited parent TS |
| H2 | Fixed oracle coverage fits current-site scope of all six labs, including narrower Labs 7–9. | inherited parent TS |

Отдельный research не предлагается: принятый parent contract разрешает модульную интеграцию. Опровержение, меняющее boundary/selector/acceptance, останавливает работу для owner ruling.

### Risks of Not Researching
Runner/browser/security не проверяются этой фазой. Их нельзя называть доказанными; budget failure возвращается владельцу без скрытого сокращения scope.

### Proposed RESEARCH Focus
Отдельный research dispatch не нужен. Новые decision-changing неизвестности идут по родительскому маршруту.

### Why Not Just...?

| Approach | Value | Burden | Risk / tradeoff | Decision |
|---|---|---|---|---|
| **Одна фаза для модулей 2+3** | Единый поток всех 12 материалов | Один Executor, Candidate, review | Большой объём; остаток 2,800 LOC | Рекомендуется: соответствует прямому решению владельца и A9. |
| Разделить по модулям | Меньше каждый пакет, ранний feedback | Два запуска и review, повторная интеграция | Искусственная пауза | Отклонено владельцем. |
| Оставить как есть | Нет затрат сейчас | Нет новых процессов | Нет общего runnable terminal/feedback | Не достигается утверждённая ценность. |

**Leave unchanged:** страницы остаются статическими, обратная связь не объединена с runnable terminal.

**Critical challenge:** единый пакет может превысить лимит или затруднить локализацию регрессии. Если 12 материалов и необходимое доказательство не помещаются, рекомендация неверна: остановиться и вернуть owner’у причину/cost/assurance; ничего не исключать молча.

## 11. Strategic Insights (Planning) 🟢 FREE

| # | Insight | Category | Source |
|---|---|---|---|
| S1 | Владелец выбрал завершение обоих модулей одним Executor в одном фазовом цикле. | Delivery boundary | User: «мы работаем сразу с обоими модулями». |
| S2 | «Не 6, все 12» означает шесть уроков плюс шесть лабораторных. | Scope | User correction during planning. |
| S3 | Общее одобрение TS дано; текущий точный TS и denominator представлены как конкретный approval object. | Approval intent | User: «я одобряю ВСЕ TS делай задачу уже». |

## 12. Amendment Log 🟢 APPEND-ONLY

No amendments.

### Material handover at this return

Producer: Phase C Coordinator, codex:thread:local:01a18b1b-cf9b-7a50-a203-23392130eb0e; observed epoch 2026-10-30T10:05:33+05:00. Inspected parent HL/TS, accepted Phase B return, current North Star/knowledge/config and course materials. Material: one Phase C over 12 pages; 16 VALUE/4,000 LOC parent denominator with 2,800 remaining after Phase B. Uncertainty: runtime/browser/security unverified; current data contradicts a parent As-Is sentence. Continuation: owner gate for exact HL and TS; handoff only after exact TS approval. Economics binding gap: current source ID/version/range/cutoff unavailable, extraction not attempted, no last-good file; this is not measured zero.

---
*HL — OOP_20261029-184453_RT/phase-c: Терминалы модулей 2 и 3 — единый пакет | 2026-10-30*

