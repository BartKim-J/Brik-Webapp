let express = require('express');
let router = express.Router();

let validator = require('validator');
let StatusError = require('../errors/StatusError');
let subscriptions = require('../models/subscriptions');
let {csrfProtection} = require('./index');

router.post('/', (req, res, next) => {
  let {email} = req.body;
  if (req.is('json')) {
    if (!(validator.isEmail(email))) {
      throw new StatusError(400, 'Invalid Email');
    }
    subscriptions.create(email)
      .then(email => {
        res.json({});
      }, error => {
        next(error);
      });
  } else {
    csrfProtection(req, res, () => {
      // TODO
    });
  }
});

module.exports = router;
