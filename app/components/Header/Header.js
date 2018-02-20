import React, { Component } from 'preact'
import { Link } from 'preact-router'
import { logout } from '../../utils/auth'

import './Header.css'

export default class Header extends Component {
  render (props, state) {
    const { atom } = props
    const logoutLink = atom.user ? <Link onclick={logout} >Logout</Link> : null

    return (
      <header className='header'>
        <Link href='/'>
          <h1>Insta Shop</h1>
        </Link>
        <nav>
          <Link href='/admin/feed'>Admin</Link>
          {logoutLink}
        </nav>
      </header>
    )
  }
}
