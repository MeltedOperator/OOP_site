# EV — OOP_20261029-184453_RT / Phase B: Терминалы модуля 1

> **Date**: 2026-10-29
> **Author**: Executor · `codex:thread:local:01a188d2-f071-7e82-89c7-6a2813203583`
> **Task**: OOP_20261029-184453_RT/phase-b
> **TS**: [TS Phase B](../TS__phase-b__терминалы_модуля_1.md) · approved `80b292a7ba85756efb0f0e4b53a2a51be94f462c`; owner gate `e5c57f732005df23ea30378ebc4ce2cd879321e0`

---

## Environment

| Field | Value |
|---|---|
| OS | Windows (Codex local worktree) |
| Language / Runtime | JavaScript, Node.js v22.20.0; Python runtime Pyodide 314.0.7 |
| Database | N/A |
| Deploy target | Static site, loopback launcher `127.0.0.1:8000` |
| CI / Pipeline | Local syntax checks, Node tests, and site build |

## Evidence

| # | AC | Verified | How | Observed | Result |
|---|---|---|---|---|---|
| E1 | AC-1 | Source and launcher preserve the approved static boundary | `node --test course/terminal.test.js`; `node scripts/build-site.mjs`; source review at Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41` | Build succeeds; launcher permits GET/HEAD for static course paths and exact local runtime files, rejects POST, API, traversal and unapproved runtime assets. Six runtime assets are pinned to manifest version 314.0.7. Real browser behavior, browser compatibility, offline completeness and hostile-code isolation remain untested and out of scope. | VERIFIED |
| E2 | AC-2 | Existing executable teaching snippets remain unchanged and terminals are mapped only to Module 1 | `node --test course/terminal.test.js`; build guard; Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41` source review | Test compares all authored executable lesson/lab snippets byte-for-byte against baseline `23637e22ce1c4242b904b7a8b9f92cfbd81f2b56`; test and build cover terminal material for lessons and labs 1–3. No PDF or other module content was changed. | VERIFIED |
| E3 | AC-3 | Explicit oracles have positive and negative cases and malformed execution results fail closed | `node --test course/terminal.test.js` on Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41` | Positive and deliberately broken Python fixtures were run through local Pyodide for all three lab oracles; each positive fixture passed and each negative fixture contained a failed criterion. Empty/malformed worker results and execution errors do not become a pass. The test output included `65.00`, `187.20`, event routing, and preserved-balance refusal. | VERIFIED |
| E4 | AC-4 | Failed lab criteria reveal a relevant domain analogy | Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41` review of `course/data.js` and `course/terminal.js`; rendered lab markup assertions in `node --test course/terminal.test.js` | Each of labs 1–3 has its own analogy; failed checks reveal it beside the failed criterion. The analogies map to preserving balance before debit, composing independent fare policies, and routing events to matching handlers. | VERIFIED |
| E5 | AC-5 | Terminal actions leave scoring, checklist, progress, peer review and completion unchanged | `node --test course/terminal.test.js`; `node --test course/storage.test.js`; Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41` diff | Terminal markup contains no score/completion controls; storage tests pass 4/4; `course/storage.js` and scoring/completion implementation are unchanged. UI and docs state that automated feedback does not change points or progress and does not replace manual peer review. | VERIFIED |
| E6 | AC-6 | User-facing claims disclose the limits of the runtime and checking | Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41` review of terminal disclosure, `course/README.md`, and `NorthStar.md`; `node --check` on changed JavaScript modules | The interface and documentation identify the pinned runtime and explicitly say browser behavior, compatibility, offline completeness and isolation are unverified. README now accurately describes Module 1 execution and limited feedback. | VERIFIED |
| E-accounting | Parent VALUE selector | Exactly one row: approval ref; full Baseline/Candidate; selector and path/action/class/reason membership; phase-attribution detail; logical files; additions + deletions = touched LOC; binary/non-text N/A; trigger disposition; immutable-denominator authority/timing; exact NUL-safe method | `git diff --name-status --find-renames=50% -z 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56 6af207b52d36cd674fcc9dbf804a22b637b71a41 -- $valuePaths`; same command with `--numstat`; Node.js v22.20.0 / Git in local worktree | Owner-approved Phase B TS `80b292a7ba85756efb0f0e4b53a2a51be94f462c`, owner approval gate `e5c57f732005df23ea30378ebc4ce2cd879321e0`, parent selector/denominator `16 VALUE files / 4,000 touched text LOC` (`23637e22ce1c4242b904b7a8b9f92cfbd81f2b56`, `f597148f95ed37e139fbfb9c036a35c324cff0a6`). Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41` is the first tested Executor implementation commit. Approved 11 VALUE selector entries resolve to exactly 16 VALUE paths: `M course/app.js` — shared terminal integration; `M course/data.js` — Module 1 terminal materials/oracles; `M course/styles.css` — terminal UI; `M course/index.html` — module inclusion; `A course/terminal.js` — editor/run/output/feedback; `A course/pyodide-worker.js` — Worker/runtime protocol; `A course/assets/pyodide/package.json`, `pyodide-lock.json`, `pyodide.asm.mjs`, `pyodide.mjs` — four text runtime manifest/loader files; `A course/assets/pyodide/pyodide.asm.wasm`, `python_stdlib.zip` — two binary runtime files; `A scripts/serve-course.mjs` — static-only launcher; `M scripts/build-site.mjs` — build integration; `M course/README.md` — local instructions/disclosure; `M NorthStar.md` — approved narrow assessment/boundary clarification. All membership, actions and classes match the TS; no rename or deviation. Phase attribution is valid Phase B, not INVALID. The 16 VALUE paths have 1,019 additions + 12 deletions = 1,031 touched text LOC; two binary files are per-file N/A. `course/terminal.test.js` is one separate ASSURANCE file and is excluded from VALUE accounting. The 16/4,000 denominator is immutable at task scope, was approved before Executor dispatch, is not a Phase B hard cap or a per-phase sum. Trigger prompts 50 VALUE files / 5,000 LOC were not reached; Candidate remains below 16/4,000, so no decomposition/owner return was triggered. The ×2 rule applies only to the same task-wide denominator; no selector or denominator expansion occurred. | VERIFIED |

The exact NUL-safe commands above reproduce the approved selector measurement; no alternate selector or denominator is introduced.

## Verdict

Evidence verdict: 6/6 VERIFIED, 0 DEFERRED, 0 BLOCKED, 0 N/A. The out-of-scope browser, compatibility, offline completeness and isolation claims are explicitly untested; their exclusion does not assert measured zero or successful behavior.

---

*EV — OOP_20261029-184453_RT / Phase B: Терминалы модуля 1 | 2026-10-29*

## Continuation 1 — 2026-10-30: AC-1 browser/runtime evidence disposition

This append-only correction follows the Coordinator continuation `/tfw-handoff OOP_20261029-184453_RT/phase-b` referencing `HL__phase-b__терминалы_модуля_1.md @ e7e8803ce696e63ad69ee7cca42e2fb389f640c4`. The governing approved Phase B TS remains `80b292a7ba85756efb0f0e4b53a2a51be94f462c`; its AC-1 evidence line explicitly defers real browser validation and isolation proof from this rollout.

| # | AC | Verified | How | Observed | Result |
|---|---|---|---|---|---|
| E7 | AC-1 — empirical browser/runtime validation | No browser/runtime compatibility, offline-completeness or isolation behavior was measured | Scope check against approved TS `80b292a7ba85756efb0f0e4b53a2a51be94f462c` at prior Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41`; no browser test was run, consistent with the TS out-of-scope boundary | Source-level static-path and asset checks remain VERIFIED in E1. The empirical browser/runtime portion has no observation and remains explicitly deferred; no success claim is made. | DEFERRED |

The earlier EV verdict above is preserved as the first-return epoch at `71f7660d749d050f22884c0ebe58214f4cfebc03`. Current evidence disposition after this continuation: 6/6 VERIFIED, 1 DEFERRED, 0 BLOCKED, 0 N/A. The deferred item is nonterminal under the approved TS and does not change Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41`.

## Continuation 2 — 2026-10-30: F1 rung-1 route correction

The Coordinator accepted F1 at rung 1 in the live REVIEW `REVIEW__phase-b__терминалы_модуля_1.md @ b6cae465f4b928e845f82e1c645d876b9071ac42`. The corrected, tested Candidate is `422b4fa59881090bfbfa02b4d78ddde622652c1e`. The prior E-accounting row above is the preserved first-return snapshot for Candidate `6af207b52d36cd674fcc9dbf804a22b637b71a41`; the independent Reviewer also replayed that epoch in REVIEW. The current accounting row below is the one for this Candidate.

| # | AC | Verified | How | Observed | Result |
|---|---|---|---|---|---|
| E8 | AC-2 — actual app routes render the six terminals | The complete `course/app.js` route was exercised with the real course data and terminal renderer in a Node VM; Candidate `422b4fa59881090bfbfa02b4d78ddde622652c1e` | `node --test course/terminal.test.js`; the new route test starts the app on each lesson/lab content route and asserts its terminal kind and page id | All six page routes emit the expected terminal markup. This detects both the absent `lab.example` guard and the app/renderer method mismatch. Existing examples remain independent of terminal presence. | VERIFIED |
| E9 | AC-3 / AC-5 — oracle and score boundaries after route fix | Full terminal suite and storage regression were rerun at Candidate `422b4fa59881090bfbfa02b4d78ddde622652c1e` | `node --test course/terminal.test.js`; `node --test course/storage.test.js` | Terminal suite 7/7 and storage suite 4/4 passed; positive/negative Pyodide fixtures for labs 1–3 still pass/fail as expected. Route correction does not add score/progress controls or change storage. | VERIFIED |
| E10 | AC-1 / AC-6 — static boundary, build and declared limits after route fix | Source and build checks rerun at Candidate `422b4fa59881090bfbfa02b4d78ddde622652c1e` | `node --check` on changed/runtime modules; `node scripts/build-site.mjs`; `node --test course/terminal.test.js` | Syntax checks and build pass; exact six runtime assets and static-only request boundary remain in scope. Browser/runtime compatibility, offline completeness and isolation remain untested and DEFERRED as E7 states. | VERIFIED |
| E-accounting | Parent VALUE selector | Exactly one accounting row for current Candidate: approval, full Baseline/Candidate, literal selector membership/actions/classes/reasons, arithmetic, binary N/A, trigger disposition and unchanged reproduction | NUL-safe Node `execFileSync` replay of the two commands below; Git raw Buffer output; Node.js v22.20.0 | Approved TS `80b292a7ba85756efb0f0e4b53a2a51be94f462c`, owner gate `e5c57f732005df23ea30378ebc4ce2cd879321e0`, parent selector/denominator `16 VALUE files / 4,000 touched text LOC`, Baseline `23637e22ce1c4242b904b7a8b9f92cfbd81f2b56`, Candidate `422b4fa59881090bfbfa02b4d78ddde622652c1e`. All 11 approved selector entries match as 16 touched VALUE paths: `M course/app.js` — common lesson/lab terminal integration; `M course/data.js` — Module 1 materials/oracles; `M course/styles.css` — interface; `M course/index.html` — module inclusion; `A course/terminal.js` — editor/run/output/feedback; `A course/pyodide-worker.js` — Worker/runtime protocol; `A course/assets/pyodide/package.json`, `pyodide-lock.json`, `pyodide.asm.mjs`, `pyodide.mjs` — four text runtime manifest/loader files; `A course/assets/pyodide/pyodide.asm.wasm`, `python_stdlib.zip` — two binary runtime files; `A scripts/serve-course.mjs` — static-only launcher; `M scripts/build-site.mjs` — build integration; `M course/README.md` — instructions/disclosure; `M NorthStar.md` — narrow assessment/boundary clarification. Actions/classes/reasons match the approved selector; no rename or membership deviation. Phase attribution is valid Phase B. Numeric numstat is 1,018 additions + 11 deletions = 1,029 touched text LOC; WASM and stdlib ZIP are non-text, per-file N/A. `course/terminal.test.js` is ASSURANCE, not VALUE. The immutable task denominator was approved before dispatch; the 50-file/5,000-LOC decomposition prompts and 16/4,000 task ceiling remain satisfied; the ×2 rule applies only to the task denominator. The previous Candidate snapshot was 1,019 additions + 12 deletions = 1,031 LOC; this correction removes one added and one deleted line from the baseline delta. | VERIFIED |

```powershell
git diff --name-status --find-renames=50% -z 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56 422b4fa59881090bfbfa02b4d78ddde622652c1e -- $valuePaths
git diff --numstat --find-renames=50% -z 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56 422b4fa59881090bfbfa02b4d78ddde622652c1e -- $valuePaths
```

Current acceptance evidence at this Candidate: 6/6 criteria VERIFIED, 1 explicitly deferred empirical AC-1 subclaim, 0 BLOCKED, 0 N/A. F1 awaits affected independent review; no owner acceptance is inferred.
