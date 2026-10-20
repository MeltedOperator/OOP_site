(() => {
  const PROGRESS_KEY = "oopoman.progress.v1";

  function emptyProgress() {
    return { version: 1, labs: {} };
  }

  function normalizeLab(value) {
    if (value === "started") {
      return { status: "started", answers: {}, checklist: {}, peerConfirmed: false, score: 0 };
    }
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;

    const answers = {};
    if (value.answers && typeof value.answers === "object" && !Array.isArray(value.answers)) {
      for (const [id, answer] of Object.entries(value.answers)) {
        if (/^q[1-9]$/.test(id) && Number.isInteger(answer) && answer >= 0 && answer <= 3) answers[id] = answer;
      }
    }

    const checklist = {};
    if (value.checklist && typeof value.checklist === "object" && !Array.isArray(value.checklist)) {
      for (const [id, checked] of Object.entries(value.checklist)) {
        if (/^c[1-9]\d*$/.test(id) && typeof checked === "boolean") checklist[id] = checked;
      }
    }

    return {
      status: value.status === "completed" ? "completed" : "started",
      answers,
      checklist,
      peerConfirmed: value.peerConfirmed === true,
      score: Number.isInteger(value.score) && value.score >= 0 ? value.score : 0,
    };
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
      for (const [id, value] of Object.entries(parsed.labs)) {
        if (!/^[1-9]$/.test(id)) continue;
        const normalized = normalizeLab(value);
        if (normalized) labs[id] = normalized;
      }
      return { value: { version: 1, labs }, writable: true };
    } catch {
      return { value: emptyProgress(), writable: false };
    }
  }

  function persist(labs) {
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify({ version: 1, labs }));
      return true;
    } catch {
      return false;
    }
  }

  function markLabStarted(id) {
    const current = readProgress();
    if (!current.writable) return false;
    const key = String(id);
    if (!current.value.labs[key]) {
      current.value.labs[key] = normalizeLab("started");
      return persist(current.value.labs);
    }
    return true;
  }

  function saveLabWork(id, answers, checklist, peerConfirmed, score) {
    const current = readProgress();
    if (!current.writable) return false;
    const key = String(id);
    const previous = current.value.labs[key] || normalizeLab("started");
    current.value.labs[key] = {
      status: previous.status,
      answers,
      checklist,
      peerConfirmed: peerConfirmed === true,
      score,
    };
    return persist(current.value.labs);
  }

  function completeLab(id, answers, checklist, peerConfirmed, score, allQuestionsAnswered) {
    if (!allQuestionsAnswered || peerConfirmed !== true) return false;
    const current = readProgress();
    if (!current.writable) return false;
    current.value.labs[String(id)] = {
      status: "completed",
      answers,
      checklist,
      peerConfirmed: true,
      score,
    };
    return persist(current.value.labs);
  }

  function resetProgress() {
    try {
      window.localStorage.removeItem(PROGRESS_KEY);
      return true;
    } catch {
      return false;
    }
  }

  window.OopomanStorage = Object.freeze({
    readProgress,
    markLabStarted,
    saveLabWork,
    completeLab,
    resetProgress,
  });
})();
