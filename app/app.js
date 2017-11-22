import React from 'preact'
import Router from 'preact-router'

// import { isAuthenticated } from './utils/Auth'
import Header from './components/Header'
import Home from './views/Home'
import Feed from './views/Feed'
import NotFound from './views/NotFound'
import Admin from './views/Admin'
import Callback from './views/Callback'

import './styles/index.less'

export default class App extends React.Component {
  routeUpdate (router) {
    // TODO: check if access token has expired
  }

  render (props, state) {
    const { atom, split } = props
    return (
      <div id='app'>
        <Header split={split} atom={atom} />
        <div class='content'>
          <Router onChange={this.routeUpdate.bind(this)}>
            <Home path='/' />
            <Feed path='/feed' />
            <Admin split={split} path='/admin' />
            <Callback path='/callback' />
            <NotFound type='404' default />
          </Router>
        </div>
      </div>
    )
  }
}
