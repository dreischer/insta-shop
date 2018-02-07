import React, { Component } from 'preact'
import { Link } from 'preact-router/match'

import './Sidebar.less'

export default class Sidebar extends Component {
  render (props, state) {
    const { atom } = props
    const image = atom.user ? atom.user.picture : null
    const title = atom.user && atom.user.name
    const links = this.props.links.map(link => <li><Link activeClassName='active' href={link.href}>{link.text}</Link></li>)

    return (
      <div class='admin-sidebar'>
        <div class='admin-user'>
          <img src={image} />
          <div>{title}</div>
        </div>
        <ul class='admin-sections'>
          {links}
        </ul>
        <div class='admin-collapse'>Collapse</div>
      </div>
    )
  }
}
