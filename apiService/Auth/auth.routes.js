const router = require('express').Router()
const {
  Login
} = require('./auth.controller')

router.post('/login', Login)

module.exports = router
