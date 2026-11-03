# Challenge — «Чего мы не ожидаем?»

> **Mindset:** Critic. Атаковать конфигурации и проверять, что выдерживает контрпример.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать локальный курс ООП понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; Challenge authorized by `journal/20261103-210114__gate_answer__5af0.md @ ab75f4faf8761ed852e02e3cd5321e680b9331e7`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Mode: `focused` (one OODA pass)

## Consistency Check

### Incompatible pairs

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|------------|-------------|-------------|-------------|-----------------|
| Static code presentation | Prism/Highlight.js/CodeMirror requiring a third-party library | Asset delivery | Add no third-party code | The library must come from somewhere; this pair violates the no-third-party alternative. |
| Static code presentation | CodeMirror package-based editor | Asset delivery | Add no third-party code | CodeMirror is the editor library itself, so it cannot coexist with a no-library delivery choice. |
| Static code presentation | Any library expected to render while fully offline | Asset delivery | Remote-only CDN/dynamic loader | Without network access, the library cannot load; no local fallback is present in this configuration. |
| Code interaction and feedback | Editable CodeMirror editor | Asset delivery | Add no third-party code | An editable CodeMirror instance requires CodeMirror code. |
| Progress and certificate data | Reshape/copy stores into a combined source of truth | Frozen HL §3 | Keep separate local stores; combine displayed facts only | The proposed mutation/copy changes the approved data boundary. |
| Progress and certificate data | Withhold course progress when exam data is absent/unknown | Frozen HL §3 | Show course and exam progress separately | Missing exam state cannot erase independently available course progress. A joint certificate gate may remain unavailable. |

### Surviving configurations

These are the Extract rows after applying the explicit incompatibilities above and the frozen requirements that basic JS/Python highlighting is present, stores stay separate, and the joint certificate gate remains required. “Survives” means consistent enough for later decision; it is not a recommendation or proof of usability.

| Config | Static code presentation | Code interaction and feedback | Asset delivery | Progress and certificate data | Notes |
|--------|--------------------------|------------------------------|----------------|-------------------------------|-------|
| C2 | Curated token spans/rules | Read-only examples; runner stays separate | Project-owned local code | Independently read stores; combine displayed facts and joint gate | Could meet required token differentiation if rules cover actual JS/Python snippets and remain legible. |
| C3 | Prism or Highlight.js | Read-only examples; runner stays separate | Locally bundled highlighter | Independently read stores; combine displayed facts and joint gate | Library-based highlighting can mark the required languages; explicit language metadata is needed for deterministic selection. |
| C5 | CodeMirror highlighting | Read-only examples; runner stays separate | Locally bundled editor packages | Independently read stores; combine displayed facts and joint gate | Can technically be read-only, but introduces package integration/build work not present in the current static stack. |
| C6 | CodeMirror highlighting | Editable selected examples | Locally bundled editor packages | Independently read stores; combine displayed facts and joint gate | Possible, but editing is additional behavior beyond the mandatory static examples and existing separate runner. |
| C7 | CodeMirror highlighting | Editable examples with configured live diagnostics | Locally bundled editor packages | Independently read stores; combine displayed facts and joint gate | Possible only with actual diagnostics configuration and validation; highlighting alone cannot substantiate error claims. |

Rows C1 and C4 are eliminated because plain blocks do not provide the mandatory color highlighting and remote-only delivery fails offline operation. C8–C11 are eliminated where “withhold combined display” suppresses independently available course progress; a defensive unknown state can still disable the joint certificate action while showing each source separately. Any merged-store alternative is incompatible with the frozen contract regardless of presentation/editor choice.

### Unexpected survivors

- **C2:** A project-owned tokenizer could cover this small, known snippet set without a runtime library or editor. Its survival depends on demonstrated token coverage and contrast; it is not a syntax checker.
- **C5:** A read-only full editor surface is technically compatible even though editing is unnecessary to use it. This exposes integration cost as a separate question from whether the editor can render code.
- **C7:** Live diagnostics are not ruled out merely because the HL forbids false diagnostic claims, but they need a configured parser/linter and accurate error provenance; syntax color alone is insufficient.

## Findings

### C1: Language guessing can silently color the wrong thing

The current renderer supplies no language class and the data model has no consistent language field. Highlight.js documents automatic language detection as available, while Prism's documented path uses explicit `language-xxxx` classes. In a corpus deliberately containing both JavaScript and Python plus formula-like code-typed content, automatic detection creates an avoidable ambiguity: plausible tokenization is not evidence of the author's intended language. Explicit per-block language metadata (and a plain-text/no-highlight designation for formula text) is the verifiable input for either library. Prism also documents regex-based known edge cases. Neither library's highlighted output validates syntax, so the target must keep highlighting visually separate from diagnostic status. [Prism documentation](https://prismjs.com/) (accessed 2026-11-03); [Highlight.js usage](https://highlightjs.org/usage/) (accessed 2026-11-03).

### C2: “Local” bundle and offline completeness are separate claims

A highlighter stored with the course avoids a required CDN fetch, but the accepted runtime knowledge explicitly says offline completeness of the whole course remains unverified. It is therefore supportable to say a local bundle removes that library's network dependency; it is not supportable to claim the entire course works offline without checking the remaining runtime assets/browser behavior. A remote-only CDN loses highlighting on an offline origin and cannot satisfy a design that promises the presentation in that condition.

### C3: Course and exam can fail independently

Course storage gives defined empty state for a missing key and refuses writes when the stored JSON/top-level version is invalid; unknown or malformed lab entries are preserved and block writes for that lab. A separate exam key can independently be absent, malformed, or inaccessible. Because its schema and pass predicate are not in the inspected/accepted course scope, treating “no exam data” as “failed” or “passed” would invent a fact. The robust compatible configuration shows the course state it can read, labels exam state unavailable/unknown until its own source can be interpreted, and leaves the certificate disabled unless the course-complete and exam-passed predicates are both positively established. The exact display and predicate require an accepted EXAM return; current evidence cannot determine whether H2 holds.

### C4: Mapping is grounded; H3's scope assertion is not yet

The approved HL and existing JPG filenames support the three intended mappings and the «Саржан» → «Санжар» correction. They do not prove how an unaccepted EXAM implementation currently stores or renders the option, nor establish whether modifying that separate task after acceptance would remain in bounds. The owner’s approved DESIGN contract is the current authority for the correction in this task; compatibility with the future EXAM acceptance boundary remains an explicit open question, not a reason to infer or alter that boundary.

### C5: The economics evidence gap remains nonnumeric

The exact own-session rollout source binding remains unavailable under the documented owner gate, as recorded in Briefing and Gather. No usage extraction or measurement was made. This Challenge stage has no numeric economics conclusion.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Explicit language metadata avoids ambiguous highlighting; bundled assets address the library's network dependency but do not prove whole-course offline operation. Store separation permits course facts to remain visible while unknown exam state prevents a positive joint certificate gate. Configurations C2, C3, and C5–C7 survive consistency checks, though editing/live diagnostics carry unproven added value. The approved mapping is clear; H3's compatibility with EXAM acceptance and H2's exam predicate remain unresolved. | Accepted EXAM schema/pass rule and scope boundary; empirical language-token/contrast coverage if implementation is proposed; broader offline guarantee if claimed; own-session economics source binding. |

**Sufficiency:**
- [x] External source used? Yes; official Prism and Highlight.js documentation.
- [x] Briefing gap closed? Yes; owner explicitly authorized Challenge from the completed Extract checkpoint.
- [x] Pairwise incompatibility checked? Surviving configurations listed? Yes; incompatibilities and surviving Extract rows are recorded above.

Stage complete: YES
→ User decision: Recommend close this focused iteration's Challenge checkpoint and return the supported findings plus unresolved H2/H3 evidence gaps to the Coordinator for synthesis/iteration planning. No extra owner decision is needed before the checkpoint.
