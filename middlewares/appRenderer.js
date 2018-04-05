let Immutable = require('seamless-immutable');

let spendReducer = require('../public/javascripts/reducers/spend');
let {createStore} = require('redux');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let {Provider} = require('react-redux');
let {IntlProvider} = require('react-intl');
let App = require('../public/javascripts/containers/app');
let Helmet = require('react-helmet');

let messages = require('../messages');

let BrowserUpgrade = require('../public/javascripts/components/browserUpgrade');
const BROWSER_UPGRADE = ReactDOMServer.renderToString(
  <BrowserUpgrade />
);

function appRenderer(req, res, next) {
  Object.assign(res, {
    renderApp(state = Immutable({})) {
      let store;
      let content, title, meta;
      let {lang} = res;
      let nonDataMessages = messages.lang('en').getNonData();
      let csrfToken = req.csrfToken();
      state = state.merge({route: {pathname: req.path}});
      store = createStore(spendReducer, state);
      content = ReactDOMServer.renderToString(
        <Provider store={store}>
          <IntlProvider locale={lang} messages={nonDataMessages}>
            <App csrfToken={csrfToken} />
          </IntlProvider>
        </Provider>
      );
      ({title, meta} = Helmet.rewind());

      this.render('app', {
        title, meta,
        BROWSER_UPGRADE,
        content,
        INITIAL_STATE: JSON.stringify(store.getState()),
        MESSAGES: JSON.stringify(nonDataMessages),
        CSRF_TOKEN: JSON.stringify(csrfToken),
        lang,
        isDev: (process.env.NODE_ENV !== 'production')
      });
    },
    renderError(title, detail = null) {
      this.renderApp(
        Immutable({serverError: {title, detail}})
      );
    }
  });

  next();
}

module.exports = appRenderer;
