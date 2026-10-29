# Gather — "What do we NOT know?"
> **Mindset:** Explorer. You're mapping unknown territory. Widen before you narrow. Every assumption is a question.
> **Test:** "Can I name every dimension and its alternatives without checking my sources?"
> Parent: [HL-OOP_20261029-184453_RT.md](../../HL-OOP_20261029-184453_RT.md)
> Goal: Студенты получают безопасный запуск, строгую практическую обратную связь и учебные аналоги при ошибках.

## Dimensions

| Dimension | Alt A | Alt B | Alt C | Alt D |
|---|---|---|---|---|
| D1: происхождение страницы и путь к локальному запускателю | Публичный HTTPS → loopback HTTP с разрешением браузера и CORS | Локальный launcher обслуживает страницу и helper с одного локального origin | `file:` страница → локальный helper с разрешённым origin и ограничениями file-origin | Без межorigin-запросов: запускаемая локальная страница/helper в одном origin |
| D2: место исполнения Python | Фиксированный Docker image через ограниченный helper API | Локальный launcher вызывает контейнер и одновременно обслуживает страницы | Браузерный runtime/WebAssembly как отдельный fallback | Ручной локальный Python без автоматического запуска сайтом |
| D3: граница изоляции и эксплуатация Docker | Docker Desktop/Engine по умолчанию с явно заданными ограничениями запуска | Rootless режим там, где поддерживается и применим | Docker Desktop с дополнительной изоляцией VM/ECI, если доступно | Отказ от запуска недоверенного кода на Docker-демоне студента |
| D4: оракул проверки лабораторной | Наблюдаемые результаты/исключения через детерминированные тест-кейсы | Архитектурные/структурные проверки импортов и зависимостей | Поведенческие проверки со mock/fake-компонентами и заданным сценарием | Ручная защита, архитектурное обоснование и peer-check без автоматического вердикта |

## Findings

### G1: Браузерный доступ к loopback зависит от origin и разрешения

Актуальное руководство Chrome указывает, что соединение публичного HTTPS сайта с `localhost`, `127.0.0.1` или `::1` проходит через Local Network Access (LNA): разрешение `loopback-network`, явный пользовательский жест при запросе разрешения и стандартный CORS. Вызов должен происходить из secure context; для HTTP loopback endpoint документация показывает `targetAddressSpace: "loopback"`. Старые PNA preflight-заголовки не являются требуемым механизмом. Chrome объявил запуск permission prompt в версии 142, поэтому поддерживаемость зависит от текущей версии браузера и пользовательского разрешения, а не только от CORS. Источники: [Chrome LNA guide](https://developer.chrome.com/docs/modern-web-guidance/guides/security/local-network-access), [Chrome LNA rollout](https://developer.chrome.com/blog/local-network-access).

`file:` и loopback origins считаются потенциально доверенными локальными контекстами в общих правилах secure contexts, но это не доказывает одинаковую cross-origin/LNA поведенческую совместимость по браузерам. Официальные материалы, найденные в этом проходе, не устанавливают полную матрицу Chrome/Firefox/Safari; в частности, старый WebKit issue не достаточен для вывода о текущем Safari. Это остаётся платформенным и браузерным пробелом. См. [MDN secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts) и [MDN local network access](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Local_network_access) как обзор поведения спецификации.

### G2: Docker даёт настраиваемые ограничения, но значения и переносимость требуют проверки

Официальная документация Docker подтверждает доступные параметры: `--network none`, `--read-only`, `--pids-limit`, `--memory`, `--cpus`, `--cap-drop`, `--security-opt no-new-privileges`, seccomp profile, отсутствие `--mount`/`--device` и автоматическое удаление контейнера. При этом resource constraints зависят от поддержки ядра/cgroups; rootless режим имеет отдельные ограничения. Docker предупреждает, что обычные capability/mount-настройки могут дать неполную изоляцию при kernel vulnerabilities. Следовательно, это набор ограничительных мер для проверки, а не доказательство абсолютной границы безопасности. Источники: [Docker Engine security](https://docs.docker.com/engine/security/), [Docker run reference](https://docs.docker.com/engine/containers/run/), [Docker resource constraints](https://docs.docker.com/engine/containers/resource_constraints), [Docker seccomp](https://docs.docker.com/engine/security/seccomp), [Docker rootless](https://docs.docker.com/engine/security/rootless/).

Для Windows официальный install guide перечисляет версии Windows, WSL 2, SLAT, 8 GB RAM и включённую аппаратную виртуализацию как требования выбранного WSL 2 пути; Windows Home/Education разрешают только Linux containers. Данные HL, требующие поддерживаемую Windows/WSL2 и работающий Docker Desktop, поэтому нуждаются в точной version/backend matrix, а не только общей фразе «нужны Windows и Docker». Источники: [Docker Desktop for Windows requirements](https://docs.docker.com/desktop/setup/install/windows-install/), [Docker Desktop WSL 2 backend](https://docs.docker.com/desktop/features/wsl/).

### G3: Лабораторные смешивают исполняемые критерии и человеческую оценку

Проверенные исходные PDF дают разные формы возможного оракула: лабораторная 1 задаёт пять явных тест-кейсов инвариантов/исключений; 2 — пять комбинаций расчёта тарифа; 3 — три проверки полиморфной доставки, изоляции исключений и duplicate-tap; 4 — эквивалентность десяти фиксированных транзакций; 5 — подстановку типа, DI-граф и mock; 6 — типы фабрик, обязательное поле builder и независимость двух отчётов; 7 — конвертацию суммы, retry и успешную фасадную операцию; 8 — short-circuit, observer уведомление/счётчик и detach; 9 — архитектурную чистоту импортов и интеграционную симуляцию. Во всех девяти есть отдельные блоки защиты/объяснения, которые не сводятся к runtime assertion.

Значит, единый бинарный «лабораторная пройдена» не следует из исходных рубрик. Для каждого пункта надо выяснить, есть ли наблюдаемое поведение с устойчивым oracle, можно ли безопасно изолировать побочные эффекты, или пункт требует ручного ответа/артефакта. Наиболее существенный scope mismatch в HL уже отмечен: PDF лабораторной 7 содержит внешний bank API/сетевые ошибки, тогда как frozen HL сохраняет локальный фиктивный шлюз без сетевых вызовов; лабораторная 8 в PDF требует четыре узла и три наблюдателя, а HL описывает суженную текущую веб-версию. PDF лабораторной 9 включает интеграцию смены с 25 пассажирами и фискальным отчётом, которая не должна автоматически расширять суженную веб-версию. Источники: `OOP-course/02_Лабораторные/Лабораторная_01_Моделирование_домена_Avtobys_Защита_инвариантов.pdf` … `Лабораторная_09_Clean_Architecture_и_симулятор_смены_автобуса.pdf`; HL §2, §4 и §10.

### G4: Текущий сайт остаётся статическим и использует чек-лист как прогресс, не доказательство качества

`course/README.md` говорит, что сайт не запускает, не проверяет и не оценивает код; `course/data.js` содержит учебные примеры, лабораторные criteria/checklist, а код `course/app.js`/`storage.js` начисляет по 20 баллов за ответы и отмеченные обычные checklist items, завершение отдельно зависит от ответов и peer-check. North Star запрещает менять эту оценочную логику и требует оставить PDF read-only. Для терминала необходим отдельный учебный результат, который явно не пишет баллы, чек-лист или состояние завершения.

### G5: Остались решения, которые исследование источников не может назначить

HL не задаёт ОС студентов и браузерную матрицу. Документы не устанавливают, требуется ли выполнять терминал со страниц публичного сайта или допустимо обслуживать всё через локальный launcher. Не подтверждены целевые машины, установочные/разрешительные права, предпочтительный fallback при недоступном Docker, пределы вывода/ввода и конкретные ресурсные лимиты. Это не технические факты, выводимые из документации; совместимую матрицу надо либо зафиксировать владельцу, либо провести наблюдаемые испытания на заявленных машинах.

## Checkpoint

| Found | Remaining |
|---|---|
| Browser public-HTTPS → loopback path requires current Chrome LNA permission, secure context, user gesture and CORS; old PNA headers do not solve it. | Current Chrome/Firefox/Safari and `file:` behavior must be tested on selected supported versions; no platform matrix is approved. |
| Docker exposes enforceable controls for network, filesystem, process and resource limits, with kernel/runtime qualifications and residual escape risk. | No student-machine trial proves availability, limits, latency, or acceptable security; helper-to-daemon trust boundary still needs design/challenge. |
| All nine PDFs include machine-checkable and human-only elements; exact lab 7–9 scope mismatches need preservation. | Per-criterion oracle and false-positive/false-negative analysis remains for Extract/Challenge; owner must decide disputed educational scope. |
| Static-site scoring/completion boundaries are explicit in current project sources. | Integration must preserve these separate state channels. |

**Sufficiency:**
- [x] External source used? — official Chrome and Docker documentation.
- [x] Briefing gap closed? — platform matrix and local/public serving choice are explicitly identified as unresolved owner/validation inputs.
- [x] Dimensions identified?

Stage complete: YES
→ User decision: Continue to Extract; no architecture or platform choice is made at Gather.
