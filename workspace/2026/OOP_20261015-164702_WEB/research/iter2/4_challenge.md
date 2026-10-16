# Challenge — «Где протокол ошибочно обещает pass или fail?»
> **Mindset:** Критик. Атакуем проверки и требуем доказательства для каждого вывода.
> Parent: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md)
> Goal: Подготовить понятный локальный каркас OOPoman, в котором студент видит маршрут курса и сохраняемый прогресс в профиле Chrome без регистрации и входа.
> Producer unit: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> Parent Coordinator: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> Activation / selection: owner-direct `/tfw-research OOP_20261015-164702_WEB`; `reporting: native-gates`, `dialogue: tfw-gates-only`; Challenge разрешён Coordinator gate после Extract.
> Coordination authority: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> Iteration 2; focused; один проход.
> Source protocol: [3_extract.md](3_extract.md) @ `2aea8989ac169f6b5f5e92370cc601f6eef1e67d`.

## Consistency Check

### Challenge of protocol claims

| Extract claim/check | Adversarial case | Challenge result / required boundary |
|---|---|---|
| A clean profile + Disable cache + Offline / OS network off demonstrates H1. | DevTools records only while open and only requests since recording began; an empty HAR cannot show a local file inventory. A DevTools Offline setting emulates page network conditions, while cache/service-worker behavior may still need inspection. | Composite is sufficient as a protocol only if every candidate has a pre-run source/package inventory and runtime traces from the entry and required route, plus cold launch and full Chrome restart with OS networking off. HAR is supplementary. Do not award H1 PASS from a quiet log alone. If an extension service worker initiates required requests, inspect its own context as well as the UI page. |
| Restart with the same profile demonstrates persistence. | An operator can accidentally launch a second Chrome profile or extension identity after restart; an app can show cached in-memory UI before a storage read. | The protocol’s separate profile per candidate is sound if the exact same profile/config is used before and after full process exit. Require a fresh UI read after relaunch, not a tab left open or restored bfcache state; retain a privacy-safe same-profile confirmation and extension ID. Wait for saved value to be read back before closing. |
| Cancel and Confirm prove safe reset using unrelated sentinels. | A test may only check screen appearance; a generic `clear()` may delete an unrelated key; a single JSON key may contain both progress and non-progress fields. | Test externally observable values after each action. Cancel preserves progress and sentinel. Confirm clears only progress values and preserves unrelated state; it need not use a particular API or remove a whole key if that key also stores unrelated fields. IndexedDB whole-database deletion is allowed only for a database exclusively owned by OOPoman progress. Keep key/value snapshots before and after. |
| C4/C6 require the file-URL grant; no grant means candidate failure. | Chrome documents the manual grant when an extension needs to run on `file://`. The Tabs API says creating tabs and navigating to URLs generally do not require permission, but does not settle navigation to a PDF `file://` URL from this extension page. A user click that simply opens a PDF in Chrome may differ from extension code reading/injecting on that file page. | **Focused protocol adjustment needed:** split C4/C6 PDF path into (a) user-initiated open/navigation with grant initially off, then (b) any extension access that operates on or reads the file with the grant enabled. Record the actual UI path, grant state, manifest match patterns and outcome. Do not fail navigation-only C4/C6 solely because the toggle was off; fail only if the intended PDF experience fails with the minimum documented configuration and required user grant. Documentation does not establish which path OOPoman needs. |
| Enabling file-URL access makes access to `OOP-course/` predictable. | The settings control is an extension-level permission, not a demonstrated directory picker or path sandbox; a match pattern may limit which URLs a content script runs on, but that does not prove filesystem discovery or PDF UX. | Report grant separately from path/content access. Inspect the manifest’s host/content-script patterns and disclose the user-facing permission. Do not claim the grant is restricted to the course folder unless an actual permission/path design establishes that. |
| C1–C6 all get a pass/fail from one profile run. | One candidate may be blocked by an unrelated profile policy, an unobservable storage API, or a failed PDF viewer action with no diagnostic. | Keep `INCONCLUSIVE` as a real outcome. Record Chrome version/channel and managed-policy status. When the storage read or navigation cannot be observed, classify that criterion as inconclusive, not failed or passed. This research has no target Chrome or prototype to run. |

### Surviving configurations

| Config | Challenge disposition | Outstanding falsification condition |
|---|---|---|
| C1 — file page + localStorage + relative PDFs | Survives as test candidate. | Chrome file-origin access/persistence, offline route and PDF path may fail in the actual profile. |
| C2 — file page + IndexedDB + relative PDFs | Survives as test candidate. | Same path-specific file-origin uncertainty; selective reset must avoid deleting non-progress records. |
| C3 — unpacked extension + `chrome.storage.local` + package PDF copies | Survives as test candidate. | First setup/offline route and actual save/reset integration remain untested; required extension scripts/objects must be packaged. |
| C4 — unpacked extension + `chrome.storage.local` + PDFs in `OOP-course/` | Survives conditionally; Extract currently overstates when the grant is required. | Distinguish simple user navigation from extension execution/read access on `file://`; test the exact intended UX with and without grant. |
| C5 — extension + Web Storage/IndexedDB + package PDF copies | Survives as separate LS and IDB subtests. | API context must be recorded; extension service workers cannot use localStorage. Actual persistence and reset remain untested; Chrome docs conflict only about clearing browsing data. |
| C6 — extension + Web Storage/IndexedDB + PDFs in `OOP-course/` | Survives conditionally; Extract currently overstates when the grant is required. | Separate LS/IDB and PDF user-navigation/access paths; perform actual PDF test with the least necessary grant. |

No candidate is eliminated by documentation alone. A manifest that requires a remote critical script would conflict with extension-page CSP; an offline test that needs a remote critical resource would fail H1. These are conditional implementation findings, not observed defects in OOPoman.

## Findings

### F1 — cache/network evidence is credible only as a bundle

The protocol protects against a warm HTTP cache by requiring an empty profile and DevTools cache disable, and against hidden network dependency by requiring offline cold start and restart. Chrome documents that Disable cache applies while DevTools is open, Offline is a Network throttling mode, logs are captured while DevTools is open, and only after recording starts. The inventory must therefore be checked against the actual prototype source/package as well as its runtime requests. A HAR cannot prove that local PDFs, fonts, or scripts exist at the expected paths; a source inventory cannot prove the app traversed those paths. For extension builds with network-capable service workers, include that context's own activity. These limits are already mostly addressed in Extract; make “empty/partial log = insufficient evidence” explicit.

### F2 — reset should be judged by state scope, not an API call

The Extract matrix protects progress and unrelated sentinels but sometimes says Confirm must call/remove only selected keys. That is too implementation-specific: progress may share an object with other state. The frozen requirement is an in-app reset of locally stored progress after confirmation. The pass criterion should be: after Confirm, all progress is reset and unrelated sentinels/state are unchanged; any key, object field, record or dedicated progress database may implement this. Cancel preserves both. Never use DevTools Delete/Clear to produce the reset result; inspect read-only after the UI action.

### F3 — file URL grant is not a folder-scoped test prerequisite

Chrome's permissions guide says users must grant file URL access if the extension needs to run on `file://`; match-pattern docs show `file:///` and require manual grant. Tabs API documentation separately notes that tab creation and URL navigation generally do not need permissions but does not explicitly resolve extension-page navigation to a local PDF. Thus the current C4/C6 table risks a false failure for simple navigation and a false claim about access scope. Extract should add the two-path test in the table and require recording the grant and manifest pattern only as applicable. Whether the grant is required for opening the actual PDF remains unknown until prototype execution.

### F4 — offline and persistence results remain empirical

Neither an official API reference nor the test protocol can prove that OOPoman works. Cold start requires no preloaded app cache; persistence requires the same profile and a new app-level read after every full browser exit; reset requires before/after storage values. C5/C6 remain two API subcases each. A Chrome profile policy, disabled permission, wrong extension ID, missing file, failed storage read or inaccessible PDF may make one observation inconclusive until the setup cause is isolated. No `PASS`/`FAIL` is recorded by this research.

## Protocol adjustment requested

**Request one focused adjustment before synthesis:** revise C4/C6 to distinguish (1) user-directed navigation/opening of a PDF in Chrome and (2) extension execution/read access to a `file://` page. Test the intended path with permission off first, then with the file URL grant if extension access is required; a missing grant alone is not a candidate failure. Also phrase the Confirm criterion as clearing progress state while preserving an unrelated sentinel, without requiring a specific key-level API call where progress shares a stored value. These changes make the protocol align with the actual frozen requirement and prevent false fail classifications.

## OODA — focused pass 1/1

- **Observe:** reviewed Extract adversarially against current official Chrome DevTools Network, extension permission/match-pattern and Tabs API documentation, plus the prior official storage, CSP and IndexedDB sources.
- **Orient:** cache evidence and same-profile persistence checks are adequate when treated as combined observations; reset must be outcome-based. Chrome documentation does not establish whether navigation-only PDF opening requires the file access toggle.
- **Decide:** preserve all six configs and all H1/H2 empirical gaps. Request a narrow Extract adjustment on C4/C6 grant semantics and implementation-neutral reset state. No winner or technical behavior is asserted.
- **Act:** return this Challenge checkpoint and wait for Coordinator decision. No code, prototype or Chrome test was run.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| The protocol tests offline route, same-profile restart, data persistence, Cancel/Confirm and PDF opening across C1–C6; cache and profile confounds are addressed if evidence is captured as a bundle. No candidate can be eliminated from the documents alone. | C4/C6 may be falsely rejected unless opening a PDF is separated from extension access on a file URL; reset wording should specify state outcome rather than an API call. All actual outcomes remain unobserved until a prototype is run. |

**Sufficiency:**
- [x] External source used?
- [x] Briefing gap closed?
- [x] Pairwise protocol challenge completed? Surviving configurations listed?

Stage complete: YES
→ Coordinator decision: authorize one focused Extract adjustment for C4/C6 and reset criteria, or proceed to synthesis with this limitation.

## Sources

- [Chrome DevTools: Network features reference](https://developer.chrome.com/docs/devtools/network/reference) — checked 2026-10-16; cache disable, offline simulation, capture-window limits and sanitized HAR.
- [Chrome: Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) — checked 2026-10-16; manual file URL grant when extension must run on local files.
- [Chrome: Match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns) — checked 2026-10-16; `file:///` local file matching and manual grant.
- [Chrome: Tabs API](https://developer.chrome.com/docs/extensions/reference/api/tabs) — checked 2026-10-16; most tab creation/navigation features do not need permissions; file URL navigation-specific result remains undocumented here.
- [Chrome DevTools: View and edit extension storage](https://developer.chrome.com/docs/devtools/storage/extensionstorage) — checked 2026-10-16; extension storage inspector available from Chrome 132; selected values can be inspected/deleted, so use read-only for verification.
- [Chrome: Debug extensions](https://developer.chrome.com/docs/extensions/get-started/tutorial/debug) — checked 2026-10-16; service-worker context is separately inspected and open DevTools can keep a worker active.
- [Chrome: `chrome.storage` API](https://developer.chrome.com/docs/extensions/reference/api/storage) — checked 2026-10-16; selected `remove()` versus broad `clear()`.
- [W3C Indexed Database API 3.0](https://w3c.github.io/IndexedDB/) — checked 2026-10-16; selected-record deletion versus database deletion.
- [Chrome: Extension pages CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) — checked 2026-10-16; minimum extension-page code/resource constraints.
