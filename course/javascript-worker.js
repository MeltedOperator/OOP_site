const MAX_SOURCE_LENGTH = 12000;
const MAX_OUTPUT_LENGTH = 12000;
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
let capturedOutput = "";

function clamp(text) {
  const value = String(text == null ? "" : text);
  return value.length > MAX_OUTPUT_LENGTH
    ? value.slice(0, MAX_OUTPUT_LENGTH) + "\n… вывод ограничен …"
    : value;
}

function sourceLine(stack) {
  const match = String(stack || "").match(/oopoman-terminal\.js:(\d+):\d+/);
  return match ? Math.max(1, Number(match[1]) - 1) : null;
}

function format(value) {
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.name + ": " + value.message;
  if (value === undefined) return "undefined";
  if (typeof value === "bigint") return value.toString() + "n";
  try {
    const encoded = JSON.stringify(value);
    return encoded === undefined ? String(value) : encoded;
  } catch {
    return String(value);
  }
}

function capture(...values) {
  if (capturedOutput.length >= MAX_OUTPUT_LENGTH) return;
  capturedOutput = clamp(capturedOutput + values.map(format).join(" ") + "\n");
}

const capturedConsole = Object.freeze({
  log: capture,
  info: capture,
  warn: capture,
  error: capture,
  debug: capture,
});

function blockNetworkAccess() {
  const unavailable = function () {
    throw new Error("Сетевые интерфейсы недоступны в учебном Worker.");
  };
  for (const name of ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "Worker", "SharedWorker", "importScripts"]) {
    try {
      Object.defineProperty(globalThis, name, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: unavailable,
      });
    } catch {
      try { globalThis[name] = unavailable; } catch {}
    }
  }
}

blockNetworkAccess();
self.postMessage({ type: "ready", language: "javascript" });

self.addEventListener("message", async (event) => {
  const message = event.data;
  if (!message || !Number.isInteger(message.id)) return;
  capturedOutput = "";
  try {
    if (typeof message.source !== "string" || message.source.length > MAX_SOURCE_LENGTH) {
      throw new Error("Код отсутствует или превышает допустимый размер.");
    }
    if (/\bimport\s*(?:\(|[A-Za-z*{])/.test(message.source)) {
      throw new Error("Импорт модулей недоступен в учебном JavaScript-терминале.");
    }
    const run = new AsyncFunction("console", '"use strict";\n' + message.source + "\n//# sourceURL=oopoman-terminal.js");
    await run(capturedConsole);
    self.postMessage({ id: message.id, ok: true, stdout: clamp(capturedOutput) });
  } catch (error) {
    self.postMessage({
      id: message.id,
      ok: false,
      stdout: clamp(capturedOutput),
      error: clamp(error instanceof Error ? error.name + ": " + error.message : String(error)),
      lineNumber: sourceLine(error instanceof Error ? error.stack : ""),
    });
  }
});
