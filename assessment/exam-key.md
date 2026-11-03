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

### Маршрут — 4 балла
Источник: `OOP-course/02_Лабораторные/Лабораторная_01_Моделирование_домена_Avtobys_Защита_инвариантов.pdf`, с. 2, блок 1. Решение:

```python
from decimal import Decimal
class Route:
    def __init__(self, route_number, base_fare, stops):
        if not route_number.strip() or base_fare <= 0 or len(stops) < 2 or any(a == b for a,b in zip(stops, stops[1:])): raise ValueError()
        self.route_number, self.base_fare, self.stops = route_number, base_fare, list(stops)
```

Рубрика (по 1 баллу): 1) пустой/пробельный номер → `ValueError`; 2) Decimal 0 и −1 → оба `ValueError`; 3) одна остановка → отказ, `A,B` → приняты в исходном порядке; 4) `A,A` → отказ, `A,B,A` → принято с сохранением порядка. Source: Lab 1, PDF p. 2, block 1.

### Транспортная карта — 6 баллов
Источник: `OOP-course/02_Лабораторные/Лабораторная_01_Моделирование_домена_Avtobys_Защита_инвариантов.pdf`, с. 3, блок 2. `pay` возвращает `True` при оплате и `False` при отказе. Пример:

```python
class TransitCard:
    def __init__(self, balance, blocked=False): self.balance, self.blocked = balance, blocked
    def pay(self, fare):
        if self.blocked or fare <= 0 or self.balance < fare: return False
        self.balance -= fare
        return True
```

Рубрика (по 1 баллу): 1) default balance/blocked; 2) sufficient payment succeeds; 3) exact deduction; 4) insufficient funds refuse without change; 5) blocked refuses without change; 6) fare 0/−1 refuse without change. Фикстуры: balance 100/fare 40, balance 20/fare 40, blocked True, fare 0/−1. Source: Lab 1, PDF p. 3, block 2.

### Цепочка проверки оплаты — 10 баллов
Источник: `OOP-course/02_Лабораторные/Лабораторная_08_Цепочка_обязанностей_и_Наблюдатели_мониторинга.pdf`, с. 2, блок 1. Запрос содержит `blocked`, `balance`, `fare`; каждый handler добавляет своё имя в `trace`. Решение:

```python
class ValidationHandler:
    def __init__(self, next_handler=None): self._next_handler = next_handler
    def set_next(self, handler): self._next_handler = handler; return handler
    def forward(self, request, trace): return self._next_handler.handle(request, trace) if self._next_handler else {"status":"accepted"}
class StopListHandler(ValidationHandler):
    def handle(self, r, t):
        t.append("stop_list")
        return {"status":"refused","reason":"blacklisted"} if r["blocked"] else self.forward(r,t)
class BalanceHandler(ValidationHandler):
    def handle(self, r, t):
        t.append("balance")
        return {"status":"refused","reason":"insufficient_balance"} if r["balance"] < r["fare"] else self.forward(r,t)
class ExecutionHandler(ValidationHandler):
    def handle(self, r, t):
        t.append("execution"); r["balance"] -= r["fare"]; return {"status":"accepted"}
def build_chain(): return StopListHandler(BalanceHandler(ExecutionHandler()))
```

Рубрика (по 1 баллу): 1) blocked → `blacklisted`; 2) blocked → `refused`; 3) trace only `stop_list`; 4) balance 20/fare 40 → `insufficient_balance`; 5) refusal preserves 20; 6) balance 100/fare 40 → `accepted`; 7) balance becomes 60; 8) success trace `stop_list → balance → execution`; 9) root is StopListHandler; 10) links are StopListHandler → BalanceHandler → ExecutionHandler. Source: Lab 8, PDF p. 2, block 1.

Каждый балл атомарен; задача завершена, только если пройдены все её проверки. Source outcomes сужены согласно TS rev3; cooldown, Observer, telemetry и pipeline в задании отсутствуют.
## Итоговая оценка

Теория: 20 вопросов × 1 балл. Практика: 4 + 6 + 10 баллов. Итого максимум 40; проходной порог 30 включительно. Рейтинг курса 1–5 доступен только после сдачи. Сертификат не создаётся. Состояние ограничено ключом `oopoman.exam.v1`; идентичность, ответы, попытки и результаты не отправляются на сервер.

