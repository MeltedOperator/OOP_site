# Challenge — "What do we NOT expect?"
> **Mindset:** Critic. You built the configurations. Now attack them. Every survivor needs evidence. Every elimination needs a reason.
> **Test:** "Would my surviving configurations hold if a different researcher attacked them?"
> Parent: [HL-OOP_20261029-184453_RT.md](../../HL-OOP_20261029-184453_RT.md)
> Goal: Студенты получают безопасный запуск, строгую практическую обратную связь и учебные аналоги при ошибках.

## Consistency Check

The dimensions describe a primary execution path. A local static file server in this section serves HTML/JS/Wasm assets only; it does not accept or execute Python. Any such local start path changes the current “open `index.html` directly” UX and needs a bounded owner decision against the project North Star.

**Incompatible pairs:**

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|---|---|---|---|---|
| D1: page origin and path to local runner | `file:` page used as a direct-open mode | D2: Python execution location | Pyodide Worker that loads local runtime/Wasm assets | Pyodide/browser documentation states that JavaScript cannot load local `file:` data resources under same-origin rules. The direct-open configuration needs to change to a local static HTTP origin or use a separately verified self-contained bundle. |
| D2: Python execution location | Pyodide/WebAssembly in the browser | D3: isolation boundary | Docker namespaces/cgroups as the primary containment | Docker limits cannot contain code that runs in the browser's Wasm runtime; these are mutually exclusive primary execution boundaries. |
| D2: Python execution location | Local CPython child process | D3: isolation boundary | Browser Worker/Wasm sandbox as the primary containment | A native host child process does not inherit the browser's Wasm sandbox. It needs an OS-specific process/container/VM security boundary. |
| D2: Python execution location | Browser Pyodide Worker | D3: isolation boundary | Docker helper/network/mount policy as the primary containment | Docker controls only apply if code is sent to and executed in the container; a browser worker does not use that Docker job. |

**Surviving configurations** (conditional; none is empirically validated on target student machines):

| Config | D1: page origin and path to local runner | D2: Python execution location | D3: isolation boundary | Notes |
|---|---|---|---|---|
| C1 | Public HTTPS static site | Pyodide Worker | Browser/Wasm plus explicit Worker CSP | Removes loopback and Docker; runner assets and Worker policy must be self-hosted/configured and tested. |
| C2 | Local static launcher over `localhost` | Pyodide Worker | Browser/Wasm plus explicit Worker CSP | Strong local-copy candidate; serves static assets only and avoids file-origin asset loading and a Docker API. Adds one local start action. |
| C4 | Public HTTPS site → loopback helper | Fixed Docker image via allowlisted helper | Docker namespaces/resource limits plus strict helper boundary | Preserves frozen HL and user does not need to change the public page's deployment; adds Docker, LNA permission, and privileged-daemon concerns. |
| C5 | Local same-origin launcher | Fixed Docker image via local helper | Docker boundary plus helper API | Avoids public-page LNA but retains Docker setup and Docker daemon trust. |
| C6 | `file:` page → loopback Docker helper | Fixed Docker image via allowlisted helper | Docker boundary | Technically conceivable, but file-origin/CORS/LNA behavior differs by browser and is not validated; do not promise general support. |
| C7 | Public HTTPS site → loopback helper | Native CPython child process | OS sandbox / restricted token / job limits | Requires different, testable sandbox implementation for each supported OS; not yet a portable candidate. |
| C8 | Local static launcher | Native CPython child process | OS sandbox / restricted token / job limits | Same OS-specific burden as C7; local static origin removes the remote-page permission hop. |

**Eliminated from the general support set:**
- C3 direct `file:` + Pyodide Worker loading local assets: incompatible on the documented browser same-origin file-loading path; C2 is the replacement to test.
- C9 manually launching CPython without browser integration: no editable in-page execution/output path, so it does not meet the terminal goal.

**Unexpected survivor:**
- **C2 — localhost static-file serving + Pyodide Worker** survives as a non-Docker local mode. The local process only serves static files; Python runs in the browser's WebAssembly sandbox. It avoids Docker Desktop, Docker API exposure and browser-to-execution-helper requests. It does introduce a local start command and keeps browser/version limits. This configuration was not in the original HL plan and cannot be adopted by this role without the Coordinator's frozen-scope/amendment route.

## Findings

### C1: WebAssembly contains host access only through the embedder, and Pyodide exposes browser APIs

WebAssembly's security model isolates a module from the host runtime and requires access through APIs supplied by its embedder. Pyodide explicitly supplies a JavaScript↔Python interface and documents full Web API access in the browser. In a dedicated Worker, user code lacks direct document DOM access, but it can still reach APIs exposed in that worker. So “Wasm” alone is not the threat model; the imported JavaScript surface and the browser policy are.

**Attack:** A student program imports `js`, repeatedly allocates memory or emits huge output, loops forever, sends network requests, or tries to spoof a success message. A dedicated Worker protects page responsiveness from ordinary synchronous loops, and the owning page can call `Worker.terminate()` immediately and start a fresh worker. Main-thread output must be capped, rendered as text, and accepted only through a narrow message schema. This does not establish a hard per-worker memory quota: browser/engine memory pressure can still kill or degrade the tab, and message size may be allocated before the page truncates it. User code can mutate its own interpreter/checker state, so a “pass” must remain advisory and non-grading as the HL already requires. Sources: [WebAssembly security model](https://webassembly.org/docs/security/), [Pyodide browser/Web API exposure](https://pyodide.org/en/stable/), [Pyodide global/JavaScript access](https://pyodide.org/en/stable/usage/quickstart.html), [terminating a worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

**Counter-evidence to the strongest claim:** WebAssembly provides a meaningful browser-process containment layer but does not prove absence of engine vulnerabilities, memory exhaustion, data exfiltration or checker manipulation. No source reviewed establishes a supported per-worker hard memory/CPU budget across the target browsers. Do not promise “unbreakable sandbox” or anti-cheating.

### C2: Browser network restrictions are a deployment property, not an automatic Pyodide property

CSP `connect-src` can restrict `fetch`, XHR, WebSocket, EventSource and `sendBeacon`. However, ordinary workers are generally governed by the CSP response header for the worker script itself; they do not automatically inherit the course document's policy unless the worker is a blob/data-origin worker. Therefore, a static-site CSP meta tag alone may leave a same-origin external worker under a different policy. The site must either deliver a strict CSP header with the Worker file, deliberately use a blob Worker whose inheritance is tested, or use a separately controlled runner origin. Sources: [CSP in workers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#csp_in_workers), [connect-src API coverage](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src).

**Attack:** Allowing network solely so the worker can fetch Pyodide from a CDN also lets submitted code invoke the same allowed connection APIs; `connect-src 'self'` still permits requests to the course origin. A stronger candidate is to self-host/pin the Wasm and package assets, use a runner origin with no credentials or write endpoint, and prove that code cannot reach arbitrary Internet or sensitive course state. If strict `connect-src 'none'` is required after boot, first prove a practical bootstrap that can initialize Pyodide and packages without reopening general egress. This bootstrap is an implementation spike, not yet a verified capability.

The least-cost threat model is local host protection and advisory feedback, not secret-code confidentiality against the student who wrote the code. If privacy requires zero egress, the network-blocking proof is acceptance-critical and currently unresolved.

### C3: Direct `file:` operation fails the candidate's asset-loading assumptions

Pyodide's documentation says browser JavaScript cannot load local data files such as `file:///...` due to same-origin restrictions, and recommends serving files through a web server. A per-run Worker also needs a permitted Worker script origin. So the local copy cannot simply continue to promise that a student double-clicks `index.html` and gets the same Pyodide terminal. C2 adapts the UX: a small local static-file serving command opens the built course at `localhost`, while code execution remains in the browser and the static server never receives execution requests. This needs explicit testing on Windows/Chrome plus selected Firefox/Safari versions and clear startup instructions. Source: [Pyodide file system and browser file restrictions](https://pyodide.org/en/stable/usage/file-system.html), [Pyodide Web Workers](https://pyodide.org/en/latest/usage/webworker.html).

This local server is not a code runner or course backend, but it is still a local server process. The project's North Star says not to add a project-owned server. The Coordinator/owner must determine whether a generic static-file launcher counts as an allowed local preview aid under that boundary; otherwise local `file:` support needs another proven route or must be explicitly limited. Research cannot decide that interpretation.

### C4: Docker narrows the execution process but transfers authority to a local helper

Docker documents resource, filesystem, network, capability and process options, but also documents that mounting a Docker socket gives full control of the host daemon. A browser-facing helper must therefore use a small allowlist of task IDs/image digests/input size and hard-coded container options; browser input must never supply a Docker command, image, mount, socket, device, network or option. The helper itself is a privileged boundary and must be locked to loopback, strict origin checks and bounded JSON. Public HTTPS use also carries Chrome's LNA permission/version requirement from Gather. Docker remains a feasible candidate under the frozen HL, but the reviewed documentation does not prove its application helper or container profile secure. Sources: [Docker run security and mount controls](https://docs.docker.com/reference/cli/docker/container/run), [Docker security](https://docs.docker.com/engine/security/), [Chrome Local Network Access](https://developer.chrome.com/docs/modern-web-guidance/guides/security/local-network-access).

### C5: Correct checks should be deterministic and expressly non-authoritative

An assertion can reliably compare an observed output, exception or state transition for a fixed fixture. It can still miss alternate correct designs if too narrow or report a failure when setup/fixtures are incomplete. Structural AST/import tests are especially incomplete as proof of architecture. A submitted program can also monkeypatch its interpreter if the tests run in its process. Under the approved UX, keep the result as practical feedback; isolate tests from the student's points/checklist/completion state and preserve oral/peer evaluation. For a clean run, send the full editable program to a fresh worker, execute one complete exercise, cap accepted output, and discard/recreate the worker after timeout or explicit reset. If a persistent REPL is required, treat state retention and contamination as an additional test dimension.

## Checkpoint

| Found | Remaining |
|---|---|
| Pyodide/Wasm Worker is a credible candidate for protecting the host OS from ordinary code and removing Docker/helper setup, with hard timeout through Worker termination. | Hard memory/CPU ceilings, engine escape resistance, strict network-egress proof and current browser compatibility remain unverified; do not claim absolute isolation. |
| Same-origin local static serving can make local Worker/Wasm assets load without Docker or a code-running helper. | It changes the direct-open local UX and may conflict with North Star's no-project-server boundary; owner decision required. |
| Docker can enforce useful restrictions but a helper with Docker API access is a powerful local deputy; all runtime arguments must be fixed and allowlisted. | No helper implementation exists to assess; target machine test and security review remain mandatory. |
| Runtime feedback can test observable behavior without altering course scoring or completion; oral and subjective architecture criteria remain human. | Per-lab oracle/fixtures and false outcomes need acceptance criteria and later implementation verification. |
| Owner allows site adaptation while asking for a safer non-Docker alternative. | Selecting Pyodide instead of Docker changes frozen HL §3/§4. The Coordinator must use the existing amendment path before implementation; current North Star/server interpretation is also open. |

**Sufficiency:**
- [x] External source used? — Pyodide, WebAssembly, CSP/Worker and Docker primary documentation.
- [x] Briefing gap closed? — concrete conditional candidate, local-copy consequence, security limits, and required owner boundary are explicit.
- [x] Pairwise incompatibility checked? Surviving configurations listed?

Stage complete: YES
→ User decision: Continue to synthesis. Candidate for Coordinator review: Pyodide in a fresh dedicated Worker, strict worker-level CSP and advisory checks; pair with a static-only localhost launcher for downloaded copies only if the owner accepts that local UX/boundary. Do not implement until the frozen HL route is resolved.
