# Gather — «Какие условия нужно зафиксировать до испытания?»
> **Mindset:** Исследователь. Сначала карта условий проверки; пока не выбираем конфигурацию.
> Parent: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md)
> Goal: Подготовить понятный локальный каркас OOPoman, в котором студент видит маршрут курса и сохраняемый прогресс в профиле Chrome без регистрации и входа.
> Producer unit: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> Parent Coordinator: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> Activation / selection: owner-direct `/tfw-research OOP_20261015-164702_WEB`; `reporting: native-gates`, `dialogue: tfw-gates-only`; Gather разрешён Coordinator gate после Briefing.
> Coordination authority: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> Iteration 2; focused; один проход.
> Предшественник: [RES iteration 1](../iter1/RES.md) @ `eef989f46c7314b96c3ee6d1d0d76c4b6e2ae843`.

## Dimensions

| Dimension | Alt A | Alt B | Alt C |
|---|---|---|---|
| **D1: источник страницы / install context** | C1–C2: прямой HTML `file://` | C3–C6: unpacked extension, Developer mode, Load unpacked | Не добавлять Web Store/CRX: исключено task scope |
| **D2: storage context** | C1 `localStorage` file-origin; C2 IndexedDB file-origin | C3–C4 `chrome.storage.local` | C5–C6 extension-origin Web Storage; localStorage и IndexedDB фиксировать как отдельные подварианты |
| **D3: расположение PDF** | C1–C2 и C3/C5: относительный путь или копия рядом с локальной страницей/в пакете | C4/C6: PDF остаются в `OOP-course/` и открываются как file URLs | Для extension с пакетной копией сверить копию с исходным PDF по хешу, не редактируя оригинал |
| **D4: offline coverage** | Только entry HTML локальный | Весь обязательный код/данные/шрифты/иконки/PDF локальны | Критический runtime-ресурс запрашивается извне — H1 для этого сценария не проходит; необязательная ссылка может быть недоступна |
| **D5: операция reset** | Cancel: состояние сохраняется | Confirm: удалить только заранее перечисленные OOPoman keys/records | Общая очистка всего origin/профиля или uninstall не подходит как выполнение in-app reset |
| **D6: проверочная среда и доказательство** | Неописанный рабочий профиль/сеть | Повторяемый локальный test profile, версия Chrome/Windows и сетевой режим записаны | Нет сохранённой исходной и конечной проверки — результат нельзя классифицировать |

Имена C1–C6 и их комбинации остаются такими, как установлены в [Extract iteration 1](../iter1/3_extract.md). D6 задаёт вариативность протокола, а не продуктовый выбор.

## Findings

### G1 — unpacked setup является ручным предусловием; file access — отдельный grant

Текущий Chrome tutorial требует открыть `chrome://extensions`, включить Developer mode и выбрать каталог через Load unpacked. В этой инструкции нет установки через сервер приложения; она сама по себе не доказывает холодный офлайн-запуск OOPoman, доступность после перезапуска или сохранение одинакового extension ID при любом способе переноса каталога. Для повторяемого протокола нужно фиксировать профиль, путь пакета, версию Chrome и идентификатор расширения; после закрытия браузера проверять тот же профиль и ту же установленную extension identity.

Если расширение должно работать с `file://` URL, Chrome просит отдельно разрешить это в настройках расширения; API умеет сообщить состояние grant. Это условие для C4/C6, а не доказательство того, что UI откроет PDF из точного `OOP-course/` пути. C1/C2 и C3/C5 не требуют extension file-URL grant для описанного в Extract PDF-сценария. Прямое открытие PDF и чтение PDF кодом расширения — разные UX/доступы; будущая проверка должна зафиксировать фактический путь и результат, не выводя их из наличия checkbox.

### G2 — offline проверка должна покрывать весь критический граф ресурсов

Для extension pages актуальная Chrome CSP описывает загрузку скриптов и объектов из собственных packaged resources и запрещает расслабить минимальную extension-page политику для удалённого кода. Tutorial помещает manifest и файлы расширения в локальный каталог. Поэтому для C3–C6 нужно до отключения сети инвентаризировать каждый ресурс, необходимый для первого экрана и сохранения прогресса: HTML, JS, CSS, JSON/данные, изображения/иконки, шрифты и иные исполняемые зависимости. Для C1/C2 нужен такой же аудит локального дерева `file://`. Сеть отключается после подготовки тестовой среды; отсутствие ошибок одного статического открытия не доказывает повторный cold-start или persistence.

Если обязательный исполняемый extension ресурс не находится в пакете и требует сети, данный MV3 extension-кандидат не удовлетворяет выбранному offline/no-server условию. Для иных сетевых данных/ссылок протокол должен отличать критический путь от необязательных внешних ссылок; в этом исследовании конкретный пакет не инвентаризирован.

### G3 — документы описывают storage API и ручное удаление, но не интеграционный reset

Chrome описывает `chrome.storage.local` как данные локально для машины, перечисляет `get()`, `remove()` и `clear()`, сообщает о лимите 10 MB и об удалении данных при uninstall. Для H2 подходящая проверка должна использовать один явно выделенный список ключей прогресса; Confirm не должен чистить другие app/settings keys, Cancel не должен менять ни одного ключа. `storage.session` не подходит для межзапускового состояния, `storage.sync` включил бы Sync-поведение, если пользователь вошёл и включил синхронизацию. API docs не подтверждают UI, последовательность асинхронного сохранения либо корректную интеграцию OOPoman.

Для C1/C2 WHATWG связывает `localStorage` с origin и допускает `SecurityError` для opaque origin/политики, а URL Standard оставляет `file:` origin реализации (с opaque origin как fallback при сомнении). Это не устанавливает, как конкретная версия Chrome хранит данные отдельных путей в рассматриваемой раскладке. Для C5/C6 extension web storage имеет дополнительное расхождение в официальных Chrome docs: API reference говорит о потере при очистке browsing history, а Storage and cookies утверждает, что web storage extension не очищается при browsing-data clearing; последняя страница датирована 2023-09-28. Это расхождение касается очистки данных, не требуемого обычного перезапуска. Не включать очистку профиля в критерий обещанного поведения; если C5/C6 проверяются, указать Web Storage API и вид теста отдельно. Протокол не должен выдавать разрешение на reset всему профилю.

### G4 — документированное ограничение не исключает шесть кандидатов целиком

На текущем источниковом срезе прямого документального противоречия frozen H1/H2 нет: все шесть конфигураций сохраняются как прототипные кандидаты. Условия отсева в конкретном испытании: не локальные обязательные ресурсы / сеть для критического старта; storage не доступен или не переживает offline restart; Confirm затрагивает чужие данные или Cancel меняет прогресс; необходимый PDF не открывается по заданному локальному пути. Для C4/C6 отсутствие file URL grant делает их путь неполным, но Chrome позволяет пользователю явно включить разрешение. Для C1/C2 и C5/C6 поддержка Chrome не следует из одного стандарта/API и остаётся эмпирической.

### Предварительная карта наблюдений для Extract

| Check | Наблюдаемый результат, который протокол должен собирать | Что результат не доказывает сам по себе |
|---|---|---|
| Offline start / restart (H1) | Открывается начальный маршрут в чистой test profile без запросов критических ресурсов; повторить после полного выхода и нового запуска Chrome без сети. | Локальный HTML или первый экран не доказывает все переходы по курсу, PDF или повторный старт. |
| Required-resource audit (H1) | Manifest списка URL/файлов помечает каждый как required/optional и local/network; DevTools network/errors фиксируют попытки во время сценария. | Один успешный запуск с уже закэшированным ресурсом не доказывает его локальность. |
| Save/read (H2) | Создать заданное состояние, закрыть Chrome, отключить сеть, открыть ту же конфигурацию тем же профилем; состояние совпадает с ожидаемым. | Запись до закрытия не доказывает persistence между браузерными сессиями. |
| Cancel reset (H2) | После Cancel целевой progress sentinel и соседний unrelated sentinel неизменны. | Наличие диалога не подтверждает, что обработчик Cancel безопасен. |
| Confirm reset (H2) | Удалены только заранее перечисленные OOPoman progress records; unrelated sentinel остаётся; пустое состояние показано после повторного чтения. | Удаление всего storage partition не удовлетворяет выборочному reset. |
| PDF access | Каждый согласованный PDF открыт из указанного пути; для C3/C5 копии сверены с исходником, для C4/C6 recorded file-access grant. | Permission checkbox не доказывает конечный viewer UX. |

## OODA — focused pass 1/1

- **Observe:** изучены актуальные на 2026-10-16 официальные Chrome extension docs и живые WHATWG HTML/URL Standards; Chrome storage reference и Storage and cookies дают разные формулировки о Web Storage при очистке browsing data.
- **Orient:** unpacked setup, `chrome.storage.local.remove()` и file URL grant документированы; они задают сценарии/предусловия, но не подтверждают реализацию. CSP требует локального extension кода/объектов; file-origin storage и OOPoman offline runtime остаются платформенно/эмпирически неопределёнными.
- **Decide:** оставляем C1–C6; H1/H2 переводятся в повторы cold-start/restart, storage readback, Cancel/Confirm и PDF. Для воспроизводимости нужен тестовый локальный профиль и запись версии/пути/grant/network status.
- **Act:** передать карту измеримых результатов в Extract. В Gather не запускались код, prototype или Chrome-сценарий; ни одно поведение OOPoman не объявлено доказанным.

## Sources

- [Chrome: Hello World extension / Load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world) — открыто 2026-10-16; страница отмечена как updated 2022-10-04; локальный каталог, Developer mode, Load unpacked.
- [Chrome: `chrome.storage` API](https://developer.chrome.com/docs/extensions/reference/api/storage) — открыто 2026-10-16; local/sync/session, machine-local scope, 10 MB limit, remove/clear, uninstall, key access.
- [Chrome: Storage and cookies](https://developer.chrome.com/docs/extensions/develop/concepts/storage-and-cookies) — открыто 2026-10-16; страница updated 2023-09-28; extension Web Storage persistence statement.
- [Chrome: Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) — открыто 2026-10-16; отдельное ручное разрешение `file://` access.
- [Chrome: Extension pages CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) — открыто 2026-10-16; packaged local scripts/objects и minimum extension-page policy.
- [WHATWG HTML Standard: Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute) — открыто 2026-10-16; `localStorage` origin association и `SecurityError` при opaque origin/policy.
- [WHATWG URL Standard: Origin](https://url.spec.whatwg.org/#origin) — открыто 2026-10-16; `file:` origin оставлен реализации, fallback opaque origin.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Для каждой конфигурации можно задать наблюдаемые проверки H1/H2: список ресурсов и offline cold-start/restart; storage readback; безопасные Cancel/Confirm; фактический PDF path. Официальные документы задают ручной setup/grant и ограничения extension resources, но не исключают C1–C6 без знания пакета/прототипного результата. | Не известны целевая версия Windows/Chrome и реальные обязательные ресурсы OOPoman; не наблюдены Chrome file-origin behavior, сохранение после рестарта, Confirm/Cancel implementation и PDF viewer path. В Chrome docs сохраняется wording conflict о Web Storage после очистки данных; он вне обычного restart-сценария. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Dimensions identified?

Stage complete: YES
→ Coordinator decision: proceed to Extract, or request one focused adjustment to the validation dimensions.
