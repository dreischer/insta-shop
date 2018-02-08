import axios from 'axios'
import React, { Component } from 'preact'
import { getSavedUserInfo } from '../../../utils/Auth'

import './Feed.less'

class Media extends Component {
  render (props, state) {
    return (
      <div class='IG-image'>
        <img src={props.image.thumbnail_resources[2].src} />
      </div>
    )
  }
}

export default class Feed extends Component {
  constructor (props) {
    super(props)
    const atom = props.atom.get()
    this.state = {
      feed: atom.feed.nodes || [],
      nextPointer: atom.feed.nextPointer || null
    }
  }

  setFeed (media) {
    const nextPointer = media.page_info.has_next_page ? media.page_info.end_cursor : null
    const newFeed = [...this.state.feed, ...media.nodes]

    this.setState({ nextPointer: nextPointer })
    this.setState({ feed: newFeed })

    const feed = Object.assign({}, this.props.atom.get().cache)
    feed.nodes = newFeed
    feed.nextPointer = nextPointer
    this.props.atom.split({ feed })
  }

  loadFeed () {
    const nextParam = this.state.nextPointer ? `&max_id=${this.state.nextPointer}` : ''
    const userName = getSavedUserInfo().nickname
    const url = `https://www.instagram.com/${userName}/?__a=1`

    return axios.get(url + nextParam).then(respons => this.setFeed(respons.data.user.media))
  }

  componentDidMount () {
    if (!this.state.feed.length) {
      this.loadFeed()
    }
  }

  getMedia () {
    return this.state.feed.map(image => <Media image={image} />)
  }

  render (props, state) {
    const content = this.state.feed.length ? this.getMedia() : 'Loading...'

    return (
      <div>
        {content}
        <button onClick={this.loadFeed.bind(this)}>Load more</button>
      </div>
    )
  }
}
