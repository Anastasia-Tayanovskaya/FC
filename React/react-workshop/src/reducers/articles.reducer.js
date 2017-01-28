import {REQUEST_ARTICLES, RECEIVE_ARTICLES, FAILED_ARTICLES } from '../actions/articles.action';

export const articles = (state = {
  isFetching: false,
  didInvalidate: false,
  authenticated: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.articles,
        lastUpdated: action.receivedAt,
        authenticated: action.authenticated || false
      })
    case FAILED_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      })
    default:
      return state
  }
}