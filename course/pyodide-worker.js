import { loadPyodide } from "./assets/pyodide/pyodide.mjs";
import "./terminal.js";

const MAX_SOURCE_LENGTH = 12000;
const MAX_OUTPUT_LENGTH = 12000;
let runtimePromise;
let capturedOutput = "";

const LAB_ORACLES = globalThis.OopomanTerminal.labOracles;

function clamp(text) {
  const value = String(text == null ? "" : text);
  return value.length > MAX_OUTPUT_LENGTH ? value.slice(0, MAX_OUTPUT_LENGTH) + "\n… вывод ограничен …" : value;
}

function blockNetworkAfterBoot() {
  const unavailable = function () { throw new Error("Сетевые интерфейсы недоступны в учебном Worker."); };
  for (const name of ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "importScripts"]) {
    try {
      Object.defineProperty(globalThis, name, { configurable: false, enumerable: false, writable: false, value: unavailable });
    } catch {
      try { globalThis[name] = unavailable; } catch {}
    }
  }
}

async function getRuntime() {
  if (!runtimePromise) {
    runtimePromise = loadPyodide({
      indexURL: new URL("./assets/pyodide/", import.meta.url).href,
    }).then((runtime) => {
      runtime.setStdout({ batched: (text) => { capturedOutput = clamp(capturedOutput + text); } });
      runtime.setStderr({ batched: (text) => { capturedOutput = clamp(capturedOutput + text); } });
      blockNetworkAfterBoot();
      return runtime;
    });
  }
  return runtimePromise;
}

async function execute(message) {
  const runtime = await getRuntime();
  if (typeof message.source !== "string" || message.source.length > MAX_SOURCE_LENGTH) {
    throw new Error("Код отсутствует или превышает допустимый размер.");
  }
  capturedOutput = "";
  await runtime.runPythonAsync(message.source);
  const stdout = clamp(capturedOutput);
  if (message.action !== "check") return { ok: true, stdout };
  const oracle = LAB_ORACLES[message.labId];
  if (!oracle) throw new Error("Для этой страницы нет утверждённого набора автоматических проверок.");
  capturedOutput = "";
  const raw = await runtime.runPythonAsync(oracle);
  const criteria = JSON.parse(String(raw));
  if (!Array.isArray(criteria) || criteria.length === 0 || criteria.some((item) => typeof item.passed !== "boolean")) {
    throw new Error("Oracle вернул неполный результат; успех не засчитан.");
  }
  return { ok: true, stdout, criteria };
}

self.addEventListener("message", async (event) => {
  const message = event.data;
  if (!message || !Number.isInteger(message.id)) return;
  try {
    const result = await execute(message);
    self.postMessage({ id: message.id, ok: true, stdout: result.stdout, criteria: result.criteria });
  } catch (error) {
    self.postMessage({
      id: message.id,
      ok: false,
      stdout: clamp(capturedOutput),
      error: clamp(error instanceof Error ? error.message : String(error)),
    });
  }
});

