---
time: 2026-11-03T18:40:32+05:00
kind: dispatch
from: task Coordinator
recipient: phase-b Coordinator
route: codex:thread:local:01a188ab-5190-7ce1-ab81-e572ebbbebc2
refs:
  - status.md @ d16828311aa6d5a8587ea73ba84edc28006fc04b
  - phase-b/status.md @ a6beff1e267a33dc2bf1ddcc589fc26a5ed97220
  - phase-b/RF__phase-b__терминалы_модуля_1.md @ 4679fdbf8d5714c00a69a7f85002c7d177fec45a
summary: "Resolve Phase B managed-worktree cleanup for task close."
---

Read the current task/phase status, journal and cited final RF. During this accepted close only, identify the Phase B worktree(s) actually owned by this phase from its artifacts. If a worktree is still present and the accepted Candidate/review/evidence needed for recovery is preserved in the main task tree, safely archive it through its owning chat's supported worktree control; do not delete or modify any worktree belonging to another task. Include prior Phase B attempts only where the phase's own records show they are task-owned and no longer needed. Do not change product code or reopen review. Return STATE_REF for the durable cleanup result, or UNAVAILABLE for the exact resource/action that cannot be handled.
