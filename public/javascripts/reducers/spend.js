'use strict';

let {combineReducers} = require('redux');

let data = require('./data');
let route = require('./route');
let serverError = require('./serverError');

let spendReducer = combineReducers({
  data,
  route,
  serverError
});

module.exports = spendReducer;
