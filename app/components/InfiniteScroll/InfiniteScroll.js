import React, { Component } from 'preact'
import throttle from '../../utils/throttle'

import './InfiniteScroll.css'

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: props.offset || 200,
      loading: false,
      maxScroll: 0
    }
    this.checkScroll = throttle(this.checkScroll.bind(this), 200, {later: false})
  }

  componentDidMount (node) {
    this.load()
    this.startListening()
  }

  componentWillUnmount () {
    this.stopListening()
  }

  startListening () {
    this.stopListening()
    this.node.addEventListener('scroll', this.checkScroll)
  }

  stopListening () {
    this.node.removeEventListener('scroll', this.checkScroll)
  }

  checkScroll () {
    const { scrollHeight: outerHeight, clientHeight: innerHeight, scrollTop: scroll } = this.node
    const diff = outerHeight - (innerHeight + scroll)
    const shouldLoad = scroll > this.state.maxScroll && diff < this.state.offset && !this.state.loading

    if (shouldLoad) {
      this.load()
      this.setState({ maxScroll: scroll })
    }
  }

  load () {
    this.setState({ loading: true })

    this.props.action().then(() => {
      this.setState({ loading: false })
    })
  }

  render (props, state) {
    console.log('render scroll ', state)
    const getRef = (node) => { this.node = node }
    const loading = this.state.loading ? <div class='infiniteScroll-loading' /> : null
    const stopFunction = this.stopListening.bind(this)

    return (
      <div class='infiniteScroll' ref={getRef}>
        { this.props.children[0](stopFunction) }
        { loading }
      </div>
    )
  }
}
