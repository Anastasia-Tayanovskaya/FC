import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Test from './components/test';
import ArticleSingle from './components/articleSingle';
import ArticleList from './components/articleList';

import store from './store.js';
import {Provider} from 'react-redux';


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ArticleList}/>
        <Route path="/test" component={Test} />
        <Route path="/articles/:id" component={ArticleSingle} />
      </Route>
    </Router>
  </Provider>, 
  document.getElementById('root'));
