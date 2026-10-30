const test = require("node:test");
const assert = require("node:assert/strict");
const terminal = require("./terminal.js");

test("terminal escapes learner-visible content and limits output", () => {
  assert.equal(terminal.escapeHtml("<script>alert(1)</script>"), "&lt;script&gt;alert(1)&lt;/script&gt;");
  assert.match(terminal.limitOutput("x".repeat(13000)), /вывод ограничен/);
});

test("execution errors and malformed worker replies fail closed", () => {
  assert.deepEqual(terminal.normalizeExecutionResult({ ok: false, error: "SyntaxError", stdout: "" }), {
    ok: false, stdout: "", error: "SyntaxError",
  });
  assert.equal(terminal.normalizeExecutionResult({ ok: "true" }).ok, false);
  assert.equal(terminal.normalizeCriteriaResult(null).passed, false);
  assert.equal(terminal.normalizeCriteriaResult([]).passed, false);
  const partial = terminal.normalizeCriteriaResult([
    { id: "positive", passed: true, detail: "ok" },
    { id: "negative", passed: false, detail: "failed" },
  ]);
  assert.equal(partial.valid, true);
  assert.equal(partial.passed, false);
});

test("all eighteen course pages render terminal code without score controls", () => {
  const content = {
    title: "<Practice>", prompt: "Try it", starter: "print(1)", solution: "print(2)",
    analog: { title: "Inventory", explanation: "Check before mutation.", source: "print('unchanged')" },
  };
  for (const id of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    for (const kind of ["lesson", "lab"]) {
      const markup = terminal.renderTerminal({ kind, id, content });
      assert.match(markup, new RegExp('data-terminal-kind="' + kind + '"'));
      if (kind === "lab") assert.match(markup, new RegExp("ПРАКТИКА · МОДУЛЬ " + String(Math.ceil(id / 3)).padStart(2, "0")));
      assert.match(markup, /&lt;Practice&gt;/);
      assert.doesNotMatch(markup, /data-action="complete-lab"|data-score-earned|OopomanStorage/);
      if (kind === "lab") assert.match(markup, /Показать решение терминального упражнения/);
      if (kind === "lab") {
        assert.match(markup, /data-terminal-action="analog"/);
        assert.match(markup, /data-terminal-analog hidden/);
      }
    }
  }
});

test("every Module 1 lesson code block and coding lab step has its own runnable exercise", () => {
  const fs = require("node:fs");
  const vm = require("node:vm");
  const context = { window: { location: { protocol: "http:", hostname: "localhost" } } };
  vm.runInNewContext(fs.readFileSync("course/data.js", "utf8"), context);
  const course = context.window.OopomanCourse;
  for (const lesson of course.lessons.filter((item) => item.id <= 3)) {
    const blocks = lesson.sections.flatMap((section, sectionIndex) => section.blocks
      .map((block, blockIndex) => ({ block, section: sectionIndex + 1, index: blockIndex + 1 }))
      .filter(({ block }) => block.type === "code"));
    assert.ok(blocks.length > 0, "lesson " + lesson.id + " has source code blocks");
    for (const { section, index } of blocks) {
      const exercise = course.terminalContent.lessons[lesson.id].blockExercises[section + "-" + index];
      assert.ok(exercise && exercise.starter, "lesson " + lesson.id + " block " + section + "." + index + " maps to an editable Python exercise");
      const sourceBlock = lesson.sections[section - 1].blocks[index - 1];
      const executableLines = sourceBlock.text.split("\n").filter((line) => line.trim() && !line.trim().startsWith("#"));
      for (const line of executableLines) {
        assert.ok(exercise.starter.includes(line), "lesson " + lesson.id + " source line is retained in its runnable exercise");
      }
    }
    const jsBlocks = lesson.sections.flatMap((section, sectionIndex) => section.blocks
      .map((block, blockIndex) => ({ block, key: (sectionIndex + 1) + "-" + (blockIndex + 1) }))
      .filter(({ block }) => block.type === "example" && /console\.log|function\s|\bconst\s|\blet\s|=>/.test(block.code)));
    for (const { key } of jsBlocks) {
      const comparison = course.terminalContent.lessons[lesson.id].javascriptComparisons?.[key];
      assert.ok(comparison?.python?.starter && comparison.comparison, "JavaScript block " + lesson.id + "/" + key + " remains a comparison with adjacent runnable Python");
    }
  }

  const expectedCodingSteps = { 1: [2, 3, 4, 5], 2: [2, 3, 4, 5], 3: [1, 2, 3, 4, 5] };
  for (const lab of course.labs.filter((item) => item.id <= 3)) {
    assert.deepEqual(Object.keys(course.terminalContent.labs[lab.id].stepExercises).map(Number), expectedCodingSteps[lab.id]);
    for (const step of expectedCodingSteps[lab.id]) {
      const exercise = course.terminalContent.labs[lab.id].stepExercises[step];
      assert.ok(exercise.title && exercise.prompt && exercise.prompt.includes("Ожидаемое наблюдение:") && exercise.starter,
        "lab " + lab.id + " coding step " + step + " has an observable runnable task");
    }
  }
});

test("the actual app exposes Module 3 on hosted origins only when ready", () => {
  const fs = require("node:fs");
  const vm = require("node:vm");
  const dataSource = fs.readFileSync("course/data.js", "utf8");

  function loadCourse(protocol, hostname, source) {
    const context = { window: { location: { protocol, hostname } } };
    vm.runInNewContext(source || dataSource, context);
    return context.window.OopomanCourse;
  }

  function renderRoute(courseData, pageId, options) {
    options = options || {};
    const app = { innerHTML: "", addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; } };
    const notice = { textContent: "", className: "", hidden: true };
    const resetDialog = { open: false, addEventListener() {}, querySelector() { return null; } };
    const document = {
      body: { dataset: pageId ? { contentPage: pageId } : {} },
      title: "",
      querySelector(selector) {
        if (selector === "#app") return app;
        if (selector === "#notice") return notice;
        if (selector === "#reset-dialog") return resetDialog;
        return null;
      },
      querySelectorAll() { return []; },
    };
    const context = {
      document,
      URLSearchParams,
      Element: class Element {},
      window: {
        OopomanCourse: courseData,
        OopomanTerminal: terminal,
        OopomanStorage: {
          readProgress: () => ({ writable: true, value: { labs: {}, blockedLabs: [], writable: true } }),
          markLabStarted: () => true,
        },
        location: {
          search: options.search || "",
          protocol: options.protocol || "http:",
          hostname: options.hostname || "localhost",
        },
        addEventListener() {},
      },
    };
    vm.runInNewContext(fs.readFileSync("course/app.js", "utf8"), context);
    return app.innerHTML;
  }

  const localCourse = loadCourse("http:", "localhost");
  assert.equal(localCourse.modules.find((item) => item.id === 2).available, true);
  assert.equal(localCourse.modules.find((item) => item.id === 3).available, true);
  const localHome = renderRoute(localCourse, null);
  assert.match(localHome, /href="\?week=3&amp;view=module"/);
  const localWeek = renderRoute(localCourse, null, { search: "?week=3&view=module" });
  for (const page of ["lesson-07.html", "lesson-08.html", "lesson-09.html", "lab-07.html", "lab-08.html", "lab-09.html"]) {
    assert.ok(localWeek.includes('href="' + page + '"'), "local week route links to " + page);
  }
  for (const kind of ["lesson", "lab"]) {
    for (const id of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      const markup = renderRoute(localCourse, kind + "-" + String(id).padStart(2, "0"));
      assert.match(markup, new RegExp('data-terminal-kind="' + kind + '" data-terminal-id="' + id + '"'));
    }
  }

  for (const lesson of localCourse.lessons.filter((item) => item.id <= 3)) {
    const markup = renderRoute(localCourse, "lesson-" + String(lesson.id).padStart(2, "0"));
    for (const key of Object.keys(localCourse.terminalContent.lessons[lesson.id].blockExercises)) {
      const parts = key.split("-");
      assert.match(markup, new RegExp('data-terminal-exercise="s' + parts[0] + "b" + parts[1] + '"'));
    }
  }
  for (const labId of [1, 2, 3]) {
    const markup = renderRoute(localCourse, "lab-" + String(labId).padStart(2, "0"));
    for (const step of Object.keys(localCourse.terminalContent.labs[labId].stepExercises)) {
      assert.match(markup, new RegExp('data-terminal-exercise="step' + step + '"'));
    }
    assert.equal((markup.match(/Показать решение терминального упражнения/g) || []).length, 1);
  }
  for (const id of [4, 5, 6, 7, 8, 9]) {
    const lesson = renderRoute(localCourse, "lesson-" + String(id).padStart(2, "0"));
    const keys = Object.keys(localCourse.terminalContent.lessons[id].blockExercises);
    assert.equal(keys.length, 1, "lesson " + id + " has one aligned runnable example");
    const parts = keys[0].split("-");
    assert.match(lesson, new RegExp('data-terminal-exercise="s' + parts[0] + "b" + parts[1] + '"'));
    assert.match(localCourse.terminalContent.lessons[id].blockExercises[keys[0]].starter, /#/);
    const lab = renderRoute(localCourse, "lab-" + String(id).padStart(2, "0"));
    const stepExercises = localCourse.terminalContent.labs[id].stepExercises;
    assert.deepEqual(Object.keys(stepExercises).map(Number), [1, 2, 3, 4, 5, 6]);
    assert.equal((lab.match(/data-terminal-kind="lab"/g) || []).length, id >= 7 ? 8 : 7);
    for (const step of Object.keys(stepExercises)) assert.match(lab, new RegExp('data-terminal-exercise="step' + step + '"'));
    if (id >= 7) {
      assert.match(lab, /data-terminal-exercise="full-example"/);
      assert.doesNotMatch(lab, /Статический пример|static-code-note/);
    }
    assert.equal((lab.match(/Показать решение терминального упражнения/g) || []).length, 1);
  }

  const hosted = { protocol: "https:", hostname: "course.example" };
  const hostedCourse = loadCourse(hosted.protocol, hosted.hostname);
  assert.equal(hostedCourse.modules.find((item) => item.id === 2).available, true);
  assert.equal(hostedCourse.modules.find((item) => item.id === 3).available, true);
  const hostedHome = renderRoute(hostedCourse, null, hosted);
  assert.match(hostedHome, /href="\?week=3&amp;view=module"/);
  const hostedWeek = renderRoute(hostedCourse, null, {
    protocol: hosted.protocol,
    hostname: hosted.hostname,
    search: "?week=3&view=module",
  });
  for (const page of ["lesson-07.html", "lesson-08.html", "lesson-09.html", "lab-07.html", "lab-08.html", "lab-09.html"]) {
    assert.ok(hostedWeek.includes('href="' + page + '"'), "hosted week route links to " + page);
  }
  for (const kind of ["lesson", "lab"]) {
    for (const id of [7, 8, 9]) {
      const markup = renderRoute(hostedCourse, kind + "-" + String(id).padStart(2, "0"), hosted);
      assert.match(markup, new RegExp('data-terminal-kind="' + kind + '" data-terminal-id="' + id + '"'));
    }
  }

  const readinessMarker = "  const weekThreeReady =";
  assert.equal(dataSource.split(readinessMarker).length, 2, "fixture seam names the single production readiness predicate");
  const incompleteSource = dataSource.replace(
    readinessMarker,
    '  labs.find((lab) => lab.id === 9).example.output = "";\n\n' + readinessMarker
  );
  const incompleteCourse = loadCourse(hosted.protocol, hosted.hostname, incompleteSource);
  assert.equal(incompleteCourse.modules.find((item) => item.id === 3).available, false);
  const incompleteHome = renderRoute(incompleteCourse, null, hosted);
  assert.match(incompleteHome, /aria-label="Неделя 3 закрыта"/);
  assert.doesNotMatch(incompleteHome, /href="\?week=3&amp;view=module"/);
  const incompleteWeek = renderRoute(incompleteCourse, null, {
    protocol: hosted.protocol,
    hostname: hosted.hostname,
    search: "?week=3&view=module",
  });
  assert.match(incompleteWeek, /Эта неделя пока закрыта/);
  assert.doesNotMatch(incompleteWeek, /lesson-07\.html|lab-07\.html/);
  for (const kind of ["lesson", "lab"]) {
    for (const id of [7, 8, 9]) {
      const markup = renderRoute(incompleteCourse, kind + "-" + String(id).padStart(2, "0"), hosted);
      assert.match(markup, /Эта неделя пока закрыта/);
      assert.doesNotMatch(markup, /data-terminal-kind=/);
    }
  }
});


test("launcher allows only static course files and exact local runtime assets", async () => {
  const { isAllowedStaticRequest } = await import("../scripts/serve-course.mjs");
  assert.equal(isAllowedStaticRequest("GET", "/"), true);
  assert.equal(isAllowedStaticRequest("GET", "/course/"), true);
  assert.equal(isAllowedStaticRequest("HEAD", "/course/"), true);
  assert.equal(isAllowedStaticRequest("GET", "/course/lesson-01.html"), true);
  assert.equal(isAllowedStaticRequest("HEAD", "/course/assets/pyodide/pyodide.asm.wasm"), true);
  assert.equal(isAllowedStaticRequest("GET", "/course/assets/pyodide/extra.wasm"), false);
  assert.equal(isAllowedStaticRequest("POST", "/course/index.html"), false);
  assert.equal(isAllowedStaticRequest("PUT", "/course/index.html"), false);
  assert.equal(isAllowedStaticRequest("GET", "/course/private.txt"), false);
  assert.equal(isAllowedStaticRequest("GET", "/api/execute"), false);
  assert.equal(isAllowedStaticRequest("GET", "/%2e%2e/secret"), false);
  assert.equal(isAllowedStaticRequest("GET", "/course/%5c..%5csecret.js"), false);
  assert.equal(isAllowedStaticRequest("GET", "/architecture/week3/lab-07.svg"), true);
  assert.equal(isAllowedStaticRequest("GET", "/architecture/week3/other.svg"), false);
});

test("launcher serves the documented /course/ URL as the course landing page", async () => {
  const fs = require("node:fs");
  const http = require("node:http");
  const os = require("node:os");
  const path = require("node:path");
  const { createStaticServer } = await import("../scripts/serve-course.mjs");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "oopoman-course-route-"));
  const courseRoot = path.join(root, "course");
  fs.mkdirSync(courseRoot, { recursive: true });
  fs.writeFileSync(path.join(courseRoot, "index.html"), "<!doctype html><title>Course landing fixture</title>");
  const server = createStaticServer(root);

  try {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const response = await new Promise((resolve, reject) => {
      const request = http.get({
        hostname: "127.0.0.1",
        port: server.address().port,
        path: "/course/",
      }, (result) => {
        const chunks = [];
        result.on("data", (chunk) => chunks.push(chunk));
        result.on("end", () => resolve({
          status: result.statusCode,
          contentType: result.headers["content-type"],
          body: Buffer.concat(chunks).toString("utf8"),
        }));
      });
      request.on("error", reject);
    });
    assert.equal(response.status, 200);
    assert.equal(response.contentType, "text/html; charset=utf-8");
    assert.match(response.body, /Course landing fixture/);
  } finally {
    if (server.listening) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    fs.rmSync(root, { recursive: true, force: true });
  }
});



test("Authored executable snippets in all modules remain byte-for-byte", () => {
  const fs = require("node:fs");
  const vm = require("node:vm");
  const { execFileSync } = require("node:child_process");
  const baseline = execFileSync("git", [
    "show",
    "23637e22ce1c4242b904b7a8b9f92cfbd81f2b56:course/data.js",
  ], { encoding: "utf8" });
  function extract(source) {
    const context = { window: { location: { protocol: "http:", hostname: "localhost" } } };
    vm.runInNewContext(source, context);
    const course = context.window.OopomanCourse;
    const result = [];
    for (const lesson of course.lessons.filter((item) => item.id <= 9)) {
      for (const section of lesson.sections) {
        for (const block of section.blocks) {
          if (block.type === "code") result.push(["lesson", lesson.id, "code", block.text]);
          if (block.type === "example") result.push(["lesson", lesson.id, "example", block.code]);
        }
      }
    }
    for (const lab of course.labs.filter((item) => item.id <= 9)) {
      if (lab.example?.code) result.push(["lab", lab.id, "example", lab.example.code]);
    }
    return result;
  }
  assert.deepEqual(extract(fs.readFileSync("course/data.js", "utf8")), extract(baseline));
});

test("Pyodide fixtures pass positive cases and fail negative cases for all three labs", async () => {
  const fs = require("node:fs");
  const vm = require("node:vm");
  const path = require("node:path");
  const { pathToFileURL } = require("node:url");
  const runtimeDirectory = path.resolve("course/assets/pyodide");
  const moduleUrl = pathToFileURL(path.join(runtimeDirectory, "pyodide.mjs")).href;
  const indexUrl = runtimeDirectory + path.sep;
  const { loadPyodide } = await import(moduleUrl);
  const runtime = await loadPyodide({ indexURL: indexUrl });
  const dataContext = { window: { location: { protocol: "http:", hostname: "localhost" } } };
  vm.runInNewContext(fs.readFileSync("course/data.js", "utf8"), dataContext);
  const course = dataContext.window.OopomanCourse;
  const oracles = terminal.labOracles;

  const badSources = {
    1: [
      "from decimal import Decimal",
      "class TransitCard:",
      "    def __init__(self, balance, blocked=False): self._balance = Decimal(balance); self._blocked = blocked",
      "    @property",
      "    def balance(self): return self._balance",
      "    def pay(self, amount): self._balance -= Decimal(amount); return self._balance",
    ].join("\n"),
    2: [
      "from decimal import Decimal",
      "class FactorPolicy:",
      "    def __init__(self, factor): self.factor = Decimal(factor)",
      "    def apply(self, amount): return amount",
      "class FareCalculator:",
      "    def __init__(self, discount_policy, zone_policy, time_policy): self.policies = (discount_policy, zone_policy, time_policy)",
      "    def calculate(self, base):",
      "        total = Decimal(base)",
      "        for policy in self.policies: total = policy.apply(total)",
      "        return total.quantize(Decimal('0.01'))",
    ].join("\n"),
    3: [
      "class Dispatcher:",
      "    def __init__(self): self._handlers = {}",
      "    def subscribe(self, event_type, handler): self._handlers.setdefault(event_type, []).append(handler)",
      "    def publish(self, event):",
      "        called = 0",
      "        for handlers in self._handlers.values():",
      "            for handler in handlers:",
      "                handler.handle(event)",
      "                called += 1",
      "        return called",
    ].join("\n"),
  };

  for (const id of [1, 2, 3]) {
    for (const exercise of Object.values(course.terminalContent.lessons[id].blockExercises)) {
      await runtime.runPythonAsync(exercise.starter);
    }
    for (const exercise of Object.values(course.terminalContent.labs[id].stepExercises)) {
      await runtime.runPythonAsync(exercise.starter);
    }
    const analogy = course.terminalContent.labs[id].analog;
    assert.equal(typeof analogy.source, "string");
    await runtime.runPythonAsync("import io, sys\n_analogy_stdout_previous = sys.stdout\n_analogy_stdout = io.StringIO()\nsys.stdout = _analogy_stdout");
    await runtime.runPythonAsync(analogy.source);
    const analogyOutput = String(await runtime.runPythonAsync("_analogy_stdout.getvalue()"));
    await runtime.runPythonAsync("sys.stdout = _analogy_stdout_previous");
    assert.ok(analogyOutput.includes(analogy.expectedOutput), "lab " + id + " analogy produces its expected observation");
    await runtime.runPythonAsync(course.terminalContent.labs[id].solution);
    const positive = JSON.parse(String(await runtime.runPythonAsync(oracles[id])));
    assert.ok(positive.length > 0 && positive.every((item) => item.passed), "lab " + id + " positive fixture");

    await runtime.runPythonAsync(badSources[id]);
    const negative = JSON.parse(String(await runtime.runPythonAsync(oracles[id])));
    assert.ok(negative.length > 0 && negative.some((item) => !item.passed), "lab " + id + " negative fixture");
  }
});


test("Phase C lesson and lab terminals pass fixed Pyodide fixtures", async () => {
  const fs = require("node:fs");
  const vm = require("node:vm");
  const path = require("node:path");
  const { pathToFileURL } = require("node:url");
  const runtimeDirectory = path.resolve("course/assets/pyodide");
  const moduleUrl = pathToFileURL(path.join(runtimeDirectory, "pyodide.mjs")).href;
  const { loadPyodide } = await import(moduleUrl);
  const runtime = await loadPyodide({ indexURL: runtimeDirectory + path.sep });
  const dataContext = { window: { location: { protocol: "http:", hostname: "localhost" } } };
  vm.runInNewContext(fs.readFileSync("course/data.js", "utf8"), dataContext);
  const course = dataContext.window.OopomanCourse;
  const oracles = terminal.labOracles;

  for (const lesson of course.lessons.filter((item) => item.id >= 4)) {
    const entries = Object.values(course.terminalContent.lessons[lesson.id].blockExercises);
    assert.equal(entries.length, 1, "lesson " + lesson.id + " has one fixed terminal example");
    assert.match(entries[0].starter, /#/);
    await runtime.runPythonAsync(entries[0].starter);
  }

  for (const id of [4, 5, 6, 7, 8, 9]) {
    const content = course.terminalContent.labs[id];
    assert.ok(content.solution && content.starter && content.analog?.source && content.analog.expectedOutput);
    assert.equal(Object.keys(content.stepExercises).length, 6, "lab " + id + " has six runnable step terminals");
    for (const [step, exercise] of Object.entries(content.stepExercises)) {
      assert.ok(exercise.title && exercise.prompt.includes("Ожидаемое наблюдение:") && exercise.starter,
        "lab " + id + " step " + step + " has an observable runnable task");
      await runtime.runPythonAsync("exec(" + JSON.stringify(exercise.starter) + ", {})");
    }
    const labSource = course.labs.find((lab) => lab.id === id);
    if (labSource.example) await runtime.runPythonAsync("exec(" + JSON.stringify(labSource.example.code) + ", {})");
    await runtime.runPythonAsync(content.starter);
    const negative = JSON.parse(String(await runtime.runPythonAsync(oracles[id])));
    assert.ok(negative.some((item) => !item.passed), "lab " + id + " incomplete starter fails at least one fixed criterion");
    await runtime.runPythonAsync(content.solution);
    const positive = JSON.parse(String(await runtime.runPythonAsync(oracles[id])));
    assert.ok(positive.length > 0 && positive.every((item) => item.passed), "lab " + id + " solution passes all fixed criteria");

    const runCaptured = async (source) => String(await runtime.runPythonAsync("import io, contextlib\n_capture = io.StringIO()\nwith contextlib.redirect_stdout(_capture):\n    exec(" + JSON.stringify(source) + ", {})\n_capture.getvalue()"));
    const analogyOutput = await runCaptured(content.analog.source);
    assert.ok(analogyOutput.includes(content.analog.expectedOutput), "lab " + id + " analogy produces its stated observation");
    const mutation = {
      4: ['order = "Обед"', 'order = "Ужин"', "Ужин"],
      5: ["PaidPass(100)", "PaidPass(0)", "Отказ"],
      6: ['set_number("WO-1")', 'set_number("WO-2")', "WO-2"],
      7: ["read(150)", "read(200)", "200000 г"],
      8: ["check(True, 20, 12)", "check(False, 20, 12)", "отказ: бронь"],
      9: ['RepairRequest("BUS-17"', 'RepairRequest("BUS-22"', "BUS-22"],
    }[id];
    assert.ok(content.analog.source.includes(mutation[0]), "lab " + id + " analogy exposes a meaningful input to modify");
    const modifiedAnalogy = content.analog.source.replace(mutation[0], mutation[1]);
    const modifiedOutput = await runCaptured(modifiedAnalogy);
    assert.ok(modifiedOutput.includes(mutation[2]), "lab " + id + " analogy responds to a learner input change");
  }
});


test("Module 2 and ready Module 3 are available on local and hosted origins", () => {
  const fs = require("node:fs");
  const vm = require("node:vm");
  function modulesFor(protocol, hostname) {
    const context = { window: { location: { protocol, hostname } } };
    vm.runInNewContext(fs.readFileSync("course/data.js", "utf8"), context);
    return context.window.OopomanCourse.modules;
  }
  const remote = modulesFor("https:", "course.example");
  assert.equal(remote.find((item) => item.id === 2).available, true);
  assert.equal(remote.find((item) => item.id === 3).available, true);
  const local = modulesFor("http:", "127.0.0.1");
  assert.equal(local.find((item) => item.id === 2).available, true);
  assert.equal(local.find((item) => item.id === 3).available, true);
});
