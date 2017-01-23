import { callApi } from '../callApi';

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';
export const FAILED_ARTICLE = 'FAILED_ARTICLE';

function requestArticle() {
  return {
    type: REQUEST_ARTICLE
  }
}

function receiveArticle(json) {
  return {
    type: RECEIVE_ARTICLE,
    article: json,
    receivedAt: Date.now()
  }
}

function failedArticle(err) {
  return {
    type: FAILED_ARTICLE
  }
}
export const fetchSingleArticle = (id) => {
  return function (dispatch) {
    dispatch(requestArticle());

    return callApi(`articles/${id}`, true) 
      .then(response => response.json())
      .then(json => dispatch(receiveArticle(json)), 
            err => dispatch(failedArticle(err))
      )
  }
}