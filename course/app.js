(() => {
  const app = document.querySelector("#app");
  const notice = document.querySelector("#notice");
  const resetDialog = document.querySelector("#reset-dialog");
  const { modules, lessons, labs } = window.OopomanCourse;
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

  function activeContentPage() {
    return document.body.dataset.contentPage || new URLSearchParams(window.location.search).get("page");
  }

  function progressSnapshot() {
    return window.OopomanStorage.readProgress();
  }

  function currentNotice(text, kind = "info") {
    notice.textContent = text;
    notice.className = `notice notice-${kind}`;
    notice.hidden = !text;
  }

  function isBlockedLab(progress, id) {
    return Array.isArray(progress.blockedLabs) && progress.blockedLabs.includes(String(id));
  }

  function blockedLabNotice() {
    return "Запись прогресса этой лабораторной не удалось безопасно прочитать или изменить. Исходные данные сохранены. Чтобы начать заново, используйте подтверждённый сброс прогресса OOPoman.";
  }

  function filename(file) {
    return escapeHtml(file.split("/").pop().replace(/\.pdf$/i, ""));
  }

  function sourceList(files, label) {
    return `<ul class="source-list" aria-label="${escapeHtml(label)}">${files.map((file) => `<li>${filename(file)}</li>`).join("")}</ul>`;
  }

  function stateFor(progress, id) {
    return progress.labs[String(id)] || { status: "not-started", answers: {}, checklist: {}, peerConfirmed: false, score: 0 };
  }

  function completedCount(progress, module) {
    return module.labs.filter((lab) => stateFor(progress, lab.id).status === "completed").length;
  }

  function startedCount(progress) {
    return Object.values(progress.labs).filter((lab) => lab.status === "started" || lab.status === "completed").length;
  }

  function moduleScore(progress, module) {
    return module.labs.reduce((total, item) => {
      const lab = labs.find((candidate) => candidate.id === item.id);
      if (!lab) return total;
      return total + scoreFor(lab, stateFor(progress, item.id)).earned;
    }, 0);
  }

  function moduleMaximum(module) {
    return module.labs.reduce((total, item) => {
      const lab = labs.find((candidate) => candidate.id === item.id);
      return total + (lab ? 20 * (lab.questions.length + lab.checklist.length) : 0);
    }, 0);
  }

  function moduleForContent(id) {
    return modules.find((module) =>
      module.lessons.some((lesson) => lesson.id === id) ||
      module.labs.some((lab) => lab.id === id)
    );
  }

  function moduleStatus(module, progress) {
    if (!module.available) return "Закрыта";
    const done = completedCount(progress, module);
    return done === module.labs.length ? "Неделя завершена" : `Завершено лабораторных: ${done}/${module.labs.length}`;
  }

  function labStatus(module, lab, progress) {
    if (!module.available) return "Недоступна";
    const content = labs.find((item) => item.id === lab.id);
    const state = stateFor(progress, lab.id);
    const score = content ? scoreFor(content, state).earned : state.score || 0;
    const maximum = content ? 20 * (content.questions.length + content.checklist.length) : 0;
    if (state.status === "completed") return `Завершена · ${score}/${maximum}`;
    if (state.status === "started") return `В процессе · ${score}/${maximum}`;
    return `Не начата · 0/${maximum}`;
  }

  function moduleCard(module, progress) {
    const locked = !module.available;
    const action = locked
      ? `<a class="button button-quiet" href="?week=${module.id}" aria-label="Неделя ${module.id} закрыта">Неделя закрыта</a>`
      : `<a class="button button-primary" href="?week=${module.id}&amp;view=module">Открыть модуль <span aria-hidden="true">↗</span></a>`;
    const contentLinks = locked
      ? `<div><span class="source-label">Лекции</span>${sourceList(module.lessons.map((item) => item.file), `Лекции модуля ${module.id}`)}</div><div><span class="source-label">Лабораторные</span>${sourceList(module.labs.map((item) => item.file), `Лабораторные модуля ${module.id}`)}</div>`
      : `<div><span class="source-label">Теория</span><ol class="module-page-list">${module.lessons.map((item) => `<li><a href="${escapeHtml(item.page)}">${String(item.id).padStart(2, "0")} · ${escapeHtml(item.content.title)}</a></li>`).join("")}</ol></div><div><span class="source-label">Практика</span><ol class="module-page-list">${module.labs.map((item) => `<li><a href="${escapeHtml(item.page)}">${String(item.id).padStart(2, "0")} · ${escapeHtml(item.content.title)} <span>${escapeHtml(labStatus(module, item, progress))}</span></a></li>`).join("")}</ol></div>`;
    const points = locked ? "Баллы появятся после открытия недели." : `Баллы недели ${module.id}: ${moduleScore(progress, module)}/${moduleMaximum(module)}`;
    return `
      <article class="module-card ${locked ? "module-locked" : ""}">
        <div class="module-card-top"><span class="eyebrow">МОДУЛЬ 0${module.id}</span><span class="availability ${locked ? "availability-locked" : "availability-open"}">${locked ? "Закрыта" : "Доступна"}</span></div>
        <h3>${escapeHtml(module.title)}</h3>
        <p class="module-state">${escapeHtml(moduleStatus(module, progress))}</p>
        <p class="module-points">${escapeHtml(points)}</p>
        <div class="module-sources">${contentLinks}</div>
        ${action}
      </article>`;
  }

  function renderHome(progress) {
    const doneModules = modules.filter((module) => module.available && completedCount(progress, module) === module.labs.length).length;
    const started = startedCount(progress);
    const percent = Math.round((doneModules / modules.length) * 100);
    return `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">КУРС · ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ</p>
          <h1>Понятный маршрут<br><span>в мир ООП.</span></h1>
          <p class="hero-text">Изучайте теорию, выполняйте лабораторные у себя и проходите взаимную проверку. Недели 1 и 2 открыты; неделя 3 пока закрыта.</p>
          <a class="button button-primary" href="?week=1&amp;view=module">Начать первую неделю <span aria-hidden="true">↗</span></a>
        </div>
        <div class="hero-card" aria-label="Общий прогресс по модулям">
          <div class="hero-card-label">МОДУЛИ ЗАВЕРШЕНЫ</div>
          <div class="hero-count"><strong>${doneModules}</strong><span>/ ${modules.length}</span></div>
          <div class="progress-track"><span style="width: ${percent}%"></span></div>
          <p>Лабораторных с прогрессом: ${started}/9</p>
          <span class="hero-spark" aria-hidden="true">✳</span>
        </div>
      </section>
      <section class="section-heading"><div><p class="eyebrow">ВАШ ПЛАН</p><h2>Три недели курса</h2></div><a class="text-link" href="?view=progress">Мой прогресс <span aria-hidden="true">→</span></a></section>
      <section class="module-grid" aria-label="Модули курса">${modules.map((module) => moduleCard(module, progress)).join("")}</section>
      <section class="empty-note"><span class="empty-note-icon" aria-hidden="true">✦</span><div><strong>Учитесь в своём темпе</strong><p>Код запускается на вашем компьютере. Сайт хранит только ваши ответы, отметки, баллы и завершённость в этом профиле браузера.</p></div></section>`;
  }

  function renderProgress(progress) {
    const doneModules = modules.filter((module) => module.available && completedCount(progress, module) === module.labs.length).length;
    const visited = startedCount(progress);
    const moduleRows = modules.map((module) => {
      const done = completedCount(progress, module);
      const maximum = moduleMaximum(module);
      const points = module.available ? `${moduleScore(progress, module)} / ${maximum} баллов` : "Баллы появятся после открытия недели";
      return `
        <article class="progress-module ${module.available ? "" : "module-locked"}">
          <div class="progress-module-heading"><div><span class="eyebrow">МОДУЛЬ 0${module.id}</span><h2>${escapeHtml(module.title)}</h2></div><span class="availability ${module.available ? "availability-open" : "availability-locked"}">${module.available ? moduleStatus(module, progress) : "Закрыта"}</span></div>
          <p class="module-state">${module.available ? `Выполнено лабораторных: ${done}/${module.labs.length} · ${points}` : "Доступ откроет владелец курса"}</p>
          <ol class="lab-status-list">${module.labs.map((lab) => `<li><span class="lab-number">${String(lab.id).padStart(2, "0")}</span><span>${lab.content ? escapeHtml(lab.content.title) : filename(lab.file)}</span><span class="lab-state">${escapeHtml(labStatus(module, lab, progress))}</span></li>`).join("")}</ol>
        </article>`;
    }).join("");
    return `
      <section class="page-intro"><a class="back-link" href="index.html">← К маршруту</a><p class="eyebrow">ЛИЧНЫЕ ОТМЕТКИ</p><h1>Ваш прогресс</h1><p>Баллы и завершённость показываются отдельно для каждой доступной лабораторной.</p></section>
      <section class="progress-summary"><div><span class="eyebrow">МОДУЛИ ЗАВЕРШЕНЫ</span><strong>${doneModules} <small>/ ${modules.length}</small></strong></div><div><span class="eyebrow">ЛАБОРАТОРНЫХ С ПРОГРЕССОМ</span><strong>${visited} <small>/ 9</small></strong></div><div class="summary-note">Прогресс хранится локально в ключе OOPoman этого профиля браузера. Код сайта не запускает и peer-проверку не подтверждает.</div></section>
      <div class="reset-row"><div><strong>Передать профиль другому студенту?</strong><p>Сброс удалит только отметки OOPoman в этом профиле браузера.</p></div><button class="button button-danger-outline" type="button" data-action="open-reset" aria-haspopup="dialog" aria-controls="reset-dialog">Сбросить прогресс</button></div>
      <section class="progress-modules" aria-label="Прогресс по модулям">${moduleRows}</section>`;
  }

  function renderModule(module, progress) {
    const lessonLinks = module.lessons.map((lesson) => `
      <li><a class="content-link" href="${escapeHtml(lesson.page)}"><span class="lab-number">${String(lesson.id).padStart(2, "0")}</span><span><strong>${lesson.content ? escapeHtml(lesson.content.title) : filename(lesson.file)}</strong><small>${lesson.content ? escapeHtml(lesson.content.subtitle) : "Материал появится после открытия недели"}</small></span><span class="content-link-action">Открыть →</span></a></li>`).join("");
    const labLinks = module.labs.map((lab) => `
      <li><a class="content-link" href="${escapeHtml(lab.page)}"><span class="lab-number">${String(lab.id).padStart(2, "0")}</span><span><strong>${lab.content ? escapeHtml(lab.content.title) : filename(lab.file)}</strong><small>${lab.content ? escapeHtml(lab.content.subtitle) : "Материал появится после открытия недели"}</small></span><span class="content-link-action">${escapeHtml(labStatus(module, lab, progress))} →</span></a></li>`).join("");
    return `
      <section class="page-intro"><a class="back-link" href="index.html">← К маршруту</a><p class="eyebrow">МОДУЛЬ 0${module.id} · НЕДЕЛЯ 0${module.id}</p><h1>${escapeHtml(module.title)}</h1><p>Три пары теории и практики, связанные по темам и исходным материалам.</p></section>
      <section class="module-content-grid">
        <article class="detail-card"><div class="detail-heading"><span class="detail-icon" aria-hidden="true">01</span><div><p class="eyebrow">ТЕОРИЯ · 60 МИНУТ</p><h2>Лекции</h2></div></div><ol class="content-link-list">${lessonLinks}</ol></article>
        <article class="detail-card"><div class="detail-heading"><span class="detail-icon detail-icon-lime" aria-hidden="true">02</span><div><p class="eyebrow">ПРАКТИКА · 60 МИНУТ</p><h2>Лабораторные</h2></div></div><p class="detail-copy">Выполняйте код локально. Сайт показывает инструкции, квиз и критерии взаимопроверки.</p><ol class="content-link-list">${labLinks}</ol></article>
      </section>
      <section class="module-progress-note"><span class="availability availability-open">Неделя доступна</span><span>Выполнено лабораторных: ${completedCount(progress, module)}/${module.labs.length} · Баллы: ${moduleScore(progress, module)}/${moduleMaximum(module)}</span></section>`;
  }

  function renderLocked(module) {
    return `<section class="locked-page"><a class="back-link" href="index.html">← К маршруту</a><div class="lock-symbol" aria-hidden="true">⌑</div><p class="eyebrow">МОДУЛЬ 0${module.id}</p><h1>${escapeHtml(module.title)}</h1><p>Эта неделя пока закрыта. Доступ к следующим модулям определяет владелец курса.</p><div class="locked-sources"><span class="source-label">В модуле предусмотрены</span><span>3 лекции · 3 лабораторные</span></div><a class="button button-primary" href="index.html">Вернуться к маршруту</a></section>`;
  }

  function renderBlocks(blocks) {
    return blocks.map((block) => {
      if (block.type === "list") return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      if (block.type === "code") return `<pre><code>${escapeHtml(block.text)}</code></pre>`;
      if (block.type === "callout") return `<aside class="content-callout">${escapeHtml(block.text)}</aside>`;
      if (block.type === "example") {
        return `<article class="code-example" aria-label="${escapeHtml(block.title)}">
          <header class="code-example-heading"><p class="eyebrow">РАЗОБРАННЫЙ ПРИМЕР</p><h3>${escapeHtml(block.title)}</h3><p>${escapeHtml(block.goal)}</p></header>
          <pre><code>${escapeHtml(block.code)}</code></pre>
          <dl class="example-breakdown"><div><dt>Ожидаемое поведение</dt><dd>${escapeHtml(block.expected)}</dd></div><div><dt>Решение в коде</dt><dd>${escapeHtml(block.decision)}</dd></div><div><dt>Связь с ООП</dt><dd>${escapeHtml(block.oop)}</dd></div></dl>
        </article>`;
      }
      if (block.type === "diagram") {
        const renderSide = (side) => `<section class="oop-diagram-panel"><h3>${escapeHtml(side.label)}</h3><ol>${side.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></section>`;
        return `<figure class="oop-diagram" aria-label="${escapeHtml(block.title)}"><figcaption><span class="eyebrow">СХЕМА ОТНОШЕНИЙ</span><strong>${escapeHtml(block.title)}</strong></figcaption><div class="oop-diagram-compare">${renderSide(block.before)}<span class="oop-diagram-arrow" aria-hidden="true">→</span>${renderSide(block.after)}</div><p class="oop-diagram-caption">${escapeHtml(block.caption)}</p></figure>`;
      }
      if (block.type === "exercise") {
        return `<aside class="self-check"><p class="eyebrow">САМОПРОВЕРКА</p><h3>${escapeHtml(block.title)}</h3><p>${escapeHtml(block.prompt)}</p><p class="self-check-criterion"><strong>Критерий проверки:</strong> ${escapeHtml(block.criterion)}</p></aside>`;
      }
      return `<p>${escapeHtml(block.text)}</p>`;
    }).join("");
  }
  function renderExtension(extension) {
    if (!extension) return "";
    return `<aside class="optional-section"><p class="eyebrow">НЕОБЯЗАТЕЛЬНОЕ УГЛУБЛЕНИЕ</p><h2>${escapeHtml(extension.title)}</h2><p>${escapeHtml(extension.detail)}</p></aside>`;
  }

  function sourceHref(file) {
    const encodedPath = file.split("/").map((part) => encodeURIComponent(part)).join("/");
    return `../OOP-course/${encodedPath}`;
  }
  function renderLesson(lesson) {
    const pairedLab = labs.find((lab) => lab.id === lesson.labId);
    const module = moduleForContent(lesson.id);
    return `
      <article class="content-page" data-module-id="${module.id}">
        <section class="page-intro"><a class="back-link" href="index.html?week=${module.id}&amp;view=module">← К модулю ${module.id}</a><p class="eyebrow">ТЕОРИЯ · МОДУЛЬ ${String(module.id).padStart(2, "0")} · ${String(lesson.id).padStart(2, "0")}</p><h1>${escapeHtml(lesson.title)}</h1><p>${escapeHtml(lesson.subtitle)}</p>${lesson.outcome ? `<aside class="lesson-outcome"><p class="eyebrow">К КОНЦУ УРОКА ВЫ СМОЖЕТЕ</p><p>${escapeHtml(lesson.outcome)}</p></aside>` : ""}<div class="content-meta"><span>${lesson.minutes} минут</span><a class="text-link" href="${escapeHtml(sourceHref(lesson.file))}" target="_blank" rel="noopener">Открыть исходный PDF ↗</a></div></section>
        <div class="lesson-sections">${lesson.sections.map((section, index) => `<section class="lesson-section"><div class="lesson-section-heading"><span class="lesson-section-number">${String(index + 1).padStart(2, "0")}</span><div><h2>${escapeHtml(section.title)}</h2><span class="section-time">${escapeHtml(section.time)}</span></div></div><p class="section-intro">${escapeHtml(section.intro)}</p><div class="rich-content">${renderBlocks(section.blocks)}</div></section>`).join("")}</div>
        <section class="takeaway"><p class="eyebrow">ГЛАВНОЕ</p><ul>${lesson.takeaway.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
        ${renderExtension(lesson.extension)}
        ${pairedLab ? `<a class="paired-lab-card" href="${escapeHtml(`lab-${String(pairedLab.id).padStart(2, "0")}.html`)}"><span><small>СЛЕДУЮЩИЙ ШАГ</small><strong>${escapeHtml(pairedLab.title)}</strong></span><span aria-hidden="true">→</span></a>` : ""}
      </article>`;
  }

  function scoreFor(lab, state) {
    const correct = lab.questions.filter((question) => state.answers?.[question.id] === question.answer).length;
    const checks = lab.checklist.filter((_, index) => state.checklist?.[`c${index + 1}`] === true).length;
    return { earned: 20 * (correct + checks), maximum: 20 * (lab.questions.length + lab.checklist.length), correct, checks };
  }

  function allQuestionsAnswered(lab, answers) {
    return lab.questions.every((question) => Number.isInteger(answers[question.id]) && answers[question.id] >= 0 && answers[question.id] <= 3);
  }

  function renderLab(lab, state) {
    const module = moduleForContent(lab.id);
    const score = scoreFor(lab, state);
    const answered = allQuestionsAnswered(lab, state.answers || {});
    const completeAllowed = answered && state.peerConfirmed === true;
    const questions = lab.questions.map((question, index) => {
      const selected = state.answers?.[question.id];
      const feedback = Number.isInteger(selected)
        ? `<p class="quiz-feedback ${selected === question.answer ? "is-correct" : "is-incorrect"}" data-feedback="${escapeHtml(question.id)}">${selected === question.answer ? "Верно." : "Пока неверно."} ${escapeHtml(question.explanation)}</p>`
        : `<p class="quiz-feedback" data-feedback="${escapeHtml(question.id)}" hidden></p>`;
      return `<fieldset class="quiz-question"><legend><span class="question-number">${String(index + 1).padStart(2, "0")}</span>${escapeHtml(question.text)}</legend><div class="quiz-options">${question.options.map((option, optionIndex) => `<label class="quiz-option"><input type="radio" name="answer-${escapeHtml(question.id)}" value="${optionIndex}" data-answer="${escapeHtml(question.id)}" ${selected === optionIndex ? "checked" : ""}><span>${escapeHtml(option)}</span></label>`).join("")}</div>${feedback}</fieldset>`;
    }).join("");
    const checklist = lab.checklist.map((item, index) => `<label class="checklist-item"><input type="checkbox" data-checklist="c${index + 1}" ${state.checklist?.[`c${index + 1}`] === true ? "checked" : ""}><span>${escapeHtml(item)}</span><strong>20 баллов</strong></label>`).join("");
    const savedStatus = state.status === "completed" ? "Завершена" : "Не завершена";
    return `
      <article class="content-page lab-page" data-module-id="${module.id}" data-lab-id="${lab.id}">
        <section class="page-intro"><a class="back-link" href="index.html?week=${module.id}&amp;view=module">← К модулю ${module.id}</a><p class="eyebrow">ПРАКТИКА · МОДУЛЬ ${String(module.id).padStart(2, "0")} · ЛАБОРАТОРНАЯ ${String(lab.id).padStart(2, "0")}</p><h1>${escapeHtml(lab.title)}</h1><p>${escapeHtml(lab.subtitle)}</p><div class="content-meta"><span>${lab.minutes} минут</span><a class="text-link" href="${escapeHtml(sourceHref(lab.file))}" target="_blank" rel="noopener">Открыть исходный PDF ↗</a></div></section>
        <section class="lab-overview"><div><p class="eyebrow">ЦЕЛЬ</p><p>${escapeHtml(lab.goal)}</p></div><div><p class="eyebrow">КОНТЕКСТ</p><p>${escapeHtml(lab.context)}</p></div></section>
        <div class="lab-columns"><section class="detail-card"><div class="detail-heading"><span class="detail-icon" aria-hidden="true">01</span><div><p class="eyebrow">РЕЗУЛЬТАТ</p><h2>Что подготовить</h2></div></div><ul class="deliverable-list">${lab.deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section><section class="detail-card"><div class="detail-heading"><span class="detail-icon detail-icon-lime" aria-hidden="true">02</span><div><p class="eyebrow">КРИТЕРИИ</p><h2>Что проверить</h2></div></div><ul class="deliverable-list">${lab.criteria.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section></div>
        <section class="steps-section"><div class="section-heading"><div><p class="eyebrow">МАРШРУТ · 60 МИНУТ</p><h2>Пошаговая работа</h2></div><span class="section-time">${lab.minutes} минут</span></div><ol class="step-list">${lab.steps.map((step, index) => `<li class="step-card"><div class="step-marker">${String(index + 1).padStart(2, "0")}</div><div><div class="step-title-row"><h3>${escapeHtml(step.title)}</h3><span class="section-time">${escapeHtml(step.time)}</span></div><p>${escapeHtml(step.detail)}</p><p class="step-deliverable"><strong>Результат шага:</strong> ${escapeHtml(step.deliverable)}</p></div></li>`).join("")}</ol></section>
        ${renderExtension(lab.extension)}
        <section class="assessment-grid"><div class="assessment-card"><div class="section-heading"><div><p class="eyebrow">САМОПРОВЕРКА</p><h2>Квиз</h2></div><span class="assessment-rule">20 баллов за правильный ответ</span></div><p class="assessment-intro">Ответьте на все вопросы. Правильный ответ даёт 20 баллов; неправильный — 0.</p>${questions}</div>
          <div class="assessment-card"><div class="section-heading"><div><p class="eyebrow">ВЗАИМОПРОВЕРКА</p><h2>Чек-лист</h2></div><span class="assessment-rule">20 баллов за отметку</span></div><p class="assessment-intro">Сверьте работу с одногруппником вне сайта. Отмеченная галочка даёт 20 баллов; пустая — 0. Сайт не запускает и не подтверждает выполнение кода.</p><div class="checklist">${checklist}</div></div></section>
        <section class="completion-panel"><div class="score-card"><div><span class="eyebrow">ТЕКУЩИЙ РЕЗУЛЬТАТ</span><strong><span data-score-earned>${score.earned}</span><small> / <span data-score-maximum>${score.maximum}</span></small></strong></div><div class="score-details"><span>Квиз: ${score.correct}/${lab.questions.length} верных</span><span>Чек-лист: ${score.checks}/${lab.checklist.length} отмечено</span></div><div class="lab-completion-status" data-completion-status>${savedStatus}</div></div><div class="completion-action"><label class="peer-confirm"><input type="checkbox" data-peer-confirm ${state.peerConfirmed ? "checked" : ""}><span>Подтверждаю, что взаимная проверка проведена; пустые пункты оставлены без отметки.</span></label><button class="button button-primary" type="button" data-action="complete-lab" ${completeAllowed ? "" : "disabled"}>Завершить лабораторную</button><p class="completion-hint" data-completion-hint>${state.status === "completed" ? "Ответы, галочки, баллы и статус сохранены в локальном прогрессе." : answered ? "Подтвердите взаимную проверку, чтобы завершить работу." : "Ответьте на весь квиз, затем подтвердите взаимную проверку."}</p></div></section>
        <nav class="content-pagination" aria-label="Навигация по неделе"><a href="lesson-${String(lab.id).padStart(2, "0")}.html">← Теория ${String(lab.id).padStart(2, "0")}</a><a href="index.html?view=progress">Мой прогресс →</a></nav>
      </article>`;
  }

  function currentAnswers(lab) {
    const answers = {};
    for (const question of lab.questions) {
      const selected = app.querySelector(`[data-answer="${question.id}"]:checked`);
      if (selected) answers[question.id] = Number(selected.value);
    }
    return answers;
  }

  function currentChecklist(lab) {
    const checklist = {};
    lab.checklist.forEach((_, index) => {
      checklist[`c${index + 1}`] = app.querySelector(`[data-checklist="c${index + 1}"]`)?.checked === true;
    });
    return checklist;
  }

  function updateLabState(lab, complete = false) {
    const answers = currentAnswers(lab);
    const checklist = currentChecklist(lab);
    const peerConfirmed = app.querySelector("[data-peer-confirm]")?.checked === true;
    const state = { answers, checklist, peerConfirmed, status: "started" };
    const score = scoreFor(lab, state);
    const saved = complete
      ? window.OopomanStorage.completeLab(lab.id, answers, checklist, peerConfirmed, score.earned, allQuestionsAnswered(lab, answers))
      : window.OopomanStorage.saveLabWork(lab.id, answers, checklist, peerConfirmed, score.earned);
    return { answers, checklist, peerConfirmed, score, saved };
  }

  function refreshLabFeedback(lab, answers, completed) {
    for (const question of lab.questions) {
      const node = app.querySelector(`[data-feedback="${question.id}"]`);
      const selected = answers[question.id];
      if (!node) continue;
      if (!Number.isInteger(selected)) {
        node.hidden = true;
        node.textContent = "";
        node.className = "quiz-feedback";
        continue;
      }
      node.hidden = false;
      node.className = `quiz-feedback ${selected === question.answer ? "is-correct" : "is-incorrect"}`;
      node.textContent = `${selected === question.answer ? "Верно." : "Пока неверно."} ${question.explanation}`;
    }
    const score = scoreFor(lab, { answers, checklist: currentChecklist(lab) });
    const earned = app.querySelector("[data-score-earned]");
    const status = app.querySelector("[data-completion-status]");
    const button = app.querySelector("[data-action='complete-lab']");
    const hint = app.querySelector("[data-completion-hint]");
    const peerConfirmed = app.querySelector("[data-peer-confirm]")?.checked === true;
    const allAnswered = allQuestionsAnswered(lab, answers);
    if (earned) earned.textContent = String(score.earned);
    const correctText = app.querySelector(".score-details span:first-child");
    const checksText = app.querySelector(".score-details span:last-child");
    if (correctText) correctText.textContent = `Квиз: ${score.correct}/${lab.questions.length} верных`;
    if (checksText) checksText.textContent = `Чек-лист: ${score.checks}/${lab.checklist.length} отмечено`;
    if (button) button.disabled = !allAnswered || !peerConfirmed;
    if (hint && !completed) hint.textContent = allAnswered ? (peerConfirmed ? "Можно завершить лабораторную." : "Подтвердите взаимную проверку, чтобы завершить работу.") : "Ответьте на весь квиз, затем подтвердите взаимную проверку.";
    if (status && !completed) status.textContent = "Не завершена";
  }

  function renderContentPage(pageId, progress) {
    const match = /^(lesson|lab)-0?([1-9])$/.exec(pageId || "");
    if (!match) return `<section class="locked-page"><h1>Страница не найдена</h1><a class="button button-primary" href="index.html">К маршруту</a></section>`;
    const kind = match[1];
    const id = Number(match[2]);
    const module = moduleForContent(id);
    if (!module) return `<section class="locked-page"><h1>Страница не найдена</h1><a class="button button-primary" href="index.html">К маршруту</a></section>`;
    if (!module.available) return renderLocked(module);
    if (kind === "lesson") {
      const lesson = lessons.find((item) => item.id === id);
      return lesson ? renderLesson(lesson) : `<section class="locked-page"><h1>Страница не найдена</h1><a class="button button-primary" href="index.html">К маршруту</a></section>`;
    }
    const lab = labs.find((item) => item.id === id);
    if (!lab) return `<section class="locked-page"><h1>Страница не найдена</h1><a class="button button-primary" href="index.html">К маршруту</a></section>`;
    return renderLab(lab, stateFor(progress, id));
  }

  function render() {
    const route = query();
    const state = progressSnapshot();
    document.querySelectorAll("[data-nav]").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === (route.view === "progress" ? "progress" : "home"));
    });

    const contentPage = activeContentPage();
    const match = /^(lesson|lab)-0?([1-9])$/.exec(contentPage || "");
    if (match) {
      const pageContent = match[1] === "lesson"
        ? lessons.find((item) => item.id === Number(match[2]))
        : labs.find((item) => item.id === Number(match[2]));
      if (pageContent) document.title = `${match[1] === "lesson" ? "Лекция" : "Лабораторная"} ${String(pageContent.id).padStart(2, "0")} · ${pageContent.title} · OOPoman`;
    }
    if (match && match[1] === "lab") {
      const module = moduleForContent(Number(match[2]));
      if (module?.available && !window.OopomanStorage.markLabStarted(Number(match[2]))) {
        const current = progressSnapshot();
        currentNotice(isBlockedLab(current, match[2]) ? blockedLabNotice() : "Не удалось сохранить прогресс в этом профиле. Проверьте настройки хранилища.", "warning");
      }
    }

    const currentState = progressSnapshot();
    if (!currentState.writable) currentNotice("Не удалось прочитать прогресс этого профиля. Данные не будут перезаписаны; попробуйте сбросить только прогресс OOPoman.", "warning");
    else if (match && match[1] === "lab" && isBlockedLab(currentState, match[2])) currentNotice(blockedLabNotice(), "warning");
    if (contentPage) {
      app.innerHTML = renderContentPage(contentPage, currentState.value);
      return;
    }
    if (route.view === "progress") {
      app.innerHTML = renderProgress(currentState.value);
      return;
    }
    if (route.week > 0) {
      const module = modules.find((item) => item.id === route.week);
      app.innerHTML = !module
        ? `<section class="locked-page"><h1>Модуль не найден</h1><a class="button button-primary" href="index.html">К маршруту</a></section>`
        : !module.available
          ? renderLocked(module)
          : renderModule(module, currentState.value);
      return;
    }
    app.innerHTML = renderHome(currentState.value);
  }

  app.addEventListener("change", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const answer = target?.dataset.answer;
    const checklist = target?.dataset.checklist;
    const peer = target?.hasAttribute("data-peer-confirm");
    if (!answer && !checklist && !peer) return;
    const labId = Number(activeContentPage()?.match(/^lab-0?([1-9])$/)?.[1]);
    const lab = labs.find((item) => item.id === labId);
    if (!lab) return;
    const result = updateLabState(lab);
    refreshLabFeedback(lab, result.answers, stateFor(progressSnapshot().value, lab.id).status === "completed");
    if (!result.saved) {
      const current = progressSnapshot();
      currentNotice(isBlockedLab(current, lab.id) ? blockedLabNotice() : "Не удалось сохранить ответы в этом профиле браузера.", "warning");
    }
    else currentNotice("Ответы и отметки сохранены в локальном прогрессе.", "success");
  });

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
    if (action === "complete-lab") {
      const labId = Number(activeContentPage()?.match(/^lab-0?([1-9])$/)?.[1]);
      const lab = labs.find((item) => item.id === labId);
      if (!lab) return;
      const result = updateLabState(lab, true);
      if (!result.saved) {
        const current = progressSnapshot();
        currentNotice(isBlockedLab(current, lab.id) ? blockedLabNotice() : "Чтобы завершить лабораторную, ответьте на весь квиз, подтвердите взаимную проверку и разрешите сохранение в этом профиле.", "warning");
        return;
      }
      currentNotice("Лабораторная завершена. Ответы, баллы и статус сохранены.", "success");
      render();
      app.querySelector("[data-action='complete-lab']")?.focus();
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
