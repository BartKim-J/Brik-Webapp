let express = require('express');
let router = express.Router();

let Immutable = require('seamless-immutable');

let {faqSections, jobOpenings, team} = require('../data');

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

router.get('/', (req, res, next) => {
  res.renderApp();
});

router.get('/about', makeRoute({team}));
router.get('/jobs', makeRoute({jobOpenings}));
router.get('/faq', makeRoute({faqSections}));

module.exports = router;
