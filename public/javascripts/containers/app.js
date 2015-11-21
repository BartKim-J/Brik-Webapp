let {connect} = require('react-redux');

let Spend = require('../components/spend');

let {fetchData} = require('../actions/data');
let {toggleMenu} = require('../actions/menu');
let {
  pushRoute, replaceRoute, popRoute
} = require('../actions/route');

function mapStateToProps(state) {
  return state;
}

let actionCreators = {
  fetchData,
  toggleMenu,
  pushRoute, replaceRoute, popRoute
};

let App = connect(mapStateToProps, actionCreators)(Spend);

module.exports = App;
