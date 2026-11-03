# Gather — «Что мы ещё не знаем?»

> **Mindset:** Исследователь. Сначала очертить варианты и неизвестные, не назначать решение.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать локальный курс ООП понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; Gather authorized by `journal/20261103-213442__gate_answer__c91e.md @ ae138fa3041ce5542510d5d653c8da5463395fc8`; iteration focus `research/iterations.yaml @ b2a823fc2b0e0a1989981a8b810bde2dcbc37e8b`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Mode: `focused` (one OODA pass)

## Dimensions

| Dimension | Alt A | Alt B | Alt C | Alt D _(if any)_ |
|-----------|-------|-------|-------|-----------------|
| Language identity for each block | Add explicit `language: "javascript"` / `"python"` metadata to code-bearing content | Infer from the containing course lesson/example context | Ask a highlighter to autodetect | Treat ambiguous/formula blocks as plain text without highlighting |
| Tokenization approach | Small project-owned rules for the observed constructs | Explicit-language Prism grammars | Explicit-language Highlight.js grammars | CodeMirror language packages / editor syntax layer |
| Token distinction | Color only, using separate foreground hues | Foreground color plus a non-color style cue such as weight | Keep source text uniformly colored and distinguish by structure/labels | Defer token coloring pending a verified palette |
| Styling and contrast | Use the existing code text/background as baseline and select token foregrounds against it | Use a dedicated local syntax theme with verified foreground/background pairs | Add category underlines/badges while preserving a common code foreground | Leave the formula and unsupported/unknown blocks uncolored |
| Delivery/integration | No added runtime library; render project-owned markup from existing static scripts | Include selected highlighter JS/CSS in the local course tree | Load highlighter from CDN/dynamic loader | Add a build/bundling path for CodeMirror packages |

These factors expose independent choices: source identity, how tokens are found, how their difference is conveyed, which colors work on the actual code surfaces, and how that logic reaches a static page. No alternative is selected at Gather. Keep unknown language as an explicit possibility rather than guessing.

## Findings

### G1: Real content already contains the constructs required by the contract

`course/data.js` contains 17 content blocks shaped as `type: "example"` with a `code` field: 10 JavaScript examples and 7 Python examples. The JavaScript snippets include `class`, `constructor`, `function`, `const`, methods, and quoted text (for example the Transport Reader, Fare Calculator, and payment snippets). The Python examples include `class`, `def`, `raise`, `return`, annotations, and quoted Russian output (for example the Refundable Protocol and payment/ride/shift examples). These supply actual instances of the required keyword, function/name, string, and text-value categories; identifying which names are functions versus class/property names requires a precise tokenization rule rather than highlighting every identifier alike.

There are also six `type: "code"` text blocks. Five are Python code fragments; the sixth, in the Fare Calculator lesson, contains arithmetic with explanatory comments and KZT values (`100.00 × 1.30 × 1.00 × 0.50 = 65.00 KZT`, and a second fare calculation), not executable source code. The content blocks do not carry a `language` or `lang` field. A renderer can only infer from surrounding context if that context remains an unambiguous source fact; formula text is a clear plain-text exception.

### G2: Rendering is escaped static markup and has a bounded metadata seam

In `course/app.js`, `renderBlocks` emits both code-shaped content and example code as escaped text in `<pre><code>` (`~203` and `~215`); it does not assign a language class. Existing rendering therefore protects angle brackets as text, but a future highlighter would need to preserve that escaping when it wraps token spans. A source label could be added to content and forwarded by this function without turning read-only examples into the separate Python runner. This is an observed integration seam, not an implementation request.

### G3: Existing code surfaces have strong base text contrast; syntax colors remain unmeasured

`course/styles.css` defines three code-block foreground/background pairs: `#e7f0e6` on `#17241f` (general `.rich-content pre`), `#e9f3eb` on `#1f3029` (Module 2 examples), and `#f1eff7` on `#28243a` (Module 3 examples). A WCAG 2.2 relative-luminance contrast calculation gives 13.76:1, 12.22:1, and 13.13:1, respectively. These are the unhighlighted text colors, not proposed token colors; their values do not prove that new hues will remain readable.

W3C's WCAG 2.2 Understanding for SC 1.4.3 gives a minimum 4.5:1 for normal text (3:1 for large text) and says to compare underlying foreground/background values without rounding. Its SC 1.4.1 guidance says color should not be the only visual means for distinguishing information. The current code remains readable as text without token colors; any syntax palette should retain text legibility and avoid making color the only carrier of an essential instruction. [W3C WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [SC 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) (accessed 2026-11-03).

### G4: Official highlighter documentation supports explicit labels; it does not verify this corpus

Prism documents explicit `language-xxxx` classes and lists JavaScript/Python support; it describes a regex-based tokenizer with known edge-case failures. Highlight.js documents automatic detection and also permits explicit language classes. With known source language for the current examples and one formula block, explicit metadata is a distinct, auditable alternative to autodetection. Neither documentation page proves that a chosen theme distinguishes all required categories at sufficient contrast on this site's three backgrounds, nor that highlighting is syntax validation. [Prism documentation](https://prismjs.com/) and [Highlight.js usage](https://highlightjs.org/usage/) (accessed 2026-11-03).

### G5: Prior evidence boundaries stay in effect

The iteration-2 gate authorized no EXAM draft inspection. No new accepted, authorized EXAM return was included, so H2's exam-state/pass uncertainty and H3's acceptance-boundary uncertainty are carried forward from iteration 1 unchanged. The exact own-session economics source path, source ID, source version, and range start also remain unavailable in this task's prior binding trace; no capture was attempted and no measurement is reported.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| The target source has 10 JS and 7 Python examples plus six code-typed blocks, including one arithmetic/formula block. Existing static renderer escapes code and adds no language class; actual code backgrounds already have high base text contrast (12.22:1–13.76:1). Official docs confirm explicit labels are supported, while new token colors and actual language/category coverage are not yet verified. | Extract must map actual constructs to the required categories, assess deterministic labels for example/code/formula blocks, and compare minimal approaches. Candidate token palette still needs calculated contrast on all three backgrounds. No accepted EXAM update or economics binding appeared; retain those exact boundaries. |

**Sufficiency:**
- [x] External source used? Yes; W3C WCAG 2.2 Understanding docs and official Prism/Highlight.js documentation.
- [x] Briefing gap closed? Yes; owner explicitly approved Gather from the iteration-2 briefing.
- [x] Dimensions identified? Yes; language identity, tokenization, distinction, styling/contrast, and delivery/integration are separated.

Stage complete: YES
→ User decision: Recommend continue to Extract to map actual constructs and label/color decisions against evidence; no additional owner decision is needed before that stage.
