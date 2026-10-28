# Extract — «Какие конфигурации не видим?»
> **Mindset:** Аналитик. Структурируем находки и показываем сочетания, которые ещё не рассматривали.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать понятные и согласованные материалы недели 3, где студенты видят практическую пользу ООП в связном примере.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: owner-direct Researcher activation; continuation authorized by `journal/20261028-085728__gate_answer__C91E.md @ fb52dd6ca3f4f0d2e0f71063db86635a72183eb8`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; status selection remains `reporting: native-gates`, `selection_ref: baseline`.
> Mode: `focused`; iteration 1, H3; pass 1 of 1.
> Observed: 2026-10-28 Asia/Qyzylorda. Inspected official Capital One Open Banking sandbox/data-access docs, GitHub REST endpoint/rate-limit/error/cache docs, and Open-Meteo forecast/error docs; no API calls were made.

## Configuration Space

Gather defined four alternatives for each of three dimensions (64 combinations). Following the template rule for spaces over 30, the table lists every combination that differs from baseline `C1 = (A, A, A)` (Open Banking sandbox + direct request/parsing + visible error and stop); abbreviations map to the alternatives in `2_gather.md`. These are configuration possibilities, not evaluations or claims that every provider supports every behavior.

| Config | D1: API context and access boundary | D2: Object boundary shown to student | D3: Error and freshness behavior in the example |
|--------|------------------------------------|------------------------------------|-----------------------------------------------|
| C2 | A | A | B |
| C3 | A | A | C |
| C4 | A | A | D |
| C5 | A | B | A |
| C6 | A | B | B |
| C7 | A | B | C |
| C8 | A | B | D |
| C9 | A | C | A |
| C10 | A | C | B |
| C11 | A | C | C |
| C12 | A | C | D |
| C13 | A | D | A |
| C14 | A | D | B |
| C15 | A | D | C |
| C16 | A | D | D |
| C17 | B | A | A |
| C18 | B | A | B |
| C19 | B | A | C |
| C20 | B | A | D |
| C21 | B | B | A |
| C22 | B | B | B |
| C23 | B | B | C |
| C24 | B | B | D |
| C25 | B | C | A |
| C26 | B | C | B |
| C27 | B | C | C |
| C28 | B | C | D |
| C29 | B | D | A |
| C30 | B | D | B |
| C31 | B | D | C |
| C32 | B | D | D |
| C33 | C | A | A |
| C34 | C | A | B |
| C35 | C | A | C |
| C36 | C | A | D |
| C37 | C | B | A |
| C38 | C | B | B |
| C39 | C | B | C |
| C40 | C | B | D |
| C41 | C | C | A |
| C42 | C | C | B |
| C43 | C | C | C |
| C44 | C | C | D |
| C45 | C | D | A |
| C46 | C | D | B |
| C47 | C | D | C |
| C48 | C | D | D |
| C49 | D | A | A |
| C50 | D | A | B |
| C51 | D | A | C |
| C52 | D | A | D |
| C53 | D | B | A |
| C54 | D | B | B |
| C55 | D | B | C |
| C56 | D | B | D |
| C57 | D | C | A |
| C58 | D | C | B |
| C59 | D | C | C |
| C60 | D | C | D |
| C61 | D | D | A |
| C62 | D | D | B |
| C63 | D | D | C |
| C64 | D | D | D |
**Alternative keys from Gather**
- **D1:** A = Open Banking sandbox; B = public GitHub REST; C = public Open-Meteo; D = local fixture based on a documented API.
- **D2:** A = direct caller request/parsing; B = Adapter; C = Adapter + Facade; D = Decorator wrapping a client concern.
- **D3:** A = visible error then stop; B = header-aware bounded rate-limit retry; C = conditional GET/cache using ETag or Last-Modified and `304`; D = deterministic local fixtures for success/error/cache, no network.

## Findings

### E1: Source capabilities and boundary conditions

- **Open Banking / Capital One:** The sandbox is described as reflecting production APIs and supporting TPP onboarding. Data access in the provider docs requires mutual TLS and an access token for a given consent; account, balance, statement and transaction reads are exposed as GET endpoints. The sandbox catalogue also includes consent create/delete and funds-confirmation operations, so only the GET balance/account shape is relevant to this investigation. The docs do not establish general student access without TPP onboarding or prove that every test record is synthetic. The provider documents a `429` when a rate limit is reached in a stated customer-absent condition; the pages reviewed do not specify a retry header/delay for that response. Sources: [Capital One sandbox](https://developer.capitalone.co.uk/docs/sandboxTesting), [Capital One data access](https://developer.capitalone.co.uk/docs/dataAccess), [Capital One interface overview](https://developer.capitalone.co.uk/docs/).
- **GitHub REST:** Its `Get a repository` endpoint is explicitly usable without authentication for public resources. The docs list response statuses and its REST guidance gives rate-limit and ETag/conditional-request behavior. Correctly authorized conditional requests that return `304` can avoid the primary rate-limit charge; this quota benefit must not be attributed to unauthenticated calls. A public repository response offers a real documented JSON boundary without a payment/account context. Sources: [Get a repository](https://docs.github.com/en/rest/repos/repos), [rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api), [best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api).
- **Open-Meteo:** Its forecast endpoint is documented as unauthenticated HTTP GET with query parameters and JSON. A malformed variable/query produces HTTP 400 with a structured JSON error object. This gives a concrete parse/validation-error case, but the reviewed docs do not prescribe retry behavior or a cache TTL. Its service is a live data API rather than a sandbox. Sources: [Open-Meteo API overview](https://open-meteo.com/), [forecast API response/errors](https://open-meteo.com/en/docs).
- **Fixture-backed course:** The frozen HL keeps course code static, local and non-networked. A fixture can reproduce one documented request/response/error shape but is not itself an external API or sandbox. This is a design inference from the course contract, not provider evidence.

### E2: Configuration patterns and an unproposed combination

- The source contracts support multiple levels of teaching shape: direct request/parse; an Adapter that maps a provider response to a small course object; Adapter plus Facade that offers one named course operation; and a Decorator that adds a policy around a stable client interface. Provider documentation does not require these patterns. The mapping from endpoint boundary to class responsibilities is an architectural teaching inference.
- A configuration not spelled out in Briefing is: **public GitHub repository GET → Adapter + Facade → local deterministic fixtures for success, validation error, and cache/retry responses**. It combines a documented no-auth public endpoint with a stable course model while keeping the page itself offline. This combination uses a developer-platform API instead of a banking API; whether that subject shift preserves the intended lesson remains for Challenge.
- Another distinct configuration is: **Open Banking account/balance docs → local fake response → Adapter + one small Facade operation → show an explicit error and stop**. It preserves the banking integration context and models only the documented read boundary, but it does not demonstrate provider-specific retry/cache semantics. It also avoids teaching consent setup, TLS, credentials, writes or real account data. This is a candidate, not a recommendation.
- Retry and caching are separate behaviors, not a package that must be added to every API client. GitHub's rate-limit guidance applies to its documented rate limiting and warns that continued attempts can lead to an integration ban. The Capital One pages reviewed do not supply equivalent backoff guidance. Open-Meteo's 400 error example is a malformed-request error, so treating it as an automatic retry case would not follow the source. Conditional request/caching examples must keep their provider and authorization conditions explicit. Sources: [GitHub REST best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api), [Open-Meteo errors](https://open-meteo.com/en/docs), [Capital One data access](https://developer.capitalone.co.uk/docs/dataAccess).
- No source inspected establishes that Adapter/Facade/Decorator improves learning outcomes. That educational value remains an inference to challenge against the time budget, clarity and existing lab-7 framing.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| The 64-row conceptual space separates provider context, object boundary and resilience/freshness behavior. A banking-docs-plus-local-fixture path can preserve the lab's domain without credentials or live calls; GitHub offers the clearest sourced retry/cache details; Open-Meteo offers the simplest unauthenticated JSON and malformed-request error example. | Which source-context combination best preserves the intended real-world OOP value for this class; whether the banking sandbox can be accessed with synthetic data without regulated-provider onboarding; whether retry/cache add enough learning value to the lab without overloading its 60-minute core; the exact boundary between documented fact and simplified lesson model. |

**Sufficiency:**
- [x] External source used? — official Capital One, GitHub and Open-Meteo developer docs.
- [x] Briefing gap closed? — the approved question and scope are clear; source-access and pedagogical questions remain as research findings, not briefing gaps. Economics binding gap remains recorded in Briefing.
- [x] Configuration Space built from Gather dimensions? — full 4×4×4 space represented; the baseline combination is omitted per the template's >30 rule.

Stage complete: YES
→ Coordinator gate: Continue to Challenge (recommended; test the viable configurations against access constraints, teachability, and the frozen no-network/fictional-data boundary), or stop this iteration's stage sequence and record owner direction.




