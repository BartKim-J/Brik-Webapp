let express = require('express');
let router = express.Router();

let {csrfProtection} = require('./index');

let subscriptions = require('../models/subscriptions');

router.post('/', (req, res, next) => {
  if (req.is('json')) {
    // TODO: validation
    try {
      subscriptions.create(req.body.email);
    } catch (e) {
      // TODO
    }
    res.json({});
  } else {
    csrfProtection(req, res, () => {
      // TODO
    });
  }
});

module.exports = router;
