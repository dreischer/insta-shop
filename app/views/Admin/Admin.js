import axios from 'axios'
import React, { Component } from 'preact'
import { isAuthenticated, login, getUserInfo, getToken } from '../../utils/Auth'
import { Link } from 'preact-router'
import Feed from '../../components/Instagram/Feed'

import './Admin.less'

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
    const { atom } = props
    const image = atom.user ? atom.user.picture : null
    const title = atom.user && atom.user.name

    return (
      <div class='admin'>
        <div class='admin-sidebar'>
          <div class='admin-user'>
            <img src={image} />
            <div>{title}</div>
          </div>
          <ul class='admin-sections'>
            <li><Link href='/admin#feed' class='active'>Feed</Link></li>
            <li><Link href='/admin#preview'>Preview</Link></li>
            <li><Link href='/admin#settings'>Settings</Link></li>
          </ul>
          <div class='admin-collapse'>Collapse</div>
        </div>
        <div class='admin-content'>
          {this.state.igFeed ? <Feed data={this.state.igFeed} /> : 'Loading...'}
        </div>
      </div>
    )
  }
}
