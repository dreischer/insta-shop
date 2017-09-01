import React, { Component } from 'preact'
import { isAuthenticated, login } from '../../utils/Auth'

export default class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: isAuthenticated()
    }
  }
  componentDidMount () {
    if (!this.state.loggedIn) {
      login()
    }
  }
  render (props, state) {
    const loggedIn = (<div />)
    const notLoggedIn = (<div>{'You\'ll be redirected to log in'}</div>)

    return this.state.loggedIn ? loggedIn : notLoggedIn
  }
}
