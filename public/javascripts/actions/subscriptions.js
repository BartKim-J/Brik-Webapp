const TYPES = {
  REQUEST_NEW_SUBSCRIPTION: 'REQUEST_NEW_SUBSCRIPTION',
  RECEIVE_NEW_SUBSCRIPTION: 'RECEIVE_NEW_SUBSCRIPTION'
};

function requestNewSubscription(email) {
  return {type: TYPES.REQUEST_NEW_SUBSCRIPTION, email};
}

function receiveNewSubscription(status, error = null) {
  return {type: TYPES.RECEIVE_NEW_SUBSCRIPTION, status, error};
}

function postSubscription(email) {
  return (dispatch => {
    dispatch(requestNewSubscription(email));
    return fetch('/subscriptions', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    }).then(response =>
      response.json().then(json => ({response, json}))
    ).then(({response, json: {error = null}}) => {
      if (response.ok) {
        dispatch(receiveNewSubscription('success'));
        return Promise.resolve();
      } else {
        dispatch(receiveNewSubscription('error', error));
        return Promise.reject(error);
      }
    });
  });
}

module.exports = {
  TYPES,

  postSubscription
};
