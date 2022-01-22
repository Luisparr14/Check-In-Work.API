const router = require('express').Router()
const {
  checkIn,
  getAllRecords,
  getAllRecordFromCard,
  getAllRecordsBetweenDates
} = require('./registros.controller')

router.post('/check-in', checkIn)
router.get('/', getAllRecords)
router.get('/:card', getAllRecordFromCard)
router.get('/:startDate/:endDate', getAllRecordsBetweenDates)

module.exports = router
