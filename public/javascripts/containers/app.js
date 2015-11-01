'use strict';

let {connect} = require('react-redux');

let Spend = require('../components/spend');

let {
  pushRoute, replaceRoute, popRoute
} = require('../actions/route');

function mapStateToProps(state) {
  return state;
}

let actionCreators = {
  pushRoute, replaceRoute, popRoute
};

let App = connect(mapStateToProps, actionCreators)(Spend);

module.exports = App;
