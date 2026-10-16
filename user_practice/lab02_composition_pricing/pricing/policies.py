"""Composable pricing policies for the Avtobys fare engine."""
from __future__ import annotations

from decimal import Decimal
from typing import Protocol


class DiscountPolicy(Protocol):
    """Protocol for passenger discount policies."""

    def apply(self, amount: Decimal) -> Decimal:
        """Return the fare after applying a discount."""


class ZonePolicy(Protocol):
    """Protocol for route-zone multipliers."""

    @property
    def multiplier(self) -> Decimal:
        """Return the zone multiplier."""


class TimePolicy(Protocol):
    """Protocol for time-based fare multipliers."""

    @property
    def multiplier(self) -> Decimal:
        """Return the time multiplier."""


class StandardDiscountPolicy:
    """Apply no discount."""

    def apply(self, amount: Decimal) -> Decimal:
        return amount


class StudentDiscountPolicy:
    """Apply a 50% student discount."""

    def apply(self, amount: Decimal) -> Decimal:
        return amount * Decimal("0.50")


class SeniorDiscountPolicy:
    """Provide free travel for senior passengers."""

    def apply(self, amount: Decimal) -> Decimal:
        return Decimal("0.00")


class ChildDiscountPolicy:
    """Apply a 50% child discount."""

    def apply(self, amount: Decimal) -> Decimal:
        return amount * Decimal("0.50")


class UrbanZonePolicy:
    """Use the standard urban zone multiplier."""

    @property
    def multiplier(self) -> Decimal:
        return Decimal("1.00")


class SuburbanZonePolicy:
    """Apply the suburban multiplier of 1.30."""

    @property
    def multiplier(self) -> Decimal:
        return Decimal("1.30")


class ExpressZonePolicy:
    """Apply the express-route multiplier of 1.50."""

    @property
    def multiplier(self) -> Decimal:
        return Decimal("1.50")


class StandardTimePolicy:
    """Use the standard time multiplier."""

    @property
    def multiplier(self) -> Decimal:
        return Decimal("1.00")


class NightTimePolicy:
    """Apply the night multiplier of 1.20."""

    @property
    def multiplier(self) -> Decimal:
        return Decimal("1.20")


class PeakHourPolicy:
    """Apply a configurable multiplier for peak-hour demand."""

    def __init__(self, multiplier: Decimal) -> None:
        if not isinstance(multiplier, Decimal):
            raise TypeError("multiplier must be Decimal")
        if multiplier <= Decimal("0"):
            raise ValueError("multiplier must be positive")
        self._multiplier = multiplier

    @property
    def multiplier(self) -> Decimal:
        return self._multiplier
