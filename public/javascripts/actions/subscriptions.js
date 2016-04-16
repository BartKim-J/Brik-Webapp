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
  fbq('track', 'Lead', {
    content_name: 'Email Subscription',
    value: email
  });

  window.location =  "/contest";

  return (dispatch => {
    dispatch(requestNewSubscription(email));
    ga('send', 'event', 'Email Subscription', 'create', email);

    return fetchWithGa('/subscriptions', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    }, 'Email Subscription').then(
      response =>
        response.json().then(json => ({response, json}))
    ).then(({response, json: {error = null}}) => {
      if (response.ok) {
        dispatch(receiveNewSubscription('success'));
        return Promise.resolve();
      } else {
        return Promise.reject(error);
      }
    }).catch(error => {
      dispatch(receiveNewSubscription('error', error));
      ga(
        'send', 'event',
        'Email Subscription', 'error',
        `email: ${email}, message: "${error.message}"`
      );

      throw error;
    });
  });
}

module.exports = {
  TYPES,
  postSubscription
};
