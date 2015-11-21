const {
  POP_ROUTE
} = require('../actions/route').TYPES;

function serverError(state = null, action) {
  switch (action.type) {
  case POP_ROUTE:
    return state ? null : state;
  default:
    return state;
  }
}

module.exports = serverError;
