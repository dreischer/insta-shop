import React, { Component } from 'preact'
import { Link } from 'preact-router/match'

import './Sidebar.less'

export default class Sidebar extends Component {
  render (props, state) {
    const { atom } = props
    const image = atom.user ? atom.user.picture : null
    const title = atom.user && atom.user.name

    return (
      <div class='admin-sidebar'>
        <div class='admin-user'>
          <img src={image} />
          <div>{title}</div>
        </div>
        <ul class='admin-sections'>
          <li><Link activeClassName='active' href='/admin/feed'>Feed</Link></li>
          <li><Link activeClassName='active' href='/admin/preview'>Preview</Link></li>
          <li><Link activeClassName='active' href='/admin/products'>Products</Link></li>
        </ul>
        <div class='admin-collapse'>Collapse</div>
      </div>
    )
  }
}
