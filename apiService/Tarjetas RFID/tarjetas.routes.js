const router = require('express').Router()
const {
  addCard,
  deleteCard,
  getAllCards,
  getCardById
} = require('./tarjetas.controller')

router.post('/add-card', addCard)
router.delete('/delete-card/:idCard', deleteCard)
router.get('/', getAllCards)
router.get('/:id', getCardById)

module.exports = router
