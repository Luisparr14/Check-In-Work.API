const database = require('../../database/database')

const createEmployee = async (req, res) => {
  const { idEmpleado, name, secName, lastName, rol, rfidCard } = req.body
  const queryInsert = 'INSERT INTO empleados (id_empleado,name,sec_name,last_name,rol,rfid_card) VALUES (?,?,?,?,?,?)'
  const params = [idEmpleado, name, secName, lastName, rol, rfidCard]

  database.query(queryInsert, params, (err, result) => {
    if (err) {
      return res.status(500).send({
        ok: false,
        message: 'Error al crear el empleado',
        error: err
      })
    }
    return res.status(200).send({
      ok: true,
      message: 'Empleado creado correctamente'
    })
  }
  )
}

const deleteEmployee = async (req, res) => {
  const { id } = req.params
  const queryDelete = `DELETE FROM empleados WHERE id_empleado = ${id}`
  console.log(id)
  database.query(queryDelete, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al eliminar el empleado',
        error: err
      })
    }

    result.affectedRows === 0
      ? res.status(404).json({
        ok: false,
        message: 'No se encontró el empleado'
      })
      : res.status(200).json({
        ok: true,
        message: 'Empleado eliminado correctamente'
      })
  })
}

const getAllEmployees = async (req, res) => {
  const query = 'SELECT * FROM empleados inner join roles on roles.idrol=empleados.rol'

  database.query(query, (err, result) => {
    if (err) {
      console.log(err)
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
  const { id } = req.params
  const query = `SELECT * FROM empleados inner join roles on roles.idrol=empleados.rol WHERE id_empleado = ${id}`

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
  const { rfidCard, idEmpleado } = req.body
  const query = `UPDATE empleados SET rfid_card = '${rfidCard}' WHERE id_empleado = ${idEmpleado}`

  database.query(query, (err, assign) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al asignar la tarjeta al empleado'
      })
    }

    if (assign.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No se encontró el empleado'
      })
    }

    return res.status(200).json({
      ok: true,
      message: 'Tarjeta asignada correctamente'
    })
  })
}

const removeCardFromEmployee = async (req, res) => {
  const { idEmpleado } = req.body
  const query = `UPDATE empleados SET rfid_card = null WHERE id_empleado = ${idEmpleado}`

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
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  assignCardToEmployee,
  removeCardFromEmployee
}
