'use strict';

let Immutable = require('seamless-immutable');

const {TYPES} = require('../actions/route');

function route(state = null, action) {
  const {
    type,
    url, pathname
  } = action;

  switch (type) {
  case TYPES.PUSH_ROUTE:
    return Immutable({url, urlType: 'PUSH'});
  case TYPES.REPLACE_ROUTE:
    return Immutable({url, urlType: 'REPLACE'});
  case TYPES.POP_ROUTE:
    return Immutable({pathname});
  default:
    return state;
  }
}

module.exports = route;
