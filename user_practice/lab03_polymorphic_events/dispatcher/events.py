"""Immutable domain events for transit transactions."""
from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal


@dataclass(frozen=True)
class BaseTransactionEvent:
    """Common fields shared by transaction events."""
    event_id: str
    timestamp: datetime
    bus_id: str
    amount: Decimal


@dataclass(frozen=True)
class CardTapEvent(BaseTransactionEvent):
    """Event emitted when a transport card is tapped."""
    card_id: str
    remaining_balance: Decimal


@dataclass(frozen=True)
class QrPaymentEvent(BaseTransactionEvent):
    """Event emitted after a QR payment."""
    qr_token: str
    payment_provider: str


@dataclass(frozen=True)
class BluetoothBeepEvent(BaseTransactionEvent):
    """Event emitted when a Bluetooth beacon is detected."""
    beacon_id: str
    signal_strength_rssi: int


@dataclass(frozen=True)
class SecurityAlertEvent(BaseTransactionEvent):
    """Event emitted when suspicious card activity is detected."""
    card_id: str
    alert_reason: str
