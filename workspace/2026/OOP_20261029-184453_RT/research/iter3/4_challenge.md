# Challenge — «Что опровергает кандидатов?»
> **Mindset:** Critic. Проверить кандидатов встречными ограничениями и оставить только условных survivors.
> **Test:** Удерживаются ли конфигурации при проверке сетевой политики, offline-комплектности, фикстур и timeout?
> **Parent:** [HL-OOP_20261029-184453_RT](../../HL-OOP_20261029-184453_RT.md)
> **Goal:** Добавить исполняемые учебные терминалы к теориям и лабораторным всех трёх модулей OOPoman.
> **Producer unit:** `codex:thread:local:01a187f0-5141-7a03-ad0b-99812be36c8f`
> **Parent Coordinator:** `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`
> **Activation / dispatch source:** Coordinator разрешил документальный Challenge после 404; owner network clarification recorded in `journal/20261029-212919__gate_answer__5d1a.md @ 4eee4d40c82cf7e048197cd003fafb620ea157a0`.
> **Coordination authority:** `status.md` → `HL-OOP_20261029-184453_RT.md @ 9760d4da26ceaf6a6beca2a67c8c2fd377328cbd`

## Consistency Check

Матрица ниже проверяет выявленные существенные конфликты между альтернативами Gather; это не перебор всех математически возможных комбинаций. Результаты остаются документальными.

**Incompatible pairs:**

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|---|---|---|---|---|
| Page launch/origin | Hosted HTTPS или local HTTP(S) | Runtime/package asset supply | Full offline bundle with no remote fallback | Remote bootstrap and no-egress offline contract cannot both describe the same launch mode; choose distinct hosted/offline profiles. |
| Runtime/package asset supply | Pyodide core only | Python compatibility set | Curated package set requiring wheels, offline | Core-only does not establish that needed wheels/dependencies are present; offline completeness requires bundling every selected asset or proving no such package is needed. |
| Python compatibility set | Arbitrary `micropip`/PyPI installation | Runtime/package asset supply | Exact pinned/local package set | Arbitrary installs bypass the selected package manifest and can require unapproved network sources; these are distinct policies. |
| Network boundary | Worker allows loader's required connections | Network boundary | Claim “student Python has no network” without an additional tested restriction | Asset loading permission in the Worker context can also make browser networking available to Python unless an effective separation is demonstrated. `jsglobals` is an untested candidate, not proof. [MDN `connect-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src), [Pyodide API](https://pyodide.org/en/stable/usage/api/js-api.html). |
| Run lifecycle | Leave runaway Worker running | Run lifecycle | Claim timeout stops execution | A UI timeout alone cannot stop execution; parent must terminate the Worker and verify replacement/reset. [MDN `Worker.terminate()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate). |
| Feedback fixture boundary | Student self-reported tests determine pass | Feedback fixture boundary | Independent advisory course check | Self-report is not independent evidence. Existing assessment must stay separate; this pair is excluded by the owner-approved contract. |
| Page launch/origin | `file://` downloaded page | Page launch/origin | Approved offline localhost launcher | These are different launch contracts; `file://` is not an authorized substitute for the approved localhost path, and its Worker/CORS behavior was not tested. |

**Surviving configurations** (candidate-only; no runtime evidence):

| Config | Launch | Asset supply | Network / packages / lifecycle / feedback | Notes |
|---|---|---|---|---|
| C2 | Hosted HTTPS | Same-origin assets | Same-origin Worker policy; curated local packages; fresh Worker; parent checks | Conditional on correct Worker-response CSP and proof that permitted origins meet the current owner rule. |
| C3 | Approved offline localhost | Full pinned local distribution and wheels | No remote fallback; reduced Python-visible JS bridge candidate; fresh Worker+termination; parent/manual checks | Most self-contained offline candidate, but large bundle and all constraints remain unverified. |
| C4 | Approved offline localhost | Core plus exact local wheel/lock set | No remote fallback; reduced JS bridge candidate; fresh Worker+termination; fixed checks | Survives only if every required package/dependency is included and offline canary passes. |
| C5 | Existing local HTTP(S) origin | Same-origin, version-matched assets | `connect-src 'self'`; Python-visible bridge unresolved; reusable Worker optional | Candidate if the origin and Worker response headers are under project control; not proof of a static-only launcher. |

**Unexpected survivors**:
- **C3/C4:** `jsglobals` could separate Python's ordinary `js`-module view from the Worker global used by the loader, allowing a candidate test of bootstrap plus restricted student APIs. The stable API documents the option but not a security boundary; it survives as a testable hypothesis only.
- **C2:** a separately delivered Worker response policy can constrain the Worker context; a parent-page CSP alone is insufficient for a normal Worker. MDN states workers generally do not inherit the creator's CSP, except workers loaded from globally unique origins such as `blob:`/`data:`. Therefore the Worker response/header and its actual URL topology are part of the configuration. [MDN CSP in workers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#csp_in_workers).

## Findings

### C1 — The page's CSP does not automatically secure an ordinary Worker

The earlier framing could be read as though the page's `connect-src` necessarily governed requests made by Pyodide inside a dedicated Worker. MDN says ordinary workers generally are not governed by the creator document's CSP; the Worker script response needs its own `Content-Security-Policy`. Blob/data workers are the documented inheritance exception. `worker-src` controls which worker scripts may be loaded, while `connect-src` controls connection APIs within the policy that actually applies. This is material counter-evidence: policy must be attached and verified at the right response/context. It does not prove that a selected header blocks every Python network path or that pinned runtime loading will work. [MDN CSP in workers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#csp_in_workers), [MDN `worker-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/worker-src), [MDN `connect-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src).

### C2 — Loader allowance is broader; student-code denial remains binding

The owner gate now explicitly allows the trusted Pyodide loader to request resources needed by the selected runtime and permitted package set, even outside the former pinned-origin-only rule. Student Python network calls and arbitrary URL/package installs remain forbidden. The runtime version and package set must be selected, and actual loader destinations/request classes must be enumerated and tested in Phase A. Offline copy must include the required local assets without remote fallback. This resolves the policy wording; it does not prove the loader can be separated from Python's browser APIs. [Owner gate answer](../../journal/20261029-212919__gate_answer__5d1a.md), [current HL authority](../../HL-OOP_20261029-184453_RT.md).

### C3 — “Offline” requires the transitive package closure; full bundle has a size cost

The full Pyodide distribution is documented as 200+ MB. A core archive is not proof of an offline package closure. Any chosen packages (including `pytest` only if actually needed) and their dependencies must be in the local asset set, with no runtime fallback. An exact manifest plus checksums and an offline canary would make the candidate reviewable. Current evidence supports neither a selected bundle nor successful offline launch. [Pyodide deployment](https://pyodide.org/en/stable/usage/downloading-and-deploying.html), [Pyodide package loading](https://pyodide.org/en/stable/usage/loading-packages.html).

### C4 — Fixtures can pass accidentally or test the wrong scope

Candidate Lab 7–9 fixtures are narrow behaviors derived from the current site and must not silently restore PDF scope removed on the site. Same-interpreter assertions can be influenced by the submitted program if checker and code share the interpreter; parent-side checks over bounded structured output reduce direct checker access but still need input/output protocol tests and can be fooled by misleading output unless the parent owns the oracle. Keep results advisory and assessment separate. H2 remains an oracle map, not validated feedback. H3 remains unresolved because no before/after source comparison or implementation was performed. [Current course examples](../../../../../course/data.js), [iteration 2 Extract](../iter2/3_extract.md).

### C5 — Timeout is actionable, but neither memory nor output bounds are proven

The documented `Worker.terminate()` provides a way for the parent to stop a runaway execution context and replace it. It does not demonstrate a hard memory quota; stable v314.0.7 API docs do not document the development-only `maxMemoryBytes` setting. Output truncation depends on OOPoman's message protocol and rendering logic. Thus a finite timeout/restart is a testable control, but it cannot be summarized as complete resource isolation. No timeout, memory pressure, output flood or reset was run. [MDN `Worker.terminate()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate), [Pyodide stable JS API](https://pyodide.org/en/stable/usage/api/js-api.html).

### C6 — The supplied route blocks the planned empirical conclusions

The sole Coordinator-authorized `http://127.0.0.1:8765/course/index.html` attempt returned 404. No course page was reached. The source files and official docs cannot settle browser/OS support, Worker headers, Pyodide package behavior, fixtures, reset, timeout/output or offline completeness. Runtime validation is **BLOCKED / NOT PASSED**, not a Pyodide failure. Resume Phase A only after the Coordinator provides a new allowed browser-test route that actually serves the course and a browser-capable environment; the owner has authorized only the single attempt already made, and no other test route is currently available. No new URL/surface was tried.

## Checkpoint

| Found | Remaining |
|---|---|
| Significant conflicts and survivors are enumerated. The parent document's CSP is not automatically the ordinary Worker policy; Worker response headers matter. Core-only is insufficient evidence for offline package closure; arbitrary `micropip` conflicts with the exact package set; UI timeout without termination does not stop code. C2/C3/C4/C5 remain conditional candidates under the current loader-allow/student-deny rule. Owner gate A6 now resolves the policy: the loader may fetch what selected runtime/permitted packages need; student Python and arbitrary URL installs remain offline. | Worker CSP and actual networking; `jsglobals` separation; package closure/offline launch; target browser matrix; snippets/fixtures; timeout/restart/output/reset/resource behavior. The sole authorized route is 404 and no alternative is available. Phase A runtime validation is BLOCKED / NOT PASSED pending a newly authorized functioning browser-test route and browser-capable environment. |

**Sufficiency:**
- [x] External source used? — official Pyodide stable docs and MDN CSP/Worker documentation, checked 2026-10-29.
- [x] Briefing gap closed? — the evidence ceiling and concrete resumption conditions are recorded; runtime proof remains explicitly blocked.
- [x] Pairwise incompatibility checked? — material incompatibilities across the six Gather dimensions are listed and surviving Extract configurations are classified as candidates, not validated results.

Stage complete: YES
→ Coordinator decision: provide a newly authorized working browser-test route/environment, or disposition runtime validation as blocked/not passed. Do not infer runtime success.

---
**Research scope:** documentary counter-evidence only plus the one previously authorized HTTP(S) attempt. No runtime, fixture, CSP, network, timeout, package or browser matrix test ran. No production file changed. No additional browser URL/surface was attempted.
