import React, { Component } from 'preact'
import './NotFound.less'

export default class NotFound extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
  }
  render () {
    return (
      <div className='notFound'>
        <h1>Page not found</h1>
      </div>
    )
  }
}
