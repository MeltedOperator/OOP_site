# Map — "What must be true?"

> **Mindset:** Experienced newcomer. Understand the accepted result before judging it.
> RF: [RF](../RF__OOP_20261015-164702_WEB.md)
> TS: [TS](../TS__OOP_20261015-164702_WEB.md)

## Understanding

The Candidate at `63d1783617095ffea8e5b4c4b2846b90137b5c65` delivers a local OOPoman course shell with three modules, Week 1 open, Weeks 2–3 locked, empty Week 1 pages, and Chrome-profile progress with a scoped reset. Its purpose is to give a second-year student a clear next step while preserving Roman's release control and avoiding accounts, a project backend, invented lessons, grading, or changes to source PDFs. The approved TS is `fb61402fe86ff1220af818260789b6bd89ea8674`; EV records four ACs as VERIFIED by a mix of source inspection and owner-reported observations, and AC-5 as DEFERRED because UML parse/render was unavailable.

## Accepted Claims and Boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE / ASSURANCE | Three ordered modules map lectures/labs 01–09 correctly; only Week 1 is enterable. | Wrong grouping misleads learners; unintended access overrides course-owner release. | `course/data.js`, route parsing and locked-module rendering. | Local `course/index.html`; owner-reported Chrome environment. | TS AC-1; frozen HL §1/§3/§7; Roman controls later-week release. | Candidate `63d1783`; RF AC-1; EV E1; gate answer `20261016-103918__gate_answer__3a91.md`. | yes |
| C2 | VALUE / ASSURANCE | Week 1 has empty theory/practice shells; opening a lab marks it started, not complete, and awards no points. | Invented content, grading, or completion would misrepresent course progress and exceed scope. | `course/app.js`, `course/data.js`; lab-state write through storage. | Local page and browser storage. | TS AC-2; frozen HL §1/§3/§5/§7. | Candidate `63d1783`; RF AC-2; EV E2; same owner gate answer. | yes |
| C3 | VALUE / ASSURANCE / SAFETY | Progress shows all nine labs and three modules; Cancel preserves state; Confirm removes only `oopoman.progress.v1`. | Lost learner progress or deletion of unrelated profile data. | `course/app.js`, `course/storage.js`; browser `localStorage`; native dialog behavior. | Roman's local Chrome profile; policy unknown. | TS AC-3 and P5; frozen HL §1/§3; owner-reported manual outcome. | Candidate `63d1783`; RF AC-3; EV E3; gate answer `20261016-104930__gate_answer__5a1e.md`. | yes |
| C4 | VALUE / ASSURANCE | Site starts offline in Chrome and progress survives same-profile restart, without server, database, login, registration, or deployment. | A learner cannot use the shell offline or loses progress between sessions; hidden service/auth dependency violates the local boundary. | Static HTML/CSS/JS assets, `localStorage`, page launch behavior. | Windows 10, Chrome 155.0.8059.84, Roman's local profile; profile policy UNKNOWN; owner-attested. | TS AC-4 and P1; frozen HL §1/§3/§5/§7; owner authority for observations. | Candidate `63d1783`; RF AC-4; EV E4; gate answers `20261016-104115`, `104930`, `105436`, `105556`, `105657`. | yes |
| C5 | VALUE / ASSURANCE | Source PDFs remain unchanged and context UML accurately reflects the delivered structure. | Source loss or misleading architecture can corrupt course materials or future design decisions. | `OOP-course/**/*.pdf` (read-only); `architecture/context.puml`. | Repository source tree and Candidate. | TS AC-5, M1 and P3; frozen HL §1/§3/§7. | Candidate `63d1783`; RF AC-5; EV E5; PDF manifest comparison reported, UML manually inspected; PlantUML parse/render DEFERRED. | yes |
| C6 | TRACE / AUTHORITY | Owner-approved TS, Candidate, baseline, selector, and pre-execution denominator identify the accepted subject; Reviewer remains independent and returns only to the recorded Coordinator. | Wrong revision or unauthorised acceptance can invalidate every product conclusion. | Status/journal spine, TS approval ref, RF accounting, Candidate reachability, Reviewer gate. | Current task state and immutable Git objects. | `status.md`; owner-approved TS; transition `20261016-110042__transition__1c93.md`; Coordinator gate answer `20261016-105657__gate_answer__462a.md`. | Task status `RF`; baseline `8479d6a`; Candidate `63d1783`; TS `fb61402`; route `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`. | yes |
| C7 | TRACE / ASSURANCE | RF/EV claims must be reproducible to the specified Candidate and evidence source; unknowns and deferred checks stay explicit. | An unsupported claim may be treated as verified, or a missing required artifact may be mistaken for evidence. | RF §§1–5, EV E1–E5/accounting, ONB and cited gate answers, actual Candidate files, PDF source set. | Exact Git objects and owner-reported Chrome environment. | TS evidence clauses; TFW review criteria; cited source records. | EV `evidence/EV__OOP_20261015-164702_WEB.md`; RF `RF__OOP_20261015-164702_WEB.md`; Candidate `63d1783`. | yes |

## TS ↔ RF Alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-1: week grouping/order and lock behavior | RF §3 AC-1; EV E1 | C1 | ✅ |
| AC-2: empty Week 1 shells and started-only labs | RF §3 AC-2; EV E2 | C2 | ✅ |
| AC-3: module/lab progress and scoped reset | RF §3 AC-3; EV E3 | C3 | ✅ |
| AC-4: offline Chrome operation and same-profile persistence | RF §3 AC-4; EV E4 | C4 | ✅ |
| AC-5: PDF path/hash integrity and accurate UML | RF §3 AC-5; EV E5 | C5 | ⚠️ PDF comparison and manual UML inspection reported; required parsed/rendered UML evidence is deferred. |
| Accounting: approved selector, baseline/Candidate, denominator and triggers | RF §1 accounting; EV E-accounting | C6, C7 | ✅ claimed; independently recompute in Verify. |
| DoF: no backend/auth, unauthorized release, false completion/grading, source changes, or unauthorized overrun | RF §§2–4 and EV | C1–C6 | ⚠️ Verify actual files and evidence against each relevant boundary. |

## Verification Selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1–C2 | Inspect all Candidate route, module mapping, empty-state and lab-state source; compare with AC-1/2 and frozen HL. Reuse EV E1/E2 owner reports only at their attested level. | Core learner route and progress semantics; source can independently establish mapping/guards, but not full browser behavior. | No captured target-profile browser session; no new test run planned. |
| C3–C4 | Inspect storage key, write/reset paths, dialog close handler and static dependency/network use; audit EV citations and owner reports against exact TS observations. | Destructive reset and persistence are mandatory learner-data boundaries; owner has direct authority for manual observations. | No browser capture; profile policy unknown; observations are owner-attested. |
| C5 | Recompute approved Candidate accounting and inspect exact UML and PDF evidence. Check whether the 38-file before/after comparison is retained/replayable and whether TS's required parsed/rendered UML evidence exists. | Immutable source materials and architecture accuracy are explicit acceptance boundaries. | UML parse/render is deferred; reported PDF manifest was removed, so its identity and replayability need verification. |
| C6 | Resolve status/journal gate, approved TS and Candidate objects; compare RF's full VALUE selector and NUL-safe logical/numeric diff to the approved method. | Accepted-result identity, human authority, and accounting authority are mandatory floors. | Reviewer source binding may be unavailable; record as own TRACE gap at durable return if unresolved. |
| C7 | Audit every EV row against RF §5, source files and cited gate records; scan PV priorities 0–4 fully and relevant 5–7; check HL §7.2 citation links, semantics, currentness and relevance. | Evidence quality and purpose alignment govern the review verdict. | Owner-reported behavior remains an attestation, not a captured browser observation. |

## Deviations from TS

No product-scope deviation is claimed in RF. AC-5's required UML parse/render evidence is explicitly DEFERRED; this is an unresolved evidence status, not by itself a finding or waiver. RF reports an out-of-scope observation that PDF names are not clickable; TS does not require opening PDFs in the site.

## Checkpoint

**Self-check:**
- [x] Read RF §§1–5, governing TS AC/DoF, HL purpose/principles, ONB and referenced predecessors.
- [x] Mapped every material accepted claim and the mandatory safety/security, authority and result-identity boundaries.
- [x] Bound each claim to affected behavior/dependencies, environment, oracle/authority and exact evidence identity.
- [x] Recorded a replayable verification selection and every known gap or limit.
- [x] Avoided classifying by filename, discrepancy count or artifact volume.

Stage complete: YES

## Bounded Round 2 Map — Rung 1 AC-5 return

The same Candidate `63d1783617095ffea8e5b4c4b2846b90137b5c65` is returned in RF at `46a4277128d6bccdfda65443511851ac1c737eb7`; no product, TS, or Candidate change is claimed. Reuse C1–C4 and the authority/identity boundaries above. Reopen C5 only: AC-5 requires unchanged source PDFs and an accurate, parsed/rendered context UML. New evidence identities are RF §12 and EV E7/E9, produced for the Coordinator-ratified Rung 1 proof epoch; the old pre-work manifest remains absent.

| Claim | Updated selection | Why | Limit |
|---|---|---|---|
| C5 / AC-5 | Compare retained before/after manifests against each other and current source; bind the UML input blob to Candidate; inspect the retained render and verify the official tool identity/hash. | This directly addresses both proof obligations that caused F1, without expanding scope or repeating unaffected ACs. | Current comparison is for the authorized Rung 1 epoch; it does not recreate historical pre-work evidence. |

No TS deviation or Candidate movement. The exact AC-5 oracle remains approved TS AC-5 and its read-only PDF/UML boundaries. Mandatory safety, human authority, and Candidate identity checks remain inherited from this same review's unchanged result.

**Round 2 self-check:**
- [x] Re-read returned RF §§1–5 and bounded §12, approved TS AC-5, Coordinator ruling, EV and predecessor REVIEW.
- [x] Mapped the changed evidence claim and rechecked mandatory authority/result identity.
- [x] Bound checks to fixed Candidate, source files and authorized proof epoch.
- [x] Recorded the historical-manifest and owner-attestation limits.
- [x] Selected verification by AC-5 risk and evidence gap, not artifact count.

Stage complete: YES
