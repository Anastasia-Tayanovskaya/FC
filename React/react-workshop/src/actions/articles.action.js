import { callApi } from '../callApi';

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export const FAILED_ARTICLES = 'FAILED_ARTICLES';

function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  }
}

function receiveArticles(json) {
  return {
    type: RECEIVE_ARTICLES,
    articles: json,
    receivedAt: Date.now()
  }
}

function failedArticles(err) {
  return {
    type: FAILED_ARTICLES
  }
}

export const fetchArticles = () => {
  return function (dispatch) {
    dispatch(requestArticles());

    return callApi('articles', true) 
      .then(response => response.json())
      .then(json => dispatch(receiveArticles(json)), 
            err => dispatch(failedArticles(err))
      )
  }
}
