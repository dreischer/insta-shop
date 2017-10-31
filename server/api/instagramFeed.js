const axios = require('axios')
const getIdentities = require('../auth/getIdentities')

module.exports = function instagramFeed (userId) {
  return getIdentities(userId, 'instagram').then(id => {
    // TODO support pagination
    const api = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${id.access_token}`
    return axios.get(api).then(response => {
      return {
        data: response.data,
        headers: response.headers
      }
    })
  })
}
