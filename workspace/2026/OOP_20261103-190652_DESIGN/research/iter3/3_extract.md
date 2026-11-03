# Extract — «Какие сочетания нельзя оценить без рендера?»

> **Mindset:** Аналитик. Сопоставить реальные фрагменты, варианты отображения и ограничения среды.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать локальный курс ООП понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; Extract approved by owner gate `journal/20261103-220437__gate_answer__c923.md @ 582e05c332c3ae3a56748045ad260960030b7816`.
> Iteration scope: Coordinator-prepared `research/iterations.yaml @ 4256a3864d48447789dc9361062f0ce6de1dfae4`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Mode: `focused` (one OODA pass per stage).

## Configuration Space

| Config | Language identity | Token distinction | Background | Formula/output/fallback |
|--------|------------------|-------------------|------------|-------------------------|
| C1 | Explicit JS/Python labels | Color only | `#17241f` general `pre` | Plain text |
| C2 | Explicit JS/Python labels | Color + weight/underline/italic cue | `#17241f` general `pre` | Plain text |
| C3 | Explicit JS/Python labels | Color only | `#1f3029` Module 2 | Plain text |
| C4 | Explicit JS/Python labels | Color + weight/underline/italic cue | `#1f3029` Module 2 | Plain text |
| C5 | Explicit JS/Python labels | Color only | `#28243a` Module 3 | Plain text |
| C6 | Explicit JS/Python labels | Color + weight/underline/italic cue | `#28243a` Module 3 | Plain text |

These are the six visual combinations requested for comparison; the last dimension remains held constant. No option was visually evaluated because the browser could not open the temporary local file.

## Findings

### E1: The selected source spans cover the requested roles

The existing JavaScript example `Оркестратор соединяет роли` contains `class ValidatorTerminal`, the `constructor(reader, ...)` method, and quoted text. The Python example `Проверка поездки` contains `class Check`, `def show(...)`, and an f-string that combines Russian literal text with an expression. The fare lesson contains the arithmetic text `100.00 × 1.30 × 1.00 × 0.50 = 65.00 KZT`. These are the representative source blocks named in the approved briefing. The calculator expression and example output are content text, not language-tagged source; the task requires both to remain plain.

### E2: The proposed cue is representable, but has not been seen at rendered size

MDN describes `text-decoration` as supporting line, style and thickness choices such as underline, dotted or wavy lines. That supports a simple visual cue alongside color, but it does not establish that underlining names or styling strings is comfortable in this course's code font. [MDN: `text-decoration`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-decoration), accessed 2026-11-03. WCAG's use-of-color guidance also requires that color not be the only visual means of distinguishing information, while its text contrast criterion supplies foreground/background thresholds; both remain relevant from Gather: [WCAG 2.2 SC 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), [SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### E3: Visual comparison is blocked by the browser policy; no result is claimed

I created the authorized temporary HTML sample under the task-specific system temp directory. The browser-use tool rejected its `file:` URL because only `http:` and `https:` URLs are permitted and explicitly prohibited trying another browser surface or a URL workaround. An offline SVG preview could not be processed by the image display tool, and a temporary raster preview was not accessible to that tool in the isolated temp environment. I therefore have no screenshot or visual observation for color-category distinction, cue clarity, fallback separation, or normal-size readability. I did not open another browser, serve the sample, or move scratch content into the project.

### E4: Limits and evidence boundaries

This stage does not resolve whether the categories look distinct, whether the cue distracts, or whether formula/output/fallback appear clearly unhighlighted. The foreground/background contrast values from iteration 2 remain calculations only and cannot replace this missing visual observation. Even a successful manual rendering would not prove production tokenization, full-corpus coverage, browser compatibility, or formal accessibility conformance. No product or EXAM material was read or changed. H2/H3 and the exact own-session economics binding gap remain unchanged; no new economics lookup was made.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Six requested combinations are enumerated; the source fragments and cue attributes are mapped, and an additional CSS reference supports the cue's available forms. Browser policy blocks the temporary `file:` render, so no visual evidence was obtained. | Need a permitted way to inspect the rendered temporary sample before answering the briefing questions. Do not use an alternate browser surface or route around the policy. H2/H3 and economics evidence remain unchanged. |

**Sufficiency:**
- [x] External source used?
- [ ] Briefing gap closed?
- [x] Configuration Space built from Gather dimensions?

Stage complete: NO
→ User decision: Choose an allowed way to provide a rendered view for inspection, or stop this visual check; no design conclusion is available yet.
