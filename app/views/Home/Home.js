import React, { Component } from 'preact'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='home'>
        <h1>Home</h1>
        <p>This is the Home component...</p>
      </div>
    )
  }
}
