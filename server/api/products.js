const config = require('config')
const MongoClient = require('mongodb').MongoClient

let database

MongoClient.connect(config.db.url, (err, client) => {
  if (err) {
    console.log(err)
  } else {
    database = client.db('insta-shop')
    console.log('You\'ve got a DB!!!!')
  }
})

function add (user, payload) {
  const collection = database.collection('products')
  payload.userId = user

  return new Promise(function (resolve, reject) {
    collection.insert(payload, function (err, result) {
      err ? reject(err) : resolve(result)
    })
  })
}

function get (user) {
  const collection = database.collection('products')

  return new Promise(function (resolve, reject) {
    collection.find({ userId: user }).toArray(function (err, result) {
      err ? reject(err) : resolve(result)
    })
  })
}

module.exports = {
  add,
  get
}
