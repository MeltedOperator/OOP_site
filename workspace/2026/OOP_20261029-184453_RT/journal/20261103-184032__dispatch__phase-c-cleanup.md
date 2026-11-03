---
time: 2026-11-03T18:40:32+05:00
kind: dispatch
from: task Coordinator
recipient: phase-c Coordinator
route: codex:thread:local:01a18b1b-cf9b-7a50-a203-23392130eb0e
refs:
  - status.md @ d16828311aa6d5a8587ea73ba84edc28006fc04b
  - phase-c/status.md @ 08052eecb73a4e8627a1ec2eaadc2d61747485f4
  - phase-c/RF__phase-c__терминалы_модулей_2_и_3_единый_пакет.md @ a9c42ea13361a302914ba81851c64ac4d4a2132f
  - phase-c/REVIEW__phase-c__терминалы_модулей_2_и_3_единый_пакет__rev4.md @ 8e1126096d71ce5d605e333212c98d8ecb445857
summary: "Resolve Phase C managed-worktree cleanup for task close."
---

Read the current task/phase status, journal and cited final RF/REVIEW. During this accepted close only, identify the Phase C worktree(s) actually owned by this phase from its artifacts. If a worktree is still present and the accepted Candidate/review/evidence needed for recovery is preserved in the main task tree, safely archive it through its owning chat's supported worktree control; do not delete or modify any worktree belonging to another task. Include prior Phase C attempts only where the phase's own records show they are task-owned and no longer needed. Do not change product code or reopen review. Return STATE_REF for the durable cleanup result, or UNAVAILABLE for the exact resource/action that cannot be handled.
