(() => {
  const MAX_SOURCE_LENGTH = 12000;
  const MAX_OUTPUT_LENGTH = 12000;
  const TIMEOUT_MS = 8000;

  const LAB_ORACLES = {
    1: [
      "import json",
      "from decimal import Decimal",
      "checks = []",
      "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "try:",
      "    card = TransitCard('100')",
      "    card.pay('30')",
      "    record('card-debit', card.balance == Decimal('70'), 'Оплата 30 из баланса 100 должна оставить 70.')",
      "except Exception as error:",
      "    record('card-debit', False, 'Обычная оплата завершилась ошибкой: ' + type(error).__name__)",
      "try:",
      "    card = TransitCard('40')",
      "    before = card.balance",
      "    try: card.pay('50')",
      "    except Exception as error:",
      "        if type(error).__name__ != 'InsufficientFundsError': raise AssertionError('Нужен InsufficientFundsError.')",
      "    else: raise AssertionError('Недостаток средств должен вызвать предметную ошибку.')",
      "    record('insufficient-balance', card.balance == before, 'Отказ при недостатке средств не меняет баланс.')",
      "except Exception as error:",
      "    record('insufficient-balance', False, 'Проверка отказа не завершилась: ' + type(error).__name__)",
      "try:",
      "    card = TransitCard('40', blocked=True)",
      "    before = card.balance",
      "    try: card.pay('10')",
      "    except Exception as error:",
      "        if type(error).__name__ != 'CardBlockedError': raise AssertionError('Нужен CardBlockedError.')",
      "    else: raise AssertionError('Заблокированная карта должна отклонить оплату.')",
      "    record('blocked-card', card.balance == before, 'Заблокированная карта отклоняет оплату без изменения баланса.')",
      "except Exception as error:",
      "    record('blocked-card', False, 'Проверка блокировки не завершилась: ' + type(error).__name__)",
      "json.dumps(checks)",
    ].join("\n"),
    2: [
      "import json",
      "from decimal import Decimal",
      "checks = []",
      "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "try:",
      "    calculator = FareCalculator(FactorPolicy('0.50'), FactorPolicy('1.30'), FactorPolicy('1.00'))",
      "    result = calculator.calculate(Decimal('100'))",
      "    record('student-suburban', result == Decimal('65.00'), '100 × 0.50 × 1.30 × 1.00 должно дать 65.00.')",
      "except Exception as error:",
      "    record('student-suburban', False, 'Сценарий скидки и зоны не завершился: ' + type(error).__name__)",
      "try:",
      "    calculator = FareCalculator(FactorPolicy('1.00'), FactorPolicy('1.30'), FactorPolicy('1.20'))",
      "    result = calculator.calculate(Decimal('120'))",
      "    record('suburban-night', result == Decimal('187.20'), '120 × 1.00 × 1.30 × 1.20 должно дать 187.20.')",
      "except Exception as error:",
      "    record('suburban-night', False, 'Сценарий зоны и времени не завершился: ' + type(error).__name__)",
      "json.dumps(checks)",
    ].join("\n"),
    3: [
      "import json",
      "checks = []",
      "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "class TerminalEvent:",
      "    def __init__(self, event_type): self.type = event_type",
      "class Sink:",
      "    def __init__(self, target, fail=False): self.target = target; self.fail = fail",
      "    def handle(self, event):",
      "        if self.fail: raise RuntimeError('fixture failure')",
      "        self.target.append(event.type)",
      "try:",
      "    seen = []",
      "    dispatcher = Dispatcher()",
      "    dispatcher.subscribe('payment', Sink(seen))",
      "    dispatcher.subscribe('ticket', Sink(seen))",
      "    count = dispatcher.publish(TerminalEvent('payment'))",
      "    record('event-routing', seen == ['payment'] and count == 1, 'Событие payment вызывает только подписанный обработчик; результат равен числу успешных вызовов.')",
      "except Exception as error:",
      "    record('event-routing', False, 'Маршрутизация события не завершилась: ' + type(error).__name__)",
      "try:",
      "    seen = []",
      "    dispatcher = Dispatcher()",
      "    dispatcher.subscribe('payment', Sink(seen, True))",
      "    dispatcher.subscribe('payment', Sink(seen))",
      "    count = dispatcher.publish(TerminalEvent('payment'))",
      "    record('handler-failure', seen == ['payment'] and count == 1, 'Ошибка первого обработчика не мешает следующему; считается успешный вызов.')",
      "except Exception as error:",
      "    record('handler-failure', False, 'Продолжение после ошибки не завершилось: ' + type(error).__name__)",
      "json.dumps(checks)",
    ].join("\n"),4: [
      "import json", "checks = []", "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "calls = []",
      "class FixtureReader:", "    def read_card_id(self): calls.append('reader'); return 'CARD-4'",
      "class FixtureFare:", "    def calculate(self, card_id): calls.append('fare'); return 120",
      "class FixtureLedger:", "    def record(self, card_id, amount, result): calls.append('ledger'); self.entry = (card_id, amount, result)",
      "class FixtureBluetooth(BluetoothPaymentStrategy):",
      "    def process(self, card_id, amount): calls.append('strategy'); return super().process(card_id, amount)",
      "class FixtureDisplay:", "    def show(self, result): calls.append('display'); self.result = result",
      "try:",
      "    ledger = FixtureLedger()",
      "    terminal = TransitTerminal(FixtureReader(), FixtureFare(), ledger, FixtureDisplay(), FixtureBluetooth())",
      "    result = terminal.process()",
      "    record('call-order', calls == ['reader', 'fare', 'strategy', 'ledger', 'display'], 'Внедрённые роли выполняются в порядке чтения, тарифа, оплаты, записи и обратной связи.')",
      "    record('result', result == {'status': 'approved', 'amount': 120, 'card': 'CARD-4'} and ledger.entry[1] == 120, 'Bluetooth-стратегия возвращает фиксированный результат без реального оборудования.')",
      "except Exception as error:",
      "    record('call-order', False, 'Оркестратор не завершил фиктивный сценарий: ' + type(error).__name__)",
      "    record('result', False, 'Результат фиктивной Bluetooth-оплаты отсутствует.')",
      "json.dumps(checks)",
    ].join("\n"),
    5: [
      "import json", "checks = []", "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "try:",
      "    free_pass = SocialFreePass()",
      "    record('free-pass', free_pass.is_valid() is True and not hasattr(free_pass, 'charge'), 'Бесплатный проездной проходит проверку без операции списания.')",
      "except Exception as error:", "    record('free-pass', False, 'Проверка бесплатного проездного не завершилась: ' + type(error).__name__)",
      "try:",
      "    container = Container()",
      "    shared = object()",
      "    container.register_singleton('shared', shared)",
      "    container.register_transient('fresh', object)",
      "    singleton_ok = container.resolve('shared') is container.resolve('shared')",
      "    transient_ok = container.resolve('fresh') is not container.resolve('fresh')",
      "    missing_fails = False",
      "    try: container.resolve('missing')",
      "    except (KeyError, LookupError): missing_fails = True",
      "    record('container-lifetimes', singleton_ok and transient_ok and missing_fails, 'Singleton сохраняет экземпляр, transient вызывает фабрику, отсутствующий ключ завершается явной ошибкой.')",
      "except Exception as error:", "    record('container-lifetimes', False, 'Контейнер не завершил фиксированные проверки: ' + type(error).__name__)",
      "json.dumps(checks)",
    ].join("\n"),
    6: [
      "import json", "checks = []", "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "try:",
      "    ticket = TicketOffice(QrTicketIssuer()).sell(1200)",
      "    record('ticket-factory', ticket == 'QR:1200', 'TicketOffice передаёт выпуск эмитенту и получает QR-билет.')",
      "except Exception as error:", "    record('ticket-factory', False, 'Фабрика билета не завершила фиксированный сценарий: ' + type(error).__name__)",
      "try:",
      "    report = DailyShiftReportBuilder().set_route('32').set_driver('D-1').set_revenue(145000).build()",
      "    immutable = False",
      "    try: report.route_id = 'other'",
      "    except Exception: immutable = True",
      "    independent = DailyShiftReportBuilder().set_route('9').set_driver('D-2').set_revenue(0).build().route_id == '9' and report.route_id == '32'",
      "    invalid_fails = False",
      "    try: DailyShiftReportBuilder().set_route('32').set_driver('D-1').set_revenue(-1).build()",
      "    except ValueError: invalid_fails = True",
      "    record('report-builder', immutable and independent and invalid_fails and report.revenue_kzt == 145000, 'Builder требует поля и неотрицательную выручку; отчёт неизменяем и независим от другого экземпляра.')",
      "except Exception as error:", "    record('report-builder', False, 'Builder не завершил фиксированный сценарий: ' + type(error).__name__)",
      "json.dumps(checks)",
    ].join("\n"),
    7: [
      "import json", "checks = []", "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "class FixtureGateway:", "    def __init__(self): self.amounts = []",
      "    def charge_tiyn(self, route, amount_tiyn):",
      "        self.amounts.append(amount_tiyn)",
      "        return {'status': 'approved' if amount_tiyn <= 50000 else 'declined', 'reference': 'LOCAL-7'}",
      "try:",
      "    gateway = FixtureGateway()",
      "    adapter = LocalGatewayAdapter(gateway)",
      "    approved = adapter.charge(PaymentRequest('12', 150))",
      "    declined = adapter.charge(PaymentRequest('12', 600))",
      "    record('unit-conversion-and-decision', gateway.amounts == [15000, 60000] and approved.approved is True and declined.approved is False, 'Адаптер переводит 150 и 600 тенге в 15000 и 60000 тиын; локальный фиктивный шлюз одобряет/отказывает по границе.')",
      "except Exception as error:", "    record('unit-conversion-and-decision', False, 'Фиктивное решение шлюза не завершилось: ' + type(error).__name__)",
      "class TimeoutGateway:", "    def __init__(self): self.calls = 0",
      "    def charge_tiyn(self, route, amount_tiyn): self.calls += 1; raise TimeoutError()",
      "try:",
      "    timeout_gateway = TimeoutGateway()",
      "    try: LocalGatewayAdapter(timeout_gateway).charge(PaymentRequest('12', 150))",
      "    except TimeoutError: pass",
      "    record('timeout-no-retry', timeout_gateway.calls == 1, 'TimeoutError останавливает вызов; повтор отсутствует.')",
      "except Exception as error:", "    record('timeout-no-retry', False, 'Проверка однократного timeout не завершилась: ' + type(error).__name__)",
      "json.dumps(checks)",
    ].join("\n"),
    8: [
      "import json", "checks = []", "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "try:",
      "    balance = BalanceCheck()",
      "    chain = ActiveCardCheck(balance)",
      "    blocked = chain.handle(Ride('KZ-44', False, 500, 120))",
      "    stopped = blocked.approved is False and balance.calls == 0",
      "    accepted = chain.handle(Ride('KZ-12', True, 300, 120))",
      "    record('two-check-chain', stopped and accepted.approved is True and balance.calls == 1, 'Заблокированная карта останавливает цепочку; активная доходит до проверки баланса.')",
      "except Exception as error:", "    record('two-check-chain', False, 'Две проверки не завершили фиксированные входы: ' + type(error).__name__)",
      "try:",
      "    ride = Ride('KZ-12', True, 300, 120)",
      "    result = Result(True, 'готово')",
      "    monitor = RideMonitor()",
      "    seen = []",
      "    def observer(name):",
      "        def receive(ride, result):",
      "            seen.append((name, result.approved))",
      "            try: result.approved = False",
      "            except Exception: pass",
      "        return receive",
      "    monitor.subscribe(observer('screen'))",
      "    monitor.subscribe(observer('counter'))",
      "    monitor.publish(ride, result)",
      "    record('two-observers', seen == [('screen', True), ('counter', True)] and result.approved is True, 'Два независимых слушателя получают решение после вычисления и не меняют его.')",
      "except Exception as error:", "    record('two-observers', False, 'Уведомление слушателей не завершилось: ' + type(error).__name__)",
      "json.dumps(checks)",
    ].join("\n"),
    9: [
      "import json", "checks = []", "def record(key, passed, detail): checks.append({'id': key, 'passed': bool(passed), 'detail': detail})",
      "try:",
      "    shift = Shift('BUS-17', ['Абая', 'Сейфуллина'])",
      "    repository = MemoryShiftRepository()",
      "    count = FinishShift(repository).close(shift)",
      "    record('domain-and-port', count == 2 and repository.saved == [shift] and not hasattr(shift, 'repository'), 'Shift остаётся предметными данными; сценарий сохраняет его через внешний in-memory порт и возвращает две остановки.')",
      "except Exception as error:", "    record('domain-and-port', False, 'Сценарий закрытия смены не завершился: ' + type(error).__name__)",
      "json.dumps(checks)",
    ].join("\n"),

  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]);
  }

  function limitOutput(value) {
    const text = String(value == null ? "" : value);
    return text.length > MAX_OUTPUT_LENGTH ? text.slice(0, MAX_OUTPUT_LENGTH) + "\n… вывод ограничен …" : text;
  }

  function normalizeExecutionResult(result) {
    if (!result || typeof result !== "object") {
      return { ok: false, stdout: "", error: "Некорректный ответ терминала." };
    }
    return {
      ok: result.ok === true,
      stdout: limitOutput(result.stdout),
      error: result.ok === true ? "" : limitOutput(result.error || "Выполнение не завершилось."),
    };
  }

  function normalizeCriteriaResult(criteria) {
    if (!Array.isArray(criteria) || criteria.length === 0) {
      return { valid: false, passed: false, items: [{ id: "oracle", passed: false, detail: "Не удалось получить полный результат проверок." }] };
    }
    const structurallyValid = criteria.every((item) =>
      item &&
      typeof item.id === "string" && item.id.length > 0 &&
      typeof item.passed === "boolean" &&
      typeof item.detail === "string" && item.detail.length > 0
    );
    if (!structurallyValid) {
      return { valid: false, passed: false, items: [{ id: "oracle", passed: false, detail: "Некорректный результат проверки." }] };
    }
    const items = criteria.map((item) => ({
      id: item.id,
      passed: item.passed,
      detail: limitOutput(item.detail),
    }));
    return { valid: true, passed: items.every((item) => item.passed), items };
  }

  function renderTerminal(options) {
    const kind = options.kind;
    const id = options.id;
    const content = options.content;
    const exerciseId = options.exerciseId || "main";
    const editorId = "terminal-editor-" + kind + "-" + id + "-" + exerciseId;
    const isLab = kind === "lab";
    const canCheck = isLab && content.checkable !== false;
    const showSolution = isLab && content.showSolution !== false && content.solution;
    const feedbackButton = canCheck
      ? '<button class="button button-quiet" type="button" data-terminal-action="check">Проверить ясные критерии</button>'
      : "";
    const solution = showSolution
      ? '<details class="terminal-solution"><summary>Показать решение терминального упражнения</summary><pre><code>' + escapeHtml(content.solution) + '</code></pre></details>'
      : "";
    const analog = isLab && content.analog && typeof content.analog === "object"
      ? '<aside class="terminal-analog" data-terminal-analog hidden><strong>Вернитесь к понятию · ' + escapeHtml(content.analog.title) + '</strong><p>' + escapeHtml(content.analog.explanation) + '</p><pre><code>' + escapeHtml(content.analog.source) + '</code></pre><button class="button button-quiet" type="button" data-terminal-action="analog">Запустить аналог</button></aside>'
      : (isLab ? '<aside class="terminal-analog" data-terminal-analog hidden><strong>Вернитесь к понятию</strong><p>' + escapeHtml(content.analog || "") + '</p></aside>' : "");
    return '<section class="practice-terminal" data-terminal data-terminal-kind="' + escapeHtml(kind) + '" data-terminal-id="' + id + '" data-terminal-exercise="' + escapeHtml(exerciseId) + '">' +
      '<div class="terminal-heading"><div><p class="eyebrow">' + (isLab ? "ПРАКТИКА · МОДУЛЬ " + String(Math.ceil(id / 3)).padStart(2, "0") : "ЗАПУСКАЕМЫЙ ПРИМЕР") + '</p><h2>' + escapeHtml(content.title) + '</h2></div><span class="terminal-runtime">Python · Pyodide 314.0.7</span></div>' +
      '<p class="terminal-prompt">' + escapeHtml(content.prompt) + '</p>' +
      '<label class="terminal-editor-label" for="' + escapeHtml(editorId) + '">Редактор Python</label>' +
      '<div class="terminal-grid"><textarea id="' + escapeHtml(editorId) + '" class="terminal-editor" data-terminal-editor rows="14" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Редактор Python">' + escapeHtml(content.starter) + '</textarea>' +
      '<div class="terminal-result"><p class="terminal-editor-label">Вывод и диагностика</p><pre class="terminal-output" data-terminal-output aria-live="polite">Код ещё не запускался.</pre></div></div>' +
      '<div class="terminal-actions"><button class="button button-primary" type="button" data-terminal-action="run">Запустить код</button>' + feedbackButton + '</div>' +
      '<p class="terminal-status" data-terminal-status role="status" aria-live="polite">Среда загружается при первом запуске.</p>' +
      '<ul class="terminal-feedback" data-terminal-feedback aria-live="polite"></ul>' +
      analog +
      solution +
      '<p class="terminal-disclosure">Код выполняется в локальном Worker. Автоматические упражнения не меняют баллы, отметки, прогресс или завершение лаборатории. Совместимость браузера и изоляция кода не проверялись.</p></section>';
  }

  function mount(root) {
    const scope = root || document;
    if (typeof Worker === "undefined") {
      scope.querySelectorAll("[data-terminal]").forEach((terminal) => {
        terminal.querySelector("[data-terminal-status]").textContent = "В этой среде нет поддержки Worker. Код не запускался.";
      });
      return;
    }

    scope.querySelectorAll("[data-terminal]:not([data-terminal-mounted])").forEach((terminal) => {
      terminal.dataset.terminalMounted = "true";
      const editor = terminal.querySelector("[data-terminal-editor]");
      const output = terminal.querySelector("[data-terminal-output]");
      const status = terminal.querySelector("[data-terminal-status]");
      const feedback = terminal.querySelector("[data-terminal-feedback]");
      const analog = terminal.querySelector("[data-terminal-analog]");
      const buttons = Array.from(terminal.querySelectorAll("[data-terminal-action]"));
      let worker = null;
      let requestNumber = 0;
      const pending = new Map();

      function stopWorker(message) {
        if (worker) worker.terminate();
        worker = null;
        for (const entry of pending.entries()) {
          const id = entry[0];
          const request = entry[1];
          clearTimeout(request.timer);
          pending.delete(id);
          request.reject(new Error(message));
        }
      }

      function ensureWorker() {
        if (worker) return worker;
        worker = new Worker(new URL("pyodide-worker.js", document.baseURI), { type: "module" });
        worker.addEventListener("message", (event) => {
          const request = pending.get(event.data && event.data.id);
          if (!request) return;
          pending.delete(event.data.id);
          clearTimeout(request.timer);
          request.resolve(event.data);
        });
        worker.addEventListener("error", () => {
          stopWorker("Рабочий процесс завершился с ошибкой. Результат проверки не засчитан.");
        });
        return worker;
      }

      function setBusy(value) {
        buttons.forEach((button) => { button.disabled = value; });
      }

      function clearFeedback() {
        feedback.replaceChildren();
        if (analog) analog.hidden = true;
      }

      function showCriteria(criteria) {
        clearFeedback();
        const normalized = normalizeCriteriaResult(criteria);
        normalized.items.forEach((item) => {
          const row = document.createElement("li");
          row.className = item.passed ? "terminal-check is-passed" : "terminal-check is-failed";
          row.textContent = (item.passed ? "ПРОЙДЕНО · " : "НЕ ПРОЙДЕНО · ") + item.detail;
          feedback.append(row);
        });
        if (!normalized.passed && analog) analog.hidden = false;
        status.textContent = normalized.passed
          ? "Перечисленные автоматические критерии пройдены. Остальные пункты остаются ручными."
          : "Есть провал или неполный результат. Эти проверки не меняют баллы курса.";
      }

      async function request(action) {
        const source = action === "analog"
          ? terminal.querySelector("[data-terminal-analog] code")?.textContent || ""
          : editor.value;
        if (source.length > MAX_SOURCE_LENGTH) {
          output.textContent = "Код длиннее " + MAX_SOURCE_LENGTH + " символов; сократите пример.";
          status.textContent = "Код не запускался.";
          if (action === "run" && analog) analog.hidden = false;
          return;
        }
        setBusy(true);
        clearFeedback();
        if (action === "analog" && analog) analog.hidden = false;
        output.textContent = "";
        status.textContent = action === "check" ? "Запускаем код и ясные проверки…" : "Запускаем код…";
        try {
          const id = ++requestNumber;
          const response = await new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
              stopWorker("Превышено время выполнения. Проверка не засчитана.");
            }, TIMEOUT_MS);
            pending.set(id, { resolve, reject, timer });
            ensureWorker().postMessage({
              id,
              action: action === "check" ? "check" : "run",
              source,
              labId: Number(terminal.dataset.terminalId),
            });
          });
          const normalized = normalizeExecutionResult(response);
          output.textContent = normalized.stdout || normalized.error || "(нет вывода)";
          if (!normalized.ok) {
            status.textContent = "Выполнение завершилось ошибкой; успех не засчитан.";
            if (action === "check") showCriteria([{ id: "execution", passed: false, detail: normalized.error }]);
            else if (action === "run" && analog) analog.hidden = false;
            return;
          }
          if (action === "check") showCriteria(response.criteria);
          else status.textContent = "Код завершился без ошибки. Это не оценка лабораторной.";
        } catch (error) {
          output.textContent = error instanceof Error ? error.message : "Не удалось запустить Worker.";
          status.textContent = "Результат неизвестен и не засчитан.";
          if (action === "check") showCriteria([{ id: "execution", passed: false, detail: output.textContent }]);
          else if (action === "run" && analog) analog.hidden = false;
        } finally {
          setBusy(false);
        }
      }

      terminal.addEventListener("click", (event) => {
        const target = event.target instanceof Element ? event.target : null;
        const action = target && target.closest("[data-terminal-action]")?.dataset.terminalAction;
        if (action === "run" || action === "check" || action === "analog") request(action);
      });
    });
  }

  const api = { escapeHtml, limitOutput, normalizeExecutionResult, normalizeCriteriaResult, renderTerminal, mount, labOracles: LAB_ORACLES };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof globalThis !== "undefined") globalThis.OopomanTerminal = api;
})();

