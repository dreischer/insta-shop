import React, { Component } from 'preact'

import './Tag.css'

class ProductSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: props.tag.active || false
    }
  }

  render (props, state) {
    const box = state.active ? <div>{'BOX'}</div> : null
    const style = {
      top: props.tag.top + '%',
      left: props.tag.left + '%'
    }

    return (
      <div class='tag' style={style}>
        { box }
        <span>{'+'}</span>
      </div>
    )
  }
}

export default class Tag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: []
    }
  }

  onChange () {
    this.props.onChange(this.state.tags)
  }

  getProducts () {
    return this.state.tags.map(tag => <ProductSelect tag={tag} />)
  }

  clickHandler (e) {
    if (e.target.tagName !== 'IMG') {
      return
    }

    const tag = {
      left: ((e.offsetX - 10) / e.target.width * 100).toFixed(2),
      top: ((e.offsetY - 10) / e.target.height * 100).toFixed(2),
      product: {},
      active: true
    }

    this.setState({
      tags: [...this.state.tags, tag]
    })
  }

  render (props, state) {
    return (
      <div class='tag-container' onClick={this.clickHandler.bind(this)}>
        { this.getProducts() }
        { props.children }
      </div>)
  }
}
