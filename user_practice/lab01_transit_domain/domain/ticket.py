"""Разовый электронный билет на поездку."""

from datetime import datetime, timedelta, timezone
from decimal import Decimal
from uuid import UUID, uuid4

from domain.bus import Bus


class TicketAlreadyUsedError(RuntimeError):
    """Билет уже был использован."""


class TicketExpiredError(RuntimeError):
    """Срок действия билета истек."""


class SingleTripTicket:
    """Одноразовый билет, действительный в течение 60 минут после покупки."""

    VALIDITY_PERIOD = timedelta(minutes=60)

    def __init__(self, price: Decimal, issued_at: datetime | None = None) -> None:
        if not isinstance(price, Decimal) or price <= Decimal("0.00"):
            raise ValueError("Цена билета должна быть положительным Decimal.")
        purchase_time = issued_at or datetime.now(timezone.utc)
        if purchase_time.tzinfo is None:
            purchase_time = purchase_time.replace(tzinfo=timezone.utc)
        self._ticket_code: UUID = uuid4()
        self._price = price
        self._issued_at = purchase_time
        self._is_validated = False
        self._validated_bus_plate: str | None = None

    @property
    def ticket_code(self) -> UUID:
        """Вернуть уникальный UUID билета."""
        return self._ticket_code

    @property
    def price(self) -> Decimal:
        """Вернуть цену билета."""
        return self._price

    @property
    def issued_at(self) -> datetime:
        """Вернуть время покупки билета."""
        return self._issued_at

    @property
    def is_validated(self) -> bool:
        """Проверить, использован ли билет."""
        return self._is_validated

    @property
    def validated_bus_plate(self) -> str | None:
        """Вернуть номер автобуса, в котором билет использовали."""
        return self._validated_bus_plate

    def validate(self, bus: Bus) -> None:
        """Проверить срок действия и отметить билет использованным."""
        if self._is_validated:
            raise TicketAlreadyUsedError("Билет уже был использован.")
        if not isinstance(bus, Bus):
            raise TypeError("bus должен быть объектом Bus.")
        now = datetime.now(self._issued_at.tzinfo)
        if now - self._issued_at > self.VALIDITY_PERIOD:
            raise TicketExpiredError("Срок действия билета истек.")
        self._is_validated = True
        self._validated_bus_plate = bus.plate_number
