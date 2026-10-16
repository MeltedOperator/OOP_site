"""Payment gateway that delegates card debiting to a card-like object."""
from decimal import Decimal
from typing import Protocol


class PayableCard(Protocol):
    """Minimal interface expected from a transport card."""

    def pay(self, fare: Decimal) -> Decimal:
        """Debit fare and return the amount charged."""


class PaymentGate:
    """Use an associated card object to pay for a calculated fare."""

    def __init__(self, card: PayableCard) -> None:
        self._card = card

    def charge(self, fare: Decimal) -> Decimal:
        """Charge the card for a fare."""
        if not isinstance(fare, Decimal):
            raise TypeError("fare must be Decimal")
        if fare < Decimal("0"):
            raise ValueError("fare cannot be negative")
        return self._card.pay(fare)
