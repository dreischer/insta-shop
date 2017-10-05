const axios = require('axios')

var options = {
  method: 'post',
  url: 'https://insta-shop.eu.auth0.com/oauth/token',
  headers: {
    'content-type': 'application/json'
  },
  data: JSON.stringify({
    // TODO top secret
    'client_id': '86bvBejYoJua5a4jOJaSmbyMPWUdPQvU',
    'client_secret': 't6VrBXy8rJMYEfQbScSeUeC858qCT0AmC92ufjFBFSs6Ju-gG_c2x7m7FlhIJ9Xo',
    'audience': 'https://insta-shop.eu.auth0.com/api/v2/',
    'grant_type': 'client_credentials'
  })
}

module.exports = function getAuthToken () {
  return axios(options).then(response => response.data.access_token)
}
