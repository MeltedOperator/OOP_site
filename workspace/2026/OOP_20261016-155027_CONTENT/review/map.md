# Map — OOP_20261016-155027_CONTENT

> **Mindset:** Experienced newcomer. Understand the accepted result before judging it.
> RF: [RF](../RF__OOP_20261016-155027_CONTENT.md)
> TS: [TS](../TS__OOP_20261016-155027_CONTENT.md)

## Understanding

CONTENT adds week-one lecture and lab pages, interactive quiz/checklist scoring, locally saved completion, and progress display to the OOPoman shell. Its purpose is to make the first week a usable local learning route while preserving the closed later modules, the supplied source material, and the no-account/no-server boundary. The central acceptance risks are content fidelity and usability, scoring and saved state, module access, and whether the evidence actually covers the accepted Candidate in Chrome.

## Accepted Claims and Boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE / ASSURANCE | Six distinct first-week lecture/lab routes exist and weeks 2–3 remain closed. | Missing or bypassable routes expose incomplete course material. | `course/index.html`, `app.js`, `data.js`, six aliases. | Local static site, direct and in-app routes. | TS AC-1; frozen HL §3/§5; `modules[].available`. | Candidate `bcef1322ab7dfac7180a4a087aec70004f881c5f`; EV E1. | yes |
| C2 | VALUE / ASSURANCE | Lessons and labs contain source-faithful, usable material designed for 60 minutes. | Learners may be taught incorrect concepts or silently lose required work. | `data.js`, rendered lesson/lab pages, six canonical PDFs. | Student reading and task-following context. | TS AC-2; source PDFs; owner gate for suburban multiplier. | Candidate; EV E2; gate answer `035edbab55d9a01831b3311ef24e6656a033b47d`. | yes |
| C3 | VALUE / ASSURANCE | Each quiz has four choices and one supported key; score is 20 per correct answer and checked peer item, with per-lab maximum. | Wrong or opaque score misleads learners and peer reviewers. | `data.js`, scoring/rendering in `app.js`. | Actual browser controls and displayed score. | TS AC-3; owner-approved HL/TS. | Candidate; EV E2/E3. | yes |
| C4 | VALUE / ASSURANCE | Completion requires all quiz answers and explicit peer confirmation; answers, checklist, score and status persist locally, including migration from `started`; reset stays scoped. | Lost work or false completion undermines trust and progress. | `app.js`, `storage.js`, progress/reset views. | Chrome profile, reload/reopen/reset. | TS AC-4; approved storage contract. | Candidate; EV E3/E4. | yes |
| C5 | VALUE / ASSURANCE | The app remains local, does not execute code or network-grade, and controls remain accessible by keyboard with clear labels. | Privacy boundary breach, unsafe code execution or unusable assessment. | App scripts, route dependencies and interactive controls. | Offline Chrome; keyboard and ordinary user flow. | TS AC-5; North Star boundaries; frozen HL §7. | Candidate; EV E1/E5; RF changed-file list. | yes |
| C6 | TRACE | Human authority, Candidate identity, scope and accounting are valid; continuation returns to the recorded Coordinator. | Wrong result accepted or work routed without authority. | Status/journal, approved HL/TS, Candidate, RF/EV, review route. | Git objects and native Codex task route. | Status spine, HL/TS approval, accounting contract and conventions. | Baseline `c78b440318310761569df8a2feaffdc3b1ae8ed0`; Candidate above; Reviewer task `01a14512-e044-7713-a656-c2399dfa72c7`; Coordinator `01a143a1-8242-7fd3-943b-8293c09bf58a`. | yes |

## TS ↔ RF Alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-1: six routes and locked modules | RF §3; EV E1 | C1 | ⚠️ partial: static contract only; real browser boundary not observed |
| AC-2: source fidelity and 60-minute material | RF §§1–3; EV E2 | C2 | ⚠️ partial: structural checks only; human semantic review and real browser reading not established |
| AC-3: quiz, checklist and score | RF §§3–5; EV E2/E3 | C3 | ⚠️ partial: synthetic checks; interactive browser calculation not observed |
| AC-4: completion and local state | RF §§3–5; EV E3/E4 | C4 | ⚠️ partial: schema/synthetic checks; Chrome profile lifecycle not observed |
| AC-5: boundaries and accessibility | RF §§3–5; EV E1/E5 | C5 | ⚠️ partial: source checks only; offline mouse/keyboard flow not observed |
| TS §4 accounting | RF §1; EV E-accounting | C6 | ✅ RF supplies complete authority, scope and reproduction basis |

## Verification Selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1, C5 | Inspect actual route guard, availability data, aliases, network/code execution references, and EV; inspect Candidate file list. | Safety, module boundary and direct-entry claims are mandatory. | No permitted real-browser route; no interactive/keyboard observation. |
| C2, C3 | Inspect lesson/lab data, durations, questions/keys/criteria and authority gate; compare cited sources where accessible. | Instructional correctness and scoring affect learning and assessment. | EV's structural checks do not establish every claim's semantic correctness or browser presentation. |
| C4 | Inspect storage migration, completion guards, reset scope and E3/E4 observations. | Persistence and completion are core accepted behaviors. | Synthetic harness does not establish Chrome profile, reload, reset or UI behavior. |
| C6 | Validate status/selection/authority lineage and replay exact NUL-safe accounting on Baseline/Candidate with `course/**`. | Mandatory authority, accepted-result identity and immutable denominator floors. | Foreign working-tree changes exist; exclude by exact selector and preserve. |

## Deviations from TS

No out-of-scope VALUE files are declared. RF §6 records `course/README.md` as an out-of-scope stale description; this is not in the approved selector and does not itself alter acceptance. The TS-required real Chrome evidence is unaddressed, and the EV accurately records it as blocked rather than verified.

## Checkpoint

**Self-check:**
- [x] Read RF §§1–5, governing TS AC/DoF, HL purpose/principles, ONB and referenced predecessors.
- [x] Mapped material claims and mandatory safety/security, authority and result-identity boundaries.
- [x] Bound claims to behavior, environment, oracle and evidence identity.
- [x] Recorded a replayable verification selection and limits.
- [x] Avoided classifying by filename, discrepancy count or artifact volume.

Stage complete: YES
