const database = require('../../database/database')

const checkIn = async (req, res) => {
  const { rfidCard } = req.body
  console.log('RFID', rfidCard.trim())
  const querySelect = `SELECT * FROM tarjetas_rfid WHERE id_card = '${rfidCard.trim()}'`
  const queryInsert = `INSERT INTO registros (card) VALUES ('${rfidCard.trim()}')`

  database.query(querySelect, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener la tarjeta'
      })
    }
    if (result.length === 0) {
      return res.status(403).json({
        ok: false,
        message: 'La tarjeta que intenta usar no esta registrada en el sistema'
      })
    }
    if (result[0].en_uso === 0) {
      return res.status(403).json({
        ok: false,
        message: 'Acceso denegado, tarjeta no permitida para acceso'
      })
    }
    database.query(queryInsert, (err, result) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al registrar el ingreso'
        })
      }
      return res.status(200).json({
        ok: true,
        message: 'Ingreso exitoso'
      })
    })
  })
}

const getAllRecords = async (req, res) => {
  const query = 'SELECT * FROM registros left join empleados on registros.card=empleados.rfid_card'
  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener los registros',
        error: err
      })
    }

    return res.status(200).json({
      ok: true,
      message: 'Registros obtenidos correctamente',
      data: result
    })
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
