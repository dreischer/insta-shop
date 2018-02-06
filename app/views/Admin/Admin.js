
import React, { Component } from 'preact'
import Sidebar from '../../components/Sidebar'
import Feed from './Feed'
import Products from './Products'

import './Admin.less'

export default class Admin extends Component {
  render (props, state) {
    const { atom } = props
    let content

    switch (props.matches.route) {
      case 'preview':
        content = 'TODO'
        break
      case 'products':
        content = <Products />
        break
      default:
        content = <Feed />
        break
    }

    return (
      <div class='admin'>
        <Sidebar atom={atom} />
        <div class='admin-content'>
          {content}
        </div>
      </div>
    )
  }
}
