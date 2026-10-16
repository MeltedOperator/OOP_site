# Challenge — «Что может опровергнуть конфигурации?»
> **Mindset:** Критик. Атакуем каждый вариант и требуем доказательство для того, что должно выжить.
> Parent: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md)
> Goal: Подготовить понятный локальный каркас OOPoman, в котором студент видит маршрут курса и сохраняемый прогресс в профиле Chrome без регистрации и входа.
> Producer unit: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> Parent Coordinator: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> Activation / selection: owner-direct `/tfw-research OOP_20261015-164702_WEB`; `reporting: native-gates`, `dialogue: tfw-gates-only`; Challenge разрешён Coordinator gate после revised Extract.
> Coordination authority: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> Iteration 1; focused; один проход.

## Consistency Check

### Incompatible pairs

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|---|---|---|---|---|
| D1: запуск | Прямая страница `file://` | D3: хранение | `chrome.storage.local` | Это API области Chrome extension; обычная локальная web-страница не является extension context и не получает эту область напрямую. |
| D1: запуск | Прямая страница `file://` | D3: хранение | Extension-origin Web Storage/IndexedDB | Данные принадлежат origin расширения, а открытая страница остаётся в `file://` origin; это разные контексты хранения. |
| D1: запуск | Unpacked Chrome extension | D3: хранение | Web Storage/IndexedDB страницы `file://` | При открытии UI как extension page его данные принадлежат extension origin, а не file-origin страницы. |
| D1: запуск | Прямая страница `file://` | D4: сброс | `chrome.storage.local.remove()` | Нельзя использовать API расширения напрямую из `file://` страницы. |

Пары «extension + PDF в `OOP-course/`» не исключены: Chrome документирует ручное разрешение доступа к file URLs. Оно является обязательным условием и ещё не доказывает удобный сценарий открытия PDF в OOPoman. Удаление самого расширения — отдельная потеря данных вне требования; оно не считается reset альтернативой.

### Surviving configurations

| Config | D1 | D2 | D3 | D4 | D5 | Notes |
|---|---|---|---|---|---|---|
| C1 | Прямая `file://` | Относительные локальные PDF | `localStorage` file-origin | Сброс выбранных ключей внутри UI после подтверждения | HTML и ресурсы локальные | Совместима как кандидат; origin и доступность хранилища в Chrome не подтверждены. |
| C2 | Прямая `file://` | Относительные локальные PDF | IndexedDB file-origin | Сброс выбранных записей внутри UI после подтверждения | HTML и ресурсы локальные | Явный кандидат из Gather; его file-origin поведение также не подтверждено. |
| C3 | Unpacked extension | PDF-копии рядом с extension | `chrome.storage.local` | `remove()` только ключей прогресса после подтверждения | Локальная папка, Developer mode | Самый документированный storage-кандидат; UI, restart и offline должны быть проверены. |
| C4 | Unpacked extension | PDF в `OOP-course/` через file URLs | `chrome.storage.local` | `remove()` только ключей прогресса после подтверждения | Developer mode плюс разрешение file URLs | Совместима условно; доступ к точной папке и PDF viewer остаётся непроверенным. |
| C5 | Unpacked extension | PDF-копии рядом с extension | Extension-origin Web Storage/IndexedDB | Сброс выбранного состояния UI после подтверждения | Локальная папка, Developer mode | Возможно, но Chrome docs расходятся по очистке web storage при очистке browsing data. |
| C6 | Unpacked extension | PDF в `OOP-course/` через file URLs | Extension-origin Web Storage/IndexedDB | Сброс выбранного состояния UI после подтверждения | Developer mode плюс разрешение file URLs | Совместима условно; два непроверенных края: file URLs и extension web-storage persistence. |

### Unexpected survivors

- **C2:** IndexedDB из прямого `file://` остался как отдельный вариант после явного включения Coordinator. Ни один изученный источник не подтверждает его поведение для этой файловой структуры Chrome; не удаляем его по отсутствию доказательства, а оставляем на прототипную проверку.
- **C4/C6:** сохранение PDF в `OOP-course/` может совместить отдельную папку исходников с extension UI только при ручном file-URL доступе; руководство подтверждает разрешение, но не весь UX OOPoman.

## Findings

### C1/C2 — локальное открытие не доказывает локальное сохранение

**Угроза H1:** `file://` открывает локальный документ без собственного HTTP-сервера, но H1 требует, чтобы каркас продолжал работать офлайн. Если критические скрипты, шрифты или данные окажутся на CDN/сайте, сам факт локального HTML не спасает офлайн-сценарий. Для текущей задачи допустимо оставить обычные внешние ссылки сетевыми, но обязательные функции должны иметь локальные ресурсы.

**Угроза H2:** HTML Standard связывает Web Storage с origin; URL Standard оставляет origin `file:` определению user agent. Документация не доказывает, что Chrome сохранит `localStorage` или IndexedDB для OOPoman, вернёт те же данные после закрытия/открытия браузера или изолирует данные нескольких путей. H2 для C1/C2 остаётся непроверенной.

### C3/C4 — `chrome.storage.local` помогает, но не доказывает продуктовый reset

Chrome описывает `chrome.storage.local` как локальное хранилище расширения, даёт `remove()`/`clear()`, предупреждает, что uninstall удаляет данные, и предлагает этот механизм для сохранения состояния. Это поддерживает H2 для C3/C4 при использовании одного профиля и том же ID расширения. Переключение в `storage.sync` изменило бы границы — при включённой синхронизации данные переходят на другие Chrome-браузеры вошедшего пользователя, что выходит за требование без аккаунта.

Остаются две отдельные проверки: сохранить и загрузить тестовый прогресс после закрытия/повторного запуска Chrome при отключённой сети; реализовать со страницы прогресса подтверждение «Отмена / Сбросить» так, чтобы отмена оставляла данные, а подтверждение удаляло только OOPoman progress keys. API не подтверждает реализацию этого UI или отсутствие ошибок интеграции.

### C3–C6 — extension files имеют удобную изоляцию ценой setup и границ доступа

Chrome показывает локальную установку unpacked extension через `chrome://extensions`, Developer mode и выбор каталога. Это устраняет HTTP-сервер и аккаунт, но добавляет обязательное ручное действие для первого пользователя и dev-mode зависимость. Сама инструкция не проверяет cold-start offline в целевом Chrome, сохранение установки после обновления/перезапуска или пригодность Developer mode как долгосрочного пользовательского способа запуска. Пакет должен содержать обязательные ресурсы; реальный набор URL приложения ещё нужно инвентаризировать.

При переносе PDF в extension package страница не обращается к отдельной папке. Копирование должно оставить исходные PDF неизменёнными; рассинхронизация копии и источника становится отдельным обслуживанием.

### C4/C6 — file-URL permission не равен уже доказанному чтению папки

Chrome требует вручную разрешить расширению работу с `file://`; документация даёт также `isAllowedFileSchemeAccess()` для проверки флага. Это потенциальная точка отказа после установки, смены профиля или отключения разрешения. Право запуска на file URLs не является прямым доказательством, что выбранный UI может обнаружить, читать и открывать конкретные PDF из `OOP-course/` без дополнительных действий пользователя. C4/C6 остаются условными до прототипа с минимальным разрешением и реальными путями папок.

### C5/C6 — альтернативные extension web storage не снимают неопределённость

Chrome API reference не рекомендует Web Storage для расширений; его service worker не видит Local Storage, а API reference и статья Storage and cookies по-разному описывают сохранение web storage при очистке browsing data. H2 требует устойчивости при обычном офлайн-перезапуске, не после очистки профиля, так что это расхождение не само по себе опровергает C5/C6. Но оно делает поведение менее предсказуемым, чем `chrome.storage.local`; для проверки нужны отдельные варианты localStorage и IndexedDB и явное удаление только OOPoman state.

## H1 / H2 result

| Hypothesis | Result from documents | What remains empirical |
|---|---|---|
| H1 — офлайн без собственного сервера/HTTP запуска | Оба режима могут открывать локальные ресурсы без собственного HTTP-сервера. Chrome документирует загрузку unpacked extension из папки и ограничивает extension scripts/object resources своими пакетными файлами. Это поддерживает возможность H1 при полном локальном наборе обязательных ресурсов. | Проверить cold-start и повторный старт в целевом Windows Chrome без сети, инвентаризировать обязательные URL приложения, проверить PDF-ссылки. Ни один документ не исполнял OOPoman. |
| H2 — сохранять/сбрасывать прогресс в профиле без аккаунта | `chrome.storage.local` документирован как локальная область расширения с адресными операциями удаления; localStorage/IndexedDB file-origin зависят от неподтверждённого Chrome file-origin поведения. | Для каждого оставшегося режима записать прогресс, закрыть/открыть Chrome offline, проверить то же состояние в том же профиле, затем Cancel и Confirm reset; убедиться в отсутствии стирания чужих данных и проверить повторное открытие PDF. |

**Вывод Challenge:** документы оставляют все шесть вариантов для прототипной проверки, но только extension route с `chrome.storage.local` имеет прямо задокументированное локальное хранилище с key-level removal. Это evidence status, не выбор стека или окончательный победитель. Ни H1 в конкретном пакете, ни H2 вместе с требуемым UI-сбросом пока не доказаны эмпирически.

## OODA — focused pass 1/1

- **Observe:** проверены первичные Chrome for Developers источники по unpacked setup, storage, permission к file URLs и платформенным границам установки, а также WHATWG HTML/URL Standards из предыдущих stage artifacts.
- **Orient:** конфликтуют лишь пары storage-контекстов между `file://` и extension; PDF-путь независим при условии явного разрешения. Источники поддерживают локальность extension package, но не OOPoman offline behavior.
- **Decide:** H1 условно возможна при всех обязательных ресурсах локально; H2 по file-origin не подтверждена, по `chrome.storage.local` документирована как механизм, но UI/reset/restart требуют проверки. Никакое локальное утверждение кода не подтверждено, код не исследовался.
- **Act:** сохранить все шесть вариантов, вывести прототипные проверки по H1/H2 и запросить у Coordinator решение о следующем шаге.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Пары file-origin и extension storage несовместимы, но шесть конфигураций из Extract остаются логически возможными. `chrome.storage.local` — наиболее документированный механизм локального state, а Developer mode и file URL permission создают setup/UX зависимости. | Ни одной конфигурацией не доказано поведение конкретного OOPoman пакета. Нужен будущий прототип для офлайн cold-start/restart, восстановления progress и подтверждённого reset; `file://` storage остаётся особенно неопределённым. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Pairwise incompatibility checked? Surviving configurations listed?

Stage complete: YES
→ Coordinator decision: proceed to synthesis, or request one focused challenge adjustment.

## Sources

- [Chrome: Hello World extension / Load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world) — проверено 2026-10-16; каталог, Developer mode и ручная загрузка.
- [Chrome: `chrome.storage` API](https://developer.chrome.com/docs/extensions/reference/api/storage) — проверено 2026-10-16; локальная область, key removal, uninstall, session и sync.
- [Chrome: Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) — проверено 2026-10-16; ручное разрешение extension file URLs и проверка его состояния.
- [Chrome: Match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns) — проверено 2026-10-16; `file:///` совпадает с локальными файлами и требует user grant.
- [Chrome: Alternative extension installation methods](https://developer.chrome.com/docs/extensions/how-to/distribute/install-extensions) — проверено 2026-10-16; ограничения внешнего CRX/развёртывания на Windows; Web Store остаётся вне scope.
- [Chrome: Extension pages CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) — проверено 2026-10-16; ограничения extension-page scripts и packaged resources.
- [WHATWG HTML Standard: Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute) — проверено 2026-10-16; `localStorage` привязан к origin и может выдавать `SecurityError` для opaque origin.
- [WHATWG URL Standard: Origin](https://url.spec.whatwg.org/#origin) — проверено 2026-10-16; для `file:` origin implementation-defined.
