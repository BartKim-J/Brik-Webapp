let satelize = require('satelize');

function lang(req, res, next) {
  let {ip, query} = req;

  if (process.env.NODE_ENV !== 'production' && query.lang) {
    res.lang = query.lang;
    next();
  } else {
    // TODO: use cookie/session to speed up
    satelize.satelize({ip}, (err, payload) => {
      res.lang = (!err && payload && payload.country_code === 'KR') ?
        'ko' :
        'en';
      next();
    });
  }
}

module.exports = lang;
