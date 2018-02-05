import { Component } from 'preact'
import { handleAuthentication, getUserInfo, saveUserInfo } from '../../utils/Auth'

export default class Callback extends Component {
  componentDidMount () {
    handleAuthentication().then(getUserInfo).then(userInfo => {
      saveUserInfo(userInfo)
      this.props.split({ user: userInfo })
      window.location.href = '/admin/feed'
    })
  }

  render () {
    return null
  }
}
