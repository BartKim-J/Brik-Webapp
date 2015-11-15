'use strict';

let express = require('express');
let router = express.Router();

let Immutable = require('seamless-immutable');

let {faqSections, jobOpenings} = require('../data');

function makeRoute(data) {
  return ((req, res, next) => {
    let accept = req.accepts(['html', 'json']);
    switch (accept) {
    case 'html':
      res.renderApp(Immutable({data}));
      break;
    case 'json':
      res.json({data});
      break;
    default:
      res.status(406);
      throw new Error('Not Acceptable');
    }
  });
}

router.get(/^\/(?:about)?$/, (req, res, next) => {
  res.renderApp();
});

router.get('/jobs', makeRoute({jobOpenings}));
router.get('/faq', makeRoute({faqSections}));

module.exports = router;
