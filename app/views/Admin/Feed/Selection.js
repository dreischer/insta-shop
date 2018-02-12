import React, { Component } from 'preact'
import Image from '../../../components/Image'

// import './Insta.less'

export default class Selection extends Component {
  render (props, state) {
    const images = props.selection.map(image => {
      const clickFunction = () => {}
      return <Image onClick={clickFunction} image={image} />
    })
    return (
      <div>
        { images }
      </div>
    )
  }
}
