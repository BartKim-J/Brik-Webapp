'use strict';

let React = require('react');

let {Router, Route} = require('../router');
let {PageNotFound, ServerError} = require('../errors');

let Menu = require('./menu');
let Index = require('./spendIndex');
let About = require('./about');
let Jobs = require('./jobs');
let Faqs = require('./faqs');

let Spend = React.createClass({
  propTypes: {
    route: React.PropTypes.object,
    serverError: React.PropTypes.object,

    pushRoute: React.PropTypes.func.isRequired,
    replaceRoute: React.PropTypes.func.isRequired,
    popRoute: React.PropTypes.func.isRequired
  },

  render() {
    const {route, pushRoute, popRoute} = this.props;
    return (
      <Router
        route={route}
        onPushRoute={pushRoute} onPopRoute={popRoute}
      >
        <div className="Spend">
          <Menu />
          {this.renderMain()}
        </div>
      </Router>
    );
  },
  renderMain() {
    const {serverError} = this.props;
    if (serverError) {
      return (
        <ServerError {...serverError} />
      );
    } else {
      return [
        <Route key="index" path="/$">
          <Index />
        </Route>,
        <Route key="about" path="/about$">
          <About />
        </Route>,
        <Route key="jobs" path="/jobs$">
          <Jobs />
        </Route>,
        <Route key="faqs" path="/faqs$">
          <Faqs />
        </Route>,
        <Route key="pageNotFound">
          <PageNotFound />
        </Route>
      ];
    }
  }
});

module.exports = Spend;
