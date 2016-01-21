# Seagull

## Requirements

- [Node.js](https://nodejs.org): Developed with 4.2.2

[node-sqlite3](https://github.com/mapbox/node-sqlite3) uses [node-gyp](https://github.com/nodejs/node-gyp), and thus the system must meet [node-gyp's requirements](https://github.com/nodejs/node-gyp#installation).

## Environment Variables

- `NODE_ENV`: Set to `production` on a production environment. Like this: export NODE_ENV=production
- `SEAGULL_SQLITE_FILE`: If not set, an anonymous in-memory database is used.
