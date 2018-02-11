import React, { Component } from 'preact'

import InstaFeed from './InstaFeed'
import Selection from './Selection'

import './Feed.css'

export default class Feed extends Component {
  render (props, state) {
    const { atom } = props

    return (
      <div style='width: 100%;' class='feed'>
        <div class='half-feed'>
          <Selection atom={atom} />
        </div>
        <div class='half-feed'>
          <InstaFeed atom={atom} />
        </div>
      </div>
    )
  }
}
