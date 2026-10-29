# Extract — «Какие конфигурации скрываются за одним Pyodide Worker?»
> **Mindset:** Analyst. Связать варианты Gather; таблица показывает кандидатов, а не решения.
> **Test:** Есть ли здесь комбинация, не предлагавшаяся в Briefing?
> **Parent:** [HL-OOP_20261029-184453_RT](../../HL-OOP_20261029-184453_RT.md)
> **Goal:** Добавить исполняемые учебные терминалы к теориям и лабораторным всех трёх модулей OOPoman.
> **Producer unit:** `codex:thread:local:01a187f0-5141-7a03-ad0b-99812be36c8f`
> **Parent Coordinator:** `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`
> **Activation / dispatch source:** Coordinator continuation and 404 disposition recorded in [Briefing](1_briefing.md) and [Gather](2_gather.md); immutable return `2_gather.md @ 03f9ef3`.
> **Coordination authority:** `status.md` → `HL-OOP_20261029-184453_RT.md @ 055e11ab48f45807a9a72bdb1e9534a8d32fc167`

## Configuration Space

| Config | Page launch/origin | Runtime/package asset supply | Network boundary | Python compatibility set | Run lifecycle | Feedback fixture boundary |
|---|---|---|---|---|---|---|
| C1 | Hosted HTTPS static page | Version-pinned `v314.0.7` CDN | Worker permits the pinned runtime/package origin | Standard library plus selected locked Pyodide packages | Reuse initialized Worker | Fixed same-interpreter inputs and assertions |
| C2 | Hosted HTTPS static page | Page and runtime assets hosted together on the course origin | Worker permits only same-origin assets | Standard library and selected local package wheels | Fresh Worker per run | Parent-side checks over bounded structured output |
| C3 | Owner-approved offline localhost static launcher | Full version-pinned local distribution and selected wheels | Assets local; no remote fallback; Python JS surface restricted with custom `jsglobals` | Standard library and selected pinned packages | Fresh Worker per run; terminate on timeout | Parent-side checks plus manual disposition for non-observable criteria |
| C4 | Owner-approved offline localhost static launcher | Pyodide core plus exact local package-wheel/lockfile set | Assets local; no remote fallback; Python JS surface restricted with custom `jsglobals` | Standard library and a curated exact set, such as `pytest` if required | Fresh Worker per run | Fixed fixtures; grading and completion remain separate |
| C5 | Existing local HTTP(S) origin | Assets served from that origin with a version-matched lockfile | `connect-src 'self'`; code still shares the local-origin allowance unless the Python JS surface is separately restricted | Standard library and selected packages | Reuse or recreate the Worker | Fixed observable checks; manual criteria stay manual |
| C6 | Downloaded `file://` copy | Remote pinned CDN or sibling files | Browser/CORS behavior varies by file-origin and Worker topology | Standard library or selected packages | Fresh Worker per run | Same fixed checks as other origins |

The rows cross the dimensions from [Gather](2_gather.md); they do not claim that any candidate has passed Phase A. C3 and C4 combine the owner-approved local launcher with exact local package inputs. C6 is retained as a comparison case from the original launch space, not as an authorized offline path or support claim.

## Findings

### E1 — A pinned package set can be preselected rather than installed by student code

The stable Pyodide `314.0.7` API provides `indexURL`, `packageBaseUrl`, `lockFileURL`/`lockFileContents`, an initial `packages` list and a `jsglobals` option. A package lock entry can name a relative wheel file resolved against `packageBaseUrl`; the lockfile is version/ABI-related evidence that must match the runtime. `loadPackagesFromImports()` can load packages known to Pyodide from the distribution. `micropip.install()` also supports PyPI and arbitrary wheel URLs, which is a separate and much broader student-code path and is not needed for the current static examples. Sources: [Pyodide JavaScript API](https://pyodide.org/en/stable/usage/api/js-api.html), [Pyodide package loading](https://pyodide.org/en/stable/usage/loading-packages.html), [Pyodide package list](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).

**Inference:** C3/C4 could avoid runtime package discovery from the network by supplying a version-matched lockfile and all selected wheels locally, and by disabling arbitrary `micropip` installation in the console protocol. The documentation establishes package configuration options, not that this repository's particular bundle is complete or that no remote request can occur. A precise local asset manifest, checksums, sizes and a no-remote canary are still needed.

### E2 — An unproposed candidate: separate loader globals from Python-visible browser APIs

The normal Pyodide configuration uses `globalThis` for Python's `js` module. The stable API exposes `jsglobals` to replace that object. Separately, Pyodide's JavaScript loader must fetch runtime files from `indexURL`, and `connect-src` governs browser `fetch`, XHR, WebSocket, EventSource and beacon calls. [Pyodide JavaScript API](https://pyodide.org/en/stable/usage/api/js-api.html), [Pyodide deployment](https://pyodide.org/en/stable/usage/downloading-and-deploying.html), [MDN `connect-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src).

**Unexpected candidate (C3/C4):** initialize the Worker with the CSP allowance needed for pinned local/runtime asset loading, but configure Python's `js` module with a curated object that omits `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon`, `globalThis`, and equivalent network entry points before evaluating student code. This could preserve bootstrap access while making ordinary beginner code unable to call the obvious browser networking APIs. It was not proposed in Briefing and is not validated here.

This is a candidate for accidental-misuse prevention, consistent with the owner's non-adversarial learner profile; it is **not** evidence of a hostile-code sandbox. The critical empirical checks are that Pyodide still initializes, course examples still run, and Python paths such as `pyodide.http`, `requests`, `urllib`, and direct `js` access cannot produce a request. The page's Worker CSP still allows the loader's asset operations, so the distinction has to come from the actual Python-visible bridge and must be proven on the pinned build. No claim that `jsglobals` alone enforces the policy is made.

### E3 — A fixed single-buffer console can cover current examples without a general package manager

The current site examples inspected in `course/data.js` use standard-library `dataclasses`, `typing`/`Protocol`, and basic collections; the Lab 7 gateway is fictional and local. Lab text and PDF criteria also refer to `Decimal`, `datetime`, `pytest`, and mocks, while Labs 1–6 do not yet have complete runnable site implementations. Pyodide's stable package list includes `pytest 9.0.2`, but running it offline would require the package and all dependencies in the local bundle. The iteration 2 map preserves candidate oracles and the current scope reductions for Labs 7–9. [course/data.js](../../../../../course/data.js), [iteration 2 Extract](../iter2/3_extract.md), [Pyodide package list](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).

The minimum useful fixture set can therefore begin with current, self-contained examples: Lab 7 adapter amount/status conversion and output; Lab 8 chain order/early rejection and two observer notifications; Lab 9 one repository save and stop count. Lab 1/2 monetary and state invariants need authored bounded inputs before execution. These are fixture candidates, not implemented checks; site/PDF mismatches for Labs 7–9 remain explicit. Fixed checks should remain advisory and must not change points, checklist state or completion.

### E4 — Memory and time limits differ by the pinned version boundary

The stable `314.0.7` JavaScript API reference does not document a `maxMemoryBytes` option. The current `/en/latest/` development API does list one, but that reference identifies itself as development `314.1.0.dev0`; the Pyodide deployment guide says the dev CDN is redeployed for each commit and should be used only for testing. This newer option cannot be assumed for the selected stable release. [Stable JavaScript API](https://pyodide.org/en/stable/usage/api/js-api.html), [development JavaScript API](https://pyodide.org/en/latest/usage/api/js-api.html), [Pyodide deployment](https://pyodide.org/en/stable/usage/downloading-and-deploying.html).

The documented stable control available without a memory-setting API is parent-side Worker termination, which stops the Worker immediately; it does not establish a heap ceiling. Output limiting is application protocol behavior. Consequently a memory cap or responsiveness target still requires a pinned-version/browser experiment and must not be inferred from `latest` documentation. [MDN Worker `terminate()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate).

### E5 — The available localhost target did not reach a course page

The one Coordinator-authorized attempt at `http://127.0.0.1:8765/course/index.html` returned HTTP 404. The static source `course/index.html` exists, but the running server's document root/path did not expose it at the requested route. No other path or port was tried. This removes the only currently supplied HTTP(S) target from empirical testing; it says nothing about whether a correctly rooted approved launcher can serve the site.

## Checkpoint

| Found | Remaining |
|---|---|
| Versioned local package configuration is documented; arbitrary `micropip`/PyPI installation is separable from a curated course package set. A previously unproposed candidate is `PyodideConfig.jsglobals`: keep loader-required network permission while exposing a reduced Python-visible JS object for ordinary no-network code. Current examples suggest a small standard-library-first fixture set; `pytest` is a package only if the course chooses to run student suites. Stable v314.0.7 docs do not expose the `maxMemoryBytes` option shown in development docs. | `jsglobals` enforcement, all package/network behavior, local full/core bundle completeness, startup, runtime, timeout/output, and example fixtures remain untested. The authorized HTTP target is 404; browser-specific empirical testing is unavailable in this environment. No Phase A success claim can be made. |

**Sufficiency:**
- [x] External source used? — stable Pyodide v314.0.7 JavaScript, Worker, package, deployment and compatibility docs; current development API explicitly distinguished; MDN CSP/Worker docs.
- [x] Briefing gap closed? — a candidate network-separation design and the exact 404 effect are recorded, with unresolved proof separated.
- [x] Configuration Space built from Gather dimensions? — six shared dimensions and six candidate rows.

Stage complete: YES
→ Coordinator decision: continue to documentary Challenge under the existing 404 disposition, or close the research iteration as blocked on browser/runtime validation.

---
**Research scope:** focused documentary extraction, one stable-version API comparison, and project-source mapping only. No Pyodide, snippet, fixture, CSP, network canary, timeout, package or resource test ran. No product files, course content, status, HL or iteration control were changed.
