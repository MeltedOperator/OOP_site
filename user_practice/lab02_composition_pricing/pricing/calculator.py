"""Fare calculator assembled from interchangeable policies."""
from decimal import Decimal, ROUND_HALF_UP
from .policies import DiscountPolicy, ZonePolicy, TimePolicy


class FareCalculator:
    """Calculate fares using injected discount, zone, and time policies."""

    def __init__(
        self,
        base_rate: Decimal,
        discount_policy: DiscountPolicy,
        zone_policy: ZonePolicy,
        time_policy: TimePolicy,
    ) -> None:
        if not isinstance(base_rate, Decimal):
            raise TypeError("base_rate must be Decimal")
        if base_rate < Decimal("0"):
            raise ValueError("base_rate cannot be negative")
        self._base_rate = base_rate
        self._discount_policy = discount_policy
        self._zone_policy = zone_policy
        self._time_policy = time_policy

    def calculate(self) -> Decimal:
        """Return the final fare rounded to two decimal places."""
        amount = (
            self._base_rate
            * self._zone_policy.multiplier
            * self._time_policy.multiplier
        )
        final_fare = self._discount_policy.apply(amount)
        if final_fare < Decimal("0"):
            raise ValueError("final fare cannot be negative")
        return final_fare.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
