'use strict';

let Immutable = require('seamless-immutable');

const {
  TOGGLE_MENU
} = require('../actions/menu').TYPES;
const {
  POP_ROUTE
} = require('../actions/route').TYPES;

const DEFAULT_STATE = Immutable({isOpen: false});

function menu(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case TOGGLE_MENU:
    return Immutable({isOpen: !(state.isOpen)});
  case POP_ROUTE:
    return DEFAULT_STATE;
  default:
    return state;
  }
}

module.exports = menu;
