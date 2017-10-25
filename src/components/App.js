import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import Page from '../containers/Page'
import Post from '../containers/Post'

const customStyle = {
  fontFamily: 'sans-serif'
}

const App = () => (
  <div className="container content" style={customStyle}>
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/page/:id" component={Page} />
        <Route path="/post/:id" component={Post} />
      </div>
    </Router>
  </div>
)

export default App
