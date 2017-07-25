import React from 'preact'
import Router from 'preact-router'

import Header from './components/Header'
import Home from './views/Home'
import Feed from './views/Feed'
import NotFound from './views/NotFound'

import './styles/index.less'

export default class App extends React.Component {
  render () {
    return (
      <div id='app'>
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path='/' />
          <Feed path='/feed' />
          <NotFound type='404' default />
        </Router>
      </div>
    )
  }
}
