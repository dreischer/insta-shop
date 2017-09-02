import React, { Component } from 'preact'
import axios from 'axios'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 400,
      data: {
        text: 'loading....',
        count: 0
      }
    }
  }

  componentDidMount () {
    window.setTimeout(() => {
      axios.get('/api/data').then(data => {
        this.setState(data.data)
      })
    }, 2000)
  }

  render () {
    return (
      <div className='home'>
        <h1>Home</h1>
        <p>This is the Home component...</p>
        <p>Status: {this.state.status}</p>
        <p>Text: {this.state.data && this.state.data.text}</p>
        <p>Count: {this.state.data && this.state.data.count}</p>
      </div>
    )
  }
}
