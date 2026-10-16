# Extract — «Как провести одинаковые проверки C1–C6?»
> **Mindset:** Аналитик. Собираем повторяемый протокол из Gather; не исполняем и не ранжируем кандидатов.
> Parent: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md)
> Goal: Подготовить понятный локальный каркас OOPoman, в котором студент видит маршрут курса и сохраняемый прогресс в профиле Chrome без регистрации и входа.
> Producer unit: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> Parent Coordinator: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> Activation / selection: owner-direct `/tfw-research OOP_20261015-164702_WEB`; `reporting: native-gates`, `dialogue: tfw-gates-only`; Extract разрешён Coordinator gate после Gather.
> Coordination authority: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> Iteration 2; focused; один проход.
> Предшественник: [RES iteration 1](../iter1/RES.md) @ `eef989f46c7314b96c3ee6d1d0d76c4b6e2ae843`; [Gather iteration 2](2_gather.md) — предыдущий stage текущей итерации.

## Configuration Space

Сохраняются шесть комбинаций из Extract iteration 1. Для C5/C6 исходная запись объединяет localStorage и IndexedDB; чтобы результат был воспроизводим, каждый из этих механизмов запускается как отдельный subcase (LS / IDB). Такое разбиение не создаёт нового решения или победителя. Каждая строка использует отдельный чистый локальный test profile; внутри строки тот же профиль, стабильный путь приложения и та же extension identity используются до и после полного перезапуска Chrome.

| Config | D1: источник страницы / install | D2: storage under test | D3: PDF path | Setup / prerequisites | Repeatable scenario and observable outcomes |
|---|---|---|---|---|---|
| C1 | Прямой `file://` | Page `localStorage` | Локальные relative PDF из `OOP-course/` | Зафиксировать одинаковый абсолютный путь entry HTML и PDF; отдельный пустой Chrome profile, Sync/sign-in off | Offline cold-start + повторный запуск; UI/прогресс открывается; progress marker переживает закрытие Chrome; Cancel сохраняет marker; Confirm удаляет только объявленные OOPoman keys; sample PDF открывается по указанному пути. |
| C2 | Прямой `file://` | Page IndexedDB; фиксировать имя DB, object store и тестовый key | Те же relative PDF | Как C1; отдельный профиль C2; зафиксировать абсолютный путь и схему DB/object store | Те же H1/PDF шаги; marker переживает полный перезапуск; Cancel ничего не меняет; Confirm удаляет progress records или только выделенную OOPoman DB, unrelated sentinel сохраняется. Не использовать `deleteDatabase()` для общей DB с посторонними данными. |
| C3 | Unpacked extension, локальная папка, Developer mode + Load unpacked | `chrome.storage.local` | Копии согласованных PDF внутри пакета | Отдельный чистый профиль; локальный пакет с manifest; записать extension ID и package hash; сверить хеши копий с исходниками | Setup и первый UI запуск при сети off; offline/restart checks; записать/прочитать progress; Cancel сохраняет ключи; Confirm вызывает только выбранные progress keys/records, unrelated key остаётся; открыть пакетную PDF-копию. |
| C4 | Unpacked extension | `chrome.storage.local` | Исходные PDF остаются в `OOP-course/`, путь `file://` | Как C3, плюс явный file-URL access grant для этого профиля; записать grant state и точный путь PDF | Те же storage/offline checks; открыть PDF из исходного пути действием, предусмотренным прототипом. Если отсутствует grant или пользовательский путь не открывает PDF, сценарий для C4 не пройден; grant сам по себе не PASS. |
| C5 | Unpacked extension | Отдельные прогоны C5-LS (`localStorage` extension page) и C5-IDB; не объединять результаты | Копии PDF внутри пакета | Отдельный чистый профиль на каждый storage subcase; записать, какой extension context читает/пишет данные; для C5-LS не предполагать доступ service worker к localStorage | Для каждого subcase те же cold-start/restart, readback, Cancel/Confirm и PDF проверки; локализовать результат LS vs IDB. Сохранение/сброс проверяются штатным UI, а не ручной очисткой из DevTools. |
| C6 | Unpacked extension | Отдельные прогоны C6-LS и C6-IDB в extension origin | PDF остаются в `OOP-course/`, открываются как file URLs | Как C5 на отдельном профиле, плюс file-URL grant и точный путь | Каждый subcase проходит те же storage/offline/reset checks и открывает PDF из отдельной папки; отсутствие разрешения/успешного PDF UX отмечается отдельно от storage результата. |

## Findings

### E1 — общая подготовка теста

1. **Зафиксировать baseline:** Windows edition/build; Chrome version, channel и полный version string из `chrome://version`; дата; профильный ID без персональных путей; Sync/sign-in off, обычный режим (не incognito); версия/хеш исходного набора, точные пути entry HTML, пакета и PDF. Для каждого extension run записать ID расширения и grant `file://`.
2. **Оградить данные:** на каждую конфигурацию и каждый C5/C6 storage subcase использовать пустой локальный test profile без личных данных. Для проверки restart использовать тот же профиль; между вариантами не переносить его storage. Сохранять исходные PDF неизменными.
3. **Инвентаризировать required resources до offline:** таблица файла/URL, тип, локальное место, required или optional, нужен на первом экране / маршруте / для progress / для PDF. Включить JS, CSS, JSON/данные, шрифты, изображения, manifest, runtime dependencies и ссылки из CSS. Для extension обязательный исполняемый код должен находиться в package; критический ресурс, требующий сеть, означает H1 FAIL для этой конфигурации.
4. **Убрать cache как объяснение:** открыть DevTools до навигации, Network → `Disable cache`, `Preserve log`; выбрать `Offline` для диагностики запросов. Для итогового cold-start/restart дополнительно отключить сетевой адаптер ОС и записать способ offline, чтобы не считать только DevTools emulation доказательством отсутствия внешней связи.
5. **Запустить сценарии:** при offline открыть конфигурацию впервые из указанного пути; пройти каждую обязательную страницу/переход, создать фиксированный progress state; выполнить ниже тест reset; полностью закрыть Chrome и все его процессы, открыть тем же профилем при offline, повторить readback/маршрут/PDF. Записать результат отдельными `PASS` / `FAIL` / `INCONCLUSIVE`, с точным шагом и причиной.

### E2 — H1: offline cold-start и restart

**PASS на конфигурацию:** с пустым тестовым профилем и cache disabled приложение открывает начальный экран и заданный маршрут при выключенной сети; после полного выхода и нового запуска Chrome тот же entry открывается и маршрут остаётся доступен. Каждый required item из inventory успешно загружается локально; нет failed required requests, сетевой зависимости, error/blank screen. Необязательные внешние ссылки могут быть недоступны и не включаются в core-route pass.

**FAIL:** любой обязательный ресурс запрашивается только по сети/не загружается, или first launch/restart не достигает обязательного экрана/маршрута. Успех первой вкладки при warm cache не считается. Отдельно отметить Chrome setup (unpacked Developer mode), отсутствие/наличие `file://` grant и extension ID после рестарта; это наблюдения setup, не вывод из CSP.

DevTools Network умеет выключить cache, эмулировать Offline, сохранять лог между навигациями и экспортировать sanitized HAR. Лог открытого DevTools покрывает только requests, зарегистрированные после начала записи; поэтому inventory локальных файлов — отдельное evidence. DevTools Offline — диагностический режим, а не замена OS network-off подтверждению.

### E3 — H2: persistence, Cancel и selective Confirm

**Seeded state перед действиями:** через UI создать фиксированные progress markers (например, одна начатая lab и один незавершённый модуль). Перед reset записать ожидаемые values/keys. Добавить или заранее иметь unrelated sentinel в той же области хранения, но вне списка OOPoman progress; документировать способ его создания. Это fixture только теста, не новая пользовательская функция.

1. Считать marker через UI и read-only инспектор, если доступен; закрыть все окна/процессы Chrome.
2. Запустить тот же профиль и config offline; проверить те же значения до reset. Несовпадение, ошибка доступа или пустой state — FAIL по persistence; если состояние нельзя наблюдать — INCONCLUSIVE.
3. Нажать Reset, выбрать Cancel. После повторного чтения progress и unrelated sentinel должны совпасть с исходными значениями.
4. Снова нажать Reset и выбрать Confirm. После завершения операции и повторного чтения все declared progress markers должны отсутствовать/вернуться в предусмотренное initial state; unrelated sentinel и non-progress setting должны остаться прежними. UI должен отображать сброшенное состояние.
5. Для IndexedDB отдельно записать DB/store/key names. Допустимы удаление точных records/keys либо удаление полностью OOPoman-owned DB. Запрос удалить всю shared DB, весь origin или весь browser profile — FAIL по границе H2. Chrome `chrome.storage.local.remove()` принимает выбранные item keys; `clear()` стирает всё в этой storage area, поэтому PASS только когда area целиком выделена под progress и не содержит сторонних данных.

В Chrome DevTools расширенное чтение `chrome.storage` доступно с Chrome 132; API page inspector показывает отдельные values и доступен read-only для сверки. Если целевая версия ниже 132 или inspector не работает для данного контекста, результат сверяют через тестовый UI и состояние приложения; нельзя менять values через DevTools между действиями Reset.

### E4 — PDF и доказательная запись

**PASS:** заранее согласованный representative PDF реально открывается по требуемому пользовательскому пути на каждой конфигурации. Для C3/C5 сверить SHA-256 копии с исходным PDF до/после; source PDF не менялся. Для C4/C6 записать grant состояние отдельно от факта открытия; проверить повторное открытие после restart.

На каждый trial сохранить компактную запись: run/config/subcase ID; environment и Chrome version; package/file hashes и paths; required-resource inventory; profile label; file access state; network-off method; точный порядок шагов; expected/observed UI and storage values; PASS/FAIL/INCONCLUSIVE по H1, persistence, Cancel, Confirm и PDF; ссылки на сведения о консоли/DevTools. HAR экспортировать только sanitized. Сырые HAR, screenshot и logs во время выполнения хранить в system temp `tfw/OOP_20261015-164702_WEB/` и удалить после работы; в управляемом evidence record оставить вывод, нужные минимальные captures и их hashes, если последующая утверждённая задача потребует proof.

### Е5 — сводная граница решения

| Configuration | Launch | Storage write/read after restart | Cancel | Confirm scope | PDF | Candidate exit condition |
|---|---|---|---|---|---|---|
| C1 | local `file://` | `localStorage`, same file path/profile | unchanged | only declared keys | relative source PDF opens | required network, storage unavailable/nonpersistent, reset too broad, or PDF path fails |
| C2 | local `file://` | IndexedDB, same file path/profile | unchanged | exact records or OOPoman-owned DB only | relative source PDF opens | same outcomes as C1; record actual file-origin behavior, do not infer it |
| C3 | local unpacked extension | `chrome.storage.local`, same extension ID/profile | unchanged | listed progress keys only | packaged copy opens; hash matches | required runtime code outside package, nonpersistent storage, broad reset, or PDF fails |
| C4 | local unpacked extension | same as C3 | unchanged | listed progress keys only | source PDF opens with manual grant | same, plus missing grant/path failure |
| C5-LS / C5-IDB | local unpacked extension | each API measured separately | unchanged | progress keys/records only | packaged copy opens/hash matches | required context cannot access selected API; H1/H2 or PDF outcome fails |
| C6-LS / C6-IDB | local unpacked extension | each API measured separately | unchanged | progress keys/records only | source PDF opens with manual grant | same, plus missing grant/path failure |

This matrix defines candidate-specific exit conditions; it does not score ease, select a route, or convert absent prototype data into PASS. Any incomplete required observation is `INCONCLUSIVE`, not assumed successful.

## OODA — focused pass 1/1

- **Observe:** Gather dimensions were combined with current official Chrome DevTools guidance for offline/cache/network recording and extension storage inspection, plus the IndexedDB standard's scoped record deletion operations.
- **Orient:** Same-profile restart is measured separately from first launch; required-resource inventory is separate from network log; C5/C6 Web Storage mechanisms are split into subcases; Cancel and Confirm are tested independently against unrelated sentinels.
- **Decide:** One bounded per-candidate trial, with separate fresh profile per candidate/subcase, is enough to yield an auditable protocol without running software. Use `INCONCLUSIVE` when UI/storage/resource evidence is unavailable. No candidate can be selected at this stage.
- **Act:** Return the protocol matrix and observation criteria to the Coordinator. No code, prototype, or Chrome test was run.

## Sources

- [Chrome: Network features reference](https://developer.chrome.com/docs/devtools/network/reference) — opened 2026-10-16; Disable cache, Offline emulation, Preserve log, sanitized HAR and recording boundaries.
- [Chrome DevTools: View and edit extension storage](https://developer.chrome.com/docs/devtools/storage/extensionstorage) — opened 2026-10-16; available from Chrome 132; inspect `chrome.storage` by extension context and delete selected values in inspector (protocol uses inspector read-only).
- [Chrome: `chrome.storage` API](https://developer.chrome.com/docs/extensions/reference/api/storage) — opened 2026-10-16; `local` machine scope, 10 MB, selected `remove()`, broad `clear()`, `session` restart loss, `sync` Chrome Sync, uninstall behavior.
- [Chrome: Hello World extension / Load unpacked](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world) — opened 2026-10-16; local Developer mode setup.
- [Chrome: Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) — opened 2026-10-16; manual grant for `file://` access.
- [Chrome: Extension pages CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) — opened 2026-10-16; packaged resources and minimum extension-page policy.
- [Chrome: Storage and cookies](https://developer.chrome.com/docs/extensions/develop/concepts/storage-and-cookies) — opened 2026-10-16, page updated 2023-09-28; Web Storage persistence statement, noted alongside API reference wording conflict in Gather.
- [WHATWG HTML Standard: Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute) — opened 2026-10-16; origin-associated localStorage and SecurityError cases.
- [WHATWG URL Standard: Origin](https://url.spec.whatwg.org/#origin) — opened 2026-10-16; file origin implementation-defined.
- [W3C Indexed Database API 3.0](https://w3c.github.io/IndexedDB/) — opened 2026-10-16; `IDBObjectStore.delete(query)` removes selected keys/ranges; `deleteDatabase(name)` acts at database scope and can wait on connections.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| C1–C6 each have setup, storage/PDF distinctions, shared observable H1/H2 steps and candidate-specific exit conditions. Evidence includes exact browser/profile/path context, required-resource list, pre/post values, network/console observations and compact result labels. | No target Chrome version, package/resource inventory, test key schema or actual results exist. C5/C6 need separate localStorage and IndexedDB runs; whether any candidate passes depends on a future prototype. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Configuration Space built from Gather dimensions?

Stage complete: YES
→ Coordinator decision: proceed to Challenge, or request one focused protocol adjustment.
