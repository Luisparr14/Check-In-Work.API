const router = require('express').Router();
const { getRegistros } = require('./registros.controller');
router.get('/', getRegistros);

module.exports = router;