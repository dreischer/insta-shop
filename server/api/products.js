const jwtCheck = require('../auth/jwt')
const database = require('../db/db.js').getDB()
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
  const collection = database.collection('products')
  const query = { userId }

  return new Promise(function (resolve, reject) {
    collection.find(query).sort({ts_modified: -1}).toArray(function (err, result) {
      err ? reject(err) : resolve(result)
    })
  })
}

function addProduct (user, payload) {
  const collection = database.collection('products')
  payload.userId = user
  payload.ts_created = Date.now()
  payload.ts_modified = payload.ts_created

  return new Promise(function (resolve, reject) {
    collection.insert(payload, function (err, result) {
      err ? reject(err) : resolve(result)
    })
  })
}

function deleteProduct (userId, _id) {
  const collection = database.collection('products')
  const query = { userId, _id: ObjectID(_id) }

  return new Promise(function (resolve, reject) {
    collection.deleteOne(query, function (err, result) {
      err ? reject(err) : resolve(result)
    })
  })
}

function updateProduct (userId, _id, payload) {
  const collection = database.collection('products')
  const query = { userId, _id: ObjectID(_id) }
  payload.ts_modified = Date.now()
  delete payload._id

  return new Promise(function (resolve, reject) {
    collection.findOneAndUpdate(query, payload, function (err, result) {
      err ? reject(err) : resolve(result)
    })
  })
}

module.exports = routes
