import React, { Component } from 'preact'

class Row extends Component {
  render (props) {
    return (
      <div class='product-modal-row'>
        <div class='product-modal-column'>{props.label}:</div>
        <div class='product-modal-column'>
          <input type={props.type} value={props.value} checked={props.value} />
        </div>
      </div>
    )
  }
}

export default class ProductBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: props.data && props.data.image
    }
  }

  addProduct () {
    // TODO
  }

  render (props, state) {
    let headerText
    let data = props.data

    if (data) {
      headerText = 'Update product details'
    } else {
      headerText = 'Add new product'
      data = {}
    }

    return (
      <div class='product-modal'>
        <div class='product-modal-overlay' onClick={props.close} />
        <div class='product-modal-box'>
          <div class='product-modal-close' onClick={props.close}>{'×'}</div>
          <div class='product-modal-header'>{headerText}</div>
          <div class='product-modal-body'>
            <div class='product-modal-left'>
              <img src={this.state.image} />
            </div>
            <div class='product-modal-right'>
              <Row label={'Name'} type={'text'} value={data.name} />
              <Row label={'Link'} type={'text'} value={data.url} />
              <Row label={'Image'} type={'text'} value={data.image} />
              <Row label={'Enabled'} type={'checkbox'} value={data.active} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
