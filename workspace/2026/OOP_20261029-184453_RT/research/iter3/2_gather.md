# Gather — «Что пока неизвестно о выбранном контракте?»
> **Mindset:** Explorer. Разложить независимые варианты и неизвестные без ранжирования.
> **Test:** Названы ли ключевые измерения и минимум три альтернативы для каждого?
> **Parent:** [HL-OOP_20261029-184453_RT](../../HL-OOP_20261029-184453_RT.md)
> **Goal:** Добавить исполняемые учебные терминалы к теориям и лабораторным всех трёх модулей OOPoman.
> **Producer unit:** `codex:thread:local:01a187f0-5141-7a03-ad0b-99812be36c8f`
> **Parent Coordinator:** `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`
> **Activation / dispatch source:** Coordinator continuation recorded in [Briefing](1_briefing.md); continuation gate `journal/20261029-205052__gate_answer__c4a7.md @ f85e9bf6442ab5713e886bc9068e3ef02823769a`.
> **Coordination authority:** `status.md` → `HL-OOP_20261029-184453_RT.md @ 055e11ab48f45807a9a72bdb1e9534a8d32fc167`

## Dimensions

| Dimension | Alt A | Alt B | Alt C | Alt D |
|---|---|---|---|---|
| **Page launch/origin** | Hosted HTTPS static page | Downloaded page opened as `file://` | Existing local HTTP(S) origin | Owner-approved static-only localhost launcher for offline copy |
| **Runtime/package asset supply** | Version-pinned remote CDN, such as Pyodide `v314.0.7` | Full Pyodide release and selected wheels bundled locally | Pyodide core plus explicitly selected local wheels/lock data | Unpinned `latest`/development CDN assets |
| **Network boundary** | Runtime and code share a Worker policy allowing only pinned origins | Same-origin local asset reads under a local-origin policy | Bootstrap assets supplied locally, then a distinct no-egress execution policy | Runtime CDN allowlist plus unrestricted or arbitrary student-code requests |
| **Python compatibility set** | Standard library only | Curated, pinned Pyodide-built packages (for example, `pytest`) | Explicitly bundled pure-Python wheels | Arbitrary runtime `micropip`/PyPI installation |
| **Run lifecycle** | Reuse one initialized Worker | Create a fresh Worker for each run | Terminate Worker at timeout and start a replacement | Leave runaway Worker alive and report timeout only in the UI |
| **Feedback fixture boundary** | Fixed Python inputs/assertions in the same interpreter | Parent-side checks over bounded structured output | Human/manual disposition for non-observable criteria | Let submitted code's self-reported tests decide whether it passed |

These alternatives describe a configuration space, not accepted or recommended behavior. The approved boundary rules out option D for arbitrary student-code network access, runtime unpinned assets, and self-reported assessment, but the evidence below does not select an implementation.

## Findings

### G1 — The current source is a static course, not a runner prototype

`course/README.md` says a local copy is opened from `index.html`, needs no installation/server/account, stores course progress in browser `localStorage`, and does not execute or assess code. `scripts/build-site.mjs` builds the static pages. The repository contains no Pyodide runtime, Worker implementation or static localhost launcher. These are source observations, not a visual inspection of the live page. [Course README](../../../../../course/README.md), [build script](../../../../../scripts/build-site.mjs).

The source contains worked code using `typing.Protocol` and, for Labs 7–9, `dataclasses` and `typing`; Lab 7's current example uses a fictional local gateway and no real payment/network service. The code and lab requirements in Labs 1–6 identify `Decimal`, `datetime`, `pytest`, and `unittest.mock` as likely compatibility/fixture concerns, but the site does not yet contain a complete runnable implementation for those labs. Iteration 2 already mapped the nine PDF criteria to candidate deterministic or manual checks; no candidate fixture has been run. [course/data.js](../../../../../course/data.js#L520), [iteration 2 Extract](../iter2/3_extract.md).

### G2 — Browser availability is not browser evidence

The computer-use inventory returned a running Windows Google Chrome app and a window titled “OOPoman — маршрут курса”. A read-only snapshot of that window was refused because the tool could not determine the current URL with sufficient confidence. Its Chrome browser provider was unavailable. A new `file://` course tab in the in-app browser was explicitly denied: the browser policy allows only `http:` and `https:` and states not to reproduce this outcome via another browser surface, raw CDP, browser commands or a workaround. Therefore no URL, actual Chrome version, active course page, page behavior or runtime outcome is established by this turn. The earlier HL's observation that `http://127.0.0.1:8765/course/index.html` returned 404 remains a prior observation, not a fresh check.

This is a tooling/policy blocker, not proof that Chrome or the course itself is unavailable. The browser tool reports the precise blocked action as opening the local `file://` course URL. No attempt was made to bypass the block or to start an unapproved alternative browser surface.

### G3 — Pyodide has a versioned module-Worker path; offline bundle size/package shape remains a product choice

The official stable Pyodide docs currently identify release `314.0.7` and a versioned CDN index at `https://cdn.jsdelivr.net/pyodide/v314.0.7/full/`. They warn against deploying a non-versioned development CDN URL. Pyodide requires a **module-type Worker** because `pyodide.asm.mjs` is an ES module. Its example loads Pyodide in the Worker, loads packages referenced by the Python imports, calls `runPythonAsync`, and returns results/errors through `postMessage`; the Worker is a separate global context and cannot manipulate the page DOM. These facts show a documented shape, not a working OOPoman implementation. [Pyodide deployment](https://pyodide.org/en/stable/usage/downloading-and-deploying.html), [Pyodide Worker guide](https://pyodide.org/en/stable/usage/webworker.html).

The official full release archive is documented as **200+ MB** and includes wheel packages; `pyodide-core` is a smaller set containing the runtime, standard-library archive and package lockfile, but the docs describe it as intended for Node where missing packages are fetched from the CDN. For the offline copy, using `pyodide-core` alone is not evidence of offline completeness. Options requiring measurement are a full local bundle versus a minimal local runtime plus an exact allowlisted package-wheel set. Static hosting must supply the required Wasm MIME type; local Pyodide files are served over HTTP in the official example. [Pyodide deployment](https://pyodide.org/en/stable/usage/downloading-and-deploying.html).

The current stable package list includes `pytest 9.0.2`, so a pinned distribution can supply it. It is not yet decided whether the terminal itself should run student pytest suites or use narrower course-owned fixtures; offline use of `pytest` requires its package and dependencies to be included locally. [Pyodide package list](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).

### G4 — Browser network policy governs both loader needs and program requests unless separated

Pyodide's `pyodide.http` uses browser networking; Python HTTP calls follow browser request/CORS behavior. The current docs report no raw socket API and note that `requests`/`urllib3` in Pyodide still make browser-mediated requests. The `connect-src` CSP directive governs `fetch`, `XMLHttpRequest`, WebSocket, EventSource and `sendBeacon`; `worker-src` controls which Worker scripts may be created. The Pyodide Worker example imports its versioned runtime URL and loads imported packages from within the Worker. [Pyodide compatibility](https://pyodide.org/en/stable/usage/wasm-constraints.html), [Pyodide `pyodide.http`](https://pyodide.org/en/stable/usage/api/python-api/http.html), [MDN `connect-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src), [MDN `worker-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/worker-src).

**Inference:** if the Worker loads remote runtime/package files while its `connect-src` allows an origin, submitted code executing in that Worker may be able to call browser networking against the same permitted origin. An origin allowlist alone therefore does not demonstrate the owner's stronger rule “pinned asset requests work, student code has no network.” A staged bootstrap, locally bundled assets or another separation may be needed, but documentation does not establish which design works here. No network canary or CSP behavior was tested.

### G5 — Worker timeout and in-memory files are useful boundaries, not complete resource isolation

Pyodide's default Emscripten filesystem is virtual in-memory MEMFS; it loses its data after a page reload. Native-directory mounts are separate filesystem configurations, so the course can omit them. The compatibility table states that Python `threading`, `multiprocessing` and sockets are not functional; `decimal`'s C implementation remains available, while its alternate Python implementation is unavailable. The current course examples rely mostly on standard-library `dataclasses`/`typing`; some lab text calls for `Decimal`, `datetime`, `pytest` and mocks. This suggests a viable candidate compatibility set, but only execution can validate actual snippets. [Pyodide filesystem](https://pyodide.org/en/stable/usage/file-system.html), [Pyodide compatibility](https://pyodide.org/en/stable/usage/wasm-constraints.html), [course/data.js](../../../../../course/data.js#L520).

The parent page can immediately terminate a Worker, which supports a timeout-and-restart design for a stuck loop. That API does not create a memory quota; output truncation is an OOPoman-side display/protocol behavior and still needs a real trial. No startup time, run time, timeout, output, reset, memory or repeat-run value was measured. [MDN Worker `terminate()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate).

### G6 — What the available evidence can and cannot settle

Official documentation and source inspection identify implementable candidates and compatibility constraints. They cannot establish that this exact site opens in a target browser, the local launcher serves a complete offline bundle, browser CSP separates runtime bootstrap from submitted code, the approved snippets run, or user feedback behaves correctly. No snippet or fixture was executed; no runtime/package files were fetched into the project or temp directory; no product files changed in this stage. The actual Chrome version/OS target matrix remains unknown.

**Sources and versions checked:** official Pyodide stable documentation version `314.0.7` (Worker, compatibility, packages, filesystem, deployment), and MDN `worker-src`, `connect-src`, Web Workers, and `Worker.terminate()`; accessed 2026-10-29. Project inputs: current task HL at its cited authority, `course/README.md`, `course/data.js`, `scripts/build-site.mjs`, and iteration 2 RES/Extract.

## Checkpoint

| Found | Remaining |
|---|---|
| The project is currently a static, non-executing course with no Pyodide Worker or localhost launcher. Official Pyodide v314.0.7 docs describe a module Worker, versioned CDN assets, local full/core distributions, a package lockfile, browser-mediated HTTP behavior, and relevant runtime limits. CSP has separate worker-script and connection controls; `connect-src` covers browser network APIs. Worker termination and MEMFS support beginner-oriented timeout and ephemeral runtime data as candidate design elements. | No browser URL snapshot, Chrome version, Worker run, offline launcher, CSP/network-canary, snippet/fixture, timeout/output or resource result was obtainable. The local `file://` inspection was explicitly blocked by browser URL policy, which forbids alternate-surface or command workarounds. A pinned-asset/student-code network separation and offline asset completeness remain unproved. |

**Sufficiency:**
- [x] External source used? — current official Pyodide 314.0.7 documentation and MDN.
- [x] Briefing gap closed? — the repository and tooling/policy state were checked; the precise runtime-validation blocker is recorded.
- [x] Dimensions identified? — six independent factors, each with at least three alternatives.

Stage complete: YES
→ Coordinator decision: route an allowed HTTP(S) target and browser-capable test mechanism, or disposition this validation as blocked; do not bypass the explicit browser URL policy.

---
**Research scope:** focused, documentary/source pass only. Browser inventory was attempted; site inspection, direct `file://` navigation, runtime execution, test, product edit, and local server startup were not performed. Official sources checked 2026-10-29. No raw output/log/screenshot was persisted.
