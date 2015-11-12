'use strict';

let {connect} = require('react-redux');

let Spend = require('../components/spend');

let {fetchFaqSections} = require('../actions/faqSections');
let {
  pushRoute, replaceRoute, popRoute
} = require('../actions/route');

function mapStateToProps(state) {
  return state;
}

let actionCreators = {
  fetchFaqSections,
  pushRoute, replaceRoute, popRoute
};

let App = connect(mapStateToProps, actionCreators)(Spend);

module.exports = App;
