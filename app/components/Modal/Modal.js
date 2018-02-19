import React, { Component } from 'preact'

import './Modal.css'

export default class Modal extends Component {
  render (props, state) {
    return (
      <div class='modal'>
        <div class='modal-overlay' onClick={props.close} />
        <div class='modal-box'>
          <div class='modal-close' onClick={props.close}>{'×'}</div>
          <div class='modal-header'>{props.header}</div>
          <div class='modal-body'>
            {props.children}
          </div>
        </div>
      </div>
    )
  }
}
