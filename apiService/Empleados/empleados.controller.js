const database = require('../../database/database')

const getAllEmployees = async (req, res) => {
  const query = 'SELECT * FROM empleados'

  database.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: 'Error al obtener los empleados',
        error: err
      })
    } else {
      res.status(200).json({
        ok: true,
        message: 'Empleados obtenidos correctamente',
        data: result
      })
    }
  })
}

const getEmployeeById = async (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM empleados WHERE id_empleado = ${id}`

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener el empleado',
        error: err
      })
    }
    return result.length === 0
      ? res.status(404).json({
        ok: false,
        message: 'Empleado no encontrado'
      })
      : res.status(200).json({
        ok: true,
        message: 'Empleado obtenido correctamente',
        data: result[0]
      })
  })
}

const assignCardToEmployee = async (req, res) => {
  const rfidCard = req.body.rfidCard
  const idEmployee = req.body.idEmpleado
  const query = `UPDATE empleados SET rfid_card = '${rfidCard}' WHERE id_empleado = ${idEmployee}`
  const query2 = `SELECT * FROM tarjetas_rfid WHERE id_card = '${rfidCard}'`

  database.query(query2, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al asignar la tarjeta',
        error: err
      })
    }

    return result.length === 0
      ? res.status(404).json({
        ok: false,
        message: 'Tarjeta no encontrada'
      })
      : database.query(query, (err, result) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message: 'Error al asignar la tarjeta al empleado',
            error: err
          })
        }

        return result.affectedRows === 0
          ? res.status(404).json({
            ok: false,
            message: 'Empleado no encontrado'
          })
          : res.status(200).json({
            ok: true,
            message: 'Tarjeta asignada correctamente'
          })
      })
  })
}

const removeCardFromEmployee = async (req, res) => {
  const idEmployee = req.body.idEmpleado
  const query = `UPDATE empleados SET rfid_card = null WHERE id_empleado = ${idEmployee}`

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al remover la tarjeta al empleado',
        error: err
      })
    }

    if (result.changedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'El empleado no tiene tarjeta asignada'
      })
    }

    return result.affectedRows === 0
      ? res.status(404).json({
        ok: false,
        message: 'Empleado no encontrado'
      })
      : res.status(200).json({
        ok: true,
        message: 'Tarjeta removida correctamente'
      })
  })
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  assignCardToEmployee,
  removeCardFromEmployee
}
