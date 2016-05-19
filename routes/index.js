let express = require('express');
let router = express.Router();

let Immutable = require('seamless-immutable');

let csrf = require('csurf');
let omit = require('lodash/object/omit');

let dataModule = require('../data');
let StatusError = require('../errors/StatusError');
let messages = require('../messages');

var cookieParser = require('cookie-parser')

let csrfProtection = csrf({
  cookie: {
    httpOnly: true
  }
});

function makeRoute(dataKey) {
  return ((req, res, next) => {
    let accept = req.accepts(['html', 'json']);

    let data = dataModule[dataKey];
    let {messageId} = data;
    let messageData = (messages.lang(res.lang))[messageId];
    data = {
      [dataKey]: Object.assign(
        omit(data, 'messageId'),
        {data: messageData}
      )
    };

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

router.get('/swaplang', (req, res, next) => {
  if (req.cookies.lang == 'ko') {
      res.cookie('lang', 'en');
  } else if (req.cookies.lang == 'en') {
      res.cookie('lang', 'ko');
  }
  res.redirect('back');
});

router.get('/jobs', makeRoute('jobOpenings'));
router.get('/faq', makeRoute('faqSections'));
router.get('/legal', makeRoute('legalDocs'));
router.get('/team', makeRoute('team'));
router.get('/success', makeRoute('success'));
router.get('/promotion', makeRoute('promotion'));
router.get('/presskit', makeRoute('presskit'));

router.csrfProtection = csrfProtection;

module.exports = router;
