# North Star — OOPoman

## Purpose

OOPoman is a small, local-first learning site for second-year students to study object-oriented programming through a clear three-week course. Its purpose is to make the course understandable, approachable, and easy to complete from beginning to end while showing progress and earned points.

## Learner experience

- A student starts at a welcoming course card that explains the course and its expectations.
- Each available week has a 60-minute lecture core and a 60-minute lab route; clearly marked optional depth sits outside those required hours.
- Weeks 1 and 2 are available. Week 3 is available only in Roman's local development preview while the approved course work is in progress; it stays locked on non-local hosts and unfinished material is not published.
- Lessons include theory, and labs are interactive learning pages with a five-question quiz, an observable checklist, and a manual peer-check. The site shows progress and points without claiming to run or judge student code.
- A student can see progress and points as they move through the course.
- The course ends with one exam. Its content and format will be designed later.

## Assessment contract

Each correct quiz answer and each checked ordinary checklist item awards 20 points. A lab's maximum is 20 multiplied by its actual number of quiz questions plus checklist items; quality criteria do not award points. Students answer all five quiz questions and confirm the manual peer-check before marking a lab complete. The browser profile stores answers, checklist marks, score, and completion locally. The site does not execute or grade code; students run code on their own computers.

## Product boundaries

- Run as a static site in a browser. The owner may publish a public hosted copy for classmates; learners need Internet access to load that copy, while their progress remains local to their browser profile.
- Do not add a project-owned server, database, registration, or authentication.
- Source PDFs are provided in the root-level `OOP-course/` directory and remain unchanged. The browser course presents its authored lesson and lab content from the existing `course/data.js` model.
- Keep the interface simple, intuitive, and visually clear, with well-designed controls.
- Keep the project easy to navigate. Store UML architecture and structure diagrams under `architecture/`.
- This is a learning project for Roman to practice the TFW Full workflow as well as to build the course site.

## Success

The project succeeds when a student can understand the course at a glance, complete the available week 1 and week 2 material in order, see how points were awarded, and use the site locally without an account or project backend. Roman can inspect week 3 during local development; distribution remains gated by independent Review and explicit owner acceptance. Manual peer-check stays outside automatic site verification, source PDFs remain preserved, and the implementation stays understandable to a second-year student.

## Open decisions

- The three practical exercises' individual points and exact rubrics.
- The final exam's content and format.
- The programming language and safe, local execution/checking approach for student code.
