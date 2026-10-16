# Extract — «Какие комбинации видим?»
> **Mindset:** Аналитик. Сводим варианты в конфигурации, не оцениваем и не выбираем.
> Parent: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md)
> Goal: Подготовить понятный локальный каркас OOPoman, в котором студент видит маршрут курса и сохраняемый прогресс в профиле Chrome без регистрации и входа.
> Producer unit: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> Parent Coordinator: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> Activation / selection: owner-direct `/tfw-research OOP_20261015-164702_WEB`; `reporting: native-gates`, `dialogue: tfw-gates-only`; Extract разрешён Coordinator gate после Gather.
> Coordination authority: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> Iteration 1; focused; один проход.
> Revision: updated after Coordinator review at commit `ee5b4c329019c9e33f2ab37ed995f21398c16bb4`; the earlier artifact version remains in Git history.

## Configuration Space

Названия столбцов соответствуют D1–D5 из Gather. Использованы только два согласованных режима. Установка из Chrome Web Store/внешнего CRX остаётся явно исключённым сравнительным контекстом по решению Coordinator. Комбинации ниже — варианты для анализа, а не оценки или рекомендации.

| Config | D1: запуск/размещение | D2: PDF из `OOP-course/` | D3: хранение прогресса | D4: сброс внутри OOPoman после подтверждения | D5: офлайн/первый запуск |
|---|---|---|---|---|---|
| C1 | Прямая страница `file://` | Локальные относительные ссылки на PDF | `localStorage` страницы `file://` (поведение origin в Chrome не подтверждено) | Очистить выбранные ключи прогресса | Открыть HTML; необходимые ресурсы локальные |
| C2 | Прямая страница `file://` | Локальные относительные ссылки на PDF | IndexedDB страницы `file://` (кандидат; поведение origin в Chrome не подтверждено) | Очистить выбранные записи прогресса | Открыть HTML; необходимые ресурсы локальные |
| C3 | Unpacked Chrome extension | Копии исходных PDF внутри extension-папки | `chrome.storage.local` | Удалить только ключи прогресса через `remove()` | Один раз загрузить локальную папку через Developer mode; ресурсы локальные |
| C4 | Unpacked Chrome extension | PDF остаются в `OOP-course/`; открывать их как `file://` после ручного разрешения file URLs | `chrome.storage.local` | Удалить только ключи прогресса через `remove()` | Один раз загрузить локальную папку через Developer mode; PDF доступны локально при нужном разрешении |
| C5 | Unpacked Chrome extension | Копии исходных PDF внутри extension-папки | Extension-origin Web Storage/IndexedDB | Сбросить выбранные ключи/записи OOPoman | Один раз загрузить локальную папку через Developer mode; ресурсы локальные |
| C6 | Unpacked Chrome extension | PDF остаются в `OOP-course/`; открывать их как `file://` после ручного разрешения file URLs | Extension-origin Web Storage/IndexedDB | Сбросить выбранные ключи/записи OOPoman | Один раз загрузить локальную папку через Developer mode; PDF доступны локально при нужном разрешении |

`chrome.storage.local` не комбинируется с прямой страницей `file://`: это extension API. Extension Web Storage/IndexedDB не переносится на origin `file://`. IndexedDB в C2 включён явно из D3 Gather как отдельный проверяемый кандидат; эта конфигурация не утверждает его доступность или сохранение в Chrome `file://`.

Удаление Chrome extension находится вне конфигураций in-app reset. Это отдельный lifecycle-сценарий: Chrome очищает `storage.local` при uninstall, поэтому без предварительного экспорта/резервной копии данные прогресса теряются; последующая установка не восстанавливает их. Uninstall не удовлетворяет замороженному требованию кнопки сброса на экране прогресса с обычным подтверждением.

## Findings

### E1 — launch mode определяет пространство хранения, но не положение PDF

У прямой `file://` страницы кандидаты прогресса — Web Storage и IndexedDB страницы; их поведение в целевом Chrome при конкретных путях ещё не подтверждено. WHATWG связывает Local Storage с origin, но origin для `file:` определяется реализацией; значит постоянство, доступность и разделение данных по путям нельзя вывести из стандарта. У extension page есть отдельный `chrome-extension://` origin и расширенный API `chrome.storage`. PDF из `OOP-course/` — независимая ось: в расширении их можно хранить рядом с приложением или пытаться открывать из отдельной папки с ручным разрешением file URLs. Точные сценарии загрузки и просмотра остаются не подтверждены документацией.

### E2 — in-app reset должен ограничиваться данными прогресса

Замороженный HL требует сброса со страницы прогресса после обычного подтверждения. Поэтому в конфигурациях D4 указано только удаление выбранного состояния внутри OOPoman. Для web storage и extension `chrome.storage.local` существуют операции над выбранными ключами; полный `clear()` шире и подходит лишь если хранилище целиком принадлежит прогрессу. Для IndexedDB сброс записей/базы остаётся кандидатом, чью реализацию и сохранение после перезапуска нужно подтвердить. Удаление расширения — описанный отдельно out-of-band data-loss/recovery путь, а не выполнение этого in-app требования.

Для расширения `storage.local` имеет локальную область данных и текущую документированную квоту 10 MB; `unlimitedStorage` меняет квоту. `storage.session` не переживает перезапуск и не подходит для межсессионного прогресса. `storage.sync` может синхронизировать данные между вошедшими в Chrome браузерами и не подходит для сохранения без аккаунта/синхронизации.

### E3 — offline runtime зависит от полной локальности исполняемых ресурсов

**Документировано:** unpacked extension запускается из локальной папки через Developer mode/Load unpacked; Chrome extension page по CSP загружает скрипты и объекты из собственных packaged resources. Это поддерживает вариант локального запуска без своего HTTP-сервера. **Inference:** если HTML, стили, скрипты, нужные данные и обязательные шрифты/изображения находятся в этой папке, интерфейс может работать без сети после загрузки расширения. Документы не проверяют конкретный OOPoman пакет и не доказывают отсутствие сетевых обращений со стороны его ресурсов. Внешние ссылки могут оставаться сетевыми по границе задачи.

`file://` также не требует своего HTTP-сервера для открытия локального HTML, но стандартные материалы не подтверждают, что Chrome разрешит конкретному файлу работать с локальным хранилищем и соседней папкой так, как требует каркас. C1 и C2 остаются конфигурациями для Challenge, не подтверждёнными рекомендациями.

### E4 — доступ к локальному PDF в extension route требует отдельного решения

Chrome указывает, что расширению нужен ручной доступ к `file://` URL, если оно должно работать с локальными файлами; для некоторых методов навигации к file URLs это требование действует в Chrome начиная с 118. Одной установки расширения недостаточно, чтобы утверждать доступ к `OOP-course/`. C4/C6 добавляют пользовательское разрешение и нуждаются в проверке открытия PDF в фактическом UI. C3/C5 избегают доступа за пределы extension package, если исходные PDF копируются туда без изменения; последствия дублирования и будущего обновления копий останутся операционным вопросом.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Конфигурационное пространство включает шесть in-scope сочетаний: два варианта хранения `file://` (localStorage и IndexedDB) и четыре сочетания unpacked extension с локальными PDF/доступом к папке и двумя пространствами хранения. У каждого варианта указан сброс внутри приложения после подтверждения. Extension storage API не применим к прямой file-странице. | Для `file://` не подтверждены origin, доступность обоих хранилищ, persistence и межпутевое разделение. Не проверено в Chrome чтение PDF из `OOP-course/`, работа offline после рестарта, UX разрешения file URLs и reset на целевом профиле. |
| Для extension route локально загруженный package и `chrome.storage.local` документированы; reset можно ограничить ключами расширения; `storage.session` и `sync` не соответствуют целям. Uninstall вынесен в отдельную ветку с потерей данных. | Реальные ресурсы приложения/внешние ссылки ещё не перечислены; нет пробного прототипа или измеренного поведения. |

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
