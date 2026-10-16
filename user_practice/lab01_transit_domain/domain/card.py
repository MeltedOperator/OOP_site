"""Транспортная карта с балансом, скидкой и блокировкой."""

from decimal import Decimal


class InsufficientFundsError(ValueError):
    """На карте недостаточно средств."""


class CardBlockedError(RuntimeError):
    """Операция запрещена для заблокированной карты."""


class TransitCard:
    """Транспортная карта, защищающая баланс от отрицательных значений."""

    def __init__(
        self,
        balance: Decimal = Decimal("0.00"),
        discount_rate: Decimal = Decimal("1.0"),
    ) -> None:
        if not isinstance(balance, Decimal) or balance < Decimal("0.00"):
            raise ValueError("Баланс должен быть неотрицательным Decimal.")
        if not isinstance(discount_rate, Decimal) or not Decimal("0.0") <= discount_rate <= Decimal("1.0"):
            raise ValueError("Коэффициент скидки должен быть в диапазоне от 0 до 1.")
        self._balance = balance
        self._discount_rate = discount_rate
        self._is_blocked = False
        self._block_reason: str | None = None

    @property
    def balance(self) -> Decimal:
        """Вернуть текущий баланс."""
        return self._balance

    @property
    def discount_rate(self) -> Decimal:
        """Вернуть коэффициент стоимости после скидки (0 — бесплатно, 1 — без скидки)."""
        return self._discount_rate

    @property
    def is_blocked(self) -> bool:
        """Проверить, заблокирована ли карта."""
        return self._is_blocked

    @property
    def block_reason(self) -> str | None:
        """Вернуть причину блокировки, если карта заблокирована."""
        return self._block_reason

    def top_up(self, amount: Decimal) -> None:
        """Пополнить карту минимум на 100 тенге."""
        self._ensure_unblocked()
        if not isinstance(amount, Decimal) or amount < Decimal("100.00"):
            raise ValueError("Минимальная сумма пополнения — 100 KZT.")
        self._balance += amount

    def pay(self, fare: Decimal) -> Decimal:
        """Списать стоимость поездки с учетом скидки и вернуть списанную сумму."""
        self._ensure_unblocked()
        if not isinstance(fare, Decimal) or fare < Decimal("0.00"):
            raise ValueError("Тариф должен быть неотрицательным Decimal.")
        amount = fare * self._discount_rate
        if self._balance < amount:
            raise InsufficientFundsError("Недостаточно средств на транспортной карте.")
        self._balance -= amount
        return amount

    def block(self, reason: str) -> None:
        """Заблокировать карту с указанием причины."""
        if not isinstance(reason, str) or not reason.strip():
            raise ValueError("Укажите причину блокировки.")
        self._is_blocked = True
        self._block_reason = reason.strip()

    def unblock(self) -> None:
        """Разблокировать карту."""
        self._is_blocked = False
        self._block_reason = None

    def _ensure_unblocked(self) -> None:
        if self._is_blocked:
            raise CardBlockedError("Карта заблокирована; операция невозможна.")
