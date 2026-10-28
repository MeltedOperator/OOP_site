# Gather — «Чего пока не знаем?»
> **Mindset:** Исследователь. Сначала картируем различия, потом сужаем.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать согласованные учебные материалы третьей недели: лекции и лабораторные 7–9.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: continuation authorized by `journal/20261028-091326__gate_answer__D2B8.md @ 50e878abc7d4813262ffa62970cfb07acc96e284`; source result `research/iter2/1_briefing.md @ 24dd630b8e0230dbefe34f8ec8df657f8574b1a6`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; `reporting: native-gates`, `selection_ref: baseline`.
> Mode: `focused`; pass 1 of 1.

## Dimensions

| Dimension | Alt A | Alt B | Alt C |
|-----------|-------|-------|-------|
| **D1: Data context** | Linked mock bank account and account metadata (Plaid) | Public central-bank series such as exchange rates (Valet) | Local fixture that models one documented contract without an API |
| **D2: Access/setup boundary** | Plaid Dashboard account and Sandbox API keys; account endpoint also needs an Item `access_token` | No registration or access key; public HTTP retrieval | No credentials, browser access, runtime, or network in the course; source copied into fictional fixture |
| **D3: Smallest visible integration behavior** | Map `accounts[]` fields and cached balance; optional `ITEM_LOGIN_REQUIRED` status is part of a broader Item lifecycle | Map observations for a selected series; exchange rates publish daily and docs recommend caching, with cautious back-off on failures | Show success and one explicit failure/stale fixture; behavior is deterministic but only a model |

## Findings

### G1: Plaid Sandbox — bank-account data contract and access burden

The official Sandbox guide describes a free test environment with test institutions/accounts, unlimited test Items, generated/custom test data, and HTTPS POST requests to `sandbox.plaid.com`. However, obtaining the Sandbox API keys requires the Plaid Dashboard. The API overview says nearly all endpoints require `client_id` and `secret`; `/accounts/get` also needs an Item `access_token`. This makes it a real bank-account-shaped contract but not a credential-free student service. The course’s no-network boundary allows only a local fixture, so live dashboard/API setup is outside the proposed exercise. [Sandbox overview](https://plaid.com/docs/sandbox/), [API overview](https://plaid.com/docs/api/), [Accounts API](https://plaid.com/docs/api/accounts/).

The `/accounts/get` response is an `accounts` array containing identifiers, names, account type/subtype and balance fields. Plaid says the endpoint returns cached information; balances reflect the last successful Item update, which may be about daily when the Item is healthy and linked to a frequently updating product, but may be older otherwise. This is a concrete freshness caveat, not a fixed freshness guarantee or universal cache TTL. Plaid also documents `ITEM_LOGIN_REQUIRED` for an Item needing user interaction; the Sandbox can force this state, though teaching it would introduce consent/login lifecycle beyond a minimal account field adapter. [Accounts API](https://plaid.com/docs/api/accounts/), [Sandbox overview](https://plaid.com/docs/sandbox/).

Sandbox is not production-complete: Plaid says it does not capture all real institution-specific behavior or production data complexity. It explicitly identifies Monitor watchlists as an exception using a real-world dataset; exclude Monitor from any mock-data course example. Sandbox also says API data may be inconsistent across products unless custom test data is used. [Sandbox overview](https://plaid.com/docs/sandbox/).

### G2: Bank of Canada Valet — public financial statistics and access boundary

Valet provides programmatic access to exchange rates, economic statistics and other financial data. The guide says no registration or access key is required and there is no cost. Its endpoint docs expose lists, series metadata, observation queries, and JSON/CSV/XML formats. This is central-bank statistics, not customer bank-account data, account balance, or a sandbox. A local series/observation fixture can demonstrate a response Adapter while keeping domain meaning honest. [Valet guide](https://www.bankofcanada.ca/valet-api-how-to/), [Valet endpoint docs](https://www.bankofcanada.ca/valet/docs).

Valet’s guide states that exchange rates are published once per day and recommends caching retrieved results. On failures, it recommends waiting before retry and suggests random or increasing back-off; it does not prescribe a universal delay, retry count, or cache TTL. It also warns that data may appear after a brief processing delay. These facts support at most one narrowly scoped, source-specific freshness/error discussion; they do not justify an exact retry policy. [Valet guide](https://www.bankofcanada.ca/valet-api-how-to/), [Valet docs](https://www.bankofcanada.ca/valet/docs).

### G3: Candidate comparison for the lab purpose

| Factor | Plaid Sandbox | Bank of Canada Valet | Local fixture consequence |
|--------|---------------|----------------------|---------------------------|
| What the data represents | Accounts connected through a financial-data platform; mock/test Items | Public exchange-rate and other central-bank statistical series | The lesson can use the same named domain object only if its provenance/source is clear; never imply exchange-rate observations are customer balances |
| Learner access burden | Dashboard account and Sandbox keys; the API call uses credentials and an Item access token | Public API, no registration or access key | The frozen static course avoids both setups; students examine a fully local fictional sample |
| Contract complexity | `accounts[]`, nested balance fields, many account types; cached-balance semantics | Named series and dated observations; multiple output formats | One response shape is enough for an Adapter lesson; a cross-provider generalization would add unnecessary scope |
| Error/freshness candidate | Cached balance can lag the last Item update; login-required condition opens larger lifecycle | Once-daily exchange-rate publication supports freshness/cache vocabulary; back-off guidance is qualitative | A static case can display the source caveat; it cannot demonstrate actual network timing or guarantee policy |
| Domain fit | Stronger match if the intended concept is linked bank accounts | Stronger match if the intended concept is accessible financial data and a clean read-only series | Owner/course judgment remains necessary because lab 7 currently says “bank” and includes cache/decorator concepts |

The source docs do not claim Adapter, Facade or Decorator are required. Treating either response as an Adapter exercise is an instructional mapping, not a provider requirement or proof of learning benefit.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| The candidates differ sharply in domain (mock customer accounts vs public financial statistics) and setup burden (Dashboard credentials/tokens vs keyless public access). Both can be represented locally, but only the fixture preserves the course’s no-network rule. Plaid’s cached balance caveat is more account-specific; Valet’s daily publishing/caching and qualitative back-off guidance are easier to state without credentials. | Whether the “bank API” intent requires customer account semantics; whether one account shape or one time-series shape better fits Lab 7’s existing exercises; whether an error/freshness behavior belongs in the 60-minute core. No source proves a pedagogical advantage. |

**Sufficiency:**
- [x] External source used? — official Plaid and Bank of Canada documents.
- [x] Briefing gap closed? — documented domain, access, shape, and behavior differences were found; the course-context choice remains intentionally open.
- [x] Dimensions identified? — three independent factors, each with three alternatives including local fixture.

Stage complete: YES
→ Coordinator gate: May this Researcher continue to Extract? Recommendation: yes; compare each candidate against the frozen course purpose and identify which single evidence-backed behavior remains small enough for the core, without selecting the context or architecture.
