# Gather — «Чего пока не знаем?»
> **Mindset:** Исследователь. Картируем неизвестное до сужения; каждое предположение — вопрос.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать понятные и согласованные материалы недели 3, где студенты видят практическую пользу ООП в связном примере.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: owner-direct activation — `/tfw-research OOP_20261027-201313_WEEK3`; отдельный Researcher task, ручной запуск владельцем подтверждён task journal.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`
> Mode: `focused` (owner-selected); pass 1 of 1.

## Dimensions

| Dimension | Alt A | Alt B | Alt C | Alt D |
|-----------|-------|-------|-------|-------|
| **D1: API context and access boundary** | Open Banking sandbox: account-consent and account-information flow | Public GitHub REST endpoint: unauthenticated read-only access to public data | Open-Meteo forecast endpoint: unauthenticated HTTP GET returning JSON | Fully local fixture representing one documented external API response |
| **D2: Object boundary shown to student** | Caller makes a direct request and parses the provider response | Adapter translates provider transport/schema into a course domain object | Adapter plus Facade exposes one course-oriented operation and coordinates collaborators | Decorator wraps a client with one optional concern, such as a cache or bounded retry policy |
| **D3: Error and freshness behavior in the example** | Return a visible error and stop | Wait according to a documented rate-limit header, then allow a bounded retry | Revalidate a cached GET with ETag/Last-Modified and represent `304 Not Modified` | Use deterministic local fixtures for success, error and cached-response cases; no network call |

## Findings

### G1: Candidate API contexts and access constraints

- **Capital One UK Open Banking** documents a real account-information interface for authorised AISP/CBPII providers and says interface users must be FCA-registered. Its sandbox guide describes a sandbox reflecting production APIs and lists OAuth client registration, token, consent, and account/balance/transaction GET endpoints. The sandbox is a realistic source for the shape of consent and data-access boundaries. The docs reviewed do not establish that a general student can access it without TPP registration, that all sandbox records are synthetic, or that the sandbox is a read-only service end to end: consent creation/deletion and funds-confirmation POSTs also appear in its catalog. Those points remain unknown and the course must not perform them. Sources: [Capital One Open Banking Interface](https://developer.capitalone.co.uk/docs/), [Testing in the Sandbox](https://developer.capitalone.co.uk/docs/sandboxTesting).
- **GitHub REST API** permits unauthenticated requests when fetching public data, with a documented primary limit of 60 requests/hour per originating IP. This gives a public read-only integration surface and official documentation for rate limits, errors, conditional requests and retry timing. It is a developer-platform API, not a banking example. Source: [GitHub REST API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).
- **Open-Meteo** describes its forecast API as HTTP GET with query parameters and JSON output, no authentication for non-commercial use, with CC BY 4.0 data and attribution. It offers an easy external API boundary with no account-data or payment domain. It is a live forecast API, not a sandbox; the service documentation says model data updates at intervals, so a stored response can become stale. Sources: [Open-Meteo API overview](https://open-meteo.com/), [model updates and availability](https://open-meteo.com/en/docs/model-updates).
- **Local fixture** is not an actual API or sandbox. It can preserve the shape of a documented response while keeping the course entirely static and deterministic; its fidelity would need to be labeled as a model, not a live integration. This is a course-design inference from the frozen constraint that the site makes no network calls.

### G2: Object responsibilities and documented error/cache behavior

- Provider docs specify wire contracts and constraints, not Adapter, Facade or Decorator as required implementation patterns. Applying those patterns is a design choice for instruction: an Adapter can isolate provider-specific names/JSON from course objects; a Facade can give a student one understandable operation over request, parsing and error mapping; a Decorator can wrap the same client to add one optional policy. These are candidate mappings, not claims made by the API providers.
- GitHub's official best-practices page says not to ignore repeated 4xx/5xx errors; it distinguishes validation/authorization problems from rate-limit errors. For rate limits it directs clients to wait for `retry-after` when present, or until `x-ratelimit-reset` when remaining quota is zero; otherwise wait at least a minute, use exponentially increasing waits for persistent secondary limits, and stop after a specified number of retries. It warns continued requests while limited can lead to a ban. This supports a bounded, response-aware retry teaching case for documented rate limiting, not a general rule to retry all errors. Source: [GitHub REST API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api).
- GitHub says most endpoints provide `ETag`; a conditional GET can return `304 Not Modified` when data is unchanged. The documented exemption from the primary rate limit applies when the request is correctly authorized. Therefore the cache example must not imply that an unauthenticated request receives that quota benefit. The page also says conditional requests for unsafe methods are unsupported unless a specific endpoint documents otherwise; no cache/retry behavior is inferred for writes. Same source: [GitHub REST API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api).
- Open-Meteo documents periodic source-model refresh and eventual-consistency lag between servers; this makes freshness a concrete concept but does not specify a course-appropriate cache TTL in the reviewed pages. No TTL should be invented from update cadence. Source: [Open-Meteo model updates and availability](https://open-meteo.com/en/docs/model-updates).
- Educational value is presently a reasoned candidate: students can see how a small object boundary isolates external names, HTTP errors and freshness policy. The official sources establish provider behavior; they do not establish that one pattern or this lesson depth improves learning. That claim remains for extraction/challenge and owner/course context.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Three viable context types have different fidelity and access costs: regulated Open Banking sandbox, public read-only APIs, and a deterministic local fixture. GitHub provides unusually concrete primary-source material for rate-limit-aware bounded retry and conditional GET; Open-Meteo offers a simple no-auth API; Capital One supplies the banking consent/data-access model. | Whether the bank sandbox is usable without regulated TPP onboarding or contains only synthetic data; whether a non-banking public API is acceptable for the target lesson; which smallest set of object roles teaches H3 without implying production payment safety; appropriate cache freshness is not determined by update cadence alone. |

**Sufficiency:**
- [x] External source used? — official provider docs (Capital One, GitHub, Open-Meteo).
- [x] Briefing gap closed? — mode and research scope were confirmed; economics binding gap remains separately recorded in the Briefing.
- [x] Dimensions identified? — three factors with at least three alternatives each.

Stage complete: YES
→ Coordinator gate: May this Researcher continue to Extract? Recommendation: yes; compare the three contexts and separate documented facts from course-design inferences. If no, record the owner direction before any further stage work.

