# Экзамен OOPoman — ключ преподавателя

> Этот файл предназначен преподавателю. Он хранится вне `course/` и не включается в публичную сборку. Браузерная проверка открыта для просмотра и не удостоверяет личность или подлинность результата.

## Теоретические вопросы и источники

Все номера относятся к `course/exam.js`; верный вариант указан индексом с нуля. Формулировки и обоснования основаны только на исходных PDF курса.

| ID | Ответ | Обоснование | Источник |
|---|---:|---|---|
| q01 | 2 | Идентичность отличает экземпляры даже при одинаковом состоянии. | `OOP-course/01_Лекции/Лекция_01_От_процедурного_подхода_к_объектам_Инкапсуляция.pdf`, с. 3–4 |
| q02 | 0 | Инварианты защищают допустимое состояние объекта и запрещают списание с блокированной карты. | `OOP-course/01_Лекции/Лекция_01_От_процедурного_подхода_к_объектам_Инкапсуляция.pdf`, с. 3–4 |
| q03 | 3 | Богатая модель содержит поведение и защищает правила; анемичная модель делегирует их внешним процедурам. | `OOP-course/01_Лекции/Лекция_01_От_процедурного_подхода_к_объектам_Инкапсуляция.pdf`, с. 6–7 |
| q04 | 1 | Клиент задаёт намерение объекту, а не спрашивает поля и меняет их сам. | `OOP-course/01_Лекции/Лекция_01_От_процедурного_подхода_к_объектам_Инкапсуляция.pdf`, с. 6–7 |
| q05 | 2 | Кратковременное использование аргумента без сохранения ссылки — зависимость. | `OOP-course/01_Лекции/Лекция_02_Отношения_между_объектами_Композиция_против_наследования.pdf`, с. 2–3 |
| q06 | 0 | При агрегации связанные объекты сохраняют независимые жизненные циклы. | `OOP-course/01_Лекции/Лекция_02_Отношения_между_объектами_Композиция_против_наследования.pdf`, с. 3–4 |
| q07 | 3 | Композиция поведения из компонентов уменьшает число сочетаний подклассов. | `OOP-course/01_Лекции/Лекция_02_Отношения_между_объектами_Композиция_против_наследования.pdf`, с. 4 |
| q08 | 2 | Protocol описывает структурную совместимость без обязательного явного наследования. | `OOP-course/01_Лекции/Лекция_03_Полиморфизм_Абстрактные_классы_и_протоколы.pdf`, с. 3–4 |
| q09 | 1 | Желаемы высокая связанность обязанностей внутри модуля и низкое зацепление между модулями. | `OOP-course/01_Лекции/Лекция_04_SOLID_Часть_1_SRP_и_OCP_Cohesion_Coupling.pdf`, с. 2 |
| q10 | 3 | Новое поведение добавляется расширением без изменения уже проверенного модуля. | `OOP-course/01_Лекции/Лекция_04_SOLID_Часть_1_SRP_и_OCP_Cohesion_Coupling.pdf`, с. 3–4 |
| q11 | 0 | Подтип должен сохранять ожидания клиента при подстановке вместо базового типа. | `OOP-course/01_Лекции/Лекция_05_SOLID_Часть_2_LSP_ISP_DIP_Dependency_Injection.pdf`, с. 2 |
| q12 | 2 | Узкие ролевые контракты не заставляют реализацию зависеть от ненужных методов. | `OOP-course/01_Лекции/Лекция_05_SOLID_Часть_2_LSP_ISP_DIP_Dependency_Injection.pdf`, с. 2–3 |
| q13 | 1 | Внешнее внедрение зависимости позволяет заменить реализацию и изолировать её создание. | `OOP-course/01_Лекции/Лекция_05_SOLID_Часть_2_LSP_ISP_DIP_Dependency_Injection.pdf`, с. 3–4 |
| q14 | 0 | Factory Method передаёт выбор конкретного продукта фабричному методу/переопределению. | `OOP-course/01_Лекции/Лекция_06_Порождающие_паттерны_GoF_Factory_Method_Builder.pdf`, с. 2 |
| q15 | 3 | Builder собирает сложный объект последовательными шагами. | `OOP-course/01_Лекции/Лекция_06_Порождающие_паттерны_GoF_Factory_Method_Builder.pdf`, с. 3–4 |
| q16 | 2 | Adapter преобразует несовместимый внешний интерфейс к ожидаемому клиентом контракту. | `OOP-course/01_Лекции/Лекция_07_Структурные_паттерны_GoF_Adapter_Decorator_Facade.pdf`, с. 2 |
| q17 | 1 | Decorator оборачивает объект тем же интерфейсом и добавляет поведение. | `OOP-course/01_Лекции/Лекция_07_Структурные_паттерны_GoF_Adapter_Decorator_Facade.pdf`, с. 3 |
| q18 | 3 | Facade предоставляет единый простой интерфейс поверх набора подсистем. | `OOP-course/01_Лекции/Лекция_07_Структурные_паттерны_GoF_Adapter_Decorator_Facade.pdf`, с. 4 |
| q19 | 0 | Observer рассылает событие подписчикам; Chain передаёт запрос обработчикам по цепи. | `OOP-course/01_Лекции/Лекция_08_Поведенческие_паттерны_GoF_Strategy_Observer_Chain.pdf`, с. 2–3 |
| q20 | 2 | Зависимости направлены к политикам и внутренним слоям; детали зависят от внутренних контрактов. | `OOP-course/01_Лекции/Лекция_09_Чистая_архитектура_Clean_Architecture_Рефакторинг.pdf`, с. 2–3 |

Распределение: M1 — q01–q08 (8); M2 — q09–q15 (7); M3 — q16–q20 (5). Каждый вопрос даёт 1 балл за выбранный индекс; один ответ верен.

## Практические задачи и рубрики

### Лёгкая · Route и инварианты — 4 балла

Источник: ``OOP-course/02_Лабораторные/Лабораторная_01_Моделирование_домена_Avtobys_Защита_инвариантов.pdf``, с. 2, блок 1. Решение должно иметь `Route(route_number, base_fare, stops)`, отклонять ошибку через `ValueError`, сохранять порядок остановок. Пример корректного решения:

```python
from decimal import Decimal

class Route:
    def __init__(self, route_number: str, base_fare: Decimal, stops: list[str]):
        if not route_number.strip():
            raise ValueError("route_number must not be empty")
        if not isinstance(base_fare, Decimal) or base_fare <= 0:
            raise ValueError("base_fare must be a positive Decimal")
        if len(stops) < 2:
            raise ValueError("at least two stops are required")
        if any(left == right for left, right in zip(stops, stops[1:])):
            raise ValueError("adjacent stop names must differ")
        self.route_number = route_number
        self.base_fare = base_fare
        self.stops = list(stops)
```

| Проверка | Балл | Вход | Ожидаемый результат |
|---|---:|---|---|
| Пустой/пробельный номер | 1 | `Route('   ', Decimal('100'), ['A','B'])` | `ValueError` |
| Нулевая и отрицательная цена | 1 | `Decimal('0')`, `Decimal('-1')` | Для обеих — `ValueError` |
| Минимум две остановки с порядком | 1 | `['A']`; затем `['A','B']` | Первая ошибка; во второй `stops == ['A','B']` |
| Только соседние повторы запрещены | 1 | `['A','A']`; затем `['A','B','A']` | Первая ошибка; вторая допустима и порядок сохранён |

### Средняя · DI-контейнер — 6 баллов

Источник: ``OOP-course/02_Лабораторные/Лабораторная_05_Практикум_Midterm_DI_Container_LSP_ISP.pdf``, с. 2–3, блок 3. Фикстуры worker: `_ExamRepository`; `_ExamService(repository)` сохраняет `repository`; `_ExamController(service)` сохраняет `service`. `build_container()` регистрирует singleton `_ExamRepository`, transient `_ExamService` и transient `_ExamController`; каждая transient-фабрика получает контейнер одним параметром и вызывает `resolve` для зависимостей. Пример допустимой реализации:

```python
class Container:
    def __init__(self): self._providers = {}
    def register_singleton(self, interface, implementation_or_instance):
        instance = implementation_or_instance() if isinstance(implementation_or_instance, type) else implementation_or_instance
        self._providers[interface] = ("singleton", instance)
    def register_transient(self, interface, factory_func):
        self._providers[interface] = ("transient", factory_func)
    def resolve(self, interface):
        kind, provider = self._providers[interface]
        return provider if kind == "singleton" else provider(self)

def build_container():
    c = Container()
    c.register_singleton(_ExamRepository, _ExamRepository)
    c.register_transient(_ExamService, lambda c: _ExamService(c.resolve(_ExamRepository)))
    c.register_transient(_ExamController, lambda c: _ExamController(c.resolve(_ExamService)))
    return c
```

| Проверка | Балл | Фикстура/ожидаемое |
|---|---:|---|
| Singleton registration/type | 1 | `resolve(_ExamRepository)` — `_ExamRepository` |
| Singleton identity | 1 | Два resolve — тот же объект (`is`) |
| Transient registration/type | 1 | `resolve(_ExamService)` — `_ExamService` |
| Transient identity | 1 | Два resolve — разные объекты (`is not`) |
| Service injection | 1 | `service.repository is repo` из singleton resolve |
| Bootstrap graph | 1 | controller → service → тот же singleton repo |

### Продвинутая · Chain и pipeline — 10 баллов

Источник: ``OOP-course/02_Лабораторные/Лабораторная_08_Цепочка_обязанностей_и_Наблюдатели_мониторинга.pdf``, с. 2–3, блоки 1 и 3. Узлы и trace: `stop_list`, `cooldown`, `balance`, `execution`. Вход запроса: `blocked`, `seconds_since_last`, `balance`, `fare`. Отказы: `blacklisted`, `cooldown`, `insufficient_balance`; успех — `accepted`, списание `fare` из баланса. При отказе последующие узлы не запускаются.

Пример полного решения с trace без дублирования узлов:

```python
class ValidationHandler:
    def __init__(self, next_handler=None): self._next_handler = next_handler
    def set_next(self, handler): self._next_handler = handler; return handler
    def forward(self, request, trace):
        return self._next_handler.handle(request, trace) if self._next_handler else {"status": "accepted"}

class StopListHandler(ValidationHandler):
    def handle(self, request, trace):
        trace.append("stop_list")
        if request.get("blocked"): return {"status": "refused", "reason": "blacklisted"}
        return self.forward(request, trace)

class CooldownHandler(ValidationHandler):
    def handle(self, request, trace):
        trace.append("cooldown")
        if request.get("seconds_since_last", 0) < 60: return {"status": "refused", "reason": "cooldown"}
        return self.forward(request, trace)

class BalanceHandler(ValidationHandler):
    def handle(self, request, trace):
        trace.append("balance")
        if request.get("balance", 0) < request.get("fare", 0): return {"status": "refused", "reason": "insufficient_balance"}
        return self.forward(request, trace)

class ExecutionHandler(ValidationHandler):
    def handle(self, request, trace):
        trace.append("execution")
        request["balance"] -= request["fare"]
        return {"status": "accepted"}

def build_chain():
    return StopListHandler(CooldownHandler(BalanceHandler(ExecutionHandler())))

class ValidationPipeline:
    def __init__(self, chain, events): self._chain, self._events = chain, events
    def run(self, request):
        trace = []
        result = self._chain.handle(request, trace)
        result["trace"] = trace
        self._events.append({"event": "validation_finished", "status": result["status"]})
        return result

def build_pipeline(events):
    return ValidationPipeline(build_chain(), events)
```
| Проверка | Балл | Фикстура и ожидаемый результат |
|---|---:|---|
| StopListHandler | 1 | `blocked=True` → refused / `blacklisted` |
| CooldownHandler | 1 | `seconds_since_last=30` → refused / `cooldown` |
| BalanceHandler | 1 | `balance=20`, `fare=40` → refused / `insufficient_balance` |
| ExecutionHandler | 1 | `balance=100`, `fare=40` → accepted, balance 60 |
| Порядок и продолжение | 1 | Успешный trace: четыре узла в указанном порядке |
| Short-circuit | 1 | Cooldown отказ: trace содержит только `stop_list`, `cooldown` |
| Вызов цепочки | 1 | `build_pipeline(events).run` возвращает trace цепочки |
| Статус | 1 | Pipeline возвращает accepted и refused в соответствующих случаях |
| Телеметрия успеха | 1 | Одно событие `{'event':'validation_finished','status':'accepted'}` |
| Телеметрия отказа | 1 | Одно событие с `status='refused'` |

Каждый критерий равен одному баллу. Непрошедшая обязательная проверка делает задачу невыполненной, даже если часть её баллов набрана; синтаксическая/средовая ошибка не подтверждает ни одного критерия.

## Итоговая оценка

Теория: 20 вопросов × 1 балл. Практика: 4 + 6 + 10 баллов. Итого максимум 40; проходной порог 30 включительно. Рейтинг курса 1–5 доступен только после сдачи. Сертификат не создаётся. Состояние ограничено ключом `oopoman.exam.v1`; идентичность, ответы, попытки и результаты не отправляются на сервер.

## Полное решение продвинутой задачи

```python
class ValidationHandler:
    def __init__(self, next_handler=None): self._next_handler = next_handler
    def set_next(self, handler): self._next_handler = handler; return handler
    def forward(self, request, trace):
        return self._next_handler.handle(request, trace) if self._next_handler else {"status": "accepted"}

class StopListHandler(ValidationHandler):
    def handle(self, request, trace):
        trace.append("stop_list")
        if request.get("blocked"): return {"status": "refused", "reason": "blacklisted"}
        return self.forward(request, trace)

class CooldownHandler(ValidationHandler):
    def handle(self, request, trace):
        trace.append("cooldown")
        if request.get("seconds_since_last", 0) < 60: return {"status": "refused", "reason": "cooldown"}
        return self.forward(request, trace)

class BalanceHandler(ValidationHandler):
    def handle(self, request, trace):
        trace.append("balance")
        if request.get("balance", 0) < request.get("fare", 0): return {"status": "refused", "reason": "insufficient_balance"}
        return self.forward(request, trace)

class ExecutionHandler(ValidationHandler):
    def handle(self, request, trace):
        trace.append("execution")
        request["balance"] -= request["fare"]
        return {"status": "accepted"}

def build_chain():
    return StopListHandler(CooldownHandler(BalanceHandler(ExecutionHandler())))

class ValidationPipeline:
    def __init__(self, chain, events): self._chain, self._events = chain, events
    def run(self, request):
        trace = []
        result = self._chain.handle(request, trace)
        result["trace"] = trace
        self._events.append({"event": "validation_finished", "status": result["status"]})
        return result

def build_pipeline(events):
    return ValidationPipeline(build_chain(), events)
```


