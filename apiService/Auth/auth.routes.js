const router = require('express').Router()
const {
  Login
} = require('./Auth.controller')

router.post('/login', Login)

module.exports = router
