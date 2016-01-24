let express = require('express');
let router = express.Router();

let Immutable = require('seamless-immutable');

let csrf = require('csurf');
let {
  faqSections, jobOpenings, legalDocs, team
} = require('../data');
let StatusError = require('../errors/StatusError');

let csrfProtection = csrf({
  cookie: {
    httpOnly: true
  }
});

function makeRoute(data) {
  return ((req, res, next) => {
    let accept = req.accepts(['html', 'json']);
    switch (accept) {
    case 'html':    
      csrfProtection(req, res, () => {
        res.renderApp(Immutable({data}));
      });
      break;
    case 'json':
      res.json({data});
      break;
    default:
      throw new StatusError(406, 'Not Acceptable');
    }
  });
}

router.get('/', csrfProtection, (req, res, next) => {
  res.renderApp();
});

router.get('/about', makeRoute({team}));
router.get('/jobs', makeRoute({jobOpenings}));
router.get('/faq', makeRoute({faqSections}));
router.get('/legal', makeRoute({legalDocs}));

router.csrfProtection = csrfProtection;

module.exports = router;
