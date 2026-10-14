# Challenge — "What do we NOT expect?"
> **Mindset:** Critic. Attack assumptions at origin, permission, offline, and malicious-code boundaries.
> **Parent:** [HL-OOP_20261014-215543_INIT.md](../../HL-OOP_20261014-215543_INIT.md)
> **Goal:** Initialize OOPoman with TFW Full v3.9.2 and preserve the owner's approved project scope.

## Consistency Check

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|---|---|---|---|---|
| Offline dependency delivery | Required runtime/package fetched from CDN after launch | Offline requirement | User disconnects after local launch | Required core behavior has a network dependency. Pyodide docs show CDN as an example and also document local bundling; only the former is directly incompatible with disconnected use. |
| Course material access | Direct `fetch(file:///.../OOP-course/...)` | Python/WASM runtime | Browser Pyodide loads the file via fetch | Pyodide FAQ documents local data-file fetch failing same-origin security. A user-selected handle/NativeFS is a different route and is not eliminated. |
| Execution context | Execute untrusted code in sandboxed extension page | Privileged extension API | Same code directly calls extension APIs | Chrome's sandboxed page is intentionally denied extension APIs; cross-context messaging would need to be constrained. |

**Surviving configurations** (not validated in a target build):

| Config | Access | Python checks | Offline dependencies | Notes |
|---|---|---|---|---|
| C1 | Selected directory handle | Pyodide plus `mountNativeFS` | App, runtime, and required wheels locally bundled | A documented API combination exists, but the Pyodide guide describes NativeFS as experimental; exact Chrome launch origin and `pytest` fit remain open. |
| C2 | Course assets bundled with app | Pyodide/WASM | All assets and packages bundled locally | Avoids separate folder access during lessons, but owner source/copy/version policy and package contents are not selected. |
| C3 | Picker/drop/import files | No in-browser execution | App and course assets local; Python/pytest installed by learner | Avoids a site-owned runner but may not provide the automated staged checks contemplated by HL; no approved decision resolves this tradeoff. |
| C4 | Local server/launcher exposes files | Existing native Python outside browser | Local shell/app/dependencies supplied | Requires defining the local launcher/process and its ownership, installation, and OS expectations. |
| C5 | Extension package plus separately selected directory | WASM in a separated extension sandbox | Package includes runtime and packages | Extension sandbox removes extension API access, which is compatible with low-privilege execution but not with assuming access to privileged extension operations from the student-code context. Exact picker/origin behavior and resource controls remain unverified. |

**Unexpected survivors**

- **C1:** Pyodide's current accessing-files documentation explicitly connects a Chrome File System Access API directory handle to its virtual filesystem through `mountNativeFS`. This was not stated in the briefing as a concrete combination. It survives as a research-backed possibility conditional on origin support, permission handling, package availability, and an offline proof.
- **C3:** A fully offline lesson site with learner-managed native Python/pytest remains compatible with the sampled assignment wording; the browser need not execute the code. This does not meet any stronger requirement for automatic in-site code checks and cannot be chosen by this researcher.

## Findings

### C1 — A directory handle narrows, but does not close, the local access gap

The strongest positive evidence is Pyodide's own Chrome recipe: acquire a `FileSystemDirectoryHandle`, then call `mountNativeFS()` to make that user-authorized directory visible in Pyodide's virtual filesystem. That supports a path to separate `OOP-course/` content without copying it into app code. However, Pyodide labels NativeFS/Chrome support experimental, the Chrome FSA docs require secure context plus user gesture, and W3C permits user agents to treat `file:` as untrustworthy. The sources do not claim that Chrome supports this exact workflow when its app assets are opened by `file://` or from a `chrome-extension://` page. No Chrome build or API test was run. [Pyodide accessing files](https://pyodide.org/en/stable/usage/accessing-files.html), [Chrome File System Access](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access?hl=en), [W3C Secure Contexts](https://www.w3.org/TR/secure-contexts/)

### C2 — File-URL permission is not a general folder grant

Chrome documents enabling extension access to file URLs as a user-controlled permission to operate on `file://` pages. It does not document that this setting grants recursive path access to other local directories. Chrome extension pages can load resources from their own package; a sandbox page is separately isolated, has a unique origin, and cannot directly use extension APIs. Consequently an extension route to `OOP-course/` would still need a separate, documented user file-picker/handle route; exact API availability in that extension context remains to verify. [Chrome extension permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions), [extension resource packaging](https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources), [extension sandbox](https://developer.chrome.com/docs/extensions/reference/manifest/sandbox)

### C3 — Offline first-use needs local entry assets as well as runtime assets

Pyodide's browser examples load runtime files and packages from URLs; its bundler documentation gives local bundle/offline handling and calls out that needed wheel files may need explicit copying. Separately, iteration 1 recorded that a PWA service worker cannot serve an uncached first visit. Thus a local cache after setup does not prove offline first launch, and an offline page does not prove the Python runtime/pytest wheel set is locally available. A local directory picker solves selected course data, not how the initial HTML/module graph and WASM load under `file://`. [Pyodide bundle guide](https://pyodide.org/en/latest/usage/working-with-bundlers.html), [Pyodide package loading](https://pyodide.org/en/stable/usage/loading-packages.html), [Chrome PWA offline guidance](https://developer.chrome.com/docs/lighthouse/pwa/works-offline?hl=en)

### C4 — Worker responsiveness and sandbox origin are not a complete code safety proof

Pyodide workers run computation separately from the UI, and Pyodide exposes a Python/JavaScript FFI with access to browser Web APIs. Chrome's extension sandbox restricts extension APIs and origin reach, but neither Pyodide's cited documentation nor Chrome's sandbox contract specifies an adversarial-code policy with a hard CPU and memory ceiling. A separate thread helps UI responsiveness; sandbox origin separation limits authority; terminating work or constraining permissions are different controls. The inspected primary sources do not establish that these controls compose into a safe runner for arbitrary student code. [Pyodide Web Worker](https://pyodide.org/en/stable/usage/webworker.html), [Pyodide overview](https://github.com/pyodide/pyodide), [Chrome extension sandbox](https://developer.chrome.com/docs/extensions/reference/manifest/sandbox), [Chrome extension CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy)

### C5 — Lab requirements imply an installed project environment or a faithful local substitute

The remaining Labs 2–9 each specify Python 3.12+, pytest, Git, and VS Code/PyCharm; Lab 9 asks that the simulator run as `python presentation/simulator.py`. An online browser interpreter does not, by itself, provide Git history/commit links or an IDE, and Pyodide's Python/WASM API is not evidence of exact CPython 3.12 compatibility for these exercises. The alternative syllabus lists Python 3.11+ and GCC/Clang alongside multi-language IDEs. This is a course source/version question; account needs tied to third-party destinations remain outside OOPoman by owner direction. No local compiler/runtime was installed or tested.

## Checkpoint

| Found | Remaining |
|---|---|
| NativeFS gives a real but experimental Chrome directory-handle-to-Pyodide possibility; file-URL permission alone does not grant arbitrary directory traversal; CDN dependencies conflict with offline use; all local Python/runtime assumptions and offline asset staging must be explicit. | Exact FSA and NativeFS support at target `file://` and extension origins; first-launch offline behavior; Pyodide/Python/pytest version fit; malicious-code containment and hard resource limits; authoritative syllabus/runtime scope. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Pairwise conflicts and surviving configurations listed?

Stage complete: YES
→ User decision: Synthesis is warranted; remaining gaps are material for planning and do not authorize a stack or security decision.
