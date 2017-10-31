import React, { Component } from 'preact'
import { Link } from 'preact-router'
import './Header.less'

export default class Header extends Component {
  render (props, state) {
    const { atom } = props
    const image = atom.user ? <img class='header-icon' src={atom.user.picture} /> : null
    const title = atom.user ? atom.user.name : 'insta-shop'

    return (
      <header className='header'>
        {image}
        <h1>{title}</h1>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/feed'>Feed</Link>
          <Link href='/admin'>Admin</Link>
        </nav>
      </header>
    )
  }
}
