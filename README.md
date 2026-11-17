# OOPoman

OOPoman is a local-first three-week OOP course for second-year students. The approved project intent and boundaries are in [NorthStar.md](NorthStar.md); owner instructions and decisions are in [TRACE.md](TRACE.md).

## Локальный запуск, в том числе офлайн

Для запуска нужен установленный Node.js 22 или новее. `npm install` и интернет для работы курса не требуются: комплект Pyodide уже находится в `course/assets/pyodide/` и входит в репозиторий.

Откройте PowerShell в корневой папке репозитория и выполните:

```powershell
node .\scripts\build-site.mjs
node .\scripts\serve-course.mjs
```

Затем откройте <http://127.0.0.1:8000/course/>. Не открывайте HTML-файлы напрямую через `file://`: браузеру нужен локальный HTTP-сервер для запуска Worker и загрузки WebAssembly. После того как репозиторий скачан и Node.js установлен, сборка, курс, терминалы и экзамен работают без интернет-соединения. Внешние ссылки на справочную документацию, разумеется, офлайн недоступны.

## TFW and project memory

- [TFW Full method](.tfw/README.md)
- [Project knowledge](KNOWLEDGE.md)
- [TFW release workflow](.tfw/workflows/release.md) — the owner has authorized the first public static release for classmates; learner progress remains browser-local.
- [Selected trace: INIT](workspace/2026/OOP_20261014-215543_INIT/status.md)

Course materials are in the root `OOP-course/` directory. UML architecture and structure diagrams belong in `architecture/`.
