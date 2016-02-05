require('stylesheets/app.scss');

require('array.prototype.findindex');
require('classlist-polyfill');
require('isomorphic-fetch');
require('string.prototype.startswith');

function withPromise() {
  let {lang} = document.documentElement;

  Promise.all([
    new Promise((resolve, reject) => {
      if (Number.isNaN) {
        resolve();
      } else {
        require(['is-nan'], isNaN => {
          Number.isNaN = isNaN;
          resolve();
        });
      }
    }),
    new Promise((resolve, reject) => {
      if (Object.assign) {
        resolve();
      } else {
        require(['object-assign'], objectAssign => {
          Object.assign = objectAssign;
          resolve();
        });
      }
    }),
    new Promise((resolve, reject) => {
      if (window.Intl) {
        resolve();
      } else {
        require(['intl'], intl => {
          switch (lang) {
          case 'en':
            require(['intl/locale-data/jsonp/en'], resolve);
            break;
          case 'ko':
            require(['intl/locale-data/jsonp/ko'], resolve);
            break;
          default:
            reject(new Error('`lang` Not Supported'));
            break;
          }
        });
      }
    }),
    new Promise((resolve, reject) => {
      if (lang === 'ko') {
        let {addLocaleData} = require('react-intl');
        require(['react-intl/lib/locale-data/ko'], ko => {
          addLocaleData(ko);
          resolve();
        });
      } else {
        resolve();
      }
    })
  ]).then(() => {
    require('../../conf');

    let Immutable = require('seamless-immutable');
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
        ga(
          'send', 'timing',
          gaTimingCat, gaTimingVar, Date.now() - time
        );
        return response;
      });
    });

    ((window, document, Immutable) => {
      let thunk = require('redux-thunk');
      let {createStore, applyMiddleware} = require('redux');
      let spendReducer = require('./reducers/spend');
      let React = require('react');
      let ReactDOM = require('react-dom');
      let {Provider} = require('react-redux');
      let {IntlProvider} = require('react-intl');
      let App = require('./containers/app');

      const {INITIAL_STATE, MESSAGES, CSRF_TOKEN} = window;
      let store;

      createStore = applyMiddleware(thunk)(createStore);
      store = createStore(spendReducer, Immutable(INITIAL_STATE));

      ReactDOM.render(
        <Provider store={store}>
          <IntlProvider locale={lang} messages={MESSAGES}>
            <App csrfToken={CSRF_TOKEN} />
          </IntlProvider>
        </Provider>,
        document.getElementById('content')
      );
    })(window, document, Immutable);

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
  });
}

if (window.Promise) {
  withPromise();
} else {
  // TEMP
  require(['es6-promise'], es6Promise => {
    window.Promise = es6Promise.Promise;
    withPromise();
  });
}
