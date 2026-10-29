---
time: 2026-10-30T02:30:29+05:00
kind: dispatch
on_behalf_of: roman
via: Codex Coordinator task chat
refs:
  - status.md
  - HL-OOP_20261029-184453_RT.md
  - TS__OOP_20261029-184453_RT.md
  - journal/20261030-022723__dispatch__owner-selects-ts-reopen.md
summary: "Уточнить в ревизии Phase B обработку JavaScript-теории по родительскому TS"
---

Source: Task Coordinator's comparison of the returned Phase B TS revision against its frozen parent TS. Destination: Phase B Coordinator `codex:thread:local:01a188ab-5190-7ce1-ab81-e572ebbbebc2`; parent is task Coordinator `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`. Originating proposer: `{principal: roman, unit: owner:roman}`. This is a bounded specification alignment within the owner-approved scope, not a new product requirement.

Observed discrepancy: parent TS `f597148f95ed37e139fbfb9c036a35c324cff0a6` says existing JavaScript examples in Modules 1–2 remain comparative material, retain their executable lines (with `//` comments where approved), and have a separate adjacent runnable Python terminal with a language comparison; the terminal executes Python. Phase TS rev1 `cd167aa5dab1581e35fa2a3762826649f885336d`, AC-2, says every static code block becomes a terminal exercise and uses a per-snippet map, without expressly exempting JavaScript comparison blocks from execution. That can be read to contradict the parent runtime contract and the owner's earlier decision to keep JavaScript and add Python alongside it.

Required correction before owner approval: explicitly state in the Phase B TS that each JavaScript theory block remains non-executable comparison material, its executable lines are preserved and receive only `//` comments, and its adjacent Python example is the runnable terminal for that concept, with the approved short language comparison. Keep every original Python theory block terminalized under AC-2. Ensure the lesson coverage map distinguishes preserved JavaScript comparison blocks from runnable Python terminal exercises. Do not alter the owner's newly confirmed lab-step, runnable-analogy, full-solution, scoring/progress or Module 2/3 hold criteria, the runtime boundary, selector, or denominator. Return the corrected exact TS artifact and immutable ref; do not dispatch the Executor until the owner has approved that exact TS.

Authority: parent lifecycle `PHASES`; frozen parent HL `23637e22ce1c4242b904b7a8b9f92cfbd81f2b56`; approved parent TS `f597148f95ed37e139fbfb9c036a35c324cff0a6`; owner-selected Phase B TS correction cycle `phase-b/journal/20261030-022757__transition__a1bf.md @ 62fd2395c3e3fd329472915694369902ee4df53d`; owner requirements `journal/20261030-020917__dispatch__phase-b-revise-spec.md @ 8ca85631ccedaeac3a619274e6052645c77d705b`.
