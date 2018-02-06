const config = require('config')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

let database

MongoClient.connect(config.db.url, (err, client) => {
  if (err) {
    console.log(err)
  } else {
    database = client.db('insta-shop')
    console.log('You\'ve got a DB!!!!')
  }
})

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

module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
}
