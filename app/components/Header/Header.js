import React, { Component } from 'preact'
import { Link } from 'preact-router'
import { logout } from '../../utils/Auth'

import './Header.less'

export default class Header extends Component {
  render (props, state) {
    const { atom } = props
    const logoutLink = atom.user ? <Link onclick={logout} >Logout</Link> : null
    const image = atom.header.icon ? <img class='header-icon' src={atom.header.icon} /> : null

    return (
      <header className='header'>
        {image}
        <h1>Preact App</h1>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/admin'>Admin</Link>
          {logoutLink}
        </nav>
      </header>
    )
  }
}
