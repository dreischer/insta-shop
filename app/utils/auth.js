import config from 'config'
import { WebAuth } from 'auth0-js'

const auth = new WebAuth(config.auth0.client)

function login () {
  auth.authorize()
}

function handleAuthentication () {
  const promise = new Promise(function (resolve, reject) {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult)
        resolve()
      } else if (err) {
        console.log(err)
        reject(err)
      }
    })
  })

  return promise
}

function setSession (authResult) {
  // Set the time that the access token will expire at
  const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
  window.localStorage.access_token = authResult.accessToken
  window.localStorage.id_token = authResult.idToken
  window.localStorage.expires_at = expiresAt
}

function logout () {
  delete window.localStorage.access_token
  delete window.localStorage.id_token
  delete window.localStorage.expires_at
  delete window.localStorage.user_info

  window.location.href = '/'
}

function isAuthenticated () {
  // Check whether the current time is past the access token's expiry time
  const val = window.localStorage.expires_at || '0'
  const expiresAt = JSON.parse(val)
  return Date.now() < expiresAt
}

function getToken () {
  const { access_token, id_token } = window.localStorage
  return { access_token, id_token }
}

function getUserInfo () {
  const token = getToken()
  return new Promise(function (resolve, reject) {
    auth.client.userInfo(token.access_token, function (err, user) {
      err ? reject(err) : resolve(user)
    })
  })
}

function saveUserInfo (userInfo) {
  window.localStorage.user_info = JSON.stringify(userInfo)
}

function getSavedUserInfo () {
  if (isAuthenticated() && window.localStorage.user_info) {
    return JSON.parse(window.localStorage.user_info)
  } else {
    return null
  }
}

export {
  login,
  logout,
  isAuthenticated,
  handleAuthentication,
  getToken,
  getUserInfo,
  saveUserInfo,
  getSavedUserInfo
}
