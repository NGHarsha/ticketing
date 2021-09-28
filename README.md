# TICKETING
## Possible Upgrade
When a ticket is created/updated (infact for every event), db is updated(await call) and then the event is published onto NATS(which is also a await call).
What if db update succeeds and event publication fails. Other services that are tightly coupled to NATS will have redundant data(cause db is not updated).
So we need to make sure to cancel event publication if db update fials and viceversa.
### EVERYTHING GOES FINE CASE
![Screenshot from 2021-09-28 11-52-45](https://user-images.githubusercontent.com/52374838/135034201-e30c2346-ddba-469f-8cc7-81862ab93640.png)
### NATS GOES WILD CASE
![Screenshot from 2021-09-28 11-55-06](https://user-images.githubusercontent.com/52374838/135034352-80a67ff3-982f-476e-bb7f-3b114b71bce7.png)
### ONE SOLUTION
Maintain a collection for storing events with NATS publication status as a field of collection. A separae snippet should be watching the events collection and publish onto NATS. If it succeeds commit the db transaction. Else rollback it.
![Screenshot from 2021-09-28 11-56-13](https://user-images.githubusercontent.com/52374838/135034478-3b6be0fd-f766-4448-be27-2e4a3c837670.png)
