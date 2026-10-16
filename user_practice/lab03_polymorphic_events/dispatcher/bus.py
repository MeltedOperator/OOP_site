"""Event dispatcher with per-handler exception isolation."""
import logging
from collections import defaultdict
from typing import DefaultDict
from .contracts import EventHandler
from .events import BaseTransactionEvent

logger = logging.getLogger(__name__)


class EventDispatcher:
    """Register handlers and dispatch events to matching subscriptions."""

    def __init__(self) -> None:
        self._handlers: DefaultDict[type[BaseTransactionEvent], list[EventHandler]] = defaultdict(list)

    def subscribe(
        self,
        event_type: type[BaseTransactionEvent],
        handler: EventHandler,
    ) -> None:
        """Subscribe a handler to an exact event type; duplicate subscriptions are ignored."""
        if handler not in self._handlers[event_type]:
            self._handlers[event_type].append(handler)

    def unsubscribe(
        self,
        event_type: type[BaseTransactionEvent],
        handler: EventHandler,
    ) -> None:
        """Remove a handler from an event type if currently subscribed."""
        handlers = self._handlers.get(event_type, [])
        if handler in handlers:
            handlers.remove(handler)

    def dispatch(self, event: BaseTransactionEvent) -> int:
        """Dispatch to handlers for the event type and its base event classes."""
        successful = 0
        for registered_type, handlers in list(self._handlers.items()):
            if isinstance(event, registered_type):
                for handler in list(handlers):
                    try:
                        handler.handle(event)
                        successful += 1
                    except Exception:
                        logger.exception(
                            "Event handler %r failed for event %s",
                            handler,
                            event.event_id,
                        )
        return successful
