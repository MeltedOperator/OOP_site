import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";

const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";
const pyodidePromise = loadPyodide({ indexURL: INDEX_URL });

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
    "__exam_check('route-number', 'Пустой или пробельный номер маршрута отклоняется', lambda: __exam_invalid(lambda: Route('   ', Decimal('100'), ['A', 'B'])))",
    "__exam_check('base-fare', 'Нулевая и отрицательная стоимость отклоняются', lambda: __exam_invalid(lambda: Route('R-1', Decimal('0'), ['A', 'B'])) and __exam_invalid(lambda: Route('R-1', Decimal('-1'), ['A', 'B'])))",
    "__exam_check('ordered-stops', 'Маршрут требует минимум две упорядоченные остановки', lambda: __exam_invalid(lambda: Route('R-1', Decimal('100'), ['A'])) and Route('R-1', Decimal('100'), ['A', 'B']).stops == ['A', 'B'])",
    "__exam_check('adjacent-stops', 'Соседние повторы запрещены, несоседние допустимы', lambda: __exam_invalid(lambda: Route('R-1', Decimal('100'), ['A', 'A'])) and Route('R-1', Decimal('100'), ['A', 'B', 'A']).stops == ['A', 'B', 'A'])",
    "json.dumps(__exam_results, ensure_ascii=False)",
  ].join("\n"),
  medium: [
    "import json", "__exam_results = []",
    "def __exam_check(identifier, label, callback):",
    "    try:",
    "        passed = bool(callback())",
    "        detail = 'Проверка пройдена.' if passed else 'Проверка ' + identifier + ': ожидаемое условие не выполнено.'",
    "    except Exception as error:",
    "        passed = False",
    "        detail = type(error).__name__ + ': ' + str(error)",
    "    __exam_results.append({'id': identifier, 'label': label, 'passed': passed, 'detail': detail})",
    "__exam_card = TransitCard(100)",
    "__exam_check('card-default', 'Начальное состояние balance и blocked=False', lambda: __exam_card.balance == 100 and __exam_card.blocked is False)",
    "__exam_success = TransitCard(100)", "__exam_paid = __exam_success.pay(40)",
    "__exam_check('card-success', 'Оплата при достаточном балансе успешна', lambda: __exam_paid is True)",
    "__exam_check('card-deduction', 'Успешная оплата списывает точный fare', lambda: __exam_success.balance == 60)",
    "__exam_low = TransitCard(20)", "__exam_low_result = __exam_low.pay(40)",
    "__exam_check('card-insufficient', 'Недостаточный баланс отклонён без списания', lambda: __exam_low_result is False and __exam_low.balance == 20)",
    "__exam_blocked = TransitCard(100, blocked=True)", "__exam_blocked_result = __exam_blocked.pay(40)",
    "__exam_check('card-blocked', 'Заблокированная карта отклонена без списания', lambda: __exam_blocked_result is False and __exam_blocked.balance == 100)",
    "def __exam_bad_fares():",
    "    card = TransitCard(100)", "    zero = card.pay(0)", "    negative = card.pay(-1)",
    "    return zero is False and negative is False and card.balance == 100",
    "__exam_check('card-fare', 'Нулевая и отрицательная цены отклонены без списания', __exam_bad_fares)",
    "json.dumps(__exam_results, ensure_ascii=False)",
  ].join("\n"),
  advanced: [
    "import json",
    "def __exam_check(identifier, label, callback):",
    "    try:", "        passed, detail = callback()", "        passed = bool(passed)", "        detail = str(detail)",
    "    except Exception as error:", "        passed = False", "        detail = type(error).__name__ + ': ' + str(error)",
    "    __exam_results.append({'id': identifier, 'label': label, 'passed': passed, 'detail': detail})",
    "__exam_results = []",
    "def __exam_request(blocked=False, balance=100, fare=40):",
    "    return {'blocked': blocked, 'balance': balance, 'fare': fare}",
    "def __exam_run(request):",
    "    trace = []", "    result = build_chain().handle(request, trace)", "    return result, trace",
    "def __exam_capture(request):",
    "    try:",
    "        result, trace = __exam_run(request)",
    "        return result, trace, None",
    "    except Exception as error:",
    "        return None, None, type(error).__name__ + ': ' + str(error)",
    "def __exam_field(request, field, expected):",
    "    result, trace, error = __exam_capture(request)",
    "    if error:",
    "        return False, error",
    "    return result.get(field) == expected, str(result)",
    "def __exam_trace(request, expected):",
    "    result, trace, error = __exam_capture(request)",
    "    if error:",
    "        return False, error",
    "    return trace == expected, str(trace)",
    "def __exam_preserves_balance():",
    "    request = __exam_request(balance=20, fare=40)",
    "    result, trace, error = __exam_capture(request)",
    "    if error:",
    "        return False, error",
    "    return request.get('balance') == 20, str(request)",
    "def __exam_deducts_fare():",
    "    request = __exam_request(balance=100, fare=40)",
    "    result, trace, error = __exam_capture(request)",
    "    if error:",
    "        return False, error",
    "    return request.get('balance') == 60, str(request)",
    "def __exam_chain_start():",
    "    try:",
    "        chain = build_chain()",
    "        return isinstance(chain, StopListHandler), type(chain).__name__",
    "    except Exception as error:",
    "        return False, type(error).__name__ + ': ' + str(error)",
    "def __exam_chain_links():",
    "    try:",
    "        chain = build_chain()",
    "        passed = isinstance(chain._next_handler, BalanceHandler) and isinstance(chain._next_handler._next_handler, ExecutionHandler) and chain._next_handler._next_handler._next_handler is None",
    "        return passed, type(chain).__name__",
    "    except Exception as error:",
    "        return False, type(error).__name__ + ': ' + str(error)",
    "__exam_check('chain-blacklisted', 'Заблокированная карта возвращает blacklisted', lambda: __exam_field(__exam_request(blocked=True), 'reason', 'blacklisted'))",
    "__exam_check('chain-refusal', 'Заблокированная карта возвращает статус отказа', lambda: __exam_field(__exam_request(blocked=True), 'status', 'refused'))",
    "__exam_check('chain-stop', 'Блокировка останавливает цепочку после stop_list', lambda: __exam_trace(__exam_request(blocked=True), ['stop_list']))",
    "__exam_check('chain-insufficient', 'Недостаточный баланс возвращает insufficient_balance', lambda: __exam_field(__exam_request(balance=20, fare=40), 'reason', 'insufficient_balance'))",
    "__exam_check('chain-preserves-balance', 'Отказ не меняет balance', __exam_preserves_balance)",
    "__exam_check('chain-accepted', 'Достаточный баланс возвращает accepted', lambda: __exam_field(__exam_request(balance=100, fare=40), 'status', 'accepted'))",
    "__exam_check('chain-deduction', 'Успех списывает точный fare', __exam_deducts_fare)",
    "__exam_check('chain-trace', 'Успешный trace: stop_list → balance → execution', lambda: __exam_trace(__exam_request(balance=100, fare=40), ['stop_list', 'balance', 'execution']))",
    "__exam_check('chain-start', 'Цепочка начинается с StopListHandler', __exam_chain_start)",
    "__exam_check('chain-links', 'Узлы связаны StopListHandler → BalanceHandler → ExecutionHandler', __exam_chain_links)",
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

