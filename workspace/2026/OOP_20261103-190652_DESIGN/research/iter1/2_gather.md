# Gather — «Что мы пока не знаем?»

> **Mindset:** Explorer. Map unknown territory before narrowing choices.
> **Test:** Can I name the independent dimensions and alternatives without turning one into the recommendation?
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать курс OOPoman понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; Gather continuation authorized by `journal/20261103-201345__gate_answer__6e91.md @ 87bbdc6483db0203d7bc51dac19100e6104eca68`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Mode: `focused` (one OODA pass)

## Dimensions

| Dimension | Alt A | Alt B | Alt C | Alt D |
|---|---|---|---|---|
| Static code presentation | Keep plain escaped `<pre><code>` blocks | Add curated token spans/limited project-owned rules | Use a client-side highlighter such as Prism or Highlight.js with JavaScript/Python grammars | |
| Code interaction and feedback | Keep read-only examples separate from the existing Python runner | Turn selected examples into editable, runnable exercises | Use a full editor with language support and separately configured live diagnostics | |
| Asset delivery | Add no third-party code | Bundle selected library files with the local course assets | Load scripts/styles from a remote CDN or dynamic loader | |
| Progress and certificate data | Read course and exam stores independently and combine only their displayed facts and joint gate | Reshape or copy data into a combined store/view | Withhold combined progress/certificate availability when either store is missing or unrecognized | |

These are distinct choices: how static examples are rendered, whether students edit code in those examples, how any added client code reaches the page, and how two independent local state stores are consumed. They are open alternatives; this stage does not select among them.

## Findings

### G1: Existing pages and code surfaces

`course/index.html` loads local `data.js`, `storage.js`, `terminal.js`, and `app.js`; it does not load a highlighter or editor library. `course/app.js` emits static code blocks as escaped text inside `<pre><code>` without a language class (`renderBlocks`, around lines 203 and 215). The content source already contains both Python snippets (`course/data.js`, e.g. lines 60, 69, 116) and JavaScript/Python examples (e.g. lines 220+ and 713+). The language must therefore be established by content metadata, explicit markup, or a detector before a language-aware highlighter can apply the intended grammar.

The current Python terminal is a separate, already interactive surface; the course README describes it as a local Pyodide Worker. It is not evidence that the static examples are editable or that the page performs live syntax validation. The site builder copies the `course/` tree as static files (`scripts/build-site.mjs`). A repository-wide manifest/config search found only Pyodide's own `package.json` and `pyodide-lock.json`; no app-level npm manifest, lockfile, or Rollup/Vite/Webpack config is present. Offline completeness remains unverified in the accepted terminal record, so local paths and CDNs cannot be treated as equivalent evidence of offline behavior.

### G2: Official technical alternatives

- **Prism:** Its official docs describe a browser highlighter driven by `<code class="language-…">`, with local `prism.css` and `prism.js` includes. The same page reports a 2 KB minified/gzipped core, about 300–500 bytes per language definition, and themes around 1 KB. For two grammars, that suggests roughly 2.6–3 KB compressed for core plus language definitions, before theme/markup and any packaging overhead; this is a documentation estimate, not a measurement of a candidate bundle. Its docs also state the grammar is regular-expression-based and has known edge-case failures. [Prism documentation](https://prismjs.com/) (accessed 2026-11-03).
- **Highlight.js:** The official custom-download page offers a language-selective build and lists both JavaScript and Python among its common languages. This supports examining a locally included two-language bundle; the page inspected here did not provide a comparable bundle-size estimate. [Highlight.js custom build](https://highlightjs.org/download) (accessed 2026-11-03).
- **CodeMirror:** The official basic-editor example constructs an `EditorView` and explains that line numbers, history, syntax highlighting, bracket tools, completion, and other behavior are configured as extensions. Its system guide says the current packages are ES modules and that use without a bundler or module loader is not practical; JavaScript/Python language packages supply language support. The official extension guide lists linting as a separate extension. Thus choosing a full editor does not itself establish live diagnostics. [Basic editor](https://codemirror.net/examples/basic/), [system guide](https://codemirror.net/docs/guide/), and [core extensions](https://codemirror.net/docs/extensions/) (accessed 2026-11-03).

### G3: Economics source check requested by the owner

The built-in `.tfw/economics/tfw_economics.py` exists and uses only the Python standard library. Its `collect --help` supports `codex.rollout` but requires an exact source path, source ID, source version, and range start; the built-in collector cannot infer these from a chat title or task address. The documented Codex recipe binds the source to the current unit using the rollout JSONL's `session_meta.id`, then reads only numeric usage/model/timing fields and a bounded prefix. It does not require or export message text.

The current execution environment exposes `CODEX_SESSION_ID` and `CODEX_THREAD_ID`; both equal this worker task address. It does not expose the worker rollout JSONL path or an independently observed `session_meta.id`. The recipe distinguishes a rollout's own `session_meta.id` from its root `session_id`, so the environment's thread/session UUID cannot safely be assumed to be the required source ID. No exact numeric range start or source version/path is available. A search of official OpenAI documentation returned no source-path retrieval mechanism that could be validated for this desktop task. No external utility was downloaded: the project already has the numeric collector, and the unresolved item is access to its exact bound source, not a missing parser. No capture was attempted, no source was guessed or inherited from the Coordinator, and coverage remains unmeasured.

The owner then authorized one narrow local-source check. `CODEX_HOME` was unset, so the documented default `C:\Users\tata2\.codex\sessions` was used. That directory exists. A recursive filename-only search for exactly `rollout-01a1a1d7-e37d-78a2-9df0-0d924a659578.jsonl` returned no match; no other rollout filename or file content was inspected. Because the exact worker-named rollout is absent and the gate forbids reading other sessions, a differently named file cannot be safely attributed to this unit. The rollout path, `session_meta.id`, source version, and numeric start remain unavailable. This is a source-locator gap, not a collector-decoding failure.

### G4: Data questions carried to Extract

The approved contract names separate keys `oopoman.progress.v1` and `oopoman.exam.v1`; the architecture record confirms only course state and terminal boundaries, not the detailed exam state shape. This Gather pass does not infer field names or prove the joint certificate predicate. Extract must inspect the actual read/write paths and derive what each store can safely display or gate without merging or mutating them.

## Checkpoint

| Found | Remaining |
|---|---|
| The rendered examples are plain escaped code blocks with no language metadata; the course already has JS and Python examples and a separate Python Worker editor. Local-only and bundled highlighters, full editing, remote loading, and separate-store reads remain distinct alternatives. Official docs establish viable Prism, Highlight.js, and CodeMirror paths and their different integration shapes. The built-in collector and recipe are available; the owner-authorized exact-name search in the current user's sessions directory found no worker-named rollout, and no other session was inspected. Exact own-rollout binding remains unavailable. | Extract exact course/exam storage fields and completion/passing predicates; enumerate actual language blocks and any consistent language metadata; verify certificate name/file mapping; carry forward the no-live-diagnostics and offline-limit constraints. |

**Sufficiency:**
- [x] External source used? Yes; official Prism, Highlight.js, and CodeMirror documentation was inspected. An official OpenAI-docs search was also made for the rollout-path question.
- [x] Briefing gap closed? Yes for the user decision: the owner answered the mode gate and explicitly authorized Gather. The economics binding remains as a documented pre-extraction gap, with the required locator check completed.
- [x] Dimensions identified? Yes; four independent decisions with alternatives are listed above.

Stage complete: YES
→ User decision: Recommend continue to Extract to map the current data paths and exact examples/mappings; no additional owner decision is needed before that stage.
