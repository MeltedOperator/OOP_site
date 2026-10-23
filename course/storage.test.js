"use strict";

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const PROGRESS_KEY = "oopoman.progress.v1";
const storageSource = readFileSync(path.join(__dirname, "storage.js"), "utf8");

function createStorage(initialValues = {}) {
  const values = new Map(Object.entries(initialValues));
  const localStorage = {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
  const window = { localStorage };
  vm.runInNewContext(storageSource, { window });
  return { api: window.OopomanStorage, values };
}

function progressWith(labs) {
  return JSON.stringify({ version: 1, labs });
}

test("saving another lab preserves an unsupported raw record", () => {
  const unsupported = JSON.parse('{"status":"future-v2","payload":{"__proto__":"kept","answer":[2,1]}}');
  const { api, values } = createStorage({
    [PROGRESS_KEY]: progressWith({
      1: unsupported,
      2: { status: "started", answers: { q1: 0 }, checklist: {}, peerConfirmed: false, score: 0 },
    }),
  });

  assert.equal(api.saveLabWork(2, { q1: 2 }, { c1: true }, false, 40), true);

  const saved = JSON.parse(values.get(PROGRESS_KEY));
  assert.deepStrictEqual(saved.labs["1"], unsupported);
  assert.deepStrictEqual(saved.labs["2"].answers, { q1: 2 });
  assert.deepStrictEqual(saved.labs["2"].checklist, { c1: true });
});

test("all writes to an unsupported lab refuse without changing the stored value", () => {
  const original = progressWith({ 1: { status: "future-v2", payload: { answer: 3 } } });
  for (const write of [
    (api) => api.markLabStarted(1),
    (api) => api.saveLabWork(1, { q1: 1 }, {}, true, 20),
    (api) => api.completeLab(1, { q1: 1 }, {}, true, 20, true),
  ]) {
    const { api, values } = createStorage({ [PROGRESS_KEY]: original });
    assert.deepStrictEqual(Array.from(api.readProgress().blockedLabs), ["1"]);
    assert.equal(write(api), false);
    assert.equal(values.get(PROGRESS_KEY), original);
  }
});

test("ordinary lab operations and explicit reset retain their behavior", () => {
  const { api, values } = createStorage({ unrelated: "keep" });

  assert.equal(api.markLabStarted(1), true);
  assert.equal(api.saveLabWork(1, { q1: 1 }, { c1: true }, false, 40), true);
  assert.equal(api.completeLab(1, { q1: 1 }, { c1: true }, true, 40, true), true);
  assert.equal(JSON.parse(values.get(PROGRESS_KEY)).labs["1"].status, "completed");
  assert.equal(api.resetProgress(), true);
  assert.equal(values.has(PROGRESS_KEY), false);
  assert.equal(values.get("unrelated"), "keep");
});

test("a malformed top-level progress document remains unwritable", () => {
  const original = '{"version":2,"labs":{}}';
  const { api, values } = createStorage({ [PROGRESS_KEY]: original });

  assert.equal(api.readProgress().writable, false);
  assert.equal(api.markLabStarted(1), false);
  assert.equal(values.get(PROGRESS_KEY), original);
});
