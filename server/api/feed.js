const jwtCheck = require('../auth/jwt')
const database = require('../db/db.js').getDB()
const collection = database.collection('feed')

function routes (app) {
  app.get('/api/feed', jwtCheck, function (req, res) {
    getFeed(req.user.sub).then(function (result) {
      res.send(result)
    })
  })
  app.post('/api/feed', jwtCheck, function (req, res) {
    addImage(req.user.sub, req.body).then(function (result) {
      res.send(result)
    })
  })
}

function getFeed (userId) {
  const query = { userId }

  return collection.find(query).sort({ date: -1 }).toArray()
}

function addImage (userId, payload) {
  const ts = Date.now()
  const data = Object.assign({}, payload, {
    userId,
    ts_created: ts,
    ts_modified: ts
  })

  return collection.insert(data)
}

module.exports = routes
