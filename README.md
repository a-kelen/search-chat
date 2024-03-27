# Search Chat

Description: This chat is used to send messages through the sockets and receive responses from a Google Custom Search API.

#### Note: there are ~90 requests left under this token so be careful.

### Setup
Client: _CD_ to UI folder and run `npm run dev`

Server: _CD_ to SERVER folder and run `uvicorn main:app --reload`

P.S. If there are some troubles with ports and connection between the frontend and backend try to change configs in .env files on both sides

### How it works
The client opens chat for the first time, then connects to the socket and gets the first session ID, which is saved to local storage so we have some Persistent Session ID.
On the next reconnections, we send this ID to the auth object, and every time when someone connects to server using a random Session ID, by extracting Persistent ID the client is joined to the room with ID == PersistentID.
And then every emitted message goes to the room.
I've tried to make it like this https://socket.io/get-started/private-messaging-part-2/#persistent-session-id, but python library has some limitations and I chose the above algorithm.
