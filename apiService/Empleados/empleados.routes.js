const router = require('express').Router()
const {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  assignCardToEmployee,
  removeCardFromEmployee
} = require('./empleados.controller')

router.post('/add-employee', createEmployee)
router.delete('/delete-employee/:id', deleteEmployee)
router.get('/', getAllEmployees)
router.get('/:id', getEmployeeById)
router.post('/assign-card', assignCardToEmployee)
router.post('/remove-card', removeCardFromEmployee)

module.exports = router
