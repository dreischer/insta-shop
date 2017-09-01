import { Component } from 'preact'
import Auth from '../../utils/Auth'

export default class Callback extends Component {
  componentDidMount () {
    const auth = new Auth()
    auth.handleAuthentication()
    window.location.href = '/admin'
  }

  render () {
    return null
  }
}
