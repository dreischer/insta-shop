import React, { Component } from 'preact'

import './Image.css'

export default class Image extends Component {
  render (props, state) {
    const { image, onClick, disabled } = this.props
    const className = disabled ? 'IG-image IG-image-disabled' : 'IG-image'

    return (
      <div onClick={onClick} class={className}>
        <img src={image.thumbnail_resources[2].src} />
      </div>
    )
  }
}
