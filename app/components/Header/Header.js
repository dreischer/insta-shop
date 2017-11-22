import React, { Component } from 'preact'
import { Link } from 'preact-router'
import { logout } from '../../utils/Auth'

import './Header.less'

export default class Header extends Component {
  render (props, state) {
    const { atom } = props
    const logoutLink = atom.user ? <Link onclick={logout} >Logout</Link> : null

    return (
      <header className='header'>
        <h1>Insta Shop</h1>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/admin'>Admin</Link>
          {logoutLink}
        </nav>
      </header>
    )
  }
}
