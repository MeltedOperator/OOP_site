# North Star — OOPoman

## Purpose

OOPoman is a small, local-first learning site for second-year students to study object-oriented programming through a clear three-week course. Its purpose is to make the course understandable, approachable, and easy to complete from beginning to end while showing progress and earned points.

## Learner experience

- A student starts at a welcoming course card that explains the course and its expectations.
- Each week has one hour of lecture, one hour of practice, and a one-hour homework assignment.
- Lessons include theory and an interactive lab. After theory, the student answers knowledge questions; labs are interactive exercises with visible, understandable scoring criteria.
- A student can see progress and points as they move through the course.
- Week 1 is initially available. Weeks 2 and 3 remain unavailable until Roman explicitly opens them.
- The course ends with one exam. Its content and format will be designed later.

## Assessment contract

The course awards 500 points in total. Code contributes 100 points through several site-run checking stages. Eight theory questions contribute 25 points each (200 points). Three practical exercises account for the remaining 200 points; their individual point split and rubrics are still open decisions. Show the student the scoring criteria before an assessment begins.

## Product boundaries

- Run locally in a browser; do not deploy the site.
- Do not add a project-owned server, database, registration, or authentication.
- Course source files are provided in the root-level `OOP-course/` directory. Keep course content there, separate from application code; preserve the supplied files.
- Keep the interface simple, intuitive, and visually clear, with well-designed controls.
- Keep the project easy to navigate. Store UML architecture and structure diagrams under `architecture/`.
- This is a learning project for Roman to practice the TFW Full workflow as well as to build the course site.

## Success

The project succeeds when a student can understand the course at a glance, complete the currently open material in order, see why points were awarded, and use the site locally without an account or project backend. Course content remains maintainable in `OOP-course/`, and the implementation stays understandable to a second-year student.

## Open decisions

- The three practical exercises' individual points and exact rubrics.
- The final exam's content and format.
- The programming language and safe, local execution/checking approach for student code.
- Whether progress and scores persist between browser sessions.
- The detailed application architecture and build tools, to be decided before implementation.
