# Challenge — «Что может сломаться?»

> **Mindset:** Критик. Проверить каждую оставшуюся комбинацию контрпримером и источником.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать локальный курс ООП понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; Challenge authorized by `journal/20261103-214100__gate_answer__c920.md @ 652ac0264992dc5f4b48aaa923d14b75556c676f`; iteration focus `research/iterations.yaml @ b2a823fc2b0e0a1989981a8b810bde2dcbc37e8b`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Mode: `focused` (one OODA pass)

## Consistency Check

### Pairwise check

| Dimension pair | Stress-tested alternatives | Result |
|----------------|----------------------------|--------|
| Language identity × Tokenization | Explicit metadata, guaranteed lesson context, autodetection, plain fallback × project rules, Prism, Highlight.js, CodeMirror | Explicit labels pair with any engine. Context inference survives only where source structure uniquely identifies language. Autodetection is technically supported, but the vendor docs themselves provide explicit classes for cases where detection fails; formulas/output should bypass engines. |
| Language identity × Token distinction | Explicit/context/detected/plain × color-only/color-plus-cue/structural cue/defer | Any can coexist if unknown/plain blocks remain unstyled. A detected or plain result cannot supply accurate category styling when the engine cannot establish language. |
| Language identity × Styling/contrast | Any identity choice × existing/dedicated palette/structural cues/plain | Compatible with per-language scopes and an uncolored fallback. Applying a language theme to a formula or output block would color non-source text incorrectly. |
| Language identity × Delivery | Any identity choice × no library/local bundle/CDN/CodeMirror loader | Compatible in principle; delivery does not repair a missing or wrong language identity. A CDN still needs network availability. |
| Tokenization × Token distinction | Rules/Prism/Highlight.js/CodeMirror × color-only/color-plus-cue/structural cue | Compatible if the renderer or grammar exposes the relevant categories. A regex ruleset must avoid styling keyword substrings and words inside strings/comments; an engine's scope map must distinguish declarations from property/parameter names. |
| Tokenization × Styling/contrast | Any tokenizer × existing or dedicated theme | Compatible if emitted scopes have styles and each chosen foreground passes contrast on the actual background. Theme class names alone do not establish category coverage or readable colors. |
| Tokenization × Delivery | Project rules/Prism/Highlight.js/CodeMirror × no library/local bundle/CDN/module bundler | Project rules need no library; Prism/Highlight.js can be hosted locally or remotely; CodeMirror's package option requires a bundler/loader. CodeMirror plus “no added library” is incompatible. |
| Token distinction × Styling/contrast | Color only, color-plus-cue, labels × palette choice | Background contrast and category-to-category distinction are separate. Color-only variants rely on hue for categories; the candidate colors have little relative-luminance separation. Add a non-color cue if the category distinction is meant to be available without color perception. |
| Token distinction × Delivery | Any token cue × any delivery path | Independent choices; the selected CSS and any script still must be available with the page. |
| Styling/contrast × Delivery | Existing/dedicated CSS × no library/local/CDN/loader | Compatible if styles arrive with the page. A remote-only stylesheet or script can disappear offline; local styles do not prove the separate runtime assets are offline-complete. |

### Incompatible pairs

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|------------|-------------|-------------|-------------|-----------------|
| Language identity for each block | Apply a JavaScript/Python grammar to every `<pre><code>` by default | Treat formula/output/unknown blocks as plain | The formula `type: "code"` and `example.output` are not source. Applying the grammar would misrepresent their contents; the renderer must opt those blocks out. |
| Token distinction | Color alone as the only cue for semantic token categories | Reuse only the three calculated light accent colors as distinct categories | Their pairwise luminance ratios are 1.10:1–1.32:1. The colors pass against the dark code backgrounds but do not establish a non-color distinction between categories; W3C says color must not be the only visual means when it conveys information. |
| Delivery/integration | Remote-only highlighter or stylesheet required for code coloring | Expect the code examples to remain colored with no network | The static local page cannot load the remote dependency offline; a local fallback would be a different configuration. |
| Tokenization approach | CodeMirror packages | No added library or module loader | The official CodeMirror reference says its browser packages require a bundler or loader. |

### Surviving configurations

Rows below come from Extract after excluding the pairs above. Survival means internally consistent under the frozen contract, not demonstrated rendering or a final component selection.

| Config | Language identity for each block | Tokenization approach | Token distinction | Styling and contrast | Delivery/integration | Notes |
|--------|----------------------------------|-----------------------|-------------------|----------------------|----------------------|-------|
| C2 | Explicit metadata; formula/output plain | Project-owned rules | Color plus weight cue | Existing backgrounds and tested foreground pairs | No added library; renderer emits escaped spans | Covers a finite corpus if context-aware rules correctly handle strings, comments, names and f-strings. No such implementation was built or tested. |
| C5 | Guaranteed lesson context; otherwise plain | Prism grammars | Color plus weight cue | Dedicated local theme checked on each background | Bundle Prism assets locally | Context must remain unambiguous and the formula must have an explicit plain override. |
| C7 | Explicit metadata; formula/output plain | CodeMirror JS/Python packages | Color plus weight cue | Custom syntax styles checked on each background | Bundle via a module bundler/loader | Technically coherent, with a larger integration surface than static highlighting. |
| C10 | Explicit metadata; output excluded; formula plain | Highlight.js grammars | Color plus labels/structural cues | Category styles checked on each background | Local two-language bundle | Structural cues need a defined presentation that does not obscure or alter source text. |

### Unexpected survivors

- **C5:** Deriving language from lesson context can be deterministic when the data schema guarantees the surrounding language. Explicit metadata is still easier to audit, but context inference is not inherently incorrect for the current segregated examples.
- **C10:** A library-based highlighter with additional labels/structural cues survives even though the obvious first approach is color alone. It could preserve source text while adding a visible legend or other cue; the exact cue remains to be designed and assessed.
- **C7:** A read-only CodeMirror surface remains technically consistent with the frozen requirements even though no editing is required. Its package/build cost is a proportionality concern, not a logical incompatibility.

## Findings

### C1: A keyword list can misclassify a real JavaScript method

The previous Gather/Extract shorthand placed `constructor` among JavaScript keywords. The actual examples use it as the class's constructor method name. The ECMAScript specification enumerates its keywords/reserved words separately and grammar treats ordinary identifier names through `IdentifierName`; `constructor` is not in the reserved-word list. This correction matters: token styling should classify the method declaration as a function/method name, not paint every occurrence as a keyword. A plain substring rule would also miscolor longer identifiers that merely contain a keyword; token boundaries and syntactic context are needed. [ECMAScript 2027 language specification, lexical grammar](https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html) (accessed 2026-11-03).

### C2: F-strings, comments and output provide adversarial cases

In `show` and `count`, Python f-strings combine literal Russian text with expressions such as `ride.card` and conditional expressions inside braces. Treating the whole line as one undifferentiated string hides the embedded expressions; a partial matcher that starts/stops at the wrong quote can color expressions as text or vice versa. The `type: "code"` formula begins with Python comment markers but contains arithmetic and KZT values; a Python autodetector may plausibly interpret the comment-shaped prefix as evidence of Python. Expected `output` blocks are observable results rather than source. Each needs an explicit source type or an opt-out before syntax tokenization.

Prism exposes standard `keyword`, `function`, `class-name`, `string`, and `number` tokens and states that themes guarantee standard-token coverage. Highlight.js has `title.class`, `title.function`, `string` and `subst` scopes, but also states that some scopes are not universally supported by themes. These scopes are promising interfaces, not proof that the installed grammar/theme will render these exact snippets correctly. [Prism token reference](https://prismjs.com/tokens.html), [Highlight.js scope reference](https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html) (accessed 2026-11-03).

### C3: Passing text contrast does not prove color categories are distinguishable

Each candidate foreground in Extract exceeds 4.5:1 against all three code backgrounds, with a lowest foreground/background pair of 8.27:1. But the lightness-only contrast among the three foregrounds is much smaller: lime versus peach 1.20:1, lime versus pale text 1.10:1, peach versus pale text 1.32:1. These values are not a formal minimum text-on-background failure; they show that the palette gives little lightness separation between token categories. W3C's Use of Color guidance cautions against using color as the only visual distinction, and notes that a hue distinction should have another visible cue where users must perceive that particular color difference. Therefore, C2/C5/C7/C10 survive only with their non-color weight/structural cue actually mapped to the categories. The selected hex values still need review in a rendered sample; no visual rendition or accessibility conformance test was performed. [WCAG 2.2 SC 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) and [SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (accessed 2026-11-03).

### C4: A lightweight highlighter remains separate from a diagnostic tool

Prism/Highlight.js can apply semantic token scopes to static escaped text. A parser can provide richer syntax structure, but it does not automatically provide an accurate learner-facing error message. CodeMirror documents linting as a separate extension; a true diagnostic still requires a configured linter/parser and an error policy. The frozen HL prohibits a syntax-error indicator without real checking. None of the lightweight configurations should report pass/fail or syntax validity. The existing Python Worker remains a separate execution/feedback surface.

### C5: H2/H3 and economics have no new evidence in this scope

The gate expressly forbade code, HL and EXAM changes and EXAM-draft reading. No accepted/authorized EXAM return was supplied, so the exam state/pass predicate and accepted scope remain unverified; H2 and H3 stay open. The own-session rollout locator remains exactly the earlier pre-extraction gap; no capture was attempted and no numeric economics coverage is available.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Actual content makes explicit `javascript`/`python` plus a plain fallback safer than autodetection; `constructor` is a method name, not a JavaScript keyword. Formula and output blocks should bypass highlighting. Candidate accent colors individually clear the background contrast threshold, but their 1.10:1–1.32:1 pairwise lightness differences mean color alone does not establish accessible category distinction; survivors all need a non-color cue. A lightweight local highlighter remains compatible with the static course, while CodeMirror carries an extra bundler/loader and diagnostics require separate validation. | No candidate was rendered, tokenized, or accessibility-tested, so actual f-string/category display and visual category distinction remain unverified. H2/H3 still need an accepted authorized EXAM return; economics binding stays unavailable and unmeasured. |

**Sufficiency:**
- [x] External source used? Yes; ECMAScript specification, official Prism/Highlight.js token references, CodeMirror documentation and W3C WCAG 2.2 guidance.
- [x] Briefing gap closed? Yes; owner explicitly authorized Challenge from the completed iteration-2 Extract checkpoint.
- [x] Pairwise incompatibility checked? Surviving configurations listed? Yes; the ten factor pairs, incompatible pairs, and surviving Extract rows are shown above.

Stage complete: YES
→ User decision: Recommend return this focused H1 challenge to the Coordinator for iteration-2 synthesis; no added owner decision is required before the checkpoint. H1 is supportable only as a lightweight highlighter direction with explicit/fallback labels and non-color category cues, pending a rendered sample. H2/H3 remain outside this iteration's evidence absent accepted EXAM material.
