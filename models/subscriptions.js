let {db} = require('./index');
var MailChimpAPI = require('mailchimp').MailChimpAPI;

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
                    subscribeToMailChimp(email);
                    resolve(email);
                }
            }
        );
    });
}

function subscribeToMailChimp(submittedEmail) {

    var merge_vars = [
        { EMAIL: submittedEmail },
        { LNAME: '' },
        { FNAME: '' }
    ];

    try {
        var api = new MailChimpAPI(CONF.MAILCHIMP_API_KEY, { version : '2.0' });
        api.call('lists', 'subscribe', {
          id: '7d31ccc315',
          email: {email: submittedEmail},
          merge_vars: merge_vars,
          double_optin: false,
          update_existing: true
      }, function() {
          console.log("Subscribed user to mailing list");
      }, function(error) {
          console.log("Subscribing user to mailing list failed " + error);
      });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    create,
    addToMailChimp
};
