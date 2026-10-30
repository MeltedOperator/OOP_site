# TS — OOP_20261029-184453_RT / Phase B: Терминалы модуля 1

> **Date**: 2026-10-29
> **Author**: Coordinator, phase-b · `codex:thread:local:01a188ab-5190-7ce1-ab81-e572ebbbebc2`
> **Status**: 🟡 TS_DRAFT — Awaiting approval
> **Parent HL**: [HL-OOP_20261029-184453_RT](HL__phase-b__терминалы_модуля_1.md) · frozen in `a8666c532fc8e3ab2f0fe2d649ee41058b29119b`
> **Parent TS**: [TS__OOP_20261029-184453_RT.md](../TS__OOP_20261029-184453_RT.md) · approved `f597148f95ed37e139fbfb9c036a35c324cff0a6`

---

## 1. Objective

Добавить к шести страницам модуля 1 общий учебный Python-терминал с запуском и ограниченной oracle-backed обратной связью, сохранив оценки и прогресс курса. Основа терминала, создаваемая здесь, становится начальной общей версией для следующих фаз.

## 2. Scope

### In Scope

- Реализовать общий двухпанельный терминал и подключить его к трём лекциям и трём лабораторным модуля 1.
- Сохранить существующие исполняемые строки; добавить примеры, заготовки, явные проверки только при однозначном oracle, полные решения по запросу и предметные аналоги при ошибках.
- Поставить только необходимые зафиксированные локальные Pyodide assets, Worker, static-only launcher, интеграцию сборки и утверждённые узкие обновления README/disclosure.
- Сохранить баллы, отметки чек-листа, прогресс, взаимопроверку и завершение лаборатории без изменений.
- Фазы C/D получают отдельные последовательные Candidate и добавляют свои module-specific изменения к общим файлам с зависимостью от предыдущего Candidate.

### Out of Scope

- Фазы A, C и D; изменения вне точного родительского VALUE-селектора.
- Браузерная/совместимостная проверка, доказательство изоляции или offline completeness.
- Изменение критериев оценки, состояния курса, PDF или существующих исполняемых строк кода.
- Дополнительные runtime-assets, сетевые интерфейсы, backend, произвольные URL/package installs или любые заявления о проверенной sandbox-изоляции.

## 3. Principles Check

| # | HL principle | Enforced by | Gate |
|---|---|---|---|
| P1 | Сохранность авторского содержания | AC-2 | Сравнение исходных исполняемых строк и изменённого содержимого |
| P2 | Практика не меняет оценку | AC-5 | Проверка diff и storage/scoring/completion |
| P3 | Провал остаётся провалом | AC-3 | Позитивные/негативные oracle cases, ошибки и неполные результаты |
| P4 | Ограниченный запуск и честная неопределённость | AC-1, AC-6 | Проверки границ исходников; disclosure непроверенных свойств |
| P5 | Аналог возвращает к понятию | AC-4 | Проверка связи аналога с критерием и комментариями |

## 4. Affected Files and Value-Bearing Accounting

Селектор этой фазы — только перечисленные ниже VALUE members родительского селектора, необходимые для начальной основы и модуля 1. Пути и шесть плановых asset-файлов совпадают с закрытым селектором родительского TS; новый путь или asset не подразумевается.

| File / selector | Action | Class | Semantic reason / required result |
|---|---|---|---|
| `course/app.js` | MODIFY | VALUE | Общая интеграция терминала для страниц курса |
| `course/data.js` | MODIFY | VALUE | Терминальные материалы и oracle модуля 1 |
| `course/styles.css` | MODIFY | VALUE | Общая поверхность интерфейса |
| `course/index.html` | MODIFY | VALUE | Подключение общего модуля |
| `course/terminal.js` | CREATE | VALUE | Редактор, запуск, вывод и feedback |
| `course/pyodide-worker.js` | CREATE | VALUE | Worker и ограниченный runtime protocol |
| `course/assets/pyodide/{loader,wasm-glue,wasm-binary,stdlib,lockfile,package-manifest}` | CREATE | VALUE | Ровно шесть плановых необходимых локальных runtime assets из родительского селектора; фактические имена должны следовать манифесту и не расширять его |
| `scripts/serve-course.mjs` | CREATE | VALUE | Static-only localhost launcher |
| `scripts/build-site.mjs` | MODIFY | VALUE | Сборка локальной основы и assets |
| `course/README.md` | MODIFY | VALUE | Инструкция и disclosure Phase B |
| `NorthStar.md` | MODIFY | VALUE | Только утверждённое узкое уточнение |
| `course/terminal.test.js` | CREATE | ASSURANCE | Проверки общей логики и oracle |

### Prospective accounting contract

| Fact | Approved value |
|---|---|
| Subject / exact VALUE selector | `course/app.js`, `course/data.js`, `course/styles.css`, `course/index.html`, `course/terminal.js`, `course/pyodide-worker.js`, `course/assets/pyodide/**` (только 6 родительских плановых файлов), `scripts/serve-course.mjs`, `scripts/build-site.mjs`, `course/README.md`, `NorthStar.md`; ASSURANCE: `course/terminal.test.js` |
| Baseline / selector source | Task baseline `23637e22ce1c4242b904b7a8b9f92cfbd81f2b56`; точный фазовый selector подтверждён owner-approved parent TS `f597148f95ed37e139fbfb9c036a35c324cff0a6`; TS approval commit будет зафиксирован до Executor dispatch |
| Candidate rule | Первый проверенный Executor commit с Phase B VALUE+ASSURANCE до EV/RF/REVIEW/final transition. Только Phase B delta относительно указанного baseline; при позднем VALUE — новый Candidate и пересчёт. Последующие фазы используют отдельные Candidate относительно непосредственно предшествующего фазового Candidate и явно указывают dependency |
| Logical VALUE files | Родительский immutable denominator — 16 путей для всей задачи, совместно проверяемых один раз против task baseline; это не независимый Phase B бюджет и не складывается по фазам. Phase B использует только перечисленные selector members; rename = один |
| Touched text LOC | Единственный immutable предел задачи — 4,000 additions + deletions по numeric numstat от task baseline к финальному task Candidate; Phase B сообщает свою воспроизводимую delta отдельно для traceability, без сложения фазовых дельт в новый task denominator. Binary/non-text — per-file N/A |
| Triggers / disposition | 50 VALUE files / 5,000 touched text LOC — decomposition prompts задачи, не veto. Финальный task Candidate сверяется с owner-approved 16/4,000; до превышения или выхода из selector — возврат на owner approval |
| Multiplier / authority | ×2 применяется только к immutable task denominator как правило эскалации. Фазовые hard caps не создаются. Scope/selector/denominator expansion требует owner decision до работы |
| Approval epoch / failure | Этот TS и фазовая accounting interpretation должны получить прямое owner approval до Executor dispatch. Missing/mutable/mismatched/late = BLOCKED; unresolved phase = INVALID; metric-only N/A; DEFERRED non-terminal |

```powershell
git diff --name-status --find-renames=50% -z 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56 <PHASE_B_CANDIDATE_SHA> -- $valuePaths
git diff --numstat --find-renames=50% -z 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56 <PHASE_B_CANDIDATE_SHA> -- $valuePaths
```

### Prospective scope rulings

Нет. Родительские решения A8 и runtime boundary применяются только в указанной части Phase B. Этот TS не расширяет их.

### Task-local hard constraints

| M1 consequence | M2 object/risk | M3 measure/selector | M4 pre-act check | M5 softer-control gap | M6 change authority |
|---|---|---|---|---|---|
| Неожиданный эффект кода пользователя | Worker, Python bridge и static launcher surface | Закрытый selector; статический allowlist launcher; без очевидного student network API; никакой заявленной hostile-code isolation | Source review каждого Python-visible API, маршрута и URL до принятия изменений | Статическая проверка не доказывает runtime isolation в браузере | Только владелец может одобрить scope/authority amendment; Executor следует HL и утверждённому TS |

**Actions (not budget dimensions):** 11 VALUE selector entries (включая единственный закрытый selector из 6 assets) и 1 ASSURANCE entry; фактическое число logical touched files измеряется по literal parent paths.
**Immutable owner-approved denominator:** 16 VALUE files / 4,000 touched text LOC на уровне всей задачи; не ratchet-ится и не повторяется по фазам.

## 5. Acceptance Criteria

### AC-1: Общая основа соблюдает утверждённую границу

- [ ] Worker, локальные assets, launcher и сборка остаются в закрытом родительском selector; launcher обслуживает только статические файлы.
- [ ] Не добавлены удалённый fallback, student-visible произвольная сеть, upload, запись или execution API.

Gate: source checks и проверки allowlisted static paths.
Evidence: `DEFERRED — реальная браузерная проверка и isolation proof не входят в rollout`.

### AC-2: Страницы модуля 1 сохраняют исходные строки

- [ ] Все текущие исполняемые строки сохранены дословно; добавлены только разрешённые комментарии и отдельные учебные примеры.
- [ ] Терминал подключён к трём лекциям и лабораторным 1–3, без расширения содержательной границы PDF.

Gate: сравнение блоков кода и source/content mapping.
Evidence: exact Candidate diff и карта содержимого.

### AC-3: Практические проверки fail closed

- [ ] Каждый автоматизируемый критерий имеет однозначный oracle, вход, наблюдение и negative case; неоднозначное остаётся ручным.
- [ ] Ошибка, неполный/malformed результат или любой провал не показывается как успех.

Gate: фиксированные positive/negative fixtures для oracle.
Evidence: карта oracle и результаты fixtures.

### AC-4: Аналог помогает вернуться к понятию

- [ ] Для отказа в каждой лаборатории показан предметный аналог соответствующего понятия с комментариями о значимых условиях.

Gate: сверка всех трёх аналогов с критериями и комментариями.
Evidence: карта критерий → аналог.

### AC-5: Оценка и прогресс неизменны

- [ ] Терминальные действия не меняют score, checklist, progress, peer confirmation или completion.

Gate: регрессионные проверки существующего storage/scoring/completion поведения.
Evidence: результаты сравнительных проверок; `course/storage.js` вне selector и не меняется.

### AC-6: Ограничения объяснены

- [ ] README, UI и North Star не заявляют подтверждённую совместимость runtime, browser behavior, isolation или offline completeness.

Gate: source/document search и проверка формулировок.
Evidence: exact Candidate disclosure; browser-only свойства `DEFERRED`.

### Evidence Artifacts

| File | Description |
|---|---|
| `evidence/EV__phase-b__терминалы_модуля_1.md` | Каждый AC: команда/действие, наблюдение, exact Candidate SHA, результат и ограничения |

## 6. Technical Guidance

- Использовать утверждённый Pyodide dedicated Worker и static-only localhost launcher; Pyodide candidate version не равен проверенной совместимости.
- Ограничивать Worker protocol и вывод; timeout/failure не превращать в pass.
- Сначала завершить Phase B; будущая фаза начинает работу только после predecessor RF и использует собственный Candidate с явной зависимостью.

## 7. Definition of Failure

- Изменена существующая исполняемая строка, затронуты оценки/progress/completion/PDF либо расширена граница источника.
- Один провал, ошибка или неполная проверка показаны как успех.
- Launcher не статический, добавлен новый VALUE-путь/asset или неявная сеть.
- Непроверенное runtime/browser/isolation свойство заявлено доказанным.
- Фазовые или task-level метрики посчитаны как второй суммируемый знаменатель; task Candidate выходит за 16/4,000 или selector без предшествующего owner approval.

## 8. Phase Risks

| Risk | Mitigation |
|---|---|
| Общие файлы продолжат меняться в C/D | Последовательные Candidates, явный predecessor dependency и отдельные фазовые delta |
| Клиентский Worker не доказывает isolation | Явно указывать непроверенный статус; не делать security claim |
| Сложно отделить checker от student buffer | Не считать неоднозначный oracle автоматическим; fail closed |
| Локальный runtime bundle шире ожидаемого | Не добавлять assets сверх закрытых шести без owner approval |

## 9. Cross-Phase Modifications

| File | Also modified in | Coordination note |
|---|---|---|
| `course/data.js` | Phases C, D | Каждый Candidate добавляет только свой module-specific delta |
| `course/app.js` | Phases C, D | Общая интеграция изменяется последовательно от predecessor Candidate |
| `course/styles.css` | Phases C, D | Общая поверхность сохраняет прежние AC |
| `course/terminal.js` | Phases C, D | Общий механизм, последовательные фазовые Candidates |
| `course/terminal.test.js` | Phases C, D | Fixtures добавляются последовательно; ASSURANCE, не VALUE |

---

*TS — OOP_20261029-184453_RT / Phase B: Терминалы модуля 1 | 2026-10-29*
