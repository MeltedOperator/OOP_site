"""Tests for event dispatching and handlers."""
from datetime import datetime, timedelta
from decimal import Decimal
from unittest.mock import Mock

from dispatcher.bus import EventDispatcher
from dispatcher.events import BaseTransactionEvent, CardTapEvent, QrPaymentEvent
from dispatcher.handlers import AuditLogHandler, FraudDetectionHandler, PassengerNotifierHandler


def make_qr_event() -> QrPaymentEvent:
    return QrPaymentEvent(
        event_id="qr-1",
        timestamp=datetime(2026, 1, 1, 12, 0, 0),
        bus_id="bus-10",
        amount=Decimal("100.00"),
        qr_token="token-abc",
        payment_provider="Kaspi",
    )


def make_card_event(event_id: str, timestamp: datetime) -> CardTapEvent:
    return CardTapEvent(
        event_id=event_id,
        timestamp=timestamp,
        bus_id="bus-10",
        amount=Decimal("100.00"),
        card_id="card-1",
        remaining_balance=Decimal("500.00"),
    )


def test_polymorphic_dispatch_calls_specific_and_general_handlers():
    dispatcher = EventDispatcher()
    qr_handler = Mock()
    general_handler = Mock()
    dispatcher.subscribe(QrPaymentEvent, qr_handler)
    dispatcher.subscribe(BaseTransactionEvent, general_handler)

    assert dispatcher.dispatch(make_qr_event()) == 2
    qr_handler.handle.assert_called_once()
    general_handler.handle.assert_called_once()


def test_handler_exception_does_not_stop_other_handlers():
    dispatcher = EventDispatcher()
    broken = Mock()
    broken.handle.side_effect = RuntimeError("notification failed")
    working = Mock()
    dispatcher.subscribe(QrPaymentEvent, broken)
    dispatcher.subscribe(QrPaymentEvent, working)

    assert dispatcher.dispatch(make_qr_event()) == 1
    broken.handle.assert_called_once()
    working.handle.assert_called_once()


def test_fraud_detection_alerts_for_repeated_tap_within_30_seconds():
    fraud = FraudDetectionHandler()
    start = datetime(2026, 1, 1, 12, 0, 0)
    fraud.handle(make_card_event("tap-1", start))
    fraud.handle(make_card_event("tap-2", start + timedelta(seconds=30)))

    assert len(fraud.alerts) == 1
    assert fraud.alerts[0].alert_reason == "Double Tap Fraud"


def test_audit_handler_records_events():
    audit = AuditLogHandler()
    event = make_qr_event()
    audit.handle(event)
    assert len(audit.audit_records) == 1
    assert "qr-1" in audit.audit_records[0]


def test_notifier_records_payment_events():
    notifier = PassengerNotifierHandler()
    notifier.handle(make_qr_event())
    assert len(notifier.notifications) == 1


def test_event_is_immutable():
    import pytest
    event = make_qr_event()
    with pytest.raises(AttributeError):
        event.amount = Decimal("0.00")


def test_unsubscribe_removes_handler():
    dispatcher = EventDispatcher()
    handler = Mock()
    dispatcher.subscribe(QrPaymentEvent, handler)
    dispatcher.unsubscribe(QrPaymentEvent, handler)
    assert dispatcher.dispatch(make_qr_event()) == 0
