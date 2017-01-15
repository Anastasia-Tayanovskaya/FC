export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';

function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  }
}

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

function receiveArticles(json) {
  return {
    type: RECEIVE_ARTICLES,
    articles: json,
    receivedAt: Date.now()
  }
}

export const fetchArticles = () => {
  return function (dispatch) {
    dispatch(requestArticles());

    return fetch(`http://localhost:3005/api/articles`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveArticles(json))
      )
  }
}