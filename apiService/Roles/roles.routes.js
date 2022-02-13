const router = require('express').Router()
const {
  AllRoles
} = require('./roles.controller')

router.get('/', AllRoles)

module.exports = router
