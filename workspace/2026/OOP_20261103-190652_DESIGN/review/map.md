# Map — OOP_20261103-190652_DESIGN

## Understanding

Candidate `34fbcab3dab0590729789312fc15778ca5605977` updates the local OOPoman interface with progress, certificate gating, syntax markup, hints, visual accents and navigation. Its purpose is to make the existing local OOP course easier to read and complete while preserving course and exam rules. The task asks for visible rendered behavior; source changes and synthetic renderer checks do not by themselves establish that behavior in the intended browser.

## Accepted Claims and Boundaries

| ID | Layer | Accepted claim / authority boundary | Risk or concrete harm | Affected behavior / dependencies | Relevant environment | Oracle / authority | Evidence identity (`subject@revision`, source) | Required? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE / ASSURANCE | AC-1: JS/Python examples show readable categories, plain output/formula, correct escaping and non-color cues. | Learners cannot distinguish code structure or may mistake output for source. | `highlightCode`, language metadata, all lesson/lab examples and CSS backgrounds. | Local course, desktop and narrow viewport. | Approved TS AC-1; owner-reported observation; rendered page. | Candidate `34fbcab…`; EV E1; owner message 2026-11-04. | yes |
| C2 | VALUE / ASSURANCE | AC-2: course/module/lab/exam progress is separately labeled, accurate and visibly legible. | Student cannot tell completion or exam state. | `renderHome`, `renderProgress`, stored progress and `oopoman.exam.v1`. | Local browser profile; desktop and narrow viewport. | Approved TS AC-2; EV E2; owner-reported observation; rendered page. | Candidate `34fbcab…`; EV E2/E4. | yes |
| C3 | VALUE / ASSURANCE / SAFETY | AC-3: certificate downloads require all modules complete and a valid passed exam, with correct unchanged JPG. | Wrong or premature certificate, or no usable certificate after completing the course. | Course progress, accepted EXAM state predicate and name-to-file mapping. | Local browser and download destination. | Approved TS AC-3 and M1; accepted EXAM authority. | Candidate `34fbcab…`; EV E3; accepted EXAM Candidate `efee20a…`. | yes |
| C4 | VALUE / ASSURANCE | AC-4: visual language, button feedback, hint text, back-to-top and reduced-motion behavior work and are perceptible. | Interface changes do not help navigation or learner comprehension; motion may be inaccessible. | CSS geometry/accents, hover/focus states, hints, control behavior, media query. | Local browser; desktop, keyboard and narrow viewport; reduced-motion preference. | Approved TS AC-4; EV E4; owner-reported observation; rendered page. | Candidate `34fbcab…`; EV E4. | yes |
| C5 | TRACE / safety | Preserve accepted exam scoring/state and local-first course boundaries. | Invalid certificate eligibility or unapproved server/publishing behavior. | `course/exam.js`, accepted EXAM files, course storage and route scope. | Candidate source and local course. | Owner-approved TS §§2, 6; HL baseline and North Star. | TS `a27add…`; baseline `99e261…`; Candidate `34fbcab…`. | yes |
| C6 | TRACE | Candidate identity, approved selector, denominator and evidence must resolve. | Review could accept an unapproved or different result. | Git ancestry, exact changed paths, EV/RF and approved TS. | Git object history in this checkout. | TS §4/AC-7 and RF §§1, 5. | TS approval `a27add…`; Candidate `34fbcab…`; RF input commit `d9c11c7…`. | yes |

## TS ↔ RF Alignment

| TS requirement | RF claim | Claim IDs | Aligned? |
|---|---|---|---|
| AC-1 | RF §3; EV E1 | C1 | ⚠️ rendered comments and all-background contrast remain deferred |
| AC-2 | RF §3; EV E2 | C2 | ⚠️ synthetic calculations pass; owner reports progress bar not visible; view-specific rendered proof unavailable |
| AC-3 | RF §3; EV E3 | C3 | ⚠️ predicate/mapping/hash checks recorded; direct browser download deferred |
| AC-4 | RF §3; EV E4 | C4 | ⚠️ desktop claims recorded; narrow viewport, reduced-motion rendering and keyboard walkthrough deferred; owner reports visual effects not apparent |
| AC-5 | RF §3; EV E5 | C5 | ✅ only allowed-name string changed in exam logic |
| AC-6 | RF §3; EV E6 | C5 | ⚠️ local routes recorded; browser could not be reopened during this review |
| AC-7 | RF §1; EV E7/E-accounting | C6 | ✅ independently replayed below |

## Verification Selection

| Claim IDs | Planned check or reusable evidence | Why this depth | Known gap or limit |
|---|---|---|---|
| C1, C2, C4 | Inspect Candidate source, styles and EV; include owner's direct report as a separate but environment-unbound observation. | These are the task's primary learner-facing changes and the owner says they were not apparent. | Browser-rendered Candidate cannot be opened in the review environment; owner's URL, viewport and exact served revision are unknown. |
| C3, C5 | Inspect exact predicate, mapping, source diff and EV. | Certificate access and exam boundary are explicit safety/authority floors. | No direct successful download in a browser; synthetic renderer checks do not demonstrate browser download behavior. |
| C6 | Verify approval refs, ancestry and NUL-safe selector accounting. | Candidate identity and immutable denominator are acceptance conditions. | Review checkout contains RF at `d9c11c7…`; post-Candidate lifecycle artifacts are TRACE and not in Candidate. |

## Deviations from TS

No out-of-selector product paths. Required rendered observations remain incomplete as listed above. The owner reports that the progress bar, background treatment, button motion and code highlighting were not visible in the page they viewed. That report is not bound to a URL, viewport or Candidate, so it raises a material applicability/sufficiency gap without proving that this exact Candidate was served.

## Checkpoint

**Self-check:**
- [x] Read RF §§1–5, approved TS AC/DoF, HL purpose/principles, ONB and referenced predecessors?
- [x] Mapped material claims and mandatory safety/security, authority and result-identity boundaries?
- [x] Bound claims to behavior, dependencies, environment, oracle and evidence identity?
- [x] Recorded a replayable verification selection and known limits?
- [x] Avoided classifying by filename, discrepancy count or artifact volume?

Stage complete: YES

## Bounded follow-up — Candidate `84409143cf3397563c7ead2d82c135fb4ce1266e`

Coordinator ruling `REVIEW @ d787acd324ad926f205a38a694fcdeef97dabedd` and dispatch `journal/20261105-234342__dispatch__f712.md @ c6d1f75131e9c8e854c0df71503d9e0f04089306` bind this follow-up to RF/EV at `3390e759e55ebf718dd8e1be9d22cc47bf9539b6`. The candidate moved under the authorized correction to `course/app.js` and `course/styles.css`; the original code, background and progress concerns are therefore re-evaluated against this new subject. The browser is an unavailable source for this Reviewer at the owner's direction; I use only candidate-bound observations recorded in EV and do not claim a direct render.

The highest-risk remaining claims are the unobserved static-comment rendering and motion/responsive accessibility (AC-1/4), the eligible certificate browser download (AC-3/M1), and the explicitly required cleanup/reset of the temporary profile. Identity, exam predicate, course state calculations, asset bytes, and the approved selector remain mandatory boundaries. EV reports visible progress, code categories, background accents, keyboard focus and top-control behavior on the new candidate; it also records explicit limits for comments, narrow/reduced-motion/interaction timing, certificate download and cleanup.

| ID | Current claim / risk | Candidate-bound evidence and oracle | Follow-up judgment |
|---|---|---|---|
| C1-R2 | AC-1 code categories, static comments, plain formula/output | EV E1-R2; approved TS; Candidate `84409143…` | Main category cues are reported visible; comments in a static example and full contrast coverage remain unverified. |
| C2-R2 | AC-2 accurately labeled module/lab/exam progress and visible bar | EV E2-R2 plus unchanged state-counting evidence from EV E2; exact-source diff `34fbcab…..84409143…` | Desktop incomplete state has a labeled 16px ARIA progress bar; underlying counts/state logic did not change. F1's visibility gap is resolved. |
| C3-R2 | AC-3/M1 eligible browser download and exact asset | EV E3-R2–R4; owner gate and Coordinator ruling | Positive browser download/hash remains blocked; no eligibility bypass is authorized. |
| C4-R2 | AC-4/P5 visible feedback, narrow layout and reduced motion | EV E4-R2 and source diff | Background, focus and top control are reported visible/working; narrow viewport, reduced-motion rendering and hover/pressed timing remain unobserved. |
| C5-R2 | Owner-mandated temporary-profile cleanup | EV E3-R5; cleanup gate/dispatch | Last-known test-origin progress remains recorded; reset and empty-state confirmation are unavailable and owed before close. |

The old F1–F4 findings applied to Candidate `34fbcab…`; this bounded follow-up resolves the old progress-visibility item on the corrected subject and carries forward only unresolved claims. The user report about the earlier page remains revision-unbound historical context; it is not treated as a claim about Candidate `84409143…`.

Stage complete: YES — current subject and residual risks mapped; direct browser inspection was explicitly skipped as an unavailable source.

## Final bounded follow-up — Candidate `425621ac04691a74becda5387d5dff26faa7286f`

Current Coordinator dispatch `86152fe` directs final independent review of RF/EV `d33f405fde0d4fbd69bb6107a166da56868ed4c1` and the exact Candidate `425621ac04691a74becda5387d5dff26faa7286f`. The accepted two-rule CSS correction is candidate-bound by EV F3-R3; the prior EV F2-R2 rendering remains applicable because the correction does not touch code token or comment styles. The same accepted TS, baseline, exam boundary and owner-selected route remain governing.

EV now records normal-size visible static comments and plain fallback, corrected mobile content geometry and a visible hover transform on the current or unchanged-relevant Candidate. The owner’s later statement in live REVIEW §12 is treated as an explicit owner-authority acceptance source for the certificate and temporary-profile cleanup. It closes the acceptance/close disposition without claiming this Reviewer observed a download, file hash, or post-reset browser state. Remaining direct browser assertions are identified as unavailable to this Reviewer per owner direction.

| ID | Final material claim | Evidence/authority | Disposition |
|---|---|---|---|
| AC-1 | Readable categories, static comments, plain fallback | EV F2-R2 at Candidate `84409143…`; only two mobile grid declarations changed in Candidate `425621…` | Sufficient bounded sample; item paid. |
| AC-2 | Accurate visible progress | EV E2-R2 and unchanged progress calculations | Prior corrected-candidate judgment remains applicable; item paid. |
| AC-3/M1 | Conjunctive certificate acceptance | Earlier source/gate checks plus owner's explicit acceptance report in live REVIEW §12 | Owner accepts; no independent browser download/hash claimed. |
| AC-4/P5 | Responsive layout, interaction feedback and reduced motion | EV F3-R3 at Candidate `425621…`; exact CSS rules for `:active` and `prefers-reduced-motion` are unchanged from prior candidate | Corrected mobile overflow and hover are established; static active/reduced-motion rules inspected. Item paid under current owner acceptance. |
| Temporary profile cleanup | Explicit owner-required reset/close effect | Owner's current attestation in live REVIEW §12 | Owner accepts cleanup as sufficient source; no post-reset state observed by Reviewer. |

Direct browser inspection is skipped as an unavailable source at the owner's direction. No independent screenshots or browser state were generated in this Reviewer unit.

Stage complete: YES — candidate and current authority mapped; owner acceptance is distinguished from direct browser proof.
