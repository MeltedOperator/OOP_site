# Challenge — "What do we NOT expect?"
> **Mindset:** Critic. You built the configurations. Now attack them. Every survivor needs evidence. Every elimination needs a reason.
> **Test:** "Would my surviving configurations hold if a different researcher attacked them?"
> Parent: [HL-OOP_20261029-184453_RT](../../HL-OOP_20261029-184453_RT.md)
> Goal: Добавить исполняемые учебные терминалы к теориям и лабораторным всех трёх модулей OOPoman.
> Producer unit: `codex:thread:local:01a187f0-5141-7a03-ad0b-99812be36c8f`
> Parent Coordinator: `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`
> Activation / dispatch source: same-unit Coordinator continuation recorded in [Briefing](1_briefing.md); control blob verified at `f42220bbd28d8522d6d9ac319f446f6c62d1b723`.
> Coordination authority: `HL-OOP_20261029-184453_RT.md @ e408df4237a1aaad5bd016175f2462e3dbb8262d`

## Consistency Check

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|------------|-------------|-------------|-------------|-----------------|
| Network and host API policy | Worker `connect-src 'none'` | Course-copy launch/origin | Pyodide runtime and Wasm loaded from a remote CDN | Browser `fetch()` is governed by `connect-src`, while the documented Pyodide setup loads runtime assets. With this policy the Worker cannot fetch those assets. Allowing the CDN or serving assets locally changes the policy; it does not prove that submitted Python has no access to the same allowed origin. [MDN `connect-src`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/fetch), [Pyodide setup](https://pyodide.org/en/stable/usage/quickstart.html). |
| Course-copy launch/origin | `file://` with sibling local runtime/Wasm files | Execution boundary | Module Worker loading local Pyodide assets | Modern browsers commonly treat local files as opaque origins, so relative module/Wasm fetches can fail CORS. A CDN/Blob-worker arrangement may behave differently, but no exact topology has been demonstrated. This pair is not accepted as a working configuration without browser evidence. [MDN local file origins](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy#file_origins). |
| Course-copy launch/origin | Localhost static-asset launcher | Product boundary | No project-owned server | The launcher itself is a local server process. The owner may propose a North Star exception, but the current boundary and iteration control do not approve it. [NorthStar product boundaries](../../../../../NorthStar.md#product-boundaries). |
| Python compatibility | Pyodide runtime | Course snippets | Native-only `winsound`, sockets, `threading`/`multiprocessing`, or host file mounts | Pyodide documents removed or nonfunctional APIs and an in-memory default filesystem. These are incompatible where the runnable snippet actually depends on them. Legacy code shown for refactoring is not automatically a requirement to run that legacy effect. [Pyodide constraints](https://pyodide.org/en/latest/usage/wasm-constraints.html), [filesystem](https://pyodide.org/en/stable/usage/file-system.html). |
| Feedback oracle and assessment | Automatic pass for architecture/report/oral criteria | Current assessment contract | Human explanation and course scoring remain separate | A deterministic output cannot prove the learner's design rationale, README/UML quality or oral defense. These criteria must remain manual; a terminal result cannot alter quiz/checklist points or completion. [HL target and DoF](../../HL-OOP_20261029-184453_RT.md). |

**Owner direction at Challenge entry (2026-10-29):** Roman directs a Pyodide-specific network exception for everything needed for correct operation, while keeping the site local and without a database. This is recorded as owner-originated change direction, not applied contract state. It covers the runtime and its required resources; the concrete endpoint/package list and whether any current course example needs outbound requests from student Python have not been evidenced. Frozen HL §6 still rejects network access until the authorized amendment route resolves the proposal. Researcher does not alter HL or decide the amendment.

**Surviving configurations** (from Extract, after removing incompatible pairs):

| Config | Execution boundary | Course-copy launch/origin | Network and host API policy | Notes |
|-------|---------------------|--------------------------|------------------------------|-------|
| C1 | Pyodide Worker | Public HTTPS static copy | Permit the pinned runtime asset origin; decide separately whether learner code may use browser network APIs | Compatible with static hosting and no database. Runtime executes in the browser; no code has to be submitted to an OOPoman backend. Still needs a resolved Worker CSP, exact network-exception scope, and browser evidence. |
| C2 | Pyodide Worker | Local site on HTTP(S) origin already available to the learner | Runtime and page assets served from that origin; external connections can remain a separate policy choice | Can keep the course data and progress local. Does not require a database. If this requires adding a project-owned local server, it conflicts with North Star unless the owner resolves that boundary. |
| C3 | Pyodide Worker | Local `file://` copy, with runtime from a CDN and a Blob/module-worker bridge | CDN network allowance; `file://` origin behavior varies and is subject to CORS | A possible topology, not a demonstrated survivor. Needs a real browser test on the target matrix before it is promised. |
| C4 | Docker through helper | Local static page and loopback helper | Container network disabled; helper/loopback route has separate browser-origin conditions | Remains the frozen baseline, but Docker/helper were unavailable on this host and would not satisfy the owner's preference for a non-Docker simpler path without further review. |

**Unexpected survivors** (configurations that survived but were not initially favored — worth highlighting):
- **C1:** A public static site can load pinned Pyodide assets and execute Python fully in the student's browser while keeping OOPoman state in `localStorage`; no OOPoman database or code-upload endpoint is necessary. The browser still requests runtime assets from the permitted origin, and any student-code network permission must be decided separately.
- **C3:** The site may remain a local file copy while the runtime comes from a CDN, but local-file origins are browser-dependent. This is only a research candidate, not a support claim.

## Findings

### C1: The network exception has two different scopes

The simplest policy distinction is between **runtime bootstrap traffic** and **learner-program traffic**. A Worker loads pinned JS/Wasm/package assets before it runs examples. Pyodide also exposes browser APIs, and its HTTP support uses browser networking under normal browser policy/CORS. A blanket Pyodide exception could therefore allow more than asset delivery. [Pyodide quickstart](https://pyodide.org/en/stable/usage/quickstart.html), [Pyodide browser network behavior](https://pyodide.org/en/latest/usage/wasm-constraints.html).

A narrow candidate is: download only a pinned Pyodide distribution (and any explicitly selected package bundle), run the student's Python in the Worker, and deny unrelated external endpoints. This keeps code local and avoids a database. However, when initialization and submitted code use the same Worker/global policy, the same network allowlist can also be used by code. **Inference:** enforcing “bootstrap may fetch these assets, user code may not fetch anything” likely needs a more separated load design or an owner-approved simpler boundary; current docs alone do not prove that it can be done in one small Worker setup. If the owner intends to permit browser network requests from student programs too, CORS and browser behavior still constrain them, but requests may reach external origins. That would be a broader §6 exception and should be stated explicitly.

The website can remain static and database-free under either interpretation: page content is static, Python runs in the browser, and existing progress remains in local storage. A CDN request for the runtime does not itself add an application database. It does mean a downloaded course needs Internet access for those assets unless they are bundled. No request or data-flow experiment ran on this host.

### C2: The open-local-copy promise is the harder product edge

The official Pyodide quickstart documents a CDN setup and a downloadable distribution; MDN documents opaque origins and CORS errors for local files. A direct-open copy may work through a carefully constructed external-asset/module Worker path in some browsers, but no official guide or local experiment here establishes that end-to-end. If it fails, a local static server is the direct asset-serving route, and that adds a process which North Star currently excludes. Keeping the public HTTPS version simple does not resolve how a downloaded file copy starts. Sources: [Pyodide quickstart](https://pyodide.org/en/stable/usage/quickstart.html), [MDN CORS for non-HTTP URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSRequestNotHttp), [North Star](../../../../../NorthStar.md#product-boundaries).

### C3: Beginner guardrails address common mistakes, not a hard memory ceiling

A Worker can be stopped by its owner, which gives a straightforward timeout path for accidental infinite loops. Output can be truncated before display and each run can receive a fresh Python namespace. These controls do not create a strict memory limit; a fast accidental allocation loop can consume browser memory before the timeout fires. Pyodide does not provide native host-directory access by default (MEMFS is in memory), but APIs such as browser file picking/mounting are separate and should not be added to the teaching console. No real timeout, output or memory test was possible here. Sources: [Worker `terminate()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate), [Pyodide filesystem](https://pyodide.org/en/stable/usage/file-system.html).

### C4: Lab feedback can be strict for concrete outputs and honest about the rest

Challenge of the per-lab map found no reason to auto-pass design quality, README/UML, coverage claims without a defined suite, or oral defense. For a simple student console, fixed bounded inputs can test invariant edges, Decimal totals, event order, handler continuation, DI registration and adapter status without contacting hardware, a real bank or a database. Lab 7's site version already uses a local fictional gateway and explicitly omits networking/retries; labs 8–9 are narrower than their PDFs. Restoring PDF scope or giving a green status based on self-reported checkboxes would produce misleading feedback. Keep objective feedback advisory and retain every existing assessment path unchanged.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Pyodide Worker remains the low-install path for a hosted static course with no OOPoman database. The user's network exception must distinguish runtime asset downloads from network APIs available to submitted Python; a shared Worker policy may not isolate those intentions. Direct `file://` loading is unproven. A static local launcher conflicts with the current North Star. Beginner-focused timeout/output guardrails are feasible as UX controls, but not a hard memory ceiling. | Owner has authorized the network needed for Pyodide operation; pin the exact runtime/package origins and verify whether any in-scope example requires student-code requests. The owner/Coordinator must resolve the frozen §6 amendment and whether local launcher is allowed. Target browser/file-origin test, network policy trial, startup/runtime timing, output/timeout/memory observation and criterion fixtures remain absent because no browser or Docker runner exists on this host. |

**Sufficiency:**
- [x] External source used? — current official Pyodide and MDN documentation.
- [x] Briefing gap closed? — static/no-database path and user threat-model/network direction are bounded; local file and runtime validation gaps remain explicit.
- [x] Pairwise incompatibility checked? Surviving configurations listed?

Stage complete: YES
→ User decision: Choose whether the Pyodide network exception is assets-only or also includes requests from student code; then take iteration findings to `/tfw-plan` for the frozen-contract decision.

---
**Research scope:** focused single-pass; owner clarification recorded as a proposal, not a resolved amendment. No deliberate attack exercise, runner implementation, test, or target-browser/Docker experiment was performed. Official sources checked 2026-10-29. No HL/status/control change.

