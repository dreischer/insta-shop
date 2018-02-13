const config = require('config')
const MongoClient = require('mongodb').MongoClient

let database

async function connect () {
  var client = await MongoClient.connect(config.db.url)
  database = client.db('insta-shop')
}

const getDB = () => database
const disconnect = () => database.close()

module.exports = { connect, getDB, disconnect }
