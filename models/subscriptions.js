let {db} = require('./index');

db.on('open', () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS subscriptions
    (email TEXT PRIMARY KEY NOT NULL)`,
    function (error) {
      if (error) {
        // TODO: error
      }
    }
  );
});

function create(email) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO subscriptions VALUES (?)', email,
      function (error) {
        if (error) {
          reject(
            new Error(
              error.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: subscriptions.email' ?
                'The email is already registered.' :
                'Oops. Something went wrong.'
            )
          );
        } else {
          resolve(email);
        }
      }
    );
  });
}

module.exports = {
  create
};
