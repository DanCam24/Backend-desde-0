const movimientosRepository = require("../repositories/movimiento.repository");

async function obtenerMovimientosUsuario(usuarioId) {
  return await movimientosRepository.obtenerMovimientosUsuario(usuarioId);
}

async function obtenerTodos(limit, offset) {
  return await movimientosRepository.obtenerTodos(limit, offset);
}

module.exports = {
  obtenerMovimientosUsuario,
  obtenerTodos,
};
