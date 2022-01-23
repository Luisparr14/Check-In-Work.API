const database = require('../../database/database')

const checkIn = async (req, res) => {
  const { rfidCard } = req.body
  const querySelect = `SELECT * FROM tarjetas_rfid WHERE id_card = '${rfidCard}'`
  const queryInsert = `INSERT INTO registros (card) VALUES ('${rfidCard}')`

  database.query(querySelect, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener la tarjeta',
        error: err
      })
    }
    if (result.length === 0) {
      return res.status(403).json({
        ok: false,
        message: 'La tarjeta que intenta usar no esta registrada en el sistema'
      })
    }
    database.query(queryInsert, (err, result) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al registrar el ingreso',
          error: err
        })
      }
      return res.status(200).json({
        ok: true,
        message: 'Registro de ingreso exitoso'
      })
    })
  })
}

const getAllRecords = async (req, res) => {
  const query = 'SELECT * FROM registros'
  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener los registros',
        error: err
      })
    } else {
      return res.status(200).json({
        ok: true,
        message: 'Registros obtenidos correctamente',
        data: result
      })
    }
  })
}

const getAllRecordFromCard = async (req, res) => {
  const { card } = req.params
  const query = `SELECT * FROM registros WHERE card = '${card}'`
  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener los registros',
        error: err
      })
    } else {
      result.length === 0
        ? res.status(404).json({
          ok: false,
          message: 'Tarjeta no encontrada'
        })
        : res.status(200).json({
          ok: true,
          message: 'Registros obtenidos correctamente',
          data: result
        })
    }
  })
}

const getAllRecordsBetweenDates = async (req, res) => {
  let { startDate, endDate } = req.params
  startDate = new Date(startDate)
  endDate = new Date((parseInt(endDate) + 1).toString())
  
  const query = `SELECT * FROM registros WHERE dateandtime BETWEEN '${startDate.toJSON()}' AND '${endDate.toJSON()}'`
  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener los registros',
        error: err
      })
    } else {
      result.length === 0
        ? res.status(404).json({
          ok: false,
          message: 'No hay registros en ese rango de fechas'
        })
        : res.status(200).json({
          ok: true,
          message: 'Registros obtenidos correctamente',
          data: result
        })
    }
  })
}

module.exports = {
  checkIn,
  getAllRecords,
  getAllRecordFromCard,
  getAllRecordsBetweenDates
}
