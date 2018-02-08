import React, { Component } from 'preact'
import throttle from '../../utils/throttle'

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: props.offset || 200,
      loading: false,
      node: null,
      maxScroll: 0
    }
    this.scrollAction = throttle(this.scrollAction.bind(this), 200, {later: false})
  }

  componentDidMount (node) {
    this.state.node.addEventListener('scroll', this.scrollAction)
  }

  scrollAction () {
    const { scrollHeight: outerHeight, clientHeight: innerHeight, scrollTop: scroll } = this.state.node
    const diff = outerHeight - (innerHeight + scroll)
    const shouldLoad = scroll > this.state.maxScroll && diff < this.state.offset && !this.state.loading

    if (!shouldLoad) return

    this.setState({
      loading: true,
      maxScroll: scroll
    })

    this.props.action().then(() => {
      this.setState({ loading: false })
    })
  }

  stopListening () {
    this.state.node.removeEventListener('scroll', this.scrollAction)
  }

  componentWillUnmount () {
    this.stopListening()
  }

  render () {
    const style = {
      'overflow': 'hidden',
      'overflow-y': 'auto',
      'padding': '20px'
    }
    const getRef = (node) => this.setState({ node })
    return (
      <div style={style} ref={getRef}>
        { this.props.children[0]() }
      </div>
    )
  }
}
