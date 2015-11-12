'use strict';

let {combineReducers} = require('redux');

let faqSections = require('./faqSections');
let route = require('./route');
let serverError = require('./serverError');

let spendReducer = combineReducers({
  faqSections,
  route,
  serverError
});

module.exports = spendReducer;
