'use strict';

require('isomorphic-fetch');
require('./conf');

let express = require('express');

let path = require('path');

let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let appRenderer = require('./middlewares/appRenderer');
let serfSafe = require('./middlewares/serfSafe');

let routes = require('./routes');

let app = express();

let publicPath = path.join(__dirname, 'public');
let isDev = (app.get('env') === 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(publicPath, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(publicPath));

app.use(appRenderer);
if (isDev) {
  app.use(serfSafe);
}

app.use('/', routes);

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
    res.renderError(
      isDev ?
        {title: message, detail: {status, stack}} :
        {title: message}
    );
  }
});

module.exports = app;
