"""Тесты инвариантов доменной модели Avtobys."""

from datetime import datetime, timedelta, timezone
from decimal import Decimal

import pytest

from domain.bus import Bus, CapacityExceededError
from domain.card import CardBlockedError, InsufficientFundsError, TransitCard
from domain.route import Route
from domain.ticket import SingleTripTicket, TicketAlreadyUsedError, TicketExpiredError


def test_route_minimum_stops() -> None:
    """Маршрут с одной остановкой не создается."""
    with pytest.raises(ValueError):
        Route("32", ["Абая"])


def test_route_rejects_repeated_adjacent_stops() -> None:
    """Соседние остановки не должны совпадать."""
    with pytest.raises(ValueError):
        Route("32", ["Абая", "Абая"])


def test_bus_capacity_overflow() -> None:
    """Посадка сверх вместимости вызывает предметное исключение."""
    bus = Bus("123 AB 02", 10)
    bus.board_passengers(8)
    with pytest.raises(CapacityExceededError):
        bus.board_passengers(3)
    assert bus.current_passengers == 8


def test_bus_rejects_negative_passenger_count() -> None:
    """Количество пассажиров не может стать отрицательным."""
    bus = Bus("123 AB 02", 10)
    with pytest.raises(ValueError):
        bus.leave_passengers(1)


def test_bus_can_be_assigned_and_removed_from_route() -> None:
    """Автобус можно назначить на маршрут и снять с него."""
    bus = Bus("123 AB 02", 10)
    route = Route("32", ["Абая", "Сайран"])
    bus.assign_route(route)
    assert bus.current_route is route
    bus.remove_route()
    assert bus.current_route is None


def test_card_prevents_negative_balance() -> None:
    """Неуспешное списание не изменяет баланс карты."""
    card = TransitCard(Decimal("150.00"))
    with pytest.raises(InsufficientFundsError):
        card.pay(Decimal("200.00"))
    assert card.balance == Decimal("150.00")


def test_card_blocked_rejects_operations() -> None:
    """Заблокированная карта не позволяет пополнять баланс и платить."""
    card = TransitCard(Decimal("200.00"))
    card.block("Потеря карты")
    with pytest.raises(CardBlockedError):
        card.pay(Decimal("100.00"))
    with pytest.raises(CardBlockedError):
        card.top_up(Decimal("100.00"))


def test_card_top_up_minimum() -> None:
    """Минимальная сумма пополнения составляет 100 тенге."""
    card = TransitCard()
    with pytest.raises(ValueError):
        card.top_up(Decimal("99.99"))
    card.top_up(Decimal("100.00"))
    assert card.balance == Decimal("100.00")


def test_card_discount_is_applied() -> None:
    """Списание учитывает льготный коэффициент."""
    card = TransitCard(Decimal("200.00"), Decimal("0.5"))
    charged = card.pay(Decimal("100.00"))
    assert charged == Decimal("50.000")
    assert card.balance == Decimal("150.000")


def test_ticket_double_validation() -> None:
    """Повторное использование билета запрещено."""
    ticket = SingleTripTicket(Decimal("100.00"))
    bus = Bus("123 AB 02", 50)
    ticket.validate(bus)
    assert ticket.is_validated is True
    with pytest.raises(TicketAlreadyUsedError):
        ticket.validate(bus)


def test_ticket_expiration() -> None:
    """Билет старше 60 минут нельзя валидировать."""
    issued_at = datetime.now(timezone.utc) - timedelta(minutes=61)
    ticket = SingleTripTicket(Decimal("100.00"), issued_at)
    bus = Bus("123 AB 02", 50)
    with pytest.raises(TicketExpiredError):
        ticket.validate(bus)
    assert ticket.is_validated is False


def test_ticket_cannot_be_used_on_another_bus_after_validation() -> None:
    """После первой валидации билет нельзя использовать в другом автобусе."""
    ticket = SingleTripTicket(Decimal("100.00"))
    first_bus = Bus("123 AB 02", 50)
    second_bus = Bus("456 CD 02", 50)
    ticket.validate(first_bus)
    with pytest.raises(TicketAlreadyUsedError):
        ticket.validate(second_bus)


def test_unblock_card_restores_operations() -> None:
    """После разблокировки карта снова принимает операции."""
    card = TransitCard(Decimal("200.00"))
    card.block("Проверка")
    card.unblock()
    card.pay(Decimal("100.00"))
    assert card.balance == Decimal("100.00")
