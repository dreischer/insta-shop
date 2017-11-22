import React, { Component } from 'preact'

import './Feed.less'

class Media extends Component {
  render (props, state) {
    return (
      <img class='IG-image' src={props.image.images.standard_resolution.url} />
    )
  }
}

export default class Feed extends Component {
  render (props, state) {
    const items = props.data.map(image => <Media image={image} />)
    return (
      <div>
        {items}
      </div>
    )
  }
}
