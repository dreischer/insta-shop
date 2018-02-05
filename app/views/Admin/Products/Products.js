import axios from 'axios'
import React, { Component } from 'preact'
import { getToken } from '../../../utils/Auth'
import ProductBox from './ProductBox'

import './Products.less'

class NewProduct extends Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  render (props, state) {
    const toggle = (e) => this.setState({ edit: !this.state.edit })
    const editWindow = state.edit ? <ProductBox close={toggle} /> : null

    return (
      <div class='product'>
        {editWindow}
        <div onClick={toggle} class='new-product'>
          <span>{'Add new product'}</span>
        </div>
      </div>
    )
  }
}

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  render (props, state) {
    const toggle = (e) => this.setState({ edit: !this.state.edit })
    const enabled = props.data.active ? '' : 'disabled'
    const className = `product ${enabled}`
    const editWindow = state.edit ? <ProductBox close={toggle} data={props.data} /> : null

    return (
      <div class={className} >
        {editWindow}
        <div class='product-edit'><span onClick={toggle} /></div>
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
