const usuarios = require("../data/usuarios");
const AppError = require("../errors/AppError");
const movimientosService = require("./movimientos.service");

function obtenerTodos() {
  return usuarios;
}

function obtenerPorId(id) {
  const usuario = usuarios.find((usuario) => usuario.id == id);
  if (!usuario) {
    throw new AppError(404, "Usuario no encontrado", {
      id,
    });
  }
  return usuario;
}

function crear(usuario) {
  const existe = usuarios.some((u) => u.id === usuario.id);
  if (existe) {
    throw new AppError(409, "El ID ya existe", {
      id: usuario.id,
    });
  }
  usuario.saldo = 0;
  usuarios.push(usuario);
  return usuario;
}

function actualizar(id, datosNuevos) {
  const usuario = obtenerPorId(id);
  Object.assign(usuario, datosNuevos);
  return usuario;
}

function eliminar(id) {
  const indice = usuarios.findIndex((usuario) => usuario.id == id);
  if (indice === -1) {
    throw new AppError(404, "Usuario no encontrado", {
      id,
    });
  }
  usuarios.splice(indice, 1);
}

function consultarSaldo(id) {
  const usuario = obtenerPorId(id);
  return usuario.saldo;
}

function consignar(id, valor) {
  const usuario = obtenerPorId(id);
  usuario.saldo += valor;
  movimientosService.crearMovimiento({
    usuarioId: usuario.id,
    tipo: "CONSIGNACION",
    valor,
  });
  return usuario;
}

function retirar(id, valor) {
  const usuario = obtenerPorId(id);
  if (usuario.saldo < valor) {
    throw new AppError(422, "Saldo insuficiente", {
      saldoDisponible: usuario.saldo,
      valorSolicitado: valor,
    });
  }
  usuario.saldo -= valor;
  movimientosService.crearMovimiento({
    usuarioId: usuario.id,
    tipo: "RETIRO",
    valor,
  });
  return usuario;
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  consultarSaldo,
  consignar,
  retirar,
};
