# Challenge — «Сохраняется ли смысл, если убрать сеть и ключи?»
> **Mindset:** Критик. Атакуем совместимость источников, response shape, retries и учебные ограничения.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать согласованные учебные материалы третьей недели: лекции и лабораторные 7–9.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: continuation authorized by `journal/20261028-100826__gate_answer__D2BF.md @ 9259d5252832fecec5fb3ad1ae0b0a4155f83cb6`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; `reporting: native-gates`, `selection_ref: baseline`.
> Mode: `focused`; iteration 3, H3; pass 1 of 1.
> Observed: 2026-10-28 Asia/Qyzylorda. Official Stripe and Adyen operation/idempotency pages rechecked. No API, test endpoint, account or credentials used.

## Consistency Check

**Incompatible pairs:**

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|------------|-------------|-------------|-------------|-----------------|
| D1: Source contract | Stripe PaymentIntent | D2: Response boundary | Adyen `pspReference`/`resultCode`/`action` | These are separate provider response schemas. A fixture may translate either to a fictional domain result, but must not attribute one schema to the other. |
| D1: Source contract | Adyen Checkout `/payments` | D2: Response boundary | Stripe PaymentIntent ID/status/lifecycle | Provider operations and state vocabularies differ; combining them as a single provider response would be fabricated. |
| D1: Source contract | Stripe PaymentIntent | D3: Repeat behavior | Adyen same-key retention/concurrent `transient-error` | Adyen documents a 7–14 day idempotency period and transient-error signal; these cannot be presented as Stripe API v1 rules. |
| D1: Source contract | Adyen Checkout `/payments` | D3: Repeat behavior | Stripe API v1 saved first status/body (including 500), with possible pruning after at least 24 hours | Stripe API v1 semantics do not establish Adyen behavior. |
| D1: Any provider | Actual live/test API request from the web-course lesson | D2: Delivery | Frozen static, no-network, no-credential course | Runtime provider calls, test accounts and keys contradict the approved HL. Only local fictional fixtures remain in course configurations. |

**Surviving configurations** (all use local fixtures; compatibility does not imply core suitability):

| Config | D1: Source contract | D2: Response boundary | D3: One visible behavior | Notes |
|--------|---------------------|------------------------|---------------------------|-------|
| C1 | Fictional local transit-bank contract | One typed charge result | Error fixture then stop | Best fit to existing one-call class vocabulary; it is fictional and has no exact provider compatibility. |
| C2 | Fictional fixture explicitly modeled on Stripe | PaymentIntent-like fields and status/next-action state | Show one state; no retry | Payment state can show “not finished” but is not the legacy synchronous charge response. |
| C3 | Fictional fixture explicitly modeled on Stripe API v1 | PaymentIntent-like result | Same-key replay returns saved first result, including simulated 500 | One source-specific behavior; keep version and result-retention caveat explicit. |
| C4 | Fictional fixture explicitly modeled on Adyen | `pspReference`/`resultCode`, with optional `action` | `Refused` or `Error` then stop | Keeps a clear payment response without adding retry behavior. |
| C5 | Fictional fixture explicitly modeled on Adyen | Adyen result/reference | Same-key replay returns original result | Same-key semantics remain provider-specific; optional depth. |
| C6 | Fictional fixture explicitly modeled on Adyen | Adyen result/reference | Distinct concurrent duplicate can show transient-error signal | Technically coherent but adds a second request-state case; optional-depth candidate. |
| C7 | Fictional local transit-bank contract; provider undecided | One normalized status/reference | No retry; provider-specific behaviors remain only comparative notes | Preserves owner-selected payment meaning without committing to a commercial provider. |

**Unexpected survivors**

- **C1/C7:** The fictional local bank contract survives without provider fields or live credentials. It directly matches the owner’s payment/transit choice and the course’s offline boundary, though external docs only provide comparison evidence rather than exact compatibility.
- **C4:** A fixture with a single refusal/error stop survives while omitting idempotency entirely. The original lesson’s core may not need a retry example if the owner prefers a simpler, truthful request/result boundary.

## Findings

### C1: A `charge()` returning a string hides a payment lifecycle

The source Lab 7’s `BankApiAdapter.charge()` returns a transaction ID and the terminal treats the operation as a successful tap. Stripe PaymentIntent creation can instead return an initial `requires_payment_method` status and needs an attached method/confirmation to continue; Adyen `/payments` can return an `action` for redirect/additional interaction, and statuses include `Pending` and shopper-action states as well as `Authorised`/`Refused`. A one-call local `charge()` fixture is still possible, but should be labeled as a course simplification, not a faithful full provider flow. The alternative is to show one explicit non-final state, which adds lifecycle explanation. Sources: [Stripe PaymentIntent](https://docs.stripe.com/api/payment_intents/create), [Adyen `/payments`](https://docs.adyen.com/api-explorer/Checkout/72/post/payments).

### C2: Idempotency cannot be substituted for an unrestricted retry wrapper

The source PDF’s `RetryOnFailureDecorator` retries a `NetworkTimeoutError` up to N times with exponential delay. The reviewed payment APIs document idempotency only under provider-specific conditions: repeat the same POST with the same key, preserve the request identity, and interpret the provider’s result semantics. Stripe API v1 replays the stored first status/body, including a 500; Adyen also returns the processed response for a repeated key but distinguishes an in-progress duplicate with a transient-error header. Therefore “a timeout happened” is not by itself equivalent to “repeat any payment call”; the source docs do not justify a universal retry policy. Teaching a local fixture that distinguishes same-key replay from a new request is evidence-based, but implementing retry timing, key generation, storage or production failure handling would exceed this investigation and could make the exercise look like payment-operation advice. Sources: [Stripe idempotency](https://docs.stripe.com/api/idempotent_requests), [Adyen idempotency](https://docs.adyen.com/development-resources/api-idempotency).

### C3: Sandbox evidence is not a static course capability

Stripe sandbox transactions do not move funds, but testing still uses the provider account/test API keys. Adyen’s test guide calls for a test Customer Area, API/client keys, client/server integration and test webhooks. A static fictional fixture is safer and simpler for the course, but proves only that students can read and transform a documented shape; it does not prove that the lesson executes against either vendor or that an offline fixture reproduces provider behavior. No account, token, test-card number, key, webhook or live service belongs in the web course under the frozen boundary. Sources: [Stripe Testing](https://docs.stripe.com/testing), [Adyen testing](https://docs.adyen.com/development-resources/testing).

The two sources are representative payment platforms, not evidence for a specific Halyk/Kaspi/acquirer API or local merchant eligibility. KZT availability, regional eligibility, local issuer behavior and platform fit were not checked and must not be inferred from these docs. No recommendation about production payment or compliance is made.

### C4: The one-boundary limit is the actionable course comparison

The original Lab 7 is 135 minutes and includes conversion to minor units, a bank adapter, three decorators, a facade and tests; the frozen HL limits the required course core to 60 minutes. The third iteration establishes a realistic payment request/result object boundary plus distinct documented options for one error/idempotency behavior. It does not measure student learning or prove which slice fits exactly in 60 minutes. A single translated response plus one visible status/error is structurally smaller than a full lifecycle plus retries; exact scope selection belongs to planning and the owner, not this Researcher.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Stripe and Adyen docs can ground local fictional payment fixtures but use distinct request/result and idempotency semantics. A synchronous `charge()` string hides intermediate states; a source-compatible idempotency behavior is not the same as retrying any network error. Local fictional contract with an error-stop outcome remains viable and provider-neutral. | Whether to keep the existing simple `charge()` result or show one non-final payment state; whether to include idempotency or only stop-on-error in the 60-minute core; whether the final plan may use representative PSP docs without implying Halyk/Kaspi/acquirer compatibility. Learning load and local KZT/merchant eligibility remain unmeasured/unresearched. |

**Sufficiency:**
- [x] External source used? — official Stripe and Adyen operation, test and idempotency docs rechecked.
- [x] Briefing gap closed? — request/result, credentials/test boundary and one behavior are documented; a source-grounded local lesson is possible, while vendor/local fit limits remain explicit.
- [x] Pairwise incompatibility checked? — provider schemas/idempotency rules cannot cross; live endpoint calls conflict with the static HL; all seven Extract configurations are listed after those exclusions.

Stage complete: YES
→ Coordinator gate: Continue to Synthesis (recommended; the final configured iteration can report a local fictional payment contract as feasible while preserving provider and architecture choice for planning), or provide a specific bounded correction within the approved scope.
