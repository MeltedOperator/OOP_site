# TRACE — Owner Commands and Decisions

This file records material owner instructions and accepted decisions for continuity. It is a selected trace, not a chat transcript. New project commands should be added as dated entries with their outcome or current disposition.

## 2026-10-14 — Project start and INIT

**Owner:** Roman (`roman`)

- Start a new project using Trace-First Workflow Full, using the newest exact stable release. Release selected: `v3.9.2`.
- Create a local mini-LMS for second-year students learning OOP: a concise three-week course, one hour each of lecture, practice, and homework per week, plus one exam to design later.
- Do not deploy the site or add a project-owned server, database, registration, or authentication. Keep course files in a root `OOP-course/` directory that Roman will provide later.
- Provide an intuitive, simple interface; theory lessons, interactive labs, visible criteria, progress, and points. Start with Week 1 open; keep Weeks 2 and 3 closed until Roman authorizes opening them.
- Course score is 500 points: 100 for staged code checks, 8 theory questions at 25 points each, and 3 practical exercises sharing the remaining 200 points. The practical split and rubrics remain undecided.
- Keep UML structure and architecture diagrams in `architecture/`; maintain a clean, navigable project.
- Treat this semester project as Roman's practice with TFW Full. Explain TFW procedures and suggest the next step. Use only the Codex adapter and Russian project artifacts.
- Initialize TFW Full as the first task, named `Initialize New Instructional TFW` with abbreviation `INIT`; use task prefix `OOP`. Project name: `OOPoman`. Human profile: Roman (`roman`).
- INIT acceptance: set up TFW Full `v3.9.2`, create `NorthStar.md` and this `TRACE.md`, route the project README to TFW and the selected trace, and preserve product requirements and open scoring questions for later work. Do not build the site or create course materials during INIT.

**Disposition:** Recorded as the project North Star, initial task scope, and deferred design questions. INIT proceeds through research, setup, and independent review.

## 2026-10-14 — Role workspace boundary

- Roman authorizes separate role chats for TFW Full and explicitly forbids creating a Git branch or worktree for them. Role chats must use the existing project checkout.

**Disposition:** Keep role artifacts task-local and avoid overlapping edits; record this workspace constraint in INIT verification.

## 2026-10-14 — Research iteration preparation

- Roman directed the Coordinator to prepare the research iteration entry and pass the task to Researcher.

**Disposition:** Iteration control prepared under the INIT task. Researcher activation remains subject to the task's valid TFW routing and activation record.

## 2026-10-14 — Master-HL direction

- Roman directed the Coordinator to prepare and freeze a master-HL with research hypotheses and a task-context link.
- Roman's earlier authorization for a bounded Researcher role chat applies to the INIT research only; role work must follow the frozen mandate, use the shared checkout, and create no branch or worktree.

**Disposition:** Prepare the HL as a reviewable draft, then apply the TFW freeze gate to its exact content before routing Researcher.

## 2026-10-14 — INIT research environment

- Roman specified Google Chrome as the target browser environment for INIT research. Researcher should use this as a compatibility constraint and report documented limits; this does not authorize selecting the application stack or other owner-reserved product decisions.

**Disposition:** Passed to the authorized Researcher for the current INIT iteration.

## 2026-10-14 — INIT offline requirement

- Roman requires the course to work fully without an Internet connection after local launch in Google Chrome.

**Disposition:** Passed to the authorized Researcher as a binding compatibility requirement for INIT research. This does not select the application stack or persistence policy.

## 2026-10-14 — Hold Challenge pending course files

- Roman is preparing to add the course files to `OOP-course/`. Keep the open Challenge question about checking `file://` and Chrome extension compatibility pending; do not proceed with that check until Roman gives the go-ahead.

**Disposition:** Researcher is to hold at the current checkpoint and wait for Roman's explicit go-ahead.

## 2026-10-14 — INIT course-file inspection authorization

- Roman authorized the Researcher to inspect the newly added `OOP-course/` files for INIT and reiterated that the current phase is initialization only.
- Limit this inspection to understanding the supplied files and their local-use compatibility. Do not create or modify the site, transform or author course content, or make owner-reserved product decisions.

**Disposition:** Resume the bounded Researcher Challenge with the course files available as evidence; keep implementation out of scope.

## 2026-10-14 — INIT launch-mode check scope

- Roman clarified that the Researcher should check both local launch options for INIT: `file://` and Chrome extension, using the supplied `OOP-course/` files as relevant evidence.
- This remains initialization research only. Do not build an extension, implement the site, or alter/transform course files.

**Disposition:** Researcher may compare both modes for documented local/offline compatibility and report limitations to the Coordinator.

## 2026-10-14 — External links and OOPoman accounts

- Roman allows external links in course materials to require an Internet connection.
- OOPoman itself must have no learner accounts, registration, or authentication.
- This decision addresses the website boundary; it does not decide whether an external service such as GitHub may require its own account.

**Disposition:** Researcher should distinguish external network/account requirements from OOPoman's own offline and no-account guarantees; preserve the external-account question as open unless Roman resolves it.

## 2026-10-14 — Third-party account requirements are out of scope

- Roman clarified that a third-party account requirement such as GitHub is outside OOPoman's website boundary and is not a requirement of this web project.

**Disposition:** Do not treat external account requirements as an OOPoman feature or unresolved product decision. Keep the website itself account-free; external links may still require Internet as previously authorized.

## 2026-10-14 — Course files supplied

- Roman added course materials to the root `OOP-course/` directory. The files remain source material and must not be modified during INIT.

**Disposition:** 38 PDFs were observed under `OOP-course/`; the North Star and README now describe the supplied directory.

## 2026-10-14 — Limited independent review for INIT

- Roman approved one limited independent Reviewer for INIT: review the fixed RF/evidence and TFW setup; do not modify product/config/RF/evidence/status/HL; do not create a branch or worktree; use the existing checkout serially.

**Disposition:** Recorded as owner-initiated amendment A1 to the frozen INIT master-HL. This authority applies only to the current INIT review.
## 2026-10-15 — Команда для второй задачи после INIT

- Roman запросил короткую команду для запуска именно второй задачи в другом чате OOPoman после завершённого INIT.
- Создан пользовательский скилл `oop-start`: он передаёт запрос на каркас сайта существующему TFW Plan, сохраняет требования проекта и предполагает согласование плана перед реализацией.

**Результат:** запуск в новом чате проекта командой `/oop-start` или явным вызовом `$oop-start`. Создание скилла не запускает разработку и не открывает повторно INIT.

## 2026-10-15 — Повторное открытие INIT для экономиксов Reviewer

- Roman распорядился: «открой на некоторое время INIT, передай инструкции повторно ревьюверу и после получи экономику».
- Разрешено ограниченное продолжение закрытого INIT: Coordinator временно возвращает задачу в KNW, повторно активирует того же Reviewer для сбора только его собственного расхода, принимает числовой возврат и обновляет экономический отчёт.
- Reviewer может проверить указанный точный кандидат собственного rollout по `session_meta.id`, читать разрешённые числовые поля, записать собственные JSONL и дополнить существующий REVIEW сведениями о покрытии. Отсутствующий первоначальный capture не объявляется существовавшим ранее: восстановление выполняется сейчас. Дополнительные обращения учитываются отдельно от исходного Review.
- Прежнее APPROVE и принятый результат INIT сохраняются. Разработка сайта, новые роли, ветки/worktree и чтение чужих native sessions не входят в это продолжение.

**Результат, который требуется:** проверенный возврат Reviewer и обновлённый economics.md; затем Coordinator возвращает INIT в DONE. Если измерение объективно недоступно, фиксирует конкретное препятствие и сообщает Roman.



## 2026-10-15 — Сохранять только основную экономику INIT

- Roman распорядился: «не сохраняй дополнительные обращения, только основную экономику и закрой INIT».
- Итоговая выборка ограничена исходной инициализацией: три участника, 90 013 509 токенов. Поздние замеры и промежуточные экономические отчёты удалены из текущих файлов.

**Результат:** сохранены исходные числовые возвраты и основной economics.md, INIT остаётся закрытым в DONE.

## 2026-10-15 — Запуск задачи каркаса сайта

- Roman поручил начать после завершённого INIT отдельную задачу по каркасу сайта OOPoman. Предлагаемое название: «Каркас сайта OOPoman»; сокращение: `WEB`; идентификатор формируется по правилам TFW.
- Coordinator этой задачи — текущий Codex-чат. Начальный режим: owner-only, `tfw-gates-only`, `native-gates`; отдельные роли Roman создаст по запросу Coordinator на соответствующих TFW gates. Настоящая запись не запускает эти роли и не утверждает HL или TS.
- Первая итерация планируется вокруг приветственной карточки, навигации по трём неделям, страниц теории и практики, статусов доступности недель и представления прогресса/баллов. Объём контента, работающие отметки прогресса и способ открытия недель пока ожидают уточнения владельца.
- Стек и точный локальный способ запуска остаются предметом планирования с учётом RES INIT. Исходники `OOP-course/` не изменять автоматически; интерактивное преобразование лабораторных не включать без отдельного согласования. Распределение практических баллов, охват шкалы 500 баллов, экзамен и безопасная проверка кода остаются открытыми решениями.
- Для каждого возвращающегося участника предусмотреть разрешённый capture собственной экономики, привязанный к его фактическому источнику и границам этой задачи; недоступный измеритель отмечать конкретной причиной, без нулевого или оценочного значения.
- Сохранить ранее записанный запрет Roman на Git-ветки и worktree. До будущего запуска роли сверять этот запрет с действующими требованиями изоляции TFW и не обходить конфликт молча.

**Disposition:** начать планирование новой задачи после DONE INIT. Утверждение HL/TS и ответы на вопросы по первой итерации остаются за Roman.

## 2026-10-15 — Уточнение объёма первой итерации WEB

- Roman распорядился сначала подготовить структуру страниц первой недели и оставить места для контента. После готовности каркаса он планирует отдельные задачи на преобразование PDF в страницы курса с материалами, квизами и практикой; это не разрешает преобразовывать исходники сейчас.
- Прогресс должен сохраняться между запусками, допускать сброс для следующего учащегося, показывать состояние отдельной лабораторной и общий прогресс по модулям.
- В текущей задаче доступна только первая неделя; недели 2 и 3 остаются закрытыми. Их открытие и наполнение материалами по лекциям и лабораторным относятся к будущим задачам, которые Roman начнёт отдельно.

**Disposition:** Coordinator обновляет HL черновик этой задачи с указанными границами и проверяет оставшуюся семантику отметки завершения до утверждения.

## 2026-10-15 — Семантика прогресса пустых страниц WEB

- Roman распорядился автоматически отмечать пустую страницу лабораторной как «просмотрена/начата» при открытии.
- Завершение лабораторной будет фиксироваться позже по фактическому квизу или практическому заданию, когда соответствующий контент появится в отдельной задаче.

**Disposition:** Coordinator переносит это правило в HL. Ограничение Roman на ветки/worktree пока не менялось; вопрос о допустимой изоляции мутационных ролей остаётся отдельным gate.

## 2026-10-15 — Разрешение worktree для WEB

- Roman разрешил перевести работу WEB в отдельный worktree после разъяснения, что worktree — отдельная рабочая копия, а не автоматически отдельная ветка GitHub.
- Изоляция TFW для меняющих файлы ролей разрешена в рамках WEB. Принятый результат должен попадать в основную локальную историю fast-forward без merge-коммита, после чего Roman сможет отправить его в GitHub.

**Disposition:** Coordinator готовит отдельный worktree для продолжения WEB. Это разрешение не создаёт и не активирует роль; роли Roman запускает на соответствующих gates.

## 2026-10-15 — Знаменатель прогресса WEB

- Roman утвердил модель: каждая из трёх недель курса считается отдельным модулем с самого начала. Закрытые и ещё не наполненные недели входят в знаменатель как незавершённые; общий знаменатель остаётся равен трём.
- Модуль считается завершённым после выполнения его реальных лабораторных заданий. Добавление контента не меняет знаменатель.

**Disposition:** решение записано в HL §12 как поправка A1; применить её к §3, §4 и §5 и повторно заморозить контракт.

## 2026-10-15 — Локальное хранение и сброс прогресса WEB

- Roman подтвердил хранение прогресса в локальном профиле Google Chrome и отказался от отдельного файла данных в папке проекта. Для работы курса не нужны регистрация или вход.
- Кнопка сброса должна быть доступна непосредственно на экране прогресса, без перехода в настройки. После нажатия показывается обычное подтверждение с выбором «Отмена» или «Сбросить»; дополнительный ввод не нужен.
- Такое хранение привязывает прогресс к профилю Chrome и устройству; автоматическая синхронизация между устройствами не предполагается. Конкретный браузерный механизм и его поведение при локальном офлайн-запуске ещё требуют исследования. Сохранение баллов остаётся отдельным нерешённым решением.

**Disposition:** одобренная Roman поправка A2 внесена в HL §12 и применена к замороженным разделам. Перед реализацией нужно исследовать локальные ограничения Chrome для выбранного режима запуска.
