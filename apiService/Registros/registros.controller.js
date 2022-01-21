
const getRegistros = async (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      registros: [
        {
          id: 1,
          empleado: 1,
          fechayhora: '2020-01-01T00:00:00.000Z',
          tipo: 'Entrada',
        },
        {
          id: 2,
          empleado: 2,
          fechayhora: '2020-01-01T00:00:00.000Z',
          tipo: 'Entrada',
        },
      ],
    },
  });
}

module.exports = {
  getRegistros,
}