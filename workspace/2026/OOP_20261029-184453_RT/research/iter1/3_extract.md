# Extract — "What do we NOT see?"
> **Mindset:** Analyst. You have the raw findings. Now build structure. Make combinations visible that nobody proposed.
> **Test:** "Does my configuration space reveal at least one combination that nobody proposed in the Briefing?"
> Parent: [HL-OOP_20261029-184453_RT.md](../../HL-OOP_20261029-184453_RT.md)
> Goal: Студенты получают безопасный запуск, строгую практическую обратную связь и учебные аналоги при ошибках.

## Configuration Space

The first three dimensions from Gather describe a deployment, an execution engine and its primary containment boundary. These rows are candidate compositions, not compatibility claims; especially `file:` worker support remains to be verified. D4 is an independent assessment axis and is mapped afterward rather than multiplied into every runtime row.

| Config | D1: page origin and path to local runner | D2: Python execution location | D3: isolation boundary |
|---|---|---|---|
| C1 | Public HTTPS page | Pyodide WebAssembly in a dedicated browser Worker | Browser/Wasm sandbox; Worker separates execution from UI; same-origin/CSP policy remains relevant |
| C2 | Same-origin local launcher serves page and worker assets | Pyodide WebAssembly in a dedicated browser Worker | Browser/Wasm sandbox and Worker; launcher owns asset version and local origin |
| C3 | `file:` page | Pyodide WebAssembly worker loaded from local assets | Browser/Wasm sandbox; worker-origin and file URL restrictions must permit the topology |
| C4 | Public HTTPS page | Fixed-image Docker through a loopback helper | Docker `--network none`, no mounts/devices/socket, read-only root plus bounded temp storage, unprivileged user, dropped capabilities, seccomp, `no-new-privileges`, cgroup limits |
| C5 | Same-origin local launcher serves page and helper | Fixed-image Docker through that launcher | Docker controls as in C4; browser-to-helper request can remain same-origin |
| C6 | `file:` page | Fixed-image Docker through a loopback helper | Docker controls as in C4; browser file-origin/CORS/LNA rules still apply |
| C7 | Public HTTPS page | Local CPython child process through a loopback helper | OS-specific job/container/VM sandbox, restricted token, temporary directory and process/resource limits |
| C8 | Same-origin local launcher serves page and helper | Local CPython child process | OS-specific sandbox and launcher-controlled API; no browser-to-helper cross-origin path |
| C9 | `file:` page | Manually launched local CPython, separate from browser | Host account and OS permissions; no automatic browser execution or cross-origin API |

### D4: assessment axis mapped across configurations

| Assessment configuration | Candidate application | Boundary to retain |
|---|---|---|
| Deterministic example/output or exception assertions | Labs 1–3, 5–8 where the contract specifies state, error or event outcome | Exact inputs and expected outputs must be visible; one failed mandatory assertion returns instructional feedback |
| Fixed scenario equivalence | Lab 4's ten fixed transactions; Lab 9's accepted in-scope simulator scenario | Test vectors and comparison oracle must be defined; do not import broader PDF behavior into the narrowed web task |
| Structure/import/dependency checks | Lab 9 architecture rules and other explicitly structural criteria | Narrow AST/import rule can miss semantic violations or reject valid alternatives; cannot stand in for runtime behavior |
| Human explanation/peer check | Oral defense and design trade-offs in all nine PDFs | Remains human; terminal feedback does not attest understanding, award points or complete the lab |

## Findings

### E1: A browser-native runtime removes the browser-to-helper edge

Pyodide is CPython compiled to WebAssembly and can run in a browser; its documentation demonstrates running it from a dedicated Web Worker so a long synchronous computation does not block the page UI. For a public HTTPS course, this removes the localhost helper, Docker installation and browser LNA permission from the basic execution path. A bundled, version-pinned runtime could also avoid loading packages dynamically for each attempt. This concrete combination (public static page + Pyodide worker + course-controlled harness) was not an explicit option in the Briefing; it is a new configuration to challenge, not a recommendation yet. Sources: [Pyodide overview](https://pyodide.org/en/stable/), [Pyodide quickstart](https://pyodide.org/en/stable/usage/quickstart.html), [Pyodide Web Worker guide](https://pyodide.org/en/latest/usage/webworker.html).

Pyodide's browser integration exposes a JavaScript ↔ Python foreign-function interface, and its overview says Python in the browser has access to Web APIs. A Worker runs in a separate global context and cannot directly manipulate the document DOM, but the existence of a Worker does not itself remove network-capable APIs or establish a strong security boundary from the browser. Any safety design must inspect the exact globals/APIs exposed, CSP/worker origin, package loading and output channel. WebAssembly's own security model describes module sandboxing with access only through embedding APIs; the embedding therefore remains part of the trusted boundary. Sources: [Pyodide overview](https://pyodide.org/en/stable/), [Pyodide worker guide](https://pyodide.org/en/latest/usage/webworker.html), [WebAssembly security](https://webassembly.org/docs/security/).

Pyodide's compatibility material also distinguishes browser Python from native CPython: available packages are those built for Pyodide; browser file/network/SSL behavior differs, and some stdlib functions are stubs or constrained. It recommends current browsers, but its visible baseline table is old and cannot serve as an approved 2026 support matrix. This project uses standard-library educational samples in its current lesson examples; compatibility still needs exercising against actual lab starter code and any checker dependency. Source: [Pyodide compatibility constraints](https://pyodide.org/en/stable/usage/wasm-constraints.html), [Pyodide browser usage](https://pyodide.org/en/stable/usage/index.html).

### E2: Runtime and checker can have different trust requirements

All three automatic-checker patterns in D4 need a trusted expected result: deterministic examples/assertions, a frozen set of before/after scenarios, or source-structure rules. Student code and checker code sharing one interpreter can let submitted Python alter builtins, imports, globals or test helpers. A local teaching result can remain explicitly advisory and independent of points/completion; a checker whose result must be resistant to deliberate tampering needs a separate execution/authority boundary. The frozen North Star and HL already make the former boundary explicit: terminal checks do not grade or complete work, while oral defense/peer review remains human.

The PDF evidence yields useful per-lab groupings without conflating all criteria into one universal “pass”: labs 1–3 specify invariants, amounts, exceptions and event dispatch tests; labs 4 and 9 include fixed-scenario equivalence or architecture constraints; labs 5–8 specify substitutability, injected dependencies, generated object types, retries, short-circuit and observer effects. The oral-defense block remains separate in every PDF. HL's existing narrowed scope for labs 7–9 still governs what may be demonstrated on site.

### E3: User steering expands the comparison while the frozen contract stays intact

The owner asked to consider a non-Docker route if it can provide safe and correct terminal behavior, and asked for a concrete design. Research can compare such candidates and make a bounded recommendation, but cannot rewrite frozen HL §3/§4. A browser-native runtime may fit the static/public site and avoid installing Docker; if selected, that changes the currently frozen execution architecture and needs the existing HL amendment route before implementation. No provider/service or cloud runner is assumed because the North Star keeps code local and disallows a project server.

## Checkpoint

| Found | Remaining |
|---|---|
| Pyodide in a dedicated Worker is a concrete browser-native alternative that can remove the local helper and LNA hop for the public static site. | Need challenge of Python↔JS/Web API exposure, Worker termination/restart, CSP/network control, memory/output limits, package availability, startup time and browser matrix. |
| Docker/helper remains the directly frozen HL design; local launcher, browser Worker and manual-run topologies produce different setup and origin paths. | No topology has been proven on the project's target student devices; `file:` behavior is particularly unverified. |
| Advisory runtime feedback and tamper-resistant grading are different requirements; this course contract requires the former and prohibits changing points/completion. | Each proposed checker must be checked for user-code interference and false outcomes; uncertain educational claims need human assessment. |
| Owner explicitly permits research into alternatives and asks for a concrete idea. | Choosing a non-Docker architecture is a frozen-scope amendment decision, not a Researcher implementation choice. |

**Sufficiency:**
- [x] External source used? — official Pyodide and WebAssembly documentation.
- [x] Briefing gap closed? — adds browser-native candidate and distinguishes advisory feedback from grading; platform/behavior validation remains explicitly open.
- [x] Configuration Space built from Gather dimensions?

Stage complete: YES
→ User decision: Continue to Challenge; no architecture is selected or applied here.
