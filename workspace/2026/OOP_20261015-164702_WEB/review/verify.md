# Verify — "Do the material claims hold?"

> **Mindset:** Auditor. RF is a declaration, not a fact. Open files, run necessary checks, compare
> accepted claims with reality, and state the limits.
> Map: [map.md](map.md)

## Selection Argument

| Claim IDs | Risk / criticality | Affected behavior / dependencies | Environment | Oracle / authority | Evidence gap / limit | Selected verification and why |
|---|---|---|---|---|---|---|
| C1–C2 | Core learner route, course grouping, and false completion would directly mislead students. | Module arrays, query routing, lock guard, empty pages and lab-start write. | Fixed Candidate; owner-attested Windows/Chrome results. | TS AC-1/2; frozen HL. | No captured browser session; source inspection cannot establish rendered behavior. | Inspect exact Candidate source and reuse EV E1/E2 with their owner-attestation limit. |
| C3 | Destructive reset and learner state are high consequence. | Dialog return value, close handler and storage key. | Roman's local Chrome profile; policy unknown. | TS AC-3; owner manual report. | No captured before/after browser state. | Inspect exact reset path and compare with the cited Cancel/Confirm and sentinel report. |
| C4 | Offline availability and persistence are mandatory product boundaries. | Local assets, local storage, no server/auth/network dependencies. | Windows 10; Chrome 155.0.8059.84; Roman's local profile; policy UNKNOWN. | TS AC-4; owner manual report. | Reviewer cannot reproduce the target profile in this environment. | Inspect all loaded resources and storage flow; audit all cited owner reports and preserve their evidence level. |
| C5 | PDF integrity is a frozen source boundary; UML is the delivered context record. | The complete source PDF set and Candidate UML. | Source tree and Candidate `63d1783`. | TS AC-5 and M1; owner-approved TS. | EV retains only a summary of the PDF comparison; UML parse/render is explicitly DEFERRED. | Check the exact Candidate diff, EV attachment content, source set availability, and UML source. Required proof is not inferred from a count or manual note. |
| C6–C7 | Human acceptance authority, immutable result identity, and accounting are mandatory floors. | Task status/journal, approval object, Candidate, RF/EV and producer lineage. | Immutable Git objects plus current task records. | `status.md`; TS approval; Coordinator gate; review workflow. | Candidate was produced in a separate worktree and is not the parent of the current review commit; compare the product tree directly. | Resolve refs, check TS approval ancestry, compare Candidate selector with current checkout, replay exact NUL-safe accounting. |

## Verification Log

### V1: C1–C2 — route, grouping and activity states at Candidate `63d1783617095ffea8e5b4c4b2846b90137b5c65`
- **Accepted claim / authority:** TS AC-1/2; frozen HL §1, §3 and §7.
- **Subject tuple:** OOPoman Candidate `63d1783`; local static HTML/CSS/JS; Chrome is the intended environment; TS and owner are the oracle.
- **Action or evidence:** Opened Candidate `course/index.html`, `course/data.js`, and `course/app.js` with `git show`. Confirmed local-only script/style/icon references; three modules are generated from nine numbered lecture and nine lab names in three-item slices; only module 1 is available; route handling returns a locked page for unavailable modules, including direct query routes. Empty theory/practice content is labelled; lab open writes only `started`; there is no completion or grading path.
- **Observed:** The source expresses the approved grouping and guards, and aligns with EV E1/E2's owner-reported point-by-point result.
- **Limit:** Source inspection and the owner's attestation do not provide an independent captured render. No test or browser session was run by this Reviewer.
- **Result:** HOLDS, with the stated evidence limit.

### V2: C3 — progress and scoped reset at Candidate `63d1783`
- **Accepted claim / authority:** TS AC-3 and frozen HL §1/§3.
- **Subject tuple:** `course/app.js` + `course/storage.js` at Candidate `63d1783`; local Chrome profile; TS AC-3 and owner report.
- **Action or evidence:** Inspected the progress rendering, dialog form values, `close` handler and `resetProgress()`. The only removal call is `localStorage.removeItem("oopoman.progress.v1")`, reached only when `returnValue === "confirm"`; Cancel does not call storage mutation. EV E3 cites Roman's direct report for preservation of progress on Cancel and preservation of an unrelated sentinel on Confirm.
- **Observed:** Static code and the cited manual report agree with the scoped-reset contract.
- **Limit:** The actual profile state was not captured for this review; EV explicitly labels the result owner-attested.
- **Result:** HOLDS at the recorded attestation level.

### V3: C4 — local operation and persistence at Candidate `63d1783`
- **Accepted claim / authority:** TS AC-4 and frozen HL §1/§3/§7.
- **Subject tuple:** Candidate HTML/CSS/JS and `localStorage` flow; Windows 10 / Chrome 155.0.8059.84 / Roman's local profile (policy unknown); TS and owner reports.
- **Action or evidence:** Inspected `course/index.html`, `course/README.md`, and the app/storage modules. The page loads only relative local assets and makes no remote/API request; storage is profile-local. Audited EV E4's linked gate answers for offline launch, restart and same-profile recovery.
- **Observed:** EV records the required observations as Roman's direct reports; no backend, account or deployment dependency appears in the Candidate source.
- **Limit:** No target-profile replay or capture is available to this Reviewer. Profile policy remains unknown. This is not treated as independent browser execution.
- **Result:** HOLDS at the owner-attested level recorded in EV.

### V4: C5 — source PDFs and UML
- **Accepted claim / authority:** TS AC-5 and M1; frozen HL §1/§3/§7.
- **Subject tuple:** Candidate `63d1783`, `architecture/context.puml`, and the task's 38-PDF source set; TS and Roman are the authority.
- **Action or evidence:** Inspected the exact UML blob and the Candidate's complete VALUE path list. No `OOP-course/` path is in the Candidate. Read EV E5 and RF §3/§5: EV reports 38 matching path/hash/size pairs and zero mismatches, but the before/after manifest is described as temporary and removed; it is not attached or retained in the task. EV/RF state that the UML was manually compared, while PlantUML parse/render was not run and AC-5 is DEFERRED.
- **Observed:** The UML source describes the delivered local route, locked weeks, empty pages, profile storage, scoped removal, read-only PDF source and absence of grading/code execution. The required parsed/rendered check is absent. The PDF comparison result is asserted but its required path/hash/size comparison artifact is unavailable for independent inspection. The baseline Git tree contains no `OOP-course/` paths, so Git history cannot replace the missing manifest.
- **Limit:** The missing manifest and parser/render result cannot be reconstructed as historical evidence from current files. No PDF modification is indicated by the Candidate diff; that does not prove the TS-required before/after hash comparison.
- **Result:** FINDING — required AC-5 assurance is incomplete; Candidate unchanged.

### V5: C6–C7 — authority, Candidate identity and accounting
- **Accepted claim / authority:** Approved TS, Candidate rule, and status/journal spine.
- **Subject tuple:** TS approval `fb61402fe86ff1220af818260789b6bd89ea8674`; baseline `8479d6ad27f025749402d49c64d64a3c8ac1f652`; Candidate `63d1783617095ffea8e5b4c4b2846b90137b5c65`; current task `RF`.
- **Action or evidence:** Confirmed the TS approval object exists and is an ancestor of Candidate; confirmed the cited coordination-authority object exists. Read the latest owner gate answer and `ONB → RF` transition: the Coordinator expressly returned this RF for independent review with AC-5 DEFERRED. Compared Candidate's `course/` and `architecture/context.puml` tree against current review HEAD; they are identical. Replayed both approved Git commands with literal selector `course architecture/context.puml` and `--find-renames=50% -z`.
- **Observed:** 8 logical VALUE files: `course/README.md` CREATE, `course/app.js` CREATE, `course/assets/mark.svg` CREATE, `course/data.js` CREATE, `course/index.html` CREATE, `course/storage.js` CREATE, `course/styles.css` CREATE, `architecture/context.puml` MODIFY. No selector deviation or binary file. Numeric result: 654 additions + 10 deletions = 664 touched text LOC; no 50-file/5,000-LOC prompt or 16-file/2,000-LOC owner ceiling reached. Candidate identity is unchanged by the later integration and this review commit.
- **Limit:** The target Chrome profile is not available to this Reviewer. Effective model/effort for the Executor was not observed, as RF states.
- **Result:** HOLDS for authority, identity and accounting.

### V6: C7 — Project Values, currentness and purpose references
- **Accepted claim / authority:** HL §7.2, ONB §7, NorthStar and TFW Project Values index.
- **Subject tuple:** Current task HL/ONB citations, their exact linked sources and the approved task contract.
- **Action or evidence:** Scanned PV P0–P4 and relevant P5–P7. Confirmed `knowledge/philosophy.md` is absent as declared; `KNOWLEDGE.md` §1 says no architecture decisions are recorded; relevant knowledge records/legacy topic files are absent. Checked TFW README NS1, NS2, Methodology values and Success Criteria separately. Checked `.tfw/conventions.md` HL Contract and confirmed the current HL diff touches free sections only; frozen sections are unchanged. Confirmed links to RES iterations and stage files resolve. Opened the primary-source Chrome and WHATWG links cited by RES-1: Chrome documents local unpacked extension loading, the storage API and permission/CSP constraints; WHATWG pages resolve to the Web Storage and URL standards. The research records consistently state these are platform facts, not proof of OOPoman behavior.
- **Observed:** HL/ONB P1–P4 citations match the sources and their stated use. NorthStar purpose, audience, local boundary and success statements support this task. Its Open decisions still list progress persistence as undecided, while the owner decision in `TRACE.md` (2026-10-15) and approved HL/TS settle Chrome-profile progress persistence and scoped reset. This stale sentence does not make the current task authority ambiguous because the frozen HL/approved TS and owner trace resolve it; it is a non-blocking project-reference observation for this review.
- **Limit:** NorthStar has not yet been synchronized to that later owner decision. The external citations establish platform documentation only, not runtime behavior.
- **Result:** HOLDS for this Candidate's purpose and controlling authority; retain the stale NorthStar sentence as a non-material TRACE observation.

## Commands Executed

| # | Command | Claim IDs | Result |
|---|---|---|---|
| 1 | `git diff --name-status --find-renames=50% -z 8479d6ad27f025749402d49c64d64a3c8ac1f652 63d1783617095ffea8e5b4c4b2846b90137b5c65 -- course architecture/context.puml` | C6 | Exit 0; exact eight paths listed above. |
| 2 | `git diff --numstat --find-renames=50% -z 8479d6ad27f025749402d49c64d64a3c8ac1f652 63d1783617095ffea8e5b4c4b2846b90137b5c65 -- course architecture/context.puml` | C6 | Exit 0; 654 added, 10 deleted. |
| 3 | `git diff --exit-code 63d1783617095ffea8e5b4c4b2846b90137b5c65 971974f3474613f47c184ebbaf9e992db874ff50 -- course architecture/context.puml` | C6 | Exit 0; product selector unchanged in integration/review tree. |
| 4 | `git merge-base --is-ancestor fb61402fe86ff1220af818260789b6bd89ea8674 63d1783617095ffea8e5b4c4b2846b90137b5c65` | C6 | Exit 0; approved TS precedes Candidate. |
| 5 | Candidate source/citation inspection via `git show`, `git grep`, exact task records, and official Chrome/WHATWG pages | C1–C7 | Candidate files and cited records were opened. Search found no added TODO/legacy/old/temp channel comments; no tests or browser run by this Reviewer. |

## Claim and Source Checks

| # | Claim / citation | Where | Primary artifact / source | Holds? |
|---|---|---|---|---|
| 1 | Three-week purpose, local learner experience, boundaries and success | HL §7.2 P0; ONB §7 #1 | [NorthStar.md](../../../NorthStar.md), Purpose / Learner experience / Product boundaries / Success | ⚠️ Current task claims align. Open decisions still call progress persistence undecided, superseded for this scope by `TRACE.md` and approved HL/TS. |
| 2 | Purposeful, human-governed continuation | HL P1 NS1; ONB #2 | [.tfw/README.md](../../../.tfw/README.md#ns1--purpose) | ✅ Relevant and semantically matched. |
| 3 | Candor, explicit uncertainty, bounded roles and proportional assurance | HL P1 NS2; ONB #3 | [.tfw/README.md](../../../.tfw/README.md#ns2--principles) | ✅ Relevant; EV preserves attestation/deferred limits. |
| 4 | No separate project philosophy exists | HL P2; ONB #4 | `knowledge/philosophy.md` | ✅ Absent as declared; no applicable item. |
| 5 | No approved architecture decisions are registered | HL P3; ONB #5 | [KNOWLEDGE.md](../../../KNOWLEDGE.md#1-architecture-map), §1 | ✅ Exists and matches; UML remains a context diagram, not a selected stack. |
| 6 | Frozen HL claims change only through authorized amendment | HL P4; ONB #6 | [.tfw/conventions.md](../../../.tfw/conventions.md#hl-contract) | ✅ Exists and matches; inspected current diff changes free sections only. |
| 7 | Local extension loading, storage, file permission/CSP, Web Storage and URL-origin context | HL RES-1 | [Chrome local extension guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world), [Chrome storage API](https://developer.chrome.com/docs/extensions/reference/api/storage), [Chrome permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions), [Chrome CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy), [WHATWG Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute), [WHATWG URL](https://url.spec.whatwg.org/#origin) | ✅ Official pages resolve and support the stated platform topics; RES explicitly does not claim app behavior. |
| 8 | RES-2 is a future validation protocol, not product proof | HL RES-2; ONB #8 | `research/iter2/RES.md`, `research/iter2/1_briefing.md`–`4_challenge.md` | ✅ Files resolve and consistently leave runtime outcomes open until the Candidate test. |

## Guard and Check Admission

| # | Kind | Protected behavior / invariant | Failure consequence | Counterfactual detection | Admission |
|---|---|---|---|---|---|
| G1 | Positive control | JavaScript syntax parses for the three application files. | Syntax errors can prevent code loading. | RF reports `node --check` passed; this catches syntax errors only and does not show whether the route, storage or reset contract fails. | labelled control; not a permanent behavior guard |
| G2 | Governance assertion | Candidate accounting stays within the immutable approved selector/denominator. | Unauthorized scope/size could exceed owner approval. | Independent NUL-safe diff replay confirms this particular Candidate is within the plan; it does not detect product behavior faults. | governance only; not a product guard |
| G3 | No permanent product guard evidenced | No automated regression suite or relevant negative control is reported. | A future regression in route locks or scoped reset may go undetected. | No test, mutant, fault or fixture evidence is in RF/EV. | no guard admitted |

## Candidate Findings

| ID | Class | Subject | Affected claim / authority | Observed fact + oracle | Concrete harm | Material consequence or named absence | Owner | Observable completion | Route / rung | Candidate effect | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 | ASSURANCE | EV E5 and the AC-5 evidence package for Candidate `63d1783` | TS AC-5: source PDF integrity and accurate UML | EV reports a 38-file path/hash/size comparison, but the manifest was deleted and is not attached; EV/RF also mark the required UML parse/render as DEFERRED. TS AC-5 requires the manifest comparison and parsed/rendered UML check. | A source-file change or a malformed/misleading diagram could escape independent acceptance review. | Required AC-5 assurance is incomplete; RF cannot support KNW/owner acceptance on this evidence. | Task Coordinator, returning to Roman for any acceptance-contract ruling. | Preserve Candidate and provide a retained, inspectable 38-file before/after path/hash/size comparison plus parsed/rendered UML evidence against the delivered structure; if an alternative is proposed, obtain the exact owner-authorized TS disposition before acceptance. | ASSURANCE-only; exact Coordinator route/rung to be set at Decide from the REVISE route. | unchanged | open |

## Evidence Verification

| # | EV row | Subject tuple | Repeated or opened? | Establishes the claim? | Limit |
|---|---|---|---|---|---|
| E1 | E1 / AC-1 | Candidate `63d1783`; local page; Chrome result owner-reported | Opened Candidate mapping/route; read cited gate answer | ✅ At owner-attested level | No browser capture or independent render. |
| E2 | E2 / AC-2 | Candidate `63d1783`; local page; Chrome result owner-reported | Opened empty-page/lab code; read cited gate answer | ✅ At owner-attested level | No browser capture. |
| E3 | E3 / AC-3 | Candidate `63d1783`; Roman's local profile | Opened reset and storage code; read cited gate answer | ✅ At owner-attested level | No captured state values; EV states attestation. |
| E4 | E4 / AC-4 | Candidate `63d1783`; Windows 10 / Chrome 155.0.8059.84 / Roman's local profile | Opened local resource/storage code; read four gate answers | ✅ At owner-attested level | Policy unknown; no capture; no Reviewer replay. |
| E5 | E5 / AC-5 | Candidate `63d1783`; 38 source PDFs and context UML | Opened EV/RF and UML source | ⚠️ Does not establish the complete AC-5 evidence contract | Manifest not retained; parse/render deferred. |
| E-accounting | E-accounting | Baseline `8479d6a`; Candidate `63d1783`; selector fixed by approved TS | Independently replayed exact diff | ✅ | No binary VALUE files; no scope deviation. |

## Knowledge Citations Verified

Scan result: P0–P4 fully; relevant P5–P7 have no source files or records. Priority 0 purpose and priority 1 methodology were checked separately. No knowledge record or legacy row contributes additional project architecture or human-sourced facts.

| # | Artifact | Priority + exact citation | Resolves? | Item exists? | Meaning matches? | Relevant? |
|---|---|---|---|---|---|---|
| 1 | HL §7.2 / ONB §7 #1 | P0 NorthStar Purpose, Learner experience, Product boundaries, Success | ✅ | ✅ | ⚠️ Persistence open-decision line is stale; task authority resolves it. | ✅ |
| 2 | HL §7.2 / ONB §7 #2–3 | P1 TFW README NS1, NS2 | ✅ | ✅ | ✅ | ✅ |
| 3 | HL §7.2 / ONB §7 #4 | P2 `knowledge/philosophy.md` | ✅ absent | N/A | ✅ declared absent | N/A |
| 4 | HL §7.2 / ONB §7 #5 | P3 KNOWLEDGE.md §1 Architecture Map | ✅ | ✅ | ✅ | ✅ |
| 5 | HL §7.2 / ONB §7 #6 | P4 conventions HL Contract | ✅ | ✅ | ✅ | ✅ |
| 6 | HL §7.2 / ONB §7 #7 | RES-1 official Chrome/WHATWG primary sources | ✅ | ✅ | ✅; platform facts are separated from product behavior | ✅ |
| 7 | HL §7.2 / ONB §7 #8 | RES-2 RES and four stage records | ✅ | ✅ | ✅; protocol is explicitly prospective | ✅ |

## Accounting Replay

| Approval / authority | Baseline | Candidate | Literal VALUE membership / actions / classes / reasons | Adds | Deletes | Touched LOC | Binary | Trigger disposition | Exact NUL-safe command | Verdict |
|---|---|---|---|---:|---:|---:|---|---|---|---|
| Roman-approved TS `fb61402fe86ff1220af818260789b6bd89ea8674`, before execution | `8479d6ad27f025749402d49c64d64a3c8ac1f652` | `63d1783617095ffea8e5b4c4b2846b90137b5c65` | `course/README.md` CREATE VALUE; `course/app.js` CREATE VALUE; `course/assets/mark.svg` CREATE VALUE; `course/data.js` CREATE VALUE; `course/index.html` CREATE VALUE; `course/storage.js` CREATE VALUE; `course/styles.css` CREATE VALUE; `architecture/context.puml` MODIFY VALUE. No PDF or other path in selector. | 654 | 10 | 664 | N/A; selected files are text | 8 files and 664 LOC are below approved 8-file / 1,000-LOC plan and 16-file / 2,000-LOC owner ceiling; no 50-file / 5,000-LOC prompt. | `git diff --name-status --find-renames=50% -z 8479d6ad27f025749402d49c64d64a3c8ac1f652 63d1783617095ffea8e5b4c4b2846b90137b5c65 -- course architecture/context.puml`; same with `--numstat` | VERIFIED |

## Selected Knowledge Evidence

| Source / epoch | Producer / unit | Scope | Authority / applicability |
|---|---|---|---|
| WEB RES iterations 1–2 and all four stage files, task-local; linked from HL §7.2 and ONB §7 | Researcher `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`; parent Coordinator `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b` | Browser platform documentation and a prospective, challenged H1/H2 test protocol; no product execution | Owner-direct research route. It establishes protocol and platform limits only, not Candidate behavior. No Fact Candidates. |
| WEB RF/EV and handover | Executor `codex:thread:local:01a1430e-7204-7513-ad00-191e8b7785b4`; parent Coordinator `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b` | Fixed Candidate `63d1783`, owner-attested AC-1–4, AC-5 limits and accounting | Owner-direct Executor handoff; fixed accepted subject. No Fact Candidates; the PDF manifest gap remains explicit. |

## Checkpoint

**Self-check:**
- [x] Replayed the Map selection and verified all mandatory safety/security, authority and identity floors.
- [x] Established evidence applicability and ran/reused all checks available to this Reviewer; the unavailable retained artifacts and target profile are explicit.
- [x] Recorded explicit limits instead of substituting file, discrepancy, test, commit or artifact counts.
- [x] Classified guards and controls by protected behavior, consequence and counterfactual detection.
- [x] Recorded the candidate finding with observed fact, harm, consequence, owner, completion condition, route stage and Candidate effect.
- [x] Verified RF AC claims, evidence references, citations and immutable accounting against actual artifacts.

Stage complete: YES
