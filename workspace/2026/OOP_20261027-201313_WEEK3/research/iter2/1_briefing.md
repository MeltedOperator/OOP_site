# Briefing — «Какой контекст точнее отвечает цели лабораторной 7?»
> **Mindset:** Strategist. Планируем расследование; не выбираем ответ за владельца.
> **Test:** Сравнить mock bank-account data Plaid Sandbox с keyless public financial data Bank of Canada Valet по пригодности для цели курса, доступу и одному ясному учебному контракту.
> Parent: [HL-OOP_20261027-201313_WEEK3](../../HL-OOP_20261027-201313_WEEK3.md)
> Goal: Создать согласованные учебные материалы третьей недели, чтобы студенты связывали объяснения ООП с практическими лабораторными.
> Producer unit: `codex:thread:local:01a17ed3-0b75-7c73-8252-a0711bbc8f8f`
> Parent Coordinator: `codex:thread:local:01a17ea0-4eee-7350-af2c-eec0b91464c7`
> Activation / dispatch source: Owner-direct `/tfw-research OOP_20261027-201313_WEEK3`; continuation authorized by `journal/20261028-091124__gate_answer__D2B7.md @ 53e742a28b5dd206c953e44f5cb544e32f0d8a33`.
> Coordination authority: `request.md @ 1d67e285bc8210e5a69e2081b489ec61745b6c6f`; current selection `reporting: native-gates`, `selection_ref: baseline`.
> Originating proposer: `{principal: roman, unit: owner:roman}`

## Research Plan

- **Gather:** Inspect only official Plaid and Bank of Canada documentation for domain/data scope, access/key requirements, sandbox/mock-data limits, response shape, and explicit error/freshness behavior.
- **Extract:** Compare two candidate contexts against the fixed 60-minute core, static local course and fictional local-fixture constraints; separate supported API facts from teaching inferences.
- **Challenge:** Seek counterevidence or boundaries that could reverse apparent fit; identify whether one source-specific error/freshness behavior is teachable without expanding into a pattern stack.
- **Synthesis:** Preserve the context choice and architecture as owner-reserved; recommend evidence-based refinements and carry forward unresolved tradeoffs.

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status |
|---|-----------|-----------|
| H3 | An official API/sandbox source can show the value of an object boundary and integration limits without real payments or secrets. | Open |

## Scope Intent

- **In scope:** Official first-party docs for Plaid Sandbox and Bank of Canada Valet; domain and data distinction; access/key burden; mock/test-data boundary; documented response and one relevant source-specific error/freshness behavior; fit to lab 7 and local fictional fixtures.
- **Out of scope:** Selecting the course context or class architecture; using API calls, credentials, real data, or sandbox accounts; production payment/security guidance; proving educational outcomes; broad comparisons with additional providers.

## Guiding Questions

1. Which documented data context better fits the lab’s intended demonstration of OOP integration while remaining explainable in a 60-minute required core?
2. What access/setup or test-data caveat changes how either source may be represented in a no-network local lesson?
3. Is there one source-specific error or freshness behavior that can be modeled simply, with no unsupported retry/cache guarantee?

## User Direction

The Coordinator’s immutable gate answer authorizes this bounded second iteration. It explicitly preserves the owner-reserved context and architecture choice. Iteration 1 proposed comparing Plaid Sandbox and Valet; this iteration tests that comparison against the static local-fixture constraint. The 60-minute course core and no-network boundary come from the frozen HL, not a new Researcher decision.

**Economics binding:** The exact rollout source cannot be bound because this task surface exposes no `session_meta.id` or exact source locator. No extraction was attempted; see prior iteration’s documented pre-extraction gap. Numeric usage, zero, cutoff and coverage are not asserted.

---
Stage complete: YES
