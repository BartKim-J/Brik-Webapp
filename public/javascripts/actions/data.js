const TYPES = {
  REQUEST_DATA: 'REQUEST_DATA',
  RECEIVE_DATA: 'RECEIVE_DATA'
};

function requestData(key) {
  return {type: TYPES.REQUEST_DATA, key};
}

function receiveData(key, status, data) {
  return {
    type: TYPES.RECEIVE_DATA,
    key, status,
    [status === 'error' ? 'error' : 'data']: data
  };
}

function fetchData(key) {
  let url;

  switch (key) {
  case 'faqSections':
    url = '/faq';
    break;
  case 'jobOpenings':
    url = '/jobs';
    break;
  case 'legalDocs':
    url = '/legal';
    break;
  case 'team':
    url = '/about';
    break;
  default:
    // TODO: error
    break;
  }

  return (dispatch => {
    dispatch(requestData(key));
    return fetchWithGa(url, {
      headers: {
        Accept: 'application/json'
      }
    }, 'Data').then(
      response =>
        response.json().then(json => ({response, json}))
    ).then(({response, json: {data = null, error = null}}) => {
      if (response.ok) {
        data = data[key];
        dispatch(receiveData(key, 'success', data));
        return Promise.resolve(data);
      } else {
        return Promise.reject(error);
      }
    }).catch(error => {
      dispatch(receiveData(key, 'error', error));
      ga(
        'send', 'event',
        'Data', 'error', `key: \`${key}\`, message: "${error.message}"`
      );

      throw error;
    });
  });
}

module.exports = {
  TYPES,

  fetchData
};
