import auth0 from 'auth0-js'

export default class Auth {
  constructor () {
    this.auth0 = new auth0.WebAuth({
      domain: 'insta-shop.eu.auth0.com',
      clientID: 'D3YH7UPhP9GkinKMj4X2SEVTRpvvW56i',
      redirectUri: 'http://localhost:4000/admin',
      audience: 'https://insta-shop.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    })

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        console.log(err)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    window.localStorage.access_token = authResult.accessToken
    window.localStorage.id_token = authResult.idToken
    window.localStorage.expires_at = expiresAt
  }

  logout () {
    delete window.localStorage.access_token
    delete window.localStorage.id_token
    delete window.localStorage.expires_at
  }

  isAuthenticated () {
    // Check whether the current time is past the access token's expiry time
    const val = window.localStorage.expires_at || '0'
    const expiresAt = JSON.parse(val)
    return Date.now() < expiresAt
  }
}
