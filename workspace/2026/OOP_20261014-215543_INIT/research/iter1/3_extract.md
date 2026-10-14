# Extract — «Что мы не видим?»

> **Mindset:** Аналитик. Сырые находки превращаю в структуру и показываю неочевидные сочетания.
> Parent: [HL-OOP_20261014-215543_INIT.md](../../HL-OOP_20261014-215543_INIT.md)
> Goal: дать студентам второго курса понятный трехнедельный путь изучения ООП с видимым прогрессом и баллами; курс запускается локально без учетной записи.
> Producer unit: `codex:thread:local:01a13b5e-61b2-7df3-93b1-3dcc6579acb9`
> Parent Coordinator: `codex:thread:local:01a13b48-ed98-7631-85cb-e7691c6a01b3`
> Activation / dispatch source: `journal/20261014-222832__dispatch__9ac4.md @ f29e83302ce885e8cbe9c13156d496c6a3728ca0`
> Coordination authority: `HL-OOP_20261014-215543_INIT.md @ 353e1f31f82bb18d5c4dc59473e3ecee820c5b20`
> Owner offline constraint: `TRACE.md @ 4eab5a8587a75948b6496ef018e418c34faade05`, “INIT offline requirement”.

## Привязка источника Researcher — TRACE

- Платформа и версия: локальный Codex rollout, `source=vscode`, CLI `0.162.0-alpha.17.2`.
- Точный ID: `01a13b5e-61b2-7df3-93b1-3dcc6579acb9`.
- Нативный путь: `C:\Users\tata2\.codex\sessions\2026\10\14\rollout-2026-10-14T22-03-25-01a13b5e-61b2-7df3-93b1-3dcc6579acb9.jsonl`.
- Начало диапазона: `2026-10-14T22:03:25+05:00`; `Asia/Qyzylorda` (`+05:00`); диапазон открыт до следующего контрольного возврата.

## Configuration Space

Из Gather: материалы (сборка / выбор `OOP-course/` / импорт файлов или каталога), runner (основная страница / Worker / sandbox iframe), прогресс (сеанс / `localStorage` / IndexedDB с запросом persistent storage / файл экспорта), запуск (`file://` / локальный HTTP / Chrome extension / хостируемый сайт).

Удалённый runner и хостируемый сайт исключены как несовместимые с требованием полной офлайн-работы и границей владельца. Локальный HTTP требует сервера, который Gather уже отметил как противоречащий границе «без собственного сервера». Остаются три способа доставки материалов, три локальных runner, четыре варианта прогресса и два локальных варианта запуска. Таблица задаёт полный факторизованный cross-product: 3 × 3 × 4 × 2 = **72 конфигурации**. Каждая ячейка «вариант запуска» означает отдельную конфигурацию с `file://` и отдельную с Chrome extension. Это перечисление возможностей, не оценка и не рекомендация.

| Материалы курса | Проверки кода | Прогресс | Варианты запуска |
|---|---|---|---|
| Включены в сборку | Основная страница | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |
| Включены в сборку | Web Worker | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |
| Включены в сборку | Sandbox iframe, отдельный origin | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |
| Пользователь выбирает отдельный `OOP-course/` | Основная страница | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |
| Пользователь выбирает отдельный `OOP-course/` | Web Worker | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |
| Пользователь выбирает отдельный `OOP-course/` | Sandbox iframe, отдельный origin | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |
| Импорт отдельных файлов или каталога | Основная страница | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |
| Импорт отдельных файлов или каталога | Web Worker | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |
| Импорт отдельных файлов или каталога | Sandbox iframe, отдельный origin | Сеанс; `localStorage`; IndexedDB + запрос сохранности; экспорт/импорт файла | `file://`; extension |

## Findings

### E1: Условие офлайн-работы относится ко всем runtime-зависимостям

Код, стили, библиотеки, шрифты, учебные материалы и runner должны быть доступны локально; CDN, удалённые проверки и сетевой API несовместимы. Документация Chrome описывает service worker и Cache API как путь к офлайн-ответам, однако при первом посещении без установленного service worker приложение и его ресурсы загружаются из сети. Поэтому одна только PWA-кэшировка не доказывает работу при первом локальном запуске без Интернета; необходима предварительная локальная поставка ресурсов или уже заполненный cache. [Chrome: проверка офлайн-работы PWA](https://developer.chrome.com/docs/lighthouse/pwa/works-offline?hl=en), [Chrome: application shell](https://developer.chrome.com/docs/workbox/app-shell-model?hl=en).

Для Chrome extension исполняемый код должен быть внутри пакета; Manifest V3 не допускает удалённо размещённый код. Extension origin может получать ресурсы из установленного пакета, что делает его отдельной локальной конфигурацией-кандидатом, но не выбирает этот способ поставки за Roman. [Chrome: extension service worker](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/basics), [Chrome: сетевые запросы расширений](https://developer.chrome.com/docs/extensions/develop/concepts/network-requests).

### E2: Импорт каталога зависит от запуска и origin

Chrome File System Access API позволяет выбрать каталог по явному действию пользователя, но требует secure context. Из изученных документов не следует, что нужный UX выбора `OOP-course/` одинаково доступен при `file://` и extension origin; эти пары остаются кандидатами с обязательной проверкой. Ограниченный импорт через файловый input не эквивалентен полному доступу к каталогу. [Chrome: File System Access API](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access?hl=en).

Материалы, включённые в локальный пакет, снимают необходимость загружать их из сети, но требуют сохранить владельческий источник `OOP-course/`. Отдельный выбираемый каталог лучше сохраняет отдельность источника, однако его доступность зависит от разрешений origin. Ни один из этих путей не выбран.

### E3: Offline не определяет политику долговечности прогресса

Состояние в памяти доступно только текущему сеансу; `localStorage` и IndexedDB не требуют сетевого сервиса; экспорт/импорт переносит данные локальным файлом. Storage Standard не гарантирует безусловное сохранение: оценка квоты приблизительна, `persist()` запрашивает разрешение, пользователь может очистить данные. Следовательно, все варианты могут быть локальными, но обещание восстановления прогресса после закрытия браузера/сброса профиля требует отдельного решения владельца. [WHATWG Storage Standard](https://storage.spec.whatwg.org/).

### E4: Offline не закрывает вопрос безопасного исполнения

Основная страница, Worker и sandbox iframe могут быть локальными компонентами, но это не равнозначные гарантии изоляции. Worker не доказан как security boundary; iframe зависит от sandbox flags и origin; сочетание `allow-scripts` и `allow-same-origin` для same-origin содержимого небезопасно. Ресурсные лимиты runner также не подтверждены. Требование полной офлайн-работы не снимает зарезервированный владельцем выбор модели безопасности. [WHATWG HTML: iframe sandbox](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox), [WHATWG HTML: workers](https://html.spec.whatwg.org/multipage/workers.html).

## Источники

| Точный источник | Проверенный вопрос | Уровень доказательства и пределы |
|---|---|---|
| Chrome for Developers, “Current page does not respond with a 200 when offline”; [URL](https://developer.chrome.com/docs/lighthouse/pwa/works-offline?hl=en) | Service worker, Cache, офлайн-поведение | Руководство Chrome; конкретный проект не запускался. |
| Chrome for Developers, “Service workers and the application shell model”; [URL](https://developer.chrome.com/docs/workbox/app-shell-model?hl=en) | Первый визит и последующие загрузки из cache | Руководство Chrome для сетевой PWA; не подтверждает локальный `file://` пакет. |
| Chrome for Developers, “Extension service worker basics”; [URL](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/basics) | Упаковка кода и запрет удалённого кода MV3 | Руководство Chrome Extensions; соответствие расширения всему продуктовому контракту не проверялось. |
| Chrome for Developers, “Cross-origin network requests”; [URL](https://developer.chrome.com/docs/extensions/develop/concepts/network-requests) | Extension origin и package resources | Руководство Chrome Extensions; будущий пакет не проверялся. |
| Chrome for Developers, “The File System Access API”; [URL](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access?hl=en) | Выбор каталога, secure context, user gesture | Руководство Chrome; точный UX при двух launch-вариантах не установлен. |
| WHATWG HTML Living Standard: [iframe sandbox](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox), [workers](https://html.spec.whatwg.org/multipage/workers.html) | Origin, sandbox flags, worker global scope | Нормативная модель; runner и его лимиты не проверялись. |
| WHATWG Storage Standard; [URL](https://storage.spec.whatwg.org/) | Квоты, origin storage, запрос persistent storage, очистка | Нормативная модель; точные квоты текущего Chrome не установлены. |

Веб-запросов на этапе: 5 (мягкий предел 5). Проектных файлов сверх Briefing/Gather, HL и owner TRACE не исследовалось.

## Checkpoint

| Found | Remaining |
|---|---|
| Офлайн-условие отсеивает удалённые runtime-компоненты и требует локальной доступности всех ресурсов. Сформированы 72 факторизованные комбинации; PWA с одним только cache не гарантирует первый запуск без сети; расширение держит executable code в пакете. | Не подтверждён импорт `OOP-course/` при `file://` и extension; не подтверждён полный ресурсный набор в локальной поставке; остаются вопросы безопасности runner, лимитов и политики сохранения. |

**Sufficiency:**
- [x] External source used? Да, официальная документация Chrome и WHATWG.
- [x] Briefing gap closed? Да, Roman подтвердил обязательную полную офлайн-работу после локального запуска в Chrome.
- [x] Configuration Space built from Gather dimensions? Да, факторизованный cross-product из 72 сочетаний.

Stage complete: YES
→ Next action: Challenge survivors against offline and owner boundaries; do not select a stack, runner security model, or persistence policy.
→ User decision: Нужно ли на следующем этапе отдельно проверить совместимость выбора `OOP-course/` при `file://` и Chrome extension?
