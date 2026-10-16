"""Contracts for event handlers."""
from typing import Protocol, runtime_checkable
from .events import BaseTransactionEvent


@runtime_checkable
class EventHandler(Protocol):
    """Protocol implemented by any event handler."""

    def handle(self, event: BaseTransactionEvent) -> None:
        """Process an event."""
