# Map — OOP_20261027-201313_WEEK3
> **Mindset:** Experienced newcomer. Understand the accepted result before judging it.
> **RF:** `RF__OOP_20261027-201313_WEEK3.md @ 6c9e9029fceba3284b674958b4a7727b9a62ce04`
> **TS:** `TS__OOP_20261027-201313_WEEK3.md @ 387ed93abf976b0c730045750d465b276c067fad`
> **Candidate:** `933519a335313792f2fb8b7bffc7af042f1f8af0`; **Baseline:** `621e25173357b008b6f9bf3595e1db8f88dadd3c`

## Understanding

The Candidate delivers six connected Russian course pages for lessons and labs 7–9, with Python examples, UML assets, a local preview, and related documentation. Its purpose is to let second-year students connect object-oriented concepts to practice while Roman can inspect the unfinished module locally; distribution, network calls, and real payment activity remain outside the contract. The review must establish page-level acceptance, preserve the frozen purpose and safety boundaries, and keep evidence specific to this exact Candidate.

## Accepted Claims and Boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE / ASSURANCE | Six lesson/lab pages 7–9 are navigable, complete in accessible Russian, and each includes Python code, matching output, meaningful UML with text equivalent; labs include practice, checklist and five questions. | Missing or misleading teaching material prevents the promised connected learning route. | `course/data.js`, renderer, six page shells, six SVGs, navigation, responsive presentation. | Candidate built static course, desktop and narrow viewport. | TS AC-1, HL §§1/3/5/7, North Star; direct source and rendered page. | Candidate `933519a…`; EV E1; exact pages and assets. | yes |
| C2 | VALUE / ASSURANCE | Each paired route fits the stated 60-minute core with optional depth; lesson/lab pairs align, payment example is fictional/local, with no retry/idempotency in core; no measured learning claims. | Mis-teaching provider behavior, overloading core, or implying measured outcomes. | Six page records and cited provider callout; source PDFs and iter3 RES. | Candidate page content compared with approved TS and six source PDFs. | TS AC-2/DoF; HL baseline; owner decisions in request and RES. | Candidate `933519a…`; EV E2. | yes |
| C3 | VALUE / ASSURANCE / TRACE | Site remains static: Python is not executed; six pages and diagrams build and render locally at narrow width; public publication remains gated. | Unsafe code execution, broken preview or unintended release of unfinished course. | Renderer, build script, preview flags, distribution state and UML assets. | Reproducible build and local browser at Candidate. | TS AC-3, HL/North Star; build result and direct browser observation. | Candidate `933519a…`; EV E3; no public deployment claimed. | yes |
| C4 | VALUE / ASSURANCE | Course README, North Star and changelog describe the local preview/publication boundary accurately. | Users may mistake local work for accepted or released course content. | Three documentation files and project purpose. | Candidate docs, compared with approved HL/TS and North Star. | TS AC-4 and frozen contract; direct file content. | Candidate `933519a…`; EV E4. | yes |
| C5 | ASSURANCE | The RF's accepted-result accounting covers exactly the owner-approved 19 VALUE paths, valid attribution, arithmetic, threshold disposition and timing. | Wrong candidate scope or late/mutable authority could hide unapproved value changes. | Baseline, immutable TS selector, Candidate diff and phase attribution. | Git objects Baseline/TS/Candidate; NUL-safe selector. | TS §4 and owner approval event `7F3A`; independent exact-path recomputation. | Candidate `933519a…`, Baseline `621e251…`; RF §1/EV E-accounting. | yes |
| C6 | TRACE / authority | Review is independent, correctly routed, and does not imply Roman's acceptance, publication authorization, or task close. | Unauthorized acceptance or distribution; wrong role route. | Status, journal, dispatch, exact RF/EV, Coordinator and owner decision. | Current task routing spine and immutable refs. | `status.md`; dispatch `F3A1`; approved TS/HL; conventions. | Task state RF; dispatch ref `F3A1`; Candidate `933519a…`. | yes |
| C7 | TRACE | Reviewer's own economics source binding is either validly captured, or its attributable pre-extraction gap is disclosed without invented totals. | Fabricated resource claims or hidden measurement uncertainty. | Current role source binding, own REVIEW trace and current economics contract. | This review task/unit and its actual capture surface. | `.tfw/economics/README.md`; review workflow Step 6; current tool observability. | Current Reviewer unit; no extraction attempted at map checkpoint. | yes |

## TS ↔ RF Alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-1: six complete pages, source preservation, lab structure | RF §3 AC-1; §4; EV E1 | C1 | ⚠️ Claim is specific; independently inspect each page/source and verify unchanged sources. |
| AC-2: 60-minute cores, paired models, fictional payment context, no measured outcomes | RF §3 AC-2; §2; EV E2 | C2 | ⚠️ Claim is specific; verify content against TS-named PDFs and RES. |
| AC-3: local preview/build, static Python, responsive UML, no premature release | RF §3 AC-3; §4; EV E3 | C3 | ⚠️ Inspect Candidate implementation and rendered result; EV alone is not the oracle. |
| AC-4: docs, independent review, owner acceptance, economics | RF §3 AC-4; EV E4/E5 | C4, C6, C7 | ⚠️ Executor items verified separately; review, owner acceptance and final economics remain reserved. |
| TS §4 approved accounting contract | RF §1; EV E-accounting | C5 | ⚠️ Recompute exact selector and arithmetic against immutable objects. |
| HL purpose, boundaries, DoF and P1–P7 | RF §§1–4 | C1–C4, C6 | ⚠️ Judge against approved HL baseline and Project North Star, independently of phase AC status. |

## Verification Selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1 | Inspect all six Candidate data records, shells, SVG metadata/text alternatives and relevant renderer; build the Candidate in a task-scoped temporary checkout and open all six routes; count lab questions/checklists. Compare existing pages/PDFs to Baseline. | Every page is a material output and all are mandatory; individual sampling would miss a whole-page defect. | Build/browser observation must be newly observed here; no automated tests are permitted by TS. |
| C2 | Read all six source PDFs and `research/iter3/RES.md`; inspect each page's timing, optional sections, paired concepts, fictional boundary, provider citations and claims. | Course accuracy and no-payment boundary apply to every paired route; real API claims need primary-source support. | Student understanding/time fit is unmeasured by contract; do not infer it from content. |
| C3 | Review exact Candidate build/render changes, preview flag behavior, `scripts/build-site.mjs`, static code path and distribution files; build and inspect desktop/narrow routes and public output target state. | Safety and accepted-result identity are mandatory floors; build and rendering are dependency-sensitive. | Browser evidence does not establish student accessibility beyond inspected widths or all browsers. |
| C4 | Inspect exact Candidate docs and check them against HL, TS and current North Star. | Documentation is a VALUE-selected path and must not overstate acceptance or release. | Roman's direct acceptance is not yet recorded. |
| C5 | Re-run approved literal 19-path `git diff --name-status --find-renames=50% -z` and `--numstat -z` for Baseline/Candidate; inspect all changed-path identities and TS approval ref. | Accounting authority and Candidate identity are explicit gates; reported figures are readily reproducible. | Preserve any path-specific binary N/A; do not substitute working-tree diff. |
| C6–C7 | Validate current full seven-field spine and dispatch, no contradictory task transition, no owner acceptance claim; resolve this unit's exact economics binding from available native task metadata or record an attributable pre-extraction gap in REVIEW. | Human authority, independent identity and truthful trace are mandatory, not sampleable. | The exact rollout locator/session metadata may be unavailable; that gap cannot be represented as zero usage. |

## Deviations from TS

RF reports AC-1–AC-3 and executor-owned AC-4 documentation evidence as complete; it explicitly defers independent Review, Roman's acceptance and final task economics. Those are reserved downstream gates, not execution deviations. No other deviation is alleged; Verify will establish whether the actual Candidate matches the claims.

## Checkpoint

**Self-check:**
- [x] Read RF §§1–5, approved TS AC/DoF, HL purpose/principles, ONB, routing/approval lineage and referenced research predecessors.
- [x] Mapped all material accepted claims and mandatory safety, owner-authority and Candidate-identity boundaries.
- [x] Bound each mapped claim to behavior/dependencies, environment, oracle and exact evidence identity.
- [x] Recorded replayable checks and known limits, including deferred owner acceptance and economics capture.
- [x] Did not classify by filename, discrepancy count or artifact volume.

Stage complete: YES
