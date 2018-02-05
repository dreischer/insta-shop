import axios from 'axios'
import React, { Component } from 'preact'
import { getToken } from '../../../utils/Auth'

import './Feed.less'

class Media extends Component {
  render (props, state) {
    return (
      <div class='IG-image'>
        <img src={props.image.images.standard_resolution.url} />
      </div>
    )
  }
}

export default class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      igFeed: null
    }
  }

  componentDidMount () {
    axios.get('/api/admin/feed', { headers: { Authorization: `Bearer ${getToken().access_token}` } }).then(data => {
      this.setState({ igFeed: data.data.data.data })
    })
  }

  getMedia () {
    return this.state.igFeed.map(image => <Media image={image} />)
  }

  render (props, state) {
    const content = this.state.igFeed ? this.getMedia() : 'Loading...'

    return (
      <div>
        {content}
      </div>
    )
  }
}
