import React, { Component } from 'preact'

import './Button.less'

export default class Button extends Component {
  render (props, state) {
    const { config } = props
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
      <button style={colours[config.colour]} onClick={config.action}>{config.text}</button>
    )
  }
}
