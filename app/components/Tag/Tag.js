import React, { Component } from 'preact'
import getRandom from '../../utils/get-random'

import './Tag.css'

class ProductSelect extends Component {
  render (props, state) {
    return (<div class='product-select'>{'BOX'}</div>)
  }
}

class Tag extends Component {
  render (props, state) {
    const box = props.active ? <ProductSelect /> : null
    const style = {
      top: props.tag.top + '%',
      left: props.tag.left + '%'
    }

    return (
      <div onClick={props.onClick} class='tag' style={style}>
        { box }
        <span>{'+'}</span>
      </div>
    )
  }
}

export default class TagArea extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      active: null
    }
  }

  onChange () {
    this.props.onChange(this.state.tags)
  }

  getProducts () {
    return this.state.tags.map(tag => {
      const active = tag.id === this.state.active
      const onClick = () => this.setState({
        active: tag.id
      })
      return <Tag onClick={onClick} tag={tag} active={active} />
    })
  }

  clickHandler (e) {
    if (e.target.tagName !== 'IMG') {
      return
    }

    const tag = {
      left: ((e.offsetX - 10) / e.target.width * 100).toFixed(2),
      top: ((e.offsetY - 10) / e.target.height * 100).toFixed(2),
      product: {},
      id: getRandom()
    }

    this.setState({
      tags: [...this.state.tags, tag],
      active: tag.id
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
