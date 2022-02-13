const database = require('../../database/database')

const addCard = async (req, res) => {
  const { rfidCard } = req.body
  console.log(rfidCard.trim())
  const queryInsert = `INSERT INTO tarjetas_rfid (id_card) VALUES ('${rfidCard.trim()}')`

  if (!rfidCard) {
    return res.status(400).json({
      ok: false,
      message: 'Faltan datos'
    })
  }

  database.query(queryInsert, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        ok: false,
        message: 'Error al registrar la tarjeta'
      })
    }
    return res.status(200).json({
      ok: true,
      message: 'Tarjeta registrada correctamente'
    })
  })
}

const deleteCard = (req, res) => {
  const { rfidCard } = req.params
  const queryDelete = `DELETE FROM tarjetas_rfid WHERE id_card = '${rfidCard}'`

  database.query(queryDelete, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al eliminar la tarjeta',
        error: err
      })
    }
    result.affectedRows === 0
      ? res.status(404).json({
        ok: false,
        message: 'La tarjeta no existe en la base de datos'
      })
      : res.status(200).json({
        ok: true,
        message: 'Tarjeta eliminada correctamente'
      })
  })
}

const getAllCards = (req, res) => {
  const querySelect = 'SELECT * FROM tarjetas_rfid'

  database.query(querySelect, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error al obtener las tarjetas',
        error: err
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Tarjetas obtenidas correctamente',
      data: result
    })
  })
}

const getCardById = (req, res) => {
  const { id } = req.params
  const querySelect = `SELECT * FROM tarjetas_rfid WHERE id_card = '${id}'`

  database.query(querySelect, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener la tarjeta',
        error: err
      })
    }
    result.length === 0
      ? res.status(404).json({
        ok: false,
        message: 'Tarjeta no encontrada',
        error: err
      })
      : res.status(200).json({
        ok: true,
        message: 'Tarjeta obtenida',
        data: result
      })
  })
}

const ProcessCardUid = (card) => {
  let cardProcessed = ''
  const hex = '0x'
  return new Promise((resolve, reject) => {
    card = card.split(' ')
    card.forEach((item) => {
      cardProcessed += hex + item + ' '
    })
    resolve(cardProcessed)
    reject(new Error('Error al procesar la tarjeta'))
  })
}

module.exports = {
  addCard,
  deleteCard,
  getAllCards,
  getCardById
}
