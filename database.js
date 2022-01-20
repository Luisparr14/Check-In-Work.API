 const {createPool} = require('mysql')

 const pool = createPool({
     host:"localhost",
     user:" ",
     password:"",
     database:"",
     conectionlimit:10

 })