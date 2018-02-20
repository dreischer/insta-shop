import { Component } from 'preact'
import { handleAuthentication, getUserInfo, saveUserInfo } from '../../utils/auth'

export default class Callback extends Component {
  componentDidMount () {
    handleAuthentication().then(getUserInfo).then(userInfo => {
      saveUserInfo(userInfo)
      this.props.atom.split({ user: userInfo })
      window.location.href = '/admin/feed'
    })
  }

  render () {
    return null
  }
}
