const database = require('../../database/database')

const Login = async (req, res) => {
  const { id } = req.body
  const query = `SELECT * FROM empleados inner join roles on roles.idrol=empleados.rol WHERE id_empleado = ${id}`

  database.query(query, (err, result) => {
    console.log(result)
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener el empleado',
        error: err
      })
    }

    if (result.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Credenciales incorrectas'
      })
    }
    
    if (result[0].nombre_rol.toLowerCase() !== 'administrador de proyectos') {
      return res.status(403).json({
        ok: false,
        message: 'No tiene permisos para realizar esta acción'
      })
    }

    return res.json({
      ok: true,
      message: 'Bienvenido a la aplicación check in work',
      empleado: result[0]
    })
  })
}

module.exports = {
  Login
}
