# Challenge — «Что меняется при попытке опровергнуть fit?»
> **Mindset:** Критик. Атакуем каждый вариант фактами, границами и исходной целью лабораторной.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать согласованные учебные материалы третьей недели: лекции и лабораторные 7–9.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: continuation authorized by `journal/20261028-091753__gate_answer__E24B.md @ 87fab11b2556712a8680ae836724d74899771956`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; `reporting: native-gates`, `selection_ref: baseline`.
> Mode: `focused`; iteration 2, H3; pass 1 of 1.
> Observed: 2026-10-28 Asia/Qyzylorda. Official Plaid Accounts/Sandbox docs and Bank of Canada Valet/FX docs were rechecked; Lab 7 source PDF was read as local task context. No API calls or credentials were used.

## Consistency Check

Gather’s alternatives cross the provider/data domain, provider access/setup, and one visible behavior. The fixed no-network/static course constraint eliminates live runtime access for either provider. Cross-provider source-specific behavior is incompatible; generic lesson-created fixtures can only be described as generic, not attributed to a provider.

**Incompatible pairs:**

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|------------|-------------|-------------|-------------|-----------------|
| D1: data context | Plaid bank account | D2: access/setup | Valet keyless public retrieval as the course’s live source | Plaid’s API still requires Plaid credentials and an Item access token; a keyless Valet route cannot retrieve Plaid accounts. |
| D1: data context | Bank of Canada series | D2: access/setup | Plaid Dashboard key + Item token | Those credentials grant access to Plaid Items, not Valet series. |
| D1: any provider | Plaid API or Valet API called by the student at runtime | D2: course delivery | Frozen static/local, no-network course | A live provider connection conflicts with the approved course boundary. A local fixture is the only retained course delivery mode. |
| D1: Plaid account contract | Bank of Canada once-daily FX publication/back-off behavior | D3: source-specific behavior | Valet daily-series behavior | It would falsely attribute a central-bank series rule to Plaid account data. |
| D1: Valet financial series | Plaid balance freshness or `ITEM_LOGIN_REQUIRED` | D3: source-specific behavior | Plaid account behavior | It would falsely attribute Plaid Item/account semantics to Valet. |

**Surviving configurations** (compatible with a local fixture; compatibility does not imply lesson fit):

| Config | D1: Data context | D2: Course access/delivery | D3: One visible behavior | Notes |
|--------|-----------------|---------------------------|---------------------------|-------|
| C1 | Plaid account contract | Offline local fixture | Cached-balance freshness caveat | Source-backed; does not make the account balance real-time. |
| C2 | Plaid account contract | Offline local fixture | Generic error fixture, then stop | Coherent teaching shape, but not a Plaid-specific error claim. |
| C3 | Plaid account contract | Offline local fixture | `ITEM_LOGIN_REQUIRED` state | Source-backed; requires careful separation from any consent/login flow. |
| C4 | Valet public FX observations | Offline local fixture | Observation date and once-per-business-day publication | Source-backed; rates are indicative, not transaction benchmarks. |
| C5 | Valet public FX observations | Offline local fixture | Qualitative back-off guidance after failure | Source-backed only at a high level; no exact retry timing/count. |
| C6 | Valet public FX observations | Offline local fixture | Generic error fixture, then stop | Coherent fixture case, not a source-specific error contract. |
| C7 | Source undecided | Offline local fixture | Generic success/error fixture | Shape-only placeholder; no provider-specific claim until context is chosen. |
| C8 | Source undecided | Offline local fixture | Dated stale/current examples | Shape-only placeholder; does not assert a provider cache policy. |

**Unexpected survivors**

- **C4:** Keyless public financial data creates a surprisingly clean Adapter-shaped observation contract, but the official Bank warns the FX values are indicative and not transaction benchmarks. It therefore survives as a statistics lesson only; it cannot support payment-fare or exchange-transaction behavior.
- **C1:** Plaid keeps the bank-account meaning but `/accounts/get` returns cached balances; its real-time balance alternative is a separate paid endpoint. A local fixture can accurately teach the freshness boundary without connecting to an account, but this shifts Lab 7 from charging to account information.

## Findings

### C1: The source candidates do not reproduce the payment gateway in Lab 7

The local Lab 7 PDF is explicitly a 135-minute exercise about integrating an external bank API into a city-transit payment gateway. It assigns points to a `BankApiAdapter`, three decorator concerns (`Timing`, retry, stop-list cache), a terminal facade, and automated tests. Its Adapter task converts `Decimal` tenge into tiyn and maps a legacy bank call; the retry task repeats `NetworkTimeoutError`; the Facade charges a card. The frozen HL retains the source PDFs unchanged but limits the web course’s required core to 60 minutes and additional material to optional depth.

Plaid’s researched candidate exposes linked account metadata and balance retrieval, not the legacy bank charge operation or a payment-gateway contract. Valet exposes statistical series and indicative FX observations, not customer accounts, card charges, or transaction execution. Neither provider can be described as the bank acquiring/payment endpoint from the original lab. The comparison therefore answers which source can ground a *safe local API-boundary example*, but does not prove either is a drop-in replacement for the source lab’s payment case. This mismatch is material to the owner-reserved course-context choice.

### C2: Plaid freshness and Sandbox fidelity narrow what its fixture can claim

Official Plaid docs say `/accounts/get` retrieves cached information, with balances reflecting the last successful Item update; a healthy Item on a frequently updating product typically updates about once a day, while other balances may be older. The same docs direct real-time balance use to `/accounts/balance/get` or `/signal/evaluate`, which are paid endpoints. For the course, a fixture may show “as of last update” and an intentionally old value, but must not promise a fixed one-day freshness or portray `/accounts/get` as a live balance. The per-institution `last_updated_datetime` field is not universal.

Plaid Sandbox tests use test Items and do not fully reproduce production data complexity or institution-specific behavior. Cross-product account/balance/transaction data can be inconsistent unless custom test data is used. More realism thus brings more concepts (Item, token, update, product, cached-vs-live endpoint and Sandbox limitations), which competes with the narrow 60-minute core. This makes a simple account-field Adapter viable as a teaching candidate, while freshness/error lifecycle is better treated as one short note or optional depth. Sources: [Plaid Accounts API](https://plaid.com/docs/api/accounts/), [Plaid Sandbox overview](https://plaid.com/docs/sandbox/).

### C3: Valet freshness is clear, but its meaning conflicts with transactional use

Valet’s daily average rates publish once per business day and may be delayed; its guide recommends caching data that updates only once a day. This gives a clean dated-observation example for freshness. Yet the Bank says rates are indicative, not guaranteed accurate or complete, and not necessarily the rates of real trades; its own guidance frames them as public-good data for statistical, analytical and informational purposes, not transaction benchmarks. A `RateObservation` fixture may illustrate an Adapter, date, and stale/current display. It must not be used as a fare calculation, card-payment input, or proof of an actual bank transaction. Sources: [Valet guide](https://www.bankofcanada.ca/valet-api-how-to/), [FX backgrounder](https://www.bankofcanada.ca/rates/exchange/background-information-on-foreign-exchange-rates/).

Valet back-off guidance says wait and consider random or increasing delay; it specifies no fixed delay, retry count, or product error response. An exercise that implements exact exponential retry would therefore add an invented policy. A fixture can mention the qualitative recommendation or show a stop-on-error branch, but cannot claim a documented retry contract. Source: [Valet guide](https://www.bankofcanada.ca/valet-api-how-to/).

### C4: The one-behavior limit is meaningful against the source lab’s scope

The source lab already assigns three decorators and a full facade-based tap flow, plus adapter conversion and tests. It assumes an external payment workflow with retry behavior. Retaining all of that within a 60-minute core is not supported by this research or the frozen HL; only one boundary and at most one source-specific behavior are under comparison. The research does not measure learner outcomes, so it cannot assert what students can complete in 60 minutes. The Coordinator/owner must determine whether to preserve payment/transit semantics using a clearly local fictional legacy-bank contract, or reframe the lesson around account information or public financial observations. That reserved choice stays open.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Two locally modeled source contracts survive but serve different goals: Plaid preserves account semantics with credential/cache complexity; Valet is keyless and gives dated public financial statistics but explicitly disclaims transactional use. The original source lab’s payment gateway is not represented by either endpoint. Static local fixtures remain necessary; only a small slice can be considered for the 60-minute core. | Whether “bank account/API” or payment-gateway fidelity is the owner’s defining goal for Lab 7; whether to use an explicitly fictional local legacy-bank contract as a separate path; which source context, if any, the owner wants. Learning outcomes and actual 60-minute load remain unmeasured. |

**Sufficiency:**
- [x] External source used? — official Plaid Accounts/Sandbox and Bank of Canada Valet/FX sources rechecked.
- [x] Briefing gap closed? — source fit and access boundaries are clearer; the owner-reserved context decision is intentionally unresolved.
- [x] Pairwise incompatibility checked? — incompatible live-access and cross-provider behavior pairs excluded; all compatible fixture configurations are listed.

Stage complete: YES
→ Coordinator gate: Continue to Synthesis (recommended; report the unresolved payment-vs-data context decision without selecting it), or return a bounded specific question for a third iteration.
