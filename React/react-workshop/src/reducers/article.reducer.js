import { REQUEST_ARTICLE, RECEIVE_ARTICLE, FAILED_ARTICLE } from '../actions/article.action';

export const currentArticle = (state = {
  isFetching: false,
  didInvalidate: false,
  authenticated: false,
  item: {}
}, action) => {
  switch (action.type) {
    case REQUEST_ARTICLE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ARTICLE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        item: action.article,
        lastUpdated: action.receivedAt,
        authenticated: action.authenticated || false
      })
    case FAILED_ARTICLE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      })
    default:
      return state
  }
}