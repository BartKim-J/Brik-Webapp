'use strict';

require('../../conf');

let spendReducer = require('reducers/spend');
let {createStore} = require('redux');
let React = require('react');
let ReactDOM = require('react-dom');
let {Provider} = require('react-redux');
let App = require('containers/app');

const NOOP = (() => {});

// Avoid `console` errors in browsers that lack a console.
((window, NOOP) => {
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
      console[method] = NOOP;
    }
  });
})(window, NOOP);

if (Modernizr.touchevents) {
  React.initializeTouchEvent(true);
}

let store = createStore(spendReducer, window.INITIAL_STATE);

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
