'use strict';

let express = require('express');
let router = express.Router();

let Immutable = require('seamless-immutable');

let faqSections;
try {
  faqSections = require('../data/faqSections');
} catch (e) {
  faqSections = require('../data/examples/faqSections');
}

router.get(/^\/(?:about|jobs)?$/, (req, res, next) => {
  res.renderApp();
});

router.get('/faq', (req, res, next) => {
  let accept = req.accepts(['html', 'json']);
  switch (accept) {
  case 'html':
    res.renderApp(Immutable({faqSections}));
    break;
  case 'json':
    res.json({data: {faqSections}});
    break;
  default:
    res.status(406);
    throw new Error('Not Acceptable');
  }
});

module.exports = router;
