const config = require('config')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(path.join(__dirname, '../public')))

if (dev) require('../webpack-dev')(app)

app.get('/api/data', function (request, response) {
  // mock API response
  handleApiResponse(response, {
    text: 'some text',
    count: 12
  })
})

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../public/index.html'))
})

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`)
})

function handleApiResponse (response, data) {
  response.json({
    status: 200,
    data: data
  })
}

// function handleApiError (response, err) {
//   response.json({
//     status: 500,
//     data: JSON.parse(JSON.stringify(err, ['message', 'arguments', 'type', 'name', 'description', 'stack']))
//   })
// }
