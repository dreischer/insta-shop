import React from 'preact'
import Router from 'preact-router'

import { isAuthenticated, login } from './utils/Auth'
import Header from './components/Header'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Admin from './views/Admin'
import Callback from './views/Callback'

import './app.css'

export default class App extends React.Component {
  routeUpdate (router) {
    if (!isAuthenticated() && /\/admin/.test(router.url)) {
      login()
    }
  }

  render (props, state) {
    const { atom } = props
    return (
      <div id='app'>
        <Header atom={atom} />
        <div class='content'>
          <Router onChange={this.routeUpdate.bind(this)}>
            <Home path='/' />
            <Admin atom={atom} path='/admin/:route?' />
            <Callback atom={atom} path='/callback' />
            <NotFound type='404' default />
          </Router>
        </div>
      </div>
    )
  }
}
