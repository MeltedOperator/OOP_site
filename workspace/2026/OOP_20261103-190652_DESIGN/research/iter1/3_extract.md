# Extract — «Что мы не видим?»

> **Mindset:** Analyst. Собрать конфигурационное пространство, не оценивая решения.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать курс OOPoman понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; Extract authorized by `journal/20261103-205455__gate_answer__a20c.md @ c097489e30dd80848e3f32a916c1171e2a631b1d`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Mode: `focused` (one OODA pass)

## Configuration Space

Матрица сохраняет альтернативы из Gather. Не включены только явно противоречащие утверждённому HL варианты: объединение/перезапись двух хранилищ как новая архитектура и отсутствие совместного условия сертификата.

| Config | Static code presentation | Code interaction and feedback | Asset delivery | Progress and certificate data |
|--------|--------------------------|------------------------------|----------------|-------------------------------|
| C1 | Plain escaped blocks | Read-only examples; existing runner stays separate | No third-party code | Independently read stores; combine displayed facts and joint gate |
| C2 | Curated token spans/rules | Read-only examples; runner stays separate | Project-owned local code | Independently read stores; combine displayed facts and joint gate |
| C3 | Prism or Highlight.js | Read-only examples; runner stays separate | Locally bundled highlighter | Independently read stores; combine displayed facts and joint gate |
| C4 | Prism or Highlight.js | Read-only examples; runner stays separate | Remote CDN/loader | Independently read stores; combine displayed facts and joint gate |
| C5 | CodeMirror highlighting | Read-only examples; runner stays separate | Locally bundled editor packages | Independently read stores; combine displayed facts and joint gate |
| C6 | CodeMirror highlighting | Editable selected examples | Locally bundled editor packages | Independently read stores; combine displayed facts and joint gate |
| C7 | CodeMirror highlighting | Editable examples with configured live diagnostics | Locally bundled editor packages | Independently read stores; combine displayed facts and joint gate |
| C8 | Prism or Highlight.js | Read-only examples; runner stays separate | Local bundle | Withhold combined display and certificate when either store is absent/unrecognized |
| C9 | Prism or Highlight.js | Read-only examples; runner stays separate | Remote CDN/loader | Withhold combined display and certificate when either store is absent/unrecognized |
| C10 | CodeMirror highlighting | Editable examples | Local bundle | Withhold combined display and certificate when either store is absent/unrecognized |
| C11 | CodeMirror highlighting | Editable examples with configured live diagnostics | Local bundle | Withhold combined display and certificate when either store is absent/unrecognized |

## Findings

### E1: Course state has useful read-only signals, with conservative write boundaries

`course/storage.js` reads only `localStorage["oopoman.progress.v1"]`. A missing key produces the version-1 empty course state and is writable. Invalid JSON, an unsupported version, or an invalid top-level `labs` shape produces an empty in-memory value with `writable: false`. Each lab entry is validated against the supported fields; malformed/unknown entries are preserved separately and block writes for that lab. The course state has no module-level completion field.

For labs 1–9, an entry has `status`, answers `q1`…`q9`, checklist booleans, `peerConfirmed`, and `score`. Completion is represented by `status === "completed"`; it is only written after all quiz questions are answered and peer confirmation is true. Correctness is not required for completion. Display score is recomputed from current answers and checked checklist items (20 points each), so persisted `score` alone is not the authoritative displayed value. `course/app.js` derives a module as done when every lab in that available module is completed; its home-page percentage uses completed modules divided by all modules. The progress screen has course/module/lab values and no exam status. Terminal feedback is a separate surface and does not update these course fields per the accepted runtime record.

The official WHATWG Web Storage specification states that `getItem` returns `null` for a missing key, storage is origin-scoped and persists beyond a session, and writes can fail with quota errors; access itself can throw `SecurityError` in restricted contexts. Thus absent, malformed, and inaccessible/unrecognized data are distinct states to preserve in any combined read-only view; the inspected app's normalizer does not itself supply a safe exam interpretation. [WHATWG HTML Living Standard: Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html) (accessed 2026-11-03).

### E2: Exam and certificate implementation cannot be verified in the inspected course surface

The accepted HL fixes the exam key as `oopoman.exam.v1`, requires independent stores and a joint gate (all three modules complete AND exam passed), and names the three student-to-JPG mappings. The inspected `course/` scripts do not read or write the exam key and contain no exam route, exam result shape, passing threshold, participant name, or certificate-download logic. The exact exam completion/pass predicate therefore remains unknown; the course code cannot substantiate H2's exam half. The separate EXAM task is not accepted yet, so its unreturned artifacts are not evidence available to this stage.

All three named files are present under `OOP-course/certificates/`: `certificate_arseniy.jpg`, `certificate_jasulan.jpg`, and `certificate_sanjar.jpg`. The approved HL maps them to Арсений Мухитов, Жасулан Куандыков, and Санжар Аубакиров, respectively, and records that the exam option currently has «Саржан». File presence and the approved mapping are verified; image contents and current exam option rendering were not inspected as no current accepted exam implementation is available. H3's implementation-boundary claim remains unresolved pending accepted EXAM scope/return.

### E3: Existing blocks do not identify language in their rendering metadata

`course/app.js` emits escaped code inside `<pre><code>` without a language class. The source inventory includes both JavaScript and Python examples; six `type: "code"` fragments include one formula-like block as well as code snippets. No consistent language property is attached to these content blocks. Any configuration using a language-aware highlighter must account for explicit language metadata or a bounded detection rule, including the non-code formula, without treating highlighting as syntax validation.

### E4: Knowledge handover and unresolved source binding

Applied the accepted `TD-OOP-RT-TERMINAL-RUNTIME` record for its bounded scope: a local static course with Pyodide Worker; offline completeness, runtime compatibility and isolation remain unverified. The numeric economics source-binding gap recorded in `1_briefing.md` and `2_gather.md` is unchanged: no exact own-session rollout path, `session_meta.id`, source version, or range start was available, and no extraction was attempted. This stage produces no numeric usage measure.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Course progress uses a versioned local course-only key and exposes answer/checklist/lab completion signals; module completion derives from all labs, while score is recomputed. The three JPG filenames exist and the approved HL supplies exact mappings. The current course surface contains no exam implementation, so exam pass fields and H2's joint predicate cannot yet be independently grounded there. Code rendering has no language metadata, and at least one code-typed block is formula-like. | Exact exam store schema/pass predicate and current rendered name require an authorized, accepted EXAM return. Offline/runtime properties remain bounded as recorded in knowledge. Own-session economics binding remains unavailable. H3's scope conclusion awaits the accepted EXAM boundary. |

**Sufficiency:**
- [x] External source used? Yes; WHATWG HTML Living Standard Web Storage.
- [x] Briefing gap closed? Yes; the owner gate explicitly authorized Extract from the completed Gather checkpoint.
- [x] Configuration Space built from Gather dimensions? Yes; four Gather dimensions are cross-referenced above.

Stage complete: YES
→ User decision: Recommend continue to Challenge, retaining the exam predicate and H3 boundary as unresolved evidence limits; no additional owner decision is required before that stage.
