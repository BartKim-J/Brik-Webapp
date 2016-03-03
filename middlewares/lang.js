let satelize = require('satelize');
let cookieParser = require('cookie-parser');

function lang(req, res, next) {
  let {ip, query} = req;

  if (query.lang) {
    res.lang = query.lang;
    res.cookie('lang', query.lang);
    next();
  } else if (req.cookies.lang) {
    res.lang = req.cookies.lang;
    next();
  } else {
    satelize.satelize({ip}, (err, payload) => {
      res.lang = (!err && payload && payload.country_code === 'KR') ?
        'ko' :
        'en';
      res.cookie('lang', res.lang);
      next();
    });
  }
}

module.exports = lang;
