const database = require('../../database/database')

const addCard = (req, res) => {
  const { idCard } = req.body
  const queryInsert = `INSERT INTO tarjetas_rfid (id_card) VALUES ('${idCard}')`

  if (!idCard) {
    return res.status(400).json({
      ok: false,
      message: 'Faltan datos'
    })
  }

  database.query(queryInsert, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al registrar la tarjeta',
        error: err
      })
    }
    return res.status(200).json({
      ok: true,
      message: 'Tarjeta registrada correctamente'
    })
  })
}

const deleteCard = (req, res) => {
  const { idCard } = req.params
  const queryDelete = `DELETE FROM tarjetas_rfid WHERE id_card = '${idCard}'`

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
    result.length === 0
      ? res.status(404).json({
        ok: false,
        message: 'No hay tarjetas registradas'
      })
      : res.status(200).json({
        ok: true,
        message: 'Tarjetas obtenidas correctamente',
        tarjetas: result
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

module.exports = {
  addCard,
  deleteCard,
  getAllCards,
  getCardById
}
