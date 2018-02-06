import React, { Component } from 'preact'
import Button from '../../../components/Button'
import * as ProductApi from './ProductApi'

class Row extends Component {
  changeHandler (e) {
    this.props.onChange(e.target.value)
  }

  clickHandler (e) {
    this.props.onChange(e.target.checked)
  }

  render (props) {
    let input

    if (props.type === 'checkbox') {
      input = <input onClick={this.clickHandler.bind(this)} type={props.type} checked={props.value} />
    } else {
      input = <input onChange={this.changeHandler.bind(this)} type={props.type} value={props.value} />
    }

    return (
      <div class='product-modal-row'>
        <div class='product-modal-column'>{props.label}:</div>
        <div class='product-modal-column'>
          {input}
        </div>
      </div>
    )
  }
}

export default class ProductBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: props.data || {}
    }
  }

  changeHandler (key, value) {
    return function (value) {
      let product = Object.assign({}, this.state.product)
      product[key] = value
      this.setState({ product })
    }
  }

  saveProduct () {
    const errors = ProductApi.validateProduct(this.state.product)
    if (errors.length === 0) {
      ProductApi.addProduct(this.state.product).then(response => {
        this.props.onAdd(response.ops[0])
      })
      this.props.close()
    } else {
      // TODO show warning
    }
  }
  deleteProduct () {
    ProductApi.deleteProduct(this.state.product._id)
    this.props.onDelete()
    this.props.close()
  }
  updateProduct () {
    ProductApi.updateProduct(this.state.product._id, this.state.product)
    this.props.onUpdate(this.state.product)
    this.props.close()
  }

  render (props, state) {
    const { product } = state
    const config = {}

    if (product._id) {
      config.header = 'Update product details'
      config.buttons = (
        <div>
          <Button colour={'red'} onClick={this.deleteProduct.bind(this)} text={'Delete'} />
          <Button colour={'green'} onClick={this.updateProduct.bind(this)} text={'Update'} />
        </div>
      )
    } else {
      config.header = 'Add new product'
      config.buttons = (
        <div>
          <Button colour={'grey'} onClick={props.close} text={'Cancel'} />
          <Button colour={'green'} onClick={this.saveProduct.bind(this)} text={'Save'} />
        </div>
      )
    }

    return (
      <div class='product-modal'>
        <div class='product-modal-overlay' onClick={props.close} />
        <div class='product-modal-box'>
          <div class='product-modal-close' onClick={props.close}>{'×'}</div>
          <div class='product-modal-header'>{config.header}</div>
          <div class='product-modal-body'>
            <div class='product-modal-left'>
              <img src={product.image} />
            </div>
            <div class='product-modal-right'>
              <Row onChange={this.changeHandler('id').bind(this)} label={'ID'} type={'text'} value={product.id} />
              <Row onChange={this.changeHandler('name').bind(this)} label={'Name'} type={'text'} value={product.name} />
              <Row onChange={this.changeHandler('url').bind(this)} label={'Link'} type={'text'} value={product.url} />
              <Row onChange={this.changeHandler('image').bind(this)} label={'Image'} type={'text'} value={product.image} />
              <Row onChange={this.changeHandler('active').bind(this)} label={'Enabled'} type={'checkbox'} value={product.active} />
            </div>
            {config.buttons}
          </div>
        </div>
      </div>
    )
  }
}
