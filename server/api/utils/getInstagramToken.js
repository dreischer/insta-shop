const getIdentities = require('./getIdentities')

module.exports = function getInstagramToken (userId) {
  return getIdentities(userId).then(function (identities) {
    return identities.filter(identity => identity.provider === 'instagram')[0]
  })
}
