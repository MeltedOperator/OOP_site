# Gather — «Какие документы описывают узкий платёжный контракт?»
> **Mindset:** Исследователь. Карта вариантов и неизвестных, без выбора коммерческого провайдера.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать согласованные учебные материалы третьей недели: лекции и лабораторные 7–9.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: continuation authorized by `journal/20261028-100407__gate_answer__D2BD.md @ c7ce6eeda854b9efb095fae80b46a2e05051e26c`; Briefing `research/iter3/1_briefing.md @ 9c20319f64d2f93965207f89c2a6e88787322948`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; `reporting: native-gates`, `selection_ref: baseline`.
> Mode: `focused`; iteration 3, H3; pass 1 of 1.
> Observed: 2026-10-28 Asia/Qyzylorda. Official Stripe PaymentIntent/testing/idempotency docs and Adyen Checkout `/payments`/testing/idempotency docs inspected. No API or sandbox account used.

## Dimensions

| Dimension | Alt A | Alt B | Alt C |
|-----------|-------|-------|-------|
| **D1: Payment operation represented** | A local fictional legacy-bank `charge` call with a typed result | A Stripe PaymentIntent creation/status object | An Adyen Checkout `/payments` request/result |
| **D2: Response boundary shown** | Immediate success/refusal with transaction reference | Intermediate state that may need another action or confirmation | Local normalized result with status plus optional provider-specific error/action fixture |
| **D3: Behavior around uncertain/repeated POST** | Show one explicit failure and stop | Model a provider’s same-key idempotency behavior in a local fixture | Keep retry/idempotency optional and describe that providers differ in semantics/limits |

## Findings

### G1: Stripe PaymentIntent request/result and test boundary

Stripe’s documented `POST /v1/payment_intents` request has an integer `amount` in the smallest currency unit and a three-letter currency. Its response is a `PaymentIntent` object with an ID, `amount`, `currency`, and `status`; the documented sample begins at `requires_payment_method`. Creating the object alone does not complete a payment: the docs say a payment method must be attached and the intent confirmed to continue. A payment may require further action. This is a lifecycle-oriented payment object, not a one-step bank `charge()` result. [Create a PaymentIntent](https://docs.stripe.com/api/payment_intents/create).

Stripe sandboxes simulate payments using test values; test transactions do not move funds. Test API keys are required for test calls, and Stripe directs test-code authors to use a PaymentMethod ID rather than card-number details in server-side code. The course can display a fictional request/result without calling Stripe or including keys/card details. [Stripe Testing](https://docs.stripe.com/testing).

Stripe documents idempotency keys for POST operations. For API v1, it stores the first status/body after endpoint execution begins, and a repeat with that key returns the saved response, including a 500. Parameter-validation failures or conflicting concurrent requests are not stored as an idempotent result. API v1 may prune keys after they are at least 24 hours old, after which reusing a key can create a new request. These qualifications make “retry the same key” a provider/version-specific behavior, not a universal retry guarantee. [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests).

### G2: Adyen Checkout `/payments` request/result and test boundary

Adyen’s Checkout `/payments` operation sends payment parameters including amount, country/currency and shopper/payment-method details. The amount is an integer in minor units; the response depends on the flow. A direct response includes a `pspReference` and `resultCode`; a redirect or additional-action flow can instead include an `action` object. Result values include `Authorised`, `Refused`, `Error`, `Pending`, and shopper-interaction states. This shows a payment-operation boundary with a more explicit asynchronous/additional-action branch than a single success boolean. [Adyen Checkout `/payments` API reference](https://docs.adyen.com/api-explorer/Checkout/72/post/payments).

Adyen’s test environment uses a test Customer Area plus test API/client keys and its test endpoint. Its documentation asks merchants to test both client/server behavior and webhooks. That scope is broader than a local classroom fixture; no test account, keys or API calls are needed for the course model. [Adyen testing guide](https://docs.adyen.com/development-resources/testing), [API authentication](https://docs.adyen.com/development-resources/api-authentication).

Adyen documents POST idempotency through an `idempotency-key` header. When a processed request is repeated with the same key, the prior response is returned without duplication; the documented validity period is 7–14 days. A concurrent duplicate can instead produce a transient error, with a `transient-error: true` response indicating retry later with the same key; if absent or false, the docs say not to retry. This differs in detail from Stripe’s API v1 semantics and further shows that an exercise cannot present one provider’s behavior as a universal rule. [Adyen API idempotency](https://docs.adyen.com/development-resources/api-idempotency).

### G3: Scope boundary between these representatives and the source lab

Stripe and Adyen are representative payment platforms; these documents do not establish an API contract for Halyk, Kaspi, or another bank/acquirer in the original PDF. Both can ground the concept of a payment request/result, but any local fictional transit contract must remain labeled as fictional and must not imply provider compatibility. Using one small status/reference boundary is an instructional analogy; the source docs do not require Adapter, Decorator, Facade, a `charge()` protocol, or a particular class structure.

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Both providers document a POST payment operation with amount/currency and a result/reference; both offer separate test environments requiring account credentials, while docs provide deterministic test/simulated behavior. Their response boundaries and idempotency details differ. A local fixture can carry only a small fictional subset and avoid payment, network and credential use. | Whether a single generic fictional `charge` result should flatten intermediate payment states; whether the lesson needs an idempotency example or only visible error/stop; whether a representative PSP document is sufficiently close to the owner’s intended bank-gateway meaning. |

**Sufficiency:**
- [x] External source used? — official Stripe and Adyen developer documentation.
- [x] Briefing gap closed? — request/response, test/account boundary and one repeat behavior are documented; generic-vs-provider-specific modeling remains for extraction/challenge.
- [x] Dimensions identified? — three factors with three alternatives each.

Stage complete: YES
→ Coordinator gate: May this Researcher continue to Extract? Recommendation: yes; construct only source-compatible local fixture configurations, keeping each provider’s idempotency semantics separate and course/provider selection open.
