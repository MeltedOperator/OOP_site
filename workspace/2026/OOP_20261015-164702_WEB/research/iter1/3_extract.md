# Extract — «Какие комбинации видим?»
> **Mindset:** Аналитик. Сводим варианты в конфигурации, не оцениваем и не выбираем.
> Parent: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md)
> Goal: Подготовить понятный локальный каркас OOPoman, в котором студент видит маршрут курса и сохраняемый прогресс в профиле Chrome без регистрации и входа.
> Producer unit: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> Parent Coordinator: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> Activation / selection: owner-direct `/tfw-research OOP_20261015-164702_WEB`; `reporting: native-gates`, `dialogue: tfw-gates-only`; Extract разрешён Coordinator gate после Gather.
> Coordination authority: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> Iteration 1; focused; один проход.

## Configuration Space

Названия столбцов соответствуют D1–D5 из Gather. Использованы только два согласованных режима. Установка из Chrome Web Store/внешнего CRX остаётся явно исключённым сравнительным контекстом по решению Coordinator. Комбинации ниже — варианты для анализа, а не оценки или рекомендации.

| Config | D1: запуск/размещение | D2: PDF из `OOP-course/` | D3: хранение прогресса | D4: сброс | D5: офлайн/первый запуск |
|---|---|---|---|---|---|
| C1 | Прямая страница `file://` | Локальные относительные ссылки на PDF | Web Storage страницы `file://` | Сброс ключей/БД приложения в том же file-origin | Открыть HTML; необходимые ресурсы локальные |
| C2 | Unpacked Chrome extension | Копии исходных PDF внутри extension-папки | `chrome.storage.local` | Удалить только ключи прогресса через `remove()` | Один раз загрузить локальную папку через Developer mode; ресурсы локальные |
| C3 | Unpacked Chrome extension | PDF остаются в `OOP-course/`; открывать их как `file://` после ручного разрешения file URLs | `chrome.storage.local` | Удалить только ключи прогресса через `remove()` | Один раз загрузить локальную папку через Developer mode; PDF доступны локально при нужном разрешении |
| C4 | Unpacked Chrome extension | Копии исходных PDF внутри extension-папки | Extension-origin Web Storage/IndexedDB | Удалить выбранные ключи или БД extension-origin | Один раз загрузить локальную папку через Developer mode; ресурсы локальные |
| C5 | Unpacked Chrome extension | PDF остаются в `OOP-course/`; открывать их как `file://` после ручного разрешения file URLs | Extension-origin Web Storage/IndexedDB | Удалить выбранные ключи или БД extension-origin | Один раз загрузить локальную папку через Developer mode; PDF доступны локально при нужном разрешении |
| C6 | Unpacked Chrome extension | Копии исходных PDF внутри extension-папки | `chrome.storage.local` | Удалить расширение; Chrome документирует очистку его local area при uninstall | Один раз загрузить локальную папку через Developer mode; повторная установка не нужна до удаления |
| C7 | Unpacked Chrome extension | PDF остаются в `OOP-course/`; открывать их как `file://` после ручного разрешения file URLs | `chrome.storage.local` | Удалить расширение; Chrome документирует очистку его local area при uninstall | Один раз загрузить локальную папку через Developer mode; PDF доступны локально при нужном разрешении |

`chrome.storage.local` не комбинируется с прямой страницей `file://`: это extension API. Extension Web Storage/IndexedDB не переносится на origin `file://`. Web Store/CRX installation исключена, а не является третьим кандидатом.

## Findings

### E1 — launch mode определяет пространство хранения, но не положение PDF

У прямой `file://` страницы прогресс должен принадлежать web storage origin самой страницы. WHATWG связывает Local Storage с origin, но origin для `file:` определяется реализацией; значит постоянство и разделение данных по путям нельзя вывести из стандарта. У extension page есть отдельный `chrome-extension://` origin и расширенный API `chrome.storage`. PDF из `OOP-course/` — независимая ось: в расширении их можно хранить рядом с приложением или пытаться открывать из отдельной папки с ручным разрешением file URLs. Точные сценарии загрузки и просмотра остаются не подтверждены документацией.

### E2 — progress reset можно ограничить собственным пространством данных

Для web storage у веб-страницы доступны операции над отдельными ключами и хранилищем origin; HTML Standard определяет `clear()` как удаление пар ключ-значение текущего `Storage`. Для `chrome.storage.local` Chrome даёт `remove()` для конкретных ключей и `clear()` для всей `StorageArea`. Эти API допускают кнопку сброса внутри OOPoman, но прототип должен показать, что используются только данные прогресса и что другие настройки не удаляются. Удаление расширения тоже удаляет `storage.local`, но оно шире кнопки внутри сайта и может потребовать повторного пользовательского setup.

Для расширения `storage.local` имеет локальную область данных и текущую документированную квоту 10 MB; `unlimitedStorage` меняет квоту. `storage.session` не переживает перезапуск, поэтому исключён из C2/C3/C6/C7. `storage.sync` может синхронизировать данные между вошедшими в Chrome браузерами и не подходит для сохранения без аккаунта/синхронизации.

### E3 — offline runtime зависит от полной локальности исполняемых ресурсов

**Документировано:** unpacked extension запускается из локальной папки через Developer mode/Load unpacked; Chrome extension page по CSP загружает скрипты и объекты из собственных packaged resources. Это поддерживает вариант локального запуска без своего HTTP-сервера. **Inference:** если HTML, стили, скрипты, нужные данные и обязательные шрифты/изображения находятся в этой папке, интерфейс может работать без сети после загрузки расширения. Документы не проверяют конкретный OOPoman пакет и не доказывают отсутствие сетевых обращений со стороны его ресурсов. Внешние ссылки могут оставаться сетевыми по границе задачи.

`file://` также не требует своего HTTP-сервера для открытия локального HTML, но стандартные материалы не подтверждают, что Chrome разрешит конкретному файлу работать с локальным хранилищем и соседней папкой так, как требует каркас. Поэтому C1 остаётся конфигурацией для Challenge, не подтверждённой рекомендацией.

### E4 — доступ к локальному PDF в extension route требует отдельного решения

Chrome указывает, что расширению нужен ручной доступ к `file://` URL, если оно должно работать с локальными файлами; для некоторых методов навигации к file URLs это требование действует в Chrome начиная с 118. Одной установки расширения недостаточно, чтобы утверждать доступ к `OOP-course/`. C3/C5/C7 добавляют пользовательское разрешение и нуждаются в проверке открытия PDF в фактическом UI. C2/C4/C6 избегают доступа за пределы extension package, если исходные PDF копируются туда без изменения; последствия дублирования и будущего обновления копий останутся операционным вопросом.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Конфигурационное пространство сводится к семи совместимым вариантам: одна `file://` конфигурация и варианты unpacked extension с локальными PDF/доступом к папке и разными областями хранения/reset. Extension storage API не применим к прямой file-странице. | Для `file://` не подтверждены origin, storage availability, persistence и межпутевое разделение. Не проверено в Chrome чтение PDF из `OOP-course/`, работа offline после рестарта, UX разрешения file URLs и reset на целевом профиле. |
| Для extension route локально загруженный package и `chrome.storage.local` документированы; reset можно ограничить ключами расширения; `storage.session` и `sync` не соответствуют целям. | Реальные ресурсы приложения/внешние ссылки ещё не перечислены; нет пробного прототипа или измеренного поведения. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Configuration Space built from Gather dimensions?

Stage complete: YES
→ Coordinator decision: proceed to Challenge, or request one focused adjustment to the configuration space.

## Sources

- [Chrome: `chrome.storage` API](https://developer.chrome.com/docs/extensions/reference/api/storage) — проверено 2026-10-16; области, квоты, методы `remove()`/`clear()`, данные при uninstall, session и sync.
- [Chrome: Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) — проверено 2026-10-16; ручной доступ extension к `file://`.
- [Chrome: Extension pages CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) — проверено 2026-10-16; local packaged scripts/resources и ограничения extension pages.
- [Chrome: What's new in Chrome Extensions](https://developer.chrome.com/docs/extensions/whats-new) — проверено 2026-10-16; изменение Chrome 118 о навигации extension API к file URLs.
- [WHATWG HTML Standard: Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute) — проверено 2026-10-16; origin-ассоциация и операции над ключами web storage.
- [WHATWG URL Standard: Origin](https://url.spec.whatwg.org/#origin) — проверено 2026-10-16; origin `file:` implementation-defined.
- [Chromium source: `content/browser/site_info.cc` (122.0.6261.117)](https://chromium.googlesource.com/chromium/src/%2B/refs/tags/122.0.6261.117/content/browser/site_info.cc) — проверено 2026-10-16; historical implementation context only; not used to claim current Chrome storage behavior.
