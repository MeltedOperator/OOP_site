# TS — OOP_20261029-184453_RT / Phase B: Терминалы модуля 1

> **Date**: 2026-10-30
> **Author**: Coordinator, phase-b · `codex:thread:local:01a188ab-5190-7ce1-ab81-e572ebbbebc2`
> **Status**: 🟡 TS_DRAFT — Awaiting exact TS approval
> **Supersedes**: Phase TS rev2 `156ee785c7043747ab231d801240d4c68e041afa`; fixes the revision label in the footer
> **Parent HL**: [HL-OOP_20261029-184453_RT](HL__phase-b__терминалы_модуля_1.md) · frozen in `a8666c532fc8e3ab2f0fe2d649ee41058b29119b`
> **Parent TS**: [TS__OOP_20261029-184453_RT.md](../TS__OOP_20261029-184453_RT.md) · approved `f597148f95ed37e139fbfb9c036a35c324cff0a6`

---

## 1. Objective

Добавить к шести страницам модуля 1 учебные терминалы, которые делают существующие Python-фрагменты теории интерактивными упражнениями и связывают лабораторные терминалы с конкретными шагами заданий. JavaScript-фрагменты теории сохраняются как сравнительный материал; рядом запускается соответствующий Python-пример с кратким сравнением языков согласно родительскому TS. Сохранить исходные исполняемые строки, ограниченную oracle-backed обратную связь, решения по запросу, оценки и прогресс курса. Основа терминала остаётся начальной общей версией для следующих фаз.

## 2. Scope

### In Scope

- Реализовать общий двухпанельный терминал и подключить его к трём лекциям и трём лабораторным модуля 1.
- Для каждой лекции каждый существующий Python-блок кода превратить в терминальное упражнение и сохранить его исполняемые строки дословно; добавлять внутрь него только Python-комментарии (`#`). Каждый существующий JavaScript-блок сохранить как неисполняемый сравнительный материал, сохранить его исполняемые строки дословно и добавлять к ним только JavaScript-комментарии (`//`). Рядом с JavaScript-блоком предоставить запускаемый Python-пример той же идеи и краткое сравнение языков, как требует родительский TS.
- Для каждой лабораторной связать каждый нумерованный шаг/подзадание, предлагающий написать или изменить код, с понятной runnable-задачей терминала.
- Сохранять явные проверки только при однозначном oracle; предоставлять полные решения по запросу. При ошибке, неполном коде или провале практического критерия показывать runnable-аналог из другой предметной области с тем же OOP-механизмом и комментариями, объясняющими значимые условия/методы и почему пример удовлетворяет заданию.
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
| P2 | Практика не меняет оценку | AC-7 | Проверка diff и storage/scoring/completion |
| P3 | Провал остаётся провалом | AC-4 | Позитивные/негативные oracle cases, ошибки и неполные результаты |
| P4 | Ограниченный запуск и честная неопределённость | AC-1, AC-8 | Проверки границ исходников; disclosure непроверенных свойств |
| P5 | Аналог возвращает к понятию | AC-5 | Проверка связи аналога с критерием и комментариями |

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

### AC-2: Теория модуля 1 связана с терминалами без запуска JavaScript-фрагментов

- [ ] В каждой из трёх лекций каждый существующий Python-блок представлен как отдельное редактируемое и запускаемое терминальное упражнение.
- [ ] Каждый существующий JavaScript-блок остаётся неисполняемым сравнительным материалом; его исходные исполняемые строки сохранены дословно и внутрь добавлены только комментарии `//`.
- [ ] Рядом с JavaScript-блоком размещён запускаемый Python-пример того же понятия и краткое сравнение языков, предусмотренные родительским TS. Python-терминал выполняет только Python.
- [ ] Материал не расширен сверх действующего содержимого `course/data.js` и родительской границы курса.

Gate: полная карта `лекция → ID исходного блока → язык/роль (Python exercise или JavaScript comparison) → terminal exercise/language comparison`. Проверить автоматизированно или воспроизводимо исходные исполняемые строки и то, что Python runtime не исполняет JavaScript.
Evidence: карта покрытия лекций, exact Candidate diff, результат проверки сохранности строк и подтверждение, что все JavaScript-блоки отображаются только как сравнительный материал.

### AC-3: Шаги лабораторных заданий стали runnable-терминальными задачами

- [ ] В лабораторных 1–3 каждый нумерованный шаг или подзадание, в котором студенту предлагается написать либо изменить код, сопоставлен с конкретной runnable-задачей терминала.
- [ ] Текст терминала ясно называет действие студента и ожидаемый наблюдаемый результат; никакая такая задача не существует только как текст вне терминала.
- [ ] Условия исходных заданий и граница содержимого PDF не расширены.

Gate: полная карта `лабораторная → ID шага/подзадания → терминальная задача → ожидаемый результат`, с проверкой полноты по актуальному источнику.
Evidence: карта покрытия лабораторных, exact Candidate и результаты запуска каждого добавленного starter/example.

### AC-4: Практические проверки fail closed

- [ ] Каждый автоматизируемый критерий имеет однозначный oracle, вход, наблюдение и negative case; неоднозначное остаётся ручным.
- [ ] Ошибка, неполный/malformed результат или любой провал не показывается как успех.

Gate: фиксированные positive/negative fixtures для oracle.
Evidence: карта oracle и результаты fixtures.

### AC-5: Аналог помогает вернуться к понятию

- [ ] Когда код лабораторной неполон, содержит ошибку или не проходит практический критерий, студент видит пример запускаемого кода из другой предметной области, который демонстрирует тот же OOP-механизм.
- [ ] Комментарии в аналоге объясняют, почему существенны условия/методы и как пример выполняет соответствующее упражнение.
- [ ] Аналог связан с конкретным шагом и критерием; он не подменяет проверяемое решение лабораторной и не отображается как успешное выполнение.

Gate: для каждого релевантного шага каждой лабораторной проверить заданную ошибку/неполный ввод/отказ oracle, запуск аналога, ожидаемое наблюдение и содержательную связь с тем же механизмом.
Evidence: карта `лабораторный шаг/критерий → условие показа → аналог → ожидаемый вывод/наблюдение → связь механизма`; сохранённые runnable-примеры и результаты их запуска.

### AC-6: Полное решение доступно по кнопке

- [ ] Для каждой лабораторной полное решение остаётся доступно студенту по явной кнопке терминала.
- [ ] Показ решения не отмечает шаги выполненными и не меняет результат oracle, оценку или завершение.

Gate: открыть кнопку на каждой лабораторной, проверить показ полного решения и отсутствие побочных изменений состояния.
Evidence: карта кнопки решения по трём лабораторным и результат проверки состояния до/после.

### AC-7: Оценка и прогресс неизменны

- [ ] Терминальные действия не меняют score, checklist, progress, peer confirmation или completion.

Gate: регрессионные проверки существующего storage/scoring/completion поведения.
Evidence: результаты сравнительных проверок; `course/storage.js` вне selector и не меняется.

### AC-8: Ограничения объяснены

- [ ] README, UI и North Star не заявляют подтверждённую совместимость runtime, browser behavior, isolation или offline completeness.

Gate: source/document search и проверка формулировок.
Evidence: exact Candidate disclosure; browser-only свойства `DEFERRED`.

### AC-9: Модули 2 и 3 остаются на удержании

- [ ] Исполнитель работает только над модулем 1. Этот TS не разрешает изменения модулей 2 и 3.
- [ ] Модули 2 и 3 остаются приостановлены до явного принятия владельцем исправленного Candidate модуля 1. Технический `APPROVE` ревьювера сам по себе этого принятия не заменяет.

Gate: проверить exact Candidate и changed-paths до возврата; следующий модуль не активируется этим Executor.
Evidence: журналируемое соответствие Candidate границе модуля 1; явное решение владельца требуется отдельно перед продолжением.

### Evidence Artifacts

| File | Description |
|---|---|
| `evidence/EV__phase-b__терминалы_модуля_1.md` | Для каждого AC: действие/команда, наблюдение, exact Candidate SHA, результат, покрытие лекционных блоков и лабораторных шагов, связи runnable-аналогов и ограничения |

## 6. Technical Guidance

- Использовать утверждённый Pyodide dedicated Worker и static-only localhost launcher; Pyodide candidate version не равен проверенной совместимости.
- Ограничивать Worker protocol и вывод; timeout/failure не превращать в pass.
- Сначала завершить Phase B; будущая фаза начинает работу только после predecessor RF и использует собственный Candidate с явной зависимостью.

## 7. Definition of Failure

- Не все существующие блоки теории или программные шаги лабораторных отображены в карте покрытия и runnable-терминале; изменена существующая исполняемая строка; аналог не запускается или не объясняет тот же OOP-механизм; решение недоступно по кнопке; затронуты оценки/progress/completion/PDF либо расширена граница источника.
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

*TS — OOP_20261029-184453_RT / Phase B: Терминалы модуля 1 | rev3 | 2026-10-30*
