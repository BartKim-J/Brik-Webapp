'use strict';

require('stylesheets/app.scss');

require('isomorphic-fetch');
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

createStore = applyMiddleware(thunk)(createStore);

let store = createStore(
  spendReducer,
  Immutable(window.INITIAL_STATE)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);

console.log(store.getState());
store.subscribe(() => {
  console.log(store.getState());
});
