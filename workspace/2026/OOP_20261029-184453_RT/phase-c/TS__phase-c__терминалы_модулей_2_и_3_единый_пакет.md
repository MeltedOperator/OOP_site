# TS — OOP_20261029-184453_RT / Phase C: Терминалы модулей 2 и 3 — единый пакет

> Date: 2026-10-30
> Author: Coordinator
> Status: 🔒 TS_DRAFT — approved by roman 2026-10-30
> Parent Phase HL: HL__phase-c__терминалы_модулей_2_и_3_единый_пакет.md
> Task HL: ../HL-OOP_20261029-184453_RT.md @ 16e634d54418705183f6d6587b616cd79d50f806
> Task TS: ../TS__OOP_20261029-184453_RT__rev2.md @ aa346605fd53ffa6234d0c8a3cbcec324a8eeb6f
> Predecessor: accepted Phase B RF/EV/REVIEW rev4 at a6beff1e267a33dc2bf1ddcc589fc26a5ed97220; Candidate c1acf55e81f9ec4927f883034eaba92de2214ebf
---

## 1. Objective

Deliver one reviewed and owner-accepted Candidate integrating the learning terminal into all six lesson pages and six lab pages for Modules 2 and 3. Students run selected examples and get bounded practical feedback. Scoring, progress, checklist, peer-check and completion remain unchanged. One combined phase, Executor, Candidate and independent review.

## 2. Scope

### In Scope
- Modules 2 and 3 together: lessons 4–9 and labs 4–9, exactly 12 pages.
- Start from accepted Phase B Candidate; preserve its terminal/worker behavior and acceptance contract.
- Integrate lesson examples and current-site lab exercises with deterministic oracle coverage only for objectively observable practical criteria.
- Preserve existing executable strings; comments follow original-language syntax under parent A8.
- Keep Labs 7–9 at current site scope: fictional local gateway; two-check/two-observer lab; Shift/Repository/FinishShift. Do not restore PDF scope without owner ruling.
- Return evidence/RF for one Candidate; independent review and owner acceptance precede publication decision.

### Out of Scope
- Module 1 changes or a second gate between Modules 2 and 3.
- New VALUE paths/assets beyond parent selector or exceeding the cumulative denominator.
- Changes to PDFs, scoring, progress, checklist, peer-check, completion, backend, authentication or database.
- Expanding Labs 7–9 to full PDF scope.
- Empirical browser compatibility, security/isolation, offline completeness, performance or hard resource-limit claims; these stay unverified.
- Automatically grading architecture quality, documentation, rationale or oral defense.

## 3. Principles Check

| # | HL §7 principle | Enforced by | Gate |
|---|---|---|---|
| P1 | Preserve course assessment contract | AC-8 | Regression/source comparison |
| P2 | Automate only objective criteria | AC-6 | Every PASS maps to a deterministic oracle |
| P3 | Integrate both modules together | AC-1 | Exact 12-page inventory, one Candidate/review |
| P4 | Preserve current lab boundaries | AC-4/5 | Compare checks to current site scope |
| P5 | State runner uncertainty honestly | AC-9 | Unsupported empirical properties stay unverified |
| P6 | Keep parent accounting immutable | AC-10 | Exact selector and denominator |

## 4. Affected Files and Value-Bearing Accounting

| File / selector | Action | Class | Semantic reason / required result |
|---|---|---|---|
| course/app.js | MODIFY | VALUE | Integrate terminal across six lesson and six lab routes. |
| course/data.js | MODIFY | VALUE | Examples, exercises and oracle data for lessons/labs 4–9; preserve existing strings. |
| course/styles.css | MODIFY | VALUE | Responsive terminal surface for combined pages. |
| course/index.html | MODIFY | VALUE | Shared terminal remains wired into course shell. |
| course/terminal.js | MODIFY | VALUE | Reuse execution and feedback; preserve Phase B criteria. |
| course/pyodide-worker.js | MODIFY | VALUE | Reuse accepted worker protocol; no unsupported claims. |
| course/assets/pyodide/** | MODIFY/N/A | VALUE | Exactly six existing parent assets; no extra asset. Binary LOC per-file N/A. |
| scripts/serve-course.mjs | MODIFY | VALUE | Preserve static-only local preview. |
| scripts/build-site.mjs | MODIFY | VALUE | Build required assets/pages. |
| course/README.md | MODIFY | VALUE | Local run instructions and truthful limits. |
| NorthStar.md | MODIFY only if required by inherited approved narrow clarification | VALUE | No new policy/scope. |
| course/terminal.test.js | MODIFY | ASSURANCE | Deterministic regression and oracle checks; excluded from VALUE. |
| Phase evidence, RF, status/journal | CREATE/MODIFY | TRACE | Durable result and authority trace. |

### Prospective accounting contract

| Fact | Approved value |
|---|---|
| Subject / exact VALUE selector | Same fixed parent selector: course/app.js, course/data.js, course/styles.css, course/index.html, course/terminal.js, course/pyodide-worker.js, scripts/serve-course.mjs, scripts/build-site.mjs, course/README.md, NorthStar.md and exactly six files in course/assets/pyodide/. |
| Baseline / selector source | Root baseline 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56; selector authority parent TS rev2 at aa346605fd53ffa6234d0c8a3cbcec324a8eeb6f. |
| Candidate rule | First tested Executor commit with VALUE and ASSURANCE before EV/RF/REVIEW/final transition; later VALUE change needs a new Candidate and recalculation. |
| Logical VALUE files | 16 total in parent selector; no Phase C expansion. |
| Touched text LOC | Cumulative maximum 4,000 additions + deletions from root baseline. Accepted Phase B uses 1,200; Phase C remaining maximum is 2,800. Binary/non-text assets are per-file N/A. |
| Triggers / disposition | Parent prompts 50 VALUE files / 5,000 LOC; approved immutable limit remains 16 / 4,000. Prompt crossing needs cause, cost, assurance, split, authority and verdict before work. |
| Multiplier / authority | Parent-approved denominator 16 VALUE files / 4,000 LOC; ×2. Never ratchet. Any selector/denominator increase requires owner approval before affected action. |
| Approval epoch / failure | Exact Phase C TS and denominator approval recorded before Executor activation. Missing/mutable/mismatched/late = BLOCKED; metric-only N/A; unresolved phase invalid; DEFERRED non-terminal. |

~~~powershell
$valuePaths = @('course/app.js','course/data.js','course/styles.css','course/index.html','course/terminal.js','course/pyodide-worker.js','scripts/serve-course.mjs','scripts/build-site.mjs','course/README.md','NorthStar.md') + (Get-ChildItem course/assets/pyodide -File | Select-Object -ExpandProperty FullName)
git diff --name-status --find-renames=50% -z 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56 <CANDIDATE_SHA> -- $valuePaths
git diff --numstat --find-renames=50% -z 23637e22ce1c4242b904b7a8b9f92cfbd81f2b56 <CANDIDATE_SHA> -- $valuePaths
~~~

### Prospective scope rulings
None beyond approved parent selector/denominator and owner decisions A8–A9. No new VALUE file, runtime asset, PDF-scope expansion or assessment change is authorized.

### Task-local hard constraints

| M1 consequence | M2 object/risk | M3 measure/selector | M4 pre-act check | M5 softer-control gap | M6 authority |
|---|---|---|---|---|---|
| Misleading PASS or altered assessment | Terminal feedback, worker, scoring and progress | Exact 16 VALUE paths; 4,000 cumulative LOC; Phase C max 2,800 after B | Before new VALUE path/asset or behavior, compare selector and current-site scope | Code review cannot prove unobserved runtime/browser/security behavior | Owner for frozen boundaries/denominator; Executor only within TS |

**Actions (not budget dimensions):** modify only existing VALUE selector; one ASSURANCE test file; EV/RF/status/journal TRACE; no PDFs.
**Immutable owner-approved denominator:** 16 VALUE files / 4,000 cumulative touched text LOC; Phase C remaining maximum 2,800; never ratchets.

## 5. Acceptance Criteria

### AC-1: Exact combined inventory
All lesson pages 4–9 and lab pages 4–9 integrate the terminal in this single Candidate, with no intermediate module gate.
- [ ] Evidence enumerates all 12 page IDs and maps each to its example/exercise.
Gate: source inventory and route inspection.
Evidence: exact Candidate SHA and inventory.

### AC-2: Lesson alignment and preservation
Each lesson example matches its topic; executable source strings are preserved; comments follow original-language syntax under A8.
- [ ] Diff maps changed lesson blocks to previous text and objective.
Gate: deterministic diff and lesson inventory.
Evidence: Candidate SHA and mapping.

### AC-3: Labs 4–6 objective criteria
Labs 4–6 cover current-site refactoring, contracts/DI and factory/builder/report scenarios. Each automatic PASS maps to fixed inputs and observable output.
- [ ] Architecture quality and rationale remain human-reviewed.
Gate: repository suite and oracle-to-criterion mapping.
Evidence: commands/results and mapped cases.

### AC-4: Lab 7 current scope
Lab 7 uses only the fictional local gateway and deterministic approve/decline/timeout flow.
- [ ] No real network/payment behavior, retries, secrets or restored PDF-only features.
Gate: source/test inspection.
Evidence: case map.

### AC-5: Labs 8–9 current scope
Lab 8 stays the two-check/two-observer scenario; Lab 9 stays Shift/Repository/FinishShift with in-memory storage.
- [ ] Wider PDF requirements are listed as out of scope, not silently restored.
Gate: source/test inspection.
Evidence: per-lab mapping.

### AC-6: Feedback truthfulness
Status/explanation reflect executed deterministic checks; failures cannot show PASS; human architectural/docs/oral criteria are not auto-passed.
- [ ] Every PASS has an objective oracle and each failure path identifies its unmet condition.
Gate: positive and negative fixture checks.
Evidence: actual output and oracle map.

### AC-7: Phase B compatibility
Combined pages use the accepted Phase B terminal interface without regressions.
- [ ] Run existing and changed relevant tests; stay within selector.
Gate: repository test command and diff review.
Evidence: command, result and Candidate SHA.

### AC-8: Assessment and product boundaries
Points, progress, checklist, peer-check, completion and PDFs remain unchanged; Module 3 stays local preview.
- [ ] Targeted regression/source comparison confirms boundaries.
Gate: assertions and diff inventory.
Evidence: results and exact Candidate.

### AC-9: Claims match proof
No browser compatibility, security/isolation, offline completeness, performance or hard resource-limit claim exceeds evidence.
- [ ] Unsupported empirical properties remain marked unverified in UI/docs/RF.
Gate: claim inventory.
Evidence: environment checks or explicit DEFERRED.

### AC-10: Immutable cumulative accounting
Use exact parent selector; total stays within 16 VALUE files / 4,000 touched LOC; Phase B is 1,200 and Phase C delta at most 2,800.
- [ ] Preserve raw accounting output in system temp; summarize refs, paths and arithmetic in EV/RF.
- [ ] Any added VALUE path or limit breach stops before action for owner ruling.
Gate: exact-selector name-status and numstat from root baseline; reconcile Phase B count.
Evidence: raw temp output and reproducible summary.

### Evidence Artifacts

| File | Description |
|---|---|
| evidence/EV__phase-c__терминалы_модулей_2_и_3_единый_пакет.md | Per-AC evidence, commands, Candidate SHA, limits, DEFERRED claims. |
| RF__phase-c__терминалы_модулей_2_и_3_единый_пакет.md | Durable phase result and accounting. |
| REVIEW__phase-c__терминалы_модулей_2_и_3_единый_пакет.md | Independent review verdict. |

## 6. Technical Guidance
- Start from accepted Phase B Candidate c1acf55e81f9ec4927f883034eaba92de2214ebf, not stale Phase B projection.
- Keep examples runnable through accepted interface; use deterministic course fixtures.
- If PDF and current site differ, current site scope is executable contract.
- Frozen parent boundary changes require a proposal before implementation.

## 7. Definition of Failure
- ❌ A module/page is omitted, split into another phase or gets a separate Candidate/review.
- ❌ Existing strings, scoring, progress, checklist, completion, PDFs or narrower Labs 7–9 change without authority.
- ❌ PASS lacks an objective oracle or implies human architectural approval.
- ❌ Runtime/browser/security/offline claims exceed actual evidence.
- ❌ Selector/denominator expands or Candidate exceeds remaining 2,800 LOC without prior owner approval.
- ❌ Accepted Phase B behavior regresses.

On failure stop affected work, preserve evidence and route the exact issue; never silently split, trim or relabel scope.

## 8. Phase Risks

| Risk | Mitigation |
|---|---|
| 12 pages exceed 2,800 LOC | Track cumulative diff and route expansion before action. |
| Source contradicts parent As-Is prose | Use current source inventory and preserve strings; route contract conflict. |
| PDF silently expands Labs 7–9 | Tie checks to current site criteria. |
| Shared terminal regresses Module 1 | Re-run accepted regression criteria. |
| Browser/runtime remains unknown | Keep claims unverified; source checks are not runtime proof. |

## 9. Cross-Phase Modifications

| File | Also modified in | Coordination note |
|---|---|---|
| course/app.js | Phase B | Preserve shared integration. |
| course/data.js | Phase B | Add lessons/labs 4–9 only; preserve strings/current scope. |
| course/styles.css | Phase B | Avoid unrelated restyling. |
| course/terminal.js | Phase B | Preserve accepted execution/feedback behavior. |
| course/pyodide-worker.js | Phase B | Preserve protocol; no new security claims. |
| course/index.html | Phase B | Shared wiring. |
| scripts/build-site.mjs | Phase B | Shared build/assets path. |
| course/README.md | Phase B | Keep instructions and uncertainty consistent. |
| NorthStar.md | Phase B | Only inherited narrow clarification. |

---
*TS — OOP_20261029-184453_RT / Phase C: Терминалы модулей 2 и 3 — единый пакет | 2026-10-30*

