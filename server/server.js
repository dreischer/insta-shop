const config = require('config')
const express = require('express')
const compression = require('compression')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db/db')

const dev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const app = express()

app.use(bodyParser.json())
app.use(compression())
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({
  extended: true
}))

if (dev) require('../webpack-dev')(app)

db.connect().then(() => {
  require('./api/products')(app)
  require('./api/feed')(app)
  require('./api/public')(app)
})

// catch all as long as it's not an API
app.get(/^(?!\/api).+/, function (request, response) {
  response.sendFile(path.resolve(__dirname, '../public/index.html'))
})

app.listen(config.port, function () {
  console.log(`Server listening on http://localhost:${config.port}`)
})
