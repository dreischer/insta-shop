import auth0 from 'auth0-js'

const auth = new auth0.WebAuth({
  domain: 'insta-shop.eu.auth0.com',
  clientID: 'D3YH7UPhP9GkinKMj4X2SEVTRpvvW56i',
  redirectUri: 'http://localhost:4000/callback',
  audience: 'https://insta-shop.eu.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
})

function login () {
  auth.authorize()
}

function handleAuthentication () {
  auth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
    } else if (err) {
      console.log(err)
    }
  })
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
}

function isAuthenticated () {
  // Check whether the current time is past the access token's expiry time
  const val = window.localStorage.expires_at || '0'
  const expiresAt = JSON.parse(val)
  return Date.now() < expiresAt
}

export default { login, logout, handleAuthentication, isAuthenticated }
