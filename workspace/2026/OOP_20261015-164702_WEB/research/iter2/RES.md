# RES — OOP_20261015-164702_WEB: Каркас сайта OOPoman

> **Current filename**: `research/iter2/RES.md`
> **Date**: 2026-10-16
> **Author**: Researcher
> **Status**: 🔬 RES — In progress
> **Parent HL**: [HL-OOP_20261015-164702_WEB](../../HL-OOP_20261015-164702_WEB.md) _(pipeline only)_
> **Mode**: Pipeline
> **Producer unit**: `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a`
> **Parent Coordinator**: `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`
> **Activation / dispatch source**: owner-direct `/tfw-research OOP_20261015-164702_WEB`; Coordinator-prepared iteration 2 pending in `research/iterations.yaml`
> **Coordination authority**: `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`
> **Originating proposer**: `{principal: roman, unit: owner:roman}`

## Research Context

Iteration 2 researched how to prepare a bounded, repeatable validation protocol for the six local-launch/storage/PDF configurations C1–C6. Its purpose was to make future H1/H2 prototype observations falsifiable without treating platform documentation or a written procedure as proof of OOPoman behavior. The assigned scope excluded code, prototype execution, stack selection and changes to frozen requirements.

## Briefing

See [iteration 2 briefing](1_briefing.md). The focused pass checked official Chrome and WHATWG/W3C documentation, translated the candidates into observable tests, and challenged the revised protocol. No prototype or application behavior was tested.

## Decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | Retain C1–C6, with C5/C6 localStorage and IndexedDB treated as separate subcases. | No cited platform documentation rules out a complete candidate; the remaining conditions require a bounded prototype test. |
| D2 | Judge offline launch and persistence from cold, same-profile observations plus resource inventory and state readback; do not treat a warm page, API availability, or an empty DevTools log as proof. | The Challenge pass identified cache, capture-window, profile and unflushed-write confounds. |
| D3 | Judge reset by before/after progress and unrelated-state values, not by a required storage API call. Cancel preserves both; Confirm resets progress and preserves unrelated state. | This tests the user-visible boundary across different storage designs. |
| D4 | For C4/C6, try intended user-directed PDF navigation with file access disabled first; grant the minimum extension file access only if the intended UI requires extension execution/read on that file page. | Chrome documents a manual grant for extension operation on file URLs, but the cited Tabs API documentation does not settle user-directed navigation to a local PDF. |

These are research protocol decisions, not choices of a winning product configuration or implementation stack.

## Open Questions

| # | Question | Status | Answer |
|---|---|---|---|
| Q1 | Which C1–C6 configuration, if any, passes in the target Windows/Chrome environment? | Open; empirical | Not tested. |
| Q2 | Does the selected OOPoman package cold-start and restart offline with all required resources local? | Open; empirical | No package/resource inventory or runtime observation exists. |
| Q3 | Does progress persist in the same profile, and do Cancel/Confirm meet the selective-reset contract? | Open; empirical | No OOPoman storage schema or reset UI was executed. |
| Q4 | Which exact PDF path and permission, if any, produce the intended experience for C4/C6? | Open; empirical | Documentation does not resolve the specific navigation and viewer behavior. |
| Q5 | What Chrome build, profile policy and test package will be used? | Open | Record these before execution; managed policy or inaccessible evidence may yield an inconclusive result. |

## Hypotheses (from HL §10)

| # | Hypothesis | HL Status | RES Status | Evidence |
|---|---|---|---|---|
| H1 | Минимальный локальный каркас может удовлетворить требованию офлайн-работы в Chrome без собственного сервера или HTTP-службы запуска. | Открыта; документы подтверждают только локальные механизмы; запуск требует проверки. | 🟡 Протокол подготовлен; продукт не проверен. | [Gather](2_gather.md) G1–G2; [Extract](3_extract.md); [Challenge](4_challenge.md) F1, F4. |
| H2 | Выбранный локальный источник страницы позволяет Chrome сохранять прогресс в профиле между офлайн-запусками и очищать только данные OOPoman без сервера и учётной записи. | Открыта; persistence и UI reset не испытаны; `file://` storage не подтверждено. | 🟡 Протокол подготовлен; продукт не проверен. | [Gather](2_gather.md) G3; [Extract](3_extract.md); [Challenge](4_challenge.md) F2, F4. |

The stages establish research/protocol sufficiency only. They do not change either hypothesis to a product pass.

## HL Update Recommendations

> The Researcher classifies recommendations and does not apply them.

### Refinements — free sections, Coordinator applies

| # | § | What to update | Source |
|---|---|---|---|
| R1 | §7.2 | Add RES iteration 2 as the protocol refinement to RES-1: repeatable offline/resource, same-profile persistence, state-based selective reset, and conditional PDF permission checks; explicitly label them as future tests, not results. | [Gather](2_gather.md), [Extract](3_extract.md), [Challenge](4_challenge.md) |
| R2 | §10 | Preserve H1/H2 as open and add a concise pointer to the challenge-tested protocol and its required prototype evidence (target build/profile, local resource inventory, full offline restart, before/after progress and unrelated sentinel, PDF path/grant). | [Challenge](4_challenge.md) F1–F4 |

### Amendment Proposals — frozen sections, resolved-ruler verdict required

No amendment proposals. Research did not produce evidence requiring a change to frozen requirements.

## Fact Candidates

No fact candidates. No human-only project fact was supplied in this iteration; observations about browser documentation and protocol design are not human knowledge candidates.

## Strategic Insights (Research)

No strategic insights. The human direction selected focused mode and bounded the investigation, but supplied no additional domain strategy to consolidate.

## Findings Map

```text
Documentation + challenged protocol
              │
              ├── makes future observations repeatable and falsifiable
              │      ├── H1: local-resource inventory + cold offline start/restart
              │      └── H2: same-profile restart + state-based Cancel/Confirm
              │
              └── does not establish product behavior
                     ├── C1–C6 remain candidates
                     └── implementation evidence is still required
```

## Iteration Status

- **Iteration:** 2 of 2 (min) / 3 (max)
- **Hypotheses tested:** H1 (documentation and protocol adequacy only; OOPoman behavior untested); H2 (documentation and protocol adequacy only; OOPoman behavior untested)
- **Hypotheses deferred:** H1 and H2 runtime outcomes, pending an authorized prototype test.
- **Gaps discovered:** target Windows/Chrome build and policy; package/resource inventory; actual cold offline start/restart; storage persistence; reset UI and data isolation; exact PDF navigation and grant needs; exact economics rollout/source binding fields unavailable (see handover).
- **Superseded decisions:** None. The adjustment corrected protocol criteria; it did not supersede a product decision.

### Open Threads (for next iteration)

No open threads for this research task. The empirical checks are future implementation/proof requirements to be scoped by `/tfw-plan`, not a reason to extend this protocol-preparation iteration.

### Recommendation

- [x] **SUFFICIENT** — proceed to `/tfw-plan` to classify these recommendations and write TS
- [ ] **MORE NEEDED**
- [ ] **BLOCKED**

This recommendation concerns the assigned research question: a bounded protocol has been prepared and adversarially checked. The Coordinator decides whether to proceed. H1/H2 remain open and must not be represented as verified product behavior.

## Conclusion

This iteration converted C1–C6 into a challenged, repeatable protocol for offline cold launch/restart, same-profile progress persistence, selective reset, and PDF access. The key contribution is a clear boundary between what official platform documentation permits and what only an executed OOPoman prototype can prove; this avoids false passes from cached pages, API presence, or a permission checkbox. All six candidates remain open, no stack is selected, and the main limitation is that no target package or runtime evidence exists. The research objective is complete, while H1/H2 product proof remains future work.

### Material handover at this return

- **Producer/unit:** `codex:thread:local:01a142ca-1834-7a52-bc0b-1208112a9d1a` (Researcher); parent Coordinator `codex:thread:local:01a142c4-8754-7c41-89cc-52429a51ac3b`.
- **Source/epoch:** owner-direct command `/tfw-research OOP_20261015-164702_WEB`, iteration 2; current source epoch `../../../TRACE.md @ eafde5305449618cf081dda08d26992ce9cbea9c`; official sources checked 2026-10-16.
- **Inspected scope:** iteration 2 briefing, Gather–Extract–Challenge records and cited official Chrome, WHATWG and W3C documentation; six configurations C1–C6.
- **Material:** this RES and its stage traces; no prototype, product code, runtime logs or measured behavior were created.
- **Uncertainty:** H1/H2 outcomes, target Chrome/policy, resource inventory, reset behavior and PDF path/grant remain unverified. Economics binding is unavailable: exact rollout `session_meta.id`/source ID, source locator, version and range start were not exposed; task identity is not substituted, no usage JSONL was created, and no measured zero is claimed. The binding-gap disposition is recorded in [briefing](1_briefing.md).
- **Continuation:** Coordinator may route to `/tfw-plan`; classify R1/R2 and turn empirical checks into future acceptance evidence. No stack or candidate is selected here.

---
*RES — OOP_20261015-164702_WEB: Каркас сайта OOPoman | 2026-10-16*
