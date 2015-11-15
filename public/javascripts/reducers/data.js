'use strict';

let Immutable = require('seamless-immutable');

const {
  REQUEST_DATA,
  RECEIVE_DATA
} = require('../actions/data').TYPES;

function data(state = Immutable({}), action) {
  let {
    type,
    key, status, data
  } = action;

  switch (type) {
  case REQUEST_DATA:
    return state.without(key);
  case RECEIVE_DATA:
    switch (status) {
    case 'success':
      return state.merge({[key]: data});
    case 'error':
      // TODO
      break;
    default:
      // TODO: error
      break;
    }
  default:
    return state;
  }
}

module.exports = data;
