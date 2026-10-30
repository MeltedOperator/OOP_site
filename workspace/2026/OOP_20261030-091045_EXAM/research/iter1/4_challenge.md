# Challenge — "What do we NOT expect?"

> **Mindset:** Critic. You built the configurations. Now attack them. Every survivor needs evidence. Every elimination needs a reason.
> **Test:** "Would my surviving configurations hold if a different researcher attacked them?"
> Parent: [HL-OOP_20261030-091045_EXAM](../../HL-OOP_20261030-091045_EXAM.md)
> Goal: дать студенту возможность сдать экзамен по курсу ООП и получить понятную оценку.

## Consistency Check

**Incompatible pairs:** No source-footprint choice is inherently incompatible with a question evidence mix or point basis. A broad practical can be narrowed; however, a new point rubric is less directly grounded than matching a stated block total. That is a quality distinction, not logical incompatibility. All 27 configurations in Extract survive as conceivable authoring choices.

| Dimension A | Alternative | Dimension B | Alternative | Why incompatible |
|---|---|---|---|---|
| None | — | — | — | None are logically impossible from the source set. |

**Surviving configurations:** C1–C27 from Extract remain possible. Stronger configurations for traceability are C10 (lab-evidence questions, one practical block, existing block points), C13 (lab questions, two blocks, existing points), and C19 (cross-source questions, one block, existing points). The actual 4-point task still needs a derived rubric whatever source choice is selected.

**Unexpected survivors:**
- **C1 (lecture-only questions, one practical block, existing block points):** It separates concept recall from practical lab performance and is fully sourceable, but item-level application may be weaker than cross-source questions.
- **C13 (lab questions, two practical blocks, existing totals):** It allows exact 6+4 points for advanced task, but mixing lab defense questions into MCQs risks overrepresenting assignment-specific detail.
- **C19 (cross-source questions, one block, existing points):** It may test transfer, although the PDFs do not provide a formal rule for combining an item across documents.

## Findings

### C1: Source availability is sufficient, but “enough” does not mean “fully specified”

Attacker's concern: the 20-item map selects only part of a large course, and the PDF set has no exam blueprint or guarantee of representative sampling. Response: H1 asks whether enough explicitly taught/assessable content exists to author the fixed allocation, not whether these exact 20 items are mandatory or exhaustive. The proposed map identifies 20 distinct taught slots and exact pages, so it meets that narrower test. The Coordinator still decides whether omissions are acceptable for the approved exam's notion of coverage.

### C2: Matching rubric totals can hide implementation overload

Attacker's concern: Lab 8's 6+4 score match may look ideal but its written lab is 135 minutes and includes observer implementation, telemetry models, tests, and a four-handler chain. Response: narrow to Chain block 1 plus pipeline block 3 and provide subject/observer dependencies, or choose another advanced task. The full lab must not be assigned verbatim in a 60-minute exam. The source supports the concepts/outcomes, not the time estimate; exact exam fit remains unverified.

### C3: Two source conflicts or underspecifications can yield unfair grading

Lab 2 p.3 formula subtracts `Discount`, but the p.2 policy describes a percentage “of calculated cost” and the example/test material treats the discount as a coefficient. A question that expects a numeric tariff answer could admit inconsistent readings. Do not use it until the Coordinator resolves the formula or phrase a concept-only question about composable policies.

Lab 9 p.3's architecture-test example rejects imports starting with `infrastructure` and `application`, while the wider task describes domain isolation from databases/frameworks. This may be a narrow sample rather than the whole rule. Avoid using Lab 9 as the advanced practical unless the forbidden-import oracle is specified exactly.

### C4: Point criteria need visible pass/fail oracles, not guessed micro-rubrics

The PDFs often provide behavior and tests but allocate points only at block level. An exam may derive a criterion list, yet the proposed one-point-per-invariant breakdown for Lab 1 is an authoring choice. It needs an explicit acceptance rule (including what counts as validation/error behavior) and each point must have an independently observable oracle. The Lab 5 and Lab 8 block totals match required levels better, but their internal per-point scoring still needs to be authored.

### C5: Current owner direction conflicts with frozen certificate promises

This is a contract issue outside H1's content sufficiency: Roman instructed that the exam proceed without certificates because they are not made and certificate work belongs in a separate future task. Current frozen HL §1 and §3 promise a local certificate; §5 includes certificate-related DoD language; §7.1 also frames the honest result as distinguishing a local certificate. The Researcher cannot change those claims. RES should propose restricting those frozen claims and route formal reconciliation; no certificate is included in the proposed question/practical map.

## Checkpoint

| Found | Remaining |
|---|---|
| The course PDFs support sufficient source material for a selective, traceable exam map; no candidate is a ready-to-copy 60-minute exam. Lab 2's formula and rubric granularity are concrete fairness risks. | Coordinator/owner must accept topic selection, settle Lab 2 if used, define point-level oracles, and bound the 60-minute practicals. Certificate instruction needs formal frozen-HL reconciliation separate from H1. |

**Sufficiency:**
- [x] External source used? — Original course PDFs; no outside technical claims were needed.
- [x] Briefing gap closed? — Yes: sufficiency is supported for content authoring, with the specified limitations and unresolved author decisions.
- [x] Pairwise incompatibility checked? Surviving configurations listed? — Yes; no logical conflicts, all 27 survive, with three traceability-oriented combinations highlighted.

Stage complete: YES
