let sqlite3 = require('sqlite3');

const {NODE_ENV, SEAGULL_SQLITE_FILE} = process.env;

if (NODE_ENV !== 'production') {
  sqlite3.verbose();
}

let sqliteFile = SEAGULL_SQLITE_FILE || ':memory:';
let db = new sqlite3.Database(sqliteFile, error => {
  if (error) {
    // TODO: error
  }
});

module.exports = {db};
