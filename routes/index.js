'use strict';

let express = require('express');
let router = express.Router();

router.get(/^\/(?:about|jobs|faqs)?$/, (req, res, next) => {
  res.renderApp();
});

module.exports = router;
