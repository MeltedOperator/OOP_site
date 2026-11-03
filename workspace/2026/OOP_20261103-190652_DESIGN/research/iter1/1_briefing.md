# Briefing — «Что исследовать?»

> **Mindset:** Strategist. We're planning an investigation, not doing it. Frame what matters. Resist solving.
> **Test:** Can I explain why we're investigating this and what would change our approach?
> Parent: [HL-OOP_20261103-190652_DESIGN.md](../../HL-OOP_20261103-190652_DESIGN.md)
> Goal: Сделать курс OOPoman понятнее и привлекательнее, сохранив его учебный поток и архитектурные границы.
> Producer unit: `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`
> Parent Coordinator: `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`
> Activation / dispatch source: owner-rooted dispatch, `journal/20261103-193737__dispatch__91fd.md` @ `a656312541ea09d515569db3cd3136873621a35f`; exact first message `/tfw-research OOP_20261103-190652_DESIGN`.
> Coordination authority: `HL-OOP_20261103-190652_DESIGN.md @ 5b72172600de8512a04e7766f019cc30366e4d84`
> Originating proposer: `{principal: roman, unit: owner:roman}`
> Selected mode: `focused`, owner answer in `journal/20261103-195345__gate_answer__b71d.md @ 51be48df282a900e33a5944cab3a6e10bb45e965`; selected iteration control: `research/iterations.yaml @ 51be48df282a900e33a5944cab3a6e10bb45e965`.

## Research Plan

### Gather
- Inventory the actual JavaScript and Python examples, their rendering paths, and the current runner/editor surfaces.
- Map the local asset and startup constraints that affect offline highlighting, including existing dependencies and browser APIs.
- Identify decision dimensions and alternatives for static highlighting, editor behavior, and progress/certificate data reads.
- Consult primary technical documentation for candidate approaches and record their actual size, language, and offline implications where verifiable.

### Extract
- Trace the current course and exam persistence code to identify exact stored shapes, completion markers, score fields, and failure/missing-data behavior.
- Derive read-only predicates for all three modules and passing the exam without changing either store or its scoring rules.
- Match the three exam names to the provided JPG filenames and inspect the current name spelling.
- Record which findings rely on existing project evidence and which require a fresh external source.

### Challenge
- Compare lightweight token highlighting with a full editor and live parsing on learning value, local/offline behavior, maintenance, accessibility, and false-diagnostic risk.
- Challenge progress and certificate predicates against absent, malformed, partial, and stale local state without mutating learner data.
- Test whether each candidate recommendation meets frozen HL requirements while keeping the course/exam boundary intact.
- State residual uncertainty and propose the smallest supported choice; do not edit HL or implementation.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|---|---|
| H1 | Lightweight local highlighting is sufficient; a full editor is not worth its added complexity for this course. | open |
| H2 | The two local stores contain stable read-only signals for detailed progress and the joint certificate condition. | open |
| H3 | Renaming the exam option to «Санжар» and mapping all three JPGs fits this separate post-EXAM task without changing accepted EXAM scope. | open |

## Scope Intent

- **In scope:** current static course rendering and code examples; local highlighting/editor alternatives; read-only course and exam storage shapes; module/lab/exam progress signals; three name-to-JPG mappings; safe dual-condition certificate gating; compatibility with the approved local-first architecture.
- **Out of scope:** implementation; changing HL, TS, or EXAM; redesigning scoring/completion; editing certificate files; identity verification; server, account, or publishing changes; proving browser isolation or comprehensive offline behavior beyond the specific evidence needed here.

## Guiding Questions

1. Which local approach can clearly distinguish the code elements actually used in both languages without creating a false claim of live syntax validation?
2. What exact existing state fields can safely support progress display and require both completed modules and a passed exam before enabling a certificate?
3. Which exact student names map to the three supplied JPGs, and does the «Санжар» correction remain within the accepted DESIGN scope?

## User Direction

The owner selected `focused` for iteration 1. The approved HL requires baseline JS/Python highlighting; a full editor and live diagnosis remain conditional on evidence. The owner approved the local course context and joint certificate condition, then explicitly authorized Gather and directed the Researcher to check the built-in economics helper and Codex rollout recipe before concluding whether source binding was available. That check and its result are recorded in `2_gather.md`.

## Existing knowledge applied

- **P0:** `NorthStar.md` blob `ea0dccca29b53b4ff5bcbb55de0382f19affbe7a` at the approved authority commit, project scope: a small local-first course with three modules, static browser delivery, local progress, and no account/backend. Its exam details predate the current approved DESIGN contract and do not replace that contract.
- **P1:** `.tfw/README.md` blob `76a08ff82ebb369b54fc483178566cc62c2f3bbb` at the approved authority commit, inspected methodology principles: candor, structural enforcement, precise naming, and portable project memory.
- **P2:** `knowledge/philosophy.md` is reported absent in the approved HL; this is preserved as a bounded justified-none input, not treated as a new philosophy decision.
- **P3:** `knowledge/records/TD-OOP-RT-TERMINAL-RUNTIME.md` blob `4eaed288c88ec8acff6255531e950e7458fc19e3`, producer task `OOP_20261029-184453_RT`, Coordinator `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`; accepted scope is OOPoman modules 1–3 and 18 PDFs at Candidate `31360a3483f207312e8f9b4c64249ea425500d54`. It records Pyodide in a Worker, a static local launcher, and that compatibility, offline completeness, performance, and isolation are not empirically verified. Incoming correction/successor/conflict references were searched in `knowledge/records/`; none were found. Apply those limits to claims about runtime or offline guarantees.
- **P4:** `.tfw/conventions.md` blob `be4afe33d1f5ff0d9ffac17edf14279ea58abc0d` at the approved authority commit, the HL contract and design/anti-pattern rules bound this to the approved single task and frozen requirements.
- **P5–P7:** the approved HL reports no applicable convention, process, or distinct interface-pattern knowledge. No new sources in these categories were introduced by this briefing.

## Trace: pre-extraction economics binding gap

- **Producer:** Researcher `codex:thread:local:01a1a1d7-e37d-78a2-9df0-0d924a659578`, observed on the current activation/resumption.
- **Known binding:** project `weboop`; task `OOP_20261103-190652_DESIGN`; role `Researcher`; owner `roman`; parent Coordinator `codex:thread:local:01a1a1a2-cf43-7872-bfb3-c0c2e16409c4`; task timezone `Asia/Qyzylorda`; dispatch source above. At the later Gather check, `CODEX_SESSION_ID` and `CODEX_THREAD_ID` both resolved to this worker address; these are not assumed to equal the rollout's `session_meta.id`.
- **Unavailable required binding:** the built-in helper exists and accepts `codex.rollout`, but requires the exact source path, `session_meta.id`, source version, and range start. The owner-authorized exact-name lookup under the existing default `C:\Users\tata2\.codex\sessions` found no `rollout-01a1a1d7-e37d-78a2-9df0-0d924a659578.jsonl`; no other rollout filename or content was inspected because the gate limits access to this unit's session. The current task exposes no separately observed `session_meta.id` or exact numeric range start. No capture was attempted.
- **Extraction attempted:** `false`.
- **Last-good returned numeric file/hash:** none.
- **Disposition:** no numeric JSONL, invented source ID, range, or measured zero is emitted. No external utility was downloaded because the selected collector is present and the unavailable binding is the native source locator. Preserve this gap as TRACE; numeric coverage remains unmeasured.

---
Stage complete: YES
