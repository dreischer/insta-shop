import { Component } from 'preact'
import { handleAuthentication } from '../../utils/Auth'

export default class Callback extends Component {
  componentDidMount () {
    handleAuthentication()
    window.location.href = '/admin'
  }

  render () {
    return null
  }
}
