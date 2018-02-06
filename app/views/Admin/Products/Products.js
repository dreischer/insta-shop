import React, { Component } from 'preact'
import { getAllProducts } from './ProductApi'
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
    const editWindow = state.edit ? <ProductBox {...props} close={toggle} /> : null

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
    const editWindow = state.edit ? <ProductBox {...props} close={toggle} /> : null

    return (
      <div class={className} >
        {editWindow}
        <div class='product-edit' onClick={toggle}><span /></div>
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
    getAllProducts().then(data => {
      this.setState({ products: data })
    })
  }

  addProduct (product) {
    const products = [product, ...this.state.products]
    this.setState({ products })
  }

  deleteProduct (i) {
    return () => {
      const products = [...this.state.products]
      products.splice(i, 1)
      this.setState({ products })
    }
  }

  updateProduct (i) {
    return (newProduct) => {
      const products = [...this.state.products]
      products[i] = newProduct
      this.setState({ products })
    }
  }

  getProducts () {
    return this.state.products.map((product, i) => {
      const props = {
        onDelete: this.deleteProduct(i),
        onUpdate: this.updateProduct(i)
      }
      return <Product {...props} data={product} />
    })
  }

  render (props, state) {
    const content = this.state.products ? this.getProducts() : 'Loading...'

    return (
      <div class='products-container'>
        <NewProduct onAdd={this.addProduct.bind(this)} />
        {content}
      </div>
    )
  }
}
