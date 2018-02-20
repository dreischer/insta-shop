import axios from 'axios'
import React, { Component } from 'preact'
import { getSavedUserInfo } from '../../../utils/auth'
import InfiniteScroll from '../../../components/InfiniteScroll'
import Image from '../../../components/Image'

export default class InstaFeed extends Component {
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
      return Promise.resolve()
    }

    const nextParam = this.state.nextPointer ? `&max_id=${this.state.nextPointer}` : ''
    const userName = getSavedUserInfo().nickname
    const url = `https://www.instagram.com/${userName}/?__a=1`

    return axios.get(url + nextParam).then(respons => this.setFeed(respons.data.user.media))
  }

  feed (stop) {
    this.stopScroll = stop
    const images = this.state.nodes.map(image => {
      const disabled = this.props.selectionIds.indexOf(image.id) !== -1
      const clickFunction = () => this.props.addToSelection(image)

      return <Image disabled={disabled} onClick={clickFunction} image={image} />
    })
    return (
      <div class='feed-scroll'>
        { images }
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
