let {combineReducers} = require('redux');

let data = require('./data');
let menu = require('./menu');
let route = require('./route');
let serverError = require('./serverError');

let spendReducer = combineReducers({
  data,
  menu,
  route,
  serverError
});

module.exports = spendReducer;
