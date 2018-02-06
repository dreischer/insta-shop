import React, { Component } from 'preact'

import './Button.less'

export default class Button extends Component {
  render (props, state) {
    const { colour, onClick, text } = props
    const colours = {
      green: {
        background: '#47b28d',
        color: '#FFFFFF'
      },
      grey: {
        background: '#d6dee7'
      },
      red: {
        background: '#F34B4B',
        color: '#FFFFFF'
      }
    }
    return (
      <button style={colours[colour]} onClick={onClick}>{text}</button>
    )
  }
}
