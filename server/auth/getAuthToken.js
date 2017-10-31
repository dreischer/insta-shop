const axios = require('axios')
const config = require('config')

var options = {
  method: 'post',
  url: `https://${config.auth0.id}.eu.auth0.com/oauth/token`,
  headers: {
    'content-type': 'application/json'
  },
  data: JSON.stringify({
    client_id: config.auth0.server.client_id,
    client_secret: config.auth0.server.client_secret,
    audience: `https://${config.auth0.id}.eu.auth0.com/api/v2/`,
    grant_type: config.auth0.server.grant_type
  })
}

module.exports = function getAuthToken () {
  return axios(options).then(response => response.data.access_token)
}
