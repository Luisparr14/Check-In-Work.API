const router = require('express').Router();

router.use('/api/v1/empleados', require('../apiService/Empleados/empleados.routes.js'));
router.use('/api/v1/registros', require('../apiService/Registros/registros.routes'));

module.exports = router;