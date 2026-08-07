const movimientosRepository = require("../repositories/movimientos.repository");
const { validarTipoMovimiento } = require("../validators/movimiento.validator");

async function crearMovimiento(datos, client) {
  validarTipoMovimiento(datos.tipo);

  return movimientosRepository.crear(
    {
      usuarioId: datos.usuarioId,
      tipo: datos.tipo,
      valor: datos.valor,
    },
    client
  );
}

async function obtenerMovimientosUsuario(usuarioId) {
  return await movimientosRepository.obtenerMovimientosUsuario(usuarioId);
}

async function obtenerTodos() {
  return await movimientosRepository.obtenerTodos();
}

module.exports = {
  crearMovimiento,
  obtenerMovimientosUsuario,
  obtenerTodos,
};
