import React, { Component } from 'preact'
import { Link } from 'preact-router'
import './Header.less'

export default class Header extends Component {
  render (props, state) {
    const { atom } = props
    const image = atom.header.icon ? <img class='header-icon' src={atom.header.icon} /> : null

    return (
      <header className='header'>
        {image}
        <h1>Preact App</h1>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/feed'>Feed</Link>
          <Link href='/admin'>Admin</Link>
        </nav>
      </header>
    )
  }
}
