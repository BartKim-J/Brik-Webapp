'use strict';

let Immutable = require('seamless-immutable');

const {
  REQUEST_FAQ_SECTIONS,
  RECEIVE_FAQ_SECTIONS
} = require('../actions/faqSections').TYPES;

function faqSections(state = null, action) {
  let {
    type,
    status, faqSections
  } = action;

  switch (type) {
  case REQUEST_FAQ_SECTIONS:
    return null;
  case RECEIVE_FAQ_SECTIONS:
    switch (status) {
    case 'success':
      return Immutable(faqSections);
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

module.exports = faqSections;
