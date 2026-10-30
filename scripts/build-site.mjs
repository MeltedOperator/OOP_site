import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
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

const browser = { window: { location: { protocol: "http:", hostname: "localhost" } } };
runInNewContext(readFileSync(path.join(root, "course", "data.js"), "utf8"), browser);
const course = browser.window.OopomanCourse;
if (!course) throw new Error("Course data did not load.");
if (!course.terminalContent) throw new Error("Course terminal content is missing.");
for (let id = 1; id <= 9; id += 1) {
  if (!course.terminalContent.lessons[id] || !course.terminalContent.labs[id]) {
    throw new Error("Lesson/lab " + id + " terminal content is incomplete.");
  }
}
const pyodideRoot = path.join(root, "course", "assets", "pyodide");
const requiredRuntimeFiles = [
  "package.json", "pyodide-lock.json", "pyodide.asm.mjs",
  "pyodide.asm.wasm", "pyodide.mjs", "python_stdlib.zip",
].sort();
const runtimeFiles = readdirSync(pyodideRoot).sort();
if (JSON.stringify(runtimeFiles) !== JSON.stringify(requiredRuntimeFiles)) {
  throw new Error("Pyodide asset directory must contain exactly the six approved files.");
}
const pyodideManifest = JSON.parse(readFileSync(path.join(pyodideRoot, "package.json"), "utf8"));
if (pyodideManifest.version !== "314.0.7") {
  throw new Error("Pyodide candidate version must remain pinned to 314.0.7.");
}
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

const umlSource = path.join(root, "architecture", "week3");
const umlOutput = path.join(output, "architecture", "week3");
mkdirSync(umlOutput, { recursive: true });
for (const name of [
  "lesson-07.svg", "lesson-08.svg", "lesson-09.svg",
  "lab-07.svg", "lab-08.svg", "lab-09.svg",
]) {
  const source = path.join(umlSource, name);
  if (!existsSync(source) || !lstatSync(source).isFile()) throw new Error(`Missing UML asset: ${name}`);
  cpSync(source, path.join(umlOutput, name));
}

console.log(`Prepared ${availableFiles.size} source PDFs, six UML diagrams and the course site in dist/.`);
