const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: "localhost",
    user: "lucho",
    password: "MySQLlucho",
    database: "surtipaper",
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Database connected');
});

module.exports = connection;