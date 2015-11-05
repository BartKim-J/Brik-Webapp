'use strict';

let Immutable = require('seamless-immutable');

const {
  PUSH_ROUTE,
  REPLACE_ROUTE,
  POP_ROUTE
} = require('../actions/route').TYPES;

function route(state = null, action) {
  let {
    type,
    url, pathname
  } = action;

  switch (type) {
  case PUSH_ROUTE:
    return Immutable({url, urlType: 'PUSH'});
  case REPLACE_ROUTE:
    return Immutable({url, urlType: 'REPLACE'});
  case POP_ROUTE:
    return Immutable({pathname});
  default:
    return state;
  }
}

module.exports = route;
