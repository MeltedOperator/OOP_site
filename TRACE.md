# TRACE — Owner Commands and Decisions

This file records material owner instructions and accepted decisions for continuity. It is a selected trace, not a chat transcript. New project commands should be added as dated entries with their outcome or current disposition.

## 2026-10-14 — Project start and INIT

**Owner:** Roman (`roman`)

- Start a new project using Trace-First Workflow Full, using the newest exact stable release. Release selected: `v3.9.2`.
- Create a local mini-LMS for second-year students learning OOP: a concise three-week course, one hour each of lecture, practice, and homework per week, plus one exam to design later.
- Do not deploy the site or add a project-owned server, database, registration, or authentication. Keep course files in a root `OOP-course/` directory that Roman will provide later.
- Provide an intuitive, simple interface; theory lessons, interactive labs, visible criteria, progress, and points. Start with Week 1 open; keep Weeks 2 and 3 closed until Roman authorizes opening them.
- Course score is 500 points: 100 for staged code checks, 8 theory questions at 25 points each, and 3 practical exercises sharing the remaining 200 points. The practical split and rubrics remain undecided.
- Keep UML structure and architecture diagrams in `architecture/`; maintain a clean, navigable project.
- Treat this semester project as Roman's practice with TFW Full. Explain TFW procedures and suggest the next step. Use only the Codex adapter and Russian project artifacts.
- Initialize TFW Full as the first task, named `Initialize New Instructional TFW` with abbreviation `INIT`; use task prefix `OOP`. Project name: `OOPoman`. Human profile: Roman (`roman`).
- INIT acceptance: set up TFW Full `v3.9.2`, create `NorthStar.md` and this `TRACE.md`, route the project README to TFW and the selected trace, and preserve product requirements and open scoring questions for later work. Do not build the site or create course materials during INIT.

**Disposition:** Recorded as the project North Star, initial task scope, and deferred design questions. INIT proceeds through research, setup, and independent review.

## 2026-10-14 — Role workspace boundary

- Roman authorizes separate role chats for TFW Full and explicitly forbids creating a Git branch or worktree for them. Role chats must use the existing project checkout.

**Disposition:** Keep role artifacts task-local and avoid overlapping edits; record this workspace constraint in INIT verification.

## 2026-10-14 — Research iteration preparation

- Roman directed the Coordinator to prepare the research iteration entry and pass the task to Researcher.

**Disposition:** Iteration control prepared under the INIT task. Researcher activation remains subject to the task's valid TFW routing and activation record.

## 2026-10-14 — Master-HL direction

- Roman directed the Coordinator to prepare and freeze a master-HL with research hypotheses and a task-context link.
- Roman's earlier authorization for a bounded Researcher role chat applies to the INIT research only; role work must follow the frozen mandate, use the shared checkout, and create no branch or worktree.

**Disposition:** Prepare the HL as a reviewable draft, then apply the TFW freeze gate to its exact content before routing Researcher.

## 2026-10-14 — INIT research environment

- Roman specified Google Chrome as the target browser environment for INIT research. Researcher should use this as a compatibility constraint and report documented limits; this does not authorize selecting the application stack or other owner-reserved product decisions.

**Disposition:** Passed to the authorized Researcher for the current INIT iteration.

## 2026-10-14 — INIT offline requirement

- Roman requires the course to work fully without an Internet connection after local launch in Google Chrome.

**Disposition:** Passed to the authorized Researcher as a binding compatibility requirement for INIT research. This does not select the application stack or persistence policy.

## 2026-10-14 — Hold Challenge pending course files

- Roman is preparing to add the course files to `OOP-course/`. Keep the open Challenge question about checking `file://` and Chrome extension compatibility pending; do not proceed with that check until Roman gives the go-ahead.

**Disposition:** Researcher is to hold at the current checkpoint and wait for Roman's explicit go-ahead.

## 2026-10-14 — INIT course-file inspection authorization

- Roman authorized the Researcher to inspect the newly added `OOP-course/` files for INIT and reiterated that the current phase is initialization only.
- Limit this inspection to understanding the supplied files and their local-use compatibility. Do not create or modify the site, transform or author course content, or make owner-reserved product decisions.

**Disposition:** Resume the bounded Researcher Challenge with the course files available as evidence; keep implementation out of scope.

## 2026-10-14 — INIT launch-mode check scope

- Roman clarified that the Researcher should check both local launch options for INIT: `file://` and Chrome extension, using the supplied `OOP-course/` files as relevant evidence.
- This remains initialization research only. Do not build an extension, implement the site, or alter/transform course files.

**Disposition:** Researcher may compare both modes for documented local/offline compatibility and report limitations to the Coordinator.
