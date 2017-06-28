## Circles game

### Stack

- Node
- Socket.io
- React
- React-konva

### local dev

To get this up and running locally:

- run `npm install` in the root directory
- `cd client` and `npm install`
- run `npm start` from both the root and client directories


### notes

The data structures are all in-memory and based on individual socket connections, so a refresh will clear your selected circles. This is not scalable but the data for the circles is minimal and the scope of this project doesn't warrant a database. If this project were to grow, Redis or Mongo would probably be good choices.
