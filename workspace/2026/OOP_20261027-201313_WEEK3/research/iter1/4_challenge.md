# Challenge — «Что может оказаться неверным?»
> **Mindset:** Критик. Атакуем каждую конфигурацию: уцелевшее должно опираться на доказательства, исключение — на точную причину.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать понятные и согласованные материалы недели 3, где студенты видят практическую пользу ООП в связном примере.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: owner-direct Researcher activation; continuation authorized by `journal/20261028-090249__gate_answer__D817.md @ a0230c5fcee34950f983f7d7a336bcfc18d4fa07`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; status selection remains `reporting: native-gates`, `selection_ref: baseline`.
> Mode: `focused`; iteration 1, H3; pass 1 of 1. Observed: 2026-10-28 Asia/Qyzylorda.
> External-query accounting: 7 search queries (2 above the soft limit of 5) were used to cross-check newly surfaced financial sandbox/read-only candidates; all were official first-party provider sources. Further search is not planned in this pass.

## Consistency Check

Pairwise test rule: a pair is called incompatible here only when the configuration claims provider-specific behavior that the reviewed primary source does not document. This is an evidence-floor exclusion, not a claim that the protocol is technically impossible. A local fixture can still simulate the behavior, but it must be labeled as a fixture and tied to its actual source.

**Incompatible pairs:**

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible for a provider-specific claim |
|------------|-------------|-------------|-------------|-------------------|
| D1: API context and access boundary | A — Capital One Open Banking | D3: Error and freshness behavior | B — header-aware rate-limit retry | Capital One documents a 429 in one rate-limit condition, but the reviewed data-access docs specify no retry header or delay. Do not invent provider retry policy. |
| D1: API context and access boundary | A — Capital One Open Banking | D3: Error and freshness behavior | C — ETag/Last-Modified conditional cache | The reviewed provider data-access page contains no ETag or If-None-Match documentation; conditional-cache support is unverified for this API. |
| D1: API context and access boundary | C — Open-Meteo | D3: Error and freshness behavior | B — header-aware rate-limit retry | Reviewed forecast docs establish HTTP 400 for malformed query parameters, not a rate-limit retry contract. A 400 validation error should not be presented as a retry case. |
| D1: API context and access boundary | C — Open-Meteo | D3: Error and freshness behavior | C — ETag/Last-Modified conditional cache | The reviewed forecast docs do not document ETag/If-None-Match or a cache-validation response; support is unverified. |

**Surviving configurations** (from Extract's evidence-backed space; codes map to `2_gather.md`):

| Config | D1: API context and access boundary | D2: Object boundary shown to student | D3: Error and freshness behavior in the example | Notes |
|--------|------------------------------------|------------------------------------|-----------------------------------------------|-------|
| C4 | A | A | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C5 | A | B | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C8 | A | B | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C9 | A | C | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C12 | A | C | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C13 | A | D | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C16 | A | D | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C17 | B | A | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C18 | B | A | B | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C19 | B | A | C | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C20 | B | A | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C21 | B | B | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C22 | B | B | B | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C23 | B | B | C | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C24 | B | B | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C25 | B | C | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C26 | B | C | B | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C27 | B | C | C | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C28 | B | C | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C29 | B | D | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C30 | B | D | B | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C31 | B | D | C | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C32 | B | D | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C33 | C | A | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C36 | C | A | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C37 | C | B | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C40 | C | B | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C41 | C | C | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C44 | C | C | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C45 | C | D | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C48 | C | D | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C49 | D | A | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C50 | D | A | B | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C51 | D | A | C | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C52 | D | A | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C53 | D | B | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C54 | D | B | B | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C55 | D | B | C | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C56 | D | B | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C57 | D | C | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C58 | D | C | B | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C59 | D | C | C | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C60 | D | C | D | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C61 | D | D | A | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C62 | D | D | B | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C63 | D | D | C | Compatible with Gather's abstract dimensions; see provider evidence below. |
| C64 | D | D | D | Compatible with Gather's abstract dimensions; see provider evidence below. |

**Unexpected survivors**
- **C64 (D, D, D):** a documented external API can be represented by a fully local fixture, wrapped by one Decorator, with deterministic fake success/error/cache outputs. This keeps the course network-free while preserving source provenance; it teaches a model, not a live integration.
- **C12 (A, C, D):** Capital One's account/balance contract can inform a small Adapter + Facade with local fake responses and visible errors, without making a live request or simulating consent/TLS/credentials. It preserves the banking domain, but provider-specific retry/cache behavior stays out.
- **C28 (B, C, D):** a public GitHub read endpoint plus Adapter/Facade and local fixtures can expose documented HTTP behavior without a secret in the course; it shifts the example away from banking.

## Findings

### C1: Access and data stress test

- Capital One is the most direct bank-specific source in the current matrix, but its real data endpoints require mutual TLS and an access token tied to consent; its interface is for FCA-registered AISP/CBPII providers. Its sandbox supports TPP onboarding, but the docs reviewed do not establish that a general class can access it without that status or that every sandbox record is synthetic. The course cannot make requests or handle credentials, so Capital One can support a local contract-shaped model only, not a student-run sandbox exercise. Sources: [Capital One interface overview](https://developer.capitalone.co.uk/docs/), [Capital One sandbox guide](https://developer.capitalone.co.uk/docs/sandboxTesting), [Capital One data access](https://developer.capitalone.co.uk/docs/dataAccess).
- A stronger sandbox counterexample surfaced outside the Gather matrix: Plaid says Sandbox is free, available to developers, uses test/mock data, and supports test accounts; API keys are obtained from its Dashboard, and Sandbox calls use HTTPS POST. This is not suitable for embedding keys or making course calls, but it is a plausible documentation source for a bank-data integration represented locally. Plaid also says Sandbox does not model all production/institution-specific behavior and some products have special enablement. Its Sandbox docs identify Monitor watchlists as an exception that may use real watchlist data; exclude Monitor and any live-data Trial flow from this course context. Sources: [Plaid Sandbox overview](https://plaid.com/docs/sandbox/), [Plaid Sandbox vs. Production](https://support.plaid.com/hc/en-us/articles/16110110883479-How-are-Sandbox-Production-Trial-plan-and-Limited-Production-different).
- Another counterexample is the Bank of Canada Valet API: its first-party guide says no registration or access key is required, provides JSON/CSV/XML data endpoints, and specifically recommends careful back-off after failures and caching once-daily exchange rates. That makes it a publicly accessible read-only financial-data API with concrete freshness/retry lessons, but it is a central-bank statistical-data service, not a customer-account API or sandbox. Sources: [Valet API how-to](https://www.bankofcanada.ca/valet-api-how-to/), [Valet endpoint docs](https://www.bankofcanada.ca/valet/docs), [daily exchange-rate data and disclaimer](https://www.bankofcanada.ca/rates/exchange/daily-exchange-rates/).
- These newly surfaced providers change the candidate set beyond Extract; they are not smuggled into its survivor table. A second iteration can compare Plaid's mock account-data sandbox with Bank of Canada's keyless public-data API against the owner's intended meaning of a “real API” lesson.

### C2: Error, retry, cache, and teaching stress test

- GitHub documents response-aware waits for rate limits and conditionally returns `304 Not Modified` for unchanged GETs. Its quota exemption for a successful conditional response requires correct authorization, so a no-secret local course can model the response shape but must not claim that an unauthenticated request gets the primary-quota benefit. Source: [GitHub REST best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api).
- Open-Meteo's documented `400` JSON error is caused by malformed query parameters. Retrying the same invalid request would repeat a client mistake; it is a concrete counterexample to “retry every error.” Source: [Open-Meteo forecast docs](https://open-meteo.com/en/docs).
- Plaid's error docs list rate-limit errors and different error classes; this shows why a universal retry loop is an unsafe simplification. Its endpoint limits are provider-specific and subject to change, so a class example would need to be explicitly synthetic and bounded. Sources: [Plaid errors overview](https://plaid.com/docs/errors/), [Plaid rate-limit errors](https://plaid.com/docs/errors/rate-limit-exceeded/).
- Bank of Canada explicitly connects daily update cadence with caching and advises waiting with random or increasing back-off after a failure. It gives concrete educational material for a read-only financial-data example without customer balances or payments. The docs do not establish one universal retry count, so any finite attempt cap in a lesson would be a deliberate teaching simplification, not the Bank's prescribed number. Source: [Valet API how-to](https://www.bankofcanada.ca/valet-api-how-to/).
- None of these sources measures student learning or proves that Adapter, Facade, Decorator, retry, or cache should all appear in a 60-minute lab. Pattern-to-object mapping remains a design inference; combining all three patterns and two resilience mechanisms risks teaching a pattern inventory instead of one clear boundary.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| H3 survives conditionally: official contracts support a local model of real API boundaries without live calls, real accounts or secrets. Plaid provides mock bank-data sandbox evidence; Bank of Canada provides the cleanest documented public read-only financial-data/retry/cache context. Provider-specific behavior cannot be mixed freely: Capital One's 429 has no documented delay, Open-Meteo's 400 is a validation error, and GitHub's conditional-request quota benefit is authenticated. | Which definition of “real API” best fits the week-3 bank case: mock account-data sandbox (Plaid) or public central-bank statistics (Valet); whether to center one pattern and only one resilience behavior; educational effectiveness remains unmeasured. Iteration 2 needs a Coordinator-prepared pending entry before any further research. |

**Sufficiency:**
- [x] External source used? — official first-party provider documentation, including Plaid, Bank of Canada, Capital One, GitHub, and Open-Meteo.
- [x] Briefing gap closed? — source candidates and constraints are explicit; course-context choice is a remaining coordinator/owner decision, not an unanswered scope question.
- [x] Pairwise compatibility checked? — provider-specific unsupported pairs removed; all remaining 47 configurations from Extract are listed below.

Stage complete: YES
→ Coordinator gate: May I synthesize Iteration 1 RES now (recommended), recording Plaid and Bank of Canada as bounded candidates for the Coordinator's planned second iteration? No architecture or course choice is being made here.

