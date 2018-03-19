const database = require('../db/db.js').getDB()
const collection = database.collection('feed')

function routes (app) {
  app.get('/api/feed/:id', function (req, res) {
    getFeed(req.params.id).then(function (result) {
      res.send(result)
    })
  })
}

function getFeed (userId) {
  const query = { userId }

  return collection.find(query).sort({ date: -1 }).toArray()
}

module.exports = routes
