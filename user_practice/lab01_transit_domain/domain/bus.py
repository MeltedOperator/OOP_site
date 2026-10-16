"""Модель автобуса и его пассажировместимости."""

import re
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from domain.route import Route


class CapacityExceededError(ValueError):
    """Ошибка при превышении вместимости автобуса."""


class Bus:
    """Автобус с государственным номером и ограниченной вместимостью."""

    def __init__(self, plate_number: str, capacity: int) -> None:
        if not isinstance(plate_number, str) or not plate_number.strip():
            raise ValueError("Государственный номер не должен быть пустым.")
        if plate_number != plate_number.strip() or "  " in plate_number:
            raise ValueError("Государственный номер содержит лишние пробелы.")
        if not re.fullmatch(r"[A-Za-zА-Яа-я0-9]+(?: [A-Za-zА-Яа-я0-9]+)*", plate_number):
            raise ValueError("Некорректный формат государственного номера.")
        if isinstance(capacity, bool) or not isinstance(capacity, int) or not 10 <= capacity <= 250:
            raise ValueError("Вместимость должна быть целым числом от 10 до 250.")

        self._plate_number = plate_number
        self._capacity = capacity
        self._current_passengers = 0
        self._current_route: Route | None = None

    @property
    def plate_number(self) -> str:
        """Вернуть государственный номер."""
        return self._plate_number

    @property
    def capacity(self) -> int:
        """Вернуть максимальную вместимость."""
        return self._capacity

    @property
    def current_passengers(self) -> int:
        """Вернуть текущее количество пассажиров."""
        return self._current_passengers

    @property
    def current_route(self) -> "Route | None":
        """Вернуть текущий маршрут автобуса."""
        return self._current_route

    def board_passengers(self, count: int) -> None:
        """Посадить пассажиров, не превышая вместимость."""
        self._validate_count(count)
        if self._current_passengers + count > self._capacity:
            raise CapacityExceededError("Превышена вместимость автобуса.")
        self._current_passengers += count

    def leave_passengers(self, count: int) -> None:
        """Высадить пассажиров, не допуская отрицательного количества."""
        self._validate_count(count)
        if count > self._current_passengers:
            raise ValueError("Нельзя высадить больше пассажиров, чем находится в автобусе.")
        self._current_passengers -= count

    def assign_route(self, route: "Route") -> None:
        """Назначить автобус на маршрут."""
        from domain.route import Route

        if not isinstance(route, Route):
            raise TypeError("route должен быть объектом Route.")
        self._current_route = route

    def remove_route(self) -> None:
        """Снять автобус с маршрута."""
        self._current_route = None

    @staticmethod
    def _validate_count(count: int) -> None:
        if isinstance(count, bool) or not isinstance(count, int) or count < 0:
            raise ValueError("Количество пассажиров должно быть неотрицательным целым числом.")
