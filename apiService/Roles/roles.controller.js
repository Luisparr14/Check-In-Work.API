const database = require('../../database/database')

const AllRoles = async (req, res) => {
  const query = 'SELECT * FROM roles'
  database.query(query, (err, roles) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Ha ocurrido un error al obtener los roles'
      })
    }

    if (roles.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No hay roles registrados'
      })
    }

    return res.status(200).json({
      ok: true,
      message: 'Roles obtenidos de forma correcta',
      data: roles
    })
  })
}

module.exports = {
  AllRoles
}
