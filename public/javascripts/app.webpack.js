require('stylesheets/app.scss');

require('array.prototype.findindex');
require('classlist-polyfill');
require('isomorphic-fetch');
require('string.prototype.startswith');

if (!(Object.assign)) {
  Object.assign = require('object-assign');
}

// TEMP
if (!(window.Promise)) {
  window.Promise = require('es6-promise').Promise;
}

require('../../conf');

let Immutable = require('seamless-immutable');

let thunk = require('redux-thunk');
let {createStore, applyMiddleware} = require('redux');
let spendReducer = require('./reducers/spend');
let React = require('react');
let ReactDOM = require('react-dom');
let {Provider} = require('react-redux');
let App = require('./containers/app');

let noop = require('lodash/utility/noop');

// Avoid `console` errors in browsers that lack a console.
((window, noop) => {
  let methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info',
    'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time',
    'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  let console = (window.console = window.console || {});

  methods.forEach(method => {
    // Only stub undefined methods.
    if (!(console[method])) {
      console[method] = noop;
    }
  });
})(window, noop);

window.fetchWithGa = ((input, init = undefined, gaTimingCat) => {
  let gaTimingVar = 'load';
  let time = Date.now();

  if (!gaTimingCat) {
    gaTimingCat = init;
    init = undefined;
  }

  if (init && init.method && init.method !== 'get') {
    gaTimingVar = init.method;
  }

  return fetch(input, init).then(response => {
    ga('send', 'timing', gaTimingCat, gaTimingVar, Date.now() - time);
    return response;
  });
});

const {INITIAL_STATE, CSRF_TOKEN} = window;

createStore = applyMiddleware(thunk)(createStore);
let store = createStore(spendReducer, Immutable(INITIAL_STATE));

ReactDOM.render(
  <Provider store={store}>
    <App csrfToken={CSRF_TOKEN} />
  </Provider>,
  document.getElementById('content')
);

if (Modernizr.performance) {
  ga('send', 'timing', 'Page', 'load', performance.now());
}

window.onerror = ((message, file, line, column = null) => {
  ga('send', 'exception', {
    exDescription: `message: "${message}", location: ${file}:${line}${
      (typeof column === 'number') ? `:${column}` : ''
    }`
  });
});
