import React, { Component } from 'preact'
import Image from '../../../components/Image'
import Modal from '../../../components/Modal'

export default class Selection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeImage: null
    }
  }

  getModal () {
    const header = 'Configure products'
    const close = () => this.setState({ activeImage: null })

    return (
      <Modal header={header} close={close}>
        <img src={this.state.activeImage.thumbnail_resources[2].src} />
      </Modal>
    )
  }

  getImages (selection) {
    return selection.map(image => {
      const onClick = () => this.setState({ activeImage: image })
      return <Image onClick={onClick.bind(this)} image={image} />
    })
  }

  render (props, state) {
    const box = state.activeImage ? this.getModal() : null
    const images = this.getImages(props.selection)
    const style = {
      height: '100%',
      'overflow-y': 'scroll'
    }

    return (
      <div style={style}>
        { box }
        { images }
      </div>
    )
  }
}
