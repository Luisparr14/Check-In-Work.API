const mysql = require('mysql2')
require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})
console.log('DATABASE NAME', connection.config.database)
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('Database connected')
})

connection.query('SELECT * FROM empleados', function (error, results, fields) {
  if (error) throw error
  console.log('The solution is: ', results)
})

module.exports = connection
