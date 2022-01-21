const router = require('express').Router()
const {
  getAllEmployees,
  getEmployeeById,
  assignCardToEmployee,
  removeCardFromEmployee
} = require('./empleados.controller')

router.get('/', getAllEmployees)
router.get('/:id', getEmployeeById)
router.post('/assign-card', assignCardToEmployee)
router.post('/remove-card', removeCardFromEmployee)

module.exports = router
