# Extract — "What do we NOT see?"
> **Mindset:** Analyst. Expose combinations and dependencies; do not choose or rank them.
> **Parent:** [HL-OOP_20261014-215543_INIT.md](../../HL-OOP_20261014-215543_INIT.md)
> **Goal:** Initialize OOPoman with TFW Full v3.9.2 and preserve the owner's approved project scope.

## Configuration Space

The matrix crosses Gather's dimensions (course access × Python-checking environment × offline delivery). Each row names conditions that must coexist; it does not rank configurations or establish that Chrome supports the exact combination.

| Config | Course material access | Python checking environment | Offline dependency delivery |
|---|---|---|---|
| C1 | User selects the course root and app works through directory handles | Browser Python/WASM reads selected files through an adapter/mounted filesystem | App, Pyodide runtime, and needed packages all locally available; first open can load them |
| C2 | App package includes a curated local copy of course material | Browser Python/WASM consumes bundled inputs | App, runtime, and exact packages all included in one local bundle |
| C3 | User selects files or folders through browser picker/drop/import | No execution in browser; site presents instructions and receives learner-provided results | Core app and source material are local; Python/Git/pytest/IDE remain learner-managed installed tools |
| C4 | Local server/launcher exposes a defined local content root | Existing local Python/pytest is used outside browser process, with browser acting as lesson UI | Local launcher, app shell, and course assets are available without external network; exact boundary is unspecified |
| C5 | Extension page opens with packaged app assets; user separately selects course folder | Python/WASM runs in extension page or an extension sandbox context | Extension package includes runtime and packages; selected-folder access and package-origin details must work offline |
| C6 | `file://` app selects course folder through the picker | Python/WASM uses the selected files and packaged runtime | All runtime assets are locally readable and compatible with file-origin/module/CORS behavior |

### Extracted combinations and dependencies

1. **Newly visible configuration:** Pyodide documents a Chrome `NativeFS` route that acquires a directory handle through File System Access API and mounts it into the Pyodide virtual filesystem (`mountNativeFS`). That directly connects the separately supplied course directory with a browser Python environment. The same documentation calls the feature experimental; it does not resolve the INIT's exact `file://`/extension origin or offline first-load requirement. [Pyodide accessing files](https://pyodide.org/en/stable/usage/accessing-files.html)
2. **Source selection is separate from app asset loading:** A user-selected directory handle grants access to the selected course tree; it does not turn arbitrary neighboring files into same-origin module/WASM fetches. Pyodide's FAQ says direct `file:///` fetch of local data fails by same-origin policy, while its NativeFS guidance uses an explicit Chrome file handle. [Pyodide FAQ](https://pyodide.org/en/stable/usage/faq.html), [Pyodide accessing files](https://pyodide.org/en/stable/usage/accessing-files.html)
3. **Offline browser Python needs a complete local dependency set:** Pyodide starts with standard library, and third-party packages are loaded separately. The official bundle guidance says runtime assets can be bundled for offline use, and package wheels may need to be explicitly bundled locally; pointing `packageBaseUrl` to a CDN is another documented configuration, but conflicts with offline core behavior if required packages are not already present. The docs do not show that the course's exact `pytest` version/config is immediately available offline. [Pyodide loading packages](https://pyodide.org/en/stable/usage/loading-packages.html), [Pyodide bundlers](https://pyodide.org/en/latest/usage/working-with-bundlers.html)
4. **Extension permission and extension-local files do not collapse into one grant:** `Allow access to file URLs` covers extension interaction with file-scheme pages, and a sandboxed extension page is deliberately denied extension APIs/direct access to the non-sandboxed extension page. Neither document specifies a right to enumerate `OOP-course/` simply because it is beside the extension directory. Explicit user selection may provide a separate route, subject to unverified exact extension-origin API availability.
5. **Course shell assumptions are not a browser guarantee:** Russian lab PDFs 1–9 collectively state Python 3.12+, pytest, Git, and VS Code/PyCharm, with Lab 9 additionally specifying `python presentation/simulator.py`. These are conventional local development tasks with filesystem/project-tree assumptions. Nothing in those PDFs describes browser Python, a WebAssembly port, or an offline browser package bundle. The alternate syllabus's Python 3.11+/GCC/Clang/IDE list differs in version/language scope; planning must retain this as a source-scope discrepancy rather than silently selecting one syllabus.
6. **WASM, Worker, and iframe evidence covers different properties:** WASM/Pyodide supplies a Python runtime; a Worker moves synchronous execution away from the UI; a sandboxed iframe/extension page changes origin/API access. These properties are not interchangeable and the sources give no full guarantee for untrusted code, an enforced wall-clock ceiling, or adversarial memory limits.

## Checkpoint

| Found | Remaining |
|---|---|
| A documented Chrome directory-handle-to-Pyodide-filesystem path exists (NativeFS); Pyodide runtime/packages may be bundled locally; every Russian lab assumes Python 3.12+, pytest, Git and IDE, while one syllabus says Python 3.11+ and additional compilers. | Whether the NativeFS route works from a target `file://` or extension origin; whether required assets load offline on first launch; actual pytest compatibility/availability; security and resource guarantees; which syllabus governs. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Configuration Space built from Gather dimensions?

Stage complete: YES
→ User decision: Proceed to Challenge, retaining exact-origin, offline package and runner-safety questions as unresolved.
