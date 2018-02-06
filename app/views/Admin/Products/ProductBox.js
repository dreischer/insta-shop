import React, { Component } from 'preact'
import Button from '../../../components/Button'

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
      image: props.data && props.data.image,
      data: props.data || {}
    }
  }

  addProduct () {
    // TODO
  }

  render (props, state) {
    const config = {
      update: {
        header: 'Update product details',
        buttons: [
          {
            text: 'Delete',
            action: () => {},
            colour: 'red'
          },
          {
            text: 'Update',
            action: () => {},
            colour: 'green'
          }
        ]
      },
      add: {
        header: 'Add new product',
        buttons: [
          {
            text: 'Cancel',
            action: props.close,
            colour: 'grey'
          },
          {
            text: 'Save',
            action: () => {},
            colour: 'green'
          }
        ]
      }
    }

    const thisConfig = state.data._id ? config.update : config.add

    return (
      <div class='product-modal'>
        <div class='product-modal-overlay' onClick={props.close} />
        <div class='product-modal-box'>
          <div class='product-modal-close' onClick={props.close}>{'×'}</div>
          <div class='product-modal-header'>{thisConfig.header}</div>
          <div class='product-modal-body'>
            <div class='product-modal-left'>
              <img src={this.state.image} />
            </div>
            <div class='product-modal-right'>
              <Row label={'ID'} type={'text'} value={state.data.id} />
              <Row label={'Name'} type={'text'} value={state.data.name} />
              <Row label={'Link'} type={'text'} value={state.data.url} />
              <Row label={'Image'} type={'text'} value={state.data.image} />
              <Row label={'Enabled'} type={'checkbox'} value={state.data.active} />
            </div>
            {thisConfig.buttons.map(button => <Button config={button} />)}
          </div>
        </div>
      </div>
    )
  }
}
