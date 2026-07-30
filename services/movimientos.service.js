const movimientos = require("../data/movimientos");
const AppError = require("../errors/AppError");

function crearMovimiento(datos) {
  const movimiento = {
    id: movimientos.length + 1,
    usuarioId: datos.usuarioId,
    tipo: datos.tipo,
    valor: datos.valor,
    fecha: new Date(),
  };
  movimientos.push(movimiento);
  return movimiento;
}

function obtenerMovimientosUsuario(usuarioId) {
  const resultado = movimientos.filter(
    (movimiento) => movimiento.usuarioId == usuarioId
  );
  return resultado;
}

function obtenerTodos() {
  return movimientos;
}

module.exports = {
  crearMovimiento,
  obtenerMovimientosUsuario,
  obtenerTodos,
};
