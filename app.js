const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()

const routes = require('./routes/index')
const connection = require('./database/database')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))

app.use('/', routes)

module.exports = app
