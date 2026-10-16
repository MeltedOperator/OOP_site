(() => {
  const PROGRESS_KEY = "oopoman.progress.v1";

  function emptyProgress() {
    return { version: 1, labs: {} };
  }

  function readProgress() {
    try {
      const raw = window.localStorage.getItem(PROGRESS_KEY);
      if (!raw) return { value: emptyProgress(), writable: true };

      const parsed = JSON.parse(raw);
      if (
        !parsed ||
        parsed.version !== 1 ||
        !parsed.labs ||
        typeof parsed.labs !== "object" ||
        Array.isArray(parsed.labs)
      ) {
        return { value: emptyProgress(), writable: false };
      }

      const labs = {};
      for (const [id, state] of Object.entries(parsed.labs)) {
        if (/^[1-9]$/.test(id) && state === "started") labs[id] = state;
      }
      return { value: { version: 1, labs }, writable: true };
    } catch {
      return { value: emptyProgress(), writable: false };
    }
  }

  function markLabStarted(id) {
    const current = readProgress();
    if (!current.writable) return false;
    current.value.labs[String(id)] = "started";
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(current.value));
      return true;
    } catch {
      return false;
    }
  }

  function resetProgress() {
    try {
      window.localStorage.removeItem(PROGRESS_KEY);
      return true;
    } catch {
      return false;
    }
  }

  window.OopomanStorage = Object.freeze({ readProgress, markLabStarted, resetProgress });
})();
