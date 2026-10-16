"""Tests for pricing policies and fare calculations."""
from decimal import Decimal
import pytest

from pricing.calculator import FareCalculator
from pricing.policies import (
    StandardDiscountPolicy, StudentDiscountPolicy, SeniorDiscountPolicy,
    ChildDiscountPolicy, UrbanZonePolicy, SuburbanZonePolicy, ExpressZonePolicy,
    StandardTimePolicy, NightTimePolicy, PeakHourPolicy,
)


@pytest.mark.parametrize(
    "base, discount_cls, zone_cls, time_cls, expected",
    [
        (Decimal("100.00"), StandardDiscountPolicy, UrbanZonePolicy, StandardTimePolicy, Decimal("100.00")),
        (Decimal("100.00"), StudentDiscountPolicy, UrbanZonePolicy, StandardTimePolicy, Decimal("50.00")),
        (Decimal("100.00"), StudentDiscountPolicy, SuburbanZonePolicy, StandardTimePolicy, Decimal("65.00")),
        (Decimal("100.00"), SeniorDiscountPolicy, ExpressZonePolicy, NightTimePolicy, Decimal("0.00")),
        (Decimal("120.00"), StandardDiscountPolicy, SuburbanZonePolicy, NightTimePolicy, Decimal("187.20")),
        (Decimal("100.00"), ChildDiscountPolicy, ExpressZonePolicy, StandardTimePolicy, Decimal("75.00")),
    ],
)
def test_fare_calculation_combinations(base, discount_cls, zone_cls, time_cls, expected):
    calculator = FareCalculator(base, discount_cls(), zone_cls(), time_cls())
    assert calculator.calculate() == expected


def test_peak_hour_policy_multiplier():
    policy = PeakHourPolicy(Decimal("1.40"))
    calculator = FareCalculator(
        Decimal("100.00"), StandardDiscountPolicy(), UrbanZonePolicy(), policy
    )
    assert calculator.calculate() == Decimal("140.00")


@pytest.mark.parametrize("invalid_rate", [Decimal("-1"), Decimal("-0.01")])
def test_negative_base_rate_rejected(invalid_rate):
    with pytest.raises(ValueError):
        FareCalculator(invalid_rate, StandardDiscountPolicy(), UrbanZonePolicy(), StandardTimePolicy())


def test_base_rate_must_be_decimal():
    with pytest.raises(TypeError):
        FareCalculator(100.0, StandardDiscountPolicy(), UrbanZonePolicy(), StandardTimePolicy())


def test_peak_multiplier_must_be_positive():
    with pytest.raises(ValueError):
        PeakHourPolicy(Decimal("0"))


class FakeCard:
    """Small test double for the payment gate."""

    def __init__(self):
        self.charged = None

    def pay(self, fare: Decimal) -> Decimal:
        self.charged = fare
        return fare


def test_payment_gate_delegates_charge():
    from pricing.payment_gate import PaymentGate
    card = FakeCard()
    gate = PaymentGate(card)
    assert gate.charge(Decimal("50.00")) == Decimal("50.00")
    assert card.charged == Decimal("50.00")


def test_payment_gate_rejects_negative_fare():
    from pricing.payment_gate import PaymentGate
    gate = PaymentGate(FakeCard())
    with pytest.raises(ValueError):
        gate.charge(Decimal("-1.00"))
