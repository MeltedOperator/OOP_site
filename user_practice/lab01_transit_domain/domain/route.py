"""Маршрут городского общественного транспорта."""

from decimal import Decimal


class Route:
    """Маршрут с номером, упорядоченными остановками и базовым тарифом."""

    def __init__(
        self,
        route_number: str,
        stops: list[str],
        base_fare: Decimal = Decimal("100.00"),
    ) -> None:
        if not isinstance(route_number, str) or not route_number.strip():
            raise ValueError("Номер маршрута не должен быть пустым.")
        if not isinstance(base_fare, Decimal) or base_fare <= Decimal("0.00"):
            raise ValueError("Базовый тариф должен быть положительным Decimal.")
        if not isinstance(stops, list) or len(stops) < 2:
            raise ValueError("Маршрут должен содержать минимум две остановки.")
        if any(not isinstance(stop, str) or not stop.strip() for stop in stops):
            raise ValueError("Названия остановок не должны быть пустыми.")
        if any(stops[i].strip() == stops[i - 1].strip() for i in range(1, len(stops))):
            raise ValueError("Соседние остановки не могут совпадать.")

        self._route_number = route_number.strip()
        self._stops = tuple(stop.strip() for stop in stops)
        self._base_fare = base_fare

    @property
    def route_number(self) -> str:
        """Вернуть номер маршрута."""
        return self._route_number

    @property
    def stops(self) -> tuple[str, ...]:
        """Вернуть неизменяемую последовательность остановок."""
        return self._stops

    @property
    def base_fare(self) -> Decimal:
        """Вернуть базовый тариф."""
        return self._base_fare
