# OOPoman exam — teacher answer sheet

This instructor file is outside `course/` and the public build. Correct-option indexes are zero-based.

## Theory answers
q01–q20: `2, 0, 3, 1, 2, 0, 3, 2, 1, 3, 0, 2, 1, 0, 3, 2, 1, 3, 0, 2`.

Source map: q01–q04 — `Лекция_01_От_процедурного_подхода_к_объектам_Инкапсуляция.pdf`, pp. 3–7; q05–q07 — `Лекция_02_Отношения_между_объектами_Композиция_против_наследования.pdf`, pp. 2–4; q08 — `Лекция_03_Полиморфизм_Абстрактные_классы_и_протоколы.pdf`, pp. 3–4; q09–q10 — `Лекция_04_SOLID_Часть_1_SRP_и_OCP_Cohesion_Coupling.pdf`, pp. 2–4; q11–q13 — `Лекция_05_SOLID_Часть_2_LSP_ISP_DIP_Dependency_Injection.pdf`, pp. 2–4; q14–q15 — `Лекция_06_Порождающие_паттерны_GoF_Factory_Method_Builder.pdf`, pp. 2–4; q16–q18 — `Лекция_07_Структурные_паттерны_GoF_Adapter_Decorator_Facade.pdf`, pp. 2–4; q19 — `Лекция_08_Поведенческие_паттерны_GoF_Strategy_Observer_Chain.pdf`, pp. 2–3; q20 — `Лекция_09_Чистая_архитектура_Clean_Architecture_Рефакторинг.pdf`, pp. 2–3. All PDFs are under `OOP-course/01_Лекции/`.

## Практические ответы, решения and atomic rubrics
### Маршрут — 4 points
Source: `OOP-course/02_Лабораторные/Лабораторная_01_Моделирование_домена_Avtobys_Защита_инвариантов.pdf`, p. 2, block 1.

```python
class Route:
    def __init__(self, route_number, base_fare, stops):
        if not route_number.strip() or base_fare <= 0 or len(stops) < 2 or any(a == b for a, b in zip(stops, stops[1:])): raise ValueError()
        self.route_number, self.base_fare, self.stops = route_number, base_fare, list(stops)
```

Rubric (1 point each): (1) whitespace route number → ValueError; (2) fare 0 and −1 → ValueError; (3) one stop refused, ordered `A,B` accepted; (4) adjacent `A,A` refused, non-adjacent `A,B,A` accepted with order preserved.

### Транспортная карта — 6 points
Source: `OOP-course/02_Лабораторные/Лабораторная_01_Моделирование_домена_Avtobys_Защита_инвариантов.pdf`, p. 3, block 2.

```python
class TransitCard:
    def __init__(self, balance, blocked=False): self.balance, self.blocked = balance, blocked
    def pay(self, fare):
        if self.blocked or fare <= 0 or self.balance < fare: return False
        self.balance -= fare
        return True
```

Rubric (1 point each): (1) initial balance and default blocked False; (2) sufficient payment succeeds; (3) exact fare deducted; (4) insufficient balance refused unchanged; (5) blocked card refused unchanged; (6) zero/negative fares refused unchanged. Example fixtures: 100/40, 20/40, blocked 100/40, fares 0 and −1.

### Цепочка проверки оплаты — 10 points

Source: `OOP-course/02_Лабораторные/Лабораторная_08_Цепочка_обязанностей_и_Наблюдатели_мониторинга.pdf`, p. 2, block 1. Request fields: `blocked`, `balance`, `fare`; trace tokens: `stop_list`, `balance`, `execution`.

```python
class ValidationHandler:
    def __init__(self, next_handler=None): self._next_handler = next_handler
    def set_next(self, handler): self._next_handler = handler; return handler
    def forward(self, request, trace): return self._next_handler.handle(request, trace) if self._next_handler else {"status": "accepted"}
class StopListHandler(ValidationHandler):
    def handle(self, r, t): t.append("stop_list"); return {"status": "refused", "reason": "blacklisted"} if r["blocked"] else self.forward(r, t)
class BalanceHandler(ValidationHandler):
    def handle(self, r, t): t.append("balance"); return {"status": "refused", "reason": "insufficient_balance"} if r["balance"] < r["fare"] else self.forward(r, t)
class ExecutionHandler(ValidationHandler):
    def handle(self, r, t): t.append("execution"); r["balance"] -= r["fare"]; return {"status": "accepted"}
def build_chain(): return StopListHandler(BalanceHandler(ExecutionHandler()))
```

Rubric (1 point each): (1) blocked reason `blacklisted`; (2) blocked status `refused`; (3) blocked trace only `stop_list`; (4) low balance reason `insufficient_balance`; (5) refusal preserves balance; (6) sufficient balance status `accepted`; (7) exact fare deducted; (8) success trace `stop_list → balance → execution`; (9) root is StopListHandler; (10) links are StopListHandler → BalanceHandler → ExecutionHandler. Fixtures: blocked True, balance 20/fare 40, balance 100/fare 40. All criteria are required for task completion.

The exam uses only these narrower outcomes. No cooldown, Observer, telemetry, pipeline, or difficulty label is part of a student task.
