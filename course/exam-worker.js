import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";

const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";
const pyodidePromise = loadPyodide({ indexURL: INDEX_URL });

const mediumFixtures = [
  "class _ExamRepository:",
  "    pass",
  "class _ExamService:",
  "    def __init__(self, repository):",
  "        self.repository = repository",
  "class _ExamController:",
  "    def __init__(self, service):",
  "        self.service = service",
].join("\n");

const suites = {
  easy: [
    "import json",
    "from decimal import Decimal",
    "__exam_results = []",
    "def __exam_check(identifier, label, callback):",
    "    try:",
    "        passed = bool(callback())",
    "        detail = 'Проверка пройдена.' if passed else 'Проверка ' + identifier + ': ожидалось True, получено ' + repr(passed) + '.'",
    "    except Exception as error:",
    "        passed = False",
    "        detail = type(error).__name__ + ': ' + str(error)",
    "    __exam_results.append({'id': identifier, 'label': label, 'passed': passed, 'detail': detail})",
    "def __exam_invalid(callback):",
    "    try:",
    "        callback()",
    "    except ValueError:",
    "        return True",
    "    except Exception:",
    "        return False",
    "    return False",
    "__exam_check('route-number', 'Пустой номер маршрута отклоняется', lambda: __exam_invalid(lambda: Route('   ', Decimal('100'), ['A', 'B'])))",
    "__exam_check('base-fare', 'Нулевая и отрицательная стоимость отклоняются', lambda: __exam_invalid(lambda: Route('R-1', Decimal('0'), ['A', 'B'])) and __exam_invalid(lambda: Route('R-1', Decimal('-1'), ['A', 'B'])) and __exam_invalid(lambda: Route('R-1', 100, ['A', 'B'])))",
    "__exam_check('ordered-stops', 'Маршрут требует минимум две упорядоченные остановки', lambda: __exam_invalid(lambda: Route('R-1', Decimal('100'), ['A'])) and Route('R-1', Decimal('100'), ['A', 'B']).stops == ['A', 'B'])",
    "__exam_check('adjacent-stops', 'Соседние повторы запрещены, несоседние допустимы', lambda: __exam_invalid(lambda: Route('R-1', Decimal('100'), ['A', 'A'])) and Route('R-1', Decimal('100'), ['A', 'B', 'A']).stops == ['A', 'B', 'A'])",
    "json.dumps(__exam_results, ensure_ascii=False)",
  ].join("\n"),
  medium: [
    "import json",
    "__exam_results = []",
    "def __exam_check(identifier, label, callback):",
    "    try:",
    "        passed = bool(callback())",
    "        detail = 'Проверка пройдена.' if passed else 'Проверка ' + identifier + ': ожидалось True, получено ' + repr(passed) + '.'",
    "    except Exception as error:",
    "        passed = False",
    "        detail = type(error).__name__ + ': ' + str(error)",
    "    __exam_results.append({'id': identifier, 'label': label, 'passed': passed, 'detail': detail})",
    "__exam_container = build_container()",
    "__exam_repo1 = __exam_container.resolve(_ExamRepository)",
    "__exam_repo2 = __exam_container.resolve(_ExamRepository)",
    "__exam_service1 = __exam_container.resolve(_ExamService)",
    "__exam_service2 = __exam_container.resolve(_ExamService)",
    "__exam_controller = __exam_container.resolve(_ExamController)",
    "__exam_check('singleton-registration', 'Регистрация и разрешение singleton-репозитория', lambda: isinstance(__exam_repo1, _ExamRepository))",
    "__exam_check('singleton-identity', 'Singleton возвращает тот же экземпляр', lambda: __exam_repo1 is __exam_repo2)",
    "__exam_check('transient-registration', 'Регистрация и разрешение transient-сервиса', lambda: isinstance(__exam_service1, _ExamService))",
    "__exam_check('transient-identity', 'Transient возвращает новый экземпляр', lambda: __exam_service1 is not __exam_service2)",
    "__exam_check('service-injection', 'Сервис использует внедрённый репозиторий', lambda: __exam_service1.repository is __exam_repo1)",
    "__exam_check('bootstrap-graph', 'Bootstrap связывает контроллер, сервис и singleton-репозиторий', lambda: isinstance(__exam_controller, _ExamController) and isinstance(__exam_controller.service, _ExamService) and __exam_controller.service.repository is __exam_repo1)",
    "json.dumps(__exam_results, ensure_ascii=False)",
  ].join("\n"),
  advanced: [
    "import json",
    "def __exam_check(identifier, label, callback):",
    "    try:",
    "        passed, detail = callback()",
    "        passed = bool(passed)",
    "        detail = str(detail)",
    "    except Exception as error:",
    "        passed = False",
    "        detail = type(error).__name__ + ': ' + str(error)",
    "    __exam_results.append({'id': identifier, 'label': label, 'passed': passed, 'detail': detail})",
    "__exam_results = []",
    "def __exam_request(blocked=False, seconds=120, balance=100, fare=40):",
    "    return {'blocked': blocked, 'seconds_since_last': seconds, 'balance': balance, 'fare': fare}",
    "def __exam_run_chain(request):",
    "    trace = []",
    "    result = build_chain().handle(request, trace)",
    "    return result, trace",
    "__exam_result, __exam_trace = __exam_run_chain(__exam_request(blocked=True))",
    "__exam_check('stop-list', 'StopListHandler отклоняет заблокированную карту', lambda: (__exam_result.get('status') == 'refused' and __exam_result.get('reason') == 'blacklisted', str(__exam_result)))",
    "__exam_result, __exam_trace = __exam_run_chain(__exam_request(seconds=30))",
    "__exam_check('cooldown', 'CooldownHandler отклоняет повтор менее чем через 60 секунд', lambda: (__exam_result.get('status') == 'refused' and __exam_result.get('reason') == 'cooldown', str(__exam_result)))",
    "__exam_result, __exam_trace = __exam_run_chain(__exam_request(balance=20, fare=40))",
    "__exam_check('balance', 'BalanceHandler отклоняет недостаточный баланс', lambda: (__exam_result.get('status') == 'refused' and __exam_result.get('reason') == 'insufficient_balance', str(__exam_result)))",
    "__exam_request_success = __exam_request(balance=100, fare=40)",
    "__exam_result, __exam_trace = __exam_run_chain(__exam_request_success)",
    "__exam_check('execution', 'ExecutionHandler списывает стоимость и возвращает успех', lambda: (__exam_result.get('status') == 'accepted' and __exam_request_success.get('balance') == 60, str(__exam_result)))",
    "__exam_check('order-continuation', 'Успешный запрос проходит четыре узла в заданном порядке', lambda: (__exam_trace == ['stop_list', 'cooldown', 'balance', 'execution'], str(__exam_trace)))",
    "__exam_result, __exam_trace = __exam_run_chain(__exam_request(seconds=30))",
    "__exam_check('short-circuit', 'Отказ прерывает цепочку до balance и execution', lambda: (__exam_trace == ['stop_list', 'cooldown'], str(__exam_trace)))",
    "__exam_events = []",
    "__exam_pipeline = build_pipeline(__exam_events)",
    "__exam_pipeline_success_request = __exam_request(balance=100, fare=40)",
    "__exam_pipeline_success = __exam_pipeline.run(__exam_pipeline_success_request)",
    "__exam_check('pipeline-chain', 'Pipeline вызывает цепочку обработчиков', lambda: (__exam_pipeline_success.get('trace') == ['stop_list', 'cooldown', 'balance', 'execution'], str(__exam_pipeline_success.get('trace'))))",
    "__exam_check('pipeline-status', 'Pipeline возвращает итоговый статус успеха и отказа', lambda: (__exam_pipeline_success.get('status') == 'accepted' and build_pipeline([]).run(__exam_request(blocked=True)).get('status') == 'refused', str(__exam_pipeline_success)))",
    "__exam_check('telemetry-success', 'Pipeline публикует одно событие об успехе', lambda: (len(__exam_events) == 1 and __exam_events[0] == {'event': 'validation_finished', 'status': 'accepted'}, str(__exam_events)))",
    "__exam_events_refusal = []",
    "__exam_pipeline_refusal = build_pipeline(__exam_events_refusal)",
    "__exam_refusal = __exam_pipeline_refusal.run(__exam_request(blocked=True))",
    "__exam_check('telemetry-refusal', 'Pipeline публикует одно событие об отказе', lambda: (__exam_refusal.get('status') == 'refused' and len(__exam_events_refusal) == 1 and __exam_events_refusal[0] == {'event': 'validation_finished', 'status': 'refused'}, str(__exam_events_refusal)))",
    "json.dumps(__exam_results, ensure_ascii=False)",
  ].join("\n"),
};

self.addEventListener("message", async (event) => {
  const message = event.data || {};
  if (message.type !== "run") return;

  const requestId = message.requestId;
  try {
    const pyodide = await pyodidePromise;
    const globals = pyodide.globals.get("dict")();
    try {
      if (message.task === "medium") {
        await pyodide.runPythonAsync(mediumFixtures, { globals });
      }
      await pyodide.runPythonAsync(String(message.source || ""), { globals });
      await pyodide.runPythonAsync(suites[message.task], { globals });
      const encoded = await pyodide.runPythonAsync("json.dumps(__exam_results, ensure_ascii=False)", { globals });
      const results = JSON.parse(encoded);
      self.postMessage({ type: "run-result", requestId, kind: "criteria", criteria: results });
    } finally {
      globals.destroy();
    }
  } catch (error) {
    self.postMessage({
      type: "run-result",
      requestId,
      kind: "runtime-error",
      message: String(error && error.message ? error.message : error).slice(0, 900),
    });
  }
});

pyodidePromise.then(() => self.postMessage({ type: "ready", version: "314.0.7" })).catch((error) => {
  self.postMessage({ type: "load-error", message: String(error && error.message ? error.message : error).slice(0, 500) });
});

