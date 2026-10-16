# Challenge — «Выдерживает ли протокол попытку опровергнуть его?»
> **Mindset:** Критик. Проверяем достаточность и безопасную границу протокола по каждому H1/H2.
> Parent: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md)
> Goal: Подготовить понятный локальный каркас OOPoman, в котором студент видит маршрут курса и сохраняемый прогресс в профиле Chrome без регистрации и входа.
> Producer unit: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> Parent Coordinator: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> Activation / selection: owner-direct `/tfw-research OOP_20261015-164702_WEB`; `reporting: native-gates`, `dialogue: tfw-gates-only`; Challenge разрешён Coordinator gate после revised Extract.
> Coordination authority: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> Iteration 2; focused; один проход.
> Extract under challenge: [3_extract.md](3_extract.md) @ `e63a6b39d30f08affab7bf8caea6ef6de166f26c`; the Coordinator authorized its one focused revision after the first Challenge checkpoint.

## Consistency Check

### Adversarial protocol checks

| Protocol claim | Counterexample | Result after revised Extract |
|---|---|---|
| Cold launch and restart offline demonstrate H1. | Warm cache, an already-open tab, or an empty DevTools log could hide a dependency. Logs start only while DevTools is recording and do not inventory local files. | The protocol now combines an empty profile, cache-disabled trace, actual source/package inventory, OS network-off launch and full Chrome restart. It says DevTools logs are supplementary, not proof alone; extension service-worker requests need their own context captured. Adequate protocol for the planned bounded prototype, although no result was run. |
| Same-profile restart demonstrates H2 persistence. | A second profile, changed extension identity, unflushed write or in-memory tab restoration could mimic persistence. | The same dedicated profile, stable paths/extension ID, completed UI readback before full process exit, and fresh UI/storage read after restart address those confounds. Actual behavior remains unknown until executed. |
| Cancel and Confirm establish the requested reset boundary. | Checking only the page appearance misses a handler that leaves storage unchanged or deletes unrelated fields. A single storage key may contain progress and non-progress fields. | Revised criterion checks state: Cancel leaves progress and unrelated sentinel unchanged; Confirm resets progress while unrelated state remains. It permits deleting selected records, updating a shared value, or clearing an exclusively progress-owned store. No particular API call is required. This matches the frozen in-app progress reset requirement. |
| File URL grant is required for C4/C6 PDF navigation. | Chrome docs require a manual grant when the extension needs to run on file URLs; Tabs API docs say most tab creation/navigation features do not require permission, and do not explicitly resolve navigation from an extension page to a local PDF. | Revised protocol tries user-directed PDF navigation with the grant off first. It enables the minimum grant and repeats only if the intended UI needs extension execution/read access on the file page. Grant-off alone is not failure. This removes the earlier false-fail condition while correctly leaving actual PDF behavior open. |
| The grant confines extension access to `OOP-course/`. | A user-facing file URL toggle is not documented as a directory picker; match patterns and actual file operation are distinct. | Revised protocol records the grant, manifest match patterns and exact PDF path separately, and makes no folder-sandbox claim. Any actual scope/privacy consequence remains for Coordinator/product review if the candidate is later pursued. |
| Each C1–C6 result can be called pass or fail. | Profile policies, inaccessible inspector, denied permission, or unexplained viewer behavior may prevent a decisive observation. | `INCONCLUSIVE` is retained and the protocol asks for Chrome version/channel, managed-policy status and evidence by criterion. This is safer than inferring results. |

### Surviving configurations

| Config | Challenge disposition | Remaining falsification condition |
|---|---|---|
| C1 — file page + localStorage + relative PDFs | Survives as a prototype candidate. | Target Chrome may deny or fail file-origin storage; offline resources and PDF path are untested. |
| C2 — file page + IndexedDB + relative PDFs | Survives as a prototype candidate. | Target Chrome file-origin persistence is untested; reset must preserve unrelated records, including when progress DB is dedicated. |
| C3 — unpacked extension + `chrome.storage.local` + package PDF copies | Survives as a prototype candidate. | Actual offline launch, storage integration, reset and packaged PDF UI remain untested. |
| C4 — unpacked extension + `chrome.storage.local` + PDFs in `OOP-course/` | Survives conditionally as a prototype candidate. | User-directed navigation and extension operation on the PDF are separate scenarios; the needed file URL grant and PDF viewer outcome are unknown. |
| C5 — extension + Web Storage/IndexedDB + package PDF copies | Survives as separate LS and IDB test subcases. | Context accessibility, persistence and reset are untested; current Chrome docs differ only on behavior after browsing-data clearing, outside the required restart case. |
| C6 — extension + Web Storage/IndexedDB + PDFs in `OOP-course/` | Survives conditionally as separate LS and IDB subcases. | Same storage checks as C5 plus the two distinct PDF navigation/access scenarios; grant requirements remain unknown. |

No candidate is ruled out by the sources. Conditional implementation failure criteria remain: a required resource is network-only; persistence is absent after a complete offline restart; Cancel mutates progress; Confirm leaves progress or changes unrelated state; or the intended PDF experience fails with the setup it actually requires. No such behavior has been observed in OOPoman.

## Findings

### F1 — H1 evidence is sufficiently guarded for a future prototype run

The revised protocol prevents the strongest false positive: a successful warm/cached page cannot alone pass. It requires both an actual package/source inventory and a cold offline route plus full restart. DevTools Network has useful cache/offline/log features, but its capture window makes a blank HAR insufficient. A local-file list, runtime log and visible route outcome must be read together. This defines a bounded, auditable observation without treating documentation as execution.

### F2 — H2 reset is now judged by the user-visible contract

The revised protocol tests saved progress after a full browser restart in the same profile, then checks Cancel and Confirm against the state before each action. It does not force a storage API implementation. A sentinel outside progress shows the reset stays within its contract; an isolated progress-only database may be cleared, while mixed state must preserve non-progress values. This is a meaningful and feasible test boundary for localStorage, IndexedDB and `chrome.storage.local`.

### F3 — C4/C6 permission is conditional, not presumed

Official Chrome sources establish a manual file URL grant when an extension must run on local file pages. The tabs API documentation does not conclusively answer if a user-directed navigation to a PDF requires this setting. The revised two-path protocol captures that uncertainty and avoids both over-requesting permission and incorrectly rejecting the candidate. Documentation also does not prove file discovery or the PDF viewing experience.

### F4 — protocol sufficiency is not product proof

The pending iteration’s goal is to prepare a bounded protocol and check current platform restrictions, not to build or execute the app. The revised Extract meets that goal across all six configurations with repeatable preconditions, observable outcomes and evidence fields. H1 and H2 remain empirically untested; that should become implementation acceptance/proof work in the next authorized phase, not a reason to claim either PASS here.

## OODA — focused pass 1/1, post-adjustment review

- **Observe:** re-read the Coordinator-authorized revised Extract @ `e63a6b39d30f08affab7bf8caea6ef6de166f26c`; compared its corrected reset and PDF criteria with the official Chrome DevTools, extension permission/Tabs and storage sources cited below.
- **Orient:** the two identified false classifications are removed. Network/profile evidence is composite; reset is outcome-based; PDF grant is conditional on extension access, not assumed for navigation.
- **Decide:** retain C1–C6 and the distinct C5/C6 storage subcases. Recommend synthesis: iteration 2 has answered its assigned research question by producing a challenge-tested protocol. Actual H1/H2 outcomes still await a prototype.
- **Act:** return the final Challenge checkpoint. No code, prototype or Chrome test was run.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Revised protocol is sufficiently specific and safe for a later bounded prototype test: cache/network, same-profile restart, progress persistence, Cancel/Confirm and PDF path each have distinct conditions. No config is eliminated by documentation alone. | Target Windows/Chrome build, actual package/resource inventory and every runtime result remain unknown until the prototype test. C4/C6's required grant depends on whether the UI only navigates or operates on the file page. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Pairwise protocol challenge completed? Surviving configurations listed?

Stage complete: YES
→ Coordinator decision: proceed to synthesis for iteration 2, or request one focused challenge adjustment.

## Sources

- [Chrome DevTools: Network features reference](https://developer.chrome.com/docs/devtools/network/reference) — checked 2026-10-16; cache disable, offline simulation, capture-window limits and sanitized HAR.
- [Chrome: Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) — checked 2026-10-16; manual file URL grant when extension must run on local files.
- [Chrome: Match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns) — checked 2026-10-16; `file:///` local file matching and manual grant.
- [Chrome: Tabs API](https://developer.chrome.com/docs/extensions/reference/api/tabs) — checked 2026-10-16; most tab creation/navigation features do not need permissions; file URL navigation-specific result remains undocumented here.
- [Chrome DevTools: View and edit extension storage](https://developer.chrome.com/docs/devtools/storage/extensionstorage) — checked 2026-10-16; extension storage inspector available from Chrome 132; selected values can be inspected/deleted, so use read-only for verification.
- [Chrome: Debug extensions](https://developer.chrome.com/docs/extensions/get-started/tutorial/debug) — checked 2026-10-16; service-worker context is separately inspected and open DevTools can keep a worker active.
- [Chrome: `chrome.storage` API](https://developer.chrome.com/docs/extensions/reference/api/storage) — checked 2026-10-16; machine-local storage, selected `remove()` versus broad `clear()`.
- [W3C Indexed Database API 3.0](https://w3c.github.io/IndexedDB/) — checked 2026-10-16; selected-record deletion versus database deletion.
- [Chrome: Extension pages CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) — checked 2026-10-16; minimum extension-page code/resource constraints.
