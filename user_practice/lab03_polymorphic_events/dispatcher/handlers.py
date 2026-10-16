"""Independent event handlers for audit, fraud detection, and notifications."""
from datetime import timedelta
from decimal import Decimal
from typing import Callable
from .events import (
    BaseTransactionEvent, CardTapEvent, SecurityAlertEvent,
)


class AuditLogHandler:
    """Store a readable representation of every event."""

    def __init__(self) -> None:
        self.audit_records: list[str] = []

    def handle(self, event: BaseTransactionEvent) -> None:
        self.audit_records.append(str(event))


class FraudDetectionHandler:
    """Detect repeated card taps on the same bus within 120 seconds."""

    def __init__(self, alert_callback: Callable[[SecurityAlertEvent], None] | None = None) -> None:
        self._last_tap: dict[tuple[str, str], CardTapEvent] = {}
        self._alert_callback = alert_callback
        self.alerts: list[SecurityAlertEvent] = []

    def handle(self, event: BaseTransactionEvent) -> None:
        if not isinstance(event, CardTapEvent):
            return
        key = (event.card_id, event.bus_id)
        previous = self._last_tap.get(key)
        self._last_tap[key] = event
        if previous is None:
            return
        interval = (event.timestamp - previous.timestamp).total_seconds()
        if 0 <= interval < 120:
            alert = SecurityAlertEvent(
                event_id=f"alert-{event.event_id}",
                timestamp=event.timestamp,
                bus_id=event.bus_id,
                amount=Decimal("0.00"),
                card_id=event.card_id,
                alert_reason="Double Tap Fraud",
            )
            self.alerts.append(alert)
            if self._alert_callback is not None:
                self._alert_callback(alert)


class PassengerNotifierHandler:
    """Simulate sending a notification for payment events."""

    def __init__(self) -> None:
        self.notifications: list[str] = []

    def handle(self, event: BaseTransactionEvent) -> None:
        if isinstance(event, (CardTapEvent,)) or event.__class__.__name__ == "QrPaymentEvent":
            self.notifications.append(
                f"Notification for event {event.event_id}: payment {event.amount}"
            )
