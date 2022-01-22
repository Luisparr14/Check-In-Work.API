const mysql = require('mysql2')
require('dotenv').config()

const infoConnection = process.env.NODE_ENV === 'production'
  ? {
      host: process.env.PROD_DB_HOST,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASS,
      database: process.env.PROD_DB_NAME
    }
  : {
      host: 'localhost',
      user: 'lucho',
      password: 'MySQLlucho',
      database: 'check-in-work'
    }

const connection = mysql.createConnection(infoConnection)

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('Database connected')
})

module.exports = connection
