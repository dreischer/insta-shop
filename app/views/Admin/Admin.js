import React, { Component } from 'preact'
import { isAuthenticated, login, getUserInfo } from '../../utils/Auth'

export default class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: isAuthenticated(),
      userInfo: null
    }
  }
  componentDidMount () {
    if (this.state.loggedIn) {
      getUserInfo().then(userInfo => {
        this.setState({ userInfo })
        this.props.split('header', {
          icon: userInfo.picture
        })
      })
    } else {
      login()
    }
  }
  render (props, state) {
    const loggedIn = (<div>{JSON.stringify(state.userInfo, null, 2)}</div>)
    const notLoggedIn = (<div>{'You\'ll be redirected to log in'}</div>)

    return this.state.loggedIn ? loggedIn : notLoggedIn
  }
}
