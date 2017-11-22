import axios from 'axios'
import React, { Component } from 'preact'
import { isAuthenticated, login, getUserInfo, getToken } from '../../utils/Auth'
import Feed from '../../components/Instagram/Feed'

export default class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: isAuthenticated(),
      userInfo: null,
      igFeed: null
    }
  }

  componentDidMount () {
    if (this.state.loggedIn) {
      getUserInfo().then(userInfo => {
        this.setState({ userInfo })
        this.props.split({ user: userInfo })
      })
      axios.get('/api/admin/feed', { headers: { Authorization: `Bearer ${getToken().access_token}` } }).then(data => {
        this.setState({ igFeed: data.data.data.data })
      })
    } else {
      login()
    }
  }

  render (props, state) {
    return this.state.igFeed ? <Feed data={this.state.igFeed} /> : <div>{'You\'ll be redirected to log in'}</div>
  }
}
