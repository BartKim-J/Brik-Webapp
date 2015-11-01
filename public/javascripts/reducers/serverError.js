'use strict';

const {TYPES} = require('../actions/route');

function serverError(state = null, action) {
  switch (action.type) {
  case TYPES.POP_ROUTE:
    return state ? null : state;
  default:
    return state;
  }
}

module.exports = serverError;
