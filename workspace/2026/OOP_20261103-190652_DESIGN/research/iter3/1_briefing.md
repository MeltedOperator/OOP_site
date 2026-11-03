# Briefing — «Как выглядят категории в реальном фрагменте?»

> **Mindset:** Стратег. Уточнить узкий образец и oracle до визуальной проверки.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать локальный курс ООП понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; iteration 3 continuation in Coordinator-prepared `research/iterations.yaml @ 4256a3864d48447789dc9361062f0ce6de1dfae4`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Mode: `focused` (one OODA pass per stage), selected by owner in `journal/20261103-195345__gate_answer__b71d.md @ 51be48df282a900e33a5944cab3a6e10bb45e965`.

## Research Plan

### Gather
- Select a very small set of actual course fragments: a JavaScript class/constructor/method/string, Python class/function/string and f-string, plus the formula and expected-output blocks as plain text.
- Define the visual factors to compare: current dark code backgrounds, token colors from the existing palette, the proposed non-color cue, and the explicit plain fallback.
- Recheck the primary contrast and use-of-color criteria relevant to a rendered text sample.
- Keep the sample's purpose and limits explicit: a visual affordance check, not an app change, complete-corpus test, syntax validator or full accessibility conformance claim.

### Extract
- Build a temporary standalone HTML sample outside the project tree, using manually marked representative tokens and the existing code backgrounds/palette.
- Render a color-only and a color-plus-non-color-cue view; include formula, expected output and an unknown/plain example that receive no syntax styling.
- Inspect the rendered views and record which categories remain visually distinct at normal viewing size and which cues cannot be judged from this sample.
- Do not edit site files, add a package, read EXAM material, or capture economics from an unbound source.

### Challenge
- Stress the sample with `constructor` as a method name, nested f-string text/expression, punctuation, and a keyword inside a string/comment.
- Check that formula/output/fallback remain plain and that the non-color cue does not obscure the code.
- Record that manual token marking cannot establish highlighter correctness over all course content, browser environments or color-vision profiles.
- Preserve H2/H3 and exact own-session economics limitations unchanged.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|-----------|-----------|
| H1 | Lightweight local highlighting is sufficient; a full editor is not worth its added complexity for this course. | open; partially supported after iteration 2; rendered category display pending |
| H2 | `oopoman.progress.v1` and `oopoman.exam.v1` contain stable signals for progress and the joint certificate gate. | open; course-side signals grounded, accepted exam state unavailable |
| H3 | The «Саржан» correction and three JPG mappings fit a separate post-EXAM task without changing accepted EXAM scope. | open; mapping grounded, accepted EXAM boundary unavailable |

## Scope Intent

- **In scope:** A tiny, temporary browser rendering of representative JS/Python token categories, current code backgrounds, candidate palette colors, a non-color cue, and plain formula/output fallback.
- **Out of scope:** Any change to product or project files outside `research/`; installing or downloading a library; syntax parsing/diagnostics; full-corpus, browser-compatibility or formal conformance claims; EXAM drafts or unreturned EXAM data; new economics source searches outside the previously authorized exact binding.

## Guiding Questions

1. In the rendered sample, can a reader distinguish keyword, class/function name and string/text-value roles using color plus the proposed non-color cue without losing source readability?
2. Do formula, expected output and unknown-language fallback remain clearly unhighlighted?
3. What does the small manual sample fail to establish about a production highlighter?

## User Direction

The Coordinator-prepared iteration-3 focus at `research/iterations.yaml @ 4256a3864d48447789dc9361062f0ce6de1dfae4` authorizes only a small representative JS/Python visual sample without product changes. It must include explicit language labels, the `constructor` method, strings/f-string, formula and expected output as plain text, then check color-category distinction with a non-color cue and fallback. The sample cannot stand in for testing the full course. H2/H3 remain tied to accepted and authorized EXAM evidence; the economics gap remains. Iteration 2 RES is predecessor context: [RES.md](../iter2/RES.md).

## Existing knowledge applied

- **Accepted runtime:** `TD-OOP-RT-TERMINAL-RUNTIME` remains scoped to the existing static course and separate Pyodide Worker; offline completeness and browser behavior are unverified. This temporary sample does not exercise that runtime.
- **Iteration-2 findings:** H1 is partial; exact examples, absent language metadata, existing backgrounds and contrast calculations are recorded in [2_gather.md](../iter2/2_gather.md) and [3_extract.md](../iter2/3_extract.md). `constructor` is a method name. No candidate was rendered in that iteration.
- **Contrast and color:** W3C WCAG 2.2 SC 1.4.3 and 1.4.1 remain the primary text-contrast and use-of-color references; documentation values are not a substitute for observing this actual sample.
- **EXAM:** No accepted authorized EXAM return is included in the iteration-3 scope. Do not inspect drafts or change the evidence status of H2/H3.
- **Economics:** The prior owner-authorized exact-name search under the default `C:\Users\tata2\.codex\sessions` found no worker-named rollout. Exact own-source path/ID/version/range remain unavailable; no capture was attempted. Preserve this gap; do not inspect another session.

---
Stage complete: YES

→ User decision: The iteration-3 brief matches the Coordinator-prepared scope. Await the Coordinator checkpoint before starting Gather; no additional scope question is open.
