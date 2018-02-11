
import React, { Component } from 'preact'
import Sidebar from '../../components/Sidebar'
import Feed from './Feed'
import Products from './Products'

import './Admin.css'

export default class Admin extends Component {
  render (props, state) {
    const { atom } = props
    let content
    const links = [
      { href: '/admin/feed', text: 'Feed' },
      { href: '/admin/preview', text: 'Preview' },
      { href: '/admin/products', text: 'Products' }
    ]

    switch (props.matches.route) {
      case 'preview':
        content = 'TODO'
        break
      case 'products':
        content = <Products />
        break
      default:
        content = <Feed atom={atom} />
        break
    }

    return (
      <div class='admin'>
        <Sidebar atom={atom} links={links} />
        <div class='admin-content'>
          {content}
        </div>
      </div>
    )
  }
}
