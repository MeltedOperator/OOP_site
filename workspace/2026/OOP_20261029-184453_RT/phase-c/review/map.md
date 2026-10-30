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
