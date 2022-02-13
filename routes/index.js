const router = require('express').Router()

router.use('/api/v1/empleados', require('../apiService/Empleados/empleados.routes.js'))
router.use('/api/v1/registros', require('../apiService/Registros/registros.routes'))
router.use('/api/v1/cards', require('../apiService/Tarjetas RFID/tarjetas.routes'))
router.use('/api/v1/auth', require('../apiService/Auth/auth.routes'))
router.use('/api/v1/roles', require('../apiService/Roles/roles.routes'))

module.exports = router
