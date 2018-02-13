const jwtCheck = require('../auth/jwt')
const database = require('../db/db.js').getDB()
const collection = database.collection('products')
const ObjectID = require('mongodb').ObjectID

function routes (app) {
  app.get('/api/admin/products', jwtCheck, function (req, res) {
    getAllProducts(req.user.sub).then(function (result) {
      res.send(result)
    })
  })
  app.post('/api/admin/products', jwtCheck, function (req, res) {
    addProduct(req.user.sub, req.body).then(function (result) {
      res.send(result)
    })
  })
  app.delete('/api/admin/products/:_id', jwtCheck, function (req, res) {
    deleteProduct(req.user.sub, req.params._id).then(function (result) {
      res.send(result)
    })
  })
  app.put('/api/admin/products/:_id', jwtCheck, function (req, res) {
    updateProduct(req.user.sub, req.params._id, req.body).then(function (result) {
      res.send(result)
    })
  })
}

function getAllProducts (userId) {
  const query = { userId }

  return collection.find(query).sort({ts_modified: -1}).toArray()
}

function addProduct (user, payload) {
  const ts = Date.now()
  const data = Object.assign({}, payload, {
    userId: user,
    ts_created: ts,
    ts_modified: ts
  })

  return collection.insert(data)
}

function deleteProduct (userId, _id) {
  const query = { userId, _id: ObjectID(_id) }

  return collection.deleteOne(query)
}

function updateProduct (userId, _id, payload) {
  const query = { userId, _id: ObjectID(_id) }
  payload.ts_modified = Date.now()
  delete payload._id

  return collection.findOneAndUpdate(query, payload)
}

module.exports = routes
