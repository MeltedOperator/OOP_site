# Gather — "What do we NOT know?"
> **Mindset:** Explorer. Map alternatives before narrowing; every assumed guarantee is a question.
> **Parent:** [HL-OOP_20261014-215543_INIT.md](../../HL-OOP_20261014-215543_INIT.md)
> **Goal:** Initialize OOPoman with TFW Full v3.9.2 and preserve the owner's approved project scope.

## Dimensions

| Dimension | Alt A | Alt B | Alt C | Alt D |
|---|---|---|---|---|
| Course material access | Bundle a reviewed/copy of needed course assets with the local app package | Ask the learner to select the `OOP-course/` directory through a browser picker and work from returned handles | Ask for individual files/folders through file input, drag/drop, or repeated selection | Use a local server/launcher that serves the app and course files from a defined local root |
| Python checking environment | No execution in the browser; present tasks and accept evidence/manual checking | Browser Python compiled to WebAssembly, with runtime and needed packages locally available | Existing local Python and pytest remain learner-managed tools outside the browser | Local helper process/native launcher with browser UI; its availability and trust boundary would need specification |
| Offline dependency delivery | Include all core scripts, runtime binaries/data, course assets, and required packages in a versioned local bundle | Use browser storage/cache after a first successful online install, then test disconnected use | Require an explicit one-time local installation/import step from owner-supplied assets | Keep external references available as links while ensuring the core flow does not depend on them |

## Findings

### G1 — Browser file access is capability-mediated; exact origin behavior remains open

Chrome's File System Access documentation supports user-picked files and directories. `showDirectoryPicker()` returns a directory handle, and ordinary file reads are then performed through that handle; the picker requires a user gesture and secure context. Access is permissioned, revocable, and current permission persistence is bounded: after all tabs for the origin close, the app must request access again. This is a viable capability shape for `OOP-course/`, not evidence that a particular `file://` page or extension page can invoke it in the required configuration. [Chrome File System Access API](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access?hl=en)

W3C Secure Contexts says user agents SHOULD treat `file:` as potentially trustworthy, but MAY exclude it; it also permits an implementation to treat a packaged scheme such as `chrome-extension:` as trustworthy. WHATWG URL delegates `file:` origin behavior to the platform/implementation. Thus secure-context status and the API's availability on the exact launch origin must be verified in target Chrome. [W3C Secure Contexts](https://www.w3.org/TR/secure-contexts/), [WHATWG URL Standard](https://url.spec.whatwg.org/#origin)

Chrome's extension `file://` setting allows an extension to operate on file-scheme URLs after the user enables that setting. The documented permission concerns extension access to pages/URLs; it does not grant arbitrary path traversal to an unrelated sibling directory. Extension package resources are local to the extension package. Chrome's extension sandbox creates a unique origin and removes extension API/direct page access for sandboxed pages. These documented controls do not state that extension code automatically obtains a `FileSystemDirectoryHandle` for `OOP-course/`; exact support is an unanswered Chrome behavior. [Chrome extension permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions), [extension sandbox](https://developer.chrome.com/docs/extensions/reference/manifest/sandbox), [Chrome extension CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy)

### G2 — Offline `file://` and Pyodide asset loading are coupled

The current Pyodide FAQ states browser JavaScript cannot load arbitrary local data files by `file:///...` fetch because of same-origin restrictions. Pyodide's ordinary browser setup loads `pyodide.js` and supporting files via a URL (the docs' example uses a CDN); a separate download/deployment path exists. A local Python-in-browser runtime therefore has nontrivial runtime/WASM/package assets that must be locally available and loadable by the chosen origin. An origin-picker handle can expose selected course files, but it does not establish how app modules/WASM are loaded from a `file://` tree. [Pyodide FAQ](https://pyodide.org/en/stable/usage/faq.html), [Pyodide usage](https://pyodide.org/en/stable/usage/index.html), [Pyodide quickstart](https://pyodide.org/en/stable/usage/quickstart.html)

### G3 — Worker execution addresses responsiveness, not a complete adversarial-code contract

Pyodide documents running Python in a Web Worker so long-running synchronous work does not block the UI; it also documents a JavaScript/Python bridge and, in a browser, access to Web APIs. The worker is a separate global context; that is a concurrency/UI property, not proof that Python cannot exercise the authority available to its worker. Chrome extension sandbox pages use a unique origin without extension APIs, but the docs specify no hard execution-time or memory quota for an untrusted Python program. These sources expose isolation design questions but do not choose or certify a safe runner. [Pyodide workers](https://pyodide.org/en/stable/usage/webworker.html), [Pyodide project overview](https://github.com/pyodide/pyodide), [Chrome extension sandbox](https://developer.chrome.com/docs/extensions/reference/manifest/sandbox)

### G4 — The supplied lab set specifies a Python developer environment, not a browser runtime

Across the eight remaining Russian laboratory PDFs inspected (Labs 2–9), each states `Python 3.12+`, `pytest`, `Git`, and `VS Code / PyCharm` as its execution/development environment. Lab 9 also specifies a one-command run `python presentation/simulator.py`, `pytest tests/ -v`, and Git commit links. The alternate `RF__syllabus_OOP.pdf` lists Python 3.11+, GCC/Clang, Git, IDE choices spanning Python/C++/Java, and external documentation/resource URLs. Relative to Lab 1 (iteration 1), whose stated Python floor is 3.12+, pytest, Git, and IDE, this leaves a syllabus/lab version or scope mismatch and does not establish that pytest or a native Python environment is bundled with the site. The exact files are in `OOP-course/`; no file was modified.

### G5 — External references and project runtime requirements must remain separate

The owner permits outbound references that need Internet while requiring the core site to work offline after local launch. The alternate syllabus includes external Python documentation and GitHub Education links, but lists no network as an execution requirement for the labs sampled; the owner also explicitly placed third-party account requirements outside the OOPoman product boundary. A complete offline claim must distinguish ordinary link destinations from core app/runtime/package dependencies.

## Checkpoint

| Found | Remaining |
|---|---|
| User-mediated directory handles are a documented access path; extension file-URL access is a different permission; `file:` trust is not uniformly mandated; all eight remaining Russian labs repeat a local Python/pytest/Git/IDE environment. | Chrome target-origin picker support, standalone extension access to the sibling tree, offline first launch and runtime asset loading, hard safety/resource guarantees, and exact syllabus/course-version scope remain unverified. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Dimensions identified?

Stage complete: YES
→ User decision: Proceed to Extract within the committed focused dispatch; retain origin and runner guarantees as open.
