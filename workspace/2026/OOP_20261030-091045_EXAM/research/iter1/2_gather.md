# Gather — "What do we NOT know?"

> **Mindset:** Explorer. You're mapping unknown territory. Widen before you narrow. Every assumption is a question.
> **Test:** "Can I name every dimension and its alternatives without checking my sources?"
> Parent: [HL-OOP_20261030-091045_EXAM](../../HL-OOP_20261030-091045_EXAM.md)
> Goal: дать студенту возможность сдать экзамен по курсу ООП и получить понятную оценку.

## Dimensions

| Dimension | Alt A | Alt B | Alt C |
|---|---|---|---|
| Question evidence mix | Explicit lecture concepts/examples | Lab requirements or defense questions | Cross-source concept plus lab application |
| Practical source footprint | One narrowed lab block | Two lab rubric blocks whose values add to target points | A broader lab scenario substantially narrowed |
| Practical point basis | Existing explicit block point total | Explicit outcomes subdivided into authored atomic criteria | New point breakdown without a matching explicit rubric block |

## Findings

### G1: The lecture set contains a continuous, named OOP curriculum

Primary source set inspected: nine original PDFs under `OOP-course/01_Лекции/`, all pages. Page references below are PDF page numbers; section names are the printed headings.

- Lecture 1: class/object/identity/state/behavior (p.3, §2); encapsulation and invariants (pp.3–4, §3); Rich/Anemic Domain Model and Tell, Don’t Ask (pp.6–7, printed sections and control questions).
- Lecture 2: dependency and association (p.2, §1); aggregation, composition, inheritance (p.3, §1.3–2); composition over inheritance and policy composition (p.4, §3 and example).
- Lecture 3: dynamic dispatch and duck typing (p.2, §1); ABC (p.3, §2); Protocol (p.4, §3); event dispatch example (p.5).
- Lectures 4–5: cohesion/coupling, SRP and OCP (L4 pp.2–4, §§1–3); LSP (L5 p.2, §1); ISP/DIP (L5 p.3, §§2–3); dependency injection and IoC container (L5 p.4, §4).
- Lectures 6–8: Factory Method/Abstract Factory and Builder (L6 pp.2–4, §§1–3); Adapter, Decorator, Facade, Proxy (L7 pp.2–4, §§1–4); Strategy, Observer, Command, State and Chain (L8 pp.2–4, §§1–4).
- Lecture 9: Dependency Rule and layer boundaries (p.2, §1); architecture testing/refactoring (p.3, §§2–3); code smells and incremental refactoring (pp.4–5).

These are enough distinct taught concepts to source a selective 8/7/5 map. The PDFs do not state that every named concept must appear in the exam, nor do they provide a complete exam blueprint.

### G2: Labs supply concrete, observable examples and several stated scoring blocks

Primary source set inspected: nine original PDFs under `OOP-course/02_Лабораторные/`, all pages.

- Labs 1–3 operationalize invariants (Lab 1 pp.2–3, blocks 1–4), composition/policy pricing (Lab 2 pp.2–3, blocks 1–4), and typed polymorphic event dispatch (Lab 3 pp.2–3, blocks 1–4).
- Labs 4–6 provide SRP/OCP refactoring with Golden Master (Lab 4 pp.2–3, blocks 1–4), LSP/ISP and DI container (Lab 5 pp.2–3, blocks 1–4), Factory/Builder (Lab 6 pp.2–3, blocks 1–4).
- Labs 7–9 provide Adapter/Decorator/Facade (Lab 7 pp.2–4, blocks 1–4), Chain/Observer integration (Lab 8 pp.2–3, blocks 1–4), and Clean Architecture (Lab 9 pp.2–3, blocks 1–4).
- Explicit scoring blocks align especially cleanly with 6 points for Lab 5 block 3 (DI container), and 6+4 points for Lab 8 blocks 1 and 3 (Chain and pipeline integration). Lab 1 block 1 is 5 points, so a 4-point derivative requires an authored sub-rubric.

### G3: The assessment point granularity is only partly provided

Lab rubrics generally allocate points to blocks, not to each discrete criterion. Some labs specify exact test cases and expected outcomes, but the PDFs do not consistently assign a point to each case. An exam author can derive atomic criteria from the stated behaviors, but must document that decomposition; it cannot be represented as a verbatim PDF rubric.

## Checkpoint

| Found | Remaining |
|---|---|
| 18 original PDFs provide a broad, sequenced OOP concept set and nine practical contexts; several rubric blocks match 6 and 10 points by direct block sums. | Candidate mapping still needs selection; 4-point task needs point decomposition; no PDF establishes a 60-minute exam sizing or comprehensive blueprint. |

**Sufficiency:**
- [x] External source used? — Primary curricular sources are the original course PDFs named in the owner-authorized scope; no external web or excluded site/code source was used for exam-content claims.
- [x] Briefing gap closed? — The source inventory establishes what the PDFs teach and specify, but not yet whether a defensible exam can be assembled.
- [x] Dimensions identified? — Four independent mapping choices are listed.

Stage complete: YES
→ Continue to Extract under the owner-authorized single iteration.
