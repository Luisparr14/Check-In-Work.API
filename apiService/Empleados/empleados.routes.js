const router = require('express').Router();
const { getEmpleados } = require('./empleados.controller');
router.get('/', getEmpleados);

module.exports = router;