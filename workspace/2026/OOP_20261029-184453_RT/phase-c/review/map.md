# Map — Phase C: Терминалы модулей 2 и 3

> RF: [RF__phase-c__терминалы_модулей_2_и_3_единый_пакет.md](../RF__phase-c__терминалы_модулей_2_и_3_единый_пакет.md) @ `ada1edd4908970a3747e26217266b8777128181c`
> TS: [TS__phase-c__терминалы_модулей_2_и_3_единый_пакет.md](../TS__phase-c__терминалы_модулей_2_и_3_единый_пакет.md) @ `6b17d963f905cf94ce49a23f85d7965cd0297186`
> Принятый объект: Candidate `7616de72d507e0801264452e69384337c5a00409`

## Understanding

Phase C добавляет общий терминал и ограниченную практическую обратную связь к урокам и лабораторным 4–9 обоих модулей, сохраняя прежние исполняемые примеры и оценивание. Один Candidate охватывает все 12 страниц; совместимость, безопасность и другие свойства среды остаются явно непроверенными, а Module 3 доступен только в локальном preview.

## Accepted Claims and Boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE | Все уроки и лабораторные 4–9 модулей 2 и 3 включены в один Candidate. | Пропуск или разделение страниц нарушит утверждённый общий учебный маршрут. | `course/data.js`, `course/app.js`, инвентарь страниц | Статические файлы курса, локальная сборка | TS AC-1; перечень страниц и маршруты | Candidate `7616de72…`; EV E1 | да |
| C2 | VALUE / ASSURANCE | Примеры уроков соответствуют темам, существующие исполняемые строки сохранены. | Ошибочное содержание или незаявленное изменение авторских примеров. | `course/data.js`, примеры терминала | Источник и тестовые фикстуры | TS AC-2; сравнение до Candidate | Candidate `7616de72…`; EV E2 | да |
| C3 | VALUE / ASSURANCE | Лабораторные 4–6 используют фиксированные проверки только для объективных критериев; архитектура и аргументация остаются человеческой оценкой. | Ложный PASS может подменить оценивание курса. | Данные лабораторных, проверки терминала, feedback | Исходники и фикстуры Node | TS AC-3/6; карта оракулов и положительные/отрицательные фикстуры | Candidate `7616de72…`; EV E3/E6 | да |
| C4 | VALUE | Лабораторная 7 использует только вымышленный локальный шлюз и сценарии approve/decline/timeout. | Реальные платежи, сеть или PDF-only scope нарушат замороженную границу. | Упражнение и оракул лабораторной 7 | Исходник и тесты | TS AC-4; текущая граница сайта | Candidate `7616de72…`; EV E4 | да |
| C5 | VALUE | Лабораторная 8 сохраняет два узла Chain и двух наблюдателей; лабораторная 9 — Shift/Repository/FinishShift и in-memory storage. | Расширение требований или хранилища меняет утверждённый scope. | Данные лабораторных 8–9 и поведение терминала | Исходник и тесты | TS AC-5; текущая граница сайта | Candidate `7616de72…`; EV E5 | да |
| C6 | ASSURANCE | Статус и пояснения отражают детерминированные проверки; ошибки не показывают PASS, ручные критерии не автоматизированы. | Студент получает ложную практическую уверенность или терминал подменяет оценивание. | `course/terminal.js`, тесты, вывод feedback | Фикстуры Node и просмотр исходника | TS AC-6; успешные и неуспешные входы | Candidate `7616de72…`; EV E6 | да |
| C7 | VALUE / ASSURANCE | Объединённые страницы сохраняют интерфейс терминала и storage-поведение принятого Phase B. | Регрессия нарушит ранее принятый результат. | Общие маршруты терминала и storage | Регрессионные тесты Node | TS AC-7; Candidate Phase B и его suite | Candidate `7616de72…`; EV E7 | да |
| C8 | VALUE / TRACE | Баллы, прогресс, checklist, peer-check, completion и PDF не меняются; Module 3 остаётся local-preview-only. | Изменение оценки/completion или публикация за пределами утверждённой границы меняют продуктовый контракт. | `course/app.js`, `course/data.js`, storage, PDF, availability gates | Diff Candidate и целевые тесты | TS AC-8; замороженный HL и NorthStar | Candidate `7616de72…`; EV E8 | да |
| C9 | TRACE / VALUE | Утверждения о runtime/browser/security/offline/performance/resource не сильнее доказательств; запрет сети для кода студентов остаётся границей. | Недоказанная безопасность вводит в заблуждение или ослабляет защитную границу. | Worker, runtime-assets, launcher и документация | Статический код; эмпирический запуск браузера не проводился | TS AC-9; master HL §6–7 и NorthStar | Candidate `7616de72…`; EV E9 | да |
| C10 | ASSURANCE / TRACE | Сохранены точный parent selector и знаменатель 16 VALUE файлов / 4,000 LOC; Phase C не превышает остаток 2,800 LOC. | Неутверждённое расширение scope или неверный accounting. | 16 VALUE путей, переименования, текстовый и бинарный учёт | Git baseline/Candidate | TS AC-10 и точный NUL-safe метод | Baseline `23637e22…` → Candidate `7616de72…`; EV E-accounting | да |
| T1 | TRACE | Candidate, одобрение TS, dispatch и принятие владельца — отдельные полномочия; Reviewer не восполняет отсутствующую власть. | Неверный объект или неразрешённое принятие меняют следующий шаг. | Lifecycle, gate/journal и lineage ролей | Артефакты задачи в Git | Status/journal фазы, gate TS, owner-only authority | RF commit `ada1edd…`; TS `6b17d963…` | да |
| T2 | VALUE / TRACE | Идентичность результата и границы safety/security обязательны независимо от выборки; принятие остаётся за владельцем. | REVIEW может одобрить неверный Candidate или подразумевать неподтверждённую безопасность. | Hash Candidate, граница Worker, маршрут принятия | Точные Git revisions и исходник | Master HL, TS и owner-only route | Candidate `7616de72…`; RF commit `ada1edd…` | да |

## TS ↔ RF Alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-1–2 | RF §3, EV E1–E2 | C1–C2 | да |
| AC-3–6 | RF §3, EV E3–E6 | C3–C6 | да |
| AC-7–8 | RF §3, EV E7–E8 | C7–C8 | да |
| AC-9 | RF §3, EV E9 | C9 | да; эмпирические свойства явно отложены |
| AC-10 | RF §§1, 4–5; EV E-accounting | C10 | да; метод и суммы проверить независимо |
| DoD / DoF | RF §§1–5; EV E1–E-accounting | C1–C10, T1–T2 | предварительно да; проверить объект и доказательства |

## Verification Selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1–C2 | Проверить изменения маршрутов и данных Candidate; сравнить сохранённые примеры с baseline. | Все 12 страниц и сохранение исполняемых строк — существенные требования scope. | Других ограничений RF не заявляет. |
| C3–C6 | Проверить каждый оракул и каждый путь PASS/failure; повторить фикстуры терминала на Candidate. | Ложный PASS, границы лабораторных и authority оценивания критичны. | Архитектура и аргументация остаются ручной оценкой. |
| C7–C8 | Просмотреть diff Candidate, выполнить названные регрессионные тесты, сравнить scoring/PDF-пути и availability gates. | Совместимость Phase B и границы курса обязательны. | Неизменность PDF подтвердить точным diff. |
| C9/T2 | Просмотреть Worker, CSP, сетевые API, launcher и docs; проверить, что заявления ограничены источниками. | Safety/security и идентичность результата обязательны. | Реальное поведение браузера, изоляция сети, offline, performance и hard limits остаются непроверенными. |
| C10 | Повторить утверждённый NUL-safe selector/numstat для baseline и Candidate; сверить два бинарных файла, четыре текстовых runtime-файла, фазовую атрибуцию, authority и лимиты. | Неизменяемый accounting gate. | Требуется точное дерево Candidate и утверждённый метод. |
| T1 | Проверить status/journal на RF commit, approved TS, ONB/dispatch и точный RF commit. | Authority и lifecycle определяют допустимый следующий шаг. | Принятие владельцем — последующий gate. |

## Deviations from TS

RF не заявляет отклонений. В Verify проверить точную membership и отделить два бинарных runtime-файла от четырёх текстовых.

## Checkpoint

**Self-check:**
- [x] Прочитаны RF §§1–5, governing TS AC/DoF, HL purpose/principles, ONB и указанные predecessors.
- [x] Нанесены все существенные claims и обязательные границы safety/security, authority и идентичности результата.
- [x] Claims связаны с поведением/dependencies, средой, oracle/authority и точной идентичностью evidence.
- [x] Запланирована воспроизводимая проверка и обозначены известные пределы.
- [x] Не классифицировал по именам файлов, числу расхождений или объёму артефактов.

Stage complete: YES

## Current return gate — 2026-10-30

**GATE_REQUIRED: lifecycle/status mismatch blocks review activation.** The Coordinator supplied the correction-return RF at `0f17c0562b7c333444977acc33f02d375ee62ca5`. That immutable tree contains the completed round-1 RF for Candidate `e56d2961c9927df3fc30fc3c066397d3069c23e3`, but its authoritative phase `status.md` says `lifecycle: ONB` (`updated: 20261030-114002`). The latest journal event, `20261030-114002__handoff__c471.md`, records `from: RF` and `to: ONB` to resume the same Executor for the approved correction. I found no later ONB→RF status/event pair in the supplied RF commit.

The supplied RF and direct Coordinator command identify a return to review, but they do not themselves transition the phase lifecycle. Review Step 1 requires validating phase state and lineage; the phase remains recorded as implementation-active. Please resolve the phase state by validating the Executor return and recording the authorized ONB→RF transition with its journal event, then send the exact immutable current status/event reference under the closed message catalogue. If the return is not complete, provide the current authorized state and next gate. Until that state is resolved, I have not mapped or judged Candidate `e56d2961c9927df3fc30fc3c066397d3069c23e3` and have not issued a new REVIEW verdict.

**Route:** current `coordinator_route` is `codex:thread:local:01a18b1b-cf9b-7a50-a203-23392130eb0e`. No lifecycle or journal edit is made by the Reviewer.

## Follow-up review — correction round 1 / Candidate `e56d2961c9927df3fc30fc3c066397d3069c23e3`

The prior review selected F1/F2 because the README contradicted the implemented terminal coverage and advertised a rejected `/course/` URL. Coordinator ruling `REVIEW__phase-c__терминалы_модулей_2_и_3_единый_пакет.md @ cc1d61d549e5018a75c37209468fdabb47f3d62d` accepted both bounded corrections at rung 1 within the approved TS. The correction return identifies a new Candidate, `e56d2961c9927df3fc30fc3c066397d3069c23e3`; RF `@ 0f17c0562b7c333444977acc33f02d375ee62ca5`; EV `@ 03d8e702dcdb5c4f327efe375526324e34df0d79`.

The initial supplied RF snapshot had `lifecycle: ONB`, so review activation was gated in this map. Coordinator status `@ e4a587d689c9f9e755bccb4f0056ab721a64aa7c` and `journal/20261030-115540__transition__4e88.md` record ONB→RF against the corrected RF/EV; the latest current-state dispatch `journal/20261030-121547__dispatch__reviewer-current-state-5f2a.md @ c6789f7bd0f7e060ab25ddc61d7d2281fd48e5af` confirms the same Reviewer and bounded follow-up. The gate is resolved; this Reviewer made no status or journal edit.

### Affected claims and follow-up selection

| Claim | Layer | Risk / behavior | Oracle / authority | Follow-up check and limit |
|---|---|---|---|---|
| F1 / AC-1, AC-6 | VALUE | Incorrect instructions could conceal terminal support across Modules 2–3 or imply objective checks replace human review. | Approved TS; README compared with actual 18 page routes and human-only assessment boundary. | Inspect the exact README change at `e56d296…`; confirm all nine lesson and nine lab pages, objective-only scope, human criteria, and no score/progress/completion effect. |
| F2 / AC-1, AC-8 | VALUE / ASSURANCE | The advertised local URL could reject users trying to open the course. | Approved TS and static launcher route/content oracle. | Inspect `/course/` normalization and rerun exact Candidate terminal suite including HTTP request-level route regression. Reuse EV built-output check. No browser compatibility claim. |
| C-accounting / AC-10 | TRACE | VALUE changes require new Candidate and unchanged selector/denominator replay. | Owner-approved TS and literal selector. | Replay NUL-safe root and Phase B comparisons at `e56d296…`; binary/non-text LOC N/A only for `.wasm` and `.zip`. |
| C-safety / authority | VALUE / TRACE | Worker boundary, human assessment, local-preview gate or accepted-result lineage must not be weakened. | Master HL/NorthStar, TS, prior independent review and current status/event. | Reuse prior evidence for unchanged implementation; check correction diff and current authority. Empirical isolation remains unverified. |

No TS deviation is claimed. The correction changes two selected VALUE files (`course/README.md`, `scripts/serve-course.mjs`) and one selected ASSURANCE file (`course/terminal.test.js`); it adds no new selector member. Candidate `7616de72…` is superseded for this result by `e56d296…`.

## Independent review — public Module 3 availability / Candidate `80fc58033ea5e4db04f931c337e6f77fd15ae275`

RF `@ f1a6b7884fafc5ea77e1ce1fb8cb28de22678c6d` is the active return in phase status `REV`. Governing order: owner-approved Phase C TS rev1 `@ a9695d828ca903f8fc04b75695a49277a310e3b1`, under amendment A9 and owner gate `journal/20261030-124523__gate_answer__55e1.md @ 20a6efc2e3aebef47bf42f799dfa56a3b71980a3`. Candidate `80fc58033ea5e4db04f931c337e6f77fd15ae275` removes the origin-based Module 3 gate while retaining `weekThreeReady`. Review focus is hosted readiness, locked behavior when incomplete, unchanged assessment/terminal boundaries, Candidate identity and approved accounting. Deployment is a later act and was not performed.

### Accepted claims and boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE | Ready Module 3 is available on local and hosted origins under A9 and TS AC-11. | A host-only gate denies the approved route; an unconditional gate exposes unfinished material. | `course/data.js` predicate; home/week/direct lesson and lab routes. | Candidate VM contexts for localhost and HTTPS. | TS rev1, `weekThreeReady`, rendered routes. | Candidate `80fc5803…`; RF/EV `f1a6b788…` | yes |
| C2 | VALUE / ASSURANCE | Incomplete Module 3 content remains unavailable on hosted origins. | Students enter a partial module or see terminal pages without required content. | Lesson/lab readiness data and app route gating. | HTTPS fixture blanks lab 9 expected output before production predicate. | TS AC-11; negative fixture assertions. | Candidate `80fc5803…`; EV `f1a6b788…` | yes |
| C3 | VALUE | Public copy/package describes readiness and materials while preserving assessment boundaries. | Misleading availability or scoring expectations; missing course sources. | README, home hero and static build package. | Candidate source and isolated static build. | TS AC-8/11; inventory and `/course/` request. | Candidate `80fc5803…`; EV `f1a6b788…` | yes |
| C4 | VALUE / ASSURANCE | Existing terminal oracles and assessment separation remain intact. | False positive feedback or changes to score, progress, checklist, peer-check or completion. | Existing terminal/data/storage behavior; updated regression test. | Exact Candidate suite; unchanged Phase B/terminal sources. | TS AC-7/8; prior independent review and storage EV. | Candidate `80fc5803…`; prior REVIEW `7ab89783…` | yes |
| C5 | TRACE | Owner authority, fixed 16-path selector/denominator, Candidate and independent Reviewer route resolve. | Unapproved release boundary, budget overrun or wrong-result review. | Status, gate, TS, RF/EV, dispatch and Git objects. | Immutable history and current Codex route. | A9, TS rev1, status `REV`, exact refs. | RF/status `f1a6b788…`; authority `20a6efc2…` | yes |
| C6 | VALUE / ASSURANCE | Browser/runtime/security/offline/performance/resource properties are not claimed verified. | Unsupported safety or compatibility assurance could mislead learners. | Worker/runtime unchanged; no deployed browser run. | Source, regression VM and isolated build. | TS AC-9 explicitly defers empirical claims. | Candidate `80fc5803…`; EV `f1a6b788…` | yes |

### TS ↔ RF alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-1, AC-8, AC-11 | Round 2: hosted/local ready routes, incomplete fixture, updated copy and packaged sources | C1–C3 | ✅ |
| AC-7, AC-8 | Existing suite and assessment boundary preserved | C4 | ✅ |
| AC-9 | Empirical browser/runtime/security/offline/performance/resource claims remain deferred | C6 | ✅ |
| AC-10 | Exact selector and immutable denominator replay | C5 | ✅ |

### Verification selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1–C2 | Inspect production predicate and actual-app route test; rerun exact Candidate suite. | VALUE patch removes a host predicate; both positive hosted and negative incomplete cases matter. | VM contexts are not deployed browser sessions. |
| C3 | Inspect README/home patch; independently build an isolated mirror, inventory sources and GET `/course/`. | Public copy/package are part of this same-Site update. | No deployment/production-host observation. |
| C4, C6 | Inspect Candidate patch, rerun suite and reuse prior evidence for unchanged terminal/storage behavior. | Assessment and safety boundaries are mandatory; unchanged evidence applies only to unchanged behavior. | Empirical runtime properties remain unverified. |
| C5 | Validate status/event, owner gate, approved TS, Candidate ancestry, accounting and exact routes. | Authority and accepted-result identity are mandatory floors. | Reviewer rollout binding metadata is unavailable. |

### Deviations from TS

No implementation deviation observed. TS makes publication a later decision after review and owner acceptance; deployment is not included here.

**Checkpoint:** RF §§1–5, TS rev1, governing HL/ONB, prior review and exact Candidate selected; material claims and mandatory floors mapped; checks selected by risk/environment/oracle/evidence gap; no quality claim inferred from counts. **Stage complete: YES.**
 
## Round 4 — owner-direct review of the post-publication RF

### Understanding

The accepted subject is final tested Candidate 31360a3483f207312e8f9b4c64249ea425500d54, under owner-approved TS rev2 dd4587ee6cad203959938318b0c9b22ed0ded623, returned in RF/EV at a9c42ea13361a302914ba81851c64ac4d4a2132f. This round verifies the newly added lab-code, structural-analogy and per-step terminal criteria while reusing evidence for unchanged behavior. Owner-authorized publication preceded independent review; this is a post-publication review and does not claim prior Reviewer approval.

### Accepted Claims and Boundaries

| ID | Layer | Claim / boundary | Harm if false | Behavior/dependency | Environment | Oracle/authority | Identity | Required? |
|---|---|---|---|---|---|---|---|---|
| C12 | VALUE / ASSURANCE | Every lab code sample students should inspect or run is in a runnable editor. | Static-only code blocks expected practice. | Lab data and rendered Labs 4–9. | Exact Candidate and built package. | TS AC-12; EV E-R3-code. | Candidate 31360a3…; RF/EV a9c42ea… | yes |
| C13 | VALUE / ASSURANCE | Six analogies are meaningful executable structures aligned with their labs and respond to changed input. | Print-only or misleading analogies fail to teach the intended pattern. | terminalContent.labs[id].analog.source. | Isolated Pyodide. | TS AC-13; EV E-R3-analog. | Candidate 31360a3… | yes |
| C14 | VALUE / ASSURANCE | Each of six steps in Labs 4–9 has its own independently runnable terminal. | Wrong/shared source or missing step feedback. | Lab route, stepExercises, terminal IDs, score-safe markup. | Exact Candidate route and isolated execution. | TS AC-14; EV E-R3-steps. | Candidate 31360a3… | yes |
| C11/T1 | VALUE / TRACE | Module 3 readiness and public package hold; publication has owner authority; deployed subject is attributable. | Incomplete public content or review of a different product. | Readiness predicate, package and Site version. | Candidate tests/build and Site metadata. | TS AC-11, A9 owner authority, status/event and release trace. | Candidate 31360a3…; Site v3 source 2d549cb… | yes |
| T2 | TRACE | Publication, owner acceptance, Candidate identity and this independent review are distinct. | Misstating a pre-publication Reviewer gate. | Phase status/journal and release chronology. | Task artifacts and Site readback. | Status a9c42ea…; gate d79bc69…; transition 4542; release trace c543e15… | RF/EV a9c42ea… | yes |

### TS ↔ RF Alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-9–11 | Correction round 3; package/readiness rows | C11/T1 | yes; AC-9 remains DEFERRED |
| AC-12 | RF round 3; EV E-R3-code | C12 | yes |
| AC-13 | RF round 3; EV E-R3-analog | C13 | yes |
| AC-14 | RF round 3; EV E-R3-steps | C14 | yes |
| AC-10 / DoF | RF accounting; EV E-accounting-R3 | T2 | yes; replay required |

### Verification Selection

| Claims | Check | Why | Limit |
|---|---|---|---|
| C12–C14 | Inspect rendered lab inventory, route assertions, six analogy structures and all 36 step runs; use exact-Candidate suite. | Newly approved criteria affect student-visible code, teaching structures and every step. | Source/runtime tests do not establish live classroom learning or browser security. |
| C11 | Rebuild in isolated temp mirror; inspect package inventory and deployment/source mapping. | Public availability and result identity are mandatory. | No production browser session; v3 is an identified successful deployment, not asserted to be latest. |
| T1/T2 | Verify status, owner TS gate, final return and release authority chronology. | Publication preceded review. | This review cannot retroactively be the pre-publication review. |
| AC-10 | Replay exact TS selector with NUL-safe name-status/numstat from baseline and accepted Phase B. | Immutable selector and accepted-result identity. | Binary LOC remain N/A. |
| Unchanged ACs/purpose | Reuse rev3 evidence when behavior is unchanged; check master HL, North Star and A9. | Avoid repeating unaffected work while retaining frozen purpose/safety floors. | AC-9 empirical limits remain deferred. |

### Deviations from TS

No implementation deviation found. Publication preceded this review because the owner explicitly authorized release without a Reviewer in transition 4542 and release trace c543e15…; this records chronology and authority, not a Reviewer-approved pre-publication gate.

### Checkpoint

- [x] Current RF, TS rev2 ACs/DoF, master purpose, phase HL/ONB, prior REVIEW and status/gate/event read.
- [x] Mapped new claims and mandatory safety/security, owner-authority and Candidate-identity boundaries.
- [x] Bound claims to behavior, environment, oracle and exact evidence identity.
- [x] Selected Candidate execution, package/release identity and accounting replay with limits.
- [x] No classification based on document polish, discrepancy count or artifact volume.

Stage complete: YES.
