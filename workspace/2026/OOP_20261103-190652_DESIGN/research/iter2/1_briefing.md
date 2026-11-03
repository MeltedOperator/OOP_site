# Briefing — «Что проверяем во второй итерации?»

> **Mindset:** Стратег. Планировать проверку, не выбирать компонент заранее.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать локальный курс ООП понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; iteration 2 continuation selected by Coordinator-prepared `research/iterations.yaml @ b2a823fc2b0e0a1989981a8b810bde2dcbc37e8b`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Mode: `focused` (one OODA pass per stage); mode selected by owner in `journal/20261103-195345__gate_answer__b71d.md @ 51be48df282a900e33a5944cab3a6e10bb45e965`.

## Research Plan

### Gather
- Inspect the actual JavaScript, Python and formula-like course fragments relevant to syntax coloring; record only bounded snippets and their content-source locations.
- Trace how code blocks reach the renderer and identify the smallest reliable place to attach an explicit language or plain-text label.
- Inspect code colors/backgrounds in the existing stylesheet and compare the exact relevant pairs against the applicable contrast guidance.
- Consult primary documentation for explicit language selection and tokenization limitations; keep highlighting claims separate from syntax validation.

### Extract
- Cross-reference the actual fragment constructs against the HL-required categories: keywords, functions/names, strings and text values.
- Compare a small project-owned tokenizer, a locally bundled two-language highlighter, and the minimum editor path against snippet coverage, contrast, static-site integration, local availability and maintenance surface.
- Treat formula-like text as plain/non-code where appropriate and test the risk of mislabeling or automatic language detection analytically against the source examples.
- Revisit H2/H3 only if an accepted, authorized EXAM return has become available; otherwise carry the exact evidence boundary forward without inspecting drafts.

### Challenge
- Attack each surviving option with actual course constructs, escaped text, ambiguous snippets, formula content and missing/unknown labels.
- Check whether any approach could imply live validation or report errors without a real parser/linter.
- Separate documented library size/features from measured candidate assets and distinguish a locally served library from a whole-course offline guarantee.
- Preserve the exact own-session economics binding gap unless a newly observable native source is available; do not use another unit's source.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|-----------|-----------|
| H1 | Lightweight local highlighting is sufficient; a full editor is not worth its added complexity for this course. | open; partially supported in iteration 1 |
| H2 | `oopoman.progress.v1` and `oopoman.exam.v1` contain stable signals for progress and the joint certificate gate. | open; course side grounded, exam side unresolved |
| H3 | The «Саржан» correction and three JPG mappings fit a separate post-EXAM task without changing accepted EXAM scope. | open; mapping grounded, accepted EXAM boundary unresolved |

## Scope Intent

- **In scope:** Actual code/formula snippets, current static rendering/data metadata, existing styles relevant to code-token contrast, explicit language marking, bounded locally available highlighting options, and evidence needed to update H1.
- **Out of scope:** Product/code changes, adding packages/assets, changing HL or accepted EXAM, reading EXAM drafts/unreturned task data, claiming the whole course is offline, parser/linter diagnostics, and unmeasured claims about bundle or run-time performance.

## Guiding Questions

1. Can an explicit, minimal local highlighting path reliably distinguish the required categories in the actual JS/Python snippets while leaving formula text uncolored and the required colors readable?
2. Does any observed evidence justify a full editor or live diagnostics beyond the existing separate Python runner?
3. If no accepted EXAM return or exact own-session economics source binding has appeared, what precisely remains unresolved and why?

## User Direction

Iteration 2 focus is Coordinator-prepared in `research/iterations.yaml @ b2a823fc2b0e0a1989981a8b810bde2dcbc37e8b`: test explicit language identity, required token categories, contrast and the smallest viable implementation against actual JS, Python and formula fragments. Revisit H2/H3 only with an accepted, authorized EXAM return; otherwise do not inspect drafts. Retain the economics gap unless an exact source binding becomes available. Iteration 1 RES is the predecessor context: [RES.md](../iter1/RES.md). Owner selected focused mode for this Researcher unit; no mode or scope change is inferred.

## Existing knowledge applied

- **Project architecture:** Applied accepted `TD-OOP-RT-TERMINAL-RUNTIME`, scoped to OOPoman modules 1–3 and their existing runtime. It establishes a local static launcher and separate Pyodide Worker terminals; offline completeness, browser compatibility, performance and isolation remain unverified. It does not establish syntax highlighter behavior.
- **Current implementation findings:** Iteration 1 Extract records the exact course-store signals, absent exam implementation in inspected course code, existing code-block metadata gap, and certificate filename mapping. Reuse those findings; do not repeat the exam search unless an authorized accepted return changes available evidence.
- **Technical evidence:** Iteration 1's Prism, Highlight.js, CodeMirror and WHATWG sources remain useful background. This iteration will consult a primary contrast source and the relevant current official highlighting documentation before drawing technical conclusions.
- **Economics binding:** The prior exact-own-source lookup was authorized and completed with no worker-named rollout match. Required source path, `session_meta.id`, source version and range start remain unavailable; no capture or measurement was made. Carry this pre-extraction gap in this iteration unless an exact native binding appears; no source is guessed or inherited.
- **Predecessor RES:** Iteration 1 recommends MORE NEEDED, with H1 partial and H2/H3 unresolved. No amendment proposal was supported. The current control selects iteration 2; only its scoped H1 refinement proceeds absent a qualifying accepted EXAM return.

---
Stage complete: YES

→ User decision: Briefing reflects the prepared iteration-2 focus. Await the Coordinator checkpoint before starting Gather; no additional scope question is open.
