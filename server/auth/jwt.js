const config = require('config')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

module.exports = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.auth0.id}.eu.auth0.com/.well-known/jwks.json`
  }),
  audience: config.auth0.client.audience,
  issuer: `https://${config.auth0.id}.eu.auth0.com/`,
  algorithms: ['RS256']
})
