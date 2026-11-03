# Knowledge record — TD-OOP-RT-TERMINAL-RUNTIME: OOPoman browser terminals

> One material technical decision and its completed disposition.

| Field | Value |
|---|---|
| Record identity | `TD-OOP-RT-TERMINAL-RUNTIME` |
| Publication intent | Document the accepted terminal runtime, course boundary, public Module 3 availability rule and remaining assurance limits for OOPoman. |
| Kind | technical-reference decision |
| Statement | OOPoman's browser terminals use Pyodide in a Web Worker. The static-only localhost launcher is designed to serve course/runtime assets without receiving or executing student code. The approved boundary forbids student-code network access and arbitrary URL/package installs; the trusted runtime loader may fetch resources needed by the selected runtime/package set. Offline copies are intended to use local assets without remote fallback. Terminal feedback does not change scores, progress or completion. Module 3 is available on hosted/public origins when `weekThreeReady` is true. |
| Applicability | OOPoman modules 1–3 and their 18 existing PDFs, as implemented by Candidate `31360a3483f207312e8f9b4c64249ea425500d54`. |
| Grounds and uncertainty | Owner-approved task amendments A3–A10 and Phase B/C TS gates define the selected implementation and boundaries. Phase B and Phase C returned independent APPROVE reviews; Phase C evidence includes the exact-candidate suite and build. Browser compatibility, enforcement of worker/network isolation, offline completeness, performance and hard resource limits remain unverified under AC-9; this record does not assert those properties were empirically proven. |
| Disposition | accepted |
| Source | `workspace/2026/OOP_20261029-184453_RT/HL-OOP_20261029-184453_RT.md` §12 A3–A10 @ `a900184c2749a6fa563ffbe35bf1fd7dbd4f716c`; Phase B TS rev2 @ `156ee785c7043747ab231d801240d4c68e041afa`; Phase C TS rev2 @ `dd4587ee6cad203959938318b0c9b22ed0ded623`; Candidate `31360a3483f207312e8f9b4c64249ea425500d54`; Phase B REVIEW rev4 @ `64c79c0d865b6b8624ab8b0b776043f7fdcf373a`; Phase C REVIEW rev4 @ `8e1126096d71ce5d605e333212c98d8ecb445857`. |
| Originating task and unit | `OOP_20261029-184453_RT`; task Coordinator `codex:thread:local:01a183ac-e789-7d81-a69a-00c4032013be`. |
| Producer | Task Coordinator, this task unit. |
| Qualifier | Task Coordinator, this task unit. |
| Acceptance authority | Roman, project owner; amendments A3–A10, owner-approved Phase B/C TS gates, and acceptance of Candidate `31360a3483f207312e8f9b4c64249ea425500d54`. |
| Completed effect or missing decision | Published this record and updated `KNOWLEDGE.md` and `CHANGELOG.md`. No further owner decision is owed for this accepted implementation. AC-9 remains an explicit assurance limitation. |
| Relations | No incoming technical-record relation found in `knowledge/records/`; no legacy decision was identified as superseded. |

## Source and decision context

The owner first selected Pyodide in a Worker with empirical checks, then explicitly waived Phase A as a prerequisite so the modules could be implemented from the course files and PDFs. The owner accepted disclosure that runtime/browser/isolation behavior remained unvalidated. Later owner decisions approved one combined Modules 2–3 phase and made ready Module 3 content public on the hosted Site. The final integrated Candidate implements those accepted boundaries; its independent review was post-publication and does not claim retroactive pre-publication approval.

## Relations and current use

This record describes the selected architecture and accepted assurance limits. It does not establish browser compatibility, effective hostile-code isolation, offline completeness, performance or resource ceilings. Apply those limitations anywhere this runtime is described.
