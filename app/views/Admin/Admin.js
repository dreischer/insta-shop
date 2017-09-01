import React, { Component } from 'preact'
import Auth from '../../utils/Auth'

export default class Admin extends Component {
  constructor (props) {
    super(props)
    this.auth = new Auth()
    this.state = {
      loggedIn: this.auth.isAuthenticated()
    }
  }
  componentDidMount () {
    if (!this.state.loggedIn) {
      this.auth.login()
    }
  }
  render (props, state) {
    const loggedIn = (<div />)
    const notLoggedIn = (<div>{'You\'ll be redirected to log in'}</div>)

    return this.state.loggedIn ? loggedIn : notLoggedIn
  }
}
