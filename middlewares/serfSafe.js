'use strict';

// FOR DEVELOPMENT/STAGE
// https://github.com/h5bp/html5-boilerplate/issues/804
function serfSafe(req, res, next) {
  res.header('X-Robots-Tag', 'none');
  next();
}

module.exports = serfSafe;
