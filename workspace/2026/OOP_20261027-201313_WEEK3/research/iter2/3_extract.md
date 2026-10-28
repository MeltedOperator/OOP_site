# Extract — «Какие сочетания ещё не видим?»
> **Mindset:** Аналитик. Показываем непротиворечивые сочетания, не ранжируя их.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать согласованные учебные материалы третьей недели: лекции и лабораторные 7–9.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: continuation authorized by `journal/20261028-091525__gate_answer__D2B9.md @ f231bf304cf6a6b2efe2ef9c5a1b46877d989958`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; `reporting: native-gates`, `selection_ref: baseline`.
> Mode: `focused`; iteration 2, H3; pass 1 of 1.
> Observed: 2026-10-28 Asia/Qyzylorda. Official Plaid Sandbox/API/Accounts docs and Bank of Canada Valet/API and exchange-rate docs reviewed; no API calls or account access.

## Configuration Space

Gather supplied three factors: source/data domain, access/setup boundary, and one visible behavior. The raw 3×3×3 space has 27 conceptual rows; combinations that require live/API access inside the frozen no-network course, or attach a provider-specific behavior to the other provider, are contradictory to the source contract or HL and are omitted. The remaining options keep the course-side representation local and fictional. This is a candidate space, not a ranking.

| Config | D1: Data context | D2: Course access/delivery | D3: One visible behavior |
|--------|-----------------|---------------------------|---------------------------|
| C1 | Plaid bank-account contract | Offline local fixture shaped from the documented response | Explain that `/accounts/get` balance is cached and may not be current; avoid asserting a fixed age |
| C2 | Plaid bank-account contract | Offline local fixture shaped from the documented response | Show one explicit account/API error then stop; omit Item login recovery |
| C3 | Plaid bank-account contract | Offline local fixture shaped from the documented response | Show `ITEM_LOGIN_REQUIRED` as a named error state, without implementing consent or login flow |
| C4 | Valet public exchange-rate series | Offline local fixture of dated observations | Show date/as-of freshness; distinguish once-per-business-day publication from live rates |
| C5 | Valet public exchange-rate series | Offline local fixture of dated observations | Describe careful back-off qualitatively; no fixed retry timing/count |
| C6 | Valet public exchange-rate series | Offline local fixture of dated observations | Show a lesson-authored generic failure fixture then stop; no Valet-specific error response is implied |
| C7 | Source contract undecided (fixture provenance preserved) | Offline local fixture only | Demonstrate one contract-to-domain mapping plus success/error fixtures; provider-specific behavior stays deferred |
| C8 | Source contract undecided (fixture provenance preserved) | Offline local fixture only | Demonstrate dated stale/current examples without implementing cache policy |

The frozen HL excludes actual network calls, so direct live Plaid/Valet student integrations are not retained as course configurations. Every source-specific option above is hypothetical local teaching data, not an account/service connection.

## Findings

### E1: Contract shape, semantics and freshness

Plaid’s `/accounts/get` returns an array of financial-institution accounts with provider identifiers, names, types/subtypes, and balance fields. The endpoint returns cached information: the balance reflects the last successful Item update, which can be roughly daily for a healthy Item with a regularly updating product, or older for other products. The source does not establish a universal freshness guarantee or TTL. This gives a direct bank-account domain mapping (for example, provider-specific account fields to a small course `Account` object) and a concrete “balance has an as-of boundary” point. [Plaid Accounts API](https://plaid.com/docs/api/accounts/).

Valet exposes observations for named financial-data series and formats such as JSON, CSV and XML. Daily exchange rates are published once each business day, normally by 16:30 ET, but may be delayed; the Bank calls the rates indicative and says they are for statistical, analytical and informational use, not transaction benchmarks. A course mapping would naturally be a dated `RateObservation` or series object, not an account/balance object. This source-specific publication/freshness fact is clearer than a generic TTL but carries a strong domain distinction. [Valet API docs](https://www.bankofcanada.ca/valet/docs), [daily exchange rates](https://www.bankofcanada.ca/rates/exchange/daily-exchange-rates/), [FX backgrounder](https://www.bankofcanada.ca/rates/exchange/background-information-on-foreign-exchange-rates/).

### E2: Access boundaries and unproposed combinations

Plaid Sandbox keys are Dashboard-issued; the API requires `client_id` and `secret` for nearly all endpoints, while `/accounts/get` additionally requires an Item `access_token`. Valet needs no registration or access key. Neither access path belongs in the course runtime under the frozen no-network constraint; both contracts can only be represented by local fixtures. Keeping provider provenance with the fixture is useful to explain what the data means, even if the student does not make an API call. [Plaid Sandbox](https://plaid.com/docs/sandbox/), [Plaid API overview](https://plaid.com/docs/api/), [Valet guide](https://www.bankofcanada.ca/valet-api-how-to/).

A combination not proposed in Briefing is **Valet dated observations → local fixture → show the observation date as freshness evidence, with no cache decorator or retry loop**. This uses a source fact without teaching the API access procedure or a policy. Another unproposed boundary is **Plaid account fixture → show the balance’s potentially stale provenance, while stopping at an error rather than simulating Item recovery**. These combinations keep Adapter-like mapping distinct from Facade/Decorator or recovery behavior. They are candidate lesson shapes, not decisions.

The Plaid `ITEM_LOGIN_REQUIRED` state is documentable, but handling it in a student exercise expands from response translation into user interaction and consent lifecycle. Valet back-off language is a real recommendation, but no delay/count is specified. A local failure fixture can show “stop and explain” deterministically; it cannot validate remote retry timing. [Plaid Sandbox](https://plaid.com/docs/sandbox/), [Valet guide](https://www.bankofcanada.ca/valet-api-how-to/).

### E3: Teaching inference boundary

Both providers support a small Adapter-shaped lesson as a design inference: translate one external response into one domain type. For Plaid, a bank `Account` object preserves Lab 7’s bank focus; for Valet, a dated `RateObservation` reduces credential burden and gives a specific date/freshness distinction. Neither doc requires Adapter, Facade or Decorator, and neither establishes learning effectiveness. Adding all three patterns, retries, cache policy and login lifecycle is unsupported as a necessity and may consume the fixed 60-minute core; the actual learning load remains unmeasured and must be challenged, not asserted.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Eight locally deliverable candidate configurations preserve both domains, source-specific limits and the frozen no-network rule. Plaid is account-shaped but requires Dashboard keys/tokens for real API access and has potentially stale balances. Valet is keyless public statistics with dated, once-daily indicative exchange rates and qualitative back-off/cache guidance. A fixture can make either example static and deterministic. | Whether Lab 7’s explicit bank framing is essential or whether public financial statistics preserve its intent; whether the core should show freshness metadata, one stop-on-error case, or no resilience behavior; whether either response mapping is legible within the lesson time. No documentation proves a learning advantage. |

**Sufficiency:**
- [x] External source used? — official Plaid API/Accounts docs and Bank of Canada Valet/rate docs.
- [x] Briefing gap closed? — response/domain, access burdens and bounded behavior options are mapped; course choice remains explicitly owner-reserved.
- [x] Configuration Space built from Gather dimensions? — compatible combinations retained; impossible live-access/no-network combinations and cross-provider behaviors excluded with reasons.

Stage complete: YES
→ Coordinator gate: Continue to Challenge (recommended; pressure-test whether the domain/access/freshness tradeoffs preserve Lab 7’s purpose and fit the fixed lesson core), or stop this stage sequence for owner direction.

