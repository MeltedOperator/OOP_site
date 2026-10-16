(() => {
  const app = document.querySelector("#app");
  const notice = document.querySelector("#notice");
  const resetDialog = document.querySelector("#reset-dialog");
  const { modules } = window.OopomanCourse;
  let pendingResetFocus = null;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);
  }

  function query() {
    const params = new URLSearchParams(window.location.search);
    const week = Number(params.get("week") || 0);
    const lab = Number(params.get("lab") || 0);
    return {
      view: params.get("view") || (week ? "module" : "home"),
      week: Number.isInteger(week) ? week : 0,
      lab: Number.isInteger(lab) ? lab : 0,
    };
  }

  function progressSnapshot() {
    return window.OopomanStorage.readProgress();
  }

  function currentNotice(text, kind = "info") {
    notice.textContent = text;
    notice.className = `notice notice-${kind}`;
    notice.hidden = !text;
  }

  function moduleStatus(module, progress) {
    if (!module.available) return "Закрыта";
    const started = module.labs.filter((lab) => progress.labs[String(lab.id)] === "started").length;
    return started ? `Просмотрено лабораторных: ${started}/3` : "Не начат";
  }

  function labStatus(module, lab, progress) {
    if (!module.available) return "Недоступна";
    return progress.labs[String(lab.id)] === "started" ? "Просмотрена · не завершена" : "Не начата";
  }

  function filename(file) {
    return escapeHtml(file.split("/").pop().replace(/\.pdf$/i, ""));
  }

  function sourceList(files, label) {
    return `<ul class="source-list" aria-label="${label}">${files.map((file) => `<li>${filename(file)}</li>`).join("")}</ul>`;
  }

  function moduleCard(module, progress) {
    const locked = !module.available;
    const action = locked
      ? `<a class="button button-quiet" href="?week=${module.id}" aria-label="Неделя ${module.id} закрыта">Неделя закрыта</a>`
      : `<a class="button button-primary" href="?week=${module.id}&view=module">Открыть модуль <span aria-hidden="true">↗</span></a>`;
    return `
      <article class="module-card ${locked ? "module-locked" : ""}">
        <div class="module-card-top">
          <span class="eyebrow">МОДУЛЬ 0${module.id}</span>
          <span class="availability ${locked ? "availability-locked" : "availability-open"}">${locked ? "Закрыта" : "Доступна"}</span>
        </div>
        <h3>${escapeHtml(module.title)}</h3>
        <p class="module-state">${escapeHtml(moduleStatus(module, progress))}</p>
        <div class="module-sources">
          <div><span class="source-label">Лекции</span>${sourceList(module.lessons, `Лекции модуля ${module.id}`)}</div>
          <div><span class="source-label">Лабораторные</span>${sourceList(module.labs.map((lab) => lab.file), `Лабораторные модуля ${module.id}`)}</div>
        </div>
        ${action}
      </article>`;
  }

  function renderHome(progress) {
    const started = Object.values(progress.labs).filter((state) => state === "started").length;
    return `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">КУРС · ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ</p>
          <h1>Понятный маршрут<br><span>в мир ООП.</span></h1>
          <p class="hero-text">Три модуля, девять лабораторных и спокойный темп. Начните с первой недели — следующие откроются по решению владельца курса.</p>
          <a class="button button-primary" href="?week=1&view=module">Начать первую неделю <span aria-hidden="true">↗</span></a>
        </div>
        <div class="hero-card" aria-label="Общий прогресс по модулям">
          <div class="hero-card-label">МОДУЛИ ЗАВЕРШЕНЫ</div>
          <div class="hero-count"><strong>0</strong><span>/ 3</span></div>
          <div class="progress-track"><span style="width: 0%"></span></div>
          <p>Уже просмотрено лабораторных: ${started}/9</p>
          <span class="hero-spark" aria-hidden="true">✳</span>
        </div>
      </section>
      <section class="section-heading">
        <div><p class="eyebrow">ВАШ ПЛАН</p><h2>Три недели курса</h2></div>
        <a class="text-link" href="?view=progress">Все отметки <span aria-hidden="true">→</span></a>
      </section>
      <section class="module-grid" aria-label="Модули курса">${modules.map((module) => moduleCard(module, progress)).join("")}</section>
      <section class="empty-note"><span class="empty-note-icon" aria-hidden="true">✦</span><div><strong>Сначала — структура</strong><p>Теория и практика первой недели пока оставлены пустыми. Материалы и задания появятся отдельно.</p></div></section>`;
  }

  function renderProgress(progress) {
    const labCount = Object.values(progress.labs).filter((state) => state === "started").length;
    return `
      <section class="page-intro">
        <a class="back-link" href="index.html">← К маршруту</a>
        <p class="eyebrow">ЛИЧНЫЕ ОТМЕТКИ</p>
        <h1>Ваш прогресс</h1>
        <p>Открытая лабораторная отмечается как просмотренная, но это ещё не завершение задания.</p>
      </section>
      <section class="progress-summary">
        <div><span class="eyebrow">МОДУЛИ ЗАВЕРШЕНЫ</span><strong>0 <small>/ 3</small></strong></div>
        <div><span class="eyebrow">ЛАБОРАТОРНЫЕ ПРОСМОТРЕНЫ</span><strong>${labCount} <small>/ 9</small></strong></div>
        <div class="summary-note">Пустые страницы не считаются выполненными. Закрытые недели остаются в общем знаменателе.</div>
      </section>
      <div class="reset-row">
        <div><strong>Передать профиль другому студенту?</strong><p>Сброс удалит только отметки OOPoman в этом профиле Chrome.</p></div>
        <button class="button button-danger-outline" type="button" data-action="open-reset" aria-haspopup="dialog" aria-controls="reset-dialog">Сбросить прогресс</button>
      </div>
      <section class="progress-modules" aria-label="Прогресс по модулям">
        ${modules.map((module) => `
          <article class="progress-module ${module.available ? "" : "module-locked"}">
            <div class="progress-module-heading"><div><span class="eyebrow">МОДУЛЬ 0${module.id}</span><h2>${escapeHtml(module.title)}</h2></div><span class="availability ${module.available ? "availability-open" : "availability-locked"}">${module.available ? "Не завершён" : "Закрыта"}</span></div>
            <p class="module-state">${module.available ? `Выполнено лабораторных: 0/3 · Просмотрено: ${module.labs.filter((lab) => progress.labs[String(lab.id)] === "started").length}/3` : "Доступ откроет владелец курса"}</p>
            <ol class="lab-status-list">${module.labs.map((lab) => `<li><span class="lab-number">${String(lab.id).padStart(2, "0")}</span><span>${filename(lab.file)}</span><span class="lab-state">${labStatus(module, lab, progress)}</span></li>`).join("")}</ol>
          </article>`).join("")}
      </section>
      `;
  }

  function renderModule(module, progress) {
    return `
      <section class="page-intro">
        <a class="back-link" href="index.html">← К маршруту</a>
        <p class="eyebrow">МОДУЛЬ 0${module.id} · НЕДЕЛЯ 0${module.id}</p>
        <h1>${escapeHtml(module.title)}</h1>
        <p>В этом модуле собраны три лекции и три лабораторные из исходной программы курса.</p>
      </section>
      <section class="module-detail-grid">
        <article class="detail-card">
          <div class="detail-heading"><span class="detail-icon" aria-hidden="true">01</span><div><p class="eyebrow">ТЕОРИЯ</p><h2>Лекции</h2></div></div>
          ${sourceList(module.lessons, `Лекции модуля ${module.id}`)}
          <div class="empty-content"><span aria-hidden="true">✳</span><p>Здесь пока нет конспекта. Содержание лекций не включено в эту версию курса.</p></div>
        </article>
        <article class="detail-card">
          <div class="detail-heading"><span class="detail-icon detail-icon-lime" aria-hidden="true">02</span><div><p class="eyebrow">ПРАКТИКА</p><h2>Лабораторные</h2></div></div>
          <p class="detail-copy">Откройте лабораторную, чтобы отметить её как просмотренную. Выполнение пока недоступно: заданий здесь ещё нет.</p>
          <ol class="lab-link-list">${module.labs.map((lab) => `<li><a href="?week=${module.id}&view=lab&lab=${lab.id}"><span class="lab-number">${String(lab.id).padStart(2, "0")}</span><span>${filename(lab.file)}</span><span class="lab-link-state">${labStatus(module, lab, progress)} <span aria-hidden="true">→</span></span></a></li>`).join("")}</ol>
        </article>
      </section>
      <section class="module-progress-note"><span class="availability availability-open">Неделя доступна</span><span>Прогресс модуля: 0/3 лабораторных завершено</span></section>`;
  }

  function renderLab(module, lab, progress) {
    return `
      <section class="page-intro">
        <a class="back-link" href="?week=${module.id}&view=module">← К модулю</a>
        <p class="eyebrow">МОДУЛЬ 0${module.id} · ЛАБОРАТОРНАЯ ${String(lab.id).padStart(2, "0")}</p>
        <h1>${filename(lab.file)}</h1>
        <p>Страница открыта и отмечена в вашем прогрессе.</p>
      </section>
      <section class="lab-empty-state">
        <span class="lab-empty-symbol" aria-hidden="true">✳</span>
        <p class="eyebrow">ПРАКТИЧЕСКОЕ ЗАДАНИЕ</p>
        <h2>Здесь пока пусто</h2>
        <p>Это только место для будущей практики. Задания, проверка и баллы в эту версию не входят.</p>
        <span class="lab-started-pill">Просмотрена · не завершена</span>
      </section>
      <section class="module-progress-note"><a class="text-link" href="?view=progress">Посмотреть прогресс →</a><span>Лабораторная: ${escapeHtml(labStatus(module, lab, progress))}</span></section>`;
  }

  function renderLocked(module) {
    return `
      <section class="locked-page">
        <a class="back-link" href="index.html">← К маршруту</a>
        <div class="lock-symbol" aria-hidden="true">⌑</div>
        <p class="eyebrow">МОДУЛЬ 0${module.id}</p>
        <h1>${escapeHtml(module.title)}</h1>
        <p>Эта неделя пока закрыта. Доступ к следующим модулям определяет владелец курса.</p>
        <div class="locked-sources"><span class="source-label">В модуле предусмотрены</span><span>3 лекции · 3 лабораторные</span></div>
        <a class="button button-primary" href="index.html">Вернуться к маршруту</a>
      </section>`;
  }

  function render() {
    const route = query();
    const state = progressSnapshot();
    document.querySelectorAll("[data-nav]").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === (route.view === "progress" ? "progress" : "home"));
    });

    if (route.view === "progress") {
      app.innerHTML = renderProgress(state.value);
      return;
    }

    if (route.week > 0) {
      const module = modules.find((item) => item.id === route.week);
      if (!module) {
        app.innerHTML = `<section class="locked-page"><h1>Модуль не найден</h1><a class="button button-primary" href="index.html">К маршруту</a></section>`;
        return;
      }
      if (!module.available) {
        app.innerHTML = renderLocked(module);
        return;
      }
      if (route.view === "lab") {
        const lab = module.labs.find((item) => item.id === route.lab);
        if (!lab) {
          app.innerHTML = renderModule(module, state.value);
          return;
        }
        const saved = window.OopomanStorage.markLabStarted(lab.id);
        const refreshed = progressSnapshot();
        currentNotice(saved ? "Отметка сохранена в этом профиле Chrome." : "Не удалось сохранить отметку. Проверьте настройки хранения этого профиля.", saved ? "success" : "warning");
        app.innerHTML = renderLab(module, lab, refreshed.value);
        return;
      }
      app.innerHTML = renderModule(module, state.value);
      return;
    }

    app.innerHTML = renderHome(state.value);
  }

  app.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const control = target?.closest("[data-action]");
    const action = control?.dataset.action;
    if (action === "open-reset") {
      if (resetDialog.open) return;
      pendingResetFocus = control;
      if (typeof resetDialog.showModal !== "function") {
        currentNotice("В этом браузере не удалось открыть подтверждение сброса. Прогресс не изменён.", "warning");
        return;
      }
      try {
        resetDialog.showModal();
        resetDialog.querySelector('[value="cancel"]')?.focus();
      } catch {
        currentNotice("Не удалось открыть подтверждение сброса. Прогресс не изменён.", "warning");
      }
    }
  });

  resetDialog.addEventListener("close", () => {
    if (resetDialog.returnValue === "confirm") {
      const reset = window.OopomanStorage.resetProgress();
      currentNotice(reset ? "Прогресс OOPoman сброшен." : "Не удалось сбросить прогресс в этом профиле.", reset ? "success" : "warning");
      render();
    }
    const focusTarget = pendingResetFocus?.isConnected
      ? pendingResetFocus
      : document.querySelector("[data-action='open-reset']");
    focusTarget?.focus();
    pendingResetFocus = null;
  });

  window.addEventListener("popstate", render);
  render();
})();
