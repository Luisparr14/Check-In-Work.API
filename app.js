var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/', require('./routes/index'));

module.exports = app;
