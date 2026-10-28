# Extract — «Какие платёжные контракты помещаются в фиктивную трассу?»
> **Mindset:** Аналитик. Показываем допустимые сочетания; пока не ранжируем их.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать согласованные учебные материалы третьей недели: лекции и лабораторные 7–9.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: continuation authorized by `journal/20261028-100631__gate_answer__D2BE.md @ 82d47cd007590d806dc49917104c15e6efd7bb5b`; Gather `research/iter3/2_gather.md @ eeaeb6a68bfe323764adab92f8b0183385064a1a`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; `reporting: native-gates`, `selection_ref: baseline`.
> Mode: `focused`; iteration 3, H3; pass 1 of 1.
> Observed: 2026-10-28 Asia/Qyzylorda. Rechecked official Stripe PaymentIntent/idempotency and Adyen Checkout/idempotency references; no API, account, test credential or payment was used.

## Configuration Space

Gather identified three axes: source contract, visible response boundary, and one repeat/error behavior. The conceptual 3×3×3 space has 27 rows. Below are the combinations compatible with a local, fictional, no-network course and source-specific attribution. Live API/sandbox calls are excluded by the frozen HL; a Stripe behavior is not assigned to Adyen or vice versa. These are possibilities, not provider or architecture choices.

| Config | D1: Source contract | D2: Response boundary | D3: One visible behavior |
|--------|---------------------|------------------------|---------------------------|
| C1 | Fictional local transit-bank contract; no provider compatibility claim | One `charge` result with status and fictional transaction ID | Local explicit error fixture, then stop; no retry policy |
| C2 | Fictional fixture explicitly modeled on Stripe PaymentIntent docs | PaymentIntent-like ID, amount/currency and status | Show one status/next-action state; no retry/idempotency behavior |
| C3 | Fictional fixture explicitly modeled on Stripe API v1 docs | PaymentIntent-like result | Repeat the same POST-shaped fixture with the same idempotency key and return the saved first result, including a simulated 500; label this as Stripe API v1 behavior |
| C4 | Fictional fixture explicitly modeled on Adyen Checkout docs | `pspReference` and `resultCode`, with `action` only for an additional-action flow | Show `Refused` or `Error` and stop; no retry |
| C5 | Fictional fixture explicitly modeled on Adyen Checkout docs | Adyen payment reference/result fields | Repeat with the same idempotency key and return the original result; keep Adyen key scope/retention out of the core |
| C6 | Fictional fixture explicitly modeled on Adyen Checkout docs | Adyen payment reference/result fields | Show the documented concurrent-duplicate transient-error signal separately; do not add an automatic retry loop |
| C7 | Fictional local transit-bank contract; source documents used only as comparative context | One normalized status/reference boundary | Keep both provider-specific idempotency rules in optional notes; no cross-provider “safe retry” abstraction |

**Alternative keys from Gather**

- **D1:** A = local fictional transit-bank `charge`; B = Stripe PaymentIntent; C = Adyen Checkout `/payments`.
- **D2:** A = one typed charge result; B = PaymentIntent object/status; C = `pspReference` plus `resultCode` and optional `action`.
- **D3:** A = visible error then stop; B = Stripe API v1 same-key replay semantics; C = Adyen same-key replay/concurrent-transient semantics.

## Findings

### E1: Provider-specific response objects are not interchangeable

Stripe’s PaymentIntent is a lifecycle object: creation returns its ID, amount/currency, `livemode`, and current status; the docs say attaching a payment method and confirming are subsequent steps unless confirmation is included. A fixed `charge()` method returning only a transaction ID would hide this state. Adyen `/payments` instead documents direct results with `pspReference` and `resultCode`, and a flow requiring redirect/additional action can return `action`. Adyen’s values include `Authorised`, `Refused`, `Error`, `Pending` and shopper-action states. A small local model can demonstrate one of these shapes, but merging them into a made-up shared provider class would be a design decision, not a fact found in either doc. [Stripe PaymentIntent](https://docs.stripe.com/api/payment_intents/create), [Adyen `/payments`](https://docs.adyen.com/api-explorer/Checkout/72/post/payments).

Both contracts express amounts as integers in currency minor units, but provider/account currency support and local merchant eligibility were not checked. The documentation does not confirm that either representative covers the original Kazakh tenge/acquirer scenario. No KZT compatibility or regional availability claim is made.

### E2: Idempotency provides one narrow behavior, not a generic RetryDecorator contract

Stripe API v1 repeats a saved status/body for the same key after endpoint execution starts, including 500 responses. Validation failures and concurrent conflicts are not saved; keys may be pruned after at least 24 hours, after which reuse can create a new request. Adyen returns the first response for a processed request with the same idempotency key; its documented retention is 7–14 days, and a duplicate arriving while the first is still in progress can produce a separate transient-error signal. These source/version-specific rules are materially different. Any local fixture must name the source semantics it models; a generic fictional bank must not claim universal retry safety. [Stripe idempotency](https://docs.stripe.com/api/idempotent_requests), [Adyen idempotency](https://docs.adyen.com/development-resources/api-idempotency).

A combination not proposed in Briefing is **Adyen `/payments` result boundary → local fictional fixture → one `Refused`/`Error` stop outcome, with no retry or idempotency behavior in the required route**. It preserves a single visible payment result while avoiding a second behavior policy. Another non-obvious shape is **PaymentIntent state in a fixture → teach `requires_action` as “not finished yet” rather than returning success**; it is supported by the object state, but may be too lifecycle-heavy for the core. Neither is a course decision.

### E3: Test environment proves documented simulation capability, not an offline course integration

Stripe sandboxes can simulate transactions that do not move funds; Adyen test environment has test credentials/endpoints and documents broader client/server/webhook checks. Both therefore offer source evidence for fictional examples. Neither test mode is equivalent to a static local lesson: it requires an account, credentials and external calls, all excluded by the frozen HL. The classroom fixture must not include real/test keys, card numbers, payment data, or provider calls. [Stripe Testing](https://docs.stripe.com/testing), [Adyen testing](https://docs.adyen.com/development-resources/testing).

## Checkpoint

| Found | Remaining |
|-------|-----------|
| Seven coherent local fixture shapes preserve source distinctions. Stripe uses a PaymentIntent lifecycle object and API v1 replay of the first response; Adyen uses `pspReference`/`resultCode`/optional `action` and a different idempotency window/concurrency signal. An explicit refusal/error-stop case can avoid retry policy altogether. | Whether a fictional one-step `charge()` should stay central or the course should model one provider lifecycle/result boundary; whether idempotency belongs in required time or optional depth; whether representative PSP docs adequately ground the owner’s bank-acquirer meaning and KZT setting. |

**Sufficiency:**
- [x] External source used? — rechecked official Stripe and Adyen references.
- [x] Briefing gap closed? — request/result boundary, test/account limits and one repeat behavior are mapped; course and provider choice remain open.
- [x] Configuration Space built from Gather dimensions? — compatible source/behavior combinations listed and provider-crossed semantics kept separate.

Stage complete: YES
→ Coordinator gate: Continue to Challenge (recommended; test whether the representative providers preserve the transit-bank lesson, and whether idempotency is a bounded fit beside the original retry decorator), or stop for owner direction.
