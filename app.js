'use strict';

require('./conf');

let express = require('express');

let path = require('path');

let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let sassMiddleware = require('node-sass-middleware');
let appRenderer = require('./middlewares/appRenderer');
let serfSafe = require('./middlewares/serfSafe');

let routes = require('./routes');

let app = express();

let publicPath = path.join(__dirname, 'public');
let isDev = (app.get('env') === 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// TODO: Uncomment after placing favicon in `/public`.
// app.use(favicon(path.join(publicPath, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: publicPath, dest: publicPath,
  precision: 8,
  sourceMap: true
}));
app.use(express.static(publicPath));

app.use(appRenderer);
if (isDev) {
  app.use(serfSafe);
}

app.use('/', routes);

// catch 404
app.use((req, res, next) => {
  res.status(404);
  res.renderApp();
});

// non-404 error handlers

// development error handler
// will print stacktrace
if (isDev) {
  app.use((err, req, res, next) => {
    let {status, message: title, stack} = err;
    res.status(status || 500);
    res.renderError({
      title, detail: {status, stack}
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.renderError({
    title: err.message
  });
});

module.exports = app;
