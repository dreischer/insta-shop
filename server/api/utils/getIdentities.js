const axios = require('axios')
const getAuthToken = require('./getAuthToken')

module.exports = function getIdentities (userId) {
  const user = encodeURIComponent(userId)

  return getAuthToken().then(token => {
    const options = {
      method: 'get',
      url: `https://insta-shop.eu.auth0.com/api/v2/users/${user}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    return axios(options).then(response => response.data.identities)
  })
}
