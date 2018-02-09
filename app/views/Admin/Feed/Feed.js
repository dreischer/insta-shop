import axios from 'axios'
import React, { Component } from 'preact'
import { getSavedUserInfo } from '../../../utils/Auth'
import InfiniteScroll from '../../../components/InfiniteScroll'

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
      nodes: atom.feed.nodes || [],
      nextPointer: atom.feed.nextPointer || null,
      hasNextPage: atom.feed.hasNextPage || true
    }
  }

  setFeed (media) {
    const nodes = [...this.state.nodes, ...media.nodes]
    const { has_next_page: hasNextPage, end_cursor: nextPointer } = media.page_info
    const feed = { nodes, nextPointer, hasNextPage }

    this.setState({ ...feed })
    this.props.atom.split({ feed })
  }

  loadFeed () {
    if (!this.state.hasNextPage) {
      this.stopScroll()
      return
    }

    const nextParam = this.state.nextPointer ? `&max_id=${this.state.nextPointer}` : ''
    const userName = getSavedUserInfo().nickname
    const url = `https://www.instagram.com/${userName}/?__a=1`

    return axios.get(url + nextParam).then(respons => this.setFeed(respons.data.user.media))
  }

  feed (stop) {
    this.stopScroll = stop
    const media = this.state.nodes.map(image => <Media image={image} />)
    return (
      <div class='feed-scroll'>
        { media }
      </div>
    )
  }

  render (props, state) {
    return (
      <InfiniteScroll action={this.loadFeed.bind(this)} >
        { this.feed.bind(this) }
      </InfiniteScroll>
    )
  }
}
