import React from 'preact'
import Router from 'preact-router'

import Header from './components/Header'
import Home from './views/Home'
import Feed from './views/Feed'
import NotFound from './views/NotFound'
import Admin from './views/Admin'

import './styles/index.less'

export default class App extends React.Component {
  render () {
    return (
      <div id='app'>
        <Header />
        <div class='content'>
          <Router onChange={this.handleRoute}>
            <Home path='/' />
            <Feed path='/feed' />
            <Admin path='/admin' />
            <NotFound type='404' default />
          </Router>
        </div>
      </div>
    )
  }
}
