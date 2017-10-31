const axios = require('axios')
const getAuthToken = require('./getAuthToken')

module.exports = function getIdentities (userId, type) {
  const user = encodeURIComponent(userId)

  return getAuthToken().then(function (token) {
    const options = {
      method: 'get',
      url: `https://insta-shop.eu.auth0.com/api/v2/users/${user}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    return axios(options).then(function (response) {
      const identities = response.data.identities
      const all = !type || type === 'all'

      return all ? identities : identities.filter(id => id.provider === type)[0]
    })
  })
}
