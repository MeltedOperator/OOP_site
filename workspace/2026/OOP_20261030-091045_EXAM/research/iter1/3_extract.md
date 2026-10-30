# Extract — "What do we NOT see?"

> **Mindset:** Analyst. You have the raw findings. Now build structure. Make combinations visible that nobody proposed.
> **Test:** "Does my configuration space reveal at least one combination that nobody proposed in the Briefing?"
> Parent: [HL-OOP_20261030-091045_EXAM](../../HL-OOP_20261030-091045_EXAM.md)
> Goal: дать студенту возможность сдать экзамен по курсу ООП и получить понятную оценку.

## Configuration Space

The factors are independent: item evidence mix, practical source footprint, and practical point basis. All 27 combinations are represented by the Cartesian product below; the exam split itself remains fixed at 8/7/5 and 4/6/10.

| Config | Question evidence mix | Practical source footprint | Practical point basis |
|---|---|---|---|
| C1 | Lecture | One block | Existing block total |
| C2 | Lecture | One block | Subdivided outcomes |
| C3 | Lecture | One block | New point breakdown |
| C4 | Lecture | Two blocks | Existing block total |
| C5 | Lecture | Two blocks | Subdivided outcomes |
| C6 | Lecture | Two blocks | New point breakdown |
| C7 | Lecture | Broad narrowed scenario | Existing block total |
| C8 | Lecture | Broad narrowed scenario | Subdivided outcomes |
| C9 | Lecture | Broad narrowed scenario | New point breakdown |
| C10 | Lab | One block | Existing block total |
| C11 | Lab | One block | Subdivided outcomes |
| C12 | Lab | One block | New point breakdown |
| C13 | Lab | Two blocks | Existing block total |
| C14 | Lab | Two blocks | Subdivided outcomes |
| C15 | Lab | Two blocks | New point breakdown |
| C16 | Lab | Broad narrowed scenario | Existing block total |
| C17 | Lab | Broad narrowed scenario | Subdivided outcomes |
| C18 | Lab | Broad narrowed scenario | New point breakdown |
| C19 | Cross-source | One block | Existing block total |
| C20 | Cross-source | One block | Subdivided outcomes |
| C21 | Cross-source | One block | New point breakdown |
| C22 | Cross-source | Two blocks | Existing block total |
| C23 | Cross-source | Two blocks | Subdivided outcomes |
| C24 | Cross-source | Two blocks | New point breakdown |
| C25 | Cross-source | Broad narrowed scenario | Existing block total |
| C26 | Cross-source | Broad narrowed scenario | Subdivided outcomes |
| C27 | Cross-source | Broad narrowed scenario | New point breakdown |

## Findings

### E1: A source-backed 20-question coverage map is feasible, with deliberate omissions

Candidate one-point item slots (question stems and distractors are not authored here):

| Module / count | Candidate concepts | Exact PDF references |
|---|---|---|
| M1 / 8 | (1) identity/state/behavior; (2) encapsulation and invariants; (3) Rich vs Anemic model; (4) Tell, Don’t Ask; (5) dependency vs association; (6) aggregation vs composition; (7) composition over inheritance/policy composition; (8) polymorphism and ABC/Protocol choice | Lecture 1 pp.3–4 §§2–3 and pp.6–7 printed discussion/questions; Lecture 2 pp.2–4 §§1–3; Lecture 3 pp.2–4 §§1–3 |
| M2 / 7 | (1) cohesion/coupling and SRP; (2) OCP; (3) LSP; (4) ISP; (5) DIP/DI; (6) Factory Method vs Abstract Factory; (7) Builder use case/fluent construction | Lecture 4 pp.2–4 §§1–3; Lecture 5 pp.2–4 §§1–4; Lecture 6 pp.2–4 §§1–3 |
| M3 / 5 | (1) Adapter; (2) Decorator; (3) Facade; (4) Observer vs Chain; (5) Dependency Rule and layers | Lecture 7 pp.2–4 §§1–4; Lecture 8 pp.2–4 §§1–4; Lecture 9 p.2 §1 and p.3 §2 |

The map covers each module and ties each item to taught material. It intentionally does not claim full topic coverage: Proxy, Strategy, Command, State, Singleton, architecture testing/refactoring, and several other named concepts remain possible alternate items. That is a blueprint choice, not a gap in source availability.

### E2: Three practical candidates align with 4/6/10 points, but only two are direct rubric matches

| Exam level / points | Candidate and source | Traceable outcomes | Adaptation needed |
|---|---|---|---|
| Easy / 4 | Narrow Lab 1 block 1, Route invariants (Lab 1 p.2, §3 practical tasks, block 1; rubric allocates 5 points) | Reject empty route number; reject non-positive base fare; require at least two ordered stops; reject adjacent duplicate stop names. Each behavior is stated in the PDF. | Author a 4-point atomic rubric from the 5-point block; PDF does not say which one point to omit or how to score each check. Supply minimal class/test scaffold to bound time. |
| Medium / 6 | Lab 5 block 3, DI container (Lab 5 pp.2–3, practical block 3) | `register_singleton`, `register_transient`, `resolve`, bootstrap/wiring, injection without constructing dependencies inside service classes. The block is explicitly 6 points. | Select a small dependency graph and specify lifetime oracle; exact per-point decomposition and a 60-minute subset are not given. |
| Advanced / 10 | Lab 8 block 1 + block 3, Chain and pipeline integration (Lab 8 pp.2–3, practical blocks 1 and 3) | Four validation handlers and short-circuit behavior (6-point block); pipeline runs chain, publishes telemetry on success or refusal, returns status (4-point block). | Provide the subject/observer types as starter code or restrict implementation to pipeline wiring; otherwise adds Lab 8 block 2 (another 6-point subsystem) and overshoots scope. |

Lab 8 block 4's explicit checks (stop-list skips downstream handlers; observers receive rejection metrics/security; detach works) can serve as oracle examples, but the task must state which are mandatory. The candidate 6+4 sum matches 10 without inventing a different top-level point total.

### E3: Relevant omissions and ambiguity

- **No exam-length evidence:** Lab PDFs each describe a 135-minute (three academic-hour) lab. None says how much can be completed in the 60-minute exam containing 20 additional questions. Every practical requires narrowing and timed validation by the Coordinator/author.
- **No atomic point mapping:** Lab rubrics mostly score broad blocks. Lab 1 route block is 5 points; dividing it to 4 or assigning one point to each invariant is an authored rubric, not a stated rule in the PDF.
- **Calculation ambiguity:** Lab 2 p.3 states `Итоговая сумма = (BaseRate × ZoneMultiplier × TimeMultiplier) − Discount`, while p.2 describes student discount as 50% of calculated fare and the worked example/test material applies a factor-style discounted amount. Subtracting an undefined `Discount` versus multiplying by a discount factor can produce different answers. Avoid using a numerical tariff question until the intended formula is clarified.
- **Source-map granularity:** lecture PDFs use printed section headings but not stable subsection numbering throughout. Use PDF page + printed heading in the final spec; do not cite an invented subsection number.
- **Clean Architecture test scope:** Lab 9 p.3's example test checks selected imports (`infrastructure` and `application`) while surrounding requirement describes broader domain isolation. If used, define the exact forbidden imports; Lab 9 is not needed for the proposed practical split.

### E4: The compact but non-obvious combination is lecture-only questions plus lab-only practicals

An exam can satisfy the fixed question split using lectures as direct conceptual evidence and reserve labs for code tasks. This is a clean source separation, but cross-source questions may better test application. Either choice remains supportable; the PDFs do not dictate question-evidence mix.

## Checkpoint

| Found | Remaining |
|---|---|
| The PDF set supports a traceable 8/7/5 concept map and candidate practicals at 4/6/10; Lab 5 and Lab 8 block totals align directly. | Exam author must approve the selective coverage, design per-point criteria for the 4-point adaptation, choose starter scaffolds, and validate 60-minute feasibility. Clarify Lab 2 formula before assessing its arithmetic. |

**Sufficiency:**
- [x] External source used? — Original PDF curricular sources only, in the scope named by the owner.
- [x] Briefing gap closed? — Yes for content sufficiency and mapping; no for final exam authoring decisions/time fit.
- [x] Configuration Space built from Gather dimensions? — Yes, full 27-combination product shown.

Stage complete: YES
→ Continue to Challenge under the owner-authorized single iteration.
