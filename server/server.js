const config = require('config')
const express = require('express')
const path = require('path')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const bodyParser = require('body-parser')
const getInstagramToken = require('./api/utils/getInstagramToken')

const dev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(path.join(__dirname, '../public')))

if (dev) require('../webpack-dev')(app)

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://insta-shop.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:4000/ig',
  issuer: 'https://insta-shop.eu.auth0.com/',
  algorithms: ['RS256']
})

app.get('/api/data', jwtCheck, function (req, res) {
  res.send('ok')
})

app.get('/api/token', jwtCheck, function (req, res) {
  getInstagramToken(req.user.sub)
    .then(data => res.send(data))
    .catch(err => res.status((err.response && err.response.data.statusCode) || 500).send(err.response.data))
})

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../public/index.html'))
})

app.listen(config.port, function () {
  console.log(`Server listening on http://localhost:${config.port}`)
})
