'use strict';

let {connect} = require('react-redux');

let Spend = require('../components/spend');

let {fetchData} = require('../actions/data');
let {
  pushRoute, replaceRoute, popRoute
} = require('../actions/route');

function mapStateToProps(state) {
  return state;
}

let actionCreators = {
  fetchData,
  pushRoute, replaceRoute, popRoute
};

let App = connect(mapStateToProps, actionCreators)(Spend);

module.exports = App;
