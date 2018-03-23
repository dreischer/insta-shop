import React, { Component } from 'preact'
import { getAllProducts } from './ProductApi'
import ProductBox from './ProductBox'
import { ConnectAtom } from 'tiny-atom/preact'

import './Products.css'

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
    const editWindow = state.edit ? <ProductBox {...props} close={toggle} /> : null

    return (
      <div class={`product ${enabled}`} >
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
      modalActive: false
    }
  }

  componentDidMount () {
    if (!this.state.products) {
      getAllProducts().then(products => {
        this.setState({ products })
        this.props.atom.split({ products })
      })
    }
  }

  addProduct (product) {
    const products = [product, ...this.state.products]
    this.setState({ products })
    this.props.atom.split({ products })
  }

  deleteProduct (i) {
    return () => {
      const products = [...this.state.products]
      products.splice(i, 1)
      this.setState({ products })
      this.props.atom.split({ products })
    }
  }

  updateProduct (i) {
    return (newProduct) => {
      const products = [...this.state.products]
      products[i] = newProduct
      this.setState({ products })
      this.props.atom.split({ products })
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

  editProduct (id) {
    this.setState({})
  }

  render (props, state) {
    const content = state.products ? this.getProducts() : 'Loading...'
    const toggle = (e) => this.setState({ edit: !this.state.modalActive })
    const modal = this.state.modalActive ? <ProductBox {...props} close={toggle} /> : null

    return (
      <ConnectAtom render={({ state, split }) => (
        <div class='products-container'>
          { modal }
          <NewProduct onAdd={this.addProduct.bind(this)} />
          {content}
        </div>
      )} />
    )
  }
}
