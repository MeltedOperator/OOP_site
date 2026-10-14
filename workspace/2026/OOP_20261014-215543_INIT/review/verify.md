# Verify — Do the material claims hold?

> **Map:** [map.md](map.md)

## Selection Argument

| Claim IDs | Risk / criticality | Affected behavior / dependencies | Environment | Oracle / authority | Evidence gap / limit | Selected verification and why |
|---|---|---|---|---|---|---|
| C1 | High: setup and command routing carry all later work. | Version/config, root Codex instruction, eleven skill copies. | Current Windows checkout; no product runtime. | Owner-approved INIT scope and installed TFW files. | Parity does not prove all eleven routes execute; only the current review route was exercised by this task. | Independently compare version values, all source/receiver hashes, managed instruction block, and route inventory. |
| C2 | High: owner purpose and boundaries guide future phases. | North Star, trace, README, context diagram, frozen HL. | Current checkout and owner-authored records. | `TRACE.md`, `NorthStar.md`, and HL frozen contract. | The initial context diagram is not implementation architecture. | Open the linked artifacts and compare scope and owner decisions. |
| C3 | Medium: research informs the next planning task. | Two RES iterations and their cited owner authority. | Bounded Chrome/offline research; no application runtime. | HL research mandate and owner TRACE. | No end-to-end Chrome test; unresolved issues are correctly handed forward. | Check RES lineage, iteration status, conclusions and limits; spot-check critical technical claims against primary sources. |
| C4 | High: owner-provided course material must remain the source. | 38 PDFs in root `OOP-course/`. | Current checkout; files are untracked. | Owner TRACE and current file inventory. | Git has no committed/hash baseline for the PDFs, so the claim that bytes were unchanged by INIT is not independently reproducible. | Count the current PDFs and reconcile tracking status; retain the integrity limit explicitly. |
| C5, C7 | Mandatory: no unapproved product, code-execution, deployment, or release decision. | Current file tree, RF changes, North Star and frozen HL reservations. | Current checkout; no app runtime. | HL §§3–6, 8–9; TRACE. | This review cannot prove absence of external actions. | Inspect the reported paths and current tree for scope, prohibited implementations and owner-reserved decisions. |
| C6 | Mandatory: authority, accepted-result identity and continuation. | Current status, approved HL epoch, selection event, dispatch, RF/EV, Git history. | Active native Reviewer task in the existing checkout. | `status.md`, owner A1, selection event, dispatch and `coordinator_route`. | Dispatch file is present but untracked; native task identity and committed selection/authority independently resolve the active Reviewer. Reviewer has no status-write permission. | Match the active task address to the dispatch, verify authority refs and route, and state lifecycle-effect boundary. |

## Verification Log

### V1 — C1: Framework version, config, and Codex adapter
- **Accepted claim / authority:** TFW Full v3.9.2 and the selected Codex setup are present and consistent under the approved INIT scope.
- **Subject tuple:** OOPoman checkout after the INIT result commit `f2330920e8b16b291f46a123ff7d4bc77c6d5c5f`; review observation at `fc265457a081c2388a6242adb6cff2fe4ade7b04`; Windows; owner Roman and frozen HL at `e7042eccb159e228f8e19c042735979ccb993732`; config/adapter tree present.
- **Action or evidence:** Read `.tfw/VERSION` and `.tfw/project_config.yaml`; independently SHA-256 compared every `SKILL.md` under `.tfw/adapters/codex/skills/` to its `.agents/skills/` receiver; compared the managed AGENTS block with `.tfw/adapters/codex/AGENTS.md.template`; counted adapter skill directories.
- **Observed:** Both version values are `3.9.2`; the project is `OOPoman`, language `ru`, task prefix `OOP`; 11 source and 11 receiver skill directories were present with 0 hash mismatches; the managed instruction block is byte-for-byte equal to the template block. `tfw-review` is usable in this live review.
- **Limit:** These checks establish declared version and byte parity, not authenticity against a published release source or live behavior of all eleven routes. Config sets `installed_from: "unrecorded"`; the adapter evidence itself already discloses that it does not establish live command execution. The current review confirms only its own route.
- **Result:** HOLDS.

### V2 — C2, C5, C7: Owner context, boundaries, and implementation scope
- **Accepted claim / authority:** The current project records preserve owner scope, keep later decisions reserved, and INIT did not create the site or make those choices.
- **Subject tuple:** INIT result at `f2330920e8b16b291f46a123ff7d4bc77c6d5c5f`; current checkout; Windows; `TRACE.md`, `NorthStar.md`, frozen HL and current file tree.
- **Action or evidence:** Opened root `README.md`, `NorthStar.md`, `TRACE.md`, HL §§3–10, RF §§1–3, and `architecture/context.puml`; checked root file inventory and current Git status. The README routes to the method, project knowledge, release workflow, INIT status, and `OOP-course/`. No application runtime, build manifest, site, extension, test suite, server, database, authentication, deployment, or assessment implementation is present. RF/HL keep safety, persistence, score split, exam and week-release decisions open or owner-controlled.
- **Observed:** North Star and TRACE agree on the local-first three-week OOP course, the 500-point categories, no OOPoman accounts/backend/deployment, owner-sourced content, and Roman's control of later-week release. The context diagram exists and is labelled an initial context view, not an implementation architecture. The only current untracked project inputs are the owner course PDFs; the review Map is the only new tracked review artifact.
- **Limit:** Repository inspection cannot prove that no external action occurred. No app-level behavior exists to test and no product runtime was selected.
- **Result:** HOLDS.

### V3 — C3: Research handover and unresolved choices
- **Accepted claim / authority:** Two bounded iterations provide an inspectable handover without representing a research possibility as an owner-approved design.
- **Subject tuple:** `research/iter1/RES.md` and `research/iter2/RES.md` at the INIT result; Researcher `codex:thread:local:01a13b5e-61b2-7df3-93b1-3dcc6579acb9`; owner-directed browser/offline requirements in TRACE; no implementation environment.
- **Action or evidence:** Read both RES contexts, decisions, open questions, findings, recommendations, conclusions and handovers. Confirmed iteration 1 and 2 identify their parent Coordinator, bounded authority and dispatch; iteration 2 states 2 of 2 minimum iterations and leaves exact origin behavior, cold offline loading, runner safety/resource limits, syllabus authority and three-week mapping unresolved. Independently opened current primary-source documentation for Chrome File System Access, Pyodide NativeFS, Pyodide workers and the WHATWG iframe sandbox.
- **Observed:** The research claims are qualified. Chrome documents directory selection through a secure-context/user-gesture API; Pyodide documents mounting a selected Chrome directory using `mountNativeFS()` and labels the mechanism experimental. Pyodide's worker documentation describes a separate thread/global context for keeping work off the UI thread; it does not claim adversarial-code isolation or hard CPU/memory caps. WHATWG warns about the `allow-scripts` plus `allow-same-origin` combination for same-origin sandboxed frames. These sources support the RES limits, not a selected solution. The research does not report an end-to-end browser experiment, and the RF does not claim one.
- **Limit:** The spot-check does not re-review every external source or all 38 PDFs. The RES itself says only selected documents/PDFs were inspected. No safety, runtime, persistence, course mapping, or scoring decision is established.
- **Result:** HOLDS.

### V4 — C4: Current course-source inventory and integrity boundary
- **Accepted claim / authority:** The owner-supplied course source is present in root `OOP-course/` and was not transformed as part of INIT.
- **Subject tuple:** Current working-tree course directory after INIT; owner TRACE says Roman supplied the materials; current checkout has no product source or course-import code.
- **Action or evidence:** Recursively counted current PDF files and inspected `git ls-files` / untracked inventory for `OOP-course/`.
- **Observed:** 38 PDFs are present in the three expected source folders; 0 are tracked and all 38 are untracked. TRACE records Roman's supply of the files, while RES/RF state they were inspected as source material and not edited or converted. No application or conversion code exists in the accepted result.
- **Limit:** Because every PDF is untracked and no before-state hash manifest or owner inventory is committed, Git status/diff cannot independently prove byte-for-byte non-modification by INIT. Current presence/location and owner provenance hold; historical integrity rests on the task participants' direct observation, not reproducible before/after evidence.
- **Result:** HOLDS with an explicit non-blocking integrity limit; see observation O2.

### V5 — C6: Evidence applicability and authorized routing
- **Accepted claim / authority:** RF/EV refer to this result; the Reviewer is independently activated and must return to the existing Coordinator.
- **Subject tuple:** Approved HL commit `e7042eccb159e228f8e19c042735979ccb993732`; committed selection event `d5c8ee439b63d954a250bf3d2b17bd3e0fae4d38`; current task status; RF/EV commit `f2330920e8b16b291f46a123ff7d4bc77c6d5c5f`; active Reviewer task address `codex:thread:local:01a13bc9-8f8a-71d3-a5fd-eac9bd360003`.
- **Action or evidence:** Verified both authority commits exist; read current `status.md`, owner A1 in the frozen HL, committed selection event, and the current dispatch. Compared the dispatch destination with this task and `coordinator_route` with the parent Coordinator `codex:thread:local:01a13b48-ed98-7631-85cb-e7691c6a01b3`. `reporting: native-gates`, `dialogue: tfw-gates-only`, and `selection_ref` are complete and consistent. The current task can directly address that Coordinator and can wait/read back; capability does not supply state-write permission.
- **Observed:** The owner-authorized role is exactly one Reviewer for the fixed RF/EV, with this task's actual address and parent; the active task came from that Coordinator and its first message exactly named the command and task. The dispatch file is untracked, but its destination matches the active native task and the committed owner selection/status authority. No competing route is present. Current lifecycle is `REV`.
- **Limit:** The dispatch text is not itself committed. The native task identity and committed status/authority selection resolve this run without relying on a principal or title. Dispatch explicitly prohibits the Reviewer from editing `status.md`; the review can issue its verdict but the Coordinator must apply the authorized `KNW` state/journal effect after return.
- **Result:** HOLDS for review activation and identity; lifecycle effect remains the Coordinator's authorized act.

### V6 — Evidence format and repository checks
- **Accepted claim / authority:** The RF's evidence points to real artifacts and its formatting result applies to the authored setup commit.
- **Subject tuple:** EV and RF as committed at `f2330920e8b16b291f46a123ff7d4bc77c6d5c5f`; no application runtime; current checked-in project files.
- **Action or evidence:** Repeated E1–E4 using direct reads, SHA-256 parity, managed-block comparison, and `git check-ignore -v .user_preferences.md`; verified E5 against the config/tree; ran `git show --check f233092` for the setup/RF commit.
- **Observed:** E1–E4 hold for the claims they test; `.user_preferences.md` is ignored by root `.gitignore`; E5 is correctly N/A; the setup commit has no whitespace errors. E6's 38-file inventory holds, but its unchanged-by-INIT subclaim is limited as stated in V4. EV E7 is a formatting check, not application assurance. No application build or test was run or required by INIT.
- **Limit:** The historical adapter repeat-copy action was not repeated because it would write files and adds no independent assurance; current byte parity was read-only verified. `git show --check` verifies committed formatting, not product behavior.
- **Result:** HOLDS for applicable claims; E6 remains a visible integrity limitation.

## Commands Executed

| # | Command / inspection | Claim IDs | Result |
|---|---|---|---|
| 1 | Read `.tfw/VERSION` and `.tfw/project_config.yaml`; PowerShell `Get-FileHash -Algorithm SHA256` for 11 source/receiver pairs | C1 | 3.9.2/3.9.2; 11 pairs, 0 mismatches. |
| 2 | Managed-block extraction/comparison against `.tfw/adapters/codex/AGENTS.md.template`; `git check-ignore -v .user_preferences.md` | C1, C6 | Block equality; local preference path ignored by `.gitignore`. |
| 3 | `Get-ChildItem OOP-course -File -Recurse -Filter '*.pdf'`; `git ls-files -- OOP-course`; `git ls-files --others --exclude-standard -- OOP-course` | C4 | 38 PDFs; 0 tracked; 38 untracked. |
| 4 | `git cat-file -e` for HL/selection commits; `git status --short --untracked-files=no`; `git show --check f233092` | C5, C6 | Referenced authorities exist; no tracked setup changes remain; setup commit formatting check clean. |
| 5 | Opened project artifacts and primary source pages; inspected current file tree | C2, C3, C5, C7 | No app/runtime or prohibited product decision; selected research claims are suitably qualified. |

No app build, tests, or test files were added; the accepted INIT has no application or runtime.

## Claim and Source Checks

| # | Claim / citation | Where | Primary artifact / source | Holds? |
|---|---|---|---|---|
| 1 | Chrome directory access requires a user-selected directory and secure-context/user-gesture handling. | Iteration 2 RES F1 | [Chrome File System Access API](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access) | ✅ |
| 2 | Pyodide documents Chrome `mountNativeFS()` for a user-selected directory and labels NativeFS experimental. | Iteration 2 RES F1 | [Pyodide accessing files](https://pyodide.org/en/stable/usage/accessing-files.html) | ✅ |
| 3 | Pyodide worker documentation supports off-UI-thread execution, not an adversarial-code security or hard resource-limit conclusion. | Iteration 2 RES F4 | [Pyodide web workers](https://pyodide.org/en/stable/usage/webworker.html) | ✅ |
| 4 | The HTML sandbox flags are not by themselves a complete arbitrary-code safety design; same-origin `allow-scripts` plus `allow-same-origin` is specifically unsafe. | Iteration 1 RES F3; iteration 2 RES F4 | [WHATWG HTML Standard, iframe sandbox](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox) | ✅ |
| 5 | Project purpose and product constraints match the approved owner record. | HL §7.2 P0; README | [NorthStar.md](../../../NorthStar.md), [TRACE.md](../../../TRACE.md) | ✅ |

The deliverable contains claims, citations and owner data; none are N/A. The source spot-check supports the qualified research handover only; it does not establish a working browser design.

## Guard and Check Admission

| # | Kind | Protected behavior / invariant | Failure consequence | Counterfactual detection | Admission |
|---|---|---|---|---|---|
| G1 | One-time version/hash comparison | Installed version labels agree and selected adapter copies match their declared source. | Wrong copied command files or version drift. | Direct mismatch would be observable in current comparison; no negative control or live command matrix was run. | Positive control / one-time setup evidence, not a permanent product guard. |
| G2 | Formatting check | Whitespace correctness of the setup commit. | Review noise or formatting defect. | `git show --check` detects whitespace errors in that commit. | Temporary/commit diagnostic, not a product-quality guard. |
| G3 | App tests | No application invariant exists in INIT. | Not applicable. | No application/runtime exists. | N/A; no permanent product guard demonstrated. |

## Candidate Findings

No material VALUE, ASSURANCE or TRACE finding changes INIT acceptance or its next authorized act. The following non-material trace observations remain visible for disposition in REVIEW.

| ID | Class | Subject | Affected claim / authority | Observed fact + oracle | Concrete harm | Material consequence or named absence | Owner | Observable completion | Route / rung | Candidate effect | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| O1 | TRACE | Master HL currentness | C2; HL §2 and its `Status` header | HL §2 still says no course files have been added and says Roman will provide them; current TRACE, README, RES and RF record 38 supplied PDFs. The HL header still says research is in progress, while `status.md` is `REV`. | A later reader could follow a stale current-state statement or mistake the HL header for live lifecycle state. | No product acceptance or review route changes: current status is authoritative and current sources preserve the supplied-file fact; record-only reconciliation is due in the Coordinator's KNW/documents step. | Coordinator | Update the free HL current-state facts/header or record an explicit retain-only reason before the next planning task. | `tfw-docs` at existing INIT close route. | unchanged | observation |
| O2 | TRACE | Historical integrity of owner course files | C4; owner-preservation boundary | All 38 PDFs are untracked, so Git has no before/after content baseline; current inventory and owner TRACE establish presence/provenance, while RF/RES report no transformation. | A future user cannot reproduce a byte-level claim that files were unchanged during INIT from Git evidence. | No current acceptance/next-action change: all source PDFs are present, owner provenance is recorded, and INIT has no course transformation or app import. Preserve this as an evidence limit. | Coordinator | If byte-level preservation is required later, establish an owner-approved baseline before modifying/importing sources; no retroactive proof is asserted here. | Current REVIEW observation; later task-local source boundary. | unchanged | observation |
| O3 | TRACE | Reviewer stage sequencing | Review procedure and independent judgment | The Map gate committed before the two referenced RES predecessors were opened; the Map self-check marked the predecessor read complete prematurely. The final REVIEW template was also opened during Map instead of its Decide gate. | Early template access and late predecessor reading weaken the staged read contract and could bias or omit claim selection. | No acceptance or next-act change: RES1/RES2 were read and checked in Verify before Judge; every mapped claim and mandatory floor remained covered. Disclose the sequencing deviation in REVIEW. | Reviewer | Record the actual sequence and its bounded effect in this REVIEW; no product rerun is indicated. | Current REVIEW observation. | unchanged | observation |

## Evidence Verification

| # | EV row | Subject tuple | Repeated or opened? | Establishes the claim? | Limit |
|---|---|---|---|---|---|
| E1 | Version/config agreement | `.tfw/VERSION` + `tfw.version` in config at INIT result | ✅ Re-read | ✅ Declared version values agree at 3.9.2. | Does not authenticate upstream source bytes. |
| E2 | Codex adapter parity | 11 selected source/receiver skill pairs in current checkout | ✅ Recomputed SHA-256 | ✅ Current files are byte-equal. | Does not prove all routes execute; no repeat copy performed in review. |
| E3 | Root instruction block | `AGENTS.md` and adapter template at current checkout | ✅ Recompared managed region | ✅ Exactly one pair of markers and equal managed block. | Does not prove all adapter semantics at runtime. |
| E4 | Local preference privacy | `.user_preferences.md` and root `.gitignore` | ✅ `git check-ignore` | ✅ Path is ignored. | Does not expose or validate private preference contents; not needed. |
| E5 | Runtime commands | Project config and root file tree | ✅ Opened | ✅ N/A is correct: no runtime/build system exists. | No app tests are possible or required. |
| E6 | Course source presence and non-modification | Current root `OOP-course/`, owner TRACE and Git inventory | ✅ Counted/status inspected | ⚠️ Presence and location verified; provenance supported by owner trace. | All 38 files are untracked; no prior hash manifest exists to independently verify historical byte identity. |
| E7 | Formatting | INIT result commit `f233092` | ✅ `git show --check` | ✅ Clean formatting of the committed change. | Formatting is not app assurance. |

EV's total `6 VERIFIED / 1 N/A` is not accepted as a single quality score. E1–E5 and E7 hold for their stated scope; E6 is split between verified inventory/provenance and an explicit non-reproducible historical-integrity subclaim.

## Knowledge Citations Verified

| # | Artifact | Priority + exact citation | Resolves? | Item exists? | Meaning matches? | Relevant? |
|---|---|---|---|---|---|---|
| 1 | HL §7.2 | P0 — `NorthStar.md`: Purpose, Learner experience, Assessment contract, Product boundaries, Success | ✅ | ✅ | ✅ HL accurately identifies the owner product ruler and its boundary clauses. | ✅ Governs accepted purpose and INIT scope. |
| 2 | HL §7.2 | P1 — `.tfw/README.md`: NS1 Purpose | ✅ | ✅ | ✅ Human-governed, inspectable continuity and purpose. | ✅ Governs traceable setup. |
| 3 | HL §7.2 | P1 — `.tfw/README.md`: NS2 Principles | ✅ | ✅ | ✅ Includes selected trace, bounded human authority, continuation and proportional assurance. | ✅ Relevant to role/owner boundary and evidence. |
| 4 | HL §7.2 | P1 — `.tfw/README.md`: Success Criteria | ✅ | ✅ | ✅ Resumable checkpoint, traceable decisions, qualified knowledge and acceptance readiness. | ✅ Relevant to INIT handover. |
| 5 | HL §7.2 | P2 — `knowledge/philosophy.md`: marked absent | ✅ absent | N/A | ✅ The cited absence is true. | ✅ No separate validated philosophy is needed for INIT. |
| 6 | HL §7.2 | P3 — `KNOWLEDGE.md` §1 Architecture Map: no decisions recorded | ✅ | ✅ | ✅ Current file says no components/architecture decisions are recorded. | ✅ Prevents treating the context diagram as approved design. |
| 7 | HL §7.2 | P4 — `.tfw/conventions.md` HL Contract | ✅ | ✅ | ✅ Frozen/free HL boundaries and amendment rules match the cited use. | ✅ Governs this frozen contract and editable §2. |
| 8 | PV P4 | `.tfw/conventions.md` Design Rules; Anti-patterns (prohibited) | ✅ | ✅ | ✅ Progressive disclosure, exact-path discipline, and review/evidence requirements match this review. | ✅ Governs review behavior. |
| 9 | PV P5–P7 | Relevant project `knowledge/*.md` and `knowledge/records/` | ✅ no files present | N/A | No additional relevant project records exist. | ✅ No incoming successor/conflict chain to apply. |

PV priorities 0–4 were scanned in full at their cited items; priorities 5–7 had no relevant project knowledge records. `KNOWLEDGE.md` and conventions' Current knowledge use / Knowledge handover rules were applied; no research claim was promoted as a project fact.

## Accounting Replay

| Approval / authority | Baseline | Candidate | Literal VALUE membership / actions / classes / reasons | Adds | Deletes | Touched LOC | Binary | Trigger disposition | Exact NUL-safe command | Verdict |
|---|---|---|---|---:|---:|---:|---|---|---|---|
| Frozen INIT authority `e7042eccb159e228f8e19c042735979ccb993732`; no approved TS/VALUE selector | N/A | N/A — no application implementation Candidate | INIT setup/config/docs and research records are the task result; RF explicitly records no app VALUE selector or app changes | N/A | N/A | N/A | N/A | No TS accounting trigger exists; this is initialization, not a product implementation phase | N/A — no approved selector/baseline exists to replay without inventing one | N/A |

## Selected Knowledge Evidence

- Research iteration 1 and 2 are from the same directly addressed Researcher unit; their headers cite the two task-local dispatches, frozen master-HL authority and owner TRACE. Iteration 2 identifies iteration 1 as predecessor and does not claim a new product decision.
- Their findings and open issues are retained in the two RES artifacts; the RF handover points to both. No Fact Candidates were claimed, and no research statement was promoted into `KNOWLEDGE.md`.
- The Project Values citations are present and relevant as recorded above. No project technical decision record exists; the context diagram is an initial context view.
- The Reviewer is this separate native unit, authorized by owner amendment A1 and the committed selection event. The current unit's own source binding is unavailable; its pre-extraction disposition is recorded in the final REVIEW, not as measured zero or failed extraction.

## Checkpoint

**Self-check:**
- [x] Replayed the Map selection and verified all mandatory safety/security, authority and identity floors.
- [x] Established evidence applicability and ran the applicable checks; no TS-required app check exists.
- [x] Recorded explicit limits instead of substituting file, discrepancy, test, commit or artifact counts.
- [x] Classified setup checks and controls by actual protected behavior and detection scope; no permanent product guard is claimed.
- [x] Recorded both observations with their non-material consequence, owner, completion condition, route and unchanged Candidate effect.
- [x] Verified RF claims, EV references, PV citations and accounting applicability against actual artifacts.

Stage complete: YES
