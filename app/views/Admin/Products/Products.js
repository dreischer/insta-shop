import axios from 'axios'
import React, { Component } from 'preact'
import { getToken } from '../../../utils/Auth'

import './Products.less'

class ProductBox extends Component {
  addProduct () {
    // TODO
  }
  render (props, state) {
    return (
      <div class='product new-product'>{'Add a new product'}</div>
    )
  }
}

class NewProduct extends Component {
  addProduct () {
    // TODO
  }
  render (props, state) {
    return (
      <div class='product new-product'>{'Add new product'}</div>
    )
  }
}

class Product extends Component {
  updateProduct () {
    // TODO
  }
  deleteProduct () {
    // TODO
  }
  render (props, state) {
    const enabled = props.data.active ? '' : 'disabled'
    const className = `product ${enabled}`

    return (
      <div class={className} target='_blank'>
        <div class='product-edit'><span /></div>
        <img src={props.data.image} />
        <p>{props.data.name}</p>
      </div>
    )
  }
}

export default class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: null
    }
  }

  componentDidMount () {
    axios.get('/api/admin/products', { headers: { Authorization: `Bearer ${getToken().access_token}` } }).then(data => {
      this.setState({ products: data.data })
    })
  }

  getProducts () {
    return this.state.products.map(product => <Product data={product} />)
  }

  render (props, state) {
    const content = this.state.products ? this.getProducts() : 'Loading...'

    return (
      <div class='products-container'>
        <NewProduct />
        {content}
      </div>
    )
  }
}
