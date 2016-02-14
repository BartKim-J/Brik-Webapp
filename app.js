"use strict";

require('array.prototype.findindex');
require('isomorphic-fetch');
global.Intl = require('intl');

require('./conf');

let express = require('express');

let path = require('path');

let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let lang = require('./middlewares/lang');
let appRenderer = require('./middlewares/appRenderer');
let serfSafe = require('./middlewares/serfSafe');

let routes = require('./routes');
let subscriptions = require('./routes/subscriptions');

let app = express();

let publicPath = path.join(__dirname, 'public');
let isDev = (app.get('env') === 'development');

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

if (!isDev) {
  app.enable('trust proxy');
}

app.use(favicon(path.join(publicPath, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(publicPath));

// React Intl seems to make some requests erroneously.
app.use((req, res, next) => {
  switch (req.path) {
  case '/javascripts/core.js.map':
  case '/javascripts/es5.js.map':
  case '/javascripts/main.js.map':
    res.status(404).send('Page Not Found');
    break;
  default:
    next();
    break;
  }
});

app.use(lang);
app.use(appRenderer);
if (isDev) {
  app.use(serfSafe);
}

app.use('/', routes);
app.use('/subscriptions', subscriptions);

// catch 404
app.use((req, res, next) => {
  res.status(404).renderApp();
});

// non-404 error handlers

app.use((err, req, res, next) => {
  let {status, message, stack} = err;
  res.status(status || 500);
  if (req.accepts(['html', 'json']) === 'json') {
    res.json({
      error: isDev ?
        {message, stack} :
        {message}
    });
  } else {
    if (isDev) {
      console.log(message);
    } else {
      console.log(message);
    }
  }
});

module.exports = app;
