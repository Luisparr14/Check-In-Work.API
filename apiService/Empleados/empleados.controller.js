const database = require('../../database/database');
const getEmpleados = async (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      empleados: [
        {
          id: 1,
          nombre: 'Juan',
          apellido: 'Perez',
        },
        {
          id: 2,
          nombre: 'Pedro',
          apellido: 'Perez',
        },
      ],
    },
  });
}

module.exports = {
  getEmpleados,
}