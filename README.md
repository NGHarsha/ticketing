# TICKETING
## Possible Upgrade
When a ticket is created/updated (infact for every event), db is updated(await call) and then the event is published onto NATS(which is also a await call).
What if db update succeeds and event publication fails. Other services that are tightly coupled to NATS will have redundant data(cause db is not updated).
So we need to make sure to cancel event publication if db update fials and viceversa.
