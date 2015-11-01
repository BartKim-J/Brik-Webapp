'use strict';

let {combineReducers} = require('redux');

let route = require('./route');
let serverError = require('./serverError');

let spendReducer = combineReducers({
  route,
  serverError
});

module.exports = spendReducer;
