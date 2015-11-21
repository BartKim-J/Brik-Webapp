let Immutable = require('seamless-immutable');

let spendReducer = require('../public/javascripts/reducers/spend');
let {createStore} = require('redux');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let {Provider} = require('react-redux');
let App = require('../public/javascripts/containers/app');
let Helmet = require('react-helmet');

let assign = require('lodash/object/assign');

let BrowserUpgrade = require('../public/javascripts/components/browserUpgrade');
const BROWSER_UPGRADE = ReactDOMServer.renderToString(
  <BrowserUpgrade />
);

function appRenderer(req, res, next) {
  assign(res, {
    renderApp(state = Immutable({}), lang = 'en') {
      let store;
      let content, title, meta;

      state = state.merge({route: {pathname: req.path}});
      store = createStore(spendReducer, state);
      content = ReactDOMServer.renderToString(
        <Provider store={store}>
          <App />
        </Provider>
      );
      ({title, meta} = Helmet.rewind());

      this.render('app', {
        title, meta,
        BROWSER_UPGRADE,
        content,
        INITIAL_STATE: JSON.stringify(store.getState()),
        lang
      });
    },
    renderError({title, detail = null, lang = null}) {
      this.renderApp(
        Immutable({serverError: {title, detail}}),
        lang
      );
    }
  });

  next();
}

module.exports = appRenderer;
