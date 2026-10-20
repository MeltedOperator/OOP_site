import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { runInNewContext } from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = path.join(root, "dist");
const existing = lstatSync(output, { throwIfNoEntry: false });
if (existing?.isSymbolicLink()) throw new Error("Refusing to replace a linked dist directory.");
if (existing) rmSync(output, { recursive: true, force: true });
mkdirSync(path.join(output, "course"), { recursive: true });
cpSync(path.join(root, "course"), path.join(output, "course"), { recursive: true });

const browser = { window: {} };
runInNewContext(readFileSync(path.join(root, "course", "data.js"), "utf8"), browser);
const course = browser.window.OopomanCourse;
if (!course) throw new Error("Course data did not load.");
const availableFiles = new Set(course.modules
  .filter((module) => module.available)
  .flatMap((module) => [...module.lessons, ...module.labs].map((item) => item.file)));
const materialsRoot = path.resolve(root, "OOP-course");
for (const relativeFile of availableFiles) {
  const segments = relativeFile.split("/");
  const source = path.resolve(materialsRoot, ...segments);
  if (!source.startsWith(`${materialsRoot}${path.sep}`) || path.extname(source).toLowerCase() !== ".pdf") {
    throw new Error(`Invalid course material path: ${relativeFile}`);
  }
  if (!existsSync(source)) throw new Error(`Missing course material: ${relativeFile}`);
  const destination = path.join(output, "OOP-course", ...segments);
  mkdirSync(path.dirname(destination), { recursive: true });
  cpSync(source, destination);
}

writeFileSync(path.join(output, "index.html"), `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0;url=course/index.html">
    <title>OOPoman — курс ООП</title>
  </head>
  <body>
    <p><a href="course/index.html">Перейти к курсу OOPoman</a></p>
    <script>window.location.replace("course/index.html");</script>
  </body>
</html>
`);

console.log(`Prepared ${availableFiles.size} source PDFs and the course site in dist/.`);
