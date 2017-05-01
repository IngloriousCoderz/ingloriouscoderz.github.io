import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Home from './Home';
import Page from '../containers/Page';
import Post from '../containers/Post';

const customStyle = {
  fontFamily: 'sans-serif',
};

const App = () => (
  <div className="container content" style={customStyle}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/page/:id" component={Page} />
      <Route path="/post/:id" component={Post} />
    </Router>
  </div>
);

export default App;
