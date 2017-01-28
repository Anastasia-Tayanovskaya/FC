import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
 

import { fetchArticles } from './actions/articles.action';
import { authentication } from './reducers/login.reducer';
import { counter } from './reducers/increment.reducer';
import { articles } from './reducers/articles.reducer';
import { currentArticle } from './reducers/article.reducer';

 
let store = createStore(
  combineReducers({ counter, articles, currentArticle, authentication }), 
  applyMiddleware(thunkMiddleware)
);
 
// You can use subscribe() to update the UI in response to state changes. 
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly. 
// However it can also be handy to persist the current state in the localStorage. 
 
store.subscribe(() =>
  console.log(store.getState())
)
 
// The only way to mutate the internal state is to dispatch an action. 
// The actions can be serialized, logged or stored and later replayed. 
store.dispatch({ type: 'INCREMENT' })
// 1 
store.dispatch({ type: 'INCREMENT' })
// 2 
store.dispatch({ type: 'DECREMENT' })
// 1 

// store.dispatch(fetchArticles()).then(() =>
//   console.log(store.getState())
// )

export default store;