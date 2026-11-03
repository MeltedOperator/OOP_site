# Extract — «Какие сочетания мы не видим?»

> **Mindset:** Аналитик. Сопоставить реальные конструкции, метки, палитру и пути интеграции; пока не выносить итоговый выбор.
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать локальный курс ООП понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch `journal/20261103-193737__dispatch__91fd.md @ a656312541ea09d515569db3cd3136873621a35f`; Extract authorized by `journal/20261103-213751__gate_answer__c91f.md @ 6e6798c8620fc96c4561822568a4533b7fe45bbc`; iteration focus `research/iterations.yaml @ b2a823fc2b0e0a1989981a8b810bde2dcbc37e8b`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Mode: `focused` (one OODA pass)

## Configuration Space

Пять Gather-измерений имеют до четырёх альтернатив каждое; полный декартов набор превышает 30 комбинаций. Ниже перечислены согласованные конфигурации, в которых явно меняется хотя бы один выбор относительно C1, с охватом основных путей токенизации, языка, различения, контраста и доставки. Это конфигурационное пространство, а не оценка или рекомендация.

| Config | Language identity for each block | Tokenization approach | Token distinction | Styling and contrast | Delivery/integration |
|--------|----------------------------------|-----------------------|-------------------|----------------------|----------------------|
| C1 | Explicit metadata on each source block; formula/output use plain | Project-owned rules for observed JS/Python constructs | Color only | Existing code backgrounds with token foregrounds checked against all three | No added runtime library; static renderer emits escaped spans |
| C2 | Explicit metadata; formula/output plain | Project-owned rules | Color plus weight cue | Existing backgrounds with checked token foregrounds | No added library; renderer formats marked ranges |
| C3 | Explicit metadata; formula/output plain | Prism JS/Python grammars | Color only | Existing backgrounds; chosen theme overrides checked per token | Include selected Prism JS/CSS locally |
| C4 | Explicit metadata; formula/output plain | Highlight.js JS/Python grammars | Color only | Existing backgrounds; chosen theme overrides checked per token | Include a selected two-language build locally |
| C5 | Lesson-context inference for unambiguous block; otherwise plain | Prism grammars | Color plus weight cue | Dedicated local syntax theme checked on all three backgrounds | Bundle Prism assets in course tree |
| C6 | Highlighter autodetection; unknown stays plain | Highlight.js auto detection | Color only | Dedicated theme checked on code backgrounds | Local Highlight.js bundle |
| C7 | Explicit metadata; formula/output plain | CodeMirror JS/Python language packages | Color plus weight cue | Custom `HighlightStyle` checked on all three backgrounds | Bundle packages through added module bundler/loader |
| C8 | Explicit metadata; formula/output plain | CodeMirror language packages | Color only | Existing backgrounds with selected syntax styles checked | Module bundler/loader plus read-only editor view |
| C9 | Explicit metadata; formula/output plain | Prism grammars | Color plus weight cue | Existing backgrounds with checked token foregrounds | Remote CDN or dynamic loader |
| C10 | Explicit metadata; output text excluded; formula plain | Highlight.js grammars | Color plus labels/structural cues, preserving source text | Category styles checked against each background | Local Highlight.js bundle |
| C11 | Context-based inference plus explicit plain-text override for formulas | Project-owned rules | Color only | Dedicated syntax colors verified on actual backgrounds | No library; extend static app renderer |

## Findings

### E1: Required categories map to concrete source constructs

| Required distinction | JavaScript examples (10 `type: "example"`) | Python examples (7 `type: "example"`; five of six code-typed blocks) | Plain/non-source exceptions |
|----------------------|---------------------------------------------|---------------------------------------------------------------|---------------------------|
| Keywords | `class`, `constructor`, `function`, `const`, `return`, `if` | `from`, `class`, `def`, `return`, `if`, `raise`, `try`, `except` | Formula comments are not syntax keywords. |
| Functions/names | `TransitReportBuilder`, `calculate`, `execute`, `readRide`, `constructor` | `FareCalculator`, `Refundable`, `__init__`, `refund`, `charge`, `close` | Generic identifiers include properties/parameters as well as function/class names; do not style every name as a function. |
| Strings and text values | Quoted KZT, route, card, and Russian result text | Quoted Russian output, identifiers in annotations, and `"..."` f-string fragments | `example.output` is expected output text, not source code. |
| Other visible syntax | Numbers, braces, parentheses, dots, operators | Numbers, annotations, brackets, `...`, punctuation | Formula block contains decimals, multiplication sign `×`, `=`, KZT and comments; keep it plain rather than label it JS/Python. |

The source exposes the class/function distinction explicitly in familiar forms: `class X`, JS `function f`, method declarations such as `calculate(...)` and Python `def close(...)`. Calls such as `self.repository.save(...)` and `this.repository` are not declarations and should not automatically inherit the declaration styling. Keyword coverage must include control flow and the import/definition vocabulary actually present, not only the short example in the HL illustration. F-string literal spans contain both text and an embedded expression, so a theme's nested token treatment can affect the visible Russian text.

### E2: Explicit language and plain-text labels can be assigned without guessing

The current source inventory is bounded and known: all 17 `type: "example"` blocks contain code (10 JS, 7 Python); six `type: "code"` blocks contain five Python fragments and one formula; `example.output` represents program output. However, none of those source fields currently carries a `language` property, and the static `<pre><code>` renderer adds no class. Adding a source-level language value for code blocks and a plain/no-highlight value for formula and output offers deterministic dispatch. Context-derived language remains possible where the data structure itself guarantees that context; automatic detection is not necessary to resolve known examples and may misclassify short/overlapping fragments. This defines candidates only; no data or renderer was changed.

Prism documents standard token categories including `keyword`, `class-name`, `function`, `string`, `number` and `operator`; it notes that themes guarantee coverage for standard tokens and that nonstandard labels may need aliases. Highlight.js documents scopes including `keyword`, `title.class`, `title.function`, `string`, and `number`, while warning that some newer scopes lack universal theme support. Both expose enough vocabulary to map the stated categories, but the course's own snippets still need a bounded check for each distinct construct and any nested f-string text. [Prism token reference](https://prismjs.com/tokens.html) and [Highlight.js scope reference](https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html) (accessed 2026-11-03).

### E3: Existing site accents include candidate token colors with contrast headroom

The three existing code backgrounds are `#17241f`, `#1f3029`, and `#28243a`. To compare a compact existing-palette option, calculated normal-text contrast for three already-used light foreground colors:

| Candidate foreground | Existing source | `#17241f` | `#1f3029` | `#28243a` | Lowest ratio |
|-----------------------|-----------------|-----------|-----------|-----------|--------------|
| `#c8e58b` | `--lime` | 11.49:1 | 9.94:1 | 10.71:1 | 9.94:1 |
| `#f0bda2` | `--peach` | 9.56:1 | 8.27:1 | 8.91:1 | 8.27:1 |
| `#dce7df` | Existing summary text | 12.64:1 | 10.93:1 | 11.78:1 | 10.93:1 |

All these candidate pairs exceed the WCAG 2.2 SC 1.4.3 normal-text threshold 4.5:1. This is a calculation from current CSS hex values against the three current block backgrounds, not a proposed final token palette or a visual rendering check. WCAG advises using underlying text/background values and does not permit rounding a sub-threshold result upward. The token colors must also remain distinguishable from each other and readable in rendered examples; those properties are not established by foreground/background ratios alone. [W3C WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### E4: The lightweight options and editor option have different integration surfaces

Project-owned highlighting can mark the finite observed constructs but requires rules for both languages, escaping, nested literals, and a safe fallback. Prism/Highlight.js consume the known language tag and produce semantic token classes; local copies remove their own CDN dependency but do not prove all-course offline completeness. CodeMirror's official reference describes its packages as ES/CommonJS modules requiring a browser bundler or loader; a minimal read-only view still adds editor packages and a delivery path to the current plain-script static course. Its parser is a separate capability from visual tokenization and is not by itself evidence of a configured, accurate diagnostic. [CodeMirror Reference Manual](https://codemirror.net/docs/ref/) (accessed 2026-11-03).

### E5: Scope and economics gaps carried forward unchanged

No accepted, authorized EXAM artifact/return was provided by this gate, so no EXAM draft or unreturned task data was read. H2's exam-state schema/pass rule and H3's acceptance-boundary question remain unresolved as recorded in iteration 1 RES. The exact own-session rollout source path, `session_meta.id`, source version and range start also remain unavailable; no economics capture was attempted, no numeric result exists, and coverage remains unmeasured.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Actual snippets demonstrate every required token family; declarations can be distinguished from property/parameter names, and Python f-strings plus output/formula blocks need special handling. Source-level explicit language and plain-text metadata fit the finite known content. Existing brand colors yield calculated minimum contrast 8.27:1 or higher across all three code backgrounds, although pairwise category distinction and rendered appearance are unverified. A local highlighter maps to standard tokens; CodeMirror adds a module bundler/loader path. | Challenge must stress ambiguity, f-string/plain text and escaping, compare only viable bounded options, and distinguish token color contrast from visual/pairwise category distinction. H2/H3 and economics binding remain at their exact prior evidence limits. |

**Sufficiency:**
- [x] External source used? Yes; W3C WCAG, official Prism token docs, Highlight.js scope docs, and CodeMirror reference.
- [x] Briefing gap closed? Yes; owner explicitly authorized Extract from the completed iteration-2 Gather checkpoint.
- [x] Configuration Space built from Gather dimensions? Yes; all five dimensions are represented in the configuration table.

Stage complete: YES
→ User decision: Recommend continue to Challenge to attack identifier classification, formula/output fallback, f-string handling, and whether the candidates remain proportionate; no additional owner decision is needed before that stage.
