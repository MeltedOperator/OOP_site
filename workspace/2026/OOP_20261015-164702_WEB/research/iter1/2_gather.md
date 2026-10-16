# Gather — «Что пока неизвестно?»
> **Mindset:** Исследователь. Сначала карта неизвестного; пока не выбираем победителя.
> Parent: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md)
> Goal: Подготовить понятный локальный каркас OOPoman, в котором студент видит маршрут курса и сохраняемый прогресс в профиле Chrome без регистрации и входа.
> Producer unit: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> Parent Coordinator: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> Activation / selection: owner-direct `/tfw-research OOP_20261015-164702_WEB`; `reporting: native-gates`, `dialogue: tfw-gates-only`; Gather разрешён Coordinator gate после Briefing.
> Coordination authority: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> Iteration 1; focused; один проход.

## Dimensions

| Dimension | Alt A | Alt B | Alt C |
|---|---|---|---|
| **D1: запуск и размещение приложения** | Открывать локальную страницу `file://` | Загружать unpacked Chrome extension из локальной папки в Developer mode | Устанавливать расширение из Chrome Web Store/внешнего CRX (вне утверждённого офлайн-объёма; условия зависят от ОС) |
| **D2: доступ к исходным PDF в `OOP-course/`** | Ссылки на локальные `file://` PDF рядом с сайтом | Скопировать нужные неизменённые PDF внутрь каталога расширения | Открывать PDF как локальные file URLs после ручного разрешения расширению доступа к file URLs; проверить фактическое чтение/просмотр |
| **D3: контекст и механизм хранения прогресса** | Web Storage/IndexedDB страницы `file://`, привязанные к origin | `chrome.storage.local` в extension origin | Web Storage/IndexedDB страницы расширения `chrome-extension://` |
| **D4: граница сброса и восстановления** | Встроенная кнопка удаляет ключи сайта (`localStorage.clear()` или выбранные ключи) | Кнопка расширения очищает только его `chrome.storage.local` (`clear()` или `remove()`) | Удаление/переустановка расширения; документация говорит, что `storage.local` очищается при удалении расширения |
| **D5: готовность офлайн и действия при первом запуске** | Открыть локальный HTML и локальные ресурсы; проверять, не осталось ли сетевых ссылок | Один раз загрузить unpacked-каталог из Chrome Extensions при включённом Developer mode; дальнейшие ресурсы хранить локально | Использовать установку из Web Store/внешнего источника, требующую получения пакета/обновлений по сети или администраторского развёртывания |

## Findings

### G1 — `file://`: общий стандарт не отвечает за конкретную семантику Chrome

WHATWG HTML связывает `localStorage` с origin документа, описывает его как хранилище дольше текущей сессии и указывает `SecurityError`, если origin opaque или сохранение запрещено политикой. WHATWG URL оставляет значение origin для схемы `file` implementation-defined. Поэтому стандартная модель не доказывает, что разные страницы OOPoman, открытые из разных путей, в Chrome будут иметь один устойчивый origin, что `localStorage` доступен на них или что доступ к соседним PDF безопасен и предсказуем. H1 можно проверить для полностью локального набора ресурсов, но H2, origin-изоляция по пути, повторный запуск и локальные ссылки требуют пробного прототипа именно на целевом Chrome/Windows.

**Ориентация:** не переносить обычные HTTP-origin гарантии и долговечность Web Storage на `file://`.

### G2 — локально загруженное расширение имеет документированный путь запуска и отдельное хранилище

В руководстве Chrome расширение размещается в локальном каталоге с `manifest.json` и файлами ресурсов; в Chrome его загружают через `chrome://extensions`, включив Developer mode и выбрав Load unpacked. Это задаёт локальный путь без собственного HTTP-сервера. **Вывод об offline runtime — inference:** если HTML, скрипты, стили и используемые данные находятся в этом каталоге, запускаемые ресурсы локальны; руководство описывает загрузку из папки, но не является испытанием приложения в отключённой сети.

Для данных `chrome.storage` требуется manifest permission `storage`. `storage.local` хранит данные локально, квота по документации — 10 MB, а удаление расширения очищает эту область. У `StorageArea` есть `clear()` и `remove()`, поэтому приложение может сбрасывать собственное состояние расширения, не предлагая очистить весь профиль Chrome. `storage.session` очищается при перезапуске браузера и не подходит для межсессионного прогресса. `storage.sync` синхронизирует данные на браузеры Chrome вошедшего в аккаунт пользователя, если sync включён; он не нужен задаче без аккаунта.

**Ориентация:** `chrome.storage.local` — документированный кандидат для H2 расширения; конкретный UX reset и открытие курса офлайн ещё не испытаны.

### G3 — доступ расширения к PDF в отдельной папке не следует из его установки

Chrome требует от пользователя вручную включить «Allow access to file URLs», если расширение должно работать с `file://`. Это делает отдельные локальные PDF возможным направлением исследования, но документация не подтверждает конечный сценарий навигации/просмотра или чтения файлов из `OOP-course/` для этого сайта. Разрешение расширению работать на file URLs также расширяет его доступ; фактический минимум требуемого доступа и предупреждение пользователю нужно проверить. Альтернативы — держать копии исходных PDF в каталоге расширения или проверять сценарий локального выбора файлов. Исходники не изменять.

### G4 — Chrome-документация расходится по сохранению Web Storage у расширений

Chrome API reference не рекомендует Web Storage для расширений и указывает, что данные `window.localStorage` теряются при очистке истории браузера; другая статья Chrome про Storage and cookies говорит, что очистка browsing data не удаляет данные web storage APIs у расширений. Это противоречие не разрешает обещать сохранность или выборочный сброс через extension `localStorage`/IndexedDB. Для расширения использовать отдельный `chrome.storage.local` как проверяемый кандидат и в последующих стадиях удержать конфликт как ограничение источников.

## OODA — focused pass 1/1

- **Observe:** изучены текущие первичные Chrome for Developers документы о local unpacked extensions, permissions и storage, а также WHATWG HTML/URL Standards; ссылки и оговорки перечислены ниже.
- **Orient:** H1 частично поддерживается локальным запуском из файлов/локальной папки; наличие внешних ссылок должно быть исключено/проверено. H2 имеет более определённый API-кандидат у расширения. В `file://` остаются вопросы origin и хранения; доступ к отдельным PDF не доказан одним фактом установки расширения.
- **Decide:** все критерии Gather выполнены: внешние источники использованы; scope gate Briefing закрыт Coordinator; независимых факторов пять, матрица содержит альтернативы; не выбраны рекомендации.
- **Act:** зафиксировать источники и оставить следующие проверки для Extract/Challenge: поведение Chrome `file://` с несколькими путями и после перезапуска; выборочное удаление state; работа локального PDF-контента без сети; разрешение file URLs и доступ к `OOP-course/`; точные ограничения установки unpacked extension.

## Sources

- [Chrome: Hello World extension / Load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world) — проверено 2026-10-16; локальный каталог, Developer mode, Load unpacked.
- [Chrome: `chrome.storage` API](https://developer.chrome.com/docs/extensions/reference/api/storage) — проверено 2026-10-16; permission, `local`/`sync`/`session`, quotas, clear/remove, удаление расширения.
- [Chrome: Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) — проверено 2026-10-16; ручной доступ расширения к file URLs.
- [Chrome: Storage and cookies](https://developer.chrome.com/docs/extensions/develop/concepts/storage-and-cookies) — проверено 2026-10-16; persistence/eviction Web Storage and extension origin; страница обновлена 2023-09-28 и расходится с API reference по очистке browsing data.
- [Chrome: Alternative extension installation methods](https://developer.chrome.com/docs/extensions/how-to/distribute/install-extensions) — проверено 2026-10-16; внешние CRX/установка имеют платформенные ограничения; не обобщать на `Load unpacked`.
- [WHATWG HTML Standard: Web Storage, `localStorage`](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute) — проверено 2026-10-16; API связан с origin; opaque origin может вызвать `SecurityError`.
- [WHATWG URL Standard: Origin](https://url.spec.whatwg.org/#origin) — проверено 2026-10-16; origin схемы `file` определяется реализацией.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Chrome документирует локальную загрузку unpacked extension и extension-specific storage `chrome.storage.local`; `storage.session` не переживает рестарт, `sync` связано с Chrome Sync. | Chrome-specific origin и сохранение для `file://`; повторный запуск offline в целевом профиле; ограниченный доступ к PDF из отдельной папки; реальное поведение reset; разрешение противоречия в документации Web Storage расширений. |
| По extension API известны операции `clear()`/`remove()` и удаление локальной области при uninstall. | Подтвердить безопасный сброс кнопкой OOPoman без потери других данных или полного удаления расширения. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Dimensions identified?

Stage complete: YES
→ Coordinator decision: proceed to Extract, or request one focused adjustment to this map.
