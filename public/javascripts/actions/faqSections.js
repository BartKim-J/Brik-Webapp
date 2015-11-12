'use strict';

const TYPES = {
  REQUEST_FAQ_SECTIONS: 'REQUEST_FAQ_SECTIONS',
  RECEIVE_FAQ_SECTIONS: 'RECEIVE_FAQ_SECTIONS'
};

function requestFaqSections() {
  return {type: TYPES.REQUEST_FAQ_SECTIONS};
}

function receiveFaqSections(status, data) {
  let action = {type: TYPES.RECEIVE_FAQ_SECTIONS, status};
  switch (status) {
  case 'success':
    action.faqSections = data.faqSections;
    break;
  case 'error':
    action.error = data;
    break;
  default:
    // TODO: error
    break;
  }
  return action;
}

function fetchFaqSections() {
  return (dispatch => {
    dispatch(requestFaqSections());
    return fetch('/faq', {
      headers: {
        Accept: 'application/json'
      }
    }).then(response =>
      response.json().then(json => ({response, json}))
    ).then(({response, json}) =>
      dispatch(response.ok ?
        receiveFaqSections('success', json.data) :
        receiveFaqSections('error', json.error))
    );
  });
}

module.exports = {
  TYPES,

  fetchFaqSections
};
