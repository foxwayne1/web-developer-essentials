const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let database

async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
  database = client.db('online-shop')
}

function getDb() {
  if (!database) {
    throw new Error({ message: 'There is no connection to the database.' })
  }
  console.log('database is alive')
  return database
}

module.exports = { connectToDatabase, getDb }
