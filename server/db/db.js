const config = require('config')
const MongoClient = require('mongodb').MongoClient

let database

async function connect () {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(config.db.url, (err, client) => {
      if (err) {
        reject(err)
      } else {
        database = client.db('insta-shop')
        resolve()
      }
    })
  })
}

const getDB = () => {
  console.log('~~~~~~~~~~~~~~~~~~~~')
  return database
}
const disconnect = () => database.close()

module.exports = { connect, getDB, disconnect }
