# ok, things to document and/or implement

- use of sass if the ui grows
- better folder structure if the project grows as well
- in-memory stuff instead of db (not scalable)
  - if ya use a db, the multiplyer needs to accommodate for a non-zero based tile id
  - and multiplyer is misspelled but i'm leaving it because it looks cool

plan for updates:

- server emits socket events structured like: `updateCircle:{id}`
- individual circleTiles listen for the event based on their id, and update accordingly
- if a user quits, the server detects the disconnect and updates all circles currently possessed by the user, emitting events which allow the client to automagically clear that user's circles
