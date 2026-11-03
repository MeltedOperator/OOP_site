# Gather — «Какие визуальные переменные проверить?»

> **Mindset:** Исследователь. Зафиксировать варианты до выбора решения.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать локальный курс ООП понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; iteration 3 continuation in Coordinator-prepared `research/iterations.yaml @ 4256a3864d48447789dc9361062f0ce6de1dfae4`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Mode: `focused` (one OODA pass per stage).

## Dimensions

| Dimension | Alt A | Alt B | Alt C | Alt D _(if any)_ |
|-----------|-------|-------|-------|-----------------|
| Language identity | Explicit JS / Python label beside each fragment | Label in a fragment heading | Infer from syntax/context | Omit identity |
| Category indication | Color only | Color plus underline/style cue | Color plus token prefix/badge | Monochrome styles (weight/underline) |
| Unclassified content | Plain text with explicit “plain” label | Plain text without label | Generic code styling | Attempt language inference |
| Background coverage | One representative current dark background | Three current backgrounds side by side | Neutral light background | Toggle current backgrounds |

## Findings

### G1: Sample content contract and source-backed content types

The authorized visual sample can use a short extract from the actual JavaScript example `Оркестратор соединяет роли`: a `class ValidatorTerminal`, its `constructor(...)` method, a method call, and a quoted string. The Python example `Проверка поездки` provides `class Check`, a function, a quoted string, and a nested f-string expression. The calculator block `100.00 × 1.30 × 1.00 × 0.50 = 65.00 KZT` and an expected-output excerpt will be displayed as plain text, not tagged as code. The known `constructor` use is a method name, not a JavaScript keyword. These examples are representative source excerpts, not a corpus sample or a parsing test.

### G2: Contrast and non-color criteria

W3C WCAG 2.2 SC 1.4.3 sets a 4.5:1 minimum for normal text and 3:1 for large text. SC 1.4.1 says color is not the only visual means for conveying information or distinguishing elements. For this check, inspect token text against each selected code background and include a visible non-color cue in one view; the sample cannot establish conformance across users, displays, or the full course. Sources: [WCAG 2.2 SC 1.4.3 Understanding](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [SC 1.4.1 Understanding](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), accessed 2026-11-03.

### G3: Render comparison set for Extract

Prepare two manually marked versions of the same tiny excerpts: (1) the existing candidate token palette by itself and (2) the same colors plus a non-color text-decoration cue. Show explicit JavaScript and Python labels. Include formula, expected output, and an unknown/plain-language fallback without token styling. Compare on the existing dark code backgrounds; preserve the uncolored base-text version as a reference. This describes the conditions to inspect, not a preferred option.

### G4: Limits carried into the visual check

Manual spans only demonstrate how selected tokens look. They do not verify tokenization, escaping in the production renderer, syntax correctness, accessibility conformance, browser behavior, or coverage of the whole course. This temporary sample does not exercise the Pyodide runtime. It does not resolve H2/H3: accepted and authorized EXAM evidence is still unavailable. The exact own-session economics source binding gap remains; this Gather approval explicitly prohibits new economics-source lookups.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| The target sample content includes JS `constructor`, Python f-string, formula, and expected output. The render comparison variables and relevant WCAG criteria are specified. | Extract must visually inspect candidate categories, the non-color cue, and plain fallback at normal viewing size; it must report which limitations remain untestable. H2/H3 and the economics gap remain unchanged. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Dimensions identified?

Stage complete: YES
→ User decision: Continue to Extract only after Coordinator stage checkpoint / owner gate; Gather selects no design.
