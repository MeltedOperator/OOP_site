# Gather — "What do we NOT know?"
> **Mindset:** Explorer. You're mapping unknown territory. Widen before you narrow. Every assumption is a question.
> **Test:** "Can I name every dimension and its alternatives without checking my sources?"
> Parent: [HL-OOP_20261029-184453_RT](../../HL-OOP_20261029-184453_RT.md)
> Goal: Добавить исполняемые учебные терминалы к теориям и лабораторным всех трёх модулей OOPoman.
> Producer unit: `codex:thread:local:01a187f0-5141-7a03-ad0b-99812be36c8f`
> Parent Coordinator: `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`
> Activation / dispatch source: same-unit Coordinator continuation recorded in [Briefing](1_briefing.md); control blob verified against commit `f42220bbd28d8522d6d9ac319f446f6c62d1b723`.
> Coordination authority: `HL-OOP_20261029-184453_RT.md @ e408df4237a1aaad5bd016175f2462e3dbb8262d`

## Dimensions

| Dimension | Alt A | Alt B | Alt C | Alt D _(if any)_ |
|-----------|-------|-------|-------|-----------------|
| D1: Execution boundary | Native CPython inside disposable Docker container | Pyodide/WebAssembly in a browser Worker | OS-native per-user process sandbox | Remote/cloud execution service |
| D2: Course-copy launch/origin | Public HTTPS course with pinned runtime assets | Direct `file://` open | Localhost static asset server | Installable desktop/browser package |
| D3: Network and host API policy | No network, only explicit worker/container APIs | Browser-mediated network with CSP/CORS restrictions | Restricted allowlist | General student-code network access |
| D4: Resource control and interruption | Container cgroups plus process limits | Terminate and recreate Worker; browser-managed memory | OS job/process limits | Wall-clock/output bounds only |
| D5: Python compatibility | Host CPython and arbitrary supported native packages | Pyodide standard library plus packaged/ported wheels | Curated narrow subset | Pseudocode or manually run local Python |
| D6: Feedback oracle and assessment | Deterministic execution assertions against fixed fixtures | Static/structural checks with explicit heuristics | Human review for architecture, report and oral defense | Mix: objective runtime feedback remains advisory; course assessment stays separate |

## Findings

### G1: Runner boundary and what the current host can demonstrate

The workspace host is Windows/PowerShell. `python` and `node` are on PATH. `docker`, `pdftotext`, `chrome` and `msedge` commands were not found on PATH; no Docker CLI/daemon or local browser executable/version was available to this turn. No container or browser-runner experiment was performed, and no student code was executed. This is a capability observation about this host, not proof the software is absent elsewhere or that a target browser is unsupported. Therefore the requested empirical Docker-versus-Worker comparison, timing/resource measurement, worker CSP canary and timeout/output stress are blocked here; iteration 2 cannot claim these checks passed.

The course currently renders `lab.example` as a static code model and explicitly says Python is not run. Quiz answers and checklist ticks feed the existing score; completion separately requires all quiz answers and peer confirmation. This creates a clear integration boundary: a future terminal can give advisory execution feedback, while current scoring/progress and the human confirmation path remain separate. Sources: [course/app.js](../../../../../course/app.js#L280) and [course/data.js](../../../../../course/data.js#L520).

Docker's own security guide describes namespaces and cgroups, but says the daemon requires root privileges unless Rootless mode is selected, and that daemon control can expose powerful host filesystem operations. Resource controls must be configured; without constraints a container can consume what the host scheduler allows. This supports testing a constrained container profile, but does not establish that the proposed browser-facing helper safely limits Docker API authority. Sources: [Docker Engine security](https://docs.docker.com/engine/security/) and [Docker resource constraints](https://docs.docker.com/engine/containers/resource_constraints/).

### G2: Browser Worker and Pyodide boundaries

Pyodide's official guide supports a module-type Worker for running Python away from the UI thread; this prevents direct DOM access but is a threading boundary, not proof of a host/network sandbox. The current docs say Pyodide has access to Web APIs in browsers. Its compatibility guide documents removed or nonfunctional modules (including `resource`, `multiprocessing`, `threading`, sockets and `ssl` behavior), while browser network requests use browser policy/CORS and have less control over timeouts, proxies and certificates than native CPython. Exact compatibility must be checked against each course example; syntax resemblance is insufficient. Sources: [Pyodide Worker guide](https://pyodide.org/en/latest/usage/webworker.html), [Pyodide browser guide](https://pyodide.org/en/latest/usage/index.html) and [Pyodide WebAssembly constraints](https://pyodide.org/en/latest/usage/wasm-constraints.html).

MDN documents that ordinary Worker CSP is set by the response for the worker script; the page's policy generally does not govern it (blob/data workers are an exception and inherit the creator's CSP). The parent still needs `worker-src` to control which worker scripts can start. Thus a production design needs separate evidence for the page's worker source restriction and the worker response policy, especially `connect-src`; a CSP declaration alone is not a canary result or proof against every browser API. Source: [MDN CSP in Workers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#csp-in-workers) and [MDN worker-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/worker-src).

Pyodide's current overview recommends recent browsers and lists tested minimums, but the listed versions are from 2023. They do not define this course's support matrix in 2026. Browser/OS versions and student devices remain owner input and direct validation gaps. Its docs also describe serving a self-hosted distribution with a web server; that is a deployment prerequisite to evaluate, not approval for a local localhost launcher or evidence that `file://` works. Source: [Pyodide browser and deployment guide](https://pyodide.org/en/latest/usage/index.html).

### G3: Course snippets and assessment evidence

Inspected all nine source lab PDFs under `OOP-course/02_Лабораторные/Лабораторная_01…09…pdf` (3–4 pages each) and the nine corresponding `labs` records in `course/data.js` (criteria, examples and checklists). PDF text was extracted to the system temp directory for inspection; the source PDFs were not changed. The assignment surface spans at least three evidence types:

- **Deterministic behavior:** invariant boundaries, failed-operation state preservation, Decimal totals/rounding, event routing/counts, order/short-circuit behavior, fixed output/result sets, boundary times, timeout behavior, and mock interactions. These are candidates for fixed fixtures and assertions only where the PDF states a definite input/output/state condition.
- **Structure and quality:** type/protocol separation, dependency direction, absence of concrete branches, extension without modifying a named file, test coverage, annotations/docstrings, README/UML/refactoring reports and repository layout. Some named structural claims can be checked narrowly from source/AST or files; broad architecture quality and explanation need human review. “Coverage” requires a defined test basis, not simply running an arbitrary student test suite.
- **Human explanation or judgment:** oral defense/control questions, design rationale, quality of diagrams/reports, and whether the learner can justify tradeoffs. A runtime verdict cannot stand in for these.

The existing `course/data.js` criteria/checklists for labs 7–9 appear narrower than portions of the source PDFs; this was previously observed in iteration 1 and must be reconciled criterion-by-criterion before any checker scope is proposed. This Gather pass does not declare the full acceptance map complete. Source PDFs inspected (source bytes unchanged):
- `OOP-course/02_Лабораторные/Лабораторная_01_Моделирование_домена_Avtobys_Защита_инвариантов.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_02_Композитный_движок_тарификации_и_платежей.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_03_Полиморфный_процессор_событий_Event_Dispatcher.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_04_Рефакторинг_спагетти_кода_SRP_и_OCP.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_05_Практикум_Midterm_DI_Container_LSP_ISP.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_06_Фабричный_метод_и_Строитель_финансовых_отчетов.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_07_Адаптер_банка_Декораторы_кэша_и_Терминальный_фасад.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_08_Цепочка_обязанностей_и_Наблюдатели_мониторинга.pdf`
- `OOP-course/02_Лабораторные/Лабораторная_09_Clean_Architecture_и_симулятор_смены_автобуса.pdf`

Course counterparts: [course/data.js](../../../../../course/data.js#L520) and [course/app.js](../../../../../course/app.js#L280). No snippets were executed and no deterministic oracle was validated against a reference implementation.

### G4: Cross-cutting unknowns

The current evidence leaves independent choices around the runner boundary, launch origin, network/API policy, resource limits, Python subset and feedback oracle. Target browser/OS matrix, acceptable startup/latency/memory/output limits, and whether a downloaded copy may start a local static server remain unanswered. The fixed Docker execution path is frozen in HL; these findings are evidence for the Coordinator and owner only, not a runtime selection or amendment.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Six independent decision dimensions and meaningful alternatives are identified. Official docs describe Pyodide Worker/CSP/network compatibility limits and Docker daemon/resource boundaries. The current site does not execute Python and separates its quiz/checklist score and peer confirmation. Nine lab PDFs and corresponding course-data records were inspected; criteria include deterministic behavior, structural/reporting evidence and oral/human judgment. | No local Docker daemon or browser executable/version was available on PATH, so no runner, security-canary, timeout, performance or resource experiment ran. Target devices/matrix and acceptance limits remain unknown. The full PDF-to-course-criteria/oracle map remains for Extract. Local static-server permission remains unresolved. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed? — documentary and source inventory gaps mapped; runtime/device evidence is still missing and explicitly bounded.
- [x] Dimensions identified?

Stage complete: YES
→ User decision: Continue to Extract. Owner clarification: learner threat model is beginner accidental misuse; prioritize simple guardrails, not defense against intentional attacks. Carry the host capability blocker and unresolved target-device validation.

---
**Research checkpoint provenance:** focused single-pass; official documentation browsed 2026-10-29. PDF text exports were temporary under `%TEMP%\tfw\OOP_20261029-184453_RT`; no raw output was retained in the project. No code, tests, PDFs, HL, status or iteration control file were modified.



