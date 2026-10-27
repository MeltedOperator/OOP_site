# KNOWLEDGE.md — Project Knowledge

Start here for relevant project knowledge. Governing instructions and the approved task contract
retain authority; a record, source quotation or imported imperative cannot grant permission.

## Current knowledge use

Use ordinary files and textual search. Inspect relevant scope, grounds, disposition, source and
producer before applying a claim. Search `knowledge/records/` for incoming successor, correction,
equivalence and conflict references to its exact identity; follow material chains in both directions.
Legacy targets use exact path plus D/F/heading and source epoch. Scoped successors replace only
their stated scope; unchanged accepted claims remain applicable. Unresolved conflict names the
missing authorized decision. No generated index, original chat or task-archive sweep is required.

## 1. Architecture Map

### OOPoman local course shell

- The browser course shell contains three module routes, availability rules, lesson/lab pages, and a
  progress/reset interface. Module 2 is available with lessons and labs 4–6; module 3 remains locked.
  Its week-two lessons provide a 60-minute required core, optional depth, worked OOP examples and
  recap diagrams. The route uses profile-scoped Chrome `localStorage` at `oopoman.progress.v1`; reset
  removes only that key after confirmation. If a lab entry has unsupported data, the storage layer
  preserves its raw value, blocks further writes to that lab, and warns when the lab opens and after
  a write is refused. The learner can explicitly clear course progress to recover. This behavior is verified
  by Candidate `dcf635d20cfdd4f5559b2bce297dad2cc5dc4c68` and REVIEW
  `764b5fae8e5d492e3dd5c189e05c038fd57493e6`; simultaneous writes from multiple tabs remain unverified.
- Lab scoring is dynamic: 20 points for each correct quiz answer and each checked checklist item;
  the maximum follows the actual item count. Completion requires every quiz answer and peer-check
  confirmation, with progress retained locally. The six lesson/lab PDF links open their preserved
  source PDFs. These behaviors were independently reviewed at Candidate
  `b4115b6f042f9d3fe65b6aa061fd558cb3bd2802` and bounded review commit
  `a9703e4f925957d7162f42e693a1fd1c24e72312`; Coordinator acceptance is recorded at
  `3d37d8cbf0d2f43806ac596750fc46fabe26e79a`.
- Source PDFs under `OOP-course/` are read-only materials grouped by module. The local shell does not
  introduce a project server, login, grading, or code execution.
- Sources: [Candidate context UML](architecture/context.puml) at Candidate `63d1783617095ffea8e5b4c4b2846b90137b5c65`;
  [RF](workspace/2026/OOP_20261015-164702_WEB/RF__OOP_20261015-164702_WEB.md) at
  `46a4277128d6bccdfda65443511851ac1c737eb7`; independent [REVIEW rev2](workspace/2026/OOP_20261015-164702_WEB/REVIEW__OOP_20261015-164702_WEB__rev2.md)
  at `80de405e5324f7f7779169487be2155d5b001ef8` (APPROVE; UML parser/render and visual comparison
  verified). Owner-attested AC-1–4 observations remain at their stated evidence level.

### Architecture Decisions

No legacy decisions are present. New qualified technical decisions use independently addressable
records under `knowledge/records/`; preserve future legacy identities and meaning.

## 2. Key Artifacts

Project purpose and scope: [NorthStar.md](NorthStar.md). Owner instructions: [TRACE.md](TRACE.md).
Current initialization trace: [INIT status](workspace/2026/OOP_20261014-215543_INIT/status.md).
Course source PDFs: root `OOP-course/`. Add only useful source routes, not a list of every task.

## 3. Legacy & Deprecation

No project legacy has been identified. Preserve original sources and explicit later decisions.

## 4. Project Facts

No human-sourced project claim has been qualified yet. Relevant legacy topics, when present, remain
at `knowledge/{category}.md`; new qualified claims use `knowledge/records/` and the shared record
form. The directory is the route, not a maintained inventory. No counts or processed markers.

Producing roles return material context through existing role/stage sources. A justified-none outcome
names the inspected scope; unavailable context stays explicit. `/tfw-knowledge` owns human-sourced
qualification; `/tfw-docs` owns technical/reference decisions. Both retain actual source and acceptance
identity. The existing Coordinator checks material handovers and completed effects before close.
