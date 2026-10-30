import { createServer } from "node:http";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HOST = "127.0.0.1";
const PORT = 8000;
const ROOT = path.resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const COURSE_EXTENSIONS = new Set([".html", ".js", ".mjs", ".css", ".svg", ".wasm", ".zip", ".json"]);
const PYODIDE_FILES = new Set([
  "package.json",
  "pyodide-lock.json",
  "pyodide.asm.mjs",
  "pyodide.asm.wasm",
  "pyodide.mjs",
  "python_stdlib.zip",
]);
const STATIC_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".wasm", "application/wasm"],
  [".zip", "application/zip"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
]);

function decodePath(pathname) {
  try {
    const decoded = decodeURIComponent(pathname);
    if (!decoded.startsWith("/") || decoded.includes("\0") || decoded.includes("\\") || decoded.includes("?") || decoded.includes("#")) return null;
    const segments = decoded.split("/").slice(1);
    if (segments.some((segment) => segment === "." || segment === ".." || segment.startsWith("."))) return null;
    return decoded || "/";
  } catch {
    return null;
  }
}

function normalizedStaticPath(pathname) {
  const decoded = decodePath(pathname);
  if (!decoded) return null;
  if (decoded === "/") return "/index.html";
  if (decoded === "/course/") return "/course/index.html";
  return decoded;
}

export function isAllowedStaticRequest(method, pathname) {
  if (method !== "GET" && method !== "HEAD") return false;
  const normalized = normalizedStaticPath(pathname);
  if (!normalized) return false;
  if (normalized === "/index.html") return true;
  if (normalized.startsWith("/course/assets/pyodide/")) {
    const name = normalized.slice("/course/assets/pyodide/".length);
    return !name.includes("/") && PYODIDE_FILES.has(name);
  }
  if (normalized.startsWith("/course/")) {
    return COURSE_EXTENSIONS.has(path.extname(normalized).toLowerCase());
  }
  if (normalized.startsWith("/OOP-course/")) {
    return path.extname(normalized).toLowerCase() === ".pdf";
  }
  if (normalized.startsWith("/architecture/week3/")) {
    return /^\/architecture\/week3\/(lesson|lab)-0[7-9]\.svg$/.test(normalized);
  }
  return false;
}

export function resolveStaticFile(root, pathname) {
  const normalized = normalizedStaticPath(pathname);
  if (!normalized) return null;
  const resolvedRoot = realpathSync(root);
  const candidate = path.resolve(resolvedRoot, "." + normalized);
  if (!candidate.startsWith(resolvedRoot + path.sep)) return null;
  try {
    const info = lstatSync(candidate);
    if (!info.isFile() || info.isSymbolicLink()) return null;
    const resolvedFile = realpathSync(candidate);
    if (!resolvedFile.startsWith(resolvedRoot + path.sep)) return null;
    return resolvedFile;
  } catch {
    return null;
  }
}

export function createStaticServer(root = ROOT) {
  return createServer((request, response) => {
    let pathname;
    try {
      pathname = new URL(request.url, "http://127.0.0.1").pathname;
    } catch {
      response.writeHead(400).end();
      return;
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
      return;
    }
    if (!isAllowedStaticRequest(request.method, pathname)) {
      response.writeHead(404).end("Not found");
      return;
    }
    const file = resolveStaticFile(root, pathname);
    if (!file) {
      response.writeHead(404).end("Not found");
      return;
    }
    const body = readFileSync(file);
    response.writeHead(200, {
      "Content-Type": STATIC_TYPES.get(path.extname(file).toLowerCase()) || "application/octet-stream",
      "Content-Length": body.length,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
    });
    if (request.method === "HEAD") response.end();
    else response.end(body);
  });
}

const invokedFile = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (invokedFile === import.meta.url) {
  const server = createStaticServer();
  server.listen(PORT, HOST, () => {
    process.stdout.write("Static course files available at http://" + HOST + ":" + PORT + "/course/\n");
  });
}

